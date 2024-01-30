    import { CardFormDataType } from "@/app/utils/types/types";


    export default function determineColorClass(
        activeCardType: CardFormDataType["cardType"],
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
                        return "blue";
                    case "purple":
                        return "violet";
                    case "red":
                        return "red";
                    case "green":
                        return "lime";
                    case "void":
                        return "gray";
                    default:
                        return "slate";
                };
            case "dual":
                switch (cardColor) {
                    case "yellowBlue":
                        return "yellow-blue";
                    case "yellowPurple":
                        return "yellow-purple";
                    case "yellowRed":
                        return "yellow-red";
                    case "yellowGreen":
                        return "yellow-green";
                    case "bluePurple":
                        return "blue-purple";
                    case "blueRed":
                        return "blue-red";
                    case "blueGreen":
                        return "blue-green";
                    case "purpleRed":
                        return "purple-red";
                    case "purpleGreen":
                        return "purple-green";
                    case "redGreen":
                        return "red-green";
                    default:
                        return "slate";
                };
            case "multi":
                return "multi"
            default:
                return "slate";
        };
    };