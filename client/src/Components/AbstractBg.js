import { Box, Image } from "@chakra-ui/react";
import React from "react";

const AbstractBg = ({ children, bgH = "600px" }) => {
  return (
    <>
      <Box
        position="relative"
        my={10}
        h="full" // Adjust the height as needed
      >
        <Image
          src="../assets/abstract.png"
          position="absolute"
          top="-20"
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
          h={bgH}
          opacity="0.6"
        />
        {children}
      </Box>
    </>
  );
};

export default AbstractBg;
