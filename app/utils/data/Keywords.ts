import { KeywordsType } from "@/app/utils/types/types";

export const Keywords: KeywordsType = {
  adept: {
    name: "Adept",
    reminder: "This unit gets this effect while in a biome aligned with any of its energy types",
    type: "persistent",
    unique: false,
  },
  aftermath: {
    name: "Aftermath",
    reminder: "This reacts at the end of the battle phase",
    type: "reactive",
    unique: true,
  },
  emanate: {
    name: "Emanate",
    reminder: "While this is in a biome, this effect applies to that biome",
    type: "persistent",
    unique: false,
  },
  evasion: {
    name: "Evasion",
    reminder: "This unit can only be defended by units with evasion or intercept",
    type: "persistent",
    unique: false,
  },
  intimidate: {
    name: "Intimidate",
    reminder: "This unit can't be defended by defenders with less attack",
    type: "persistent",
    unique: false,
  },
  network: {
    name: "Network",
    reminder: "While this is in a biome, friendly units in neighbouring biomes, each gains effect",
    type: "persistent",
    unique: false,
  },
  kinship: {
    name: "Kinship",
    reminder: "Other friendly units that share an entity type with this, get this effect",
    type: "persistent",
    unique: false,
  },
  stealth: {
    name: "Stealth",
    reminder: "This unit can't be defended",
    type: "persistent",
    unique: false,
  },
  intercept: {
    name: "Intercept",
    reminder: "This can defend units with evasion",
    type: "persistent",
    unique: false,
  },
  lightspeed: {
    name: "Lightspeed",
    reminder: "This can't be targeted by actions with lower speed",
    type: "persistent",
    unique: false,
  },
  ready: {
    name: "Ready",
    reminder: "This unit can lock the turn it appears on the planet",
    type: "persistent",
    unique: false,
  },
  secure: {
    name: "Secure",
    reminder: "This unit does not lock while in a biome",
    type: "persistent",
    unique: false,
  },
  quantum: {
    name: "Quantum",
    reminder: "This unit can defend up to two units, in different biomes",
    type: "persistent",
    unique: false,
  },
  amplify: {
    name: "Amplify",
    reminder: "When you play a non-unit function, this unit temporarily gets increase 1",
    type: "reactive",
    unique: false,
  },
  cleanup: {
    name: "Cleanup",
    reminder: "This reacts at the beginning of your end phase",
    type: "reactive",
    unique: false,
  },
  deflect: {
    name: "Deflect",
    reminder: "While this unit's range is melee, avoid N ranged battle damage dealt to it by enemy units",
    type: "reactive",
    unique: false,
  },
  deploy: {
    name: "Deploy",
    reminder: "This react when this appears on the planet",
    type: "reactive",
    unique: false,
  },
  despawn: {
    name: "Despawn",
    reminder: "This reacts when this is put into a cache from the planet",
    type: "reactive",
    unique: false,
  },
  distort: {
    name: "Distort",
    reminder: "When this appears on the planet, if its an anomaly, this effect reacts",
    type: "reactive",
    unique: false,
  },
  exploit: {
    name: "Exploit",
    reminder: "This reacts when this unit deals battle damage to an enemy",
    type: "reactive",
    unique: false,
  },
  initiate: {
    name: "Initiate",
    reminder: "This reacts when this unit attacks",
    type: "reactive",
    unique: false,
  },
  transfuse: {
    name: "Transfuse",
    reminder: "When this deals damage to a unit or target, restore that much durability to target friendly sector",
    type: "reactive",
    unique: false,
  },
  magnetic: {
    name: "Magnetic",
    reminder: "When another friendly entity is terminated, if it was geared, attach its gears to this entity",
    type: "reactive",
    unique: false,
  },
  overpower: {
    name: "Overpower",
    reminder: "When this deals terminal damage to an enemy unit, if it was in a biome, surplus damage is dealt to the enemy sector in that biome",
    type: "reactive",
    unique: false,
  },
  surge: {
    name: "Surge",
    reminder: "This reacts when you activate your special",
    type: "reactive",
    unique: false,
  },
  virus: {
    name: "Virus",
    reminder: "Any damage this deals to units is terminal",
    type: "reactive",
    unique: false,
  },
  erase: {
    name: "Erase N",
    reminder: "Cache N cards of a deck",
    type: "activated",
    unique: false,
  },
  hack: {
    name: "Hack",
    reminder: "Unlock target unit, temporarily take control of it. It temporarily gains ready",
    type: "activated",
    unique: false,
  },
  hologram: {
    name: "Hologram",
    reminder: "Spawn a copy of the target. Delete it at its controller's next reset step",
    type: "activated",
    unique: false,
  },
  overclock: {
    name: "Overclock N",
    reminder: "Increase the speed of a function or skill by N",
    type: "activated",
    unique: false,
  },
  scan: {
    name: "Scan N",
    reminder: "Review N cards, bottom any of number of them, and top the rest",
    type: "scan",
    unique: false,
  },
  shift: {
    name: "shift",
    reminder: "This unit permanently switches range",
    type: "activated",
    unique: false,
  },
};