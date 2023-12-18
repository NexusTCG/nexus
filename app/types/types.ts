import React from 'react';
import { ComponentType } from 'react';
import { energyIcons, gradeIcons } from "@/app/constants/iconData";

export type EnergyIconKey = keyof typeof energyIcons;
export type GradeIconKey = keyof typeof gradeIcons;
export type EnergyType = keyof typeof energyIcons;
export type EnergyCount = { [K in EnergyType]?: number };

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

  export type EnergyIcon = {
    name: string;
    value: string;
    icon: React.ElementType;
    tailwindClass: string;
    height: string;
    width: string;
    padding: string;
  };