import React from "react";
import RichText from "../Components/RichText";
import {
  Stack,
  Box,
  Button,
  Text,
  Link,
  OrderedList,
  ListItem,
} from "@chakra-ui/react";
import OutlineButton from "../Components/OutlineButton";

const UtilityScreen = () => {
  const utility = [
    {
      title: "Purchase Bonus Spins",
      description: `CG tokens can be used to buy bonus spins on the Spiniverse Wheel of Fortune game. However, this feature will be activated once the CG token integration is fully launched and liquidity is established. Once active, you can use CG tokens to buy bonus spins.
      When you purchase bonus spins using CG tokens, you get 30 extra spins compared to using Solana for the same value.`,
    },
    {
      title: "Daily Free Spins",
      description:
        "Staking CG tokens will grant users 6 daily free spins. For example, staking 50,000 CG tokens for a minimum of 3 months will provide 6 daily free spins. This feature will be available as part of the broader CG token ecosystem rollout.",
    },
    {
      title: "List Meme Projects on the Wheel",
      description:
        "Meme coin developers will be able to use CG tokens to list their meme projects on the Wheel of Fortune. The exact value of CG tokens required to feature your project on the wheel will be disclosed later, as we finalize the CG token's launch.",
    },
  ];
  return (
    <>
      <Stack px={40} spacing={6}>
        {/* Heading */}
        <RichText title="USE CASE" heading="Utility of CG Token" />
        {/* Content */}
        <OrderedList spacing={5}>
          {utility.map((data, index) => (
            <ListItem color="#f2f0f5">
              {data.title}
              <br />
              <span style={{ color: "#a590c1" }}>{data.description}</span>
            </ListItem>
          ))}
        </OrderedList>
        {/* Note */}
        <Text fontStyle="oblique" color="#f2f0f5">
          Note: The acceptance of your project for listing will be subject to
          our team’s due diligence and approval process to ensure that only
          quality projects are featured, maintaining the integrity of the
          Spiniverse platform. If you want to list your project on the wheel of
          fortune game please fill the{" "}
          <Link href="/listing-form" textDecoration="underline">
            listing form
          </Link>
          .
        </Text>

        {/* Important Notice */}
        <Box bg="purple.900" p={6} borderRadius="md" my={5}>
          <Text fontSize="lg" color="#f2f0f5">
            Important Notice
          </Text>
          <Text>
            The use of CG tokens for purchasing bonus spins, staking for daily
            free spins, and listing meme projects on the wheel will be available
            once the CG token integration is complete and liquidity is
            established. Stay tuned for updates on the launch and features.
          </Text>
        </Box>
      </Stack>
    </>
  );
};

export default UtilityScreen;
