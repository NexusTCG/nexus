import { CardFormDataType } from "@/app/utils/types/types";
import { monoColorOptions } from "@/app/utils/data/cardColorOptions";

export default function determineColorType(
    cardEnergyCost: CardFormDataType["cardEnergyCost"]
) {
    const energyCostEntries = Object
    .entries(
        cardEnergyCost ?? {}
    );

    const coloredCosts = energyCostEntries
    .filter(
        ([color, value]) =>
        color !== monoColorOptions.void
        && value > 0
    );
    
    if (coloredCosts.length === 0) {
        return "void";
    } else if (energyCostEntries.length === 1) {
        return "mono";
    } else if (coloredCosts.length === 2) {
        return "dual";
    } else if (coloredCosts.length >= 3) {
        return "multi";
    } else {
        return "default"
    };
};