import React from "react";
import BannerContent from "../Components/BannerContent";
import {
  Box,
  Icon,
  Flex,
  Stack,
  Text,
  IconButton,
  useClipboard,
  Image,
} from "@chakra-ui/react";
import SideContent from "../Components/SideContent";
import ContentCard from "../Components/ContentCard";
import FilledButton from "../Components/FilledButton";
import OutlineButton from "../Components/OutlineButton";
import { MdOutlineContentCopy } from "react-icons/md";
import AbstractBg from "../Components/AbstractBg";
import RichText from "../Components/RichText";

const HomeScreen = () => {
  const contractAddress = "EJBbh4xbAxE5CDNnr9jMcXTydjGJxazKB3ypLCmipump";
  const { onCopy, hasCopied } = useClipboard(contractAddress);
  return (
    <>
      {/* Banner */}
      <BannerContent />
      {/* Mission */}
      <AbstractBg
        bgH="1500px"
        children={
          <Stack>
            <SideContent
              direction={{ base: "column", md: "row", lg: "row" }}
              title="MISSION"
              heading="Transforming Meme Coins"
              content="In the ever-evolving world of cryptocurrency, platforms like pump.fun, degen.fund, and others have made it easier than ever to launch new meme coins. Every day, thousands of these tokens hit the market, each with its own unique story and community. However, many of these meme coins face a common challenge: they often get dumped and lack real utility, leaving holders with little incentive to stay engaged.
              <br><br>
              Spiniverse is here to change the game. We believe that meme coins can be more than just a fleeting trend. Our mission is to bring fun and excitement to the meme coin ecosystem by introducing the <span style='color:#f2f0f5'> Wheel of Fortune </span> game—a thrilling way for meme coin enthusiasts to engage with their tokens. Whether you're holding tokens launched by Slapuniverse, staking our native CG tokens, or purchasing bonus spins, you can unlock daily free spins and win amazing rewards."
              src="../assets/transform.png"
              arrow
            />
            <SideContent
              direction={{
                base: "column",
                md: "row-reverse",
                lg: "row-reverse",
              }}
              title="BENEFITS"
              heading="Why Choose Spiniverse?"
              content=" 
              Here’s why Spiniverse is the ultimate choice for meme coin and gaming enthusiasts -
              <br><br>
              <ul>
                  <li style='padding-bottom:10px'>
                    <span style='color: #f2f0f5;'>Daily Free Spins</span>
                    <p>Spiniverse rewards loyal holders of slapuniverse meme tokens and our native CG tokens with daily free spins on our exciting Wheel of Fortune. Simply by holding your favorite tokens, you’ll receive 4 daily free spins—giving you multiple chances to win every day. For those who stake our native CG tokens, you’ll enjoy 6 daily free spins, maximizing your chances to score big. Even if you're not a token holder or staker, you still get 1 daily free spin to join in on the fun!</p>
                  </li>
                  <li style='padding-bottom:10px'>
                    <span style='color: #f2f0f5;'>Exciting Rewards</span>
                    <p>The more you spin, the more you can win! Spiniverse offers a variety of rewards, from crypto airdrops to premium trading bots and hardware wallets. For a detailed breakdown of what’s up for grabs, check out our Rewards page.</p>
                  </li>
                  <li style='padding-bottom:10px'>
                    <span style='color: #f2f0f5;'>Provably Fair Gameplay</span>
                    <p>We believe in transparency and fairness. That’s why our Wheel of Fortune is provably fair, ensuring that every spin is truly random and offers everyone an equal chance to win. With Spiniverse, you can play with confidence, knowing that your experience is both secure and trustworthy.</p>
                  </li>
            </ul>"
              src="../assets/rewards1.png"
              arrow
            />
          </Stack>
        }
      />

      {/* Wheel of Fortune Game */}
      <RichText
        title="OUR GAME"
        heading="Unlock Exciting Rewards with Every Play!"
        w="2xl"
      />
      <SideContent
        direction={{ base: "column", md: "row-reverse" }}
        w={{ base: "xs", md: "xl" }}
        content="Spiniverse offers an exhilarating Wheel of Fortune game where you can win fantastic rewards . The more you spin, the more you can win! Spiniverse offers a variety of rewards, from meme coin and solana to premium trading bots and crypto hardware wallets.
            <br><br>
               <ul style='padding-left: 16px;' >
                     <li style='padding-bottom: 10px;'>
                        <span>Meme token Airdrops</span>
                      </li>
                      <li style='padding-bottom: 10px;'>
                        <span>Solana</span>
                      </li>
                      <li style='padding-bottom: 10px;'>
                        <span>Exclusive NFTs</span>
                      </li>
                      <li style='padding-bottom: 10px;'>
                        <span>Free Amazon Gift Cards</span>
                      </li>
                      <li style='padding-bottom: 10px;'>
                        <span>Premium Trading Bot</span>
                      </li>
                      <li style='padding-bottom: 10px;'>
                        <span>Ledger Nano X Crypto Hardware Wallet</span>
                      </li>
                </ul>"
        button={<FilledButton title="Learn More" src="/rewards" />}
        src="../assets/wof.png"
      />

      {/* How to Play */}
      <RichText
        title="STEPS"
        heading="How to Play ?"
        description="Welcome to Spiniverse, where your meme tokens come to life with
          exciting rewards and endless fun! Here’s a step-by-step guide on how
          to get started and make the most of your Wheel of Fortune experience."
      />

      <AbstractBg
        bgH="500px"
        children={
          <>
            <Flex
              gap={{ base: "10", md: "5", lg: "10" }}
              mx={{ base: "14", md: "10", lg: "20" }}
              marginTop={{ base: "0" }}
              direction={{ base: "column", md: "row" }}
            >
              <ContentCard
                imgPath="../assets/phantom.png"
                title="1. Connect Phantom Wallet"
                content2="This is essential to track your spins and rewards."
                showButton={false}
                fs="1.3rem"
              />
              <ContentCard
                imgPath="../assets/free-spin.png"
                title="2. Earn Free Spins or Buy Bonus Spins"
                content2="Hold Slapuniverse tokens or stake CG tokens for daily free spins or buy bonus spins using Solana"
                showButton={false}
                fs="1.3rem"
              />
              {/* <ContentCard
                imgPath="../assets/solana.png"
                title="3. Buy Bonus Spins"
                content2="Purchase additional Bonus Spins using SOL or CG tokens."
                showButton={false}
                fs="1.3rem"
              /> */}
              <ContentCard
                imgPath="../assets/wheel.png"
                title="3. Spin & Win!"
                content2="Spin the Wheel and win exciting prizes!"
                showButton={false}
                fs="1.3rem"
              />
            </Flex>
            <Flex justifyContent="center" mt="10">
              <OutlineButton title="Learn More" src="/how-to-play" />
            </Flex>
          </>
        }
      />

      {/* Banner */}
      <Box position="relative" width="100%" overflow="hidden" my={10}>
        {/* Video Background */}
        <Box
          as="video"
          src="../assets/bgvideo1.mp4"
          autoPlay
          loop
          muted
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          objectFit="cover"
          zIndex="-1"
        />

        {/* Top and Bottom Gradient for Blending */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          height="15%"
          bgGradient="linear(to-b, rgb(5, 0, 10), rgba(5, 0, 10, 0))"
          zIndex="0"
        />

        {/* Content */}
        <Flex
          justifyContent="center"
          direction="column"
          alignItems="center"
          gap="3"
          my={{ base: 10, md: 10, lg: 20 }}
          position="relative"
          zIndex="1"
        >
          <Text
            bgGradient="linear(to-l, rgba(111, 17, 242, 1) 0%, rgba(210, 181, 251, 1) 45%, rgba(242, 240, 245, 1) 49%)"
            bgClip="text"
            fontSize={{ base: "1.8rem", md: "3.2rem", lg: "3.5rem" }}
            fontWeight="semibold"
            w={{ base: "xs", md: "auto", lg: "auto" }}
            m="auto"
          >
            Auto-Burn Mechanism
          </Text>
          <Text
            w={{ base: "xs", md: "lg", lg: "2xl" }}
            margin="auto"
            fontSize={{ base: "0.9rem", md: "1rem", lg: "1.12rem" }}
            textAlign="center"
          >
            One of the standout features of the Spiniverse Wheel of Fortune game
            is our innovative Auto-Burn Mechanism. This unique feature ensures
            that the value of meme tokens is maintained and potentially
            increased over time by systematically reducing the supply of tokens.
          </Text>
          <FilledButton title="Learn More" src="/auto-burn" />
        </Flex>
        <Box
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          height="15%"
          bgGradient="linear(to-t, rgb(5, 0, 10), rgba(5, 0, 10, 0))"
          zIndex="0"
        />
      </Box>

      {/*Out Token */}
      <RichText
        title=" OUR Token"
        heading=" CG TOKEN"
        description="Our native token, CG Token, is designed to power the entire Spiniverse ecosystem, offering a range of exciting utilities and rewards for our community. Whether you’re a meme coin enthusiast or an investor, CG Token has something valuable for you."
      />
      <SideContent
        direction={{ base: "column", md: "row" }}
        w={{ base: "xs", md: "auto" }}
        title="USE CASE"
        heading="Utility for CG Tokens"
        content="<ul style='padding-left: 16px;' >
                     <li style='padding-bottom: 10px;'>
                        <span style='color:#f2f0f5'>Purchase Bonus Spins:</span> CG tokens can be used to buy bonus spins on the Spiniverse Wheel of Fortune game.
                      </li>
                      <li style='padding-bottom: 10px;'>
                        <span style='color:#f2f0f5'> Daily Free Spins:</span> Staking CG tokens grants users 6 daily free spins</span>
                      </li>
                      <li style='padding-bottom: 10px;'>
                        <span style='color:#f2f0f5'>List Meme Projects on the wheel:</span> Memecoin Developers can use CG tokens to list their meme projects on the Wheel of Fortune game. Please note project listings are subject to our team's approval to ensure only high-quality projects are featured, maintaining Spiniverse's integrity</span>
                      </li>
                  </ul>"
        src="../assets/coin.png"
        button={
          <Stack alignItems="center" w={{ base: "xs", md: "auto" }} mt={5}>
            <Text textAlign="center" fontSize={{ base: "md", md: "lg" }}>
              Contract Address:
            </Text>
            onClick={onCopy}
            <Flex
              justifyContent="center"
              alignItems="center"
              gap={2}
              onClick={onCopy}
            >
              <Text
                cursor="pointer"
                fontSize={{ base: "xs", md: "sm", lg: "lg" }}
              >
                {contractAddress}
              </Text>
              <IconButton
                size="xs"
                color="white"
                bgColor="transparent"
                _hover={{ bgColor: "transparent" }}
                icon={
                  hasCopied ? (
                    <Text fontSize="xl">✓</Text>
                  ) : (
                    <Flex>
                      <Icon
                        as={MdOutlineContentCopy}
                        boxSize={{ base: "4", md: "5", lg: "6" }}
                        mr={2}
                      />
                    </Flex>
                  )
                }
              />
            </Flex>
            <Flex gap="5">
              <FilledButton title="Presale" src="/presale" />
              <OutlineButton title="Tokenomics" src="/tokenomics" />
            </Flex>
          </Stack>
        }
        bgImage="url('../assets/1.png')"
      />

      {/* Banner */}
      <Box position="relative" width="100%" overflow="hidden" my={5}>
        {/* Video Background */}
        <Box
          as="video"
          src="../assets/listing_video.mp4"
          autoPlay
          loop
          muted
          position="absolute"
          width="100%"
          height="100%"
        />

        {/* Top and Bottom Gradient for Blending */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          height="50%"
          bgGradient="linear(to-b, rgb(5, 0, 10), rgba(5, 0, 10, 0))"
          zIndex="0"
        />

        {/* Content */}
        <Flex
          justifyContent="center"
          direction="column"
          alignItems="center"
          gap="3"
          my={{ base: 10, md: 10, lg: 20 }}
          position="relative"
          zIndex="1"
        >
          <Text
            bgGradient="linear(to-l, rgba(111, 17, 242, 1) 0%, rgba(210, 181, 251, 1) 45%, rgba(242, 240, 245, 1) 49%)"
            bgClip="text"
            fontSize={{ base: "1.8rem", md: "3.2rem", lg: "2.5rem" }}
            fontWeight="semibold"
            w={{ base: "xs", md: "auto", lg: "auto" }}
            m="auto"
          >
            Interested in Listing Your Meme Coin?
          </Text>
          <Text
            w={{ base: "xs", md: "lg", lg: "2xl" }}
            margin="auto"
            fontSize={{ base: "0.9rem", md: "1rem", lg: "1rem" }}
            textAlign="center"
          >
            At Spiniverse, we offer meme coin developers the opportunity to list
            their tokens on our Wheel of Fortune game, where players can win
            exciting rewards, including your tokens.
          </Text>
          <FilledButton title="LIST YOUR COIN" src="/listing-form" />
        </Flex>
        <Box
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          height="50%"
          bgGradient="linear(to-t, rgb(5, 0, 10), rgba(5, 0, 10, 0))"
          zIndex="0"
        />
      </Box>
    </>
  );
};

export default HomeScreen;
