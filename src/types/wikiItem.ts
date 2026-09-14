import type { GuideCategoryId } from "@/types/guide";

/**
 * Tag curta extraída dos ícones da listagem do wiki (ex.: acsmall.png -> "ac").
 * Usada só para mostrar um selinho de raridade/tipo ao lado do item.
 */
export type WikiItemTag =
  | "ac"
  | "legend"
  | "rare"
  | "seasonal"
  | "pseudo"
  | "special"
  | "beta"
  | "ptr"
  | "founder"
  | "upholder"
  | "temporary";

/**
 * Item do catálogo sincronizado automaticamente a partir do AQWorlds Wiki.
 * Diferente de `Guide`: não tem passo a passo — é só nome, categoria e link
 * para a página oficial do item no wiki.
 */
export interface WikiItem {
  name: string;
  /** URL absoluta da página do item no aqwwiki.wikidot.com. */
  url: string;
  category: GuideCategoryId;
  tags: WikiItemTag[];
}
