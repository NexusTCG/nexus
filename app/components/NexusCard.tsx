import { Box, Typography, Divider } from "@mui/material";
import Image from "next/image";
import EnergyIconKey from "../(pages)/dashboard/(home)/page";

type NexusCardProps = {
    cardCreator: string;
    cardName: string;
    cardCostIcons: { imagePath: string; value: string }[];
    cardType: string;
    cardSuperType: string;
    cardSubType: string;
    cardText: string;
    cardGrade: string;
    cardFlavor: string;
    cardAttack: string;
    cardDefense: string;
}

export default function NexusCard({ cardCreator, cardName, cardCostIcons, cardType, cardSuperType, cardGrade, cardSubType, cardText, cardFlavor, cardAttack, cardDefense }: NexusCardProps) {
    let creator = cardCreator;
    let name = cardName;
    let costIcons = cardCostIcons;
    let type = Array.isArray(cardType) ? cardType.join(" ") : cardType
    let superType = cardSuperType;
    let subType = cardSubType;
    let grade = cardGrade;
    let text = cardText;
    let flavor = cardFlavor;
    let attack = cardAttack;
    let defense = cardDefense;

    const styles = {
        yellowBg: {
            backgroundImage: `url("/images/card-bg/card_bg_yellow.png")`,
        }, blueBg: {
            backgroundImage: `url("/images/card-bg/card_bg_blue.png")`,
        }, purpleBg: {
            backgroundImage: `url("/images/card-bg/card_bg_purple.png")`,
        }, redBg: {
            backgroundImage: `url("/images/card-bg/card_bg_rede.png")`,
        }, greenBg: {
            backgroundImage: `url("/images/card-bg/card_bg_green.png")`,
        }, multiBg: {
            backgroundImage: `url("/images/card-bg/card_bg_multi.png")`,
        }, colorlessBg: {
            backgroundImage: `url("/images/card-bg/card_bg_colorless.png")`,
        }, sourceBg: {
            backgroundImage: `url("/images/card-bg/card_bg_source.png")`,
        },
    };

    // useEffect to switch cardBg depending on cost/color

    console.log('costIcons', costIcons);

    return (
        <Box
            id="nexus-card-render"
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
                sx={{
                    backgroundImage: `${styles.purpleBg.backgroundImage}`,
                    backgroundBlendMode: "multiply",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    filter: "contrast(120%) saturate(1.5)",
                    width: "100%",
                    height: "100%",
                  }}
            >
                <Box className="flex flex-col rounded-md space-y-0" sx={{ zIndex: 1}}>
                    <Box
                        className="flex flex-row justify-between items-center px-2 py-1 rounded-lg bg-purple-50 text-black shadow-md shadow-black"
                        sx={{ minHeight: "36px", border: "3px solid black", zIndex: 2 }}
                    >
                        <Typography
                            variant="body2"
                            className="font-semibold text-black"
                        >{cardName}</Typography>
                        <div style={{ display: 'flex', gap: '5px' }}>
                            {cardCostIcons.map(icon => <img key={icon.value} src={icon.imagePath} alt={icon.value} style={{ width: 24 }} />)}
                        </div>
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
                        className="flex flex-row justify-between items-center px-2 py-1 !-mt-1 rounded-lg bg-purple-50 font-medium text-black shadow-md shadow-black"
                        sx={{ minHeight: "36px", border: "3px solid black", zIndex: 2 }}
                    >
                        <Box className="flex flex-row space-x-1">
                            <Typography
                                variant="body2"
                            >{superType}</Typography>
                            <Typography
                                variant="body2"
                            >{type}</Typography>
                            {subType != "" && (<Typography
                                variant="body2"
                            >–</Typography>)}
                            <Typography
                            variant="body2"
                            >{subType}</Typography>
                        </Box>
                        <Typography
                            variant="body2"
                        >{grade}</Typography>
                    </Box>
                    <Box
                        className="flex flex-col justify-start px-2 py-3 mx-1 !-mt-1 space-y-2 bg-purple-50 rounded-b-lg"
                        sx={{ height: "160px", border: "3px solid black" }}
                    >
                        {text.split('\n').map((paragraph, index) => (
                        <Typography
                            key={index}
                            variant="body2"
                            className="font-medium text-black"
                            sx={{ fontSize: ".75rem", lineHeight: "1rem" }}
                        >
                            {paragraph}
                        </Typography>
                        ))}
                        {flavor && (<Divider />)}
                        {flavor && (
                        <Typography
                            variant="body2"
                            className="italic font-medium text-black"
                            sx={{ fontSize: ".75rem", lineHeight: "1rem" }}
                        >
                            {flavor}
                        </Typography>
                        )}
                    </Box>
                    {(attack || defense) && (<Box
                        className="flex flex-row justify-center items-center px-1 py-0 !-mt-5 space-x-1 bg-purple-50 text-black rounded-lg shadow-md shadow-black "
                        sx={{ marginLeft: "75%", marginRight: "5%", border: "3px solid black", zIndex: 2 }}
                    >
                        <Typography
                            variant="body1"
                            sx={{ fontSize: "1rem" }}
                            className="!font-medium"
                        >
                            {attack ? attack : "X"}
                        </Typography>
                        {<Typography
                            variant="body1"
                            sx={{ fontSize: "1rem" }}
                            className="!font-medium"
                        >
                            /
                        </Typography>}
                        <Typography
                            variant="body1"
                            sx={{ fontSize: "1rem" }}
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
                        borderTopLeftRadius: "0.5rem",
                        borderTopRightRadius: "0.5rem",
                    }}
                >
                    {name && (<Typography
                        variant="subtitle2"
                        sx={{ fontSize: ".70rem" }}
                        className="pl-4 pb-2 pt-14 pr-auto text-gray-400"
                    >
                        Creator: {creator}
                    </Typography>)}
                </Box>
            </Box>
        </Box>
    )
}