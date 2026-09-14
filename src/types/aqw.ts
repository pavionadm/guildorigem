export interface CharacterBadge {
  sCategory: string;
  sFileName: string;
  sTitle: string;
  sDesc: string;
}

export interface CharacterInventoryItem {
  strType: string;
  strName: string;
  intCount: number;
  bCoins: boolean;
  bUpgrade: boolean;
}

export interface CharacterSummary {
  name: string;
  level: number;
  faction: string;
  className: string;
  weaponName: string;
  armorName: string;
  capeName: string;
  helmName: string;
  petName: string;
  miscName: string;
  guild: string;
}

export interface CharacterData {
  /** Nulo quando a AQW não expõe mais o ccid na página (site sem o embed Flash legado). */
  ccid: number | null;
  summary: CharacterSummary;
  /**
   * String bruta de flashvars, exatamente como retornada pela AQW, usada para
   * renderizar o sprite via Ruffle. Nula quando a página atual não inclui
   * mais esse embed — nesse caso o visualizador exibe um fallback.
   */
  rawFlashVars: string | null;
  badges: CharacterBadge[];
  inventory: CharacterInventoryItem[];
}

export interface CharacterApiError {
  error: string;
}
