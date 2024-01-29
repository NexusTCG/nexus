export default function determineColorClass(
    activeCardType: string,
    cardColorType: string,
    cardColor: string,
) {

    if (!cardColor && activeCardType === "node") {
        return "amber";
    };

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
                case "void":
                    return "void";
                default:
                    return "gray";
            };
        case "dual":
            return cardColor;
        case "multi":
            return "multi";
        default:
            return "default";
    };
};