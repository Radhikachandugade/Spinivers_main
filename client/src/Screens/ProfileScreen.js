import {
  Avatar,
  Box,
  Divider,
  Flex,
  Icon,
  Stack,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  WrapItem,
  Td,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import RichText from "../Components/RichText";
import { HiCurrencyDollar } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { getRewardsByWalletAddress } from "../actions/rewardActions";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import { FlatTree } from "framer-motion";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails || {});
  const { user } = userDetails;
  const reward = useSelector((state) => state.reward);
  const { rewards } = reward;

  const [name, setName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State for toggling edit mode
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchRewards = async () => {
      await dispatch(getRewardsByWalletAddress(walletAddress));
    };
    fetchRewards();
  }, [dispatch, walletAddress, rewards]);

  useEffect(() => {
    if (!user.name) {
      const savedWalletAddress = localStorage.getItem("walletAddress");
      dispatch(getUserDetails(savedWalletAddress));
      setWalletAddress(savedWalletAddress);
      dispatch(getRewardsByWalletAddress(savedWalletAddress));
    } else {
      setName(user.name || "");
      setWalletAddress(user.walletAddress || "");
    }
  }, [dispatch, user]);

  const handleNameChange = (e) => {
    setName(e.target.value);
    setIsChanged(e.target.value !== user.name);
  };

  const handleSaveChanges = async () => {
    if (isChanged) {
      setIsSaving(true); // Start saving
      await dispatch(updateUserProfile(walletAddress, name));
      setIsChanged(false);
      setIsSaving(false); // End saving
    }
    toast({
      position: "top",
      render: () => (
        <Flex
          backgroundColor="rgba(59, 9, 128,0.5)"
          boxShadow="rgba(111, 17, 242, 0.25) 0px 12px 16px 0px"
          border="1px solid rgba(255,255,255,0.2)"
          color="white"
          p="2"
          borderRadius="2xl"
          justifyContent="center"
          alignItems="center"
          gap={3}
        >
          <Icon as={FaCheckCircle} color="lightgreen" boxSize={5} />
          <Text>User name updated</Text>
        </Flex>
      ),
      duration: 2000,
    });

    setIsEditing(false); // Close form after saving
  };
  const handleBack = () => {
    setIsEditing(false); // Close edit form and return to profile view
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // Handle missing date
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Invalid Date"
      : date.toISOString().split("T")[0];
  };
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      p={20}
      gap={20}
    >
      {/* Profile Details */}
      <Stack
        w="full"
        p={10}
        spacing={5}
        bgImage="url(../assets/profileBg.jpg)"
        boxShadow="rgba(200, 200, 200, 0.16) 0px 3px 6px, rgba(200, 200, 200, 0.23) 0px 3px 6px;"
        borderRadius="3xl"
      >
        {!isEditing ? (
          <Flex alignItems="center" gap="5">
            <WrapItem>
              <Avatar name={walletAddress} />
            </WrapItem>
            <Stack>
              <Text>{walletAddress}</Text>

              <Button
                type="submit"
                width="fit-content"
                color="rgb(242, 240, 245)"
                border="1px solid rgb(140, 65, 245)"
                backgroundColor="rgb(59, 9, 128)"
                borderRadius="16px"
                boxShadow="rgba(111, 17, 242, 0.25) 0px 12px 16px 0px"
                opacity="1"
                _hover="none"
                _active="none"
                fontSize="1.2rem"
                size={{ base: "sm", md: "sm", lg: "sm" }}
                leftIcon={<FaEdit />}
                colorScheme="teal"
                variant="outline"
                onClick={() => setIsEditing(true)} // Open the edit form
              >
                Edit Profile
              </Button>
            </Stack>
          </Flex>
        ) : (
          <form style={{ width: "100%" }} onSubmit={handleSaveChanges}>
            <Stack alignItems="center" width="100%" spacing={10}>
              <Flex gap="20%" width="100%">
                <FormControl id="name">
                  <FormLabel>Your Name</FormLabel>
                  <Input
                    id="name"
                    variant="filled"
                    placeholder="Enter your name"
                    value={name}
                    onChange={handleNameChange}
                    size="lg"
                    fontSize="md"
                    bg="#011627"
                    border="1px solid rgb(42, 35, 53)"
                    _focus={{ border: "1px solid #bf96fa" }}
                    _hover={{ border: "1px solid rgb(42, 35, 53)" }}
                  />
                </FormControl>
                <FormControl id="wallet">
                  <FormLabel>Wallet Address</FormLabel>
                  <Input
                    isReadOnly
                    id="wallet"
                    variant="filled"
                    value={walletAddress}
                    placeholder="Wallet Address"
                    size="lg"
                    fontSize="md"
                    bg="#011627"
                    border="1px solid rgb(42, 35, 53)"
                    _focus={{ border: "1px solid #bf96fa" }}
                    _hover={{ border: "1px solid rgb(42, 35, 53)" }}
                  />
                </FormControl>
              </Flex>
              <Flex alignItems="center" gap="5">
                <Button
                  type="submit"
                  isDisabled={!isChanged}
                  width="fit-content"
                  variant="solid"
                  color="rgb(242, 240, 245)"
                  border="1px solid rgb(140, 65, 245)"
                  backgroundColor="rgb(59, 9, 128)"
                  borderRadius="16px"
                  boxShadow="rgba(111, 17, 242, 0.25) 0px 12px 16px 0px"
                  opacity="1"
                  _hover="none"
                  _active="none"
                  fontSize="1.2rem"
                  size={{ base: "sm", md: "sm", lg: "sm" }}
                >
                  Save Changes
                </Button>
                <Button
                  type="button"
                  width="fit-content"
                  variant="outline"
                  color="rgb(242, 240, 245)"
                  border="1px solid rgb(140, 65, 245)"
                  backgroundColor="rgb(59, 9, 128)"
                  borderRadius="16px"
                  boxShadow="rgba(111, 17, 242, 0.25) 0px 12px 16px 0px"
                  opacity="1"
                  _hover="none"
                  _active="none"
                  fontSize="1.2rem"
                  size={{ base: "sm", md: "sm", lg: "sm" }}
                  onClick={handleBack} // Close form and go back
                >
                  Back
                </Button>
              </Flex>
            </Stack>
          </form>
        )}

        <Divider borderColor="#ffffff5a" />
        <Flex justifyContent="space-between">
          <Stack direction="row">
            <Text>Total Earnings: </Text>
            <Stack direction="row" alignItems="center">
              <HiCurrencyDollar color="lightgreen" size="20" />
              <Text>0</Text>
            </Stack>
          </Stack>

          <Text>Registered: {formatDate(user?.createdAt)}</Text>
        </Flex>
      </Stack>

      {/* Rewards Table */}
      <Flex direction="column" alignItems="center" w="100%" gap={5}>
        <RichText title="DASHBOARD" heading="My Rewards" />
        <Box
          bgColor="transparent"
          rounded="lg"
          shadow="lg"
          px="5"
          py="5"
          w="100%"
        >
          <Table variant="unstyled" size="sm">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>DATE</Th>
                <Th>REWARD</Th>
                <Th>QUANTITY</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Array.isArray(rewards) && rewards.length > 0 ? (
                rewards.map((reward) =>
                  reward.prizes.map((prize) => (
                    <Tr key={`${reward._id}-${prize._id}`}>
                      <Td>{prize._id}</Td>
                      <Td>{new Date(prize.wonAt).toLocaleDateString()}</Td>
                      <Td>{prize.name}</Td>
                      <Td>
                        {prize.name === "Better Luck Next Time" ? null : (
                          <Text>{prize.qty}</Text>
                        )}
                      </Td>
                    </Tr>
                  ))
                )
              ) : (
                <Tr>
                  <Td colSpan={4} textAlign="center">
                    No rewards found.
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </Flex>
  );
};

export default ProfileScreen;
