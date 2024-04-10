export const gameKeywords = [
  {
    "id": 1, 
    "keyword": "Adept", 
    "definition": "Adept: [effect] (This unit gets this effect while in a biome aligned with any of its energy types).",
    "type": "persistent",
  },
  {
    "id": 2, 
    "keyword": "Emanate", 
    "definition": "Emanate: [effect] (While this is in a biome, this effect applies to that biome).",
    "type": "persistent",
  },
  {
    "id": 3, 
    "keyword": "Evasion", 
    "definition": "Evasion (This unit can only be defended by units with evasion or intercept).",
    "type": "persistent",
  },
  {
    "id": 4, 
    "keyword": "Intimidate", 
    "definition": "Intimidate (This unit can't be defended by defenders with lower attack).",
    "type": "persistent",
  },
  {
    "id": 5, 
    "keyword": "Network", 
    "definition": "Network: [effect] (While this is in a biome, friendly units in neighbouring biomes, each gains effect).",
    "type": "persistent",
  },
  {
    "id": 6, 
    "keyword": "Stealth", 
    "definition": "Stealth (This unit can't be defended).",
    "type": "persistent",
  },
  {
    "id": 7, 
    "keyword": "Intercept", 
    "definition": "Intercept (This can defend units with evasion).",
    "type": "persistent",
  },
  {
    "id": 8, 
    "keyword": "Lightspeed", 
    "definition": "Lightspeed (This can't be targeted by actions with lower speed).",
    "type": "persistent",
  },
  {
    "id": 9, 
    "keyword": "Ready", 
    "definition": "Ready (This unit can lock the turn it appears on the planet.",
    "type": "persistent",
  },
  {
    "id": 10, 
    "keyword": "Secure", 
    "definition": "Secure (This unit does not lock while in a biome).",
    "type": "persistent",
  },
  {
    "id": 11, 
    "keyword": "Quantum", 
    "definition": "Quantum (This unit can defend an extra unit, in another biome).",
    "type": "persistent",
  },
  {
    "id": 12, 
    "keyword": "Aftermath", 
    "definition": "Aftermath: [effect] (This triggers at the end of the battle phase).",
    "type": "reactive",
  },
  {
    "id": 13, 
    "keyword": "Amplify", 
    "definition": "Amplify (When you play a non-unit, this unit temporarily gets increase 1).",
    "type": "reactive",
  },{
    "id": 14, 
    "keyword": "Chain", 
    "definition": "Chain: [effect] (If you have played another function this turn, add this effect).",
    "type": "reactive",
  },
  {
    "id": 15, 
    "keyword": "Cleanup", 
    "definition": "Cleanup: [effect] (This reacts at the beginning of your end phase).",
    "type": "reactive",
  },
  {
    "id": 16, 
    "keyword": "Deflect N", 
    "definition": "Deflect [N] (While this unit's range is melee, avert N ranged battle damage dealt to it by enemy units).",
    "type": "reactive",
  },
  {
    "id": 17, 
    "keyword": "Deploy", 
    "definition": "Deploy: [effect] (This reacts when this appears on the planet).",
    "type": "reactive",
  },
  {
    "id": 18, 
    "keyword": "Despawn", 
    "definition": "Despawn: [effect] (This reacts when this is put into a cache from the planet).",
    "type": "reactive",
  },{
    "id": 19, 
    "keyword": "Encrypt", 
    "definition": "Encrypt: [condition] (While [condition], this unit can not be the target of an action).",
    "type": "reactive",
  },
  {
    "id": 20, 
    "keyword": "Exploit", 
    "definition": "Exploit: [effect] (This reacts when this unit deals battle damage to an enemy sector).",
    "type": "reactive",
  },
  {
    "id": 21, 
    "keyword": "Firewall", 
    "definition": "Firewall: [condition] (Opponents must [condition], as an extra cost to target this constant with an action).",
    "type": "reactive",
  },
  {
    "id": 22, 
    "keyword": "Initiate", 
    "definition": "Initiate: [effect] (This reacts when this unit attacks).",
    "type": "reactive",
  },
  {
    "id": 23, 
    "keyword": "Hack", 
    "definition": "Hack: [target] (Unlock the target, temporarily take control of it. It temporarily gains ready).",
    "type": "reactive",
  },{
    "id": 24, 
    "keyword": "Transfuse", 
    "definition": "Transfuse (When this deals damage to a unit in a biome or sector, your friendly sector in that biome gains that much durability).",
    "type": "reactive",
  },
  {
    "id": 25, 
    "keyword": "Magnetic", 
    "definition": "Magnetic (When another friendly unit is terminated, if it was geared, you may attached up to one of its gears to this unit).",
    "type": "reactive",
  },
  {
    "id": 26, 
    "keyword": "Overpower", 
    "definition": "Overpower (When this deals terminal damage to an enemy unit in a biome, surplus damage is dealt to the enemy sector).",
    "type": "reactive",
  },
  {
    "id": 27, 
    "keyword": "Setup", 
    "definition": "Setup: [effect] (This reacts at the beginning of your battle phase).",
    "type": "reactive",
  },
  {
    "id": 28, 
    "keyword": "Surge", 
    "definition": "Surge: [effect] (This reacts when you activate your special).",
    "type": "reactive",
  },{
    "id": 29, 
    "keyword": "Virus", 
    "definition": "Virus (Any damage this deals to units is terminal).",
    "type": "reactive",
  },
  {
    "id": 30, 
    "keyword": "Cache N", 
    "definition": "Cache [N] (Put the top N cards of a deck into its owners cache).",
    "type": "active",
  },
  {
    "id": 31, 
    "keyword": "Hologram", 
    "definition": "Hologram [target] (Spawn a copy of the target. Archive it at its controller's next reset step).",
    "type": "active",
  },
  {
    "id": 33, 
    "keyword": "Overclock N", 
    "definition": "Overclock [N] (Increase the speed of a function or skill by N).",
    "type": "active",
  },
  {
    "id": 33, 
    "keyword": "Scan N", 
    "definition": "Scan [N] (Review N cards, bottom any of number of them, and top the rest).",
    "type": "active",
  },
  {
    "id": 34, 
    "keyword": "Global N", 
    "definition": "Global [N] (You may pay this extra cost to remove all scope limits from this card).",
    "type": "active",
  },
  {
    "id": 35, 
    "keyword": "Shift", 
    "definition": "Shift (This unit permanently switches range).",
    "type": "active",
  },
]