import { CardFormDataType } from "@/app/utils/types/types";

export default function resetEnergyCost(
    activeCardCost: CardFormDataType["cardEnergyCost"]
) {
    if (!activeCardCost) return;
    const resetCosts = Object.keys(
        activeCardCost || {}
    ).reduce<{
        [key: string]: number
    }>((acc, key) => {
        acc[key] = 0;
        return acc;
    }, {});

    return resetCosts;
};
