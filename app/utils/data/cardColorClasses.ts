import {
    monoColorOptions,
    dualColorOptions,
    multiColor,
    nodeColor,
    defaultColor
} from "@/app/utils/data/cardColorOptions";

export const monoColorClass = Object.entries(monoColorOptions).reduce((acc, [key, color]) => {
    acc[key] = {
        "50": `bg-${color}-50`,
        "100": `bg-${color}-100`,
        "200": `bg-${color}-200`,
        "300": `bg-${color}-300`,
        "400": `bg-${color}-400`,
        "500": `bg-${color}-500`,
        "600": `bg-${color}-600`,
        "700": `bg-${color}-700`,
        "800": `bg-${color}-800`,
        "900": `bg-${color}-900`,
        "950": `bg-${color}-950`,
    };
    return acc;
}, {} as { [key: string]: { [key: string]: string } });

// fix logic
// export const dualColorClass = monoColorOptions.reduce((acc, color) => {
//     acc[color] = {
//         "50": `bg-${color}-50`,
//         "100": `bg-${color}-100`,
//         "200": `bg-${color}-200`,
//         "300": `bg-${color}-300`,
//         "400": `bg-${color}-400`,
//         "500": `bg-${color}-500`,
//         "600": `bg-${color}-600`,
//         "700": `bg-${color}-700`,
//         "800": `bg-${color}-800`,
//         "900": `bg-${color}-900`,
//         "950": `bg-${color}-950`,
//     };
//     return acc;
// }, {} as { [key: string]: { [key: string]: string } });

// export const multiColorClass = {
//     "50": `bg-${color}-50`,
//     // Gradient
// }

// export nodeColorClass

// export const defaultColorClass