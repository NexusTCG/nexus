import { CardFormDataType } from "@/app/utils/types/types";
import { monoColorOptions, dualColorOptions } from "@/app/utils/data/cardColorOptions";

export default function determineColor(
    activeCardCost: CardFormDataType["cardEnergyCost"],
    cardColorType: string
) {
    const energyCostEntries = Object.entries(activeCardCost ?? {});

    const coloredCosts = energyCostEntries
        .filter(
            ([color, value]) =>
            color !== monoColorOptions.void
            && value > 0
    );

    if (!coloredCosts && energyCostEntries.length === 1) {
        return "void";
    } else if (
            cardColorType === "mono"
        ) {
            const monoColor = coloredCosts
                .find(([color]) => color !== monoColorOptions.void);
            return monoColor ? monoColor[0] : "void";
    } else if (
            cardColorType === "dual" &&
            coloredCosts.length === 2
        ) {
            const colorOrder = ["yellow", "blue", "purple", "red", "green"];

            const sortByColorOrder = (colorA: string, colorB: string) => {
                const indexA = colorOrder.indexOf(colorA);
                const indexB = colorOrder.indexOf(colorB);
                return indexA - indexB;
            };

            const activeColors = coloredCosts
                .map(([color]) => color)
                .sort((a, b) => sortByColorOrder(a, b));

            const colorKey = `${activeColors[0]}${activeColors[1]}`;
            const dualColorKey = Object.keys(dualColorOptions).find(
                key => key.toLowerCase() === colorKey.toLowerCase()
            );
        return dualColorKey
            ? dualColorOptions[dualColorKey as keyof typeof dualColorOptions]
            : null;
    } else if (cardColorType === "multi") {
        return "multi"
    } else {
        return "default";
    };
};
