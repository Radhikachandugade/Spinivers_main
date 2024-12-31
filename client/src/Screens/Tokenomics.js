import { Grid, ListItem, Stack, Text, UnorderedList } from "@chakra-ui/react";
import React from "react";
import PieChart from "../Components/PieChart";
import Distribution from "../Components/Distribution";
import RichText from "../Components/RichText";

const Tokenomics = () => {
  const tokenomics = [
    {
      heading: "Fund Raise (Public Sale)",
      supply: "40% (400,000,000 tokens)",
      description: `
        This allocation is designated for the initial fund raise on platforms such as PinkSale, ensuring that a significant portion of tokens are available for public investment.`,
    },
    {
      heading: "Team Allocation",
      supply: "14% (140,000,000 tokens)",
      description: `
        Reserved for the founding team, developers, and advisors. These tokens will follow a vesting schedule to align the team’s incentives with the long-term success of the project, with a 1-year cliff followed by monthly vesting over 2 years.`,
    },
    {
      heading: "Staking Rewards",
      supply: "14% (140,000,000 tokens)",
      description: `
        These tokens are allocated to reward users who stake their CG tokens, encouraging long-term holding and participation in the ecosystem.`,
    },
    {
      heading: "Liquidity Pool",
      supply: "24% (240,000,000 tokens)",
      description: `
        Reserved to provide liquidity on decentralized exchanges (DEXs) like Raydium, ensuring a healthy trading environment for CG tokens and supporting token stability.`,
    },
    {
      heading: "Community and Airdrops",
      supply: "4% (40,000,000 tokens)",
      description: `
        Used for community incentives, airdrops, and promotional activities to engage and grow the user base.`,
    },
    {
      heading: "Auto-Burn Mechanism",
      supply: "4% (40,000,000 tokens)",
      description: `
        Allocated to systematically reduce the supply of CG tokens, this mechanism is designed to increase scarcity and potentially enhance token value over time by burning 40 million tokens through the Wheel of Fortune game.`,
    },
  ];

  return (
    <>
      <Stack spacing={10}>
        <Text
          bgGradient="linear(to-l, rgba(111, 17, 242, 1) 0%, rgba(210, 181, 251, 1) 45%, rgba(242, 240, 245, 1) 49%)"
          bgClip="text"
          fontSize={{ base: "2rem", md: "3.2rem", lg: "3.4rem" }}
          fontWeight="semibold"
          w={{ base: "xs", md: "auto", lg: "auto" }}
          m="auto"
        >
          Total Supply: 1 Billion
        </Text>
        <Grid
          templateColumns="repeat(2,1fr)"
          gap={5}
          justifyContent="center"
          alignItems="center"
        >
          <PieChart />
          <Distribution />
        </Grid>
      </Stack>
      {/* Tokenomics Breakdown */}
      <Stack mx={40} mt={10} spacing={2}>
        <RichText heading="Allocation Breakdown" arrow={false} />
        <UnorderedList spacing={5} ml={10} mt={5}>
          {tokenomics.map((data, index) => (
            <ListItem>
              <span style={{ color: "#f2f0f5" }}>{data.heading}:</span>{" "}
              {data.supply}
              <br></br>
              {data.description}
            </ListItem>
          ))}
        </UnorderedList>
      </Stack>
    </>
  );
};

export default Tokenomics;
