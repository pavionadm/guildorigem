import "server-only";
import { cache } from "react";

import type { GuideCategoryId } from "@/types/guide";
import type { NewsDayEntry, NewsItem } from "@/types/news";
import type { WikiItem, WikiItemTag } from "@/types/wikiItem";

/**
 * Catálogo de itens sincronizado a partir do AQWorlds Wiki (aqwwiki.wikidot.com).
 *
 * O wiki não tem API — são páginas de listagem em HTML puro (ex.: /classes,
 * /swords, /armors...), paginadas pelo próprio Wikidot. Este módulo busca
 * essas páginas, extrai nome + link + selo de raridade de cada item e monta
 * um catálogo leve (sem passo a passo — isso continua sendo escrito à mão
 * em `src/data/guides.ts`).
 *
 * Conteúdo do wiki é licenciado em CC BY-SA 3.0 (ver rodapé das páginas),
 * por isso sempre linkamos de volta para a página oficial de cada item.
 */

const WIKI_ORIGIN = "https://aqwwiki.wikidot.com";
const REQUEST_TIMEOUT_MS = 8000;
/** Pausa entre requisições — evita que o wiki trate a sincronização como abuso. */
const REQUEST_DELAY_MS = 350;
/** Nº de tentativas extras quando uma página falha (rede instável, bloqueio momentâneo). */
const MAX_RETRIES = 2;
/** Cache de 24h: o catálogo se atualiza sozinho, sem sobrecarregar o wiki. */
const REVALIDATE_SECONDS = 60 * 60 * 24;
/** Limite de segurança para não entrar em loop caso a paginação do wiki mude. */
const MAX_PAGES_PER_LIST = 12;
/**
 * Nº máximo de páginas de listagem buscadas ao mesmo tempo. O wiki é um site
 * pequeno (Wikidot) e derruba/rejeita boa parte das conexões quando várias
 * categorias são buscadas em paralelo de uma vez — por isso mantemos isso
 * baixo e serializado, mesmo custando um pouco mais de tempo total.
 */
const MAX_CONCURRENT_REQUESTS = 3;

/**
 * Páginas de listagem do wiki mapeadas para as categorias já usadas nos
 * guias do site. Dá pra somar mais categorias aqui no futuro (ex.: staffs,
 * wands, daggers...) sem mexer em mais nada.
 */
const WIKI_LIST_PAGES: Partial<Record<GuideCategoryId, string[]>> = {
  helm: ["/helmets-hoods"],
  sword: ["/swords"],
  axe: ["/axes"],
  armor: ["/armors"],
  cape: ["/capes-back-items"],
  pet: ["/pets"],
  amulet: ["/necklaces"],
  class: ["/classes"],
  other: [
    "/bows",
    "/daggers",
    "/gauntlets",
    "/guns",
    "/handguns",
    "/maces",
    "/polearms",
    "/rifles",
    "/staffs",
    "/wands",
    "/whips",
    "/enhancements",
    "/housing",
    "/misc-items",
  ],
};

const TAG_ALIASES: Record<string, WikiItemTag> = {
  ac: "ac",
  legend: "legend",
  rare: "rare",
  seasonal: "seasonal",
  pseudo: "pseudo",
  special: "special",
  beta: "beta",
  ptr: "ptr",
  founder: "founder",
  upholder: "upholder",
  temporary: "temporary",
};

async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWikiPageOnce(url: string): Promise<string | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      // Cache de dados do Next.js: revalida sozinho a cada 24h.
      next: { revalidate: REVALIDATE_SECONDS },
      headers: {
        "User-Agent":
          "GuildOrigemCatalogBot/1.0 (+https://guildorigem.vercel.app; sincroniza catálogo de itens 1x/dia)",
        Accept: "text/html",
      },
    });

    if (!response.ok) return null;

    return await response.text();
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

/** Busca uma página do wiki, tentando de novo (com pausa) se a primeira falhar. */
async function fetchWikiPage(path: string): Promise<string | null> {
  const url = path.startsWith("http") ? path : `${WIKI_ORIGIN}${path}`;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    if (attempt > 0) {
      await sleep(REQUEST_DELAY_MS * (attempt + 1));
    }

    const html = await fetchWikiPageOnce(url);
    if (html) return html;
  }

  return null;
}

/**
 * Roda `task` para cada item de `items`, no máximo `limit` de cada vez —
 * em vez de disparar tudo com Promise.all, o que faz o wiki rejeitar/derrubar
 * boa parte das conexões quando há muitas páginas de listagem para buscar.
 */
async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  task: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let nextIndex = 0;

  async function worker(): Promise<void> {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;

      const item = items[currentIndex];
      if (item === undefined) continue;

      results[currentIndex] = await task(item);

      if (nextIndex < items.length) {
        await sleep(REQUEST_DELAY_MS);
      }
    }
  }

  const workers = Array.from({ length: Math.min(limit, items.length) }, () => worker());
  await Promise.all(workers);

  return results;
}

function decodeEntities(raw: string): string {
  return raw
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function extractTags(block: string): WikiItemTag[] {
  const tags = new Set<WikiItemTag>();
  const matches = block.matchAll(/alt="([a-z]+)small\.png"/gi);

  for (const match of matches) {
    const key = match[1]?.toLowerCase();
    const tag = key ? TAG_ALIASES[key] : undefined;
    if (tag) tags.add(tag);
  }

  return Array.from(tags);
}

function parseListPage(html: string, category: GuideCategoryId): WikiItem[] {
  const items: WikiItem[] = [];
  const itemBlocks = html.matchAll(
    /<div class="list-pages-item">\s*<p><a href="([^"]+)"[^>]*>([^<]+)<\/a><\/p>([\s\S]*?)<\/div>/g
  );

  for (const match of itemBlocks) {
    const href = match[1];
    const rawName = match[2];
    const tagsBlock = match[3] ?? "";

    if (!href || !rawName) continue;

    const name = decodeEntities(rawName);
    if (!name) continue;

    items.push({
      name,
      url: href.startsWith("http") ? href : `${WIKI_ORIGIN}${href}`,
      category,
      tags: extractTags(tagsBlock),
    });
  }

  return items;
}

function findNextPageHref(html: string): string | null {
  const match = html.match(
    /<span class="target"><a href="([^"]+)">\s*next\s*»\s*<\/a><\/span>/i
  );

  return match?.[1] ?? null;
}

async function fetchCategoryItems(
  startPath: string,
  category: GuideCategoryId
): Promise<WikiItem[]> {
  const collected = new Map<string, WikiItem>();
  let nextPath: string | null = startPath;
  let pageCount = 0;

  while (nextPath && pageCount < MAX_PAGES_PER_LIST) {
    const html = await fetchWikiPage(nextPath);
    pageCount += 1;

    if (!html) break;

    for (const item of parseListPage(html, category)) {
      collected.set(item.url, item);
    }

    nextPath = findNextPageHref(html);

    if (nextPath) {
      await sleep(REQUEST_DELAY_MS);
    }
  }

  return Array.from(collected.values());
}

/**
 * Busca o catálogo completo (todas as categorias mapeadas em WIKI_LIST_PAGES).
 * Memoizado por requisição (React `cache`) e cacheado pelo Next.js por 24h,
 * então na prática só bate no wiki de verdade uma vez por dia.
 * Nunca lança erro: se o wiki estiver fora do ar, devolve o que conseguiu
 * (ou uma lista vazia) em vez de derrubar a página de guias.
 */
/**
 * Busca o catálogo completo (todas as categorias mapeadas em WIKI_LIST_PAGES).
 * Memoizado por requisição (React `cache`) e cacheado pelo Next.js por 24h,
 * então na prática só bate no wiki de verdade uma vez por dia.
 * As buscas rodam com concorrência limitada (`MAX_CONCURRENT_REQUESTS`) para
 * não sobrecarregar o wiki — buscar tudo de uma vez faz boa parte das
 * conexões serem rejeitadas/derrubadas pelo lado do Wikidot.
 * Nunca lança erro: se uma página específica falhar, devolve o que
 * conseguiu (ou uma lista vazia) em vez de derrubar a página de guias.
 */
export const getWikiCatalog = cache(async (): Promise<WikiItem[]> => {
  const entries = Object.entries(WIKI_LIST_PAGES) as Array<
    [GuideCategoryId, string[]]
  >;

  const tasks = entries.flatMap(([category, paths]) =>
    paths.map((path) => ({ category, path }))
  );

  const results = await mapWithConcurrency(
    tasks,
    MAX_CONCURRENT_REQUESTS,
    ({ category, path }) => fetchCategoryItems(path, category)
  );

  return results.flat();
});

const NEWS_FEED_PATH = "/new-releases";
/** Máximo de blocos semanais retornados na home/página de Novidades. */
const MAX_NEWS_ITEMS = 6;
/**
 * Cada bloco semanal em "New Releases" começa com um banner que vem do CMS
 * do AQ.com (não do wiki), então é um sinal mais confiável pra separar um
 * bloco do outro do que `<hr>` (que também aparece dentro do conteúdo).
 */
const NEWS_BANNER_SRC_HOST = "aq.com/cms/images/";

function stripTags(raw: string): string {
  return decodeEntities(
    raw
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .replace(/\s+([,.;:])/g, "$1")
      .trim()
  );
}

/** Divide o HTML da página em um bloco por banner semanal (imagem do AQ.com). */
function splitNewsBlocks(html: string): string[] {
  const bannerStarts = Array.from(
    html.matchAll(/<img\b[^>]*>/gi)
  ).filter((match) => match[0].includes(NEWS_BANNER_SRC_HOST));

  const blocks: string[] = [];
  for (let i = 0; i < bannerStarts.length; i += 1) {
    const start = bannerStarts[i]?.index ?? 0;
    const end = bannerStarts[i + 1]?.index ?? html.length;
    blocks.push(html.slice(start, end));
  }

  return blocks;
}

function extractFirstImage(
  block: string
): { imageUrl: string; imageAlt: string } | null {
  const imgTagMatch = block.match(/<img\b[^>]*>/i);
  if (!imgTagMatch) return null;

  const tag = imgTagMatch[0];
  const srcMatch = tag.match(/src="([^"]+)"/i);
  const src = srcMatch?.[1];
  if (!src) return null;

  const altMatch = tag.match(/alt="([^"]*)"/i);
  const alt = altMatch?.[1];

  return {
    imageUrl: src.startsWith("http") ? src : `${WIKI_ORIGIN}${src}`,
    imageAlt: alt ? decodeEntities(alt) : "Novidade AQW",
  };
}

/**
 * Datas do bloco, na ordem em que aparecem nas abas (`<em>08/10/26</em>`)
 * logo abaixo do banner — cada bloco semanal cobre vários dias.
 */
function extractDates(block: string): string[] {
  return Array.from(
    block.matchAll(/<em>\s*(\d{1,2}\/\d{1,2}\/\d{2,4})\s*<\/em>/gi)
  )
    .map((match) => match[1])
    .filter((date): date is string => Boolean(date));
}

/** Divide o conteúdo das abas (`<div class="yui-content">`) em um pedaço por dia. */
function splitDayTabs(contentHtml: string): string[] {
  const tabStarts = Array.from(
    contentHtml.matchAll(/<div id="wiki-tab-\d+-\d+"[^>]*>/gi)
  );

  const tabs: string[] = [];
  for (let i = 0; i < tabStarts.length; i += 1) {
    const tabStart = tabStarts[i];
    if (!tabStart || tabStart.index === undefined) continue;
    const start = tabStart.index + tabStart[0].length;
    const end = tabStarts[i + 1]?.index ?? contentHtml.length;
    tabs.push(contentHtml.slice(start, end));
  }

  return tabs;
}

/** Todas as linhas do "Change Log:" de um dia (lista completa, não só a primeira). */
function extractChangeLogLines(tabContent: string): string[] {
  const match = tabContent.match(
    /Change Log:?<\/strong><\/p>\s*<ul>([\s\S]*?)<\/ul>/i
  );
  const listHtml = match?.[1];
  if (!listHtml) return [];

  return Array.from(listHtml.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi))
    .map((item) => stripTags(item[1] ?? ""))
    .filter((line) => line.length > 0);
}

/** Monta um dia por data do bloco, casando cada data com sua respectiva aba. */
function extractDays(block: string): NewsDayEntry[] {
  const dates = extractDates(block);
  if (dates.length === 0) return [];

  const yuiContentIndex = block.search(/<div class="yui-content">/i);
  const contentHtml = yuiContentIndex >= 0 ? block.slice(yuiContentIndex) : block;
  const tabs = splitDayTabs(contentHtml);

  const days: NewsDayEntry[] = [];
  for (let i = 0; i < dates.length; i += 1) {
    const date = dates[i];
    if (!date) continue;
    days.push({ date, changeLog: extractChangeLogLines(tabs[i] ?? "") });
  }

  return days;
}

/**
 * Busca os últimos lançamentos semanais a partir da página "New Releases" do
 * wiki e monta um feed leve para a seção de Novidades. Assim como o catálogo
 * de itens, é memoizado por requisição e nunca lança erro: se o wiki estiver
 * fora do ar ou o HTML mudar, devolve uma lista vazia em vez de derrubar a
 * página.
 */
export const getNewsFeed = cache(async (): Promise<NewsItem[]> => {
  const html = await fetchWikiPage(NEWS_FEED_PATH);
  if (!html) return [];

  const blocks = splitNewsBlocks(html);
  const items: NewsItem[] = [];

  for (const block of blocks) {
    if (items.length >= MAX_NEWS_ITEMS) break;

    const image = extractFirstImage(block);
    if (!image) continue;

    items.push({
      imageUrl: image.imageUrl,
      imageAlt: image.imageAlt,
      days: extractDays(block),
      wikiUrl: `${WIKI_ORIGIN}${NEWS_FEED_PATH}`,
    });
  }

  return items;
});
