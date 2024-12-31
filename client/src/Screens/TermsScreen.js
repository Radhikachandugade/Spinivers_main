import React from "react";
import RichText from "../Components/RichText";
import Content from "../Components/Content";
import { Stack } from "@chakra-ui/react";

const TermsScreen = () => {
  return (
    <>
      <RichText
        arrow={false}
        heading="Terms & Conditions"
        description="To ensure a fair and smooth experience for all users, please note the following withdrawal terms and conditions:"
      />
      <Stack px={40} py={10}>
        <Content
          heading="General Conditions"
          content="All rewards are subject to verification and approval.
  Users must comply with all platform rules and regulations to be eligible for withdrawals.
  By participating in the Wheel of Fortune game, you agree to these terms and conditions. We strive to provide a fair and enjoyable experience for all our users, and these guidelines help ensure that everyone has a chance to win and enjoy their rewards.
  "
        />
        <Content
          heading="Meme Token Withdrawals"
          content="Airdropped meme tokens will be displayed under your “My Rewards” section.
        You can withdraw your meme tokens once you accumulate a total of 1 million tokens.
        Withdrawals are processed within 48 hours of reaching the threshold."
        />
        <Content
          heading="Solana Withdrawals"
          content="Solana rewards will also be displayed under your “My Rewards” section.
        You can withdraw your Solana rewards once you reach a total of 3 SOL.
        Withdrawals are processed within 48 hours of reaching the threshold."
        />
      </Stack>
    </>
  );
};

export default TermsScreen;
