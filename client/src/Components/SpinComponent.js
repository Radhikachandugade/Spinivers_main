import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetFreeSpins } from "../actions/userActions"; // Import the action
import { Box, Button, Tooltip } from "@chakra-ui/react";
import { IoInformationCircleOutline } from "react-icons/io5";

const SpinComponent = ({ isConnected }) => {
  const dispatch = useDispatch();
  const currentTime = new Date();
  const userDetails = useSelector((state) => state.userDetails || {});
  const { user } = userDetails;

  const [nextSpin, setNextSpin] = useState(user?.nextSpinTime || null);
  console.log(nextSpin);
  const [freeSpins, setFreeSpins] = useState(user?.freeSpins || 0);
  const [walletAddress, setWalletAddress] = useState("");

  // Update nextSpin when user details change
  useEffect(() => {
    if (user) {
      setNextSpin(user?.nextSpinTime);
      setFreeSpins(user?.freeSpins);
    }
  }, [user]);

  // Handle cooldown countdown
  useEffect(() => {
    const savedWalletAddress = localStorage.getItem("walletAddress");
    setWalletAddress(savedWalletAddress);
    if (!user?.nextSpinTime || !isConnected) return; // Only run timer if connected and nextSpinTime is set

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const nextTime = new Date(nextSpin).getTime();
      const timeDifference = nextTime - now;

      if (timeDifference <= 0) {
        clearInterval(interval);
        setNextSpin(null);
        // dispatch(resetFreeSpins(walletAddress, freeSpins));
      } else {
        setNextSpin(timeDifference);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [user, dispatch, walletAddress, isConnected, user?.nextSpinTime]);

  const formatTimeComponents = (time) => {
    const hours = String(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    ).padStart(2, "0");
    const minutes = String(
      Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
    ).padStart(2, "0");
    const seconds = String(Math.floor((time % (1000 * 60)) / 1000)).padStart(
      2,
      "0"
    );

    return { hours, minutes, seconds };
  };

  const timeComponents =
    nextSpin > 0
      ? formatTimeComponents(nextSpin)
      : { hours: "00", minutes: "00", seconds: "00" };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={5}>
      <Box display="flex" flexDirection="row" alignItems="center" gap={3}>
        {/* Free Spin Button */}
        <Button
          variant="solid"
          color="rgb(242, 240, 245)"
          border="1px solid rgb(140, 65, 245)"
          backgroundColor="rgb(59, 9, 128)"
          borderRadius="16px"
          boxShadow="rgba(111, 17, 242, 0.25) 0px 12px 16px 0px"
          opacity={freeSpins > 0 ? 1 : 0.6}
          _hover={{
            bgColor: freeSpins > 0 ? "none" : "rgb(59, 9, 128)",
            borderColor: "rgb(140, 65, 245)",
            boxShadow:
              freeSpins > 0
                ? "none"
                : "rgba(111, 17, 242, 0.35) 0px 14px 18px 0px",
            cursor: freeSpins > 0 ? "not-allowed" : "pointer",
          }}
          _active={freeSpins > 0 ? undefined : "none"}
          fontSize="1.2rem"
          size={{ base: "md", md: "md", lg: "lg" }}
          disabled={
            freeSpins === 0 ||
            !user.nextSpinTime ||
            new Date(user.nextSpinTime) <= currentTime ||
            !isConnected
          } // Disable if not connected
        >
          {!isConnected
            ? "Please Connect Wallet"
            : freeSpins > 0
            ? `Daily Free Spin${freeSpins > 1 ? "s" : ""} : ${freeSpins}`
            : "Daily Free Spins : 0"}
          <Tooltip
            label="Know more about Free Spin"
            hasArrow
            arrowSize={8}
            bg="rgba(0, 0, 0, 0.8)"
            backdropFilter="blur(5px)"
            border="1px solid rgba(255,255,255,0.1)"
            boxShadow="rgba(111, 17, 242, 0.25) 0px 12px 16px 0px"
            borderRadius="20"
          >
            <span style={{ marginLeft: "8px" }}>
              <IoInformationCircleOutline />
            </span>
          </Tooltip>
        </Button>

        {/* Bonus Spin Button */}
        <Button
          variant="solid"
          color="rgb(242, 240, 245)"
          border="1px solid rgb(140, 65, 245)"
          backgroundColor="rgb(59, 9, 128)"
          borderRadius="16px"
          boxShadow="rgba(111, 17, 242, 0.25) 0px 12px 16px 0px"
          opacity={user?.spins > 0 ? 0.6 : 1}
          _hover={{
            bgColor: user?.spins > 0 ? "none" : "rgb(59, 9, 128)",
            borderColor: "rgb(140, 65, 245)",
            boxShadow:
              user?.spins > 0
                ? "none"
                : "rgba(111, 17, 242, 0.35) 0px 14px 18px 0px",
            cursor: user?.spins > 0 ? "not-allowed" : "pointer",
          }}
          _active={user?.spins > 0 ? "none" : undefined}
          fontSize="1.2rem"
          size={{ base: "md", md: "md", lg: "lg" }}
          disabled={user?.spins > 0 || !isConnected} // Disable if not connected
        >
          {!isConnected ? "Please Connect Wallet" : "Bonus Spin : 0"}
          <Tooltip
            label="Know more about Bonus Spin"
            hasArrow
            arrowSize={8}
            bg="rgba(0, 0, 0, 0.8)"
            backdropFilter="blur(5px)"
            border="1px solid rgba(255,255,255,0.1)"
            boxShadow="rgba(111, 17, 242, 0.25) 0px 12px 16px 0px"
            borderRadius="20"
          >
            <span style={{ marginLeft: "8px" }}>
              <IoInformationCircleOutline />
            </span>
          </Tooltip>
        </Button>
      </Box>

      {/* Countdown Timer */}
      {isConnected && nextSpin && (
        <div id="countdown" style={{ textAlign: "center", marginTop: "2px" }}>
          <ul
            style={{
              display: "flex",
              justifyContent: "center",
              padding: 0,
              color: "white",
            }}
          >
            <li
              style={{
                display: "inline-block",
                fontSize: "0.4em",
                listStyleType: "none",
                padding: "1em",
              }}
            >
              <span style={{ display: "block", fontSize: "3rem" }}>
                {timeComponents.hours}
              </span>{" "}
              H R S
            </li>
            <li
              style={{
                display: "inline-block",
                fontSize: "0.4em",
                listStyleType: "none",
                padding: "1em",
              }}
            >
              <span style={{ display: "block", fontSize: "3rem" }}>
                {timeComponents.minutes}
              </span>{" "}
              M I N
            </li>
            <li
              style={{
                display: "inline-block",
                fontSize: "0.4em",
                listStyleType: "none",
                padding: "1em",
              }}
            >
              <span style={{ display: "block", fontSize: "3rem" }}>
                {timeComponents.seconds}
              </span>{" "}
              S E C
            </li>
          </ul>
        </div>
      )}
    </Box>
  );
};

export default SpinComponent;
