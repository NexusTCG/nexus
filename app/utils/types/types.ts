export type CardFormDataType = {
  cardArt?: string
  cardArtPrompt?: string | null
  cardAttack?: string | null
  cardUnitType?: string | null
  cardColor: string | null
  cardCreator?: string | null
  cardDefense?: string | null
  cardEnergyCost?: { [key: string]: number } | null;
  cardEnergyValue?: number | null
  cardFlavorText?: string | null
  cardGrade?: string
  cardName?: string
  cardPrompt?: string | null
  cardRender?: string | null
  cardSpeed?: string | null
  cardSubType?: string[] | null
  cardSuperType?: string | null
  cardText?: string
  cardType?: string
  created_at?: string
  id?: number
  user_id: string
};

export type CardTypesType = {
  event: string;
  entity: string;
  effect: string;
  object: string;
  node: string;
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