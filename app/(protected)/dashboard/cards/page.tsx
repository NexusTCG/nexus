"use client";

import React, { useState, useEffect } from "react";
import { CardsTableType } from "@/app/utils/types/supabase/cardsTableType";
import fetchCards from "@/app/lib/actions/supabase-data/fetchCardData";
import Image from "next/image";
import {
    Box,
    Grid,
    Typography,
    Tooltip,
    Button,
    FormControl,
    MenuItem,
    Select,
    IconButton
} from "@mui/material/";
import RefreshIcon from '@mui/icons-material/Refresh';
import { SelectChangeEvent } from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';

export default function Cards() {
    const [cards, setCards] = useState<CardsTableType[] | null>([]);
    const [sort, setSort] = useState("created_at");
    const [order, setOrder] = useState("descending");
    const [sortOrder, setSortOrder] = useState(false);

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

    // Handle sort by change
    function handleSortChange(
      event: SelectChangeEvent<string>
    ) {
      const value = event.target.value as string;
      setSort(value);
    };

    // Handle sort order change
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

    // Handle data refresh
    function handleRefresh() {
      async function fetchData() {
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
          gap-4
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
            lg:pl-12
            md:pl-8
            sm:pl-4
            lg:pr-8
            md:pr-4
            sm:pr-2
            pt-4
            pb-2
            bg-neutral-800
            border-b
          border-neutral-700
            top-0
            sticky
            z-10
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
              items-center
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
                id="cards-sort-refresh-text"
                className="
                  flex
                  flex-row
                  items-center
                  gap-4
                "
              >
                <Box
                  id="cards-sort-refresh"
                  className="
                    flex
                    justify-center
                    items-center
                  "
                >
                  <Tooltip
                    title="Refresh results"
                    arrow
                  >
                    <IconButton
                        aria-label="refresh cards"
                        size="small"
                        sx={{
                          width: "20px",
                          height: "20px"
                        }}
                        className="
                          opacity-50
                          hover:opacity-100
                          transition-opacity
                          duration-300
                          ease-in-out
                        "
                        onClick={handleRefresh}
                      >
                      <RefreshIcon />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Box
                  id="cards-sort-text"
                  className="
                    flex
                    justify-center
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

        <Box
          id="cards-grid-container"
          className="
            flex
            flex-col
            justify-start
            items-center
            w-full
            lg:px-12
            md:px-8
            sm:px-6
            lg:mb-12
            mb-8
          "
        >
        {/* Card grid */}
        <Grid
          container
          spacing={2}
          className="
            bg-neutral-800
            border
            border-neutral-700
            pr-4
            ml-2
            mt-4
            rounded-lg
            shadow-xl
            shadow-red
          "
        >
          {cards?.map((card) => (
          <Grid
            item
            xs={6}
            md={4}
            lg={3}
            key={card.id}
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
                // Addc clsx for breakpoints
                className="
                  aspect-[5/7]
                  rounded-lg
                  hover:shadow-lg
                  hover:shadow-zinc-950/25
                  hover:scale-105
                  mb-2
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
      </Box>
    );
};