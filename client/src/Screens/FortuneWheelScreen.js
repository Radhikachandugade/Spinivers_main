import React from "react";
import RichText from "../Components/RichText";
import Content from "../Components/Content";
import {
  Box,
  Flex,
  ListItem,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  UnorderedList,
} from "@chakra-ui/react";
import OutlineButton from "../Components/OutlineButton";
import FilledButton from "../Components/FilledButton";

const FortuneWheelScreen = () => {
  return (
    <>
      <Box
        bgImage="url('../assets/wheel_banner.png')"
        h="380px"
        w="100%"
        bgPosition="center"
        backgroundSize="100% 100%"
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        mb={10}
      >
        {/* Content */}
        <Flex
          justifyContent="center"
          direction="column"
          alignItems="center"
          px="20"
          gap="3"
        >
          <Text
            bgGradient="linear(to-l, rgba(111, 17, 242, 1) 0%, rgba(210, 181, 251, 1) 45%, rgba(242, 240, 245, 1) 49%)"
            bgClip="text"
            fontSize={{ base: "1.8rem", md: "3.2rem", lg: "3.5rem" }}
            fontWeight="semibold"
          >
            Wheel of Fortune
          </Text>
          <Text
            w={{ base: "xs", md: "lg", lg: "2xl" }}
            fontSize={{ base: "0.9rem", md: "1rem", lg: "1.12rem" }}
            textAlign="center"
          >
            Spiniverse offers an exhilarating Wheel of Fortune game where you
            can win fantastic rewards . The more you spin, the more you can win!
          </Text>
          <FilledButton title="PLAY NOW" />
        </Flex>
      </Box>

      <RichText
        arrow={false}
        heading="Eligibility Criteria"
        description="You can qualify for our Wheel of Fortune games by earning daily free spins when you hold or stake our tokens. You can also purchase extra spins using our native CG token for even more rewards!"
      />

      {/* FREE SPINS */}
      <Stack mx={40} mt={10} spacing={5}>
        <Content
          heading="1. Earn Daily free spins"
          content="You qualify for daily free spins when  you fulfill one of the below mentioned requirements"
        />
        <Stack mx={10} spacing={5}>
          <UnorderedList>
            <ListItem>
              <span style={{ color: "white" }}>
                Hold Meme Tokens launched by Slapuniverse -
              </span>{" "}
              If you hold tokens of any meme coin launched by SlapUniverse,
              you’ll receive 4 daily free spins. You can find more details here
            </ListItem>
          </UnorderedList>
          {/* Table */}
          <TableContainer
            border="1px solid teal"
            mx="auto"
            w="fit-content"
            borderRadius="xl"
          >
            <Table variant="simple" size="md">
              <Thead>
                <Tr>
                  <Th color="whiteAlpha.900">Tokens</Th>
                  <Th color="whiteAlpha.900">Minimum Qty to hold</Th>
                </Tr>
              </Thead>
              <Tbody textAlign="center">
                <Tr>
                  <Td>Whisk</Td>
                  <Td textAlign="center">XYZ</Td>
                </Tr>
                <Tr>
                  <Td>Slaphero</Td>
                  <Td textAlign="center">XYZ</Td>
                </Tr>
                <Tr>
                  <Td>HTH</Td>
                  <Td textAlign="center">XYZ</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Stack>
        <Stack alignItems="center">
          <Text textAlign="center">Note: Free spins do not carry forward.</Text>
          <OutlineButton title="BUY NOW" />
        </Stack>
        <UnorderedList spacing={5} mx={10}>
          <ListItem>
            <span style={{ color: "white" }}>
              Staking Native Token (CG token) -
            </span>{" "}
            Staking the minimum amount of our gaming platforms native token gets
            you 6 daily free spins
          </ListItem>
          <ListItem>
            <span style={{ color: "white" }}>Non-Holders/Stakers -</span> Even
            if you don’t hold any SlapUniverse meme tokens or staking CG tokens
            you can still participate! Non-holders receive 1 daily free spin.
          </ListItem>
        </UnorderedList>
      </Stack>

      {/* BONUS SPINS */}
      <Stack mx={40} my={16} spacing={10}>
        <Content
          heading="2. Purchase Bonus Spins"
          content="Want more chances to win? You can buy additional spins using Solana (SOL) or CG tokens. For details please refer the table below"
        />
        <Flex>
          {/* Table */}
          <TableContainer
            border="1px solid teal"
            mx="auto"
            w="fit-content"
            borderRadius="xl"
          >
            <Table variant="simple" size="lg" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th color="whiteAlpha.900" textAlign="center">
                    Solana
                  </Th>
                  <Th color="whiteAlpha.900" textAlign="center">
                    No. of Spins
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td textAlign="center">0.1 SOL</Td>
                  <Td textAlign="center">50</Td>
                </Tr>
                <Tr>
                  <Td textAlign="center">0.2 SOL</Td>
                  <Td textAlign="center">100</Td>
                </Tr>
                <Tr>
                  <Td textAlign="center">0.5 SOL</Td>
                  <Td textAlign="center">250</Td>
                </Tr>
                <Tr>
                  <Td textAlign="center">1 SOL</Td>
                  <Td textAlign="center">375</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          {/* Table */}
          <TableContainer
            border="1px solid teal"
            mx="auto"
            w="fit-content"
            borderRadius="xl"
          >
            <Table variant="simple" size="lg" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th color="whiteAlpha.900" textAlign="center">
                    CG Tokens
                  </Th>
                  <Th color="whiteAlpha.900" textAlign="center">
                    No. of Spins
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td textAlign="center">50K tokens</Td>
                  <Td textAlign="center">80</Td>
                </Tr>
                <Tr>
                  <Td textAlign="center">100K tokens</Td>
                  <Td textAlign="center">130</Td>
                </Tr>
                <Tr>
                  <Td textAlign="center">250K tokens</Td>
                  <Td textAlign="center">280</Td>
                </Tr>
                <Tr>
                  <Td textAlign="center">500K tokens</Td>
                  <Td textAlign="center">405</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
        <Stack alignItems="center">
          <Text textAlign="center">
            Note - Unlike Daily Free Spins, Bonus spins do get carry forward{" "}
          </Text>
          <OutlineButton title="BUY NOW" />
        </Stack>
      </Stack>
    </>
  );
};

export default FortuneWheelScreen;
