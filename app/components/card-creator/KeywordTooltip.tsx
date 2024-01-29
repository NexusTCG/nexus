import React from "react";
import { Tooltip, Typography, Zoom } from "@mui/material";
import keywordsData from "@/app/utils/data/json/keywords.json";

type KeywordDetails = {
  type: string;
  description: string;
};

const keywords: { [key: string]: KeywordDetails } = keywordsData;

type KeywordTooltipProps = {
  keyword: string;
};

export default function KeywordTooltip({ keyword }: KeywordTooltipProps) {
  const keywordDetail = keywords[keyword];

  if (!keywordDetail) return null;

  const getColor = (type: string) => {
    switch (type) {
      case "triggered":
        return "text-rose-300";
      case "passive":
        return "text-blue-300";
      case "activated":
        return "text-orange-300";
      default:
        return "text-gray-300";
    }
  };

  return (
    <Tooltip
      title={
        <>
          <Typography variant="subtitle1" className="text-white font-semibold">
            {keyword.toUpperCase()}
          </Typography>
          <Typography
            variant="subtitle2"
            className={`
                            font-medium
                            text-sm
                            ${getColor(keywordDetail.type)}
                    `}
          >
            {
              keywordDetail.type
                // .toLowerCase()
                // .charAt(0)
                .toUpperCase()
              // + keywordDetail.type.slice(1)
            }
          </Typography>
          <Typography variant="body2" className="text-white text-sm">
            {keywordDetail.description}
          </Typography>
        </>
      }
      TransitionComponent={Zoom}
      leaveDelay={200}
      placement="top"
      arrow
    >
      <Typography
        variant="subtitle1"
        className={`
                    ${getColor(keywordDetail.type)}
                    font-medium
                    hover:cursor-pointer`}
      >
        {keyword}
      </Typography>
    </Tooltip>
  );
}
