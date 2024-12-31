import {
  Box,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  ListItem,
  OrderedList,
  Stack,
  Text,
} from "@chakra-ui/react";
import RichText from "../Components/RichText";
import Content from "../Components/Content";
import FilledButton from "../Components/FilledButton";
import OutlineButton from "../Components/OutlineButton";
import { FaRegCircleCheck } from "react-icons/fa6";

const ListingScreen = () => {
  const adv = [
    {
      title: "Enhanced Visibility and Exposure",
      description:
        "Listing your meme coin on Spiniverse's Wheel of Fortune gives your project prime visibility to a broad audience. With each spin, your token’s name and ticker are prominently displayed, capturing the attention of potential investors and enthusiasts eager to explore new meme coins.",
    },
    {
      title: "Community Engagement and Marketing",
      description:
        "Being featured on Spiniverse provides a unique marketing opportunity. You can showcase this partnership to your community, highlighting your commitment to the auto-burn mechanism. This not only generates excitement among your holders but also serves as a strong promotional tool, demonstrating your active efforts to enhance your project's value.",
    },
    {
      title: "Value Appreciation through Auto-Burn Mechanism",
      description:
        "Participating in the Wheel of Fortune’s auto-burn process means a portion of your tokens will be systematically burned as the wheel reaches specific milestones. This deflationary mechanism reduces the total supply of your tokens over time, potentially increasing their value and offering a compelling reason for investors to hold and accumulate.",
    },
    {
      title: "Credibility and Trust",
      description:
        "Listing on Spiniverse can boost your project's credibility. Associating with a reputable gaming platform like Spiniverse signals transparency and trustworthiness to potential investors. This affiliation can build confidence, attracting a more dedicated and engaged investor base",
    },
  ];
  return (
    <>
      {/* Banner */}
      <Box
        bgImage="url('../assets/listing_bg.jpg')"
        h="380px"
        w="100%"
        bgPosition="center"
        backgroundSize="100% 100%"
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        mb={10}
        mt="-10"
        position="relative"
      >
        <Box
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          height="50%"
          bgGradient="linear(to-t, rgb(5, 0, 10), rgba(5, 0, 10, 0))"
          zIndex="0"
        />
        {/* Content */}
        <Flex
          justifyContent="center"
          direction="column"
          alignItems="center"
          px="60"
          gap="3"
        >
          <Text
            bgGradient="linear(to-l, rgba(111, 17, 242, 1) 0%, rgba(210, 181, 251, 1) 45%, rgba(242, 240, 245, 1) 49%)"
            bgClip="text"
            fontSize={{ base: "1.8rem", md: "3.2rem", lg: "3.5rem" }}
            fontWeight="semibold"
            textAlign="center"
          >
            Wheel of Fortune Listing
          </Text>
          <Text
            w={{ base: "xs", md: "lg", lg: "2xl" }}
            fontSize={{ base: "0.9rem", md: "1rem", lg: "1rem" }}
            textAlign="center"
          >
            Boost your meme coin's visibility and engage the community by
            listing on Spiniverse's Wheel of Fortune. Enjoy enhanced exposure, a
            deflationary burn mechanism, and build trust with our transparent
            listing process.
          </Text>
          <OutlineButton title="LIST YOUR COIN" src="/listing-form" />
        </Flex>
      </Box>

      <Stack mx="40" my={10} spacing={5}>
        <RichText
          title="Spiniverse Listing"
          heading="Listing Your Coin on Wheel of Fortune"
        />
        <Content content="At Spiniverse, we offer meme coin developers the opportunity to list their tokens on our Wheel of Fortune game, where players can win exciting rewards, including your tokens. To maintain quality and trust within our ecosystem, we have specific criteria and options available for developers." />
        <Content
          heading="Listing Fee"
          content="To list your project on the Wheel of Fortune, a fee of 2 Solana is required."
        />
        <Content
          heading="Token Supply for Burn Mechanism"
          content="
          <ul style='margin-left:20px'>
          <li>Burn Mechanism Requirement: You are required to provide 4% of your total token supply for the auto-burn mechanism. As the wheel reaches specific milestones , a percentage of all participating meme coins, including yours, will be burnt.</li>
          <br>
          <li>Purpose: This ensures a deflationary mechanism, adding value to your token and maintaining market stability.</li></ul>"
        />
        <Content
          heading="Token Supply for Airdrops (Optional)"
          content="Airdrop Tokens: Optionally, you can provide 4% of your total token supply to be given as rewards on the wheel which will further promote community engagement"
        />
        <Content
          heading="Transparency & Token Management"
          content="Your Tokens, Your Control: The tokens provided for burns and airdrops will be placed in a publicly viewable wallet, allowing you to monitor the balance in real-time. This ensures full transparency and builds trust."
        />
      </Stack>
      <Stack mx="32" my={10} spacing={14}>
        <RichText heading="Advantages of Listing" arrow={false} />
        {/* <Content heading="Advantages of Listing Your Project" size="lg" /> */}
        {/* <OrderedList spacing={5} textAlign="justify">
            {adv.map((item, index) => (
              <ListItem key={index}>
                <Heading color="#f2f0f5" size="md" fontWeight="semibold">
                  {item.title}
                </Heading>
                {item.description}
              </ListItem>
            ))}
          </OrderedList> */}
        <Grid templateColumns="repeat(2,1fr)" gap={20}>
          {adv.map((item, index) => (
            <Stack textAlign="center" spacing="5">
              <Flex justifyContent="center" alignItems="center">
                <Image src="../assets/check.svg" boxSize={6} mr={3} />

                <Heading color="#f2f0f5" fontWeight="semibold" size="md">
                  {item.title}
                </Heading>
              </Flex>
              <Text fontSize="md">{item.description}</Text>
            </Stack>
          ))}
        </Grid>
      </Stack>
    </>
  );
};

export default ListingScreen;
