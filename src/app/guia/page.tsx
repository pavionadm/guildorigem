import type { Metadata } from "next";
import GuideBrowser from "@/components/guia/GuideBrowser";
import WikiCatalogBrowser from "@/components/guia/WikiCatalogBrowser";
import { getWikiCatalog } from "@/lib/aqwwiki";
import type { WikiItem } from "@/types/wikiItem";

export const metadata: Metadata = {
  title: "Guias de Farm | Guild Origem",
  description:
    "Guias de itens farmáveis do AQW por categoria — capacetes, espadas, armaduras, capas, pets, amuletos e mais.",
};

/**
 * A sincronização do catálogo busca ~20 páginas do wiki com concorrência
 * limitada (de propósito, para não ser bloqueada pelo Wikidot) — isso pode
 * levar mais tempo que o padrão quando o cache de 24h expira. 60s é o teto
 * permitido no plano Hobby da Vercel; ajuste para mais se o projeto estiver
 * num plano Pro.
 */
export const maxDuration = 60;

export default async function GuiaPage(): Promise<React.ReactElement> {
  let wikiItems: WikiItem[] = [];

  try {
    wikiItems = await getWikiCatalog();
  } catch {
    wikiItems = [];
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold/80">AQW</p>
      <h1 className="mt-2 font-display text-2xl text-parchment sm:text-3xl">Guias de Farm</h1>
      <p className="mt-2 max-w-xl text-sm text-mist">
        Capacetes, espadas, armaduras, capas, pets, amuletos e outros itens. Busque em
        português ou inglês e abra o passo a passo com imagens.
      </p>

      <div className="mt-8">
        <GuideBrowser />
      </div>

      <div className="mt-16 border-t border-gold/15 pt-10">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold/80">
          Catálogo do Wiki
        </p>
        <h2 className="mt-2 font-display text-xl text-parchment sm:text-2xl">
          Mais itens (sincronizados automaticamente)
        </h2>
        <p className="mt-2 max-w-xl text-sm text-mist">
          Lista sincronizada direto do AQWorlds Wiki, atualizada sozinha uma vez por dia.
          Ainda não tem passo a passo — clique para ver a página oficial do item.
        </p>

        <div className="mt-6">
          <WikiCatalogBrowser items={wikiItems} />
        </div>

        <p className="mt-6 text-[11px] text-mist/35">
          Dados de itens via{" "}
          <a
            href="https://aqwwiki.wikidot.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-mist/60"
          >
            AQWorlds Wiki
          </a>
          , sob licença Creative Commons BY-SA 3.0.
        </p>
      </div>
    </section>
  );
}
