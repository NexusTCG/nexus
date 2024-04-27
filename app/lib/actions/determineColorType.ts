import { CardFormDataType } from "@/app/utils/types/types";
import { monoEnergyOptions } from "@/app/utils/data/cardEnergyOptions";

export default function determineEnergyType(
    im_energy_cost: CardFormDataType["im_energy_cost"],
    im_type: CardFormDataType["im_type"]
) {

    if (im_type?.includes("anomaly")) {
      // If the card type is anomaly, return anomaly
      return "anomaly";
    }

    // Get color and value pairs
    const energyCostEntries = Object
    .entries(
      im_energy_cost ?? {}
    );

    // Get non-void energy with value > 0
    const nonVoidEnergyCosts = energyCostEntries
    .filter(
      ([energy, value]) =>
      monoEnergyOptions.void && 
      !monoEnergyOptions.void.includes(energy)
      && value > 0
    );

    // Get void energy with value > 0
    const voidEnergyCost = energyCostEntries
    .filter(
      ([energy, value]) =>
      monoEnergyOptions.void && 
      monoEnergyOptions.void.includes(energy)
      && value > 0
    );

    // Determine energy type
    if (voidEnergyCost.length > 0 && nonVoidEnergyCosts.length === 0) {
      // If there's only void costs, return mono
      return "mono";
    } else if (nonVoidEnergyCosts.length === 1) {
      // If there's only one non-void energy, return mono
      return "mono";
    } else if (nonVoidEnergyCosts.length === 2) {
      // If there's two non-void energy, return dual
      return "dual";
    } else if (nonVoidEnergyCosts.length >= 3) {
      // If there's three or more non-void energy, return multi
      return "multi";
    }

    // If there's no costs, return default
    return "default"
};
