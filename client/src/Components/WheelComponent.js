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
  IconButton,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import RewardSharing from "../Components/RewardSharing";
import { getTodayRewardStats } from "../actions/rewardActions";
// import useSpinDisabled from "../Screens/Wheel";
import { ImSpinner4 } from "react-icons/im";

const WheelComponent = () => {
  const [display, setDisplay] = useState("-");
  // console.log(display);
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

  const oddGradientColors = ["#ff8a00", "#ff8a00"];
  const evenGradientColors = ["#ffc501", "#ffc501"];

  const data = [
    { option: "Amazon Gift Card" },
    { option: "HTH Airdrop" },
    { option: "SLAPHERO Airdrop" },
    { option: "Better Luck Next Time" },
    { option: "Exclusive NFTs" },
    { option: "Solana Airdrops" },
    { option: "Hardware Wallet" },
    { option: "CG Tokens Airdrop" },
    { option: "WHISK Airdrop" },
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
    const borderWidth = 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.shadowBlur = 15;
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";

    // Draw the wheel segments
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

    // Draw the segment lines
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

    // Function to draw the border and circles
    const drawBorder = (size, gradientColors, width, isInner = false) => {
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
        size,
        radius,
        radius,
        size
      );
      shadowGradient.addColorStop(0, "rgba(0, 0, 0, 0.3)");
      shadowGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.strokeStyle = shadowGradient;
      ctx.stroke();
      ctx.restore();

      const numCircles = isInner ? 8 : 30; // Adjust number of circles for inner radius
      const circleRadius = isInner ? 4 : 5; // Radius of the white circles

      for (let i = 0; i < numCircles; i++) {
        const angle = ((2 * Math.PI) / numCircles) * i;
        const circleOffset = isInner ? radius * 0.19 : radius - borderWidth;
        const x = radius + circleOffset * Math.cos(angle);
        const y = radius + circleOffset * Math.sin(angle);

        ctx.shadowColor = "white";
        ctx.shadowBlur = 5; // Blur radius for the shadow
        ctx.shadowOffsetX = 0; // No horizontal offset
        ctx.shadowOffsetY = 2;
        ctx.beginPath();
        ctx.arc(x, y, circleRadius, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
      }
    };

    // Draw the outer border and circles
    drawBorder(
      radius - 10,
      [
        [0, "#fdf698"],
        [0.05, "#b78a36"],
        [0.1, "#b78a36"],
        // [0.15, "#f3dd72"],
        [0.2, "#f3dd72"],
        [0.3, "#b78a36"],
        [0.35, "#f3dd72"],
        [0.4, "#a46f23"],
        [0.5, "#fdf698"],
        [0.6, "#d4b051"],
        [0.7, "#f3dd72"],
        [0.8, "#b78a36"],
        [0.9, "#a46f23"],
        [1, "#f3dd72"],
      ],
      20,
      false // Outer radius circles
    );

    // Draw the inner border and circles
    drawBorder(
      radius * 0.2 - 4,
      [
        [0, "#ffd372"],
        [0.05, "#b87407"],
        // [0.1, "#ffd372"],
        // [0.15, "#b87407"],
        // [0.2, "#ffd372"],
        // [0.3, "#b87407"],
        [0.4, "#ffd372"],
        [0.5, "#b87407"],
        // [0.6, "#ffd372"],
        // [0.65, "#b87407"],
        [0.75, "#ffd372"],
        [0.85, "#b87407"],
        [1, "#ffd372"],
      ],
      13,
      true // Inner radius circles
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

  const handleWin = (finalDeg) => {
    const numSegments = data.length;
    const segmentAngle = 360 / numSegments;

    // Adjust the final degree to account for the offset and calculate the winning segment
    console.log(finalDeg);
    const adjustedDeg = finalDeg;

    // Find the segment number by dividing the adjusted degree by the segment angle
    const segmentNumber = Math.floor(adjustedDeg / segmentAngle);
    console.log(segmentNumber);

    // Get the winning prize
    const winningPrize = data[segmentNumber]?.option || "No prize";

    // Set the display state to show the winning prize
    setDisplay(winningPrize);
    setSelectedPrize({ name: winningPrize, qty: 1 });

    // Update the reward data
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

    // Open the modal to display the winning prize
    onOpen();
  };

  const spinWheel = () => {
    setDisplay("-");
    wheelRef.current.style.pointerEvents = "none";

    // Calculate a random number of total degrees for the spin (e.g., between 2000 to 4000 degrees)
    const totalDegrees = Math.floor(2000 + Math.random() * 2000);

    // Calculate the exact degree where the wheel should stop relative to the center of the segment
    const numSegments = data.length;
    const segmentAngle = 360 / numSegments;

    // Find the index of the winning segment randomly
    const winningSegmentIndex = Math.floor(Math.random() * numSegments);
    console.log(winningSegmentIndex);

    // Calculate the exact degree for the center of this segment
    const segmentCenterAngle =
      segmentAngle * winningSegmentIndex + segmentAngle / 2;

    // Calculate the total rotation needed to align the wheel so that the segment's center is at the 90-degree mark
    const totalRotation = totalDegrees - segmentCenterAngle;

    // Spin the wheel
    wheelRef.current.style.transition = "all 5s ease-out";
    wheelRef.current.style.transform = `rotate(${totalRotation}deg)`;

    wheelRef.current.addEventListener(
      "transitionend",
      async () => {
        wheelRef.current.style.pointerEvents = "auto";
        setTimeout(async () => {
          handleWin(segmentCenterAngle); // Use segmentCenterAngle for accuracy
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
        <Button
          bgColor="#fed97e"
          aria-label="Search database"
          position="absolute"
          onClick={spinWheel}
          borderRadius="full"
          zIndex="1"
          size="lg"
          height="80px"
          width="80px"
          variant="outline"
          border="4px solid white"
          boxShadow="rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"
          icon={<ImSpinner4 size="50" />}
          style={{
            size: "50",
            top: "48%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          _hover={{ bgColor: "none" }}
          color="#ac1f00"
          // letterSpacing="0.2rem"
          fontWeight="bold"
          fontSize="2xl"
          _disabled={{ opacity: 0.9, bg: "#fed97e" }}
          // isDisabled={!isConnected || user?.spins === 0}
        >
          SPIN
        </Button>
        <Image
          src="../assets/marker.png"
          alt="Marker"
          position="absolute"
          width="100%"
          zIndex="0"
          style={{
            size: "50",
            top: "45.3%",
            left: "50%",
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
            borderRadius="full"
            bg="linear-gradient( to left, hsl(340, 100%, 16%) 0%, hsl(340, 100%, 32%) 8%, hsl(340, 100%, 32%) 92%, hsl(340, 100%, 16%) 100% )"
          />
          {/* <IconButton
            colorScheme="blue"
            aria-label="Search database"
            onClick={spinWheel}
            borderRadius="full"
            icon={<ImSpinner4 />}
            style={{
              top: "39.3%",
              left: "49.9%",
              transform: "translate(-50%, -50%)",
            }}
          /> */}
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
