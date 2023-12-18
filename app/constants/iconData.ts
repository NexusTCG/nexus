import {
    BrightnessHigh as BrightnessHighIcon,
    ElectricBolt as ElectricBoltIcon,
    DarkMode as DarkModeIcon,
    LocalFireDepartment as LocalFireDepartmentIcon,
    Spa as SpaIcon,
    FilterTiltShift as FilterTiltShiftIcon,
  } from '@mui/icons-material';

export const energyIcons = {
    yellow: {
        name: "Yellow",
        value: "Yellow energy",
        icon: BrightnessHighIcon,
        tailwindClass: "bg-yellow-300 hover:bg-yellow-200 text-black rounded-full",
        height: "24px",
        width: "24px",
        padding: "2px",
    },
    blue: {
        name: "Blue",
        value: "Blue energy",
        icon: ElectricBoltIcon,
        tailwindClass: "bg-sky-400 hover:bg-sky-300 text-black rounded-full",
        height: "24px",
        width: "24px",
        padding: "2px",
    },
    purple: {
        name: "Purple",
        value: "Purple energy",
        icon: DarkModeIcon,
        tailwindClass: "bg-purple-400 hover:bg-purple-300 text-black rounded-full",
        height: "24px",
        width: "24px",
        padding: "2px",
    },
    red: {
        name: "Red",
        value: "Red energy",
        icon: LocalFireDepartmentIcon,
        tailwindClass: "bg-red-400 hover:bg-red-300 text-black rounded-full",
        height: "24px",
        width: "24px",
        padding: "2px",
    },
    green: {
        name: "Green",
        value: "Green energy",
        icon: SpaIcon,
        tailwindClass: "bg-lime-400 hover:bg-lime-300 text-black rounded-full",
        height: "24px",
        width: "24px",
        padding: "2px",
    },
    colorless: {
        name: "Colorless",
        value: "Colorless energy",
        icon: FilterTiltShiftIcon,
        tailwindClass: "bg-slate-400 hover:bg-slate-300 text-black rounded-full",
        height: "24px",
        width: "24px",
        padding: "2px",
    },
};

export const gradeIcons = {
    prime: {
        imagePath: '/images/icons-grade/grade-prime.png',
        value: "Prime"
    },
    rare: {
        imagePath: '/images/icons-grade/grade-rare.png',
        value: "Rare"
    },
    uncommon: {
        imagePath: '/images/icons-grade/grade-uncommon.png',
        value: "Uncommon"
    },
    common: {
        imagePath: '/images/icons-grade/grade-common.png',
        value: "Common"
    },
};
