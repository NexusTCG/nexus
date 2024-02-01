import { CardFormDataType } from "@/app/utils/types/types";
import { monoColorOptions, dualColorOptions } from "@/app/utils/data/cardColorOptions";

export default function determineColor(
    activeCardCost: CardFormDataType["cardEnergyCost"],
    cardColorType: string
) {
    if (cardColorType === "node") {
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

    if (!coloredCosts && colorlessCost && cardColorType === "mono") {
        // If there's only void costs, return void
        return "void";

    } else if (
            coloredCosts && cardColorType === "mono"
        ) {
            // If there's only one non-void color,
            // find and return that color
            const monoColor = coloredCosts
                .find(([color]) => color !== monoColorOptions.void);
            return monoColor ? monoColor[0] : "default";

    } else if (
            coloredCosts && cardColorType === "dual"
        ) {
            // If there's two non-void colors, sort them,
            // then find and return the dual color pair
            const colorOrder = [
                "yellow",
                "blue",
                "purple",
                "red",
                "green"
            ];

            // Sort the dual color pair by color order
            const sortByColorOrder = (
                colorA: string,
                colorB: string
            ) => {
                const indexA = colorOrder.indexOf(colorA);
                const indexB = colorOrder.indexOf(colorB);
                return indexA - indexB;
            };

            // Get the sorted dual color pair
            const activeDualColors = coloredCosts
                .map(([color]) => color)
                .sort((a, b) => sortByColorOrder(a, b));

            // Find the dual color pair
            const colorKey = `${activeDualColors[0]}${activeDualColors[1]}`;
            const dualColorKey = Object.keys(dualColorOptions).find(
                key => key.toLowerCase() === colorKey.toLowerCase()
            );

            // Return the dual color pair
            return dualColorKey
                ? dualColorOptions[dualColorKey as keyof typeof dualColorOptions]
                : "default";

    } else if (coloredCosts && cardColorType === "multi") {
        // If there's three or more non-void colors, return multi
        return "multi"

    } else {
        // If there's no costs, return default
        return "default";
    };
};
