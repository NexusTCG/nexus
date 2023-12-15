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
                position: "relative",
                overflow: "hidden",
            }}>
            <Box
                className="flex flex-col w-full h-full p-2 space-y-0 rounded-md bg-purple-300"
                sx={{ backgroundImage: "" }}>
                <Box className="flex flex-col bg-yellow rounded-md space-y-0" sx={{ zIndex: 1}}>
                    <Box
                        className="flex flex-row justify-between items-center px-2 py-1 rounded-lg bg-purple-50 text-black shadow-md shadow-black"
                        sx={{ minHeight: "36px", border: "3px solid black", zIndex: 2 }}
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
                    <Box className="flex flex-col justify-center mx-1 !-mt-1" sx={{ height: "200px", border: "3px solid black", overflow: "hidden" }}>
                        <Image
                            src="/images/card-art/cache-reclaimer.jpg"
                            width={350}
                            height={480}
                            alt={`Nexus TCG card art for ${name}`}
                            className="mx-auto max-w-full h-auto"
                        />
                    </Box>
                    <Box
                        className="flex flex-row justify-between items-center px-2 py-1 !-mt-1 rounded-lg bg-purple-50 text-black shadow-md shadow-black"
                        sx={{ minHeight: "36px", border: "3px solid black", zIndex: 2 }}
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
                    <Box
        className="flex flex-col justify-start p-2 mx-1 !-mt-1 space-y-2 bg-purple-50 rounded-b-lg"
        sx={{ height: "140px", border: "3px solid black" }}
      >
        {text.split('\n').map((paragraph, index) => (
          <Typography
            key={index}
            variant="body2"
            className="font-medium text-black"
            sx={{ fontSize: ".75rem" }}
          >
            {paragraph}
          </Typography>
        ))}
        {flavor && (<Divider />)}
        {flavor && (
          <Typography
            variant="body2"
            className="italic font-medium text-black"
            sx={{ fontSize: ".75rem" }}
          >
            {flavor}
          </Typography>
        )}
      </Box>
                    {(attack || defense) && (<Box
                        className="flex flex-row justify-center items-center px-auto py-0 !-mt-5 space-x-1 bg-purple-50 text-black rounded-lg shadow-md shadow-black "
                        sx={{ height: "36px", marginLeft: "75%", marginRight: "5%", border: "3px solid black", zIndex: 2 }}
                    >
                        <Typography
                            variant="body1"
                            sx={{ fontSize: "1.25rem" }}
                            className="!font-medium"
                        >
                            {attack ? attack : "X"}
                        </Typography>
                        {<Typography
                            variant="body1"
                            sx={{ fontSize: "1.25rem" }}
                            className="!font-medium"
                        >
                            /
                        </Typography>}
                        <Typography
                            variant="body1"
                            sx={{ fontSize: "1.25rem" }}
                            className="!font-medium"
                        >
                            {defense ? defense : "X"}
                        </Typography>
                    </Box>)}
                </Box>
                <Box
                    className="absolute bottom-0 left-0 w-full bg-black"
                    sx={{
                        height: "70px",
                        zIndex: 0,
                        borderTopLeftRadius: "1.5rem",
                        borderTopRightRadius: "1.5rem",
                    }}
                ></Box>
            </Box>
        </Box>
    )
}