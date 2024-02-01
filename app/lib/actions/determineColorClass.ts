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
            return cardColor; // yellowBlue, yellowPurple, etc.

        case "multi":
            return "multi"

        case "node":
            return "node";

        default:
            return "default"; // default
    };
};