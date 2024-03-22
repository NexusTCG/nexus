import { CardFormDataType } from "@/app/utils/types/types";

export default async function resetFieldsOnAnomaly(
    activeCardCost: CardFormDataType["cardEnergyCost"]
) {

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
