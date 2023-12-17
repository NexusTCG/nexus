import { ComponentType } from 'react';
import { energyIcons, gradeIcons } from "../constants/iconData";

export type EnergyIconKey = keyof typeof energyIcons;
export type GradeIconKey = keyof typeof gradeIcons;

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