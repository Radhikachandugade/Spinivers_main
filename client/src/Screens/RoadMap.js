import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import { MdDeveloperMode } from "react-icons/md";
import { ListItem, Stack, Text, UnorderedList } from "@chakra-ui/react";

const RoadMap = () => {
  return (
    <>
      <Stack alignItems="center">
        <Text
          bgGradient="linear(to-l, rgba(111, 17, 242, 1) 0%, rgba(210, 181, 251, 1) 45%, rgba(242, 240, 245, 1) 49%)"
          bgClip="text"
          fontSize={{ base: "2rem", md: "3.2rem", lg: "4.4rem" }}
          fontWeight="semibold"
          w={{ base: "xs", md: "auto", lg: "auto" }}
          m="auto"
        >
          RoadMap
        </Text>
        <VerticalTimeline lineColor="rgb(140, 65, 245)">
          <VerticalTimelineElement
            icon={<MdDeveloperMode />}
            iconStyle={{
              background: "rgb(5, 0, 10)",
              color: "cyan",
            }}
            date="Planning and Initial Development"
            dateClassName="size"
            contentStyle={{
              background: "transparent",
              border: "1px solid cyan",
            }}
            contentArrowStyle={{ background: "transparent" }}
            style={{
              backgroundColor:
                "linear(to-l, rgba(111, 17, 242, 1) 0%, rgba(210, 181, 251, 1) 45%, rgba(242, 240, 245, 1) 49%)",
            }}
          >
            <UnorderedList>
              <ListItem>
                <span style={{ color: "#f2f0f5" }}>August 2024:</span> Finalize
                the concept and design of our website and Wheel of Fortune game.
              </ListItem>
              <ListItem>
                <span style={{ color: "#f2f0f5" }}>September 2024:</span> Begin
                developing the website and integrate the Wheel of Fortune game.
              </ListItem>
              <ListItem>
                Host AMA sessions on Telegram and Twitter spaces to introduce
                the project and answer queries
              </ListItem>
            </UnorderedList>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            icon={<MdDeveloperMode />}
            iconStyle={{
              background: "rgb(5, 0, 10)",
              color: "cyan",
            }}
            date="Beta Testing and Community Building"
            dateClassName="size"
            contentStyle={{
              background: "transparent",
              border: "1px solid cyan",
            }}
            contentArrowStyle={{ background: "transparent" }}
            style={{
              backgroundColor:
                "linear(to-l, rgba(111, 17, 242, 1) 0%, rgba(210, 181, 251, 1) 45%, rgba(242, 240, 245, 1) 49%)",
            }}
          >
            <UnorderedList>
              <ListItem>
                <span style={{ color: "#f2f0f5" }}>October 2024:</span> Launch a
                closed beta version of the website for initial testing and
                feedback.
              </ListItem>
              <ListItem>
                <span style={{ color: "#f2f0f5" }}>November 2024:</span> Create
                social media handles and start building and engaging the
                community through social media, forums, and early access
                invitations.
              </ListItem>
              <ListItem>
                Establish strategic partnerships with crypto influencers on
                Telegram and Twitter to spread the word about the project
              </ListItem>
              <ListItem>
                <span style={{ color: "#f2f0f5" }}>December 2024:</span> Refine
                the website and game based on beta feedback.
              </ListItem>
            </UnorderedList>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            icon={<MdDeveloperMode />}
            iconStyle={{
              background: "rgb(5, 0, 10)",
              color: "cyan",
            }}
            date="White Paper Creation, Tokenomics, and Security Audits"
            dateClassName="size"
            contentStyle={{
              background: "transparent",
              border: "1px solid cyan",
            }}
            contentArrowStyle={{ background: "transparent" }}
            style={{
              backgroundColor:
                "linear(to-l, rgba(111, 17, 242, 1) 0%, rgba(210, 181, 251, 1) 45%, rgba(242, 240, 245, 1) 49%)",
            }}
          >
            <UnorderedList>
              <ListItem>
                <span style={{ color: "#f2f0f5" }}>January 2025:</span> Create
                and publish our whitepaper detailing the project’s vision,
                technology, and tokenomics.
              </ListItem>
              <ListItem>
                <span style={{ color: "#f2f0f5" }}>February 2025:</span>
                Finalize the creation of our native CG tokens and define the
                tokenomics, including total supply, distribution, and staking
                feature.
              </ListItem>
              <ListItem>
                Conduct security audits of the token's smart contracts and
                staking smart contract
              </ListItem>
              <ListItem>
                <span style={{ color: "#f2f0f5" }}>March 2025:</span> Announce
                the presale details and start a comprehensive marketing
                campaigns for presale
              </ListItem>
            </UnorderedList>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            icon={<MdDeveloperMode />}
            iconStyle={{
              background: "rgb(5, 0, 10)",
              color: "cyan",
            }}
            date="Token Presale and Full Website Launch"
            dateClassName="size"
            contentStyle={{
              background: "transparent",
              border: "1px solid cyan",
            }}
            contentArrowStyle={{ background: "transparent" }}
            style={{
              backgroundColor:
                "linear(to-l, rgba(111, 17, 242, 1) 0%, rgba(210, 181, 251, 1) 45%, rgba(242, 240, 245, 1) 49%)",
            }}
          >
            <UnorderedList>
              <ListItem>
                <span style={{ color: "#f2f0f5" }}>April 2025:</span> Conduct
                the presale of our native CG tokens, offering early access to
                community members and investors.
              </ListItem>
              <ListItem>
                <span style={{ color: "#f2f0f5" }}>May 2025:</span> Officially
                launch the full version of the Spiniverse website and the Wheel
                of Fortune game.
              </ListItem>
            </UnorderedList>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            icon={<MdDeveloperMode />}
            iconStyle={{
              background: "rgb(5, 0, 10)",
              color: "cyan",
            }}
            date="Token Listing and Ecosystem Expansion"
            dateClassName="size"
            contentStyle={{
              background: "transparent",
              border: "1px solid cyan",
            }}
            contentArrowStyle={{ background: "transparent" }}
            style={{
              backgroundColor:
                "linear(to-l, rgba(111, 17, 242, 1) 0%, rgba(210, 181, 251, 1) 45%, rgba(242, 240, 245, 1) 49%)",
            }}
          >
            <UnorderedList>
              <ListItem>
                <span style={{ color: "#f2f0f5" }}>June 2025:</span> Seed our CG
                tokens on Raydium by creating a liquidity pool using the funds
                raised during the presale.
              </ListItem>
              <ListItem>
                <span style={{ color: "#f2f0f5" }}>July 2025:</span> Expand the
                ecosystem by introducing new games, partnerships, and additional
                rewards.
              </ListItem>
            </UnorderedList>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            icon={<MdDeveloperMode />}
            iconStyle={{
              background: "rgb(5, 0, 10)",
              color: "cyan",
            }}
            date="Continuous Improvement, New Features, and Governance"
            dateClassName="size"
            contentStyle={{
              background: "transparent",
              border: "1px solid cyan",
            }}
            contentArrowStyle={{ background: "transparent" }}
            style={{
              backgroundColor:
                "linear(to-l, rgba(111, 17, 242, 1) 0%, rgba(210, 181, 251, 1) 45%, rgba(242, 240, 245, 1) 49%)",
            }}
          >
            <UnorderedList>
              <ListItem>
                <span style={{ color: "#f2f0f5" }}>August 2025:</span> Gather
                user feedback and plan for new features and improvements.
              </ListItem>
              <ListItem>
                <span style={{ color: "#f2f0f5" }}>September 2025:</span> Begin
                development of additional features such as enhanced user
                interface, new reward mechanisms, and more interactive games.
              </ListItem>
            </UnorderedList>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </Stack>
    </>
  );
};

export default RoadMap;
