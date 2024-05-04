export type CardFormDataType = {
  // Base Card Data
  id?: number;
  user_id: string;
  username: string;
  // Initial Mode Card Data
  im_name: string;
  im_type: string;
  im_sub_type?: string[] | null;
  im_super_type?: string | null;
  im_grade: string;
  im_text?: string | null;
  im_lore_text?: string | null;
  im_card_prompt?: string | null;
  im_art_prompt?: string | null;
  im_art_prompt_options?: string[] | null;
  im_art: string;
  im_render?: string | null;
  im_energy_value: number;
  im_energy_cost?: { [key: string]: number } | null;
  im_energy_alignment?: string | null;
  im_unit_attack?: string | null;
  im_unit_defense?: string | null;
  im_unit_range?: string | null;
  im_speed?: string | null;
  // Anomaly Mode Card Data
  am_name: string | null;
  am_type: string;
  am_sub_type?: string | null;
  am_super_type?: string | null;
  am_grade: string;
  am_text?: string | null;
  am_lore_text?: string | null;
  am_card_prompt?: string | null;
  am_art_prompt?: string | null;
  am_art_prompt_options?: string[] | null;
  am_art: string | null;
  am_render?: string | null;
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