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
  const currentTime = new Date();
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
  const [nextSpin, setNextSpin] = useState(user?.nextSpinTime || null);
  // console.log(nextSpin);

  const oddGradientColors = ["#ff8a00", "#ff8a00"];
  const evenGradientColors = ["#ffc501", "#ffc501"];

  const data = [
    { option: "AMAZON GIFT CARD" },
    { option: "SLAPHERO AIRDROP" },
    { option: "TRY AGAIN" },
    { option: "HTH AIRDROP" },
    { option: "EXCLUSIVE NFTs" },
    { option: "SOLANA AIRDROPS" },
    { option: "HARDWARE WALLET" },
    { option: "CG AIRDROP" },
    { option: "WHISK AIRDROP" },
    { option: "MAESTRO BOT" },
  ];

  useEffect(() => {
    drawWheel();
    const savedWalletAddress = localStorage.getItem("walletAddress");
    setWalletAddress(savedWalletAddress);
  }, [data]);

  const drawWheel = (winningSegmentIndex = null) => {
    const canvas = wheelRef.current;
    const ctx = canvas.getContext("2d");
    const numSegments = data.length;
    const canvasSize = 500;
    const radius = canvasSize / 2;
    const segmentAngle = (2 * Math.PI) / numSegments;
    const borderWidth = 10;
    const maxScale = 2; // Maximum scale for the transform
    let currentCircle = 0;
    let timer = 0; // Initialize timer variable
    const interval = 100;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.shadowBlur = 15;
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowOffsetX = 0; // Move shadow inward on the X-axis
    ctx.shadowOffsetY = 0;

    // Draw the wheel segments
    const drawWheelSegments = () => {
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
        ctx.font = "bold 14px Chakra Petch";
        ctx.textAlign = "center";
        ctx.letterSpacing = "0.1rem";
        ctx.textBaseline = "middle";

        // Add a black text shadow
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)"; // Slight black shadow
        ctx.shadowBlur = 2;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;

        // Add a text stroke for contrast
        ctx.strokeStyle = "#000000"; // Black stroke
        ctx.lineWidth = 1.5;
        ctx.strokeText(segment.option, radius * 0.55, 0);

        ctx.fillText(segment.option, radius * 0.55, 0);
        ctx.restore();
      });
    };

    // Draw the segment lines
    const drawSegmentLines = () => {
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
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
    };

    // Draw the wheel once
    drawWheelSegments();
    drawSegmentLines();

    // Function to draw the border with gradient and shadow
    const drawBorder = (size, gradientColors, width, isInner = false) => {
      ctx.beginPath();
      ctx.arc(radius, radius, size, 0, 2 * Math.PI); // Draw the outer circle
      ctx.lineWidth = width;

      // Create a linear gradient for the border
      const borderGradient = ctx.createLinearGradient(0, radius, 500, radius);
      gradientColors.forEach(([stop, color]) =>
        borderGradient.addColorStop(stop, color)
      );

      ctx.strokeStyle = borderGradient;
      ctx.stroke();

      // Draw the shadow for the border
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
    };

    // Draw the outer border
    drawBorder(
      radius - 10,
      [
        [0, "#fdf698"],
        [0.05, "#b78a36"],
        [0.1, "#b78a36"],
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
      false
    );

    // Draw the inner border
    drawBorder(
      radius * 0.2 - 4,
      [
        [0, "#ffd372"],
        [0.05, "#b87407"],
        [0.4, "#ffd372"],
        [0.5, "#b87407"],
        [0.75, "#ffd372"],
        [0.85, "#b87407"],
        [1, "#ffd372"],
      ],
      13,
      true
    );

    // Function to draw circles around the border
    const drawCircles = (isInner = false) => {
      const numCircles = isInner ? 8 : 20;
      const circleRadius = isInner ? 4 : 5;

      for (let i = 0; i < numCircles; i++) {
        const angle = ((2 * Math.PI) / numCircles) * i;
        const circleOffset = isInner ? radius * 0.19 : radius - borderWidth;
        const x = radius + circleOffset * Math.cos(angle);
        const y = radius + circleOffset * Math.sin(angle);

        // Apply shadow only to the circles
        ctx.save(); // Save the current context state
        ctx.shadowColor = "white"; // Set the shadow color to black
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        ctx.beginPath();

        if (i === currentCircle) {
          // Set shadow properties for scaling
          ctx.shadowBlur = 15; // Scale the shadow size
          ctx.shadowOffsetX = 0; // Optional: offset shadow horizontally
          ctx.shadowOffsetY = 0; // Optional: offset shadow vertically
          ctx.shadowColor = "rgba(225, 225, 225, 1)"; // Set shadow color with some transparency

          // Draw the expanded circle
          let expandedRadius = circleRadius * 1.5; // Increase the circle size by 20%
          ctx.arc(x, y, expandedRadius, 0, 2 * Math.PI);
          ctx.fillStyle = "white";
          ctx.fill();

          // Reset shadow properties after drawing the current circle
          ctx.shadowBlur = 0;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          ctx.shadowColor = "transparent";
        } else {
          // Draw normal circles
          ctx.arc(x, y, circleRadius, 0, 2 * Math.PI);
          ctx.fillStyle = "white";
          ctx.fill();
        }

        ctx.fill();
        ctx.restore(); // Restore the context state, resetting the shadow
      }
    };

    const updateCircles = (timestamp) => {
      if (timestamp - timer >= interval) {
        timer = timestamp; // Update the timer

        // Clear the canvas and redraw everything
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawWheelSegments();
        drawSegmentLines();
        drawBorder(
          radius - 10,
          [
            [0, "#fdf698"],
            [0.05, "#b78a36"],
            [0.1, "#b78a36"],
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
          false
        );
        drawBorder(
          radius * 0.2 - 4,
          [
            [0, "#ffd372"],
            [0.05, "#b87407"],
            [0.4, "#ffd372"],
            [0.5, "#b87407"],
            [0.75, "#ffd372"],
            [0.85, "#b87407"],
            [1, "#ffd372"],
          ],
          13,
          true
        );
        drawCircles(true);
        drawCircles(false);

        // Increment current circle and wrap around
        currentCircle = (currentCircle + 1) % 30;
      }

      // Call updateCircles on the next frame
      requestAnimationFrame(updateCircles);
    };

    // Start the animation loop
    updateCircles();

    const drawWinningSegment = (ctx, winningSegmentIndex) => {
      const numSegments = data.length;
      const segmentAngle = (2 * Math.PI) / numSegments;

      ctx.save();
      ctx.fillStyle = "rgba(255, 0, 0, 0.5)"; // Highlight color (red)
      const startAngle = segmentAngle * winningSegmentIndex;
      const endAngle = segmentAngle * (winningSegmentIndex + 1);

      ctx.beginPath();
      ctx.arc(radius, radius, radius, startAngle, endAngle);
      ctx.arc(radius, radius, radius * 0.2, endAngle, startAngle, true);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };
    if (winningSegmentIndex !== null) {
      drawWinningSegment(ctx, winningSegmentIndex);
    }
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

    drawWheel(segmentNumber);

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
    const totalDegrees = 2070;

    // Calculate the exact degree where the wheel should stop relative to the center of the segment
    const numSegments = data.length;
    const segmentAngle = 360 / numSegments;

    // Find the index of the winning segment randomly
    const winningSegmentIndex = Math.floor(Math.random() * numSegments);
    console.log(winningSegmentIndex);

    // Calculate the exact degree for the center of this segment
    const segmentCenterAngle =
      segmentAngle * winningSegmentIndex + segmentAngle / 2;

    // Calculate the total rotation needed to align the winning segment's center to the 90-degree mark
    const totalRotation = totalDegrees - segmentCenterAngle; // Adjust to 90 degrees
    console.log("rotate", totalRotation);

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
        }, 3000);
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
          boxShadow=" rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;"
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
          // disabled={isDisabled}
          isDisabled={
            !isConnected ||
            !user?.nextSpinTime ||
            new Date(user.nextSpinTime) <= currentTime ||
            user?.spins === 0
          }
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
                Collect Your Reward
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
