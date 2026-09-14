export type GuideCategoryId =
  | "helm"
  | "sword"
  | "axe"
  | "armor"
  | "cape"
  | "pet"
  | "amulet"
  | "class"
  | "other";

export interface GuideCategory {
  id: GuideCategoryId;
  labelPt: string;
  labelEn: string;
}

export interface GuideStep {
  /** Título curto do passo (ex.: "Passo 1 — Aceitar a quest"). */
  title: string;
  /** Texto curto explicando o que fazer neste passo. */
  description: string;
  /**
   * URL da imagem hospedada deste passo (print ou foto do farm em jogo).
   * Deixe `""` enquanto não subir a imagem — o site mostra um placeholder.
   */
  imageUrl: string;
  imageAlt: string;
}

export interface Guide {
  slug: string;
  namePt: string;
  nameEn: string;
  category: GuideCategoryId;
  /** Resumo curto no topo da página do guia. */
  summary: string;
  /** Nome da missão / quest principal, se houver. */
  quest: string;
  /** Itens, classes ou requisitos prévios. */
  requirements: string[];
  /** Passos: sempre texto curto → imagem. */
  steps: GuideStep[];
  /** Tags extras para busca (sinônimos, abreviações). */
  aliases?: string[];
}
