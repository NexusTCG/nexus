import { CardFormDataType } from "@/app/utils/types/types";

export default async function resetFieldsOnAnomaly(
    im_energy_cost: CardFormDataType["im_energy_cost"]
) {

    const resetCosts = Object.keys(
        im_energy_cost || {}
    ).reduce<{
        [key: string]: number
    }>((acc, key) => {
        acc[key] = 0;
        return acc;
    }, {});

    return resetCosts;
};
