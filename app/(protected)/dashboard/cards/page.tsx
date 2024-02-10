"use client";

import React, { useState, useEffect } from "react";
import { CardsTableType } from "@/app/utils/types/supabase/cardsTableType";
import fetchCards from "@/app/lib/actions/supabase/fetchCardData";
import Image from "next/image";
import {
    Box,
    Grid,
    // Card,
    // CardContent,
    // CardMedia,
    Typography,
    Tooltip,
    Button,
    FormControl,
    MenuItem,
    Select,
    Divider
    // MenuItem,
    // Select
} from "@mui/material/";
import { SelectChangeEvent } from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';

export default function Cards() {
    const [cards, setCards] = useState<CardsTableType[] | null>([]);
    const [sort, setSort] = useState("created_at");
    const [order, setOrder] = useState("ascending");
    const [sortOrder, setSortOrder] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        const data = await fetchCards({
          from: "cards",
          select: "*",
          sortBy: { column: sort, ascending: sortOrder }
        });
        if (data) {
          const filteredData = data
            .filter(card =>
              card.cardRender !== null &&
              card.cardRender !== "" &&
              card.cardCreator !== null &&
              card.cardCreator !== ""
            );
          setCards(filteredData);
        }
      };
      fetchData();
    }, [sort, sortOrder]);

    function handleSortChange(
      event: SelectChangeEvent<string>
    ) {
      const value = event.target.value as string;
      setSort(value);
    };

    function handleSortOrderChange(
      event: SelectChangeEvent<string>
    ) {
      const value = event.target.value as string;
      if (value === "ascending") {
        setSortOrder(true)
      } else if (value === "descending") {
        setSortOrder(false)
      };
      setOrder(value);
    };

    return (
      <Box
        id="cards-container"
        className="
          flex
          flex-col
          justify-start
          items-center
          w-full
          py-8
          px-4
          gap-2
        "
      >
        <Box
          id="cards-header-container"
          className="
            w-full
            h-full
            flex
            flex-col
            justify-between
            items-center
            gap-4
          "
        >
          <Box
            id="cards-header-content"
            className="
              w-full
              flex
              flex-row
              justify-between
              gap-4
              
            "
          >
            <Typography
              variant="h4"
              className="
                font-medium
              "
            >
              Community gallery
            </Typography>
            <Button
              variant="outlined"
              size="small"
              startIcon={<AddIcon />}
            >
              Create card
            </Button>
          </Box>
          <Box
            id="cards-sort-pagination"
            className="
              flex
              flex-col
              lg:flex-row
              justify-between
              w-full
            "
          >
            <Box
              id="cards-sort"
              className="
                flex
                flex-row
                justify-start
                items-center
                gap-2
              "
            >
              <Box
                id="cards-sort-text"
                className="
                  flex
                  flex-row
                  items-center
                  gap-1
                "
              >
                <Typography
                  variant="overline"
                  className="
                    text-lime-500
                    font-semibold
                    text-xs
                  "
                >
                  {cards?.length}
                </Typography>
                <Typography
                  variant="body2"
                  className="
                    text-gray-300
                  "
                >
                  cards sorted by
                </Typography>
              </Box>
              
              <Box
                id="cards-sort-select"
                className="
                  flex
                  flex-row
                  items-center
                  gap-0
                "
              >
                <FormControl
                  sx={{
                    m: 1,
                    minWidth: 100
                  }}
                  size="small"
                >
                  <Select
                    labelId="sort-select-label"
                    id="sort-select"
                    value={sort}
                    onChange={handleSortChange}
                  >
                    <MenuItem value="created_at">Date created</MenuItem>
                    {/* <MenuItem value="cardVotes">Votes</MenuItem> */}
                    {/* Card Named doesn't order alphabetically */}
                    <MenuItem value="cardName">Name</MenuItem>
                    <MenuItem value="cardColor">Color</MenuItem>
                    <MenuItem value="cardGrade">Grade</MenuItem>
                  </Select>
                </FormControl>
                <Typography
                  variant="overline"
                  className="
                    text-gray-400
                    font-semibold
                  "
                >
                  :
                </Typography>
                <FormControl
                  sx={{
                    m: 1,
                    minWidth: 100
                  }}
                  size="small"
                >
                  <Select
                    labelId="sorder-order-select-label"
                    id="sort-order-select"
                    value={order}
                    onChange={handleSortOrderChange}
                  >
                    <MenuItem value="ascending">Asc</MenuItem>
                    <MenuItem value="descending">Desc</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box
              id="cards-pagination-container"
              className="
                flex
                flex-col
              "
            >
              <Box
                id="cards-pagination"
                className="
                  w-full
                  flex
                  flex-row
                  gap-2
                "
              >
                <Button
                  // disabled={true} // Need to add logic to disable button
                  variant="outlined"
                  size="medium"
                >
                  Previous
                </Button>
                <Button
                  // disabled={true} // Need to add logic to disable button
                  variant="outlined"
                  size="medium"
                >
                  Next 60
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Need to style divider */}
        <Divider />

        <Grid
          container
          spacing={2}
        >
          {cards?.map((card) => (
          <Grid
            item
            xs={6}
            md={4}
            lg={3}
            key={card.id} // Change to card.id
          >
            <Tooltip
              title={`${card.cardName} by ${card.cardCreator}`}
              arrow
            >
              <Box
                id="card-render-container"
                sx={{
                  overflow: "hidden",
                  position: "relative",
                  height: "308px",
                }}
                className="
                  aspect-[5/7]
                  rounded-lg
                  hover:shadow-lg
                  hover:shadow-zinc-950/25
                  hover:scale-105
                "
              >
                <Image
                  src={card.cardRender}
                  alt={card.cardName}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </Box>
            </Tooltip>
          </Grid>
          ))}
        </Grid>
      </Box>
    );
};