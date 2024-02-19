"use client";

import React from "react";
import {
  Box, Typography
} from "@mui/material"
import RulesSection from "@/app/components/rules/RulesSection";
import RuleItem from "@/app/components/rules/RuleItem";
import Image from "next/image";

export default function Rules() {
    return (
      <Box
        className="
          flex
          flex-col
          justify-start
          items-start
          w-full
          p-12
          gap-8
        "
      >
        <Typography
          variant="h3"
          className="
            title-white
            font-medium
          "
        >
          Nexus game rules
        </Typography>

        {/* Colors */}
        <RulesSection
          title="Colors"
        >
          In Nexus, cards typically have one or more Colors. Cards with no Color are called Void.
          There are five Colors with different characteristics and themes:
          <Box
            className="
              flex
              flex-col
              justify-start
              items-start
              w-full
              gap-2
            "
          >
            <RuleItem
              title="Yellow"
            >
              <Box
                className="
                  p-2
                  bg-yellow-500/10
                  text-yellow-400
                  rounded-sm
                  mb-1
                "
              >
                The Color of order, loyalty, and devotion. 
                Well-trained troops of synchronized entities attack with deadly precision.
              </Box>
            </RuleItem>
            <RuleItem
              title="Blue"
            >
              <Box
                className="
                  p-2
                  bg-sky-500/10
                  text-sky-300
                  rounded-sm
                  mb-1
                "
              >
                The Color of deception, wisdom, and technology. 
                Scheme to control the fate of your opponents in each battle before it even begins.
              </Box>
            </RuleItem>
            <RuleItem
              title="Purple"
            >
              <Box
                className="
                  p-2
                  text-violet-300
                  bg-violet-500/10
                  rounded-sm
                  mb-1
                "
              >
                The Color of death, the unknown, and mercilessness. 
                Use any means at your disposal to defeat your enemy, even at great cost to you.
              </Box>
            </RuleItem>
            <RuleItem
              title="Red"
            >
              <Box
                className="
                  p-2
                  text-red-300
                  bg-red-500/10
                  rounded-sm
                  mb-1
                "
              >
                The Color of intensity, destruction, and fanaticism. 
                Channel your rage to lay waste to your opponents with devastating attacks.
              </Box>
            </RuleItem>
            <RuleItem
              title="Green"
            >
              <Box
                className="
                  p-2
                  text-lime-400
                  bg-lime-500/10
                  rounded-sm
                  mb-1
                "
              >
                The Color of biology, growth, and ruthlessness. 
                Command nature across the universe to smash the opposition.
              </Box>
                
            </RuleItem>
          </Box>
        </RulesSection>

        {/* Energy */}
        <RulesSection
          title="Energy"
        >
          In Nexus, you need Energy to progress. Energy is used to pay the Cost of Actions.
          Energy comes in each of the five Colors: Yellow, Blue, Purple, Red, and Green.
          There is also Void Energy. It has no Color, and can be paid for by any Color of Energy.
          <Box
            className="
              flex
              flex-col
              justify-start
              items-start
              w-full
              gap-2
            "
          >
            <RuleItem
              title="Energy Cost"
            >
                The Color of Nexus cards is determined by the Energy symbols in its Cost. The Energy symbols are:
                <Box
                  className="
                    flex
                    flex-col
                    justify-start
                    items-start
                    w-full
                    gap-2
                    mt-2
                  "
                >
                  <Box
                    className="
                      flex
                      flex-row
                      justify-start
                      items-center
                      w-full
                      gap-2
                      p-2
                      bg-yellow-500/25
                      rounded-sm
                    "
                  >
                    <Image
                      src="/images/card-parts/card-icons/card-cost/yellow.png"
                      width={24}
                      height={24}
                      alt="Yellow Energy icon"
                    />
                    <Typography
                      variant="body1"
                      className="
                        title-white
                        font-medium
                      "
                    >
                      for Yellow
                    </Typography>
                  </Box>
                  <Box
                    className="
                      flex
                      flex-row
                      justify-start
                      items-center
                      w-full
                      gap-2
                      p-2
                      bg-sky-500/25
                      rounded-sm
                    "
                  >
                    <Image
                      src="/images/card-parts/card-icons/card-cost/blue.png"
                      width={24}
                      height={24}
                      alt="Blue Energy icon"
                    />
                    <Typography
                      variant="body1"
                      className="
                        title-white
                        font-medium
                      "
                    >
                      for Blue
                    </Typography>
                  </Box>
                  <Box
                    className="
                      flex
                      flex-row
                      justify-start
                      items-center
                      w-full
                      gap-2
                      p-2
                      bg-violet-500/25
                      rounded-sm
                    "
                  >
                    <Image
                      src="/images/card-parts/card-icons/card-cost/purple.png"
                      width={24}
                      height={24}
                      alt="Purple Energy icon"
                    />
                    <Typography
                      variant="body1"
                      className="
                        title-white
                        font-medium
                      "
                    >
                      for Purple
                    </Typography>
                  </Box>
                  <Box
                    className="
                      flex
                      flex-row
                      justify-start
                      items-center
                      w-full
                      gap-2
                      p-2
                      bg-red-500/25
                      rounded-sm
                    "
                  >
                    <Image
                      src="/images/card-parts/card-icons/card-cost/red.png"
                      width={24}
                      height={24}
                      alt="Red Energy icon"
                    />
                    <Typography
                      variant="body1"
                      className="
                        title-white
                        font-medium
                      "
                    >
                      for Red
                    </Typography>
                  </Box>
                  <Box
                    className="
                      flex
                      flex-row
                      justify-start
                      items-center
                      w-full
                      gap-2
                      p-2
                      bg-lime-500/25
                      rounded-sm
                    "
                  >
                    <Image
                      src="/images/card-parts/card-icons/card-cost/green.png"
                      width={24}
                      height={24}
                      alt="Green Energy icon"
                    />
                    <Typography
                      variant="body1"
                      className="
                        title-white
                        font-medium
                      "
                    >
                      for Green
                    </Typography>
                  </Box>
                  <Box
                    className="
                      flex
                      flex-row
                      justify-start
                      items-center
                      w-full
                      gap-2
                      p-2
                      bg-slate-500/25
                      rounded-sm
                    "
                  >
                    <Image
                      src="/images/card-parts/card-icons/card-cost/void-0.png"
                      width={24}
                      height={24}
                      alt="Void Energy icon"
                    />
                    <Typography
                      variant="body1"
                      className="
                        title-white
                        font-medium
                      "
                    >
                      for Void
                    </Typography>
                  </Box>
                </Box>
            </RuleItem>
            <RuleItem
              title="Variable Energy Cost"
            >
              <Typography
                variant="body1"
                className="
                  title-white
                  font-medium
                "
              >
                When any Energy can be used to pay a Cost, it&apos;s considered a Variable Energy Cost.
                You&apos;ll see a number like 2 or an X. 
                X means the Cost is determined by the player, and it can be any number between zero and 15. 
                Variable Energy Costs are Void, and can therefore be paid for with any Color of Energy.
              </Typography>
            </RuleItem>
          </Box>
        </RulesSection>
      </Box>
    );
}