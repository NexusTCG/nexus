"use client";

import useSession from "@/app/hooks/useSession";
import { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material/";
import fetchCards from "@/app/lib/fetchCards"
import clsx from 'clsx';
import CardCreatorForm from "@/app/components/card-creator/CardCreatorForm";

type Card = {
    id: number;
    created_at: string;
    user_id: string;
    name: string;
    color: string;
}

export default function DashboardHome() {
    const [cards, setCards] = useState<Card[]>([]);
    const [promptType, setPromptType] = useState<string | null>("content");
    const promptRef = useRef<HTMLInputElement>(null);

    const user = useSession()?.user;
    if (!user) {
        console.log("User session active.");
    } else {
        console.log("User session inactive.");
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchCards();
            if (data) {
                setCards(data);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (promptRef.current) {
            promptRef.current.focus();
        }
    }, [promptType]);

    function handlePromptTypeChange(
        e: React.MouseEvent<HTMLElement>,
        newPromptType: string | null,
    ) {
        setPromptType(newPromptType);
    };

    return (
        <Box className="
            flex
            flex-col
            w-full
            p-6
            gap-6
            bg-gray-800
            border
            border-gray-700
            shadow-2xl
            rounded-lg
        ">
            <Typography variant="h3">
                Create a card
            </Typography>
            {/* Card creator form / card render */}
            {/* ChatGPT / DALL-E prompt */}
            <Box className="
                flex
                flex-row
                w-full
                gap-4
                border
                border-gray-700
            ">
                {/* Turn into components: UserCardList / PublishedCardList */}
                {cards.map((card) => (
                    <div className="card" key={card.id}>
                        <h2 className={clsx(
                            'text-2xl font-bold',
                            card.color === 'Red' && 'text-red-500',
                            card.color === 'Blue' && 'text-blue-500',
                            card.color === 'Yellow' && 'text-yellow-500',
                        )}>{card.name}</h2>
                        <p>{card.name} is very cool!</p>
                    </div>
                ))}
                
            </Box>

            <CardCreatorForm />

            <ToggleButtonGroup
                value={promptType}
                exclusive
                onChange={handlePromptTypeChange}
                aria-label="prompt type"
                className="w-full"
                >
                <ToggleButton
                    color="primary"
                    value="content"
                    aria-label="card content"
                    size="small"
                    className="w-full"
                >
                    <Typography variant="body1">
                        Card content
                    </Typography>
                </ToggleButton>
                <ToggleButton
                    color="primary"
                    value="art"
                    aria-label="card idea"
                    size="small"
                    className="w-full"
                >
                    <Typography variant="body1">
                        Card art
                    </Typography>
                </ToggleButton>
            </ToggleButtonGroup>
            <TextField
                id="prompt"
                label="AI Prompt"
                variant="outlined"
                multiline
                rows={2}
                placeholder={
                    promptType === "content"
                    ? "Write a content prompt.."
                    : "Write an art prompt.."
                }
                inputRef={promptRef}
            />
            <Button
                variant="outlined"
                size="large"
            >
                Save & Share
            </Button>
        </Box>
    );
}
