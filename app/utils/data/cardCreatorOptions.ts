import entityTypes from "@/app/utils/data/entityTypes";
import { EntityTypeType } from "@/app/utils/types/types";

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
   speedThree: "3"
};

 export const cardSubTypeOptions = {
   entity: Object.fromEntries(
      entityTypes.map((entityType: EntityTypeType) => [
        entityType.name.toLowerCase(),
        entityType.name,
      ])
    ),
   object: {
      gear: 'Gear',
   },
   effect: {
      alteration: "Alteration",
   },
 };

 export const cardGradeOptions = {
    common: 'Common',
    rare: 'Rare',
    epic: 'Epic',
    prime: 'Prime',
 };

//  Make a text field for card stats
//  export const cardStatsOptions = {
//    "0": "0",
//    "1": "1",
//    "2": "2",
//    "3": "3",
//    "4": "4",
//    "5": "5",
//    "6": "6",
//    "7": "7",
//    "8": "8",
//    "9": "9",
//    "10": "10",
//    "11": "11",
//    "12": "12",
//    "13": "13",
//    "14": "14",
//    "15": "15",
//  };