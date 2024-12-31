import {
  Link,
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
import React from "react";
import Content from "../Components/Content";
import RichText from "../Components/RichText";

const HowToPlayScreen = () => {
  return (
    <>
      <Stack px={40} spacing={6}>
        <RichText title="Wheel of Fortune" heading="How to Play" />

        <Content content="Follow these simple steps to start spinning the Wheel of Fortune and unlock incredible rewards. Here’s a step-by-step guide on how to get started." />

        {/* Step 1: Connect Your Phantom Wallet */}
        <Content
          heading="Step 1: Connect Your Phantom Wallet"
          content='To play the Wheel of Fortune game, you’ll need to connect your Phantom wallet. If you don’t have a Phantom wallet yet, don’t worry! You can easily create one by following these steps:
          <br><br>
          <ul style="padding-left: 20px;">
            <li style="padding-bottom: 10px;">
              <span style="color: white;">Download Phantom Wallet:</span> Visit the Phantom website and download the wallet extension for your browser or mobile app.
            </li>
            <li style="padding-bottom: 10px;">
              <span style="color: white;">Create Your Wallet:</span> Follow the instructions to create your wallet. Make sure to securely store your recovery phrase.
            </li>
            <li style="padding-bottom: 10px;">
              <span style="color: white;">Connect to Spiniverse:</span> Once your wallet is set up, connect it to the Spiniverse platform. This will allow you to access the Wheel of Fortune game and manage your spins.
            </li>
          </ul>'
        />

        {/* Step 2: Earn Daily Free Spins */}
        <Content
          heading="Step 2: Earn Daily Free Spins"
          content="You qualify for daily free spins when you fulfill one of the following requirements:"
        />
        <Stack pl="20px" spacing={5}>
          <UnorderedList>
            <ListItem>
              <span style={{ color: "white" }}>
                Hold Meme Tokens launched by Slapuniverse -
              </span>{" "}
              If you hold tokens of any meme coin launched by SlapUniverse,
              you’ll receive 4 daily free spins.
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
          <Text align="center">
            Note: You can buy these coins from{" "}
            <Link
              color="#f2f0f5"
              target="_blank"
              href="https://slapuniverse.com/"
            >
              SlapUniverse Website
            </Link>
            .
          </Text>
        </Stack>

        <Content
          content='
          <ul style="padding-left: 20px;">
            <li style="padding-bottom: 10px;">
              <span style="color: white;">Staking Native Token (CG token):</span> Stake our native token and enjoy 6 daily free spins. For more details on staking and its benefits, visit our <a href="/staking" style="color:#f2f0f5">staking page</a>.
            </li>
            <li style="padding-bottom: 10px;">
              <span style="color: white;">Non-Holders/Stakers:</span> Non-holders can still participate with 1 daily free spin.
            </li>
          </ul>
          <br>
          <strong>Important Note:</strong> Unused spins do not roll over. Example - If you have 4 Daily spins left and you only use 2 spins today, the remaining 2 will expire.'
        />

        {/* Purchase Additional Spins */}
        <Content
          heading='OR Purchase Additional Spins ("Bonus Spins")'
          content="Want more chances to win? You can buy additional spins using Solana (SOL) or CG tokens.
                    When you purchase bonus spins using CG tokens, you get 30 extra spins compared to using Solana for the same value."
        />
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
                <Td textAlign="center">0.05 SOL</Td>
                <Td textAlign="center">20</Td>
              </Tr>
              <Tr>
                <Td textAlign="center">0.1 SOL</Td>
                <Td textAlign="center">50</Td>
              </Tr>
              <Tr>
                <Td textAlign="center">0.2 SOL</Td>
                <Td textAlign="center">100</Td>
              </Tr>
              <Tr>
                <Td textAlign="center">1 SOL</Td>
                <Td textAlign="center">425</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <Text>
          In future, players will be able to use CG tokens to buy bonus spins on
          the Spiniverse Wheel of Fortune game. However, this feature will be
          activated once the CG token integration is fully launched and
          liquidity is established. When you purchase bonus spins using CG
          tokens, you get 30 extra spins compared to using Solana for the same
          value.
        </Text>
        {/* Step 3: Spin and Win */}
        <Content
          heading="Step 3: Spin and Win!"
          content="Once your wallet is connected and you have your spins ready, it’s time to play! Simply click the 'Spin Now' button and try your luck to win amazing prizes."
        />
      </Stack>
    </>
  );
};

export default HowToPlayScreen;
