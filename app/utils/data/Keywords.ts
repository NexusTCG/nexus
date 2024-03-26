
import { KeywordsType } from "@/app/utils/types/types";

export const Keywords: KeywordsType = {
  adept: {
    name: "Adept",
    reminder: "This unit gets this effect while in a biome aligned with any of its energy types",
    type: "persistent",
  },
  emanate: {
    name: "Emanate",
    reminder: "While this is in a biome, this effect applies to that biome",
    type: "persistent",
  },
  evasion: {
    name: "Evasion",
    reminder: "This unit can only be defended by units with evasion or intercept",
    type: "persistent",
  },
  intimidate: {
    name: "Intimidate",
    reminder: "This unit can't be defended by defenders with less attack",
    type: "persistent",
  },
  network: {
    name: "Network",
    reminder: "While this is in a biome, friendly units in neighbouring biomes, each gains effect",
    type: "persistent",
  },
  kinship: {
    name: "Kinship",
    reminder: "Other friendly units that share an entity type with this, get this effect",
    type: "persistent",
  },
  stealth: {
    name: "Stealth",
    reminder: "This unit can't be defended",
    type: "persistent",
  },
  intercept: {
    name: "Intercept",
    reminder: "This can defend units with evasion",
    type: "persistent",
  },
  lightspeed: {
    name: "Lightspeed",
    reminder: "This can't be targeted by actions with lower speed",
    type: "persistent",
  },
  ready: {
    name: "Ready",
    reminder: "This unit can lock the turn it appears on the planet",
    type: "persistent",
  },
  secure: {
    name: "Secure",
    reminder: "This unit does not lock while in a biome",
    type: "persistent",
  },
  quantum: {
    name: "Quantum",
    reminder: "This unit can defend up to two units, in different biomes",
    type: "persistent",
  },
  amplify: {
    name: "Amplify",
    reminder: "When you play a non-unit function, this unit temporarily gets increase 1",
    type: "reactive",
  },
  cleanup: {
    name: "Cleanup",
    reminder: "This reacts at the beginning of your end phase",
    type: "reactive",
  },
  deflect: {
    name: "Deflect",
    reminder: "While this unit's range is melee, avoid N ranged battle damage dealt to it by enemy units",
    type: "reactive",
  },
  deploy: {
    name: "Deploy",
    reminder: "This react when this appears on the planet",
    type: "reactive",
  },
  despawn: {
    name: "Despawn",
    reminder: "This reacts when this is put into a cache from the planet",
    type: "reactive",
  },
  distort: {
    name: "Distort",
    reminder: "When this appears on the planet, if its an anomaly, this effect reacts",
    type: "reactive",
  },
  exploit: {
    name: "Exploit",
    reminder: "This reacts when this unit deals battle damage to an enemy",
    type: "reactive",
  },
  initiate: {
    name: "Initiate",
    reminder: "This reacts when this unit attacks",
    type: "reactive",
  },
  transfuse: {
    name: "Transfuse",
    reminder: "When this deals damage to a unit or target, restore that much durability to target friendly sector",
    type: "reactive",
  },
  magnetic: {
    name: "Magnetic",
    reminder: "When another friendly entity is terminated, if it was geared, attach its gears to this entity",
    type: "reactive",
  },
  overpower: {
    name: "Overpower",
    reminder: "When this deals terminal damage to an enemy unit, if it was in a biome, surplus damage is dealt to the enemy sector in that biome",
    type: "reactive",
  },
  surge: {
    name: "surge",
    reminder: "This reacts when you activate your special",
    type: "reactive",
  },
  virus: {
    name: "Virus",
    reminder: "Any damage this deals to units is terminal",
    type: "reactive",
  },
  erase: {
    name: "Erase N",
    reminder: "Cache N cards of a deck",
    type: "activated",
  },
  hack: {
    name: "Hack",
    reminder: "Unlock target unit, temporarily take control of it. It temporarily gains ready",
    type: "activated",
  },
  hologram: {
    name: "Hologram",
    reminder: "Spawn a copy of the target. Delete it at its controller's next reset step",
    type: "activated",
  },
  overclock: {
    name: "Overclock N",
    reminder: "Increase the speed of a function or skill by N",
    type: "activated",
  },
  scan: {
    name: "Scan N",
    reminder: "Review N cards, bottom any of number of them, and top the rest",
    type: "scan",
  },
  shift: {
    name: "shift",
    reminder: "This unit permanently switches range",
    type: "activated",
  },
};