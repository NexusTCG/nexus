import entityTypes from "@/app/utils/data/entityTypes";
import { EntityTypesType } from "@/app/utils/types/types";

export const cardSuperTypeOptions = {
  default: "",
  mythic: "Mythic",
  core: "Core",
};

export const cardTypeOptions = {
  entity: "Entity",
  event: "Event",
  effect: "Effect",
  entityEffect: "Entity Effect",
  object: "Object",
  entityObject: "Entity Object",
  node: "Node",
};

export const cardSubTypeOptions = {
  default: "",
  entity: Object.fromEntries(
    entityTypes.map((
      entityType: EntityTypesType
    ) => [
      entityType.name,
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
