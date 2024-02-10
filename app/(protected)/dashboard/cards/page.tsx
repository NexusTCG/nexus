"use client";

import React, { useState, useEffect } from "react";
import { CardsTableType } from "@/app/utils/types/supabase/cardsTableType";
import fetchData from "@/app/lib/actions/fetchCardData";
// import Image from "next/image";
import {
    Box,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Tooltip,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select
    // MenuItem,
    // Select
} from "@mui/material/";
import { SelectChangeEvent } from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';

export default function Cards() {
    const [cards, setCards] = useState<CardsTableType[] | null>([]);
    const [sort, setSort] = useState("created_at");

    useEffect(() => {
        const fetchCards = async () => {
          const data = await fetchData({
            from: "cards",
            select: "*",
            sortBy: { column: sort, ascending: true }
          });
          if (data) {
            setCards(data);
          }
        };
        fetchCards();
    }, [sort]);

    function handleSortChange(event: SelectChangeEvent<string>) {
        const value = event.target.value as string;
        setSort(value);
    };

    return (
        <Box
            className="
                w-full
                h-full
                flex
                flex-col
                justify-between
                items-center
                bg-gray-800
                border
                border-gray-700
                py-12
                pl-4
                pr-12
                gap-8
                rounded-lg
                shadow-lg
                shadow-black
            "
        >
            <Box
                className="
                    w-full
                    flex
                    flex-row
                    justify-between
                    pl-8
                "
            >
                <Typography
                    variant="h1"
                >
                    Gallery
                </Typography>
                <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AddIcon />}
                    className="
                        rounded-full
                        pl-4
                        pr-6
                    "
                >
                    Create card
                </Button>
            </Box>

            <Typography
                    variant="overline"
                    className="
                        text-gray-300
                    "
                >
                    {cards?.length} cards
                </Typography>

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                    Most Recent
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="sort-select"
                    value={sort}
                    label="Age"
                    onChange={handleSortChange}
                >
                    <MenuItem value="created_at">Most recent</MenuItem>
                    {/* Card Named doesn't order alphabetically */}
                    <MenuItem value="cardName">Card Name</MenuItem>
                </Select>
            </FormControl>

            <Grid
                container
                spacing={2}
                className="
                    pl-8
                "
            >
            {cards?.map((card) => (
                <Grid
                    item
                    xs={6}
                    sm={4}
                    md={3}
                    key={card.cardName} // Change to card.id
                >
                <Card
                    className="
                        w-full
                        h-full
                        flex
                        flex-col
                        justify-start
                        items-center
                        hover:scale-105
                        transition-transform
                    "
                >
                    <Tooltip
                        title={`${card.cardName} by ${card.cardCreator}`}
                    >
                    <CardMedia
                        component="img"
                        height="140"
                        image={card.cardRender}
                        alt={card.cardName}
                        className="
                            rounded-xl
                            shadow-md
                            hover:shadow-lg
                            shadow-gray-950/80
                            hover:shadow-gray-950/60
                            border
                            border-transparent
                            hover:border-gray-700
                            
                        "
                    />
                    </Tooltip>
                    <CardContent>
                    <Typography
                        gutterBottom
                        variant="overline"
                    >
                        {card.cardName} by {card.cardCreator}
                    </Typography>
                    </CardContent>
                </Card>
                </Grid>
            ))}
            </Grid>
        </Box>
    );
};