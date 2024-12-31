import { Flex, Stack, Text } from "@chakra-ui/react";
import CustomAccordion from "../Components/CustomAccordion";
import React from "react";

const FaqScreen = () => {
  return (
    // FAQS
    <Flex w="full" justifyContent="center">
      <Stack mx={{ base: "10", md: "20" }} w="70%" alignItems="center">
        <Text
          bgGradient="linear(to-l, rgba(111, 17, 242, 1) 1%, rgba(210, 181, 251, 1) 55%, rgba(242, 240, 245, 1) 49%)"
          bgClip="text"
          fontSize={{ base: "1.5rem", md: "2rem", lg: "3.25rem" }}
          fontWeight="semibold"
          w="fit-content"
        >
          FAQs
        </Text>
        <Text mb={{ base: "5" }}>
          Find answers to some common questions others have asked
        </Text>
        <CustomAccordion />
      </Stack>
    </Flex>
  );
};

export default FaqScreen;
