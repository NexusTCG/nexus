import { Box, Typography, Divider } from "@mui/material";
import Image from "next/image";
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import clsx from 'clsx';
import { EnergyType } from '@/app/types/types';
import { energyIcons } from '@/app/constants/iconData';

type NexusCardProps = {
    cardCreator: string;
    cardName: string;
    cardCost: { [key in EnergyType]?: number };
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

    // Function to render the cost icons based on the cardCost object
    const renderCostIcons = () => {
        return Object.entries(cardCost).flatMap(([energyType, count]) => {
            const IconComponent = energyIcons[energyType as keyof typeof energyIcons].icon;
            return Array.from({ length: count || 0 }, (_, index) => (
                <IconComponent 
                    key={`${energyType}-${index}`}
                    style={{ 
                        width: 20, 
                        height: 20, 
                        boxShadow: "0px 2px 0px rgba(0, 0, 0, .75)", 
                        borderRadius: "50%",
                        padding: "2px",
                        color: "black"
                    }}
                    className={energyIcons[energyType as keyof typeof energyIcons].tailwindClass as string}
                />
            ));
        });
    };

    // Function to get the dynamic background class
    const getCardBackgroundClass = () => {
        const energyTypes = Object.keys(cardCost) as (keyof typeof tailwindClasses)[];
    
        // Mapping energy types to Tailwind classes
        const tailwindClasses = {
            yellow: "bg-yellow-300",
            blue: "bg-sky-400",
            purple: "bg-purple-400",
            red: "bg-red-400",
            green: "bg-lime-400",
            colorless: "bg-slate-400",
            // Define a gradient for multicolor
            multicolor: "bg-gradient-to-r from-orange-400 to-teal-400 to-rose-400"
        };
    
        // Determine the background class based on the energy types
        if (energyTypes.length > 1) {
            // For dual-color, you can adjust this logic to combine two colors
            return tailwindClasses.multicolor;
        } else {
            return tailwindClasses[energyTypes[0]] || ""; // Fallback for undefined types
        }
    };

    // Get the background class for the current card
    const cardBgClass = getCardBackgroundClass();

    return (
        <Box
            id="nexus-card-render"
            className={clsx(
                "flex flex-col p-3 rounded-xl shadow-lg shadow-slate-900",
                cardBgClass // Dynamically apply the background class
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
                className="flex flex-col w-full h-full p-2 space-y-0 rounded-md border"
                sx={{
                    width: "100%",
                    height: "100%",
                }}
            >
                {/* Card name and cost */}
                <Box
                    className="flex flex-row justify-between items-center px-1 py-1 rounded-lg text-black shadow-lg"
                    sx={{ height: "36px", border: "3px solid black", zIndex: 2 }}
                >
                    <Typography variant="body2" className="font-medium text-black">
                        {cardName}
                    </Typography>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        {renderCostIcons()}
                    </div>
                </Box>

                {/* Card image */}
                <Box className="flex flex-col justify-center mx-1 !-mt-1" sx={{ height: "200px", border: "3px solid black", overflow: "hidden" }}>
                    <Image
                        src="/images/card-art/cache-reclaimer.jpg"
                        width={350}
                        height={480}
                        alt={`Nexus TCG card art for ${cardName}`}
                        className="mx-auto max-w-full h-auto"
                    />
                </Box>

                {/* Card type and grade */}
                <Box
                    className="flex flex-row justify-between items-center px-1 py-auto !-mt-1 rounded-lg font-medium shadow-lg text-black"
                    sx={{ height: "36px", border: "3px solid black", zIndex: 2 }}
                >
                    <Box className="flex flex-row space-x-1">
                        <Typography variant="body2">{cardSuperType}</Typography>
                        <Typography variant="body2">{cardType}</Typography>
                        {cardSubType.length > 0 && <Typography variant="body2">–</Typography>}
                        <Typography variant="body2">{cardSubType.join(', ')}</Typography>
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

                {/* Card text and flavor */}
                <Box
                    className="flex flex-col justify-start p-2 mx-1 !-mt-1 space-y-2 rounded-b-lg shadow-lg"
                    sx={{ height: "160px", border: "3px solid black" }}
                >
                    {cardText.split('\n').map((paragraph, index) => (
                        <Typography key={index} variant="body2" className="font-medium text-black" sx={{ fontSize: ".75rem", lineHeight: "1rem" }}>
                            {paragraph}
                        </Typography>
                    ))}
                    {cardFlavor && <Divider />}
                    {cardFlavor && (
                        <Typography variant="body2" className="italic font-medium text-black" sx={{ fontSize: ".75rem", lineHeight: "1rem" }}>
                            {cardFlavor}
                        </Typography>
                    )}
                </Box>

                {/* Card attack and defense */}
                {(cardAttack || cardDefense) && (
                    <Box
                        className="flex flex-row justify-center items-center px-1 py-0 !-mt-5 space-x-1 text-black rounded-lg shadow-lg"
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

            {/* Card creator */}
            <Box
                className="absolute bottom-0 left-0 w-full bg-black"
                sx={{
                    height: "70px",
                    zIndex: 0,
                    borderTopLeftRadius: ".75rem",
                    borderTopRightRadius: ".75rem",
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
