export default function determineColorClass(
    cardCostType: string,
    cardEnergy: string
) {
    switch (cardCostType) {
        case "mono":
            switch (cardEnergy) {
                case "radiant":
                    return "radiant";

                case "volatile":
                    return "sky";

                case "corrupt":
                    return "violet";

                case "blaze":
                    return "blaze";

                case "verdant":
                    return "lime";

                // void
                default:
                    return "gray";
            };

        case "dual":
            switch (cardEnergy) {
                case "radiantVolatile":
                    return "radiantVolatile";

                case "radiantCorrupt":
                    return "radiantCorrupt";

                case "radiantBlaze":
                    return "radiantBlaze";

                case "radiantVerdant":
                    return "radiantVerdant";

                case "volatileCorrupt":
                    return "volatileCorrupt";

                case "volatileBlaze":
                    return "volatileBlaze";

                case "volatileVerdant":
                    return "volatilevVerdant";

                case "corruptBlaze":
                    return "corruptBlaze";

                case "corruptVerdant":
                    return "corruptVerdant";

                default:
                    return "blazeVerdant";
            };

        case "multi":
            return "multi"

        case "anomaly":
            return "anomaly";

        default:
            return "default";
    };
};