import entityTypes from "@/app/utils/data/entityTypes";
import { EntityTypesType } from "@/app/utils/types/types";

export const cardSuperTypeOptions = {
  default: "",
  mythic: "Mythic",
};

export const cardTypeOptions = {
  anomaly: "Anomaly",
  event: "Event",
  effect: "Effect",
  entity: "Entity",
  entityEffect: "Entity Effect",
  entityObject: "Entity Object",
  object: "Object",
  outpost: "Outpost",
  outpostObject: "Outpost Object",
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
  core: "Core",
  rare: "Rare",
  epic: "Epic",
  prime: "Prime",
};
