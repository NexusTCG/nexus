import React from 'react';
import { ComponentType } from 'react';
import { energyIcons, gradeIcons } from "@/app/constants/iconData";

export type EnergyIconKey = keyof typeof energyIcons;
export type GradeIconKey = keyof typeof gradeIcons;
export type EnergyType = keyof typeof energyIcons;

// Nexus Card Creator Form Data
export type CardFormData = {
  cardCreator: string;
  cardName: string;
  cardCost: string[];
  cardColor: string;
  cardArt: string;
  cardType: string;
  cardSuperType: string;
  cardSubType: string[];
  cardGrade: string;
  cardText: string;
  cardFlavorText: string;
  cardAttack: string;
  cardDefense: string;
};

// Nexus Card Types
export type CardType = {
  id: number;
  name: string;
  description: string;
  flavor: string;
  superTypes: string[];
  subTypes: string[];
  isPermanent: boolean;
  isScript: boolean;
  icon: ComponentType;
};

// Nexus Entity Types
export type EntityType = {
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
  export type EnergyIcon = {
    name: string;
    value: string;
    icon: React.ElementType;
    tailwindClass: string;
    height: string;
    width: string;
    padding: string;
  };

  // Nexus Cost Types
  export type CostValues = {
    yellow?: number;
    blue?: number;
    purple?: number;
    red?: number;
    green?: number;
    colorless?: number;
  };

  