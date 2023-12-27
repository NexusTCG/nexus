import { Box, Typography, Divider } from "@mui/material";
import { CostValues } from '@/app/types/types';
import { energyIcons } from '@/app/constants/iconData';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import Image from "next/image";
import clsx from 'clsx';

type NexusCardProps = {
    cardCreator: string;
    cardName: string;
    cardCost: CostValues | null;
    cardType: string;
    cardSuperType: string;
    cardSubType: string[];
    cardGrade: { imagePath: string; value: string } | null;
    cardText: string;
    cardFlavor: string;
    cardAttack: string;
    cardDefense: string;
}

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

    const colorToTextureMap: { [key: string]: string } = {
        yellow: 'yellow',
        blue: 'blue',
        purple: 'purple',
        red: 'red',
        green: 'green',
    };

    const colorShadesMap: { [key: string]: { light: string, medium: string, dark: string } } = {
        yellow: {
          light: 'bg-yellow-50',
          medium: 'bg-yellow-100',
          dark: 'bg-yellow-400',
        },
        blue: {
          light: 'bg-sky-50',
          medium: 'bg-sky-100',
          dark: 'bg-sky-400',
        },
        purple: {
          light: 'bg-purple-50',
          medium: 'bg-purple-100',
          dark: 'bg-purple-400',
        },
        red: {
          light: 'bg-red-50',
          medium: 'bg-red-100',
          dark: 'bg-red-400',
        },
        green: {
          light: 'bg-lime-50',
          medium: 'bg-lime-100',
          dark: 'bg-lime-400',
        },
        colorless: {
          light: 'bg-slate-50',
          medium: 'bg-slate-100',
          dark: 'bg-slate-400',
        },
        source: {
          light: 'bg-orange-50',
          medium: 'bg-orange-100',
          dark: 'bg-orange-400',
        },
        multi: {
          light: 'bg-gradient-to-r from-amber-50 via-teal-50 to-rose-50',
          medium: 'bg-gradient-to-r from-amber-200 via-teal-200 to-rose-4200',
          dark: 'bg-gradient-to-r from-amber-400 via-teal-400 to-rose-400',
        },
      };

      const gradientShadesMap: { [key: string]: { light: string, medium: string, dark: string } } = {
        blue_yellow: {
            light: 'bg-gradient-to-r from-yellow-50 to-sky-50',
            medium: 'bg-gradient-to-r from-yellow-100 to-sky-100',
            dark: 'bg-gradient-to-r from-yellow-400 to-sky-400',
        },
        purple_yellow: {
            light: 'bg-gradient-to-r from-yellow-50 to-purple-50',
            medium: 'bg-gradient-to-r from-yellow-100 to-purple-100',
            dark: 'bg-gradient-to-r from-yellow-400 to-purple-400',
        },
        red_yellow: {
            light: 'bg-gradient-to-r from-yellow-50 to-red-50',
            medium: 'bg-gradient-to-r from-yellow-100 to-red-100',
            dark: 'bg-gradient-to-r from-yellow-400 to-red-400',
        },
        green_yellow: {
            light: 'bg-gradient-to-r from-yellow-50 to-lime-50',
            medium: 'bg-gradient-to-r from-yellow-100 to-lime-100',
            dark: 'bg-gradient-to-r from-yellow-400 to-lime-400',
        },
        blue_purple: {
            light: 'bg-gradient-to-r from-sky-50 to-purple-50',
            medium: 'bg-gradient-to-r from-sky-100 to-purple-100',
            dark: 'bg-gradient-to-r from-sky-400 to-purple-400',
        },
        blue_red: {
            light: 'bg-gradient-to-r from-sky-50 to-red-50',
            medium: 'bg-gradient-to-r from-sky-100 to-red-100',
            dark: 'bg-gradient-to-r from-sky-400 to-red-400',
        },
        blue_green: {
            light: 'bg-gradient-to-r from-sky-50 to-lime-50',
            medium: 'bg-gradient-to-r from-sky-100 to-lime-100',
            dark: 'bg-gradient-to-r from-sky-400 to-lime-400',
        },
        red_purple: {
            light: 'bg-gradient-to-r from-purple-50 to-red-50',
            medium: 'bg-gradient-to-r from-purple-100 to-red-100',
            dark: 'bg-gradient-to-r from-purple-400 to-red-400',
        },
        green_purple: {
            light: 'bg-gradient-to-r from-purple-50 to-lime-50',
            medium: 'bg-gradient-to-r from-purple-100 to-lime-100',
            dark: 'bg-gradient-to-r from-purple-400 to-lime-400',
        },
        green_red: {
            light: 'bg-gradient-to-r from-red-50 to-lime-50',
            medium: 'bg-gradient-to-r from-red-100 to-lime-100',
            dark: 'bg-gradient-to-r from-red-400 to-lime-400',
        },
      };

    function getColorsWithCost(cardCost: CostValues): string[] {
        return Object.keys(cardCost).filter((key): key is keyof CostValues => {
          const cost = cardCost[key as keyof CostValues];
          return cost !== undefined && cost > 0;
        });
      }
    
    // Function to get card background image
    const getCardBackgroundImage = (cardCost: CostValues | null, cardType: string): string => {
        let texture = 'default';
        
        // Check if any cost is selected
        const colorsWithCost = cardCost ? getColorsWithCost(cardCost) : [];
    
        if (colorsWithCost.length === 1) {
            // Single color texture
            texture = colorToTextureMap[colorsWithCost[0]] || texture;
        } else if (colorsWithCost.length > 1) {
            // Multi-color texture
            texture = 'multi';
        } else if (cardType.toLowerCase() === 'source') {
            // Source texture (only if no cost selected)
            return `url("/images/card-bg/card_bg_source.png")`;
        } else {
            // Colorless texture
            texture = 'colorless';
        }
        
        return `url("/images/card-bg/card_bg_${texture}.png")`;
    };

    // Function to get Tailwind background class
    const getCardBgClass = (cardCost: CostValues | null, cardType: string): { light: string, medium: string, dark: string } => {
        let defaultShades = {
            light: 'bg-white',
            medium: 'bg-gray-50',
            dark: 'bg-gray-100',
        };
        
        if (cardType.toLowerCase() === 'source') {
            return colorShadesMap['source'];
        }
        
        if (cardCost) {
            const colorsWithCost = getColorsWithCost(cardCost);
            if (colorsWithCost.length === 1) {
                return colorShadesMap[colorsWithCost[0] as keyof typeof colorShadesMap] || defaultShades;
            } else if (colorsWithCost.length === 2) {
                // Construct the key for the gradient map
                const gradientKey = colorsWithCost.sort().join('_');
                // Check if this gradient exists

                console.log('Gradient Key:', gradientKey, 'Available:', gradientKey in gradientShadesMap);

                if (gradientKey in gradientShadesMap) {
                    return gradientShadesMap[gradientKey as keyof typeof gradientShadesMap] || defaultShades;
                }
            } else if (colorsWithCost.length > 2) {
                return colorShadesMap['multi'];
            } else {
                return colorShadesMap['colorless'];
            }
        }
        
        return defaultShades;
    };

    // Determine card background style and class
    const cardBackgroundImage = {
        backgroundImage: getCardBackgroundImage(cardCost, cardType),
    };
    const cardBgClass = getCardBgClass(cardCost, cardType);
    const isSourceType = cardType === 'source';

    // Function to render cost icons
    const renderCostIcons = () => {
        if (!cardCost) return [];

        return Object.entries(cardCost).flatMap(([energyType, count]) => {
            const IconComponent = energyIcons[energyType as keyof typeof energyIcons].icon;
            return Array.from({ length: count || 0 }, (_, index) => (
                <IconComponent 
                    key={`${energyType}-${index}`}
                    style={{ width: 20, height: 20, padding: 2, boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.75' }}
                    className={energyIcons[energyType as keyof typeof energyIcons].tailwindClass}
                />
            ));
        });
    };

    // MAIN COMPONENT
    return (

        <Box
            id="card-border"
            className={clsx(
                "flex flex-col p-3 rounded-xl bg-black shadow-lg shadow-slate-900",
            )}
            sx={{
                width: "335px",
                maxWidth: "635px",
                height: "469px",
                maxHeight: "889px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <Box
                id="card-frame"
                className={clsx(
                    `flex flex-col w-full h-full p-2 space-y-0 rounded-md ${cardBgClass.dark}`,
                    isSourceType && "source-card"
                )}
                style={{
                    ...cardBackgroundImage,
                    backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    id="card-name-cost"
                    className={clsx(
                        `flex flex-row justify-between items-center px-1 py-1 rounded-lg text-black shadow-lg ${cardBgClass.medium}`
                    )}
                    sx={{
                        height: "36px",
                        border: "3px solid black",
                        zIndex: 2
                    }}
                >
                    <Typography
                        variant="body2"
                        className="font-medium text-black"
                    >
                        {cardName}
                    </Typography>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        {renderCostIcons()}
                    </div>
                </Box>

                <Box
                    id="card-image"
                    className="flex flex-col justify-center mx-1 !-mt-1"
                    sx={{ height: "200px", border: "3px solid black", overflow: "hidden" }}>
                    <Image
                        src="/images/card-art/cache-reclaimer.jpg"
                        width={350}
                        height={480}
                        alt={`Nexus TCG card art for ${cardName}`}
                        className="mx-auto max-w-full h-auto"
                    />
                </Box>

                <Box
                    id="card-type-grade"
                    className={clsx(
                        `flex flex-row justify-between items-center px-1 py-auto !-mt-1 rounded-lg font-medium shadow-lg text-black ${cardBgClass.medium}`
                    )}
                    sx={{
                        height: "36px",
                        border: "3px solid black",
                        zIndex: 2
                    }}
                >
                    <Box className="flex flex-row space-x-1">
                        <Typography variant="body2">{cardSuperType}</Typography>
                        <Typography variant="body2">{cardType}</Typography>
                        {cardSubType.length > 0 && <Typography variant="body2">–</Typography>}
                        <Typography variant="body2">{cardSubType.join(" ")}</Typography>
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
                    id="card-text-flavor"
                    className={clsx(
                        `flex flex-col justify-start p-2 mx-1 !-mt-1 space-y-2 rounded-b-lg shadow-lg ${cardBgClass.light}`
                    )}
                    sx={{
                        height: "160px",
                        border: "3px solid black",
                        zIndex: 1
                    }}
                >
                    {cardText.split('\n').map((paragraph, index) => (
                        <Typography
                            key={index}
                            variant="body2"
                            className="font-medium text-black"
                            sx={{
                                fontSize: ".75rem",
                                lineHeight: "1rem"
                            }}
                        >
                            {paragraph}
                        </Typography>
                    ))}
                    {cardFlavor && <Divider />}
                    {cardFlavor && (
                        <Typography
                            variant="body2"
                            className="italic font-medium text-black"
                            sx={{
                                fontSize: ".75rem",
                                lineHeight: "1rem"
                            }}
                        >
                            {cardFlavor}
                        </Typography>
                    )}
                </Box>

                {(cardAttack || cardDefense) && (
                    <Box
                        id="card-attack-defense"
                        className={clsx(`flex flex-row justify-center items-center px-1 py-0 !-mt-5 space-x-1 text-black rounded-lg shadow-lg ${cardBgClass.light}`)}
                        sx={{ marginLeft: "75%", marginRight: "5%", border: "3px solid black", zIndex: 2 }}
                    >
                        <Typography variant="body1" sx={{ fontSize: "1rem" }} className="!font-semibold">
                            {cardAttack ? cardAttack : "X"}
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem" }} className="!font-medium">/</Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem" }} className="!font-semibold">
                            {cardDefense ? cardDefense : "X"}
                        </Typography>
                    </Box>
                )}
            </Box>

            <Box
                className="absolute bottom-0 left-0 w-full bg-black"
                sx={{
                    height: "70px",
                    zIndex: 0,
                    borderTopLeftRadius: "1.5rem",
                    borderTopRightRadius: "1.5rem",
                }}
            >
                {cardName && (
                    <Box className="flex flex-row items-center pt-14 pl-4 space-x-1 text-gray-400">
                        <DesignServicesIcon sx={{ width: "12px", height: "12px" }} />
                        <Typography variant="subtitle2" sx={{ fontSize: ".7rem" }}>
                            {cardCreator}
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
