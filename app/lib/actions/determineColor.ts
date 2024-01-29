import { CardFormDataType } from "@/app/utils/types/types";
import { monoColorOptions, dualColorOptions } from "@/app/utils/data/cardColorOptions";

export default function determineColor(
    cardEnergyCost: CardFormDataType["cardEnergyCost"],
    cardColorType: string,
) {
    const energyCostEntries = Object.entries(cardEnergyCost ?? {});

    const coloredCosts = energyCostEntries
    .filter(
        ([color, value]) =>
        color !== monoColorOptions.void
        && value > 0
    );

    if (!coloredCosts && energyCostEntries.length === 1) {
        return "void";
    } else if (cardColorType === "mono") {
        const monoColor = coloredCosts
            .find(([color]) => color !== monoColorOptions.void);
        return monoColor ? monoColor[0] : "void";
    } else if (cardColorType === "dual" && coloredCosts.length === 2) {
        const activeColors = coloredCosts
            .map(([color]) => color)
            .sort();
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
        return null;
    };
};
