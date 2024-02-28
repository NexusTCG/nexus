import React from "react";
import RulesSection from "@/app/components/rules/RulesSection";
import RuleItem from "@/app/components/rules/RuleItem";
import RuleItemWithImage from "@/app/components/rules/RuleItemWithImage";
import RulesHighlight from "@/app/components/rules/RulesHighlight";
// import RulesKeyword from "@/app/components/rules/RulesKeyword"; // All keywords get styled with text-neutral-500
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
              gap-4
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
                When any <RulesHighlight color="teal" style="semibold">Energy</RulesHighlight>. can be used to pay a Cost, {" "}
                it&apos;s considered a <RulesHighlight color="teal" style="semibold">Variable Energy Cost</RulesHighlight>.
                You&apos;ll see a number like <RulesHighlight color="teal" style="semibold">2</RulesHighlight> {" "}
                or an <RulesHighlight color="teal" style="semibold">X</RulesHighlight>. {" "}
                <RulesHighlight color="teal" style="semibold">X</RulesHighlight> means the Cost is determined {""}
                by the player, and it can be any number between zero and 15. 
                <RulesHighlight color="teal" style="semibold">Variable Energy Costs</RulesHighlight>. {" "}
                are <RulesHighlight color="teal" style="semibold">Void</RulesHighlight>, and can therefore be paid for with any {" "}
                <RulesHighlight color="teal" style="semibold">Color</RulesHighlight> of {" "}
                <RulesHighlight color="teal" style="semibold">Energy</RulesHighlight>.
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
                The <RulesHighlight color="teal" style="semibold">Energy</RulesHighlight> value of a card is the {" "}
                <RulesHighlight color="teal" style="semibold">Total Energy Cost</RulesHighlight> needed to pay for it.
                The <RulesHighlight color="teal" style="semibold">Base Energy</RulesHighlight> value of a card is the {" "}
                <RulesHighlight color="teal" style="semibold">Energy</RulesHighlight> value it has from the start.
              </Typography>
              {/* Example: Energy Value */}
              <Box
                className="
                  flex
                  flex-col
                  justify-start
                  items-start
                  w-full
                  gap-2
                  mt-4
                  rounded-md
                  px-2
                  py-1
                  bg-neutral-900
                "
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
                      {"—"} A card <RulesHighlight color="teal" style="semibold">Costs</RulesHighlight> 2 void {""}
                      <RulesHighlight color="teal" style="semibold">Energy</RulesHighlight>, 1 {" "}
                      <RulesHighlight color="teal" style="semibold">Yellow Energy</RulesHighlight>, and 1 {" "}
                      <RulesHighlight color="teal" style="semibold">Red Energy</RulesHighlight>.
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
                      {"—"} Its <RulesHighlight color="teal" style="semibold">Colors</RulesHighlight> are {""}
                      <RulesHighlight color="teal" style="semibold">Yellow</RulesHighlight> and {" "}
                      <RulesHighlight color="teal" style="semibold">Red</RulesHighlight>.
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
                      {"—"} Its total <RulesHighlight color="teal" style="semibold">Energy</RulesHighlight> value is 4.
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
                      {"—"} It must be paid for with at least 1 <RulesHighlight color="teal" style="semibold">Yellow</RulesHighlight>, {" "}
                      and 1 <RulesHighlight color="teal" style="semibold">Red Energy</RulesHighlight>.
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
                      {"—"} The 2 <RulesHighlight color="teal" style="semibold">Void Energy</RulesHighlight> can be paid for {" "}
                      with any combination of <RulesHighlight color="teal" style="semibold">Energy</RulesHighlight>.
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
                      {"—"} It could be paid for with 1 <RulesHighlight color="teal" style="semibold">Yellow</RulesHighlight>, {" "}
                      1 <RulesHighlight color="teal" style="semibold">Red</RulesHighlight>, {""}
                      1 <RulesHighlight color="teal" style="semibold">Blue</RulesHighlight>, and {""}
                      1 <RulesHighlight color="teal" style="semibold">Green Energy</RulesHighlight>.
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
                      {"—"} It would still only be considered a {""}
                      <RulesHighlight color="teal" style="semibold">Yellow</RulesHighlight>, {" "}
                      and 1 <RulesHighlight color="teal" style="semibold">Red Energy</RulesHighlight>.
                    </Typography>
                  </ListItem>
                </List>
              </Box>
            </RuleItem>
            {/* Energy Store */}
            <RuleItem
              title="Energy Store"
            >
              <Typography
                variant="body1"
                className="
                  font-medium
                "
              >
                When any <RulesHighlight color="teal" style="semibold">Energy</RulesHighlight>. can be used to pay a Cost, {" "}
                it&apos;s considered a <RulesHighlight color="teal" style="semibold">Variable Energy Cost</RulesHighlight>.
                You&apos;ll see a number like <RulesHighlight color="teal" style="semibold">2</RulesHighlight> {" "}
                or an <RulesHighlight color="teal" style="semibold">X</RulesHighlight>. {" "}
                <RulesHighlight color="teal" style="semibold">X</RulesHighlight> means the Cost is determined {""}
                by the player, and it can be any number between zero and 15. 
                <RulesHighlight color="teal" style="semibold">Variable Energy Costs</RulesHighlight>. {" "}
                are <RulesHighlight color="teal" style="semibold">Void</RulesHighlight>, and can therefore be paid for with any {" "}
                <RulesHighlight color="teal" style="semibold">Color</RulesHighlight> of {" "}
                <RulesHighlight color="teal" style="semibold">Energy</RulesHighlight>.
              </Typography>
            </RuleItem>
            {/* Making Energy */}
            <RuleItem
              title="Making Energy"
            >
              <Typography
                variant="body1"
                className="
                  font-medium
                "
              >
                To add Energy to your Energy store, you must make Energy.
                Energy is made by certain abilities, effects, and card types.
                Cards that can make Energy must be Locked to do so. 
                More on how Locking works later.
                Making energy always has speed 3.

                Typically Nodes make Energy, but some Entities, 
                Objects, and Events also make Energy.
                If a card can make Energy, it will be stated in 
                their card text like: <em>Make Y Energy.</em>
              </Typography>
            </RuleItem>
          </Box>
        </RulesSection>
        {/* Nodes */}
        <RulesSection
          title="Nodes"
        >
          {/* Update description */}
          In Nexus, Nodes are phenomena that appear across the universe. 
          They distort the simulation, creating pockets of immense Energy that leak out of them. 
          Energy which players harness. Nodes don&apos;t have a Speed, and can only be played 
          in any of your Primary Phases. Nodes is the only card type that can NOT be responded to.
          Some Nodes do more than make Energy. Some Nodes make Void Energy.
          But Common Nodes only make Energy. And only of a specific Color.
          There are five Common Nodes, one for each Color:
          {/* Common Nodes */}
          <Box
            className="
              flex
              flex-col
              justify-start
              items-start
              w-full
              gap-4
            "
          >
            {/* Common Node - Yellow */}
            <RuleItemWithImage
              title="Common Node – Yellow"
              imageUrl="/images/cards/common-node-yellow.png"
              imageWidth={300}
              imageHeight={420}
              imageSide="left"
            >
              <Typography
                variant="body1"
                className="
                  font-medium
                "
              >
                Makes Yellow Energy.
                Light&apos;s appear in meadows, open fields, and sunny places.
              </Typography>
            </RuleItemWithImage>
            {/* Common Node - Blue */}
            <RuleItemWithImage
              title="Common Node – Blue"
              imageUrl="/images/cards/common-node-blue.png"
              imageWidth={300}
              imageHeight={420}
              imageSide="right"
            >
              <Typography
                variant="body1"
                className="
                  font-medium
                "
              >
                Common Node - Vortex: Makes Blue Energy.
                Vortex&apos;s appear in water, lightning storms, and windy places.
              </Typography>
            </RuleItemWithImage>
            {/* Common Node - Purple */}
            <RuleItemWithImage
              title="Common Node – Purple"
              imageUrl="/images/cards/common-node-purple.png"
              imageWidth={300}
              imageHeight={420}
              imageSide="left"
            >
              <Typography
                variant="body1"
                className="
                  font-medium
                "
              >
                Common Node - Corruption: Makes Purple Energy.
                Void&apos;s appear in mires, ruins, and shadowy places.
              </Typography>
            </RuleItemWithImage>
            {/* Common Node - Red */}
            <RuleItemWithImage
              title="Common Node – Red"
              imageUrl="/images/cards/common-node-red.png"
              imageWidth={300}
              imageHeight={420}
              imageSide="right"
            >
              <Typography
                variant="body1"
                className="
                  font-medium
                "
              >
                Common Node - Inferno: Makes Red Energy.
                Inferno&apos;s appear in volcanos, hot springs, and tectonic places.
              </Typography>
            </RuleItemWithImage>
            {/* Common Node - Green */}
            <RuleItemWithImage
              title="Common Node – Green"
              imageUrl="/images/cards/common-node-green.png"
              imageWidth={300}
              imageHeight={420}
              imageSide="left"
            >
              <Typography
                variant="body1"
                className="
                  font-medium
                "
              >
                Common Node - Shimmer: Makes Green Energy.
                Bloom&apos;s appear in glades, streams, and verdant places.
              </Typography>
            </RuleItemWithImage>
          </Box>
          Players can only play Nodes during their Primary Phase.
          A Deck can have any number of Common Nodes.
        </RulesSection>
        {/* Generating */}
        <RulesSection
          title="Generating"
        >
          Sometimes you don&apos;t Draw the Nodes you need to make enough Energy
          or a certain Color of Energy. To mitigate this, each player 
          will automatically Generate up to two Common Nodes each match. 
          Generating means a Common Node of the player&apos;s choice is added to their Hand.
          <RuleItem
            title="Generated Common Nodes are NOT:"
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
                  Part of the player&apos;s Decks.
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
                  Considered Drawn.
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
                  Tokens.
                </Typography>
              </ListItem>
            </List>
          </RuleItem>
          <RuleItem
            title="Generated Common Nodes ARE:"
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
                  The Common Node type of the player&apos;s choice.
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
                  Automatically added to player&apos;s Hands.
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
                  Generated on specific turns.
                </Typography>
              </ListItem>
            </List>
          </RuleItem>
          <RuleItem
            title="Players Generate on:"
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
                  Turn 1.
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
                  Turn 2 if they are NOT the starting player.
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
                  Turn 3 if they ARE the starting player.
                </Typography>
              </ListItem>
            </List>
          </RuleItem>
          <RuleItem
            title="Generation Conditions"
          >
            <Typography
              variant="body2"
              className="
                font-medium
                text-wrap
              "
            >
              Players can only generate a Common Node if their Deck has at least 16 Nodes.
              Generated Common Node options are limited to the Colors of the cards 
              in the player&apos;s Deck.
              Players can pick the same option multiple times.
              Example:
              If a player has a Deck with Yellow, Purple, and Green cards they can only choose between:
              
            </Typography>
            <List>
              <ListItem>
                <Typography
                  variant="body2"
                  className="
                    font-medium
                    text-wrap
                  "
                >
                  Common Node - Yellow
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
                  Common Node - Blue
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
                  Common Node - Green
                </Typography>
              </ListItem>
            </List>
          </RuleItem>
        </RulesSection>
      </Box>
    );
}