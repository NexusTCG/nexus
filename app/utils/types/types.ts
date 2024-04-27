export type CardFormDataType = {
  // Base Card Data
  user_id?: string;
  username?: string; // cardCreator
  // Initial Mode Card Data
  im_name?: string; // cardName
  im_type?: string; // cardType
  im_sub_type?: string[] | null; // cardSubType
  im_super_type?: string | null; // cardSuperType
  im_grade?: string; // cardAnomalyModeGrade
  im_text?: string; // cardText
  im_lore_text?: string | null; // cardLoreText
  im_card_prompt?: string | null; // cardPrompt
  im_art_prompt?: string | null; // cardArtPrompt
  im_art_prompt_options?: string[] | null; // art_prompt_options
  im_art?: string; // cardArt
  im_render?: string | null; // cardRender
  im_energy_value?: number; // cardEnergyValue
  im_energy_cost?: { [key: string]: number } | null; // cardEnergyCost
  im_energy_alignment?: string | null; // cardEnergyAlignment
  im_unit_attack?: string | null; // cardAttack
  im_unit_defense?: string | null; // cardDefense
  im_unit_range?: string | null; // cardUnitType
  im_speed?: string | null; // cardSpeed
  // Anomaly Mode Card Data
  am_name?: string | null; // cardAnomalyModeName
  am_type?: string; // cardAnomalyMode
  am_sub_type?: string | null; // cardSubType
  am_super_type?: string | null; // cardSuperType
  am_grade?: string; // new
  am_text?: string | null; // cardAnomalyModeText
  am_lore_text?: string | null; // cardAnomalyModeLoreText
  am_card_prompt?: string | null; // new
  am_art_prompt?: string | null; // new
  am_art_prompt_options?: string[] | null; // new
  am_art?: string; // new
  am_render?: string | null; // new
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
  chain: KeywordEntry;
  emanate: KeywordEntry;
  evasion: KeywordEntry;
  intimidate: KeywordEntry;
  network: KeywordEntry;
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
  encrypt: KeywordEntry;
  exploit: KeywordEntry;
  firewall: KeywordEntry;
  setup: KeywordEntry;
  initiate: KeywordEntry;
  transfuse: KeywordEntry;
  magnetic: KeywordEntry;
  overpower: KeywordEntry;
  surge: KeywordEntry;
  virus: KeywordEntry;
  cache: KeywordEntry;
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

export type ArtPromptSectionOptionType = {
  id: number;
  title: string;
  description?: string;
  prompt?: string;
  image?: string;
}

export type ArtPromptSectionType = {
  section: string;
  summary?: string;
  icon: React.ElementType,
  options: ArtPromptSectionOptionType[];
}

export type ArtPromptOptionsDataType = {
  [section: string]: ArtPromptSectionType;
}