import React from "react";
import RulesSection from "@/app/components/rules/RulesSection";
import RuleItem from "@/app/components/rules/RuleItem";
import SpecialText from "@/app/components/rules/SpecialText";
import Image from "next/image";
import {
  Box,
  Typography,
  List,
  ListItem,
} from "@mui/material"

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
            {/* Variable Energy Cost */}
            <RuleItem
              title="Variable Energy Cost"
            >
              <Typography
                variant="body1"
                className="
                  font-medium
                "
              >
                When any <SpecialText color="teal" style="semibold">Energy</SpecialText>. can be used to pay a Cost, {" "}
                it&apos;s considered a <SpecialText color="teal" style="semibold">Variable Energy Cost</SpecialText>.
                You&apos;ll see a number like <SpecialText color="teal" style="semibold">2</SpecialText> {" "}
                or an <SpecialText color="teal" style="semibold">X</SpecialText>. {" "}
                <SpecialText color="teal" style="semibold">X</SpecialText> means the Cost is determined {""}
                by the player, and it can be any number between zero and 15. 
                <SpecialText color="teal" style="semibold">Variable Energy Costs</SpecialText>. {" "}
                are <SpecialText color="teal" style="semibold">Void</SpecialText>, and can therefore be paid for with any {" "}
                <SpecialText color="teal" style="semibold">Color</SpecialText> of {" "}
                <SpecialText color="teal" style="semibold">Energy</SpecialText>.
              </Typography>
            </RuleItem>
            {/* Energy Value */}
            <RuleItem
              title="Energy Value"
            >
              <Typography
                variant="body1"
                className="
                  font-medium
                  text-wrap
                "
              >
                The <SpecialText color="teal" style="semibold">Energy</SpecialText> value of a card is the {" "}
                <SpecialText color="teal" style="semibold">Total Energy Cost</SpecialText> needed to pay for it.
                The <SpecialText color="teal" style="semibold">Base Energy</SpecialText> value of a card is the {" "}
                <SpecialText color="teal" style="semibold">Energy</SpecialText> value it has from the start.
              </Typography>
            </RuleItem>
            {/* Example: Energy Value */}
            <RuleItem
              title="Example"
            >
              <List>
                  <ListItem>
                    <Typography
                      variant="body2"
                      className="
                        font-medium
                        text-wrap
                      "
                    >
                      {"—"} A card <SpecialText color="teal" style="semibold">Costs</SpecialText> 2 void {""}
                      <SpecialText color="teal" style="semibold">Energy</SpecialText>, 1 {" "}
                      <SpecialText color="teal" style="semibold">Yellow Energy</SpecialText>, and 1 {" "}
                      <SpecialText color="teal" style="semibold">Red Energy</SpecialText>.
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography
                      variant="body2"
                      className="
                        font-medium
                        text-wrap
                      "
                    >
                      {"—"} Its <SpecialText color="teal" style="semibold">Colors</SpecialText> are {""}
                      <SpecialText color="teal" style="semibold">Yellow</SpecialText> and {" "}
                      <SpecialText color="teal" style="semibold">Red</SpecialText>.
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography
                      variant="body2"
                      className="
                        font-medium
                        text-wrap
                      "
                    >
                      {"—"} Its total <SpecialText color="teal" style="semibold">Energy</SpecialText> value is 4.
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography
                      variant="body2"
                      className="
                        font-medium
                        text-wrap
                      "
                    >
                      {"—"} It must be paid for with at least 1 <SpecialText color="teal" style="semibold">Yellow</SpecialText>, {" "}
                      and 1 <SpecialText color="teal" style="semibold">Red Energy</SpecialText>.
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography
                      variant="body2"
                      className="
                        font-medium
                        text-wrap
                      "
                    >
                      {"—"} The 2 <SpecialText color="teal" style="semibold">Void Energy</SpecialText> can be paid for {" "}
                      with any combination of <SpecialText color="teal" style="semibold">Energy</SpecialText>.
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography
                      variant="body2"
                      className="
                        font-medium
                        text-wrap
                      "
                    >
                      {"—"} It could be paid for with 1 <SpecialText color="teal" style="semibold">Yellow</SpecialText>, {" "}
                      1 <SpecialText color="teal" style="semibold">Red</SpecialText>, {""}
                      1 <SpecialText color="teal" style="semibold">Blue</SpecialText>, and {""}
                      1 <SpecialText color="teal" style="semibold">Green Energy</SpecialText>.
                    </Typography>
                  </ListItem>
                </List>
            </RuleItem>
          </Box>
        </RulesSection>
      </Box>
    );
}