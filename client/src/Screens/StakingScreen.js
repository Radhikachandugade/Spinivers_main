import React from "react";
import RichText from "../Components/RichText";
import {
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
import Content from "../Components/Content";

const StakingScreen = () => {
  return (
    <>
      {/* Staking */}
      <RichText heading="Staking" arrow={false} />
      <Stack mx={40} my={10} spacing={5}>
        <Text>
          Stake CG tokens to earn additional rewards. Here are the staking
          details:
        </Text>
        <UnorderedList spacing={2}>
          <ListItem>
            <span style={{ color: "white" }}>Minimum Stake:</span> 50,000 CG
            tokens
          </ListItem>
          <ListItem>
            <span style={{ color: "white" }}>Staking Duration:</span> Users can
            choose between different staking periods, such as 3 months, 6
            months, and 12 months.
          </ListItem>
          <ListItem>
            <span style={{ color: "white" }}>Staking Rewards:</span>
          </ListItem>
        </UnorderedList>

        {/* Table */}
        <TableContainer
          border="1px solid teal"
          w="fit-content"
          borderRadius="xl"
          ml="3"
        >
          <Table variant="simple" size="md">
            <Tbody textAlign="center">
              <Tr>
                <Td>3 Months</Td>
                <Td textAlign="center">5% APY</Td>
              </Tr>
              <Tr>
                <Td>6 Months</Td>
                <Td textAlign="center">10% APY</Td>
              </Tr>
              <Tr>
                <Td>12 Months</Td>
                <Td textAlign="center">14% APY</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>

      {/* Gradual Unstaking */}
      <RichText heading="Gradual Unstaking" arrow={false} w="4xl" />
      <Stack mx={40} mt={5} spacing={2}>
        <Text>
          To help maintain price stability and discourage large sell-offs,
          Spiniverse introduces a Gradual Unstaking process. Instead of
          releasing all your staked tokens and rewards at once, they will be
          distributed gradually over time. This approach minimizes the impact of
          large amounts of tokens entering the market at once, ensuring a more
          stable and balanced ecosystem.
        </Text>
        <Content
          heading="How It Works:"
          content="Let’s say you stake 50,000 CG tokens for 3 months. Under the gradual unstaking model, you won’t receive the full amount and rewards immediately when the staking period ends. Instead, your tokens and rewards will be released in portions over the next few months:"
        />
        {/* Bullets */}
        <UnorderedList spacing={5} ml={10}>
          <ListItem>
            <span style={{ color: "white" }}>
              End of 3 Months (Unstaking Time):
            </span>{" "}
            You’ll receive 12,500 CG tokens plus 25% of the rewards.
          </ListItem>
          <ListItem>
            <span style={{ color: "white" }}>1 Month Later:</span> Another
            12,500 CG tokens and 25% of the rewards will be released to you.
          </ListItem>
          <ListItem>
            <span style={{ color: "white" }}>2 Months Later:</span>You’ll
            receive another 12,500 CG tokens and 25% of the rewards
          </ListItem>
          <ListItem>
            <span style={{ color: "white" }}>3 Months Later: </span>Finally, the
            remaining 12,500 CG tokens and the last 25% of the rewards will be
            released.
          </ListItem>
        </UnorderedList>
        <Content content="This staggered release ensures that the market remains stable and the value of your tokens is preserved." />
      </Stack>
    </>
  );
};

export default StakingScreen;
