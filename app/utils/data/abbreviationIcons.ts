import { StaticImageData } from 'next/image';
import EnergyRadiant from "@/public/images/card-parts/card-icons/card-cost/energy-radiant.svg";
import EnergyVolatile from "@/public/images/card-parts/card-icons/card-cost/energy-volatile.svg";
import EnergyCorrupt from "@/public/images/card-parts/card-icons/card-cost/energy-corrupt.svg";
import EnergyBlaze from "@/public/images/card-parts/card-icons/card-cost/energy-blaze.svg";
import EnergyVerdant from "@/public/images/card-parts/card-icons/card-cost/energy-verdant.svg";
import EnergyVoid0 from "@/public/images/card-parts/card-icons/card-cost/energy-void-0.svg";
import EnergyVoid1 from "@/public/images/card-parts/card-icons/card-cost/energy-void-1.svg";
import EnergyVoid2 from "@/public/images/card-parts/card-icons/card-cost/energy-void-2.svg";
import EnergyVoid3 from "@/public/images/card-parts/card-icons/card-cost/energy-void-3.svg";
import EnergyVoid4 from "@/public/images/card-parts/card-icons/card-cost/energy-void-4.svg";
import EnergyVoid5 from "@/public/images/card-parts/card-icons/card-cost/energy-void-5.svg";
import EnergyVoid6 from "@/public/images/card-parts/card-icons/card-cost/energy-void-6.svg";
import EnergyVoid7 from "@/public/images/card-parts/card-icons/card-cost/energy-void-7.svg";
import EnergyVoid8 from "@/public/images/card-parts/card-icons/card-cost/energy-void-8.svg";
import EnergyVoid9 from "@/public/images/card-parts/card-icons/card-cost/energy-void-9.svg";
import EnergyVoid10 from "@/public/images/card-parts/card-icons/card-cost/energy-void-10.svg";
import EnergyVoid11 from "@/public/images/card-parts/card-icons/card-cost/energy-void-11.svg";
import EnergyVoid12 from "@/public/images/card-parts/card-icons/card-cost/energy-void-12.svg";
import EnergyVoid13 from "@/public/images/card-parts/card-icons/card-cost/energy-void-13.svg";
import EnergyVoid14 from "@/public/images/card-parts/card-icons/card-cost/energy-void-14.svg";
import EnergyVoid15 from "@/public/images/card-parts/card-icons/card-cost/energy-void-15.svg";
import EnergyVoidX from "@/public/images/card-parts/card-icons/card-cost/energy-void-x.svg";

import RangeMelee from "@/public/images/card-parts/card-icons/range-melee.svg";
import RangeRanged from "@/public/images/card-parts/card-icons/range-ranged.svg";
import Speed1 from "@/public/images/card-parts/card-icons/speed1.svg";
import Speed2 from "@/public/images/card-parts/card-icons/speed2.svg";
import Speed3 from "@/public/images/card-parts/card-icons/speed3.svg";
import StateLocked from "@/public/images/card-parts/card-icons/state-locked.svg";
import StateUnlocked from "@/public/images/card-parts/card-icons/state-unlocked.svg";

type abbreviationIcons = {
  [key: string]: StaticImageData | StaticImageData[];
};

export const abbreviationIcons = {
  "{R}": { src: EnergyRadiant, name: "Radiant Energy"},
  "{V}": { src: EnergyVolatile, name: "Volatile Energy"},
  "{C}": { src: EnergyCorrupt, name: "Corrupt Energy"},
  "{B}": { src: EnergyBlaze, name: "Blaze Energy"},
  "{E}": { src: EnergyVerdant, name: "Verdant Energy"},
  "{0}": { src: EnergyVoid0, name: "Void Energy 0"},
  "{1}": { src: EnergyVoid1, name: "Void Energy 1"},
  "{2}": { src: EnergyVoid2, name: "Void Energy 2"},
  "{3}": { src: EnergyVoid3, name: "Void Energy 3"},
  "{4}": { src: EnergyVoid4, name: "Void Energy 4"},
  "{5}": { src: EnergyVoid5, name: "Void Energy 5"},
  "{6}": { src: EnergyVoid6, name: "Void Energy 6"},
  "{7}": { src: EnergyVoid7, name: "Void Energy 7"},
  "{8}": { src: EnergyVoid8, name: "Void Energy 8"},
  "{9}": { src: EnergyVoid9, name: "Void Energy 9"},
  "{10}": { src: EnergyVoid10, name: "Void Energy 10"},
  "{11}": { src: EnergyVoid11, name: "Void Energy 11"},
  "{12}": { src: EnergyVoid12, name: "Void Energy 12"},
  "{13}": { src: EnergyVoid13, name: "Void Energy 13"},
  "{14}": { src: EnergyVoid14, name: "Void Energy 14"},
  "{15}": { src: EnergyVoid15, name: "Void Energy 15"},
  "{X}": { src: EnergyVoidX, name: "Void Energy X"},
  "{RM}": { src: RangeMelee, name: "Melee"},
  "{RR}": { src: RangeRanged, name: "Ranged"},
  "{S1}": { src: Speed1, name: "Speed 1"},
  "{S2}": { src: Speed2, name: "Speed 2"},
  "{S3}": { src: Speed3, name: "Speed 3"},
  "{L}": { src: StateLocked, name: "Locked"},
  "{U}": { src: StateUnlocked, name: "Unlocked"},
}