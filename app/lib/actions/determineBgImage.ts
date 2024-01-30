export default function determineBgImage(
    activeCardType: string,
    cardColorType: string,
    cardColor: string,
) {
    const path = "public/images/card-parts/card-frames/";

    if (!cardColor && activeCardType === "node") {
        return `${path}other/node.png`;
    };

    switch (cardColorType) {
        case "mono":
            if (activeCardType === "object") {
                return `${path}mono/object/object-${cardColor}.png`;
            } else if (activeCardType === "effect") {
                return `${path}mono/effect/effect-${cardColor}.png`;
            };
            return `${path}mono/${cardColor}.png`;
        case "dual":
            if (activeCardType === "object") {
                return `${path}dual/object/object-${cardColor}.png`;
            } else if (activeCardType === "effect") {
                return `${path}dual/effect/effect-${cardColor}.png`;
            };
            return `${path}dual/${cardColor}.png`;
        case "multi":
            if (activeCardType === "object") {
                return `${path}other/object/object-${cardColor}.png`;
            } else if (activeCardType === "effect") {
                return `${path}other/effect/effect-${cardColor}.png`;
            };
            return `${path}other/${cardColor}.png`;
        default:
            if (activeCardType === "object") {
                return `${path}other/object/object-default.png`;
            } else if (activeCardType === "effect") {
                return `${path}other/effect/effect-default.png`;
            };
            return `${path}other/default.png`;
            // public/images/card-parts/card-frames/other/default.png
            
    };
};