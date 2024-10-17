import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useTransition,
} from "react";
import {
  Box,
  Button,
  useDisclosure,
  Image,
  Text,
  Flex,
  Grid,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
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
import WheelComponent from "../Components/WheelComponent";
import { Link as RouterLink } from "react-router-dom";
import { Connection, PublicKey } from "@solana/web3.js";
import {
  login,
  register,
  getUserDetails,
  updateSpins,
  resetFreeSpins,
} from "../actions/userActions";
import SpinTracker from "../Components/SpinTracker";
import { IoChevronDown } from "react-icons/io5";
import { getTodayRewardStats } from "../actions/rewardActions";
import { IoInformationCircleOutline } from "react-icons/io5";
import SpinComponent from "../Components/SpinComponent";
import RewardSharing from "../Components/RewardSharing";

const Wheel = () => {
  const [display, setDisplay] = useState("-");
  const [walletAddress, setWalletAddress] = useState("");
  const [isSpinDisabled, setSpinDisabled] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const canvasRef = useRef(null);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [screenshotUrl, setScreenshotUrl] = useState(null);
  const rewardRef = useRef(null);
  const wheelRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();

  const data = [
    { option: "WHISK Airdrop" },
    { option: "CG Tokens Airdrop" },
    { option: "Hardware Wallet" },
    { option: "Solana Airdrops" },
    { option: "Exclusive NFTs" },
    { option: "Better Luck Next Time" },
    { option: "SLAPHERO Airdrop" },
    { option: "HTH Airdrop" },
    { option: "Amazon Gift Card" },
    { option: "Maestro Bot Subscription " },
  ];

  const userLogin = useSelector((state) => state.userLogin || {});
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails || {});
  const { user } = userDetails;

  const rewardStatsToday = useSelector((state) => state.rewardStatsToday);
  const { stats } = rewardStatsToday;

  // const [nextSpin, setNextSpin] = useState(user?.nextSpinTime || null);
  // console.log(nextSpin);

  const freeSpins = useSelector((state) => state.freeSpins);
  const { resetfreeSpins = 0, nextSpinTime = null } = freeSpins || {};

  const alchemyApiKey = "3NfQ3MFPqhGdKfIID0Tp1Ig8_6S9irMN";

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
      // Fetch the user's details from the backend (including nextSpinTime)
      const user = await dispatch(getUserDetails(walletAddress));

      // Check if free spins need to be reset
      const currentTime = new Date();
      if (!user?.nextSpinTime || new Date(user?.nextSpinTime) <= currentTime) {
        // Fetch token balance and decide the reset free spins count based on token balance
        const tokenBalance = await fetchTokenBalances(walletAddress);
        const hasEnoughTokens = tokenBalance >= 10000;
        const freeSpins = hasEnoughTokens ? 4 : 1;

        // Call the backend to reset free spins with the calculated count
        await dispatch(resetFreeSpins(walletAddress, freeSpins));
      }

      // Fetch user details again after resetting spins
      await dispatch(getUserDetails(walletAddress));
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

  // useEffect(() => {
  //   if (nextSpin === null) {
  //     const init = async () => {
  //       const savedWalletAddress = localStorage.getItem("walletAddress");
  //       if (savedWalletAddress) {
  //         console.log("Calling handleWalletConnect with:", savedWalletAddress);
  //         await handleWalletConnect(savedWalletAddress);
  //       }
  //     };
  //     init();
  //   }
  // }, [nextSpin, handleWalletConnect]);

  useEffect(() => {
    setSpinDisabled(!isConnected || user?.spins <= 0);
  }, [isConnected, user]);

  useEffect(() => {
    dispatch(getTodayRewardStats());
  }, [dispatch]);

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
  return (
    <>
      <Box
        objectFit="cover"
        backgroundRepeat="no-repeat"
        // bgImage="url('../assets/82666.jpg')"
      >
        <Flex
          justifyContent="flex-end"
          py="5"
          px={10}
          // bgImage="url('../assets/82666.jpg')"
        >
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
          templateColumns="2fr 1fr"
          gap={4} // Optional: Adds space between the columns
          bgPosition="center"
        >
          {/* First Column - SpinComponent and WheelComponent */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            p={10}
            gap={7} // Adjust spacing as needed
          >
            <Box display="flex" flexDirection="row" alignItems="center" gap={3}>
              <SpinComponent
                walletAddress={walletAddress}
                isConnected={isConnected}
              />
            </Box>
            <Box
              position="relative"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <WheelComponent
                walletAddress={walletAddress}
                isConnected={isConnected}
                setSpinDisabled={setSpinDisabled}
                ref={wheelRef}
                width="500"
                height="500"
              />
              <Tooltip
                label="Know more about Rewards"
                hasArrow
                arrowSize={8}
                bg="rgba(0, 0, 0, 0.8)"
                backdropFilter="blur(5px)"
                border="1px solid rgba(255,255,255,0.1)"
                boxShadow="rgba(111, 17, 242, 0.25) 0px 12px 16px 0px"
                borderRadius="20"
                placement="right" // Adjust placement to position tooltip on the right of the wheel
              >
                <span
                  style={{
                    position: "absolute",
                    top: "0%",
                    right: "-30px",
                    fontSize: "25px",
                  }}
                >
                  <IoInformationCircleOutline />
                </span>
              </Tooltip>
            </Box>
          </Box>

          {/* Second Column - SpinTracker */}
          <Box display="flex" alignItems="center" justifyContent="center">
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
      </Box>
    </>
  );
};

export default Wheel;
