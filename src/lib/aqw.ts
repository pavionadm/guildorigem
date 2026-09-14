import "server-only";

import type {
  CharacterBadge,
  CharacterData,
  CharacterInventoryItem,
  CharacterSummary,
} from "@/types/aqw";

import { isValidCcid } from "@/lib/sanitize";

const BASE_URL = "https://account.aq.com";
const REQUEST_TIMEOUT_MS = 8000;

class UpstreamError extends Error {}

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, {
      signal: controller.signal,
      cache: "no-store",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        Accept: "text/html,application/json;q=0.9,*/*;q=0.8",
      },
    });
  } finally {
    clearTimeout(timeout);
  }
}

function stripToPlainText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<(br|\/p|\/li|\/tr|\/div|\/h[1-6])\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n")
    .trim();
}

const KNOWN_LABELS = [
  "Level",
  "Class",
  "Weapon",
  "Armor",
  "Helm",
  "Cape",
  "Pet",
  "Misc",
  "Faction",
  "Guild",
  "Name",
  "Achievements",
  "Inventory",
];

function normalizeGuild(value: string): string {
  const guild = value.trim();
  return /^(achievements?|inventory)$/i.test(guild) ? "" : guild;
}

function extractField(text: string, label: string): string {
  const lines = text.split("\n").map((line) => line.trim());

  const labelIndex = lines.findIndex(
    (line) =>
      new RegExp(`^${label}\\s*:?$`, "i").test(line) ||
      new RegExp(`^${label}\\s*:`, "i").test(line)
  );

  if (labelIndex === -1) return "";

  const sameLine = lines[labelIndex]!
    .replace(new RegExp(`^${label}\\s*:`, "i"), "")
    .trim();

  if (sameLine) {
    return sameLine;
  }

  for (let i = labelIndex + 1; i < lines.length && i < labelIndex + 4; i += 1) {
    const candidate = lines[i]!.trim();

    if (!candidate) continue;

    if (
      KNOWN_LABELS.some((known) => new RegExp(`^${known}\\s*:`, "i").test(candidate))
    ) {
      break;
    }

    return candidate;
  }

  return "";
}

function extractCcid(html: string): number | null {
  const match =
    html.match(/var\s+ccid\s*=\s*(\d+)\s*;/i) ??
    html.match(/data-ccid=["'](\d+)["']/i) ??
    html.match(/["']ccid["']\s*:\s*(\d+)/i);

  if (!match?.[1]) {
    return null;
  }

  const ccid = Number.parseInt(match[1], 10);

  return isValidCcid(ccid) ? ccid : null;
}

function decodeFlashVarsValue(raw: string): string {
  return raw
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function extractFlashVars(html: string): string | null {
  // <param name="FlashVars" value="..."> e também <embed flashvars="...">
  const paramTag = html.match(/<[a-zA-Z]+[^>]*\bname=["']FlashVars["'][^>]*>/i);
  if (paramTag) {
    const valueMatch = paramTag[0].match(/\bvalue=["']([^"']*)["']/i);
    if (valueMatch?.[1]) return decodeFlashVarsValue(valueMatch[1]);
  }

  const embedMatch =
    html.match(/<embed[^>]*\bflashvars=["']([^"']*)["'][^>]*>/i) ??
    html.match(/\bflashvars=["']([^"']*)["']/i);
  if (embedMatch?.[1]) return decodeFlashVarsValue(embedMatch[1]);

  return null;
}

function parseFlashVars(rawFlashVars: string): URLSearchParams {
  return new URLSearchParams(
    rawFlashVars.startsWith("&") ? rawFlashVars.slice(1) : rawFlashVars
  );
}

function flashVar(params: URLSearchParams, key: string): string {
  return (params.get(key) ?? "").trim();
}

/** Preenche campos vazios do summary a partir do FlashVars (fonte mais estável). */
function mergeSummaryFromFlashVars(
  summary: CharacterSummary,
  rawFlashVars: string | null
): CharacterSummary {
  if (!rawFlashVars) return summary;

  const params = parseFlashVars(rawFlashVars);
  const levelFromFlash =
    Number.parseInt(flashVar(params, "level"), 10) ||
    Number.parseInt(flashVar(params, "intLevel"), 10) ||
    0;

  return {
    name: summary.name || flashVar(params, "strName"),
    level: summary.level || levelFromFlash,
    faction: summary.faction || flashVar(params, "strFaction"),
    className: summary.className || flashVar(params, "strClassName"),
    weaponName: summary.weaponName || flashVar(params, "strWeaponName"),
    armorName: summary.armorName || flashVar(params, "strArmorName"),
    capeName: summary.capeName || flashVar(params, "strCapeName"),
    helmName: summary.helmName || flashVar(params, "strHelmName"),
    petName: summary.petName || flashVar(params, "strPetName"),
    miscName: summary.miscName || flashVar(params, "strMiscName"),
    guild: normalizeGuild(summary.guild || flashVar(params, "guild")),
  };
}

/**
 * Extrai o nome REAL que a AQW colocou na página.
 *
 * Não usamos o personagem exibido pelo Ruffle/SWF.
 * Também não usamos o nome pesquisado como fonte dos dados.
 */
function extractCharacterName(html: string, text: string): string {
  const h1Match = html.match(/<h1[^>]*>\s*([^<]+?)\s*<\/h1>/i);

  if (h1Match?.[1]?.trim()) {
    return h1Match[1].trim();
  }

  const titleMatch = html.match(/<title[^>]*>\s*([^<]+?)\s*<\/title>/i);

  if (titleMatch?.[1]) {
    const titleName = titleMatch[1].split("|")[0]?.trim();

    if (titleName && !/character page/i.test(titleName)) {
      return titleName;
    }
  }

  const nameField = extractField(text, "Name");

  if (nameField) {
    return nameField.trim();
  }

  return "";
}

function toSummary(html: string, text: string): CharacterSummary {
  const levelRaw = extractField(text, "Level");

  return {
    name: extractCharacterName(html, text),
    level: Number.parseInt(levelRaw, 10) || 0,
    faction: extractField(text, "Faction"),
    className: extractField(text, "Class"),
    weaponName: extractField(text, "Weapon"),
    armorName: extractField(text, "Armor"),
    capeName: extractField(text, "Cape"),
    helmName: extractField(text, "Helm"),
    petName: extractField(text, "Pet"),
    miscName: extractField(text, "Misc"),
    guild: normalizeGuild(extractField(text, "Guild")),
  };
}

async function fetchBadges(ccid: number): Promise<CharacterBadge[]> {
  const response = await fetchWithTimeout(`${BASE_URL}/CharPage/Badges?ccid=${ccid}`);

  if (!response.ok) return [];

  const data: unknown = await response.json().catch(() => null);

  if (!Array.isArray(data)) return [];

  return data.filter(
    (item): item is CharacterBadge =>
      typeof item === "object" &&
      item !== null &&
      "sFileName" in item &&
      "sCategory" in item
  );
}

async function fetchInventory(ccid: number): Promise<CharacterInventoryItem[]> {
  const response = await fetchWithTimeout(`${BASE_URL}/CharPage/Inventory?ccid=${ccid}`);

  if (!response.ok) return [];

  const data: unknown = await response.json().catch(() => null);

  if (!Array.isArray(data)) return [];

  return data.filter(
    (item): item is CharacterInventoryItem =>
      typeof item === "object" && item !== null && "strType" in item && "strName" in item
  );
}

function flashVarsNameMatches(rawFlashVars: string, expectedName: string): boolean {
  const nameInFlashVars = flashVar(parseFlashVars(rawFlashVars), "strName");
  if (!nameInFlashVars || !expectedName.trim()) return false;
  return nameInFlashVars.toLowerCase() === expectedName.trim().toLowerCase();
}

/**
 * Busca e monta os dados completos de um personagem.
 */
export async function getCharacterData(name: string): Promise<CharacterData | null> {
  const requestedName = name.trim();

  const pageResponse = await fetchWithTimeout(
    `${BASE_URL}/CharPage?id=${encodeURIComponent(requestedName)}`
  );

  if (!pageResponse.ok) {
    throw new UpstreamError(`AQW respondeu ${pageResponse.status}`);
  }

  const html = await pageResponse.text();
  const text = stripToPlainText(html);

  const ccid = extractCcid(html);
  const extractedFlashVars = extractFlashVars(html);
  let summary = toSummary(html, text);
  summary = mergeSummaryFromFlashVars(summary, extractedFlashVars);

  /*
   * IMPORTANTE:
   *
   * Não aceitamos mais o nome pesquisado como fallback.
   *
   * Se a AQW devolver ZRH para uma busca por Artix,
   * detectamos isso aqui em vez de apresentar ZRH como se
   * fosse Artix.
   */
  if (!summary.name || summary.level === 0) {
    return null;
  }

  if (summary.name.trim().toLowerCase() !== requestedName.toLowerCase()) {
    return null;
  }

  const rawFlashVars =
    extractedFlashVars && flashVarsNameMatches(extractedFlashVars, requestedName)
      ? extractedFlashVars
      : null;

  const [badges, inventory] =
    ccid !== null
      ? await Promise.all([fetchBadges(ccid), fetchInventory(ccid)])
      : [[], []];

  return {
    ccid,
    summary,
    rawFlashVars,
    badges,
    inventory,
  };
}

export { UpstreamError };
