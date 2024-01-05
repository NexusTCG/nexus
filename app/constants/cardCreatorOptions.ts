import { EntityType } from '../types/types';
import entityTypes from "./entityTypes";

export const cardSuperTypeOptions = {
    mythic: "Mythic",
    base: "Base",
 };

 export const cardTypeOptions = {
    entity: "Entity",
    interrupt: "Interrupt",
    sequence: "Sequence",
    machine: "Machine",
    enhancement: "Enhancement",
    source: "Source",
 };

 export const cardSubTypeOptions = {
   entity: Object.fromEntries(
      entityTypes.map((entityType: EntityType) => [
        entityType.name.toLowerCase(),
        entityType.name,
      ])
    ),
   machine: {
      craft: "Craft",
      gear: 'Gear',
   },
   enhancement: {
      augmentation: "Augmentation",
   },
 };

 export const cardGradeOptions = {
    common: 'C',
    uncommon: 'UC',
    rare: 'R',
    prime: 'P',
 };

 export const cardStatsOptions = {
    0: '0',
    1: '1',
 };