import { Box, Typography, Divider } from "@mui/material";
import Image from "next/image";

type NexusCardProps = {
    cardCreator: string;
    cardName: string;
    cardCost: string;
    cardType: string;
    cardSuperType: string;
    cardSubType: string;
    cardText: string;
    cardGrade: string;
    cardFlavor: string;
    cardAttack: string;
    cardDefense: string;
}

export default function NexusCard({ cardCreator, cardName, cardCost, cardType, cardSuperType, cardGrade, cardSubType, cardText, cardFlavor, cardAttack, cardDefense }: NexusCardProps) {
    let creator = cardCreator;
    let name = cardName;
    let cost = Array.isArray(cardCost) ? cardCost.join("") : cardCost;
    let type = Array.isArray(cardType) ? cardType.join(" ") : cardType
    let superType = cardSuperType;
    let subType = cardSubType;
    let grade = cardGrade;
    let text = cardText;
    let flavor = cardFlavor;
    let attack = cardAttack;
    let defense = cardDefense;

    return (
        <Box
            className="flex flex-col p-3 bg-black rounded-xl shadow-lg shadow-slate-900"
            sx={{
                width: "335px",
                maxWidth: "635px",
                height: "469px",
                maxHeight: "889px",
            }}>
            <Box className="flex flex-col w-full h-full p-2 space-y-0 rounded-md bg-purple-300" sx={{ backgroundImage: "" }}>
                <Box className="flex flex-col bg-yellow rounded-md space-y-0">
                    <Box
                        className="flex flex-row justify-between items-center px-2 py-1 rounded-lg bg-purple-50 text-black border-4 border-black shadow-md shadow-black"
                        sx={{ minHeight: "36px" }}
                    >
                        <Typography
                            variant="body2"
                            className="font-semibold text-black"
                        >{name}</Typography>
                        <Typography
                            variant="body2"
                            className="font-medium text-black"
                        >{cost}</Typography>
                    </Box>
                    <Box className="flex flex-col justify-center mx-2 border-4 border-black" sx={{ height: "200px", overflow: "hidden" }}>
                        <Image
                            src="/images/card-art/cache-reclaimer.jpg"
                            width={350}
                            height={480}
                            alt={`Nexus TCG card art for ${name}`}
                            className="mx-auto max-w-full h-auto"
                        />
                    </Box>
                    <Box
                        className="flex flex-row justify-between items-center px-2 py-1 rounded-lg bg-purple-50 text-black border-4 border-black shadow-md shadow-black"
                        sx={{ minHeight: "36px" }}
                    >
                        <Box className="flex flex-row space-x-1">
                            <Typography
                                variant="body2"
                                className="font-semibold text-black"
                            >{superType}</Typography>
                            {superType != "" && (<Typography
                                variant="body2"
                                className="font-semibold text-black"
                            >–</Typography>)}
                            <Typography
                                variant="body2"
                                className="font-semibold text-black"
                            >{type}</Typography>
                            {subType != "" && (<Typography
                                variant="body2"
                                className="font-semibold text-black"
                            >–</Typography>)}
                            <Typography
                            variant="body2"
                            className="font-medium text-black"
                            >{subType}</Typography>
                        </Box>
                        <Typography
                            variant="body2"
                            className="font-medium text-black"
                        >{grade}</Typography>
                    </Box>
                    <Box className="flex flex-col justify-start p-2 mx-2 space-y-2 bg-purple-50 rounded-b-lg border-4 border-black" sx={{ height: "140px" }}>
                        <Typography
                            variant="body2"
                            className="font-medium text-black"
                        >{text}</Typography>
                        {flavor && (<Divider />)}
                        {flavor && (<Typography
                            variant="body2"
                            className="font-medium text-black"
                        >{flavor}</Typography>)}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}