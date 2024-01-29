import entityTypes from "@/app/utils/data/entityTypes";
import { EntityTypesType } from "@/app/utils/types/types";

export const cardSuperTypeOptions = {
  mythic: "Mythic",
  core: "Core",
};

export const cardTypeOptions = {
  entity: "Entity",
  event: "Event",
  effect: "Effect",
  object: "Object",
  node: "Node",
};

export const cardSpeedOptions = {
  speedOne: "1",
  speedTwo: "2",
  speedThree: "3",
};

export const cardSubTypeOptions = {
  entity: Object.fromEntries(
    entityTypes.map((entityType: EntityTypesType) => [
      entityType.name.toLowerCase(),
      entityType.name,
    ]),
  ),
  object: {
    gear: "Gear",
  },
  effect: {
    alteration: "Alteration",
  },
};

export const cardGradeOptions = {
  common: "Common",
  rare: "Rare",
  epic: "Epic",
  prime: "Prime",
};
