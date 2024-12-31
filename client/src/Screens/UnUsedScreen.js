import React from "react";

const UnUsedScreen = () => {
  return (
    <>
      {/* Partners */}
      <Box
        position="relative"
        my={{ base: "10", md: "10", lg: "20" }}
        h="full" // Adjust the height as needed
      >
        <Image
          src="../assets/abstract.png"
          position="absolute"
          top="-28"
          zIndex="1"
          display={{ base: "none", md: "block" }}
        />
        <Box
          position="absolute"
          top="40"
          left="0"
          right="0"
          bottom="0"
          bg="linear-gradient(180deg, rgba(110, 86, 255, 0) 0%, rgba(110, 87, 255, .46) 40%, rgba(145, 93, 255, 0) 70%)"
          zIndex="-1"
          w="full"
          margin="auto"
          h="600px"
          opacity="0.6"
        />
        <Flex
          justifyContent="center"
          gap="10"
          zIndex="1"
          position="relative"
          direction={{ base: "column", md: "row" }}
          mx={5}
        >
          <ContentCard
            imgPath="../assets/cgurusLogo.png"
            // title="Casinogurus"
            content="Online Casino Reviews Platform"
            content2="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"
            src="https://www.casinogurus.org/"
            boxSize={{ base: "50", md: "70", lg: "85" }}
          />
          <ContentCard
            imgPath="../assets/suLogo.png"
            // title="SLAP Universe"
            content="Meme Coin Ecosystem"
            content2="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"
            src="https://slapuniverse.com/"
            boxSize={{ base: "50", md: "70", lg: "85" }}
          />
        </Flex>
      </Box>
      {/* Benefits */}
      <Stack textAlign="center" mt={20}>
        <Flex alignItems="center" margin="auto" gap="3" w="sm">
          <LeftArrow padding="0" />
          <Text color="#f2f0f5" fontSize={{ base: "sm" }}>
            BENEFITS
          </Text>
          <RightArrow padding="0" />
        </Flex>
        <Text
          bgGradient="linear(to-l, rgba(111, 17, 242, 1) 18%, rgba(210, 181, 251, 1) 45%, rgba(242, 240, 245, 1) 49%)"
          bgClip="text"
          fontSize={{ base: "1.5rem", md: "2rem", lg: "3.25rem" }}
          fontWeight="semibold"
        >
          Why Hold Slap Universe Meme Tokens?
        </Text>
      </Stack>
      <Box
        position="relative"
        my={10}
        h="full" // Adjust the height as needed
      >
        <Image
          src="../assets/abstract.png"
          position="absolute"
          top="-10"
          zIndex="-1"
          display={{ base: "none", md: "block" }}
        />
        <Box
          position="absolute"
          top="40"
          left="0"
          right="0"
          bottom="0"
          bg="linear-gradient(180deg, rgba(110, 86, 255, 0) 0%, rgba(110, 87, 255, .46) 40%, rgba(145, 93, 255, 0) 70%)"
          zIndex="-1"
          w="full"
          margin="auto"
          h="600px"
          opacity="0.6"
        />

        <Flex
          gap={{ base: "10", md: "5", lg: "10" }}
          m={{ base: "10", md: "10", lg: "20" }}
          marginTop={{ base: "0" }}
          direction={{ base: "column", md: "row" }}
        >
          <ContentCard
            imgPath="../assets/wheel.png"
            title="Exclusive Gaming Access"
            content2="Be among the first to play our exclusive Wheel of Fortune game and spin for a chance to win amazing prizes and exclusive rewards!"
            showButton={false}
            fs="1.5rem"
          />
          <ContentCard
            imgPath="../assets/airdrop.png"
            title="Daily Rewards"
            content2="Enjoy daily free spins and win amazing crypto rewards, including free BTC, high prizes, and exclusive airdrops of our meme token with every spin! "
            showButton={false}
            fs="1.5rem"
          />
          <ContentCard
            imgPath="../assets/growing.png"
            title="Growing Ecosystem"
            content2="Become part of an ever-expanding community with 10 innovative meme tokens set to launch, each bringing new opportunities and excitement to our ecosystem!"
            showButton={false}
            fs="1.5rem"
          />
        </Flex>
      </Box>
    </>
  );
};

export default UnUsedScreen;
