import {
  Divider,
  Flex,
  Heading,
  Progress,
  Stack,
  Text,
  Tooltip,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../actions/userActions";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FulfillingBouncingCircleSpinner } from "react-epic-spinners";

const SpinTracker = () => {
  const [totalSpins, setTotalSpins] = useState(0);
  const targetSpins = 1000;

  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList || {});
  const { users, loading, error } = userList;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users) {
      const total = users.reduce((acc, user) => acc + user.playedSpins, 0);
      setTotalSpins(total);
    }
  }, [users]);

  const topContributors = users
    ? [...users].sort((a, b) => b.playedSpins - a.playedSpins).slice(0, 5)
    : [];

  return (
    <>
      <Flex
        bg="rgb(59, 9, 128,0.3)"
        backdropFilter="blur(5px)"
        border="1px solid rgba(255,255,255,0.1)"
        boxShadow="rgba(111, 17, 242, 0.25) 0px 12px 16px 0px"
        borderRadius="3xl"
        p="5"
        direction="column"
        mx="10"
        my={10}
        color="white"
      >
        <Stack p={5} spacing={5}>
          <Box display="flex" flexDirection="row" alignItems="center" gap={3}>
            <Text fontSize="xl" fontWeight="semibold">
              0.5% Token Burn on {targetSpins} Spins
            </Text>
            <Tooltip
              label="Know more about Burn mechanism"
              hasArrow
              arrowSize={8}
              bg="rgba(0, 0, 0, 0.8)"
              backdropFilter="blur(5px)"
              border="1px solid rgba(255,255,255,0.1)"
              boxShadow="rgba(111, 17, 242, 0.25) 0px 12px 16px 0px"
              borderRadius="20"
            >
              <span>
                <IoInformationCircleOutline />
              </span>
            </Tooltip>
          </Box>

          <Progress
            value={totalSpins}
            size="xs"
            colorScheme="purple"
            bgGradient="linear-gradient(to right, #83a4d4, #b6fbff);"
            max={targetSpins}
          />
          <Text textAlign="center">
            {totalSpins} / {targetSpins} Spins
          </Text>
        </Stack>
        <Divider py={2} />
        <Stack p={5} spacing={5}>
          <Heading
            as="h3"
            textAlign="center"
            size="lg"
            bgGradient="linear(to-l, rgba(111, 17, 242, 1) 0%, rgba(210, 181, 251, 1) 45%, rgba(242, 240, 245, 1) 49%)"
            bgClip="text"
          >
            Top Contributors
          </Heading>
          <Flex
            justifyContent="space-between"
            fontWeight="bold"
            color="#a590c1"
          >
            <Text>User</Text>
            <Text> Spins</Text>
          </Flex>
          {loading ? (
            <FulfillingBouncingCircleSpinner size={40} color="#a590c1" />
          ) : error ? (
            <Text textAlign="center" color="red">
              {error}
            </Text>
          ) : (
            topContributors.map((user, index) => (
              <Flex justifyContent="space-between" key={index}>
                <Text isTruncated maxW="200px">
                  {user.name ? user.name : user.walletAddress}
                </Text>
                <Text>{user.playedSpins}</Text>
              </Flex>
            ))
          )}
        </Stack>
      </Flex>
    </>
  );
};

export default SpinTracker;
