"use client";

import React, {
  useState,
  useEffect,
} from "react";
import { CardsTableType } from "@/app/utils/types/supabase/cardsTableType";
import { CardFormDataType } from "@/app/utils/types/types";
import colorMapping from "@/app/utils/data/colorMapping";
import determineBgImage from "@/app/lib/actions/determineBgImage";
import Image from "next/image";
import clsx from "clsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Divider from "@mui/material/Divider";
// SVG icons
import Speed from "@/public/images/card-parts/card-icons/speed.svg";
import Mythic from "@/public/images/card-parts/card-icons/mythic.svg";
import Attack from "@/public/images/card-parts/card-stats/attack.svg";
import Defense from "@/public/images/card-parts/card-stats/defense.svg";
import Common from "@/public/images/card-parts/card-icons/card-grades/common.svg";
import Rare from "@/public/images/card-parts/card-icons/card-grades/rare.svg";
import Epic from "@/public/images/card-parts/card-icons/card-grades/epic.svg";
import Prime from "@/public/images/card-parts/card-icons/card-grades/prime.svg";
// Energy icons
import Yellow from "@/public/images/card-parts/card-icons/card-cost/yellow.svg";
import Blue from "@/public/images/card-parts/card-icons/card-cost/blue.svg";
import Purple from "@/public/images/card-parts/card-icons/card-cost/purple.svg";
import Red from "@/public/images/card-parts/card-icons/card-cost/red.svg";
import Green from "@/public/images/card-parts/card-icons/card-cost/green.svg";
import Void0 from "@/public/images/card-parts/card-icons/card-cost/void-1.svg";
import Void1 from "@/public/images/card-parts/card-icons/card-cost/void-1.svg";
import Void2 from "@/public/images/card-parts/card-icons/card-cost/void-2.svg";
import Void3 from "@/public/images/card-parts/card-icons/card-cost/void-3.svg";
import Void4 from "@/public/images/card-parts/card-icons/card-cost/void-4.svg";
import Void5 from "@/public/images/card-parts/card-icons/card-cost/void-5.svg";
import Void6 from "@/public/images/card-parts/card-icons/card-cost/void-6.svg";
import Void7 from "@/public/images/card-parts/card-icons/card-cost/void-7.svg";
import Void8 from "@/public/images/card-parts/card-icons/card-cost/void-8.svg";
import Void9 from "@/public/images/card-parts/card-icons/card-cost/void-9.svg";
import Void10 from "@/public/images/card-parts/card-icons/card-cost/void-10.svg";
import Void11 from "@/public/images/card-parts/card-icons/card-cost/void-11.svg";
import Void12 from "@/public/images/card-parts/card-icons/card-cost/void-12.svg";
import Void13 from "@/public/images/card-parts/card-icons/card-cost/void-13.svg";
import Void14 from "@/public/images/card-parts/card-icons/card-cost/void-14.svg";
import Void15 from "@/public/images/card-parts/card-icons/card-cost/void-15.svg";

type CardRenderProps = {
  cardData?: CardsTableType | CardFormDataType | null;
};

const voidEnergyIcons = [
  Void0,
  Void1,
  Void2,
  Void3,
  Void4,
  Void5,
  Void6,
  Void7,
  Void8,
  Void9,
  Void10,
  Void11,
  Void12,
  Void13,
  Void14,
  Void15,
];

const CardRender = ({
   cardData,
}: CardRenderProps) => {
    const [bgImage, setBgImage] = useState<string>("");
    const [bgColor, setBgColor] = useState<Record<string, string>>({
      "50": "bg-slate-50",
      "200": "bg-slate-200",
      "400": "bg-slate-400",
    });


    // Determine bgColor
    useEffect(() => {
      if (cardData?.cardColor && cardData !== null) {
        if (cardData?.cardColor === "blue") {
          setBgColor({
            "50":
              colorMapping["sky"]?.[50],
            "200":
              colorMapping["sky"]?.[200],
            "400":
              colorMapping["sky"]?.[400],
          })
        } else if (cardData?.cardColor === "purple") {
          setBgColor({
            "50":
              colorMapping["violet"]?.[50],
            "200":
              colorMapping["violet"]?.[200],
            "400":
              colorMapping["violet"]?.[400],
          })
        } else if (cardData?.cardColor === "green") {
          setBgColor({
            "50":
              colorMapping["lime"]?.[50],
            "200":
              colorMapping["lime"]?.[200],
            "400":
              colorMapping["lime"]?.[400],
          })
        } else if (cardData?.cardColor === "void") {
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
                cardData?.cardColor as keyof typeof
              colorMapping]?.[50],
            "200":
              colorMapping[
                cardData?.cardColor as keyof typeof
              colorMapping]?.[200],
            "400":
              colorMapping[
                cardData?.cardColor as keyof typeof
              colorMapping]?.[400],
          })
      }
      
      }
    }, [cardData?.cardColor]);

    // Determine bgImage
    useEffect(() => {
      if (
        cardData?.cardType && 
        cardData?.cardColor
      ) {
        const cardType = Array.isArray(cardData?.cardType) ? cardData?.cardType[0] : cardData?.cardType;
        const newBgImage = determineBgImage(
          cardType,
          cardData?.cardColor,
        );
        setBgImage(newBgImage);
      };
    }, [
      cardData?.cardType,
      cardData?.cardColor
    ]);

    // Skeleton Card Render
    if (!cardData) {
      return (
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
      )
    }

    // High Quality Card Render
    if (cardData) {
    return (
      <Box
        id="high-quality-card-render-container"
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
          className={`
            flex
            flex-col
            w-full
            bg-cover
            bg-center
            bg-no-repeat
            ${
              bgImage ?? 
              "bg-[url('/images/card-parts/card-frames/other/default.png')]"
            }
          `}
        >
          {/* Card header */}
          <Box
            id="card-header"
            sx={{
              maxHeight: "56px", // Increased by 8px to account for border
              padding: "3px",
              border: "4px solid black",
            }}
            className={`
              ${bgColor?.[50] ?? "bg-slate-50"}
              flex
              flex-col
              justify-between
              items-center
              w-full
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
                <Image
                  src={Mythic}
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
                    (cardData?.cardName ?? '')
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
                {Object.entries(cardData.cardEnergyCost ?? {})
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
                            src={
                              color === "yellow" ? Yellow :
                              color === "blue" ? Blue :
                              color === "purple" ? Purple :
                              color === "red" ? Red :
                              color === "green" ? Green :
                              null
                            }
                            width={21}
                            height={21}
                            alt={`${color} energy icon`}
                          />
                        ))
                      : typeof value === 'number' && value > 0
                      ? (
                        <Image
                          key={`void-${value}`}
                          src={voidEnergyIcons[value]}
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
                <Typography variant="subtitle2" component="span" className="p-0 m-0">
                  {
                    cardData?.cardType
                      ? Array.isArray(cardData.cardType)
                        ? cardData.cardType.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
                        : cardData.cardType.charAt(0).toUpperCase() + cardData.cardType.slice(1).toLowerCase()
                      : ""
                  } {" "}
                  {
                    cardData?.cardSubType ? " • " : ""
                  }
                  {
                    cardData?.cardSubType
                      ? Array.isArray(cardData.cardSubType)
                        ? cardData.cardSubType.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
                        : cardData.cardSubType.charAt(0).toUpperCase() + cardData.cardSubType.slice(1).toLowerCase()
                    : ""
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
                  length: cardData.cardSpeed ? parseInt(cardData.cardSpeed, 10) : 0
                }).map((_, index) => (
                  <Image
                    key={index}
                    src={Speed}
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
              marginTop: "-3.75px",
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
                borderBottomLeftRadius: "8px",
                borderBottomRightRadius: "8px",
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
                  width: "336px !important",
                  height: "252px !important",
                  border: "2px solid black",
                }}
                className="
                  w-full
                  overflow-hidden
                  relative
                "
              >
                
                <Image
                  src={cardData.cardArt || "/images/card-parts/card-art/default-art.jpg"}
                  fill={true}
                  sizes="100%"
                  alt={`${cardData.cardName} card art`}
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
                {/* Card text */}
                <Typography
                  id="card-text"
                  variant="body1"
                >
                  {cardData.cardText}
                </Typography>
                {/* Divider */}
                {/* Flavor text */}
                {cardData.cardFlavorText !== "" && (
                  <>
                    <Divider
                      className="
                        mx-4
                        my-0.5
                        opacity-25
                      "
                    />
                    <Typography
                      id="flavor-text"
                      variant="body2"
                    >
                      {`"${cardData.cardFlavorText}"`}
                    </Typography>
                  </>
                )}
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
              -mt-5
              z-10
            "
          >
            {/* Card Attack */}
            {cardData.cardType && cardData.cardType.includes("entity") && (<Box
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
                {cardData.cardAttack}
              </Typography>
              <Image
                src={Attack}
                width={60}
                height={45}
                alt="Card attack icon"
              />
            </Box>)}
            {/* Card grade + info */}
            <Box
              id="stats-grade-info"
              className={clsx("flex flex-col justify-center items-center",
                cardData.cardType && !cardData.cardType.includes("entity") ? "w-full" : "w-3/5"
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
                  // src={`/images/card-parts/card-icons/card-grades/grade-${cardData.cardGrade ? cardData.cardGrade.toLowerCase() : "common"}.png`}
                  src={
                    cardData.cardGrade === "rare" ? Rare :
                    cardData.cardGrade === "epic" ? Epic :
                    cardData.cardGrade === "prime" ? Prime :
                    Common
                  }
                  height={34}
                  width={34}
                  alt={`${cardData.cardGrade} icon`}
                  className="
                    bg-black
                    rounded-full
                    p-0.5
                  "
                />
              </Box>
            </Box>
            {/* Card Defense */}
            {cardData.cardType && cardData.cardType.includes("entity") && (
            <Box
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
                {cardData.cardDefense}
              </Typography>
              <Image
                src={Defense}
                width={60}
                height={45}
                alt="Card defense icon"
              />
            </Box>)}
          </Box>
          {/* Card creator & copyright */}
          <Box
            className={clsx("flex flex-row justify-between items-center w-full text-xs -mt-1 px-16",
              {
                "mt-1": cardData.cardType && !cardData.cardType.includes("entity"),
              }
            )}
          >
            <p
              className="fineprint-text"
            >
              {/* Creator: {" "} */}
              {cardData.cardCreator
                ? `Made by ${cardData.cardCreator}`
                : "Card Creator"}
            </p>
            {/* <p
              className="fineprint-text"
            >
              © Nexus {
                new Date().getFullYear()
              } 
            </p> */}
          </Box>
        </Box>
      </Box>
    )
  }
};

export default React.memo(CardRender);