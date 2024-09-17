import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Image,
  ModalCloseButton,
  Text,
  Flex,
  Grid,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Link,
  Tr,
  Table,
  Thead,
  Th,
  Tbody,
  Td,
  Stack,
  Heading,
  Tooltip,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import html2canvas from "html2canvas";
import { Link as RouterLink } from "react-router-dom";
import { Connection, PublicKey } from "@solana/web3.js";
import {
  login,
  register,
  getUserDetails,
  updateSpins,
  listUsers,
} from "../actions/userActions";
import axios from "axios";
import SpinTracker from "../Components/SpinTracker";
import { IoChevronDown } from "react-icons/io5";
import {
  createOrUpdateReward,
  getRewardsByWalletAddress,
  getTodayRewardStats,
} from "../actions/rewardActions";
import { IoInformationCircleOutline } from "react-icons/io5";
import SpinComponent from "../Components/SpinComponent";
import ShareRewards from "../Components/ShareRewards";

const Wheel = () => {
  const [display, setDisplay] = useState("-");
  const [walletAddress, setWalletAddress] = useState("");
  const [isSpinDisabled, setSpinDisabled] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [screenshotUrl, setScreenshotUrl] = useState(null);
  const rewardRef = useRef(null);
  const wheelRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin || {});
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails || {});
  const { user } = userDetails;

  const rewardStatsToday = useSelector((state) => state.rewardStatsToday);
  const { loading, error, stats } = rewardStatsToday;

  // console.log(stats);

  useEffect(() => {
    dispatch(getTodayRewardStats());
  }, [dispatch]);

  const [rewardData, setRewardData] = useState({
    walletAddress: "",
    prizes: [
      {
        name: "", // Set the prize name here
        quantity: 0, // Set the initial quantity
        wonAt: new Date(), // Set the initial date when the prize is won
        isClaimed: false, // Set initial status of whether the prize is claimed
      },
      // You can add more prize objects if needed
    ],
    earnings: 0,
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedPrizes = [...rewardData.prizes];

    if (!updatedPrizes[index]) {
      updatedPrizes[index] = { name: "", qty: 0 }; // Ensure prize object exists
    }

    if (name === "prizeName") {
      updatedPrizes[index].name = value;
    } else if (name === "prizeQty") {
      updatedPrizes[index].qty = parseInt(value, 10);
    }

    setRewardData({ ...rewardData, prizes: updatedPrizes });
  };

  const handleSubmit = async () => {
    if (!selectedPrize) return;

    // Fetch existing rewards for the wallet address
    const existingRewardsResponse = await dispatch(
      getRewardsByWalletAddress(walletAddress)
    );
    const existingRewards = existingRewardsResponse?.payload || [];

    console.log(selectedPrize);

    // Prepare a new prizes array based on existing rewards
    const updatedPrizes =
      existingRewards.length > 0 ? [...existingRewards] : [];

    // Check if the prize already exists
    const existingPrizeIndex = updatedPrizes.findIndex(
      (prize) => prize.name === selectedPrize.name
    );

    if (existingPrizeIndex !== -1) {
      // If the prize exists, increment its quantity
      updatedPrizes[existingPrizeIndex].qty += 1; // Increment quantity
      updatedPrizes[existingPrizeIndex].wonAt = new Date();
    } else {
      // If the prize does not exist, add it to the prizes array with qty of 1
      updatedPrizes.push({
        name: selectedPrize.name,
        qty: 1,
        wonAt: new Date(),
        isClaimed: false,
      });
    }

    // Prepare the final reward data
    const finalRewardData = {
      ...rewardData,
      walletAddress: walletAddress,
      prizes: updatedPrizes,
    };

    // Dispatch action to create or update the reward in MongoDB
    await dispatch(createOrUpdateReward(finalRewardData, walletAddress));

    // Close the modal after submitting
    handleClose();
  };

  const handleWin = (actualDeg) => {
    const adjustedDeg = (actualDeg + 90) % 360;
    const segmentNumber = Math.floor(adjustedDeg / 45) + 1; // Determine which segment the wheel landed on
    const winningPrize = symbolSegments[segmentNumber]; // Get prize based on segment

    setDisplay(winningPrize);
    setSelectedPrize({ name: winningPrize, qty: 1 }); // Set selected prize

    setRewardData((prevData) => {
      const updatedPrizes = [...prevData.prizes]; // Create a copy of current prizes

      // Check if the prize already exists in the prizes array
      const existingPrizeIndex = updatedPrizes.findIndex(
        (prize) => prize.name === winningPrize
      );

      if (existingPrizeIndex !== -1) {
        // If the prize exists, increment its quantity
        updatedPrizes[existingPrizeIndex].qty += 1;
        updatedPrizes[existingPrizeIndex].wonAt = new Date();
        // Keep the existing wonAt and isClaimed values
      } else {
        // If the prize does not exist, add it to the prizes array with qty of 1
        updatedPrizes.push({
          name: winningPrize,
          qty: 1,
          wonAt: new Date(), // Set the date when the prize is won
          isClaimed: false, // Initial status of the prize
        });
      }

      return { ...prevData, prizes: updatedPrizes }; // Update the state with the new prizes array
    });

    onOpen(); // Open the modal or UI to show the prize
  };

  const alchemyApiKey = "3NfQ3MFPqhGdKfIID0Tp1Ig8_6S9irMN";

  const symbolSegments = {
    1: "5K BDOUGH Airdrop", // 0 degrees
    2: "5 Free spins at Freebitco.in", // 45 degrees
    3: "10K WHISK Airdrop", // 90 degrees
    4: "$10 Amazon Gift Card", // 135 degrees
    5: "Free Headphones", // 180 degrees
    6: "Better Luck Next Time", // 225 degrees
    7: "0.02 SOL", // 270 degrees
    8: "Free BTC at Bitstarz", // 315 degrees
  };

  const fetchTokenBalances = useCallback(
    async (walletAddress) => {
      const connection = new Connection(
        `https://solana-mainnet.g.alchemy.com/v2/${alchemyApiKey}`
      );
      const publicKey = new PublicKey(walletAddress);

      try {
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
          publicKey,
          {
            programId: new PublicKey(
              "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
            ),
          }
        );

        const tokenAddressesToCheck = [
          "EJBbh4xbAxE5CDNnr9jMcXTydjGJxazKB3ypLCmipump",
        ];
        let tokenBalance = 0;

        tokenAddressesToCheck.forEach((tokenAddress) => {
          const accountInfo = tokenAccounts.value.find(
            (account) => account.account.data.parsed.info.mint === tokenAddress
          );
          if (accountInfo) {
            tokenBalance +=
              accountInfo.account.data.parsed.info.tokenAmount.uiAmount;
          }
        });

        return tokenBalance;
      } catch (err) {
        console.error("Error fetching token balances", err);
        return 0;
      }
    },
    [alchemyApiKey]
  );

  const handleWalletConnect = useCallback(
    async (walletAddress) => {
      const tokenBalance = await fetchTokenBalances(walletAddress);
      const hasEnoughTokens = tokenBalance >= 10000;

      const freeSpins = hasEnoughTokens ? 4 : 1;
      await dispatch(register(walletAddress, freeSpins));
      await dispatch(getUserDetails(walletAddress));
      // await dispatch(createOrUpdateReward(rewardData, walletAddress));
    },
    [fetchTokenBalances, dispatch]
  );

  useEffect(() => {
    const checkPhantomInstallation = async () => {
      const isPhantomInstalled = window.solana && window.solana.isPhantom;
      if (!isPhantomInstalled) {
        alert("Phantom Wallet is not installed");
      } else {
        const savedWalletAddress = localStorage.getItem("walletAddress");
        if (savedWalletAddress) {
          setWalletAddress(savedWalletAddress);
          setIsConnected(true);
          await handleWalletConnect(savedWalletAddress);
        }
      }
    };
    checkPhantomInstallation();
  }, [handleWalletConnect]);

  useEffect(() => {
    setSpinDisabled(!isConnected || user?.spins <= 0);
  }, [isConnected, user]);

  const connectWallet = async () => {
    if (isConnected) {
      setWalletAddress("");
      setIsConnected(false);
      localStorage.removeItem("walletAddress");
    } else {
      try {
        const resp = await window.solana.connect();
        const walletAddress = resp.publicKey.toString();
        setWalletAddress(walletAddress);
        setIsConnected(true);
        localStorage.setItem("walletAddress", walletAddress);
        await handleWalletConnect(walletAddress);
      } catch (err) {
        console.error("Error connecting to Phantom Wallet", err);
      }
    }
  };

  const spinWheel = () => {
    setDisplay("-");
    wheelRef.current.style.pointerEvents = "none";

    const newDeg = Math.floor(2000 + Math.random() * 2000);
    const adjustedDeg = newDeg % 360;
    const finalDeg = Math.round(adjustedDeg / 45) * 45;
    const totalRotation = newDeg - adjustedDeg + finalDeg;

    wheelRef.current.style.transition = "all 10s ease-in-out";
    wheelRef.current.style.transform = `rotate(${totalRotation}deg)`;

    wheelRef.current.addEventListener(
      "transitionend",
      async () => {
        wheelRef.current.style.pointerEvents = "auto";
        setTimeout(async () => {
          handleWin(finalDeg);
          await dispatch(updateSpins(walletAddress));
          await dispatch(getUserDetails(walletAddress));
          await dispatch(listUsers());
        }, 1000);
      },
      { once: true }
    );
  };

  const shareMessage = selectedPrize
    ? `🎉 I just won ${selectedPrize.qty} of ${selectedPrize.name} on Spiniverse! 🎁💰\n\n#Spiniverse #Rewards\nCheck it out: ${screenshotUrl}`
    : `I just won an awesome prize on Spiniverse! 🎁💰 #Spiniverse #Rewards`;

  const encodedShareMessage = encodeURIComponent(shareMessage);
  // Create share URLs that include the image
  // Create share URLs that include the message
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=&quote=${encodedShareMessage}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedShareMessage}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedShareMessage}`;

  const resetWheel = () => {
    if (wheelRef.current) {
      wheelRef.current.style.transition = "none";
      wheelRef.current.style.transform = `rotate(0deg)`;
      setTimeout(() => {
        wheelRef.current.style.transition = "all 10s ease-in-out";
      }, 500);
    }
  };

  const handleClose = () => {
    resetWheel();
    onClose();
  };

  return (
    <>
      <Flex justifyContent="flex-end" py="5" px={10}>
        {isConnected ? (
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<IoChevronDown />}
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
              size={{ base: "md", md: "md", lg: "lg" }}
              isTruncated
            >
              <Text w="6.6rem" isTruncated>
                {user.name ? user.name : user.walletAddress}
              </Text>
            </MenuButton>
            <MenuList
              color="rgb(242, 240, 245)"
              border="1px solid rgb(140, 65, 245)"
              backgroundColor="rgb(59, 9, 128)"
              borderRadius="16px"
              boxShadow="rgba(111, 17, 242, 0.25) 0px 12px 16px 0px"
              opacity="1"
              fontSize="1.2rem"
            >
              <MenuItem
                as={RouterLink}
                to="/profile"
                backgroundColor="rgb(59, 9, 128)"
              >
                Profile
              </MenuItem>
              {/* <MenuDivider /> */}
              <MenuItem
                backgroundColor="rgb(59, 9, 128)"
                onClick={connectWallet}
              >
                Disconnect
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button
            onClick={connectWallet}
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
            size={{ base: "md", md: "md", lg: "lg" }}
          >
            Connect Wallet
          </Button>
        )}
      </Flex>
      <Grid
        templateColumns="repeat(2, 1fr)"
        bgPosition="center"
        bgImage="url('../assets/bg.jpg')"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={10}
          gap={5}
        >
          <Box display="flex" flexDirection="row" alignItems="center" gap={3}>
            <SpinComponent />
          </Box>

          <Box
            position="relative"
            w="500px"
            h="500px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              ref={wheelRef}
              src="../assets/prizewheel.png"
              alt="Wheel"
              width="100%"
              height="100%"
            />
            <Image
              src="../assets/marker.png"
              alt="Marker"
              position="absolute"
              width="100%"
              zIndex="1"
            />
          </Box>

          <Box
            as="button"
            position="relative"
            display="inline-block"
            bg="transparent"
            p="0"
            cursor="pointer"
            outlineOffset="4px"
            transition="filter 250ms"
            userSelect="none"
            _hover={{
              filter: "brightness(110%)",
            }}
          >
            <Box
              position="absolute"
              top="0"
              left="0"
              w="100%"
              h="100%"
              borderRadius="12px"
              bg="blackAlpha.400"
              transform="translateY(2px)"
              transition="transform 600ms cubic-bezier(.3, .7, .4, 1)"
              _hover={{
                transform: "translateY(4px)",
                transition: "transform 250ms cubic-bezier(.3, .7, .4, 1.5)",
              }}
              _active={{
                transform: "translateY(1px)",
                transition: "transform 34ms",
              }}
            />

            <Box
              position="absolute"
              top="0"
              left="0"
              w="100%"
              h="100%"
              borderRadius="12px"
              bg="linear-gradient( to left, hsl(340, 100%, 16%) 0%, hsl(340, 100%, 32%) 8%, hsl(340, 100%, 32%) 92%, hsl(340, 100%, 16%) 100% )"
            />

            <Button
              onClick={spinWheel}
              position="relative"
              display="block"
              px={{ base: "12px 27px", md: "10" }}
              borderRadius="12px"
              fontSize={{ base: "1.1rem", md: "3xl" }}
              size="lg"
              color="#f4bb1b"
              bgGradient="linear-gradient(135deg, #460036, #5c403c, #f4bb1b)"
              transform="translateY(-4px)"
              transition="transform 600ms cubic-bezier(.3, .7, .4, 1)"
              _hover={{
                transform: "translateY(-6px)",
                transition: "transform 250ms cubic-bezier(.3, .7, .4, 1.5)",
              }}
              _active={{
                transform: "translateY(-2px)",
                transition: "transform 34ms",
              }}
              isDisabled={!isConnected || user?.spins === 0} // Disable if not connected or spins are 0
            >
              {"SPIN"}
            </Button>
          </Box>

          <Modal isOpen={isOpen} onClose={handleClose} size="full">
            <ModalOverlay />
            <ModalContent
              bgImage="url(../assets/prizebg.png)"
              bgSize="contain"
              bgRepeat="no-repeat"
              bgPosition="center"
              bgColor="transparent"
            >
              <ModalHeader>
                <ModalCloseButton />
              </ModalHeader>
              <ModalBody
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Text
                  position="fixed"
                  fontSize="4xl"
                  color="white"
                  textShadow="0 0 7px #fff, 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135"
                  textAlign="center"
                >
                  {display}
                </Text>
                <Link as={RouterLink} to="/profile">
                  <Button
                    position="relative"
                    top={32}
                    size="lg"
                    fontSize="3xl"
                    bgColor="transparent"
                    _hover={{ bgColor: "transparent" }}
                    letterSpacing="widest"
                    color="#460036"
                    py="12"
                    px="40"
                    onChange={handleChange}
                    onClick={handleSubmit}
                  >
                    Claim Reward
                  </Button>
                </Link>
              </ModalBody>
              <ModalFooter my="5"></ModalFooter>
              <Flex justify="center" align="center" marginTop="10px">
                <Button
                  as="a"
                  href={facebookShareUrl}
                  target="_blank"
                  margin="5px"
                  colorScheme="facebook"
                  rel="noopener noreferrer"
                >
                  Share on Facebook
                </Button>
                <Button
                  as="a"
                  href={twitterShareUrl}
                  target="_blank"
                  margin="5px"
                  colorScheme="twitter"
                  rel="noopener noreferrer"
                >
                  Share on Twitter
                </Button>
                <Button
                  as="a"
                  href={linkedinShareUrl}
                  target="_blank"
                  margin="5px"
                  colorScheme="linkedin"
                  rel="noopener noreferrer"
                >
                  Share on LinkedIn
                </Button>
              </Flex>
            </ModalContent>
            {/* <ShareRewards /> */}
          </Modal>
        </Box>
        <Box>
          <SpinTracker />
        </Box>
      </Grid>
      <Box>
        <Flex
          bg="rgba(59, 9, 128,0.1)"
          backdropFilter="blur(5px)"
          border="1px solid rgba(255, 255, 255, 0.1)"
          boxShadow="rgba(111, 17, 242, 0.25) 0px 12px 16px 0px"
          borderRadius="3xl"
          p="5"
          mx="20"
          my={10}
          color="white"
        >
          <Stack spacing={4} w="100%">
            <Heading
              textAlign="center"
              size="lg"
              bgGradient="linear(to-l, rgba(111, 17, 242, 1) 0%, rgba(210, 181, 251, 1) 45%, rgba(242, 240, 245, 1) 49%)"
              bgClip="text"
              color="transparent" // Ensures text is transparent for gradient effect
            >
              Daily Stats
            </Heading>
            <Table variant="unstyled" size="md">
              <Thead>
                <Tr>
                  <Th
                    justifyContent="space-between"
                    fontWeight="bold"
                    color="#a590c1"
                    paddingY={4}
                    fontSize="md"
                  >
                    Reward
                  </Th>
                  <Th
                    justifyContent="space-between"
                    fontWeight="bold"
                    color="#a590c1"
                    paddingY={4}
                    fontSize="md"
                  >
                    Times Won
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {stats && stats.length > 0 ? (
                  stats.map((stat) => (
                    <Tr key={stat._id}>
                      <Td>{stat._id}</Td>
                      <Td>{stat.count}</Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={2}>No rewards played today</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </Stack>
        </Flex>
      </Box>
    </>
  );
};

export default Wheel;
