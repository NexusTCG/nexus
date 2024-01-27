import { ComponentType } from 'react';
// import { energyIcons, gradeIcons } from "@/app/utils/data/iconData";

// export type EnergyIconKey = keyof typeof energyIcons;
// export type GradeIconKey = keyof typeof gradeIcons;
// export type EnergyType = keyof typeof energyIcons;

// Nexus Card Creator Form Data
export type CardDataType = {
  cardCreator: string; // Required
  cardName: string; // Required
  cardCost?: { [key: string]: number }; // Optional, required if cardType is not "node"
  cardColor: string; // Not required
  cardArt: string; // Required
  cardType: string; // Required
  cardSuperType: string; // Not required
  cardSubType: string[]; // Not required
  cardSpeed?: string;  // Optional, required if cardType is not "node"
  cardGrade: string; // Required, default: "Common"
  cardText: string; // Required
  cardFlavorText: string; // Not required
  cardAttack: string; // Not required
  cardDefense: string; // Not required
  cardPrompt: string; // Not required
};


// Nexus Card Types
export type CardTypeType = {
  event: string;
  entity: string;
  effect: string;
  object: string;
  node: string;
};

// Nexus Card Types
// export type CardType = {
//   id: number;
//   name: string;
//   description: string;
//   flavor: string;
//   superTypes: string[];
//   subTypes: string[];
//   isPermanent: boolean;
//   isScript: boolean;
//   icon: ComponentType;
// };

// Nexus Entity Types
export type EntityTypeType = {
    id: number;
    name: string;
    description: string;
    artPrompt: string;
    primaryColors: string[];
    secondaryColors: string[];
    planets: string[];
    frequency: string;
    role: boolean;
    // icon: ComponentType;
  };

  // Nexus Energy Types
  // export type EnergyIcon = {
  //   name: string;
  //   value: string;
  //   icon: React.ElementType;
  //   tailwindClass: string;
  //   height: string;
  //   width: string;
  //   padding: string;
  // };

  // Nexus Cost Types
  export type CardCostType = {
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
  