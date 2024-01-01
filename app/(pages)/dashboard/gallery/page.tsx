import TextfieldWithSlashMenu from "../../../components/TextfieldWithSlashMenu";
import FlightIcon from '@mui/icons-material/Flight';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import BugReportIcon from '@mui/icons-material/BugReport';
import NexusCardForm from '../../../components/Card Creator Form/NexusCardForm';
import { Box } from "@mui/material";

const keywordAbilities = [
  { icon: <FlightIcon />, title: "Flight", description: "This entity can’t be defended except by entities with flight or intercept." },
  { icon: <DirectionsRunIcon />, title: "Rapid", description: "This entity can attack and tap the turn it comes under your control." },
  { icon: <BugReportIcon />, title: "Virus", description: "If this card deals at least one damage to an entity it’s enough to destroy it." },
];

export default function Gallery() {
  return (
    <div className="flex flex-col w-full justify-center items-center space-y-24 px-6">
      <TextfieldWithSlashMenu textfieldLabel="Game" textfieldWidth="600px" textfieldFullWidth={false} menuOptions={keywordAbilities} />
      <NexusCardForm />
    </div>
  );
}