import React from "react";
import { Flex, Text } from "@chakra-ui/react";

const FooterBar = () => {
  return (
    <>
      <Flex
        justifyContent="center"
        alignItems="center"
        py={{ base: "3", md: "3" }}
        px={{ base: "5", md: "20" }}
        // backgroundColor="rgba(255,255,255,0.1)"
        boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
        borderTop="1px solid #ffffff1a"
        direction={{ base: "column-reverse", md: "row" }}
        mx={{ base: "5", md: "10", lg: "4em" }}
        gap={2}
      >
        <Text color="gray" fontSize={{ base: "xs", md: "sm" }}>
          Copyright © {new Date().getFullYear()} Spiniverse. All Rights
          Reserved.
        </Text>
      </Flex>
    </>
  );
};

export default FooterBar;
