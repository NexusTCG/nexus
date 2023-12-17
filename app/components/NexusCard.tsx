import { Box, Typography, Divider } from "@mui/material";
import Image from "next/image";
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import clsx from 'clsx';

type NexusCardProps = {
    cardCreator: string;
    cardName: string;
    cardCost: { imagePath: string; value: string }[];
    cardType: string;
    cardSuperType: string;
    cardSubType: string[];
    cardGrade: { imagePath: string; value: string } | null;
    cardText: string;
    cardFlavor: string;
    cardAttack: string;
    cardDefense: string;
}

// NEXUS CARD COMPONENT
export default function NexusCard({
    cardCreator,
    cardName,
    cardCost,
    cardType,
    cardSuperType,
    cardSubType,
    cardGrade,
    cardText,
    cardFlavor,
    cardAttack,
    cardDefense
}: NexusCardProps) {

    let creator = cardCreator;
    let name = cardName;
    let costIcons = cardCost;
    let type = Array.isArray(cardType) ? cardType.join(" ") : cardType
    let superType = cardSuperType;
    let subType = cardSubType;
    let gradeIcons = cardGrade;
    let text = cardText;
    let flavor = cardFlavor;
    let attack = cardAttack;
    let defense = cardDefense;

    type CardBackgroundStyle = {
        backgroundColor?: string;
        backgroundImage: string;
        linearGradient?: string;
    };

    const styles: Record<string, CardBackgroundStyle> = {
        yellowBg: {
            backgroundColor: "#facc15",
            backgroundImage: `url("/images/card-bg/card_bg_yellow.png")`,
        }, blueBg: {
            backgroundColor: "#38bdf8",
            backgroundImage: `url("/images/card-bg/card_bg_blue.png")`,
        }, purpleBg: {
            backgroundColor: "#c084fc",
            backgroundImage: `url("/images/card-bg/card_bg_purple.png")`,
        }, redBg: {
            backgroundColor: "#f87171",
            backgroundImage: `url("/images/card-bg/card_bg_red.png")`,
        }, greenBg: {
            backgroundColor: "#a3e635",
            backgroundImage: `url("/images/card-bg/card_bg_green.png")`,
        }, multiBg: {
            linearGradient: "#fde047, #bef264, #fdba74",
            backgroundImage: `url("/images/card-bg/card_bg_multi.png")`,
        }, colorlessBg: {
            backgroundColor: "#64748b",
            backgroundImage: `url("/images/card-bg/card_bg_colorless.png")`,
        }, sourceBg: {
            backgroundColor: "#78716c",
            backgroundImage: `url("/images/card-bg/card_bg_source.png")`,
        }, defaultBg: {
            backgroundColor: "#ffffff",
            backgroundImage: `url("/images/card-bg/card_bg_default.png")`,
        },
    };

    const determineCardBackground = () => {
        const iconValues = costIcons.map(icon => icon.value);
        console.log(iconValues);
        const uniqueColors = new Set(iconValues.filter(value => [
            'Yellow energy',
            'Blue energy',
            'Purple energy',
            'Red energy',
            'Green energy'
        ].includes(value)));
        if (uniqueColors.size > 1) {
            return styles.multiBg;
        }

        if (iconValues.includes('Yellow energy')) {
            return styles.yellowBg;
        } else if (iconValues.includes('Blue energy')) {
            return styles.blueBg;
        } else if (iconValues.includes('Purple energy')) {
            return styles.purpleBg;
        } else if (iconValues.includes('Red energy')) {
            return styles.redBg;
        } else if (iconValues.includes('Green energy')) {
            return styles.greenBg;
        }

        const hasNumberedIconsOnly = iconValues.every(value => ![
            'Yellow energy',
            'Blue energy',
            'Purple energy',
            'Red energy',
            'Green energy'
        ].includes(value));
        if (hasNumberedIconsOnly && iconValues.length > 0) {
            return styles.colorlessBg;
        }

        if (iconValues.length === 0) {
            return styles.defaultBg;
        }

        if (type === 'Source') {
            return styles.sourceBg;
        }

        return styles.defaultBg;
    };

    const cardBg: CardBackgroundStyle = determineCardBackground();

    let cardBackgroundStyles: Record<string, any> = {
        backgroundImage: cardBg.backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        filter: "contrast(1.25)",
        backgroundBlendMode: "multiply",
    };

    if (cardBg.backgroundColor) {
        cardBackgroundStyles.backgroundColor = cardBg.backgroundColor;
    }
    
    if (cardBg.linearGradient) {
        cardBackgroundStyles.backgroundImage = `linear-gradient(${cardBg.linearGradient}), ${cardBg.backgroundImage}`;
    }

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
                className="flex flex-col w-full h-full p-2 space-y-0 rounded-md"
                sx={{
                    ...cardBackgroundStyles,
                    width: "100%",
                    height: "100%",
                  }}
            >
                <Box className="flex flex-col rounded-md space-y-0" sx={{ zIndex: 1}}>
                    <Box
                        className={clsx(
                            "flex flex-row justify-between items-center px-1 py-1 rounded-lg text-black shadow-lg",
                            {
                                "bg-yellow-100": cardBg.backgroundColor === styles.yellowBg.backgroundColor,
                                "bg-blue-100": cardBg.backgroundColor === styles.blueBg.backgroundColor,
                                "bg-purple-100": cardBg.backgroundColor === styles.purpleBg.backgroundColor,
                                "bg-red-100": cardBg.backgroundColor === styles.redBg.backgroundColor,
                                "bg-lime-100": cardBg.backgroundColor === styles.greenBg.backgroundColor,
                                "bg-orange-100": cardBg.linearGradient === styles.multiBg.linearGradient,
                                "bg-slate-100": cardBg.backgroundColor === styles.colorlessBg.backgroundColor,
                                "bg-white": cardBg.backgroundColor === styles.defaultBg.backgroundColor,
                                "shadow-color-black": true,
                            }
                        )}
                        sx={{ height: "36px", border: "3px solid black", zIndex: 2 }}
                    >
                        <Typography
                            variant="body2"
                            className="font-medium text-black"
                        >{cardName}</Typography>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            {costIcons.map(icon => <img key={icon.value} src={icon.imagePath} alt={icon.value} style={{ width: 20, boxShadow: "0px 2px 0px rgba(0, 0, 0, .75)", borderRadius: "50%" }} />)}
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
                        className={clsx(
                            "flex flex-row justify-between items-center px-1 py-auto !-mt-1 rounded-lg font-medium shadow-lg text-black",
                            {
                                "bg-yellow-100": cardBg.backgroundColor === styles.yellowBg.backgroundColor,
                                "bg-blue-100": cardBg.backgroundColor === styles.blueBg.backgroundColor,
                                "bg-purple-100": cardBg.backgroundColor === styles.purpleBg.backgroundColor,
                                "bg-red-100": cardBg.backgroundColor === styles.redBg.backgroundColor,
                                "bg-lime-100": cardBg.backgroundColor === styles.greenBg.backgroundColor,
                                "bg-orange-100": cardBg.linearGradient === styles.multiBg.linearGradient,
                                "bg-slate-100": cardBg.backgroundColor === styles.colorlessBg.backgroundColor,
                                "bg-white": cardBg.backgroundColor === styles.defaultBg.backgroundColor,
                                "shadow-color-black": true,
                            }
                        )}
                        sx={{ height: "36px", border: "3px solid black", zIndex: 2 }}
                    >
                        <Box className="flex flex-row space-x-1">
                            <Typography
                                variant="body2"
                            >{superType}</Typography>
                            <Typography
                                variant="body2"
                            >{type}</Typography>
                            {subType.length > 0 && (<Typography
                                variant="body2"
                            >–</Typography>)}
                            <Typography
                            variant="body2"
                            >{subType}</Typography>
                        </Box>
                        <div>
                            {cardGrade && (
                                <img
                                    key={cardGrade.value}
                                    src={cardGrade.imagePath}
                                    alt={cardGrade.value}
                                    style={{ width: 24 }}
                                />
                            )}
                        </div>
                    </Box>
                    <Box
                        className={clsx("flex flex-col justify-start p-2 mx-1 !-mt-1 space-y-2 rounded-b-lg shadow-lg",
                            {
                                "bg-yellow-100": cardBg === styles.yellowBg,
                                "bg-blue-100": cardBg === styles.blueBg,
                                "bg-purple-100": cardBg === styles.purpleBg,
                                "bg-red-100": cardBg === styles.redBg,
                                "bg-lime-100": cardBg === styles.greenBg,
                                "bg-orange-100": cardBg === styles.multiBg,
                                "bg-slate-100": cardBg === styles.colorlessBg,
                                "bg-white": cardBg.backgroundColor === "#ffffff",
                                "shadow-color-black": true,
                            }
                        )}
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
                        className={clsx(
                            "flex flex-row justify-center items-center px-1 py-0 !-mt-5 space-x-1 text-black rounded-lg shadow-lg",
                            {
                                "bg-yellow-100": cardBg.backgroundColor === styles.yellowBg.backgroundColor,
                                "bg-blue-100": cardBg.backgroundColor === styles.blueBg.backgroundColor,
                                "bg-purple-100": cardBg.backgroundColor === styles.purpleBg.backgroundColor,
                                "bg-red-100": cardBg.backgroundColor === styles.redBg.backgroundColor,
                                "bg-lime-100": cardBg.backgroundColor === styles.greenBg.backgroundColor,
                                "bg-orange-100": cardBg.linearGradient === styles.multiBg.linearGradient,
                                "bg-slate-100": cardBg.backgroundColor === styles.colorlessBg.backgroundColor,
                                "bg-white": cardBg.backgroundColor === styles.defaultBg.backgroundColor,
                                "shadow-color-black": true,
                            }
                        )}
                        sx={{ marginLeft: "75%", marginRight: "5%", border: "3px solid black", zIndex: 2 }}
                    >
                        <Typography
                            variant="body1"
                            sx={{ fontSize: "1rem" }}
                            className="!font-semibold"
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
                            className="!font-semibold"
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
                        borderTopLeftRadius: ".75rem",
                        borderTopRightRadius: ".75rem",
                    }}
                >
                    {name && (<Box className="flex flex-row items-center pt-14 pl-4 space-x-1 text-gray-400">
                        <DesignServicesIcon sx={{ width: "12px", height: "12px" }} />
                        <Typography
                            variant="subtitle2"
                            sx={{ fontSize: ".7rem" }}
                        >
                             {creator}
                        </Typography>
                    </Box>)}
                </Box>
            </Box>
        </Box>
    )
}