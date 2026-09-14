/**
 * Uma "novidade" = um bloco semanal do AQWorlds Wiki (banner + várias datas,
 * cada uma com seu próprio Change Log), extraído da página "New Releases".
 */
export interface NewsDayEntry {
  /** Data como aparece no wiki, ex.: "08/10/26". */
  date: string;
  /** Linhas do Change Log daquele dia. Vazio quando o dia não teve boost/patch note. */
  changeLog: string[];
}

export interface NewsItem {
  imageUrl: string;
  imageAlt: string;
  /** Um item por dia coberto pelo banner, na mesma ordem do wiki (mais recente primeiro). */
  days: NewsDayEntry[];
  /** Link direto para a página oficial no wiki. */
  wikiUrl: string;
}
