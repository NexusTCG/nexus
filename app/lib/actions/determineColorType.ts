import { CardFormDataType } from "@/app/utils/types/types";
import { monoColorOptions } from "@/app/utils/data/cardColorOptions";

export default function determineColorType(
    activeCardCost: CardFormDataType["cardEnergyCost"],
    activeCardType: CardFormDataType["cardType"]
) {

    if (activeCardType === "node") {
        // If the card type is node, return node
        return "node";
    }

    // Get color and value pairs
    const energyCostEntries = Object
    .entries(
        activeCardCost ?? {}
    );

    // Get non-void colors with value > 0
    const coloredCosts = energyCostEntries
    .filter(
        ([color, value]) =>
        color !== monoColorOptions.void
        && value > 0
    );

    // Get void colors with value > 0
    const colorlessCost = energyCostEntries
    .filter(
        ([color, value]) =>
        color === monoColorOptions.void
        && value > 0
    );

    // Determine color type
    if (colorlessCost && !coloredCosts) {
        // If there's only void costs, return mono
        return "mono";
    } else if (coloredCosts.length === 1) {
        // If there's only one non-void color, return mono
        return "mono";
    } else if (coloredCosts.length === 2) {
        // If there's two non-void colors, return dual
        return "dual";
    } else if (coloredCosts.length >= 3) {
        // If there's three or more non-void colors, return multi
        return "multi";
    }

    // If there's no costs, return default
    return "default"
};