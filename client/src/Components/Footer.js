import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Flex,
  Grid,
  Text,
  Heading,
  Image,
  Icon,
  List,
  ListItem,
} from "@chakra-ui/react";
import FooterNav from "./FooterNav";
import { FiPlus, FiMinus } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";

import FooterBar from "./FooterBar";

const Footer = () => {
  const quickLinks = [
    { text: "REWARDS", url: "/rewards" },
    { text: "HOW TO PLAY", url: "/how-to-play" },
    { text: "LIST YOUR COIN ", url: "/listing" },
    { text: "CONTACT", url: "/contact" },
  ];
  const populerCourses = [
    // { text: "TERMS & CONDITIONS ", url: "/T&C" },
    {
      text: "RULES",
      url: "/rules",
    },
    {
      text: "WHITEPAPER",
      url: "/whitepaper",
    },
    { text: "AUTO-BURN", url: "/auto-burn " },
    { text: "FAQs", url: "/faqs" },
  ];
  const socialmedias = [
    {
      icon: FaTelegramPlane,
      url: "#",
    },
    {
      icon: FaXTwitter,
      url: "#",
    },
  ];

  return (
    <>
      <Flex
        w="full"
        bgGradient="linear-gradient(180deg, rgba(5, 0, 10, 0) 31.137724550898206%, rgba(99, 84, 199,0.35) 100%)"
        direction="column"
      >
        <Flex
          as="footer"
          color="#F2F0F580"
          justifyContent="center"
          alignItems="center"
          direction="column"
          mt={{ base: "5", md: "10" }}
          borderTop="1px solid #ffffff1a"
          mx={{ base: "5", md: "10", lg: "4em" }}
        >
          <Grid
            templateColumns={{ base: "1fr ", md: "1fr 1fr 1fr 1fr" }}
            templateRows={{ base: "1fr", md: "auto" }}
            gap="8"
            mx={{ lg: "4em" }}
            my={{ base: "5", md: "4em" }}
            w="full"
            justifyContent="space-between"
          >
            {/* 1st col */}
            <Flex direction={{ base: "row", md: "column" }} w="full" gap={3}>
              <Image
                objectFit="contain"
                src="../assets/logo.png"
                alt="logo"
                w={{ base: "120px", md: "120px", lg: "150px" }}
              />
              <Text fontSize="sm" textAlign="justify">
                Spiniverse is revolutionizing the meme coin ecosystem with fun
                and utility. We bring lasting value to tokens through thrilling
                games and real rewards.
              </Text>
            </Flex>

            {/* 2nd    Col */}
            <FooterNav
              display={{ base: "none", md: "flex" }}
              heading="QUICK LINKS"
              items={quickLinks}
            />

            {/* 3re Col */}
            <FooterNav
              display={{ base: "none", md: "flex" }}
              heading="RESOURCES"
              items={populerCourses}
            />
            {/* 4th Col */}
            <Flex
              w="full"
              justifyContent={{ base: "left", md: "center" }}
              display={{ base: "none", md: "block" }}
            >
              <List spacing={2} w="fit-content">
                <Heading
                  as="h6"
                  size={{ base: "xs", md: "xs", lg: "sm" }}
                  mb={{ base: "0", md: "6" }}
                  fontFamily="Poppins, serif"
                  fontWeight="semibold"
                  color="white"
                >
                  CONNECT WITH US
                </Heading>
                <ListItem fontSize={{ base: "sm", md: "xs", lg: "sm" }}>
                  <Flex gap={5}>
                    {socialmedias.map((item, index) => (
                      <RouterLink to={item.url} key={index}>
                        <Icon
                          _hover={{ color: "white", transform: "scale(1.3)" }}
                          transition="transform 0.2s ease-in-out"
                          boxSize={8}
                          as={item.icon}
                        />
                      </RouterLink>
                    ))}
                  </Flex>
                </ListItem>
              </List>
            </Flex>
          </Grid>

          {/* Footer Mobile Accordion */}
          <Flex
            w="full"
            direction="column"
            gap={3}
            display={{ base: "flex", md: "none" }}
          >
            <Accordion allowToggle>
              {/* Company */}
              <AccordionItem borderY=" 1px solid rgb(42, 35, 53)">
                {({ isExpanded }) => (
                  <>
                    <AccordionButton
                      _hover={{ bgColor: "none" }}
                      borderTop="none"
                    >
                      <Heading as="h6" flex="1" textAlign="left" size="sm">
                        COMPANY
                      </Heading>
                      {isExpanded ? (
                        <FiMinus fontSize="12px" />
                      ) : (
                        <FiPlus fontSize="12px" />
                      )}
                    </AccordionButton>

                    <AccordionPanel pb={4}>
                      <FooterNav items={quickLinks} />
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
              {/* Courses */}
              <AccordionItem borderY=" 1px solid rgb(42, 35, 53)">
                {({ isExpanded }) => (
                  <>
                    <AccordionButton _hover={{ bgColor: "none" }}>
                      <Heading as="h6" flex="1" textAlign="left" size="sm">
                        RESOURCES
                      </Heading>
                      {isExpanded ? (
                        <FiMinus fontSize="12px" />
                      ) : (
                        <FiPlus fontSize="12px" />
                      )}
                    </AccordionButton>

                    <AccordionPanel pb={4}>
                      <FooterNav items={populerCourses} />
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            </Accordion>
          </Flex>
        </Flex>
        <Flex
          w="full"
          justifyContent={{ base: "center", md: "center" }}
          display={{ base: "flex", md: "none" }}
        >
          <List spacing={2} w="fit-content">
            <Heading
              as="h6"
              size={{ base: "xs", md: "xs", lg: "sm" }}
              mb={{ base: "0", md: "6" }}
              display={{ base: "none", md: "block" }}
              fontFamily="Poppins, serif"
              fontWeight="semibold"
              color="white"
            >
              CONNECT WITH US
            </Heading>
            <ListItem fontSize={{ base: "sm", md: "xs", lg: "sm" }}>
              <Flex gap={5}>
                {socialmedias.map((item, index) => (
                  <RouterLink to={item.url} key={index}>
                    <Icon
                      _hover={{ color: "white", transform: "scale(1.3)" }}
                      transition="transform 0.2s ease-in-out"
                      boxSize={8}
                      as={item.icon}
                    />
                  </RouterLink>
                ))}
              </Flex>
            </ListItem>
          </List>
        </Flex>
        <FooterBar />
      </Flex>
    </>
  );
};

export default Footer;
