import { Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import LeftArrow from "./LeftArrow";
import RightArrow from "./RightArrow";

const RichText = ({ title, heading, description, w = "2xl", arrow = true }) => {
  return (
    <>
      <Stack textAlign="center" mt={10} m="auto">
        {arrow && (
          <Flex alignItems="center" margin="auto" gap="3" w="sm">
            <LeftArrow padding="0" />
            <Text
              color="#f2f0f5"
              fontSize={{ base: "sm" }}
              whiteSpace="nowrap"
              textTransform="uppercase"
            >
              {title}
            </Text>
            <RightArrow padding="0" />
          </Flex>
        )}
        <Text
          bgGradient="linear(to-l, rgba(111, 17, 242, 1) 32%, rgba(210, 181, 251, 1) 45%, rgba(242, 240, 245, 1) 49%)"
          bgClip="text"
          fontSize={{ base: "2rem", md: "2rem", lg: "3rem" }}
          fontWeight="semibold"
        >
          {heading}
        </Text>
        <Text w={{ base: "xs", md: "2xl", lg: w }} m="auto">
          {description}
        </Text>
      </Stack>
    </>
  );
};

export default RichText;
