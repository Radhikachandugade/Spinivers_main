import {
  Flex,
  Grid,
  Image,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import RichText from "../Components/RichText";
import FilledButton from "../Components/FilledButton";

const RewardsScreen = () => {
  const rewards = [
    {
      icon: "../assets/rewards/airdrops.png",
      label: "Meme Coin Airdrops",
      worth: "Upto 10K",
    },
    {
      icon: "../assets/rewards/solana.png",
      label: "Solana",
      worth: "Upto 0.5SOL",
    },
    {
      icon: "../assets/rewards/nft.png",
      label: "NFTs",
      worth: "Limited-edition",
    },
    {
      icon: "../assets/rewards/amazon.png",
      label: "Amazon Gift Card",
      worth: "Upto $100",
    },
    {
      icon: "../assets/rewards/maestro.png",
      label: "Premium Maestro Bot",
      worth: "Worth $199",
    },
    {
      icon: "../assets/rewards/ledger.png",
      label: "Ledger Nano X Wallet",
      worth: "Worth $149",
    },
  ];

  const detailedRewards = [
    {
      title: "Airdrops of Slapuniverse Meme Tokens",
      description:
        "Each time you win any of the meme tokens (HTH, WHISK, SLAPHERO) launched by Slapuniverse as a reward, you can win up to 50,000 tokens. This is the maximum amount you can win per spin when a Slapuniverse token (i.e., HTH, WHISK, SLAPHERO) lands on the wheel. These winnings will be displayed under your “My Rewards” section. You can withdraw your meme tokens once you accumulate a total of 1 million tokens.",
    },
    {
      title: "Airdrops of CG Tokens",
      description:
        "Each time you win CG tokens as a reward, you can receive up to 50,000 tokens. This is the maximum amount you can win per spin when CG tokens land on the wheel. These winnings will be displayed under your “My Rewards” section. You can withdraw your CG tokens once you accumulate a total of 1 million tokens.",
    },
    {
      title: "Solana Airdrops",
      description:
        "Each time you win a Solana reward, you can receive up to 1 Solana (SOL). These winnings will be displayed under your “My Rewards” section. You can withdraw your Solana rewards once you accumulate a total of 3 SOL.",
    },
    {
      title: "Exclusive NFTs",
      description:
        "Collect unique, limited-edition NFTs related to our meme tokens. These rare digital assets can enhance your crypto collection!",
    },
    {
      title: "Amazon Gift Cards",
      description:
        "Each time you win an Amazon gift card, you can receive up to $500. These winnings will be displayed under your “My Rewards” section. You can withdraw your gift cards once you accumulate a total of $100",
    },
    {
      title: "One-Month Subscription to Premium Maestro Bot",
      description:
        "Enjoy a one-month subscription to the powerful Premium Maestro Bot, offering trading insights and automation.",
    },
    {
      title: "Ledger Nano X Crypto Hardware Wallet",
      description:
        "Win a Ledger Nano X, one of the most secure hardware wallets for managing your crypto assets.",
    },
  ];

  const rewardRules = [
    {
      title: "Meme Token Withdrawals",
      details: [
        "Airdropped meme tokens will be displayed under your “My Rewards” section.",
        "You can withdraw your meme tokens once you accumulate a total of 1 million tokens.",
        "Withdrawals are processed within 48 hours of reaching the threshold.",
      ],
    },
    {
      title: "CG Token Withdrawals",
      details: [
        "Airdropped CG tokens will be displayed under your “My Rewards” section.",
        "You can withdraw your CG tokens once you accumulate a total of 1 million tokens.",
        "Withdrawals are processed within 48 hours of reaching the threshold.",
      ],
    },
    {
      title: "Solana Withdrawals",
      details: [
        "Solana rewards will also be displayed under your “My Rewards” section.",
        "You can withdraw your Solana rewards once you reach a total of 3 SOL.",
        "Withdrawals are processed within 48 hours of reaching the threshold.",
      ],
    },
    {
      title: "Amazon Gift Card Withdrawals",
      details: [
        "Amazon gift cards will be displayed under your “My Rewards” section.",
        "You can withdraw your gift cards once you accumulate a total of $100.",
        "Withdrawals are processed within 48 hours of reaching the threshold.",
      ],
    },
  ];

  const generalConditions = [
    "All rewards are subject to verification and approval.",
    "Users must comply with all platform rules and regulations to be eligible for withdrawals.",
    "By participating in the Wheel of Fortune game, you agree to these terms and conditions. We strive to provide a fair and enjoyable experience for all our users, and these guidelines help ensure that everyone has a chance to win and enjoy their rewards.",
  ];

  return (
    <>
      {/* Rewards */}
      <RichText
        arrow={false}
        heading="Rewards"
        description="Spiniverse offers an exhilarating Wheel of Fortune game where you can win fantastic rewards. The more you spin, the more you can win! Spiniverse offers a variety of rewards, from meme coin and Solana airdrops to premium trading bots and crypto hardware wallets."
      />

      {/* Rewards Grid */}
      <Grid
        templateColumns="repeat(3,1fr)"
        gap="10"
        px="40"
        transition="ease"
        my="10"
      >
        {rewards.map((reward, index) => (
          <Flex
            key={index}
            direction="column"
            justifyContent="center"
            alignItems="center"
            gap="5"
          >
            <Image
              src={reward.icon}
              boxSize="150"
              objectFit="contain"
              _hover={{ filter: "drop-shadow(0px 0px 5px #00FFFF90)" }}
            />
            <Stack>
              <Text
                letterSpacing="2px"
                fontSize="sm"
                textTransform="uppercase"
                fontWeight="semibold"
                textAlign="center"
                color="teal.200"
              >
                {reward.label}
              </Text>
              <Text
                fontSize="xs"
                textTransform="uppercase"
                fontWeight="semibold"
                textAlign="center"
                color="teal.400"
              >
                {reward.worth}
              </Text>
            </Stack>
          </Flex>
        ))}
      </Grid>
      <Flex w="full" justifyContent="center">
        <FilledButton title="Play Now" src="/wheel" />
      </Flex>

      {/* Detailed Rewards */}
      <Stack mx={40} mt={5} spacing={2}>
        <UnorderedList spacing={5} ml={10}>
          {detailedRewards.map((item, index) => (
            <ListItem key={index}>
              <span style={{ color: "#f2f0f5" }}>{item.title}:</span>{" "}
              {item.description}
            </ListItem>
          ))}
        </UnorderedList>
      </Stack>

      {/* Reward Rules */}
      <Stack mx={40} mt={5} spacing={2}>
        <RichText
          heading="Reward Withdrawal"
          arrow={false}
          description="To ensure a fair and smooth experience for all users, please note the following withdrawal terms and conditions:"
        />
        <UnorderedList spacing={5} ml={10} mt={5}>
          {rewardRules.map((rule, index) => (
            <ListItem key={index}>
              <span style={{ color: "#f2f0f5" }}>{rule.title}:</span>
              <UnorderedList spacing={2} ml={5}>
                {rule.details.map((detail, detailIndex) => (
                  <ListItem key={detailIndex}>{detail}</ListItem>
                ))}
              </UnorderedList>
            </ListItem>
          ))}
        </UnorderedList>
      </Stack>

      {/* General Conditions */}
      <Stack mx={40} mt={5} spacing={1}>
        <RichText heading="General Conditions" arrow={false} />
        <UnorderedList spacing={2} ml={10}>
          {generalConditions.map((condition, index) => (
            <ListItem key={index}>{condition}</ListItem>
          ))}
        </UnorderedList>
      </Stack>
    </>
  );
};

export default RewardsScreen;
