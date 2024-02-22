"use client";

import React, {
  useState,
  useEffect
} from "react";
import { CardsTableType } from "@/app/utils/types/supabase/cardsTableType";
import fetchCards from "@/app/lib/actions/supabase-data/fetchCardData";
import colorMapping from "@/app/utils/data/colorMapping";
import determineBgImage from "@/app/lib/actions/determineBgImage";
import Image from "next/image";
import clsx from "clsx";
import {
  Box,
  Typography,
  Skeleton,
  Divider
} from "@mui/material";

type CardRenderProps = {
  cardId: number | null;
};

export default function CardRender({
  cardId
}: CardRenderProps) {
  const [card, setCard] = useState<CardsTableType | null>(null);
  const [bgImage, setBgImage] = useState<string>("");
  const [bgColor, setBgColor] = useState<Record<string, string>>({
    "50": "bg-slate-50",
    "200": "bg-slate-200",
    "400": "bg-slate-400",
  });

  useEffect(() => {
    const loadCardData = async () => {
      if (cardId !== null) {
        const card = await fetchCards({
          from: "cards",
          filter: {
            column: "id",
            value: cardId
          }
        })
        if (card && card.length > 0) {
          setCard(card[0]);
        }
      }
      
    };

    if (cardId) {
      loadCardData();
    };
  }, [cardId])

  // Determine bgColor
  useEffect(() => {
    if (card?.cardColor === "blue") {
      setBgColor({
        "50":
          colorMapping["sky"]?.[50],
        "200":
          colorMapping["sky"]?.[200],
        "400":
          colorMapping["sky"]?.[400],
      })
    } else if (card?.cardColor === "purple") {
      setBgColor({
        "50":
          colorMapping["violet"]?.[50],
        "200":
          colorMapping["violet"]?.[200],
        "400":
          colorMapping["violet"]?.[400],
      })
    } else if (card?.cardColor === "green") {
      setBgColor({
        "50":
          colorMapping["lime"]?.[50],
        "200":
          colorMapping["lime"]?.[200],
        "400":
          colorMapping["lime"]?.[400],
      })
    } else if (card?.cardColor === "void") {
      setBgColor({
        "50":
          colorMapping["gray"]?.[50],
        "200":
          colorMapping["gray"]?.[200],
        "400":
          colorMapping["gray"]?.[400],
      })
    } else {
      setBgColor({
        "50":
          colorMapping[
          card?.cardColor as keyof typeof
          colorMapping]?.[50],
        "200":
          colorMapping[
          card?.cardColor as keyof typeof
          colorMapping]?.[200],
        "400":
          colorMapping[
          card?.cardColor as keyof typeof
          colorMapping]?.[400],
      })
    }
  }, [card?.cardColor]);

  // Determine bgImage
  useEffect(() => {
    if (card?.cardType && card?.cardColor) {
      const newBgImage = determineBgImage(
        card?.cardType,
        card?.cardColor,
      );
      setBgImage(newBgImage);
    };
  }, [
    card?.cardType,
    card?.cardColor
  ]);

  return (
    <>
      {card ? (
        <Box
          id="card-render-container"
          sx={{
            aspectRatio: "5 / 7",
            width: "400px",
            height: "560px",
            borderRadius: "12.5px",
            padding: "7.5px 12.5px 22px 12.5px"
          }}
          className="
            relative
            flex
            flex-col
            justify-start
            items-center
            bg-black
            shadow-lg
            shadow-gray-950/50
          "
        >
          {/* Card frame */}
          <Box
            id="card-frame"
            sx={{
              width: "375px",
              height: "526px",
              borderRadius: "12.5px",
            }}
            // replace bg with bgImage
            className={`
              flex
              flex-col
              w-full
              bg-cover
              bg-center
              bg-no-repeat
              ${bgImage ?? "bg-[url('/images/card-parts/card-frames/other/default.png')]"}
            `}
          >
            {/* Card header */}
            <Box
              id="card-header"
              sx={{
                maxHeight: "56px", // Increased by 8px to account for border
                padding: "3px",
                borderRadius: "4px",
                border: "4px solid black",
              }}
              className={`
                ${bgColor?.[50] ?? "bg-slate-50"}
                flex
                flex-col
                justify-between
                items-center
                w-full
                shadow-md
                shadow-gray-950/50
                z-10
                gap-1
              `}
            >
              {/* Card name and cost */}
              <Box
                id="card-header-mythic-name-cost"
                sx={{
                  height: "20px",
                }}
                className={`
                  flex
                  flex-row
                  justify-between
                  items-center
                  w-full
                  gap-2
                `}
              >
                <Box
                  id="card-header-mythic-name"
                  className={`
                    flex
                    flex-row
                    flex-grow
                    justify-start
                    items-center
                    h-full
                    gap-1
                  `}
                >
                  {/* Mythic icon boolean */}
                  {/* If mythic check */}
                  <Image
                    src="/images/card-parts/card-icons/mythic.png"
                    height={14}
                    width={14}
                    alt="Mythic icon"
                  />
                  {/* Card name */}
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "black",
                      fontWeight: 500,
                      fontSize: "15px",
                      lineHeight: "20px"
                    }}
                  >
                    {
                      card.cardName
                        .split(" ")
                        .map(word => word
                          .charAt(0)
                          .toUpperCase() + word
                            .slice(1)
                            .toLowerCase()
                          )
                        .join(" ")
                    }
                  </Typography>
                </Box> 
                {/* Card Energy Cost */}
                <Box
                  id="card-energy-cost"
                  className="
                    flex
                    flex-row
                    justify-end
                    items-center
                    w-auto
                    gap-0.25
                  "
                >
                  {Object.entries(card.cardEnergyCost ?? {})
                    .sort(([colorA], [colorB]) => {
                      const order = ["yellow", "blue", "purple", "red", "green", "void"];
                      return order.indexOf(colorA) - order.indexOf(colorB);
                    })
                    .map(([color, value]) =>
                      color !== "void"
                        ? Array.from({
                            length: typeof value === 'number' ? value : 0,
                          }, (_, i) => (
                            <Image
                              key={`${color}-${i}`}
                              src={`/images/card-parts/card-icons/card-cost/${color}.png`}
                              width={21}
                              height={21}
                              alt={`${color} energy icon`}
                            />
                          ))
                        : typeof value === 'number' && value > 0
                        ? (
                            <Image
                              key={`void-0`}
                              src={`/images/card-parts/card-icons/card-cost/void-${value}.png`}
                              width={21}
                              height={21}
                              alt={`void energy icon`}
                            />
                          )
                        : null
                    )}
                </Box>
              </Box>

              {/* Card types and speed */}
              <Box
                id="card-header-types-speed"
                sx={{
                  height: "20px",
                  borderRadius: "3px",
                  padding: "1px 2px"
                }}
                // Replace bg with bg color
                // ${colorMapping[cardColorClass as keyof typeof colorMapping]?.[200] ?? "bg-slate-200"}
                className={`
                  ${bgColor?.[200] ?? "bg-slate-200"}
                  flex
                  flex-row
                  justify-between
                  items-center
                  w-full
                  gap-2
                  text-black
                `}
              >
                {/* Card types */}
                <Box
                  id="card-header-types"
                  sx={{
                    height: "21px",
                  }}
                  className="
                    flex
                    flex-row
                    justify-between
                    items-center
                    w-full
                    gap-1
                  "
                >
                  <Typography
                    variant="subtitle2"
                    component="span"
                    className="p-0 m-0"
                    sx={{

                    }}
                  >
                    {
                      card.cardType
                        .charAt(0)
                        .toUpperCase() + 
                      card.cardType
                        .slice(1)
                        .toLowerCase()
                    } {" "}
                    {
                      card.cardSuperType !== "default" ? 
                      card.cardSuperType
                        .charAt(0)
                        .toUpperCase() + 
                      card.cardSuperType
                        .slice(1)
                        .toLowerCase() : ""
                    }
                    {
                      JSON.parse(card.cardSubType) > 0 && 
                      JSON.parse(card.cardSubType)[0].trim() ? 
                      " • " : ""
                    }
                    {
                      card.cardSubType ? JSON
                        .parse(card.cardSubType)
                        .filter((subType: string) => subType)
                        .join(" ") : ""
                    }
                  </Typography>
                </Box>
                {/* Card Speed */}
                <Box
                  className="
                    flex
                    flex-row-reverse
                    justify-start
                    items-center
                    h-full
                    gap-0.5
                    m-0
                  "
                >
                  {Array.from({
                    length: parseInt(
                      card.cardSpeed, 10
                    )}).map((_, index) => (
                    <Image
                      key={index}
                      src={`/images/card-parts/card-icons/speed.png`}
                      width={10}
                      height={15}
                      alt="Speed icon"
                    />
                  ))}
                </Box>
              </Box>
            </Box>
            {/* Card image & content */}
            <Box
              id="card-image-content-outer"
              sx={{
                width: "375px",
                height: "526px",
                paddingLeft: "13.5px",
                paddingRight: "13.5px",
                marginTop: "-8px",
              }}
              className={`
                flex
                flex-col
                w-full
                z-0
              `}
            >
              {/* Card Image Content Inner */}
              <Box
                id="card-image-content-inner"
                sx={{
                  height: "462px !important", // Increased by 6px to account for border
                  padding: "3px",
                  border: "3.75px solid black",
                  borderRadius: "8px",
                }}
                className={`
                  ${bgColor?.[400] ?? "bg-slate-400"}
                  flex
                  flex-col
                  w-full
                  gap-2
                  shadow-md
                  shadow-black/50
                `}
              >
                {/* Card image */}
                <Box
                  id="card-image"
                  sx={{
                    aspectRatio: "4 / 3 !important",
                    height: "252px !important", // Maybe 7px taller
                    border: "2px solid black",
                  }}
                  className="
                    w-full
                    overflow-hidden
                    relative
                  "
                >
                  <Image
                    src={card.cardArt || "/images/card-parts/card-art/default-art.jpg"}
                    fill={true}
                    sizes="100%"
                    alt={`${card.cardName} card art`}
                    style={{
                      objectFit: "cover"
                    }}
                  />
                </Box>
                {/* Card text and flavor text */}
                <Box
                  id="card-text-flavor"
                  sx={{
                    maxWidth: "340px !important",
                    height: "190px !important",
                    border: "2px solid black",
                    padding: "5px 7.5px",
                  }}
                  // ${colorMapping[cardColorClass as keyof typeof colorMapping]?.[50] ?? "bg-slate-50"}
                  className={`
                    bg-teal-50
                    flex
                    flex-col
                    text-black
                    gap-1
                  `}
                >
                  {/* Dynamically change card text size depending on lengths */}
                  {/* Card text */}
                  <Typography
                    id="card-text"
                    variant="body1"
                  >
                    {card.cardText}
                  </Typography>
                  {/* Divider */}
                  {card.cardFlavorText !== "" && (
                    <Divider
                      className="
                        mx-4
                        my-0.5
                        opacity-25
                      "
                    />
                  )}
                  {/* Flavor text */}
                  <Typography
                    id="flavor-text"
                    variant="body2"
                  >
                    {`"${card.cardFlavorText}"`}
                  </Typography>
                </Box>
              </Box> 
            </Box>
            {/* Card Stats & Grade */}
            <Box
              id="card-stats-grade-creator-info"
              sx={{
                maxHeight: "45px",
              }}
              className="
                flex
                flex-row
                justify-between
                items-center
                w-full
                -mt-4
                z-10
              "
            >
              {/* Card Attack */}
              {card.cardType === "entity" && (<Box
                id="stats-attack"
                className="
                  flex
                  flex-col
                  justify-center
                  items-center
                  w-1/5
                  relative
                "
              >
                <Typography
                  variant="body1"
                  className="
                    flex
                    justify-center
                    items-center
                    w-full
                    absolute
                    z-10
                    top-0
                    bottom-0
                    right-0
                    left-0
                    text-center
                    px-6
                    stats-text
                  "
                >
                  {card.cardAttack}
                </Typography>
                <Image
                  src="/images/card-parts/card-stats/attack.png"
                  width={60}
                  height={45}
                  alt="Card attack icon"
                />
              </Box>)}
              {/* Card grade + info */}
              <Box
                id="stats-grade-info"
                className={clsx("flex flex-col justify-center items-center",
                      card.cardType !== "entity" ? "w-full" : "w-3/5"
                )}
              >
                {/* Card grade */}
                <Box
                  id="stats-grade"
                  className="
                    flex
                    flex-col
                    justify-start
                    items-center
                    w-full
                  "
                >
                  {/* Card Grade */}
                  <Image
                    src={`/images/card-parts/card-icons/card-grades/grade-${card.cardGrade.toLowerCase()}.png`}
                    height={34}
                    width={34}
                    alt={`${card.cardGrade} icon`}
                    className="
                      bg-black
                      rounded-full
                      p-2
                    "
                  />
                </Box>
              </Box>
              {/* Card Defense */}
              {card.cardType === "entity" && (<Box
                id="stats-defense"
                className="
                  flex
                  flex-col
                  justify-center
                  items-center
                  w-1/5
                  relative
                "
              >
                <Typography
                  variant="body1"
                  className="
                    flex
                    justify-center
                    items-center
                    w-full
                    absolute
                    z-10
                    top-0
                    bottom-0
                    right-0
                    left-0
                    text-center
                    px-6
                    stats-text
                  "
                >
                  {card.cardDefense}
                </Typography>
                <Image
                  src="/images/card-parts/card-stats/defense.png"
                  width={60}
                  height={45}
                  alt="Card defense icon"
                />
              </Box>)}
            </Box>
            {/* Card creator & copyright */}
            <Box
              className="
                flex
                flex-row
                justify-between
                items-center
                w-full
                text-xs
                -mt-1
                px-4
              "
            >
              <p
                className="fineprint-text"
              >
                {/* Creator: {" "} */}
                {card.cardCreator
                  ? `Made by ${card.cardCreator}`
                  : "Card Creator"}
              </p>
              <p
                className="fineprint-text"
              >
                © Nexus {
                  new Date().getFullYear()
                } 
              </p>
            </Box>
          </Box>
        </Box>
      ) : (
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={400}
          height={560}
          sx={{
            borderRadius: "12.5px",
          }}
          className="
            shadow-lg
            shadow-neutral-950/50
          "
        />
      )}
    </>
  )
}
