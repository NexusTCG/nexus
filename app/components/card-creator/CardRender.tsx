"use client";

// Hooks
import React, {
  useState,
  useEffect,
} from "react";
// Actions
import colorMapping from "@/app/utils/data/colorMapping";
import determineBgImage from "@/app/lib/actions/determineBgImage";
// Types
import { CardsTableType } from "@/app/utils/types/supabase/cardsTableType";
import { CardFormDataType } from "@/app/utils/types/types";
// Utils
import Image from "next/image";
import clsx from "clsx";
// Data
import { Keywords } from "@/app/utils/data/Keywords";
// Custom Components
import Keyword from "@/app/components/card-creator/Keyword";
// Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Divider from "@mui/material/Divider";
// Icons
import AdsClickIcon from '@mui/icons-material/AdsClick';

import EnergyRadiant from "@/public/images/card-parts/card-icons/card-cost/energy-radiant.svg";
import EnergyVolatile from "@/public/images/card-parts/card-icons/card-cost/energy-volatile.svg";
import EnergyCorrupt from "@/public/images/card-parts/card-icons/card-cost/energy-corrupt.svg";
import EnergyBlaze from "@/public/images/card-parts/card-icons/card-cost/energy-blaze.svg";
import EnergyVerdant from "@/public/images/card-parts/card-icons/card-cost/energy-verdant.svg";

import EnergyVoid0 from "@/public/images/card-parts/card-icons/card-cost/energy-void-0.svg";
import EnergyVoid1 from "@/public/images/card-parts/card-icons/card-cost/energy-void-1.svg";
import EnergyVoid2 from "@/public/images/card-parts/card-icons/card-cost/energy-void-2.svg";
import EnergyVoid3 from "@/public/images/card-parts/card-icons/card-cost/energy-void-3.svg";
import EnergyVoid4 from "@/public/images/card-parts/card-icons/card-cost/energy-void-4.svg";
import EnergyVoid5 from "@/public/images/card-parts/card-icons/card-cost/energy-void-5.svg";
import EnergyVoid6 from "@/public/images/card-parts/card-icons/card-cost/energy-void-6.svg";
import EnergyVoid7 from "@/public/images/card-parts/card-icons/card-cost/energy-void-7.svg";
import EnergyVoid8 from "@/public/images/card-parts/card-icons/card-cost/energy-void-8.svg";
import EnergyVoid9 from "@/public/images/card-parts/card-icons/card-cost/energy-void-9.svg";
import EnergyVoid10 from "@/public/images/card-parts/card-icons/card-cost/energy-void-10.svg";
import EnergyVoid11 from "@/public/images/card-parts/card-icons/card-cost/energy-void-11.svg";
import EnergyVoid12 from "@/public/images/card-parts/card-icons/card-cost/energy-void-12.svg";
import EnergyVoid13 from "@/public/images/card-parts/card-icons/card-cost/energy-void-13.svg";
import EnergyVoid14 from "@/public/images/card-parts/card-icons/card-cost/energy-void-14.svg";
import EnergyVoid15 from "@/public/images/card-parts/card-icons/card-cost/energy-void-15.svg";

import Attack from "@/public/images/card-parts/card-icons/card-stats/attack.svg";
import Defense from "@/public/images/card-parts/card-icons/card-stats/defense.svg";
import Speed from "@/public/images/card-parts/card-icons/speed.svg";
import Mythic from "@/public/images/card-parts/card-icons/mythic.svg";

// import RangeMelee from "@/public/images/card-parts/card-icons/range-melee.svg";
// import RangeRanged from "@/public/images/card-parts/card-icons/range-ranged.svg";
// import StateLocked from "@/public/images/card-parts/card-icons/state-locked.svg";
// import StateUnlocked from "@/public/images/card-parts/card-icons/state-unlocked.svg";

import GradeCore from "@/public/images/card-parts/card-icons/card-grades/grade-core.svg";
import GradeRare from "@/public/images/card-parts/card-icons/card-grades/grade-rare.svg";
import GradeEpic from "@/public/images/card-parts/card-icons/card-grades/grade-epic.svg";
import GradePrime from "@/public/images/card-parts/card-icons/card-grades/grade-prime.svg";

type CardRenderProps = {
  cardData?: CardsTableType | CardFormDataType | null;
};

const voidEnergyIcons = [
  EnergyVoid0,
  EnergyVoid1,
  EnergyVoid2,
  EnergyVoid3,
  EnergyVoid4,
  EnergyVoid5,
  EnergyVoid6,
  EnergyVoid7,
  EnergyVoid8,
  EnergyVoid9,
  EnergyVoid10,
  EnergyVoid11,
  EnergyVoid12,
  EnergyVoid13,
  EnergyVoid14,
  EnergyVoid15,
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

    // Capitalize first letter of word
    function capitalizeWord(
      word: string
    ) {
      return word
          .charAt(0)
          .toUpperCase() + 
        word
          .slice(1)
          .toLowerCase();
    }

    // Utility function to render text with keywords
    function renderTextWithKeywords(
      text: string, 
      cardName: string
    ) {
      const keywordPattern = Object
        .keys(Keywords)
        .join("|");
      const regex = new RegExp(`\\b(${keywordPattern})\\b`, "gi");
    
      const processLine = (
        line: string, 
        lineIndex: number
      ) => {
        const parts = line.split(regex);
    
        return parts.map((part, index) => {
          const keywordKey = Object
            .keys(Keywords)
            .find(key => key.toLowerCase() === part.toLowerCase());
    
          if (keywordKey) {
            const keyword = Keywords[keywordKey];
    
            return (
              <Keyword
                key={`${lineIndex}-${index}`}
                effect={""}
                keyword={keyword}
              />
            );
          } else {
            // If part is not a keyword, or keywordKey is undefined, return the part as is.
            // Also replace "~" with `cardName`
            return <span key={`${lineIndex}-${index}`}>{part.replace(/~/g, cardName)}</span>;
          }
        });
      };
    
      return text.split('\n').map((line, index) => (
        <Typography
          key={index}
          variant="body1"
          component="div"
          gutterBottom
        >
          {processLine(line, index)}
        </Typography>
      ));
    }

    // Render cardType and cardSubType
    function renderCardType(
      cardData: CardsTableType | 
      CardFormDataType | 
      undefined |
      null
    ) {
      let cardTypeText = "";
      let cardSubTypeText = "";
      if (cardData?.cardType) {
        const cardType = Array
          .isArray(cardData.cardType) ? 
          cardData.cardType : 
          [cardData.cardType];
        cardTypeText = cardType
          .map(capitalizeWord)
          .join(" ");
      }
      if (
        cardData?.cardSubType && 
        cardData.cardSubType.length > 0
      ) {
        const separator = cardData.cardSubType.length > 1 ? " • " : "";
        cardSubTypeText = cardData.cardSubType
          .map(capitalizeWord)
          .join(" ");
        cardTypeText += `${separator}${cardSubTypeText}`;
      }
      return cardTypeText;
    };

    // Determine bgColor
    useEffect(() => {
      if (
        cardData?.cardEnergyAlignment && 
        cardData !== null
      ) {
        if (
          cardData?.cardEnergyAlignment === "radiant"
        ) {
          setBgColor({
            "50":
              colorMapping["yellow"]?.[50],
            "200":
              colorMapping["yellow"]?.[200],
            "400":
              colorMapping["yellow"]?.[400],
          })
        } else if (
          cardData?.cardEnergyAlignment === "volatile"
        ) {
          setBgColor({
            "50":
              colorMapping["sky"]?.[50],
            "200":
              colorMapping["sky"]?.[200],
            "400":
              colorMapping["sky"]?.[400],
          })
        } else if (
          cardData?.cardEnergyAlignment === "corrupt"
        ) {
          setBgColor({
            "50":
              colorMapping["violet"]?.[50],
            "200":
              colorMapping["violet"]?.[200],
            "400":
              colorMapping["violet"]?.[400],
          })
        } else if (
          cardData?.cardEnergyAlignment === "blaze"
        ) {
          setBgColor({
            "50":
              colorMapping["red"]?.[50],
            "200":
              colorMapping["red"]?.[200],
            "400":
              colorMapping["red"]?.[400],
          })
        } else if (
          cardData?.cardEnergyAlignment === "verdant"
        ) {
          setBgColor({
            "50":
              colorMapping["lime"]?.[50],
            "200":
              colorMapping["lime"]?.[200],
            "400":
              colorMapping["lime"]?.[400],
          })
        } else if (
          cardData?.cardEnergyAlignment === "void"
        ) {
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
                cardData?.cardEnergyAlignment as keyof typeof
              colorMapping]?.[50],
            "200":
              colorMapping[
                cardData?.cardEnergyAlignment as keyof typeof
              colorMapping]?.[200],
            "400":
              colorMapping[
                cardData?.cardEnergyAlignment as keyof typeof
              colorMapping]?.[400],
          })
        }
      }
    }, [cardData?.cardEnergyAlignment]);

    // Determine bgImage
    useEffect(() => {
      if (
        cardData?.cardType && 
        cardData?.cardEnergyAlignment
      ) {
        const cardType = Array.isArray(
          cardData?.cardType) ? 
          cardData?.cardType[0] : 
          cardData?.cardType;
        const newBgImage = determineBgImage(
          cardType,
          cardData?.cardEnergyAlignment,
        );
        setBgImage(newBgImage);
      };
    }, [
      cardData?.cardType,
      cardData?.cardEnergyAlignment
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

    // Card Render
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
                {cardData?.cardUnitType === "ranged" && (
                  <AdsClickIcon
                    sx={{ 
                      fontSize: "18px", 
                      color: "black" 
                    }}
                    className="
                      bg-amber-500
                      rounded-full
                      border
                      border-black
                    "
                  />
                )}
                {cardData?.cardSuperType === "mythic" && (
                  <Image
                    src={Mythic}
                    height={14}
                    width={14}
                    alt="Mythic icon"
                  />
                )}
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
                  .sort(([energyA], [energyB]) => {
                    const order = [
                      "radiant", 
                      "volatile", 
                      "corrupt", 
                      "blaze", 
                      "verdant", 
                      "void"
                    ];
                    return order.indexOf(energyA) - order.indexOf(energyB);
                  })
                  .map(([energy, value]) =>
                    energy !== "void"
                      ? Array.from({
                          length: typeof value === 'number' ? value : 0,
                        }, (_, i) => (
                          <Image
                            key={`${energy}-${i}`}
                            src={
                              energy === "radiant" ? EnergyRadiant :
                              energy === "volatile" ? EnergyVolatile :
                              energy === "corrupt" ? EnergyCorrupt :
                              energy === "blaze" ? EnergyBlaze :
                              energy === "verdant" ? EnergyVerdant :
                              null
                            }
                            width={21}
                            height={21}
                            alt={`${energy} energy icon`}
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
                  className="
                    p-0 
                    m-0
                  "
                >
                  {renderCardType(cardData)}
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
                  length: cardData.cardSpeed ? 
                  parseInt(cardData.cardSpeed, 10) : 0
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
                className={`
                  bg-teal-50
                  flex
                  flex-col
                  text-black
                  gap-1
                `}
              >
                {/* Card text */}
                {/* {
                  cardData.cardText && 
                  cardData.cardName
                  ? cardData.cardText
                        .replace(/~/g, cardData.cardName)
                        .split('\n')
                        .map((line, index) => (
                          <Typography
                            key={index}
                            variant="body1"
                            component="div"
                            gutterBottom
                          >
                            {line}
                          </Typography>
                        ))
                    : null
                  } */}
                  {
                    cardData.cardText && cardData.cardName
                      ? renderTextWithKeywords(cardData.cardText, cardData.cardName)
                      : null
                  }
                {/* Flavor text */}
                {cardData.cardLoreText !== "" && (
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
                      {`"${cardData.cardLoreText}"`}
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
            {
              cardData.cardType && 
              cardData.cardType
                .includes("entity") && (
                <Box
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
                </Box>
              )
            }
            {/* Card grade + info */}
            <Box
              id="stats-grade-info"
              className={clsx("flex flex-col justify-center items-center",
                cardData.cardType && 
                !cardData.cardType
                  .includes("entity") ? 
                "w-full" : "w-3/5"
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
                  src={
                    cardData.cardGrade === "rare" ? GradeRare :
                    cardData.cardGrade === "epic" ? GradeEpic :
                    cardData.cardGrade === "prime" ? GradePrime :
                    GradeCore
                  }
                  height={34}
                  width={34}
                  alt={`${cardData.cardGrade} icon`}
                  className="
                    bg-black
                    rounded-full
                    p-1.5
                  "
                />
              </Box>
            </Box>
            {/* Card Defense */}
            {
              cardData.cardType && 
              cardData.cardType
                .includes("entity") && 
                (
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
                  </Box>
                )
            }
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