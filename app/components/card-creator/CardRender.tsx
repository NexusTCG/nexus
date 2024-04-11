"use client";

// Hooks
import React, {
  useState,
  useEffect,
} from "react";
// Actions
import colorMapping from "@/app/utils/data/colorMapping";
import determineBgImage from "@/app/lib/actions/determineBgImage";
import { splitCamelCase } from "@/app/lib/actions/utils/splitCamelCase";
import { capitalizeWord } from "@/app/lib/actions/utils/capitalizeWord";
// Types
import { CardsTableType } from "@/app/utils/types/supabase/cardsTableType";
import { CardFormDataType } from "@/app/utils/types/types";
// Utils
import Image from "next/image";
import clsx from "clsx";
// Data
import { Keywords } from "@/app/utils/data/Keywords";
import { abbreviationIcons } from "@/app/utils/data/abbreviationIcons";
// Custom Components
import Keyword from "@/app/components/card-creator/Keyword";
// Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
// Icons
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Speed2 from "@/public/images/card-parts/card-icons/speed2.svg";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Speed3 from "@/public/images/card-parts/card-icons/speed3.svg";
import Mythic from "@/public/images/card-parts/card-icons/mythic.svg";

import RangeMelee from "@/public/images/card-parts/card-icons/range-melee.svg";
import RangeRanged from "@/public/images/card-parts/card-icons/range-ranged.svg";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import StateLocked from "@/public/images/card-parts/card-icons/state-locked.svg";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import StateUnlocked from "@/public/images/card-parts/card-icons/state-unlocked.svg";

import GradeCore from "@/public/images/card-parts/card-icons/card-grades/grade-core.svg";
import GradeRare from "@/public/images/card-parts/card-icons/card-grades/grade-rare.svg";
import GradeEpic from "@/public/images/card-parts/card-icons/card-grades/grade-epic.svg";
import GradePrime from "@/public/images/card-parts/card-icons/card-grades/grade-prime.svg";

type CardRenderProps = {
  cardData?: CardsTableType | CardFormDataType | null;
  cardMode: "initial" | "anomaly";
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
   cardMode,
}: CardRenderProps) => {
    const [fontSize, setFontSize] = useState<string>("15px");
    const [lineHeight, setLineHeight] = useState<string>("17px");
    const [inlineIconSize, setInlineIconSize] = useState<number>(18);
    const [bgImage, setBgImage] = useState<string>("");
    const [bgColor, setBgColor] = useState<Record<string, string>>({
      "50": "bg-slate-50",
      "200": "bg-slate-200",
      "400": "bg-slate-400",
    });

    // Render text with keywords
    function renderTextWithKeywords(
      text: string,
      cardName: string
    ) {
      const keywordsSorted = Object
        .keys(Keywords)
        .sort((a, b) => b.length - a.length);
      const keywordPattern = `\\b(${keywordsSorted.join('|')})\\b`;
      const abbreviationPattern = "\\{[^{}]+\\}";
      const combinedPattern = `(${keywordPattern})|(${abbreviationPattern})`;
      const regex = new RegExp(combinedPattern, "gi");

      const processLine = (
        line: string,
        lineIndex: number
      ) => {
        let lastIndex = 0;
        const parts: Array<React.ReactNode> = [];

        line.replace(regex, (match, ...args) => {
          const offset = args[args.length - 2];
          const textBeforeMatch = line
            .substring(lastIndex, offset)
            .replace(/~/g, cardName);
          parts.push(
            ...splitAndProcessText(
              textBeforeMatch, 
              lineIndex, 
              lastIndex
            )
          );
    
          const lowerMatch = match.toLowerCase();
          if (Keywords[lowerMatch]) {
            const keyword = Keywords[lowerMatch];
            parts.push(
              <Keyword
                key={`${lineIndex}-${offset}`}
                effect=""
                keyword={keyword}
              />
            );
          } else {
            const abbreviation = match;
            const IconComponent = abbreviationIcons[
              abbreviation as keyof typeof abbreviationIcons
            ];
            if (IconComponent) {
              parts.push(
                <Tooltip
                  title={IconComponent.name}
                  key={`${lineIndex}-${offset}`}
                >
                  <Image
                    src={IconComponent.src}
                    alt={`${abbreviation} icon`}
                    width={inlineIconSize}
                    height={inlineIconSize}
                    unoptimized={true}
                    style={{
                      display: "inline-block",
                      flexShrink: 0,
                      margin: "0 2px",
                    }}
                  />
                </Tooltip>
              );
            }
          }
    
          lastIndex = offset + match.length;
          return match;
        });

        const remainingText = line
          .substring(lastIndex)
          .replace(/~/g, cardName);
        parts.push(
          ...splitAndProcessText(
            remainingText, 
            lineIndex, 
            lastIndex
          )
        );

        return parts;
      };

      const splitAndProcessText = (
        text: string, lineIndex: number, partIndex: number
      ) => {
        const textParts = [];
        let buffer = '';
        let isItalic = false;

        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          if (char === '(') {
            if (buffer.length > 0) {
              textParts.push(<span key={`${lineIndex}-${partIndex}-text-${textParts.length}`}>{buffer}</span>);
              buffer = '';
            }
            isItalic = true;
            buffer += char;
          } else if (char === ')' && isItalic) {
            buffer += char;
            textParts.push(
              <span
                key={`${lineIndex}-${partIndex}-italic-${textParts.length}`}
                className="italic font-light"
              >
                {buffer}
              </span>
            );
            buffer = '';
            isItalic = false;
          } else {
            buffer += char;
          }
        }

        if (buffer.length > 0) {
          const key = isItalic ? 'italic' : 'text';
          const Component = isItalic ? 'em' : 'span';
          textParts.push(
            <Component
              key={`${lineIndex}-${partIndex}-${key}-${textParts.length}`}
              className={isItalic ? "italic font-light" : ""}
            >
              {buffer}
            </Component>);
        }

        return textParts;
      };
      
      return text
        .split('\n')
        .map((line, index) => (
          <Typography
            key={index}
            variant="body1"
            component="div"
            gutterBottom
            className="
              inline-block
              text-wrap
              whitespace-normal
              overflow-x-visible
              break-words
            "
            sx={{
              fontSize: fontSize,
              lineHeight: lineHeight,
            }}
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

      const splitAndCapitalize = (word: string) => 
        splitCamelCase(word)
          .split(' ')
          .map(capitalizeWord)
          .join(' ');

      if (cardData?.cardType) {
        const cardType = Array.isArray(cardData.cardType) ? 
          cardData.cardType : 
          [cardData.cardType];
        cardTypeText = cardType
          .map(splitAndCapitalize)
          .join(" ");
      }

      if (cardData?.cardSubType && cardData.cardSubType.length > 0) {
        cardSubTypeText = cardData.cardSubType
          .map(splitAndCapitalize)
          .join(" ");
      }

      return cardSubTypeText ? `${cardTypeText} • ${cardSubTypeText}` : cardTypeText;
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

    // Set card text properties
    useEffect(() => {
      function calculateCardTextSize(
        textLength: number
      ) {
        if (textLength <= 88) {
          // Extra Large
          setFontSize("16.5px");
          setLineHeight("19px");
          setInlineIconSize(20);
        } else if (textLength <= 264) {
          // Medium
          setFontSize("15px");
          setLineHeight("17px");
          setInlineIconSize(18);
        } else {
          // Extra Small
          setFontSize("13.5px");
          setLineHeight("15.5px");
          setInlineIconSize(16);
        }
      };
      if (cardData?.cardText) {
        calculateCardTextSize(
          cardData.cardText.length
        );
      }
    }, [cardData?.cardText]);

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
      if (cardMode === "initial") {
        return (
          <Box
            id="initial-mode-render-container"
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
              id="initial-mode-card-frame"
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
                id="initial-mode-card-header"
                sx={{
                  maxHeight: "56px",
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
                  id="initial-mode-card-header-mythic-name-cost"
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
                    id="initial-mode-card-header-mythic-name"
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
                    id="initial-mode-card-energy-cost"
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
                      .sort((
                        [energyA], 
                        [energyB]
                      ) => {
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
                              length: typeof value === "number" ? value : 0,
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
                          : typeof value === "number" && value > 0
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
                  id="initial-mode-card-header-types-speed"
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
                    gap-1
                    text-black
                  `}
                >
                  {/* Card range */}
                  {cardData?.cardType !== undefined && (
                    cardData?.cardType.includes("entity") || 
                    cardData?.cardType.includes("outpost")
                  ) && (
                      <Box>
                          {cardData?.cardUnitType === "melee" ? (
                        <Image
                          src={RangeMelee}
                          height={15}
                          width={15}
                          alt="Melee icon"
                        />
                      ) : (
                        <Image
                          src={RangeRanged}
                          height={15}
                          width={15}
                          alt="Ranged icon"
                        />
                      )}
                    </Box>
                  )}
                  {/* Card types */}
                  <Box
                    id="initial-mode-card-header-types"
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
                id="initial-mode-card-image-content-outer"
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
                  id="initial-mode-card-image-content-inner"
                  sx={{
                    height: "462px !important",
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
                    id="initial-mode-card-image"
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
                      src={
                        cardData.cardArt || 
                        "/images/card-parts/card-art/default-art.jpg"
                      }
                      fill={true}
                      sizes="100%"
                      alt={`${cardData.cardName} card art`}
                      style={{
                        objectFit: "cover"
                      }}
                    />
                  </Box>
                  {/* Card text and lore text */}
                  <Box
                    id="initial-mode-card-text-lore"
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
                    {
                      cardData.cardText && 
                      cardData.cardName ? 
                        renderTextWithKeywords(
                          cardData.cardText, 
                          cardData.cardName
                        )
                      : null
                    } 
                    {/* Lore text */}
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
                          id="initial-mode-lore-text"
                          variant="body2"
                          className="italic font-light"
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
                id="initial-mode-card-stats-grade-creator-info"
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
                cardData.cardType && (
                  cardData.cardType
                    .toLowerCase()
                    .includes("outpost") ||
                  cardData.cardType
                    .toLowerCase()
                    .includes("entity")
                ) && (
                    <Box
                      id="initial-mode-stats-attack"
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
                  id="initial-mode-stats-grade-info"
                  className={clsx("flex flex-col justify-center items-center",
                    cardData.cardType && 
                    !cardData.cardType
                      .toLowerCase()
                      .includes("outpost") && 
                    !cardData.cardType
                      .toLowerCase()
                      .includes("entity") ? 
                    "w-full" : "w-3/5"
                  )}
                >
                  {/* Card grade */}
                  <Box
                    id="initial-mode-stats-grade"
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
                  cardData.cardType && (
                    cardData.cardType
                      .toLowerCase()
                      .includes("outpost") ||
                    cardData.cardType
                      .toLowerCase()
                      .includes("entity")
                  ) && (
                      <Box
                        id="initial-mode-stats-defense"
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
              {/* Card creator */}
              <Box
                className={clsx("flex flex-row justify-between items-center w-full text-xs -mt-1 px-16",
                  {
                    "-mt-2": 
                      cardData.cardType && 
                      !cardData.cardType
                        .includes("entity") || 
                      cardData.cardType && 
                      !cardData.cardType
                        .includes("outpost"),
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
              </Box>
            </Box>
          </Box>
        )
      }

      // ANOMALY MODE
      if (cardMode === "anomaly") {
        return (
          <Box
            id="anomaly-mode-render-container"
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
              id="anomaly-mode-card-frame"
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
                bg-[url('/images/card-parts/card-frames/other/anomaly.jpg')]
              `}
            >
              {/* Card header */}
              <Box
                id="anomaly-mode-card-header"
                sx={{
                  maxHeight: "56px",
                  padding: "3px",
                  border: "4px solid black",
                }}
                className={`
                  bg-neutral-50
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
                  id="anomaly-mode-card-header-mythic-name-cost"
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
                    id="anomaly-mode-card-header-mythic-name"
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
                    {cardData?.cardSuperType === "mythic" && (
                      <Image
                        src={Mythic}
                        height={14}
                        width={14}
                        alt="Mythic icon"
                      />
                    )}
                    {/* Card name */}
                    {cardData.cardAnomalyMode && cardData.cardAnomalyMode.toLowerCase().includes("uncommon") ? (
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
                          (cardData?.cardAnomalyModeName ?? '')
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
                    ) : (
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: "black",
                          fontWeight: 500,
                          fontSize: "15px",
                          lineHeight: "20px"
                        }}
                      >
                        Common Anomaly
                      </Typography>
                    )}
                  </Box> 
                </Box>
      
                {/* Card types and speed */}
                <Box
                  id="anomaly-mode-card-header-types-speed"
                  sx={{
                    height: "20px",
                    borderRadius: "3px",
                    padding: "1px 2px"
                  }}
                  className="
                    bg-neutral-200
                    flex
                    flex-row
                    justify-between
                    items-center
                    w-full
                    gap-1
                    text-black
                  "
                >
                  {/* Card type */}
                  <Box
                    id="anomaly-mode-card-header-types"
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
                    {cardData.cardAnomalyMode && cardData.cardAnomalyMode.toLowerCase().includes("uncommon") ? (
                      <Typography
                        variant="subtitle2" 
                        component="span" 
                        className="
                          p-0 
                          m-0
                        "
                      >
                        Uncommon Anomaly
                      </Typography>
                    ) : (
                      <Typography
                        variant="subtitle2" 
                        component="span" 
                        className="
                          p-0 
                          m-0
                        "
                      >
                        Common Anomaly
                      </Typography>
                    )}
                  </Box>
                  
                </Box>
              </Box>
              {/* Card image & content */}
              <Box
                id="anomaly-mode-card-image-content-outer"
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
                  id="anomaly-mode-card-image-content-inner"
                  sx={{
                    height: "462px !important",
                    padding: "3px",
                    border: "3.75px solid black",
                    borderBottomLeftRadius: "8px",
                    borderBottomRightRadius: "8px",
                  }}
                  className="
                  bg-neutral-400
                    flex
                    flex-col
                    w-full
                    gap-2
                    shadow-md
                    shadow-black/50
                  "
                >
                  {/* Card image */}
                  <Box
                    id="anomaly-mode-card-image"
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
                      src="/images/card-parts/card-art/default-anomaly-art.webp"
                      fill={true}
                      sizes="100%"
                      alt={`${cardData.cardAnomalyModeName} card art`}
                      style={{
                        objectFit: "cover"
                      }}
                    />
                  </Box>
                  {/* Card text and lore text */}
                  <Box
                    id="anomaly-mode-card-text-lore"
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
                    {/* ANOMALY: Card text */}
                    {
                      cardData.cardAnomalyModeText && 
                      cardData.cardAnomalyModeText !== "" && 
                      cardData.cardAnomalyModeName ? 
                        renderTextWithKeywords(
                          cardData.cardAnomalyModeText, 
                          cardData.cardAnomalyModeName
                        )
                      : null
                    }
                    {cardData.cardAnomalyModeText === "" && (
                      <Typography
                        variant="body1"
                        component="div"
                        gutterBottom
                        className="px-6 py-10 text-center"
                      >
                        When you manifest this, pick a Common Anomaly. 
                        This card becomes that Common Anomaly.
                      </Typography>
                    )} 
                    {/* ANOMALY: Lore text */}
                    {cardData.cardAnomalyModeLoreText !== "" &&
                    cardData.cardAnomalyMode === "uncommon" && (
                      <>
                        <Divider
                          className="
                            mx-4
                            my-0.5
                            opacity-25
                          "
                        />
                        <Typography
                          id="anomaly-mode-lore-text"
                          className="italic font-light"
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
                id="anomaly-mode-card-stats-grade-creator-info"
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
                {/* Card grade + info */}
                <Box
                  id="anomaly-mode-stats-grade-info"
                  className="flex flex-col justify-center items-center w-full mb-1"
                >
                  {/* Card grade */}
                  <Box
                    id="anomaly-mode-stats-grade"
                    className="
                      flex
                      flex-col
                      justify-center
                      items-center
                      w-full
                    "
                  >
                    {/* TODO: Separate card grade for anomaly */}
                    {/* TODO: Core for Common Anomalies */}
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
              </Box>
              {/* Card creator */}
              {cardData.cardAnomalyMode === "uncommon" && (
                <Box
                  className="flex flex-row justify-between items-center w-full text-xs px-16"
                >
                  <p
                    className="fineprint-text"
                  >
                    {cardData.cardCreator
                      ? `Made by ${cardData.cardCreator}`
                      : "Card Creator"}
                  </p>
                </Box>
              )}
            </Box>
          </Box>
        )
      }
  }
};

export default React.memo(CardRender);