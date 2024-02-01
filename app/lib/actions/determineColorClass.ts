export default function determineColorClass(
    cardColorType: string,
    cardColor: string
) {
    switch (cardColorType) {
        case "mono":
            switch (cardColor) {
                case "yellow":
                    return "yellow";

                case "blue":
                    return "sky";

                case "purple":
                    return "violet";

                case "red":
                    return "red";

                case "green":
                    return "lime";

                default:
                    return "gray"; // void
            };

        case "dual":
            switch (cardColor) {
                case "yellowBlue":
                    return "yellowBlue";

                case "yellowPurple":
                    return "yellowPurple";

                case "yellowRed":
                    return "yellowRed";

                case "yellowGreen":
                    return "yellowGreen";

                case "bluePurple":
                    return "bluePurple";

                case "blueRed":
                    return "blueRed";

                case "blueGreen":
                    return "blueGreen";

                case "purpleRed":
                    return "purpleRed";

                case "purpleGreen":
                    return "purpleGreen";

                default:
                    return "redGreen"; // redGreen
            };

        case "multi":
            return "multi"

        case "node":
            return "node";

        default:
            return "default"; // default
    };
};