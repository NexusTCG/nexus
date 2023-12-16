import { ElementType } from 'react';
import PetsIcon from '@mui/icons-material/Pets';
import BugReportIcon from '@mui/icons-material/BugReport';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import SolarPowerIcon from '@mui/icons-material/SolarPower';

export type CardType = {
    id: number;
    name: string;
    label: string;
    description: string;
    flavor: string;
    superTypes: string;
    subTypes: string;
    isPermanent: boolean;
    isScript: boolean;
    icon: ElementType;
};

export const cardTypes: CardType[] = [
    {
        id: 1,
        name: "Entity",
        label: "",
        description: "",
        flavor: "",
        superTypes: "",
        subTypes: "",
        isPermanent: true,
        isScript: true,
        icon: PetsIcon,
    }, {
        id: 2,
        name: "Interrupt",
        label: "",
        description: "",
        flavor: "",
        superTypes: "",
        subTypes: "",
        isPermanent: false,
        isScript: true,
        icon: CrisisAlertIcon,
    }, {
        id: 3,
        name: "",
        label: "",
        description: "",
        flavor: "",
        superTypes: "",
        subTypes: "",
        isPermanent: false,
        isScript: false,
        icon: BugReportIcon,
    }, {
        id: 4,
        name: "",
        label: "",
        description: "",
        flavor: "",
        superTypes: "",
        subTypes: "",
        isPermanent: false,
        isScript: false,
        icon: BugReportIcon,
    }, {
        id: 5,
        name: "",
        label: "",
        description: "",
        flavor: "",
        superTypes: "",
        subTypes: "",
        isPermanent: false,
        isScript: false,
        icon: BugReportIcon,
    }, {
        id: 6,
        name: "",
        label: "",
        description: "",
        flavor: "",
        superTypes: "",
        subTypes: "",
        isPermanent: false,
        isScript: false,
        icon: BugReportIcon,
    }, {
        id: 7,
        name: "Source",
        label: "",
        description: "",
        flavor: "",
        superTypes: "",
        subTypes: "",
        isPermanent: false,
        isScript: false,
        icon: SolarPowerIcon,
    },
];