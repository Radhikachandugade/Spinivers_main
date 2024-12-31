import { Flex, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import RightArrow from "./RightArrow";

const SideContent = ({
  title,
  heading,
  content,
  src,
  direction = "row",
  button,
  arrow = false,
  w,
  bgImage,
}) => {
  return (
    <>
      <Flex
        direction={direction}
        px={20}
        justifyContent="space-around"
        alignItems="center"
        my={{ base: "5", md: "10" }}
        gap={{ base: "12", md: "10", lg: "5" }}
        bgImage={bgImage}
      >
        <Image
          src={src}
          height={{ base: "250px", md: "250px", lg: "auto" }}
          w={{ base: "300px", md: "300px", lg: "auto" }}
          objectFit="contain"
        />
        <Stack w={w}>
          {arrow && (
            <Flex alignItems="center" w="2xs" gap={3}>
              <Text color="#f2f0f5" fontSize={{ base: "sm" }}>
                {title}
              </Text>
              <RightArrow padding="0" />
            </Flex>
          )}
          <Text
            bgGradient="linear(to-l, rgba(111, 17, 242, 1) 0%, rgba(210, 181, 251, 1) 45%, rgba(242, 240, 245, 1) 49%)"
            bgClip="text"
            fontSize={{ base: "1.5rem", md: "2rem", lg: "2.5rem" }}
            fontWeight="semibold"
          >
            {heading}
          </Text>
          <Text
            w={{ base: "xs", md: "sm", lg: "xl" }}
            fontSize="1rem"
            dangerouslySetInnerHTML={{ __html: content }}
          ></Text>
          {button}
        </Stack>
      </Flex>
    </>
  );
};

export default SideContent;
