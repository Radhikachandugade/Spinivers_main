import {
  Button,
  Divider,
  Flex,
  Image,
  keyframes,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import OutlineButton from "./OutlineButton";
import { useState, useCallback, useEffect } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import { IoChevronDown } from "react-icons/io5";
import MenuLink from "./MenuLink";
import { useDispatch, useSelector } from "react-redux";
import {
  register,
  getUserDetails,
  resetFreeSpins,
} from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const userDetails = useSelector((state) => state.userDetails || {});
  const { user } = userDetails;

  const [walletAddress, setWalletAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);

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
      try {
        // Fetch user details again after resetting spins
        await dispatch(getUserDetails(walletAddress));
      } catch (error) {
        console.error(
          "Error during wallet connection or user registration: ",
          error
        );
      }
    },
    [dispatch]
  );
  const handleResetFreeSpins = useCallback(
    async (walletAddress) => {
      try {
        const currentTime = new Date();
        const user = await dispatch(getUserDetails(walletAddress));

        if (
          !user?.nextSpinTime ||
          new Date(user?.nextSpinTime) <= currentTime
        ) {
          const tokenBalance = await fetchTokenBalances(walletAddress);
          const hasEnoughTokens = tokenBalance >= 10000;
          const freeSpins = hasEnoughTokens ? 4 : 1;

          // Reset free spins with the calculated count
          await dispatch(resetFreeSpins(walletAddress, freeSpins));
        }
      } catch (error) {
        console.error("Error resetting free spins: ", error);
      }
    },
    [dispatch, user?.nextSpinTime]
  );
  // Function to register user
  const handleRegister = useCallback(
    async (walletAddress) => {
      try {
        const user = await dispatch(getUserDetails(walletAddress));

        if (!user && isConnected) {
          const tokenBalance = await fetchTokenBalances(walletAddress);
          const hasEnoughTokens = tokenBalance >= 10000;
          const initialFreeSpins = hasEnoughTokens ? 4 : 1;

          // Register the user with the calculated initial free spins
          await dispatch(register(walletAddress, initialFreeSpins));
        }
      } catch (error) {
        console.error("Error registering user: ", error);
      }
    },
    [dispatch, isConnected]
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
    const checkPhantomInstallation = async () => {
      const isPhantomInstalled = window.solana && window.solana.isPhantom;
      if (!isPhantomInstalled) {
        alert("Phantom Wallet is not installed");
      } else {
        const savedWalletAddress = localStorage.getItem("walletAddress");
        if (savedWalletAddress) {
          setWalletAddress(savedWalletAddress);
          setIsConnected(true);

          // Parallelize the calls for efficiency
          await Promise.all([
            handleWalletConnect(savedWalletAddress),
            handleResetFreeSpins(savedWalletAddress),
            handleRegister(savedWalletAddress),
          ]);
        }
      }
    };

    checkPhantomInstallation();
  }, [handleWalletConnect, handleResetFreeSpins, handleRegister]);

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
  const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;
  return (
    <>
      {/* Fixed Header */}
      <Flex
        justifyContent="space-between"
        alignItems="center"
        px={{ base: 5, md: 10, lg: 7 }}
        position="fixed"
        top="0"
        width="100%"
        bgColor="rgba(5,0,10,0.5)"
        backdropFilter="blur(10px)"
        zIndex="1000"
        boxShadow="md"
        borderBottom="1px solid rgba(42, 35, 53,0.5)"
      >
        <Link
          to="/"
          as={RouterLink}
          onClick={() => {
            window.scrollTo({ top: "0", behavior: "auto" });
          }}
        >
          <Image
            src="../assets/logo.png"
            height={{ base: "40px", md: "50px" }}
          />
        </Link>
        <Flex gap={10} color="#F2F0F5" display={{ base: "none", md: "flex" }}>
          <MenuLink url="/roadmap" label="Roadmap" />
          {/* Menu */}
          <Popover trigger="hover" placement="bottom-start">
            <PopoverTrigger>
              <Flex alignItems="center" gap={2}>
                <MenuLink url="" label="Native Token" />
                <IoChevronDown />
              </Flex>
            </PopoverTrigger>
            <PopoverContent
              bgColor="rgb(5, 0, 10)"
              w="fit-content"
              border="1px solid #ffffff2a"
            >
              <PopoverBody>
                <Flex direction="column" gap="2" w="3xs">
                  <MenuLink url="/tokenomics" label="Tokenomics" />
                  <Divider borderColor="#ffffff1a" />
                  <MenuLink url="" label="Presale" />
                  <Divider borderColor="#ffffff1a" />
                  <MenuLink url="/utility" label="Utility" />
                  <Divider borderColor="#ffffff1a" />
                  <MenuLink url="/staking" label="Staking" />
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <MenuLink url="" label="Whitepaper" />
          <MenuLink url="/contact" label="Contact" />
        </Flex>

        <Flex justifyContent="flex-end" py="5" gap={5} alignItems="center">
          <Link to="/wheel" as={RouterLink}>
            <Image
              src="../assets/wheel-icon.png"
              height={{ base: "20px", md: "40px" }}
              animation={`${rotate} 2s linear infinite`}
            />
          </Link>
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
                  {user?.name ? user?.name : user?.walletAddress}
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
              _hover={{
                boxShadow: "0 0 21px 0 #4479e2",
                bgColor: "transparent",
              }}
              _active="none"
              transition="ease"
              fontSize="1.2rem"
              size={{ base: "md", md: "md", lg: "lg" }}
            >
              Connect Wallet
            </Button>
          )}
        </Flex>
        {/* <OutlineButton title="Connect Wallet" /> */}
      </Flex>
    </>
  );
};

export default Header;
