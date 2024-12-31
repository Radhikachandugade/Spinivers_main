import { Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";

const Content = ({ heading, size = "md", content }) => {
  return (
    <>
      <Stack spacing="3" my="2">
        <Heading color="#f2f0f5" size={size} fontWeight="semibold">
          {heading}
        </Heading>
        <Text
          textAlign="justify"
          dangerouslySetInnerHTML={{ __html: content }}
        ></Text>
      </Stack>
    </>
  );
};

export default Content;
