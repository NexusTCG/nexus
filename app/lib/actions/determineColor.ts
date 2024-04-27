import { CardFormDataType } from "@/app/utils/types/types";
import {
  monoEnergyOptions,
  dualEnergyOptions
} from "@/app/utils/data/cardEnergyOptions";

export default function determineEnergy(
    im_energy_cost: CardFormDataType["im_energy_cost"],
    cardCostType: string
) {
    if (cardCostType === "anomaly") {
      return "anomaly";
    }

    // Get energy and value pairs
    const energyCostEntries = Object
    .entries(
      im_energy_cost ?? {}
    );

    // Get non-void energys with value > 0
    const nonVoidEnergyCosts = energyCostEntries
    .filter(
      ([energy, value]) =>
      energy !== monoEnergyOptions.void
      && value > 0
    );

    // Get void colors with value > 0
    const voidEnergyCosts = energyCostEntries
    .filter(
      ([energy, value]) =>
      energy === monoEnergyOptions.void
      && value > 0
    );

    if (
      nonVoidEnergyCosts.length === 0 && 
      voidEnergyCosts.length > 0 && 
      cardCostType === "mono"
    ) {
      // If there's only void costs, return void
      return "void";

    } else if (
      nonVoidEnergyCosts && 
      cardCostType === "mono"
    ) {
      // If there's only one non-void energy,
      // find and return that energy
      const monoEnergy = nonVoidEnergyCosts
          .find(([energy]) => energy !== monoEnergyOptions.void);
      return monoEnergy ? monoEnergy[0] : "default";

    } else if (
      nonVoidEnergyCosts && 
      cardCostType === "dual"
    ) {
      // If there's two non-void energies, sort them,
      // then find and return the dual energy pair
      const energyOrder = [
        "radiant",
        "volatile",
        "corrupt",
        "blaze",
        "verdant"
      ];

      // Sort the dual energy pair by energy order
      const sortByEnergyOrder = (
        energyA: string,
        energyB: string
      ) => {
        const indexA = energyOrder.indexOf(energyA);
        const indexB = energyOrder.indexOf(energyB);
        return indexA - indexB;
      };

      // Get the sorted dual energy pair
      const activeDualEnergies = nonVoidEnergyCosts
        .map(([energy]) => energy)
        .sort((a, b) => sortByEnergyOrder(a, b));

      // Find the dual energy pair
      const energyKey = `${activeDualEnergies[0]}${activeDualEnergies[1]}`;
      const dualEnergyKey = Object.keys(dualEnergyOptions).find(
        key => key.toLowerCase() === energyKey.toLowerCase()
      );

      // Return the dual energy pair
      return dualEnergyKey
        ? dualEnergyOptions[dualEnergyKey as keyof typeof dualEnergyOptions]
        : "default";

    } else if (
      nonVoidEnergyCosts && 
      cardCostType === "multi"
    ) {
      // If there's three or more non-void energies, return multi
      return "multi"

    } else {
      // If there's no costs, return default
      return "default";
    };
};
