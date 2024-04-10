export type CardFormDataType = {
  cardArt?: string;
  cardArtPrompt?: string | null;
  cardAttack?: string | null;
  cardEnergyAlignment: string | null;
  cardCreator?: string | null;
  cardDefense?: string | null;
  cardEnergyCost?: { [key: string]: number } | null;
  cardEnergyValue?: number | null;
  cardLoreText?: string | null;
  cardGrade?: string;
  cardName?: string;
  cardPrompt?: string | null;
  cardRender?: string | null;
  cardSpeed?: string | null;
  cardSubType?: string[] | null;
  cardSuperType?: string | null;
  cardText?: string;
  cardType?: string;
  cardUnitType?: string | null;
  id?: number;
  user_id: string;
  created_at?: string;
  cardAnomalyMode?: string | null;
  cardAnomalyModeName?: string | null;
  cardAnomalyModeText?: string | null;
  cardAnomalyModeLoreText?: string | null;
  cardAnomalyModeGrade?: string | null;
};

export type CardTypesType = {
  event: string;
  entity: string;
  effect: string;
  object: string;
  anomaly: string;
};

export type EntityTypesType = {
  id: number;
  name: string;
  description: string;
  artPrompt: string;
  primaryEnergies: string[];
  secondaryEnergies: string[];
  planets: string[];
  roles: boolean;
};

export type EnergyTypesType = {
  radiant: number;
  volatile: number;
  corrupt: number;
  blaze: number;
  verdant: number;
  void: number;
};

export type DualColorOptionsType = {
  [key: string]: string;
};

export type KeywordEntry = {
  name: string;
  reminder: string;
  type: string;
};

export type KeywordsType = {
  [key: string]: KeywordEntry;
  adept: KeywordEntry;
  aftermath: KeywordEntry;
  emanate: KeywordEntry;
  evasion: KeywordEntry;
  intimidate: KeywordEntry;
  network: KeywordEntry;
  kinship: KeywordEntry;
  stealth: KeywordEntry;
  intercept: KeywordEntry;
  lightspeed: KeywordEntry;
  ready: KeywordEntry;
  secure: KeywordEntry;
  quantum: KeywordEntry;
  amplify: KeywordEntry;
  cleanup: KeywordEntry;
  deflect: KeywordEntry;
  deploy: KeywordEntry;
  despawn: KeywordEntry;
  distort: KeywordEntry;
  exploit: KeywordEntry;
  initiate: KeywordEntry;
  transfuse: KeywordEntry;
  magnetic: KeywordEntry;
  overpower: KeywordEntry;
  surge: KeywordEntry;
  virus: KeywordEntry;
  erase: KeywordEntry;
  hack: KeywordEntry;
  hologram: KeywordEntry;
  overclock: KeywordEntry;
  scan: KeywordEntry;
  shift: KeywordEntry;
};

export type GameGlossaryType = {
  id: number;
  term: string;
  definition: string;
  relatedTerms: string[];
};

export type GameKeywordType = {
  id: number;
  keyword: string;
  definition: string;
  type: string;
};