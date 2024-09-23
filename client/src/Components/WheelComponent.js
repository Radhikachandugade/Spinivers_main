import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRewardsByWalletAddress,
  createOrUpdateReward,
} from "../actions/rewardActions";
import {
  getUserDetails,
  updateSpins,
  listUsers,
  userConnectionStatus,
} from "../actions/userActions";
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Link,
  Text,
  Flex,
  Box,
  Image,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import RewardSharing from "../Components/RewardSharing";
import { getTodayRewardStats } from "../actions/rewardActions";
// import useSpinDisabled from "../Screens/Wheel";

const WheelComponent = () => {
  const [display, setDisplay] = useState("-");
  const [selectedPrize, setSelectedPrize] = useState(null);
  const wheelRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [walletAddress, setWalletAddress] = useState("");

  // const [isSpinDisabled, setSpinDisabled] = useState(true);
  const rewardRef = useRef(null);

  const userLogin = useSelector((state) => state.userLogin || {});
  const { userInfo } = userLogin;

  const [isConnected, setIsConnected] = useState(true);

  const userDetails = useSelector((state) => state.userDetails || {});
  const { user } = userDetails;

  const useSpinDisabled = (isConnected) => {
    const userDetails = useSelector((state) => state.userDetails || {});
    const { user } = userDetails;

    const [isDisabled, setIsDisabled] = useState(
      !isConnected || user?.spins <= 0
    );

    useEffect(() => {
      setIsDisabled(!isConnected || user?.spins <= 0);
    }, [isConnected, user]);

    return isDisabled;
  };
  // const isSpinDisabled = useSpinDisabled(isConnected, user);

  const oddGradientColors = ["#5D26C1", "#a17fe0"];
  const evenGradientColors = ["#373B44", "#4286f4"];

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

  useEffect(() => {
    drawWheel();
    const savedWalletAddress = localStorage.getItem("walletAddress");
    setWalletAddress(savedWalletAddress);
  }, [data]);

  const drawWheel = () => {
    const canvas = wheelRef.current;
    const ctx = canvas.getContext("2d");
    const numSegments = data.length;
    const canvasSize = 500;
    const radius = canvasSize / 2;
    const segmentAngle = (2 * Math.PI) / numSegments;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.shadowBlur = 15;
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";

    data.forEach((segment, index) => {
      const startAngle = segmentAngle * index;
      const endAngle = segmentAngle * (index + 1);
      const gradientColors =
        index % 2 === 0 ? evenGradientColors : oddGradientColors;

      const gradient = ctx.createRadialGradient(
        radius,
        radius,
        radius * 0.2,
        radius,
        radius,
        radius
      );
      gradient.addColorStop(0, gradientColors[0]);
      gradient.addColorStop(1, gradientColors[1]);

      ctx.beginPath();
      ctx.arc(radius, radius, radius, startAngle, endAngle);
      ctx.arc(radius, radius, radius * 0.2, endAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.save();
      ctx.translate(radius, radius);
      ctx.rotate(startAngle + segmentAngle / 2);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 14px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(segment.option, radius * 0.55, 0);
      ctx.restore();
    });

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 4;
    data.forEach((_, index) => {
      const angle = segmentAngle * index;
      const innerX = radius * 0.2 * Math.cos(angle);
      const innerY = radius * 0.2 * Math.sin(angle);
      const outerX = radius * Math.cos(angle);
      const outerY = radius * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(radius + innerX, radius + innerY);
      ctx.lineTo(radius + outerX, radius + outerY);
      ctx.stroke();
    });

    const drawBorder = (size, gradientColors, width) => {
      ctx.beginPath();
      ctx.arc(radius, radius, size, 0, 2 * Math.PI);
      ctx.lineWidth = width;

      const borderGradient = ctx.createLinearGradient(0, radius, 500, radius);
      gradientColors.forEach(([stop, color]) =>
        borderGradient.addColorStop(stop, color)
      );

      ctx.strokeStyle = borderGradient;
      ctx.stroke();

      ctx.save();
      ctx.beginPath();
      ctx.arc(radius, radius, size, 0, 2 * Math.PI);
      ctx.lineWidth = width;

      const shadowGradient = ctx.createRadialGradient(
        radius,
        radius,
        size + 3,
        radius,
        radius,
        size
      );
      shadowGradient.addColorStop(0, "rgba(0, 0, 0, 0.3)");
      shadowGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.strokeStyle = shadowGradient;
      ctx.stroke();
      ctx.restore();
    };

    drawBorder(
      radius - 5,
      [
        [0, "#FFEBA1"],
        [0.05, "#FFEC85"],
        [0.1, "#ED8F03"],
        [0.15, "#FFD700"],
        [0.2, "#FFD700"],
        [0.3, "#ED8F03"],
        [0.4, "#FFD700"],
        [0.5, "#FFD700"],
        [0.6, "#ED8F03"],
        [0.65, "#FFEC85"],
        [0.75, "#FFEBA1"],
        [0.85, "#ED8F03"],
        [1, "#FFEBA1"],
      ],
      11
    );

    drawBorder(
      radius * 0.2 - 4,
      [
        [0, "#FFEBA1"],
        [0.05, "#FFEC85"],
        [0.1, "#ED8F03"],
        [0.15, "#FFD700"],
        [0.2, "#FFD700"],
        [0.3, "#ED8F03"],
        [0.4, "#FFD700"],
        [0.5, "#FFD700"],
        [0.6, "#ED8F03"],
        [0.65, "#FFEC85"],
        [0.75, "#FFEBA1"],
        [0.85, "#ED8F03"],
        [1, "#FFEBA1"],
      ],
      8
    );
  };
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

  const handleWin = (actualDeg) => {
    const adjustedDeg = (actualDeg + 90) % 360;

    const segmentNumber = Math.floor(adjustedDeg / 36);
    const winningPrize = data[segmentNumber].option;

    setDisplay(winningPrize);
    setSelectedPrize({ name: winningPrize, qty: 1 });

    setRewardData((prevData) => {
      const updatedPrizes = [...prevData.prizes];

      const existingPrizeIndex = updatedPrizes.findIndex(
        (prize) => prize.name === winningPrize
      );

      if (existingPrizeIndex !== -1) {
        updatedPrizes[existingPrizeIndex].qty += 1;
        updatedPrizes[existingPrizeIndex].wonAt = new Date();
      } else {
        updatedPrizes.push({
          name: winningPrize,
          qty: 1,
          wonAt: new Date(),
          isClaimed: false,
        });
      }

      return { ...prevData, prizes: updatedPrizes };
    });

    onOpen();
  };

  const spinWheel = () => {
    setDisplay("-");
    wheelRef.current.style.pointerEvents = "none";

    const newDeg = Math.floor(2000 + Math.random() * 2000);
    const adjustedDeg = newDeg % 360;
    const finalDeg = Math.round(adjustedDeg / 36) * 36;
    const totalRotation = newDeg - adjustedDeg + finalDeg;

    wheelRef.current.style.transition = "all 5s ease-in-out";
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

  const handleSubmit = async () => {
    if (!selectedPrize) return;

    const existingRewardsResponse = await dispatch(
      getRewardsByWalletAddress(walletAddress)
    );
    const existingRewards = existingRewardsResponse?.payload || [];

    console.log(selectedPrize);

    const updatedPrizes =
      existingRewards.length > 0 ? [...existingRewards] : [];

    const existingPrizeIndex = updatedPrizes.findIndex(
      (prize) => prize.name === selectedPrize.name
    );

    if (existingPrizeIndex !== -1) {
      updatedPrizes[existingPrizeIndex].qty += 1; // Increment quantity
      updatedPrizes[existingPrizeIndex].wonAt = new Date();
    } else {
      updatedPrizes.push({
        name: selectedPrize.name,
        qty: 1,
        wonAt: new Date(),
        isClaimed: false,
      });
    }

    const finalRewardData = {
      ...rewardData,
      walletAddress: walletAddress,
      prizes: updatedPrizes,
    };

    await dispatch(createOrUpdateReward(finalRewardData, walletAddress));
    console.log("Final Reward Data:", finalRewardData);

    handleClose();
  };

  const resetWheel = () => {
    if (wheelRef.current) {
      wheelRef.current.style.transition = "none";
      wheelRef.current.style.transform = `rotate(0deg)`;
      setTimeout(() => {
        wheelRef.current.style.transition = "all 10s ease-in-out";
      }, 500);
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedPrizes = [...rewardData.prizes];

    if (!updatedPrizes[index]) {
      updatedPrizes[index] = { name: "", qty: 0 };
    }

    if (name === "prizeName") {
      updatedPrizes[index].name = value;
    } else if (name === "prizeQty") {
      updatedPrizes[index].qty = parseInt(value, 10);
    }

    setRewardData({ ...rewardData, prizes: updatedPrizes });
  };
  const handleClose = () => {
    resetWheel();
    onClose();
  };
  useEffect(() => {
    dispatch(getTodayRewardStats());
  }, [dispatch]);

  return (
    <Box>
      <Box
        position="relative"
        w="500px"
        h="500px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="5"
      >
        <canvas ref={wheelRef} width="500" height="500"></canvas>
        <Image
          src="../assets/marker.png"
          alt="Marker"
          position="absolute"
          width="19%"
          zIndex="1"
          style={{
            top: "39.3%",
            left: "49.9%",
            transform: "translate(-50%, -50%)",
          }}
        />
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
            isDisabled={!isConnected || user?.spins === 0}
          >
            {"SPIN THE WHEEL"}
          </Button>
        </Box>
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
            <RewardSharing />
          </Flex>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default WheelComponent;
