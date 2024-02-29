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
              <br/>
              <br/>Example:
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
        {/* Speeds */}
        <RulesSection
          title="Speeds"
        >
          In addition to Costs, Nexus cards (except Nodes) have Speeds.
          A card or Abilities Speed determines when it can be played or activated.
          Activated Abilities also have Speeds. There are three Speed levels:
          <RuleItem
            title="Speed I"
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
                  Can ONLY be played or activated during each player&apos;s own turn.
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
                  Can ONLY be played or activated during the Primary Phase.
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
                  Can NOT be played or activated in response to any Actions.
                </Typography>
              </ListItem>
            </List>
          </RuleItem>
          <RuleItem
            title="Speed II"
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
                  Can ONLY be played or activated during the Primary Phase or Battle Phase.
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
                  Can ONLY be played or activated in response to Speed I and Speed II Actions.
                </Typography>
              </ListItem>
            </List>
          </RuleItem>
          <RuleItem
            title="Speed III"
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
                  Can be played or activated at any time on either player&apos;s turn.
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
                  Can be played or activated in response to Actions of any Speed.
                </Typography>
              </ListItem>
            </List>
          </RuleItem>
        </RulesSection>
        {/* Overclocking */}
        <RulesSection
          title="Overclocking"
        >
          In Nexus some cards, effects, or abilities let players Overclock cards.
          Overclocking a card increases its Speed to the next Speed level.
          Overclocking is Temporary.
          Only cards and abilities with Speed I or Speed II can be Overclocked.
        </RulesSection>
        {/* Locking */}
        <RulesSection
          title="Locking"
        >
          Constants can be Locked to create some outcome.
          Locking means a Constant can&apos;t be used until the player&apos;s next Refresh Step, unless Unlocked.
          Locked cards are Unlocked during each player&apos;s Refresh Step, becoming available to Lock again.
          <br/>
          Nodes are typically Locked to make Energy.
          Entities are typically Locked to attack.
          <br/>
          All Constants can have abilities that require them to be Locked as part of its activation Cost.
          When you need to Lock a Constant, it&apos;s indicated by the Lock symbol. When you can Unlock a {" "}
          Constant outside of the Refresh Step, it&apos;s indicated by the Unlock symbol.
        </RulesSection>
        {/* Overclocking */}
        <RulesSection
          title="Overclocking"
        >
          In Nexus some cards, effects, or abilities let players Overclock cards.
          Overclocking a card increases its Speed to the next Speed level.
          Overclocking is Temporary.
          Only cards and abilities with Speed I or Speed II can be Overclocked.
        </RulesSection>
        {/* Layout */}
        <RulesSection
          title="Locking"
        >
          Nexus cards have different parts that let you know different things about the card.
          The parts of any given card varies a bit. All cards have a Name, Cost, Art, Type, and Grade.
          <RuleItem
            title="Card Name"
          >
            The Name of the card is displayed on the top left of the card.
          </RuleItem>
          <RuleItem
            title="Cost"
          >
            The card&apos;s Energy Cost is displayed as symbols on the top right of the card.
          </RuleItem>
          <RuleItem
            title="Types"
          >
            The card&apos;s Types are displayed on the top left of the card, under the Name.
          </RuleItem>
          <RuleItem
            title="Speed"
          >
            The card&apos;s Speed is displayed as symbols on the top right of the card, under the Cost.
          </RuleItem>
          <RuleItem
            title="Art"
          >
            The Art sits below the Name, Cost, Types, and Speed.
          </RuleItem>
          <RuleItem
            title="Art"
          >
            The Grade is indicated by an icon that sits on the right of the card&apos;s Types.
            The Grade icon has different Colors depending on its Grades:
            <List>
              <ListItem>
                <Typography
                  variant="body2"
                  className="
                    font-medium
                    text-wrap
                  "
                >
                Core (Gray)
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
                  Rare (Blue)
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
                  Epic (Purple)
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
                  Prime (Pink)
                </Typography>
              </ListItem>
            </List>
          </RuleItem>
          <RuleItem
            title="Text"
          >
            The card&apos;s Text explains what the card does. It sits below the Types and Grades.
          </RuleItem>
          <RuleItem
            title="Stats"
          >
            If the card&apos;s Type is an Entity, its stats are displayed at the bottom right.
            The first number is its Attack. The second number is its Defense.
          </RuleItem>
        </RulesSection>
        {/* Layout */}
        <RulesSection
          title="Types"
        >
          All Nexus cards have at least one Type. The card&apos;s Type tells you what happens when you play it.
          All cards except Nodes are considered Functions. Some cards are also considered Constants.
          <RuleItem
            title="Entity"
          >
            If the card&apos;s Type is an Entity, its stats are displayed at the bottom right.
            The first number is its Attack. The second number is its Defense.
            <List>
              <ListItem>
                Entities fight for you during the Battle Phase.
              </ListItem>
              <ListItem>
                An Entity&apos;s Attack determines how much damage it deals in the Battle Phase.
              </ListItem>
              <ListItem>
                An Entity&apos;s Defense determines how much damage it takes to Terminate it.
              </ListItem>
              <ListItem>
                Entities Attack or Defend during the Battle Phase of a turn.
              </ListItem>
              <ListItem>
                On the turn an Entity enters the Battleground it cannot Lock.
              </ListItem>
              <ListItem>
                Unlocked Entities that just entered the Battleground can always:
                <List>
                  <ListItem>
                    Defend.
                  </ListItem>
                  <ListItem>
                    Activate abilities that don&apos;t require Locking.
                  </ListItem>
                </List>
              </ListItem>
              <ListItem>
                Some Entities are also Objects or Effects.
              </ListItem>
              <ListItem>
                Entities typically have Speed I.
              </ListItem>
              <ListItem>
                Entities are Constants.
              </ListItem>
            </List>
          </RuleItem>
          <RuleItem
            title="Event"
          >
            <List>
              <ListItem>
                Events typically introduce immediate changes to the game.
              </ListItem>
              <ListItem>
                When an Event is played and Resolved its effect is carried out immediately.
              </ListItem>
              <ListItem>
                After an Event is resolved it is put in the Cache.
              </ListItem>
            </List>
          </RuleItem>
          <RuleItem
            title="Effect"
          >
            <List>
              <ListItem>
                Effects introduce Ongoing changes to the game.
              </ListItem>
              <ListItem>
                When an Effect leaves the Battleground, its Ongoing change is removed.
              </ListItem>
              <ListItem>
                Some Effects have the Alteration subtype:
                <List>
                  <ListItem>
                    Alterations enter the Battleground attached to another Constant.
                  </ListItem>
                  <ListItem>
                    Alterations apply an Ongoing change to the constant it&apos;s attached to.
                  </ListItem>
                  <ListItem>
                    If the Altered Constant leaves the Battleground the Alteration is Terminated.
                  </ListItem>
                </List>
              </ListItem>
              <ListItem>
                Effects are Constants.
              </ListItem>
            </List>
          </RuleItem>
          <RuleItem
            title="Object"
          >
            <List>
              <ListItem>
                Objects are typically Void.
              </ListItem>
              <ListItem>
                Some Objects are also Entities.
              </ListItem>
              <ListItem>
                Some Objects have the Gear Subtype:
                <List>
                  <ListItem>
                    Gear can be attached to Entities by paying its gear Cost.
                  </ListItem>
                  <ListItem>
                    Gear, like Alterations, applies Ongoing changes to the Constant it&apos;s attached to.
                  </ListItem>
                  <ListItem>
                    But, if an Entity a Gear is attached to leaves the Battleground, the Gear remains.
                  </ListItem>
                </List>
              </ListItem>
              <ListItem>
                Objects are Constants.
              </ListItem>
            </List>
          </RuleItem>
          <RuleItem
            title="Nodes"
          >
            <List>
              <ListItem>
                Nodes can make Energy at any time by being Locked.
              </ListItem>
              <ListItem>
                Nodes can only be played during your Primary Phase.
              </ListItem>
              <ListItem>
                You can only play one Node per turn.
              </ListItem>
              <ListItem>
                Nodes cannot be responded to.
              </ListItem>
              <ListItem>
                Common Nodes make one Energy of their corresponding Color.
              </ListItem>
              <ListItem>
                Nodes other than Beacon, Vortex, Abyss, Inferno, and Shimmer are Uncommon Nodes.
              </ListItem>
              <ListItem>
                Nodes are Constants.
              </ListItem>
            </List>
          </RuleItem>
          <RuleItem
            title="Tokens"
          >
            <List>
              <ListItem>
                Tokens are created by other cards.
              </ListItem>
              <ListItem>
                Tokens are often Entities, but they can be any Constant card type.
              </ListItem>
              <ListItem>
                The Tokens abilities, stats, and so on are determined by the card which created it.
              </ListItem>
              <ListItem>
                The creator of the Token is the owner of it.
              </ListItem>
              <ListItem>
               Tokens are Constants.
              </ListItem>
            </List>
          </RuleItem>
        </RulesSection>
        {/* Layout */}
        <RulesSection
          title="Areas"
        >
          Areas are where cards and their effects exist. Cards often move between Areas in each match.
          <RuleItem
            title="Deck"
          >
            <List>
              <ListItem>
                The Deck is where players Draw cards from.
              </ListItem>
              <ListItem>
                Each player has their own Deck.
              </ListItem>
              <ListItem>
                Cards in your Deck are face-down
              </ListItem>
              <ListItem>
                No player (including you) can look at them.
              </ListItem>
              <ListItem>
                Players can count how many cards are in each player&apos;s Deck at any time.
              </ListItem>
              <ListItem>
                In most game formats, Decks must have 50 cards.
              </ListItem>
              <ListItem>
                Each Deck can have only up to 3 copies of each card (except Common Nodes).
              </ListItem>
              <ListItem>
                Each Deck must be paired with 1 Power.
              </ListItem>
            </List>
          </RuleItem>
          <RuleItem
            title="Hand"
          >
            <List>
              <ListItem>
                The Hand is where cards players can play are kept.
              </ListItem>
              <ListItem>
                Each player has their own Hand.
              </ListItem>
              <ListItem>
                When you Draw a card, you put the top card of your deck into your Hand.
              </ListItem>
              <ListItem>
                No one except you can look at the cards in your Hand.
              </ListItem>
              <ListItem>
                At the beginning of the game, each player Draws 6 cards, this is their starting Hand.
              </ListItem>
              <ListItem>
                6 is also the maximum number of cards you can have in your Hand, your Maximum Hand Size.
              </ListItem>
            </List>
          </RuleItem>
          <RuleItem
            title="Queue"
          >
            <List>
              <ListItem>
                The Queue is where player Actions wait to be resolved.
              </ListItem>
              <ListItem>
                The Queue is shared by each player.
              </ListItem>
              <ListItem>
                When a player takes an Action it is added to the Queue.
              </ListItem>
              <ListItem>
                Player Actions include playing cards and activating abilities.
              </ListItem>
              <ListItem>
                Actions resolve when no player decides to take an Action.
              </ListItem>
              <ListItem>
                The last Action to enter the Queue resolve first.
              </ListItem>
              <ListItem>
                When an Action resolves, players can take Actions again.
              </ListItem>
            </List>
          </RuleItem>
          <RuleItem
            title="Battleground"
          >
            <List>
              <ListItem>
                The Battleground is where Constants are placed.
              </ListItem>
              <ListItem>
                The Battleground is shared by each player.
              </ListItem>
              <ListItem>
                Cards on the Battleground are visible to each player at all times.
              </ListItem>
              <ListItem>
                Each player has their own side of the Battleground
              </ListItem>
              <ListItem>
                In the center of the Battleground are three Biomes, which is where Entities fight.
              </ListItem>
              <ListItem>
                Nodes are put on the Battleground when played (not the queue).
              </ListItem>
              <ListItem>
                Entities, Objects, and Effects are put on the Battleground after resolving.
              </ListItem>
              <ListItem>
                Locked cards on the Battleground are separated from the other cards.
              </ListItem>
              <ListItem>
                At the start of the game, the Battleground is empty.
              </ListItem>
            </List>
          </RuleItem>
          <RuleItem
            title="Cache"
          >
            <List>
              <ListItem>
              The Cache is where used cards are kept (discard pile).
              </ListItem>
              <ListItem>
                Each player has their own Cache.
              </ListItem>
              <ListItem>
                Cards in the Cache are visible to each player at all times.
              </ListItem>
              <ListItem>
                Player&apos;s can count how many cards are in each player&apos;s Cache at any time.
              </ListItem>
              <ListItem>
                Event cards go to the Cache after resolving.
              </ListItem>
              <ListItem>
                All cards go to the Cache if a card or ability causes them to be:
                <List>
                  <ListItem>
                    Discarded.
                  </ListItem>
                  <ListItem>
                    Terminated.
                  </ListItem>
                  <ListItem>
                    Sacrificed.
                  </ListItem>
                  <ListItem>
                    Canceled.
                  </ListItem>
                </List>
              </ListItem>
            </List>
          </RuleItem>
          <RuleItem
            title="Archive"
          >
            <List>
              <ListItem>
                The Archive is where cards that are no longer part of the game are kept.
              </ListItem>
              <ListItem>
                Each player has their own Archive.
              </ListItem>
              <ListItem>
                Cards in the Archive are typically visible to each player at all times.
              </ListItem>
              <ListItem>
                Player&apos;s can count how many cards are in each player&apos;s Archive at any time.
              </ListItem>
              <ListItem>
                All cards go to the Cache if a card or ability causes them to be deleted.
              </ListItem>
              <ListItem>
                Cards in the Archive are considered deleted.
              </ListItem>
            </List>
          </RuleItem>
          <RuleItem
            title="Reserve"
          >
            <List>
              <ListItem>
                The Reserve is where cards and Powers that are not part of the current match are kept.
              </ListItem>
              <ListItem>
                Each player has their own Reserve.
              </ListItem>
              <ListItem>
                No one except you can look at the cards and Powers in your reserve.
              </ListItem>
              <ListItem>
                Cards and Powers in the Reserve are never available during a match.
              </ListItem>
              <ListItem>
                Cards and Powers in the Reserve are only available between matches in best-of-three games.
              </ListItem>
              <ListItem>
                Players may swap out cards and Powers in their deck for cards and Powers in their Reserve.
              </ListItem>
              <ListItem>
                The Reserve may at most contain 12 cards and 1 Power.
              </ListItem>
              <ListItem>
                After each game, each player&apos;s Deck and Power is restored to the original configuration.
              </ListItem>
            </List>
          </RuleItem>
        </RulesSection>
        {/* Layout */}
        <RulesSection
          title="Areas"
        >
          During each turn, players can take different Actions that affect the game.
          As long as players are able, they can take as many Actions as they want during a turn.
          Actions include playing a card or activating an ability.
          <RuleItem
            title="Targets"
          >
            <List>
              <ListItem>
                When a card or ability mentions a &quot;target&quot;, you must pick one or more targets.
              </ListItem>
              <ListItem>
                Alterations need a target when they are played.
              </ListItem>
              <ListItem>
                The target of a card or ability is affected by the card or ability.
              </ListItem>
              <ListItem>
                Targets can be cards in any Area, or players.
              </ListItem>
              <ListItem>
                Valid targets for the card or ability requiring a target is stated on the card.
                <List>
                  <ListItem>
                    If you can&apos;t meet the targeting requirement the target is invalid.
                  </ListItem>
                  <ListItem>
                    When a card or ability resolves from the queue, the validity of the target is checked.
                  </ListItem>
                  <ListItem>
                    If a target is invalid, the card or ability can&apos;t affect it.
                  </ListItem>
                  <ListItem>
                    If there are no valid targets when a card or ability resolves, it&apos;s canceled.
                  </ListItem>
                </List>
              </ListItem>
              <ListItem>
                Canceled cards go to the Cache instead of the Battleground.
              </ListItem>
              <ListItem>
                Canceled abilities have no effect.
              </ListItem>
            </List>
          </RuleItem>
          <RuleItem
            title="Taking action"
          >
            <List>
              <ListItem>
                When taking an Action it enters the Queue.
              </ListItem>
              <ListItem>
                If the Action:
                <List>
                  <ListItem>
                    Has a target, you pick the target.
                  </ListItem>
                  <ListItem>
                    Say &quot;Pick one -&quot;, you pick which option to use.
                  </ListItem>
                  <ListItem>
                    If a target is invalid, the card or ability can&apos;t affect it.
                  </ListItem>
                </List>
              </ListItem>
              <ListItem>
                If the Action has {'{X}'} in its Cost:
                <List>
                  <ListItem>
                    You pick what number of Void Energy X is.
                  </ListItem>
                  <ListItem>
                    You pay the total Energy Cost, including the number for X.
                  </ListItem>
                </List>
              </ListItem>
            </List>
          </RuleItem>
          <RuleItem
            title="Responding to actions"
          >
            <List>
              <ListItem>
                Each player may respond to Actions added to the Queue by an opponent.
              </ListItem>
              <ListItem>
                Players can only respond if they are able to take an Action.
              </ListItem>
              <ListItem>
                Players take turns, adding Actions in response.
              </ListItem>
            </List>
          </RuleItem>
          <RuleItem
            title="Resolving actions"
          >
            <List>
              <ListItem>
                When no player decides to take an Action, the Actions in the Queue begin to resolve.
              </ListItem>
              <ListItem>
                When an Action in the Queue resolves, each player who can may take another Action.
              </ListItem>
              <ListItem>
                If a player takes an Action after an Action resolves, the process repeats.
              </ListItem>
            </List>
          </RuleItem>
        </RulesSection>
        {/* Turns */}
        <RulesSection
          title="Turns"
        >
          In Nexus players take Turns to progress their own game plan towards victory.
          Turns are made up of a series of Phases. Each Phase is made up of a series of steps.
          Each Turn moves between the Phases and Steps in the same order every time.
          Each Phase or step allows or disallows players to do certain things.
          <RuleItem
            title="When a phase and some steps begin:"
          >
            <List>
              <ListItem>
                Any Triggered Abilities that happen during that Phase or step enter the Queue.
              </ListItem>
              <ListItem>
                The player whose turn it is may take an Action. If they do, their opponents may respond.
              </ListItem>
              <ListItem>
                As long as it&apos;s your turn, opponents may only respond with Speed II or Speed III Actions.
              </ListItem>
            </List>
          </RuleItem>
          <RuleItem
            title="When a phase and some steps end:"
          >
            <List>
              <ListItem>
                You may take Speed II or Speed III Actions.
              </ListItem>
              <ListItem>
                Your opponents may take Speed II or Speed III Actions.
              </ListItem>
              <ListItem>
                When the Queue is empty and no player takes an Action the next Step, Phase, or Turn begins.
              </ListItem>
            </List>
          </RuleItem>
          The following is an outline of the Phases and Steps of a player&apos;s Turn, executed in order.
          It&apos;s seen from the perspective of the player whose turn it is.
          Some steps do not allow players to take Actions.
        </RulesSection>
      </Box>
    );
}