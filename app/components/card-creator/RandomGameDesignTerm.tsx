"use client";

import React, { 
  useState, 
  useEffect 
} from "react";
// Types
import { 
  GameGlossaryType,
  GameKeywordType,
} from "@/app/utils/types/types";
// Data
import { gameGlossary } from "@/app/utils/data/gameGlossary";
import { gameKeywords } from "@/app/utils/data/gameKeywords";
// Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
// Icons
import MenuBook from "@mui/icons-material/MenuBook";
import VpnKey from "@mui/icons-material/VpnKey";
import OpenInNew from "@mui/icons-material/OpenInNew";

type RandomGameDesignTermProps = {
  type: "term" | "keyword" | null;
};

export default function RandomGameDesignTerm({
  type,
}: RandomGameDesignTermProps) {
  const [randomGlossaryTerm, setRandomGlossaryTerm] = useState<GameGlossaryType | null>(null);
  const [randomKeyword, setRandomKeyword] = useState<GameKeywordType | null>(null);

  // Set random glossary term and keyword
  useEffect(() => {
    if (type === "term" && randomGlossaryTerm === null) {
      const randomIndex = Math.floor(
        Math.random() * gameGlossary.length
      );
      setRandomGlossaryTerm(gameGlossary[randomIndex]);
    }
    if (type === "keyword" && randomKeyword === null) {
      const randomIndex = Math.floor(
        Math.random() * gameKeywords.length
      );
      setRandomKeyword(gameKeywords[randomIndex]);
    }
  }, [
    type, 
    randomGlossaryTerm, 
    gameGlossary,
    randomKeyword, 
    gameKeywords,
  ]);

  if (
    type === "term" && randomGlossaryTerm
  ) {
    return (
      <Box
        id="random-glossary-term-container"
        className="
          flex
          flex-row
          justify-start
          items-start
          w-full
          rounded-md
          py-3
          px-4
          gap-4
          bg-sky-800/50
          hover:bg-sky-800/80
          border
          border-sky-700/50
          hover:border-sky-700/80
          hover:text-white
          hover:shadow-lg
          hover:shadow-sky-600/20
          transition-all
        "
      >
        <MenuBook
          fontSize="small"
          sx={{ 
            width: "36px", 
            height: "36px"
          }}
          className="
            bg-sky-600
            text-sky-100
            rounded-full
            p-2
          "
        />
        <Box
          id="random-glossary-term-content"
          className="
            flex
            flex-col
            w-full
          "
        >
          <Box
            id="random-glossary-term-header"
            className="
              flex
              flex-row
              justify-between
              items-center
              w-full
              mb-1
            "
          >
            <Typography
              variant="caption"
              sx={{ fontSize: "0.625rem" }}
              className="text-sky-300"
            >
              RANDOM TERM
            </Typography>
            <Tooltip title="View the game glossary on GitHub.">
              <a
                href="https://github.com/NexusTCG/wiki/wiki/Glossary"
                target="_blank"
                rel="noreferrer"
              >
                <Typography
                  variant="caption"
                  sx={{ fontSize: "0.625rem" }}
                  className="
                    flex
                    flex-row
                    justify-end
                    items-center
                    text-sky-300
                    hover:text-sky-400
                    hover:cursor-pointer
                  "
                >
                  Glossary
                  <OpenInNew
                    fontSize="small"
                    sx={{ fontSize: "1rem" }}
                    className="
                      ml-1
                      opacity-80
                    "
                  />
                </Typography>
              </a>
            </Tooltip>
          </Box>
          <Typography
            variant="subtitle2"
            className="
              flex
              flex-col
              w-full
              font-semibold
            "
          >
            {randomGlossaryTerm?.term}
            <Typography
              variant="caption"
              className="
                w-full
                text-xs
                text-neutral-300
              "
            >
              {randomGlossaryTerm?.definition}
            </Typography>
          </Typography>
        </Box>
      </Box>
    )
  } else if (
    type === "keyword" && randomKeyword
  ) {
    return (
      <Box
        id="random-keyword-container"
        className="
          flex
          flex-row
          justify-start
          items-start
          w-full
          rounded-md
          py-3
          px-4
          gap-4
          bg-violet-800/50
          hover:bg-violet-800/80
          border
          border-violet-700/50
          hover:border-violet-700/80
          hover:text-white
          hover:shadow-lg
          hover:shadow-violet-600/20
          transition-all
        "
      >
        <VpnKey
          fontSize="small"
          sx={{ 
            width: "36px", 
            height: "36px"
          }}
          className="
            bg-violet-600
            text-violet-100
            rounded-full
            p-2
          "
        />
        <Box
          id="random-keyword-content"
          className="
            flex
            flex-col
            w-full
          "
        >
          <Box
            id="random-glossary-term-header"
            className="
              flex
              flex-row
              justify-between
              items-center
              w-full
              mb-1
            "
          >
            <Typography
              variant="caption"
              sx={{ fontSize: "0.625rem" }}
              className="text-violet-300"
            >
              RANDOM KEYWORD
            </Typography>
            <Tooltip title="View all keywords on GitHub.">
              <a
                href="https://github.com/NexusTCG/wiki/wiki/Keywords"
                target="_blank"
                rel="noreferrer"
              >
                <Typography
                  variant="caption"
                  sx={{ fontSize: "0.625rem" }}
                  className="
                    flex
                    flex-row
                    justify-end
                    items-center
                    text-violet-300
                    hover:text-violet-400
                    hover:cursor-pointer
                  "
                >
                  Keywords
                  <OpenInNew
                    fontSize="small"
                    sx={{ fontSize: "1rem" }}
                    className="
                      ml-1
                      opacity-80
                    "
                  />
                </Typography>
              </a>
            </Tooltip>
          </Box>
          <Typography
            variant="subtitle2"
            className="
              flex
              flex-col
              w-full
              font-semibold
            "
          >
            {randomKeyword.keyword}
            <Typography
              variant="caption"
              className="
                w-full
                text-xs
                text-neutral-300
              "
            >
              {randomKeyword.definition}
            </Typography>
          </Typography>
        </Box>
      </Box>
    )
  } else {
    return null;
  };
};