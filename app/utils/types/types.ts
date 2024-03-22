export type CardFormDataType = {
  cardAnomalyModeFlavorText?: string | null;
  cardAnomalyModeName?: string | null;
  cardAnomalyModeText?: string | null;
  cardArt?: string;
  cardArtPrompt?: string | null;
  cardAttack?: string | null;
  cardColor: string | null;
  cardCreator?: string | null;
  cardDefense?: string | null;
  cardEnergyCost?: { [key: string]: number } | null;
  cardEnergyValue?: number | null;
  cardFlavorText?: string | null;
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
  primaryColors: string[];
  secondaryColors: string[];
  planets: string[];
  frequency: string;
  role: boolean;
};

export type EnergyTypesType = {
  yellow: number;
  blue: number;
  purple: number;
  red: number;
  green: number;
  void: number;
};

export type DualColorOptionsType = {
  [key: string]: string;
};