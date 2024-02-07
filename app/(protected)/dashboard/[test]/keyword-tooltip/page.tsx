import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import KeywordTooltip from "@/app/components/card-creator/KeywordTooltip";
import keywordsData from "@/app/utils/data/json/keywords.json";

export default function TestPage() {
  return (
    <Box
      className="
        flex
        flex-col
        gap-4
        justify-start
        items-center
      "
    >
      {Object.keys(keywordsData).map((key) => (
        <Card
          key={key}
          className="
            w-full
            rounded-md
            px-2
            py-1
          "
        >
          <CardContent
            className="
              flex
              flex-col
              gap-2
            "
          >
            <Typography component="span" variant="body1">
              <KeywordTooltip keyword={key} />
            </Typography>
            <Typography variant="body2" className="text-gray-300">
              {keywordsData[key as keyof typeof keywordsData].description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
