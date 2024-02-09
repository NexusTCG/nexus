"use client";

import React, { useState, useEffect } from "react";
import { CardFormDataType } from "@/app/utils/types/types"
import fetchCards from "@/app/lib/actions/fetchCards";
// import Image from "next/image";
import {
    Box,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Tooltip,
    Button
    // MenuItem,
    // Select
} from "@mui/material/";
import AddIcon from '@mui/icons-material/Add';

export default function Gallery() {
    const [cards, setCards] = useState<CardFormDataType[]>([]);
    // const [sort, setSort] = useState("created_at");

    useEffect(() => {
        const fetchData = async () => {
          const data = await fetchCards();
          if (data) {
            setCards(data);
          }
        };
        fetchData();
    }, []);

    // const handleSortChange = (event: ChangeEvent<{ value: unknown }>) => {
    //     const value = event.target.value as string;
    //     setSort(value);
    //     fetchCards(value);
    // };

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
                    {cards.length} cards
                </Typography>
            
            {/* <Select onChange={handleSortChange} value={sort} className="tailwind-classes">
            <MenuItem value="created_at">Most Recent</MenuItem>
            <MenuItem value="name">Name</MenuItem>
            </Select> */}

            <Grid
                container
                spacing={2}
                className="
                    pl-8
                "
            >
            {cards.map((card) => (
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