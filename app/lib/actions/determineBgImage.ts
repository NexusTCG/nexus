import { CardFormDataType } from "@/app/utils/types/types";

export default function determineBgImage(
    activeCardType: CardFormDataType["cardType"],
    cardColor: string
) {

    switch (cardColor) {
        case "node":
            return "bg-[url('/images/card-parts/card-frames/other/node.png')]"

        case "yellow":
            if (activeCardType?.includes("object") || activeCardType?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/mono/object/object-yellow.png')]";

            } else if (activeCardType?.includes("effect") || activeCardType?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/mono/effect/effect-yellow.png')]";

            } else {
                return "bg-[url('/images/card-parts/card-frames/mono/yellow.png')]";
            };

        case "blue":
            if (activeCardType?.includes("object") || activeCardType?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/mono/object/object-blue.png')]";

            } else if (activeCardType?.includes("effect") || activeCardType?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/mono/effect/effect-blue.png')]";

            } else {
                return "bg-[url('/images/card-parts/card-frames/mono/blue.png')]";
            };

        case "purple":
            if (activeCardType?.includes("object") || activeCardType?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/mono/object/object-purple.png')]";

            } else if (activeCardType?.includes("effect") || activeCardType?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/mono/effect/effect-purple.png')]";

            } else {
                return "bg-[url('/images/card-parts/card-frames/mono/purple.png')]";
            };

        case "red":
            if (activeCardType?.includes("object") || activeCardType?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/mono/object/object-red.png')]";

            } else if (activeCardType?.includes("effect") || activeCardType?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/mono/effect/effect-red.png')]";

            } else {
                return "bg-[url('/images/card-parts/card-frames/mono/red.png')]";
            };
            
        case "green":
            if (activeCardType?.includes("object") || activeCardType?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/mono/object/object-green.png')]";

            } else if (activeCardType?.includes("effect") || activeCardType?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/mono/effect/effect-green.png')]";

            } else {
                return "bg-[url('/images/card-parts/card-frames/mono/green.png')]";
            };

        case "void":
            if (activeCardType?.includes("object") || activeCardType?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/mono/object/object-void.png')]";

            } else if (activeCardType?.includes("effect") || activeCardType?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/mono/effect/effect-void.png')]";

            } else {
                return "bg-[url('/images/card-parts/card-frames/mono/void.png')]";
            }

        case "yellowBlue":
            if (activeCardType?.includes("object") || activeCardType?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/dual/object/object-yellow-blue.png')]";

            } else if (activeCardType?.includes("effect") || activeCardType?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/dual/effect/effect-yellow-blue.png')]";

            } else {
                return "bg-[url('/images/card-parts/card-frames/dual/yellow-blue.png')]";
            };

        case "yellowPurple":
            if (activeCardType?.includes("object") || activeCardType?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/dual/object/object-yellow-purple.png')]";

            } else if (activeCardType?.includes("effect") || activeCardType?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/dual/effect/effect-yellow-purple.png')]";

            } else {
                return "bg-[url('/images/card-parts/card-frames/dual/yellow-purple.png')]";
            };

        case "yellowRed":
            if (activeCardType?.includes("object") || activeCardType?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/dual/object/object-yellow-red.png')]";

            } else if (activeCardType?.includes("effect") || activeCardType?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/dual/effect/effect-yellow-red.png')]";

            } else {
                return "bg-[url('/images/card-parts/card-frames/dual/yellow-red.png')]";
            };

        case "yellowGreen":
            if (activeCardType?.includes("object") || activeCardType?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/dual/object/object-yellow-green.png')]";

            } else if (activeCardType?.includes("effect") || activeCardType?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/dual/effect/effect-yellow-green.png')]";

            } else {
                return "bg-[url('/images/card-parts/card-frames/dual/yellow-green.png')]";
            };

        case "bluePurple":
            if (activeCardType?.includes("object") || activeCardType?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/dual/object/object-blue-purple.png')]";

            } else if (activeCardType?.includes("effect") || activeCardType?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/dual/effect/effect-blue-purple.png')]";

            } else {
                return "bg-[url('/images/card-parts/card-frames/dual/blue-purple.png')]";
            };

        case "blueRed":
            if (activeCardType?.includes("object") || activeCardType?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/dual/object/object-blue-red.png')]";

            } else if (activeCardType?.includes("effect") || activeCardType?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/dual/effect/effect-blue-red.png')]";

            } else {
                return "bg-[url('/images/card-parts/card-frames/dual/blue-red.png')]";
            };

        case "blueGreen":
            if (activeCardType?.includes("object") || activeCardType?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/dual/object/object-blue-green.png')]";

            } else if (activeCardType?.includes("effect") || activeCardType?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/dual/effect/effect-blue-green.png')]";

            } else {
                return "bg-[url('/images/card-parts/card-frames/dual/blue-green.png')]";
            };

        case "purpleRed":
            if (activeCardType?.includes("object") || activeCardType?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/dual/object/object-purple-red.png')]";

            } else if (activeCardType?.includes("effect") || activeCardType?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/dual/effect/effect-purple-red.png')]";

            } else {
                return "bg-[url('/images/card-parts/card-frames/dual/purple-red.png')]";
            };

        case "purpleGreen":
            if (activeCardType?.includes("object") || activeCardType?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/dual/object/object-purple-green.png')]";

            } else if (activeCardType?.includes("effect") || activeCardType?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/dual/effect/effect-purple-green.png')]";

            } else {
                return "bg-[url('/images/card-parts/card-frames/dual/purple-green.png')]";
            };

        case "redGreen":
            if (activeCardType?.includes("object") || activeCardType?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/dual/object/object-red-green.png')]";

            } else if (activeCardType?.includes("effect") || activeCardType?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/dual/effect/effect-red-green.png')]";

            } else {
                return "bg-[url('/images/card-parts/card-frames/dual/red-green.png')]";
            };

        case "multi":
            if (activeCardType?.includes("object") || activeCardType?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/other/object/object-multi.png')]";

            } else if (activeCardType?.includes("effect") || activeCardType?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/other/effect/effect-multi.png')]";

            } else {
              return "bg-[url('/images/card-parts/card-frames/other/multi.png')]";
            };

        default:
            if (activeCardType?.includes("object") || activeCardType?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/other/object/object-default.png')]";

            } else if (activeCardType?.includes("effect") || activeCardType?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/other/effect/effect-default.png')]";

            };
            return "bg-[url('/images/card-parts/card-frames/other/default.png')]";
    };
};