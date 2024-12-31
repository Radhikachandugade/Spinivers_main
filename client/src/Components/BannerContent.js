import { Flex, Stack, Text } from "@chakra-ui/react";

const BannerContent = () => {
  return (
    <>
      <Flex
        justifyContent="center"
        direction="column"
        alignItems="center"
        gap="5"
        my={{ base: 10, md: 10, lg: 10 }}
      >
        <Stack textAlign="center">
          <Text
            bgGradient="linear(to-l, rgba(111, 17, 242, 1) 0%, rgba(210, 181, 251, 1) 45%, rgba(242, 240, 245, 1) 49%)"
            bgClip="text"
            fontSize={{ base: "2rem", md: "3.2rem", lg: "4.4rem" }}
            fontWeight="semibold"
            w={{ base: "xs", md: "auto", lg: "auto" }}
            m="auto"
          >
            Welcome to Spiniverse!
          </Text>
          <Text
            w={{ base: "xs", md: "lg", lg: "xl" }}
            margin="auto"
            fontSize={{ base: "1rem", md: "1rem", lg: "1.12rem" }}
            textAlign="center"
          >
            Welcome to Spiniverse, a platform that brings a new level of
            excitement to the meme coin ecosystem. We’ve created a unique space
            where holding meme tokens unlocks daily free spins in our Wheel of
            Fortune game. Get ready to discover how Spiniverse can turn token
            holding into an exciting adventure!
          </Text>
        </Stack>
        {/* <Flex
          gap={3}
          width={{ base: "0", md: "3xl", lg: "5xl" }}
          justifyContent="center"
        >
          <Box display={{ base: "none", md: "flex" }} width="full">
            <LeftArrow />
          </Box>
          <Stack
            direction={{ base: "row", md: "row" }}
            spacing={4}
            whiteSpace="nowrap"
            align="center"
          >
            <FilledButton title="Get Started" />
            <OutlineButton title="Learn More" />
          </Stack>
          <Box display={{ base: "none", md: "block" }} width="full">
            <RightArrow />
          </Box>
        </Flex> */}
      </Flex>
    </>
  );
};

export default BannerContent;
