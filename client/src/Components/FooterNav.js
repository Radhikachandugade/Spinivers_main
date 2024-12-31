import React from "react";
import { List, ListItem, Link, Heading, Flex } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const FooterNav = ({ heading, items, display = "flex" }) => {
  return (
    <Flex
      w="full"
      justifyContent={{ base: "left", md: "center" }}
      display={display}
    >
      <List spacing={3} w="fit-content">
        <Heading
          as="h6"
          size={{ base: "xs", md: "xs", lg: "sm" }}
          mb={{ base: "0", md: "6" }}
          display={{ base: "none", md: "block" }}
          fontFamily="Poppins, serif"
          fontWeight="semibold"
          color="white"
        >
          {heading}
        </Heading>
        {items.map((item, index) => (
          <ListItem key={index} fontSize={{ base: "sm", md: "xs", lg: "sm" }}>
            <Link
              as={RouterLink}
              _hover={{ color: "white" }}
              to={item.url}
              onClick={() => {
                window.scrollTo({ top: "0", behavior: "auto" });
              }}
            >
              {item.text}
            </Link>
          </ListItem>
        ))}
      </List>
    </Flex>
  );
};

export default FooterNav;
