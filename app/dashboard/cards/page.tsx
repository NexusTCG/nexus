"use client";

// Hooks
import React, { 
  useState, 
  useEffect 
} from "react";
// Actions
import fetchCards from "@/app/lib/actions/supabase-data/fetchCardData";
// Utils
import Image from "next/image";
import Link from "next/link";
// Types
import { CardsTableType } from "@/app/utils/types/supabase/cardsTableType";
// Components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from '@mui/material/Select';
// Icons
import IconButton from "@mui/material/IconButton";
import RefreshIcon from '@mui/icons-material/Refresh';

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
          sortBy: { 
            column: sort, 
            ascending: sortOrder 
          }
        });
        if (data) {
          const filteredData = data
            .filter(card =>
              card.im_render !== null &&
              card.im_render !== "" &&
              card.username !== null &&
              card.username !== ""
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
              card.im_render !== null &&
              card.im_render !== "" &&
              card.username !== null &&
              card.username !== ""
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
            p-2
            bg-neutral-800/90
            border-b
          border-neutral-700
            top-0
            sticky
            z-10
            backdrop-blur-sm
            shadow-md
            shadow-neutral-950/25
          "
        >
          <Box
            id="cards-sort-pagination"
            className="
              flex
              flex-row
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
                      text-teal-400
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
                    <MenuItem value="cardName">Name</MenuItem>
                    <MenuItem value="cardEnergyAlignment">Energy</MenuItem>
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
                  Next 50
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
            lg:px-24
            md:px-12
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
            py-2
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
            sm={4}
            md={3}
            xl={2}
            key={card.id}
          >
            <Tooltip
              title={`${card.im_name} by ${card.username}`}
              arrow
            >
              <Box
                id="card-render-container"
                sx={{
                  overflow: "hidden",
                  position: "relative",
                  aspectRatio: "5/7"
                }}
                className="
                  rounded-xl
                  hover:shadow-lg
                  hover:shadow-zinc-950/25
                  hover:scale-105
                  mb-1
                  w-full
                "
              >
                <Link
                  href={`/dashboard/cards/${card.id}`}
                >
                  {card.im_render && (
                    <Image
                      src={card.im_render}
                      alt={card.im_name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </Link>
              </Box>
            </Tooltip>
          </Grid>
          ))}
        </Grid>
        </Box>
      </Box>
    );
};