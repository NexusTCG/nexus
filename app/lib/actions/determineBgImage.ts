import { CardFormDataType } from "@/app/utils/types/types";

export default function determineBgImage(
    im_type: CardFormDataType["im_type"],
    im_energy_alignment: string
) {

    switch (im_energy_alignment) {
        case "anomaly":
            return "bg-[url('/images/card-parts/card-frames/other/anomaly.jpg')]"

        case "radiant":
            if (im_type?.includes("object") || im_type?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/mono/object/object-radiant.jpg')]";

            } else if (im_type?.includes("effect") || im_type?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/mono/effect/effect-radiant.jpg')]";

            } else {
                return "bg-[url('/images/card-parts/card-frames/mono/radiant.jpg')]";
            };

        case "volatile":
            if (im_type?.includes("object") || im_type?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/mono/object/object-volatile.jpg')]";

            } else if (im_type?.includes("effect") || im_type?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/mono/effect/effect-volatile.jpg')]";

            } else {
                return "bg-[url('/images/card-parts/card-frames/mono/volatile.jpg')]";
            };

        case "corrupt":
            if (im_type?.includes("object") || im_type?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/mono/object/object-corrupt.jpg')]";

            } else if (im_type?.includes("effect") || im_type?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/mono/effect/effect-corrupt.jpg')]";

            } else {
                return "bg-[url('/images/card-parts/card-frames/mono/corrupt.jpg')]";
            };

        case "blaze":
            if (im_type?.includes("object") || im_type?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/mono/object/object-blaze.jpg')]";

            } else if (im_type?.includes("effect") || im_type?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/mono/effect/effect-blaze.jpg')]";

            } else {
                return "bg-[url('/images/card-parts/card-frames/mono/blaze.jpg')]";
            };
            
        case "verdant":
            if (im_type?.includes("object") || im_type?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/mono/object/object-verdant.jpg')]";

            } else if (im_type?.includes("effect") || im_type?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/mono/effect/effect-verdant.jpg')]";

            } else {
                return "bg-[url('/images/card-parts/card-frames/mono/verdant.jpg')]";
            };

        case "void":
            if (im_type?.includes("object") || im_type?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/mono/object/object-void.jpg')]";

            } else if (im_type?.includes("effect") || im_type?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/mono/effect/effect-void.jpg')]";

            } else {
                return "bg-[url('/images/card-parts/card-frames/mono/void.jpg')]";
            }

        case "radiantVolatile":
            if (im_type?.includes("object") || im_type?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/dual/object/object-radiant-volatile.jpg')]";

            } else if (im_type?.includes("effect") || im_type?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/dual/effect/effect-radiant-volatile.jpg')]";

            } else {
                return "bg-[url('/images/card-parts/card-frames/dual/radiant-volatile.jpg')]";
            };

        case "radiantCorrupt":
            if (im_type?.includes("object") || im_type?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/dual/object/object-radiant-corrupt.jpg')]";

            } else if (im_type?.includes("effect") || im_type?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/dual/effect/effect-radiant-corrupt.jpg')]";

            } else {
                return "bg-[url('/images/card-parts/card-frames/dual/radiant-corrupt.jpg')]";
            };

        case "radiantBlaze":
            if (im_type?.includes("object") || im_type?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/dual/object/object-radiant-blaze.jpg')]";

            } else if (im_type?.includes("effect") || im_type?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/dual/effect/effect-radiant-blaze.jpg')]";

            } else {
                return "bg-[url('/images/card-parts/card-frames/dual/radiant-blaze.jpg')]";
            };

        case "radiantVerdant":
            if (im_type?.includes("object") || im_type?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/dual/object/object-radiant-verdant.jpg')]";

            } else if (im_type?.includes("effect") || im_type?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/dual/effect/effect-radiant-verdant.jpg')]";

            } else {
                return "bg-[url('/images/card-parts/card-frames/dual/radiant-verdant.jpg')]";
            };

        case "volatileCorrupt":
            if (im_type?.includes("object") || im_type?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/dual/object/object-volatile-corrupt.jpg')]";

            } else if (im_type?.includes("effect") || im_type?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/dual/effect/effect-volatile-corrupt.jpg')]";

            } else {
                return "bg-[url('/images/card-parts/card-frames/dual/volatile-corrupt.jpg')]";
            };

        case "volatileBlaze":
            if (im_type?.includes("object") || im_type?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/dual/object/object-volatile-blaze.jpg')]";

            } else if (im_type?.includes("effect") || im_type?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/dual/effect/effect-volatile-blaze.jpg')]";

            } else {
                return "bg-[url('/images/card-parts/card-frames/dual/volatile-blaze.jpg')]";
            };

        case "volatileVerdant":
            if (im_type?.includes("object") || im_type?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/dual/object/object-volatile-verdant.jpg')]";

            } else if (im_type?.includes("effect") || im_type?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/dual/effect/effect-volatile-verdant.jpg')]";

            } else {
                return "bg-[url('/images/card-parts/card-frames/dual/volatile-verdant.jpg')]";
            };

        case "corruptBlaze":
            if (im_type?.includes("object") || im_type?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/dual/object/object-corrupt-blaze.jpg')]";

            } else if (im_type?.includes("effect") || im_type?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/dual/effect/effect-corrupt-blaze.jpg')]";

            } else {
                return "bg-[url('/images/card-parts/card-frames/dual/corrupt-blaze.jpg')]";
            };

        case "corruptVerdant":
            if (im_type?.includes("object") || im_type?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/dual/object/object-corrupt-verdant.jpg')]";

            } else if (im_type?.includes("effect") || im_type?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/dual/effect/effect-corrupt-verdant.jpg')]";

            } else {
                return "bg-[url('/images/card-parts/card-frames/dual/corrupt-verdant.jpg')]";
            };

        case "blazeVerdant":
            if (im_type?.includes("object") || im_type?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/dual/object/object-blaze-verdant.jpg')]";

            } else if (im_type?.includes("effect") || im_type?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/dual/effect/effect-blaze-verdant.jpg')]";

            } else {
                return "bg-[url('/images/card-parts/card-frames/dual/blaze-verdant.jpg')]";
            };

        case "multi":
            if (im_type?.includes("object") || im_type?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/other/object/object-multi.jpg')]";

            } else if (im_type?.includes("effect") || im_type?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/other/effect/effect-multi.jpg')]";

            } else {
              return "bg-[url('/images/card-parts/card-frames/other/multi.jpg')]";
            };

        default:
            if (im_type?.includes("object") || im_type?.includes("entityObject")) {
                return "bg-[url('/images/card-parts/card-frames/other/object/object-default.jpg')]";

            } else if (im_type?.includes("effect") || im_type?.includes("entityEffect")) {
                return "bg-[url('/images/card-parts/card-frames/other/effect/effect-default.jpg')]";

            };
            return "bg-[url('/images/card-parts/card-frames/other/default.jpg')]";
    };
};