export type CardFormDataType = {
  cardCreator: string;
  cardName: string;
  cardEnergyValue: number;
  cardEnergyCost?: { [key: string]: number };
  cardColor: string;
  cardArt: string;
  cardType: string;
  cardSuperType: string;
  cardSubType: string[];
  cardSpeed?: string;
  cardGrade: string;
  cardText: string;
  cardFlavorText: string;
  cardAttack: string;
  cardDefense: string;
  cardPrompt: string;
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
