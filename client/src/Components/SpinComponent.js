import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Tooltip } from "@chakra-ui/react";
import { IoInformationCircleOutline } from "react-icons/io5";

const SpinComponent = () => {
  // const [isSpinDisabled, setSpinDisabled] = useState(true);
  const [isConnected, setIsConnected] = useState(true);

  const userLogin = useSelector((state) => state.userLogin || {});
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails || {});
  const { user } = userDetails;

  // useEffect(() => {
  //   setSpinDisabled(!isConnected || user?.spins <= 0);
  // }, [isConnected, user]);

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
          opacity={user?.spins > 0 ? 1 : 0.6} // Disable button if spins are 0
          _hover={user?.spins > 0 ? undefined : "none"}
          _active={user?.spins > 0 ? undefined : "none"}
          fontSize="1.2rem"
          size={{ base: "md", md: "md", lg: "lg" }}
          disabled={user?.spins === 0}
        >
          {!isConnected
            ? "Free Spins"
            : user?.spins > 0
            ? `${user.spins} Spin${user.spins > 1 ? "s" : ""} Left`
            : "Free Spins = 0"}
        </Button>

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
          <span>
            <IoInformationCircleOutline />
          </span>
        </Tooltip>

        {/* Paid Spin Button */}
        <Button
          variant="solid"
          color="rgb(242, 240, 245)"
          border="1px solid rgb(140, 65, 245)"
          backgroundColor="rgb(59, 9, 128)"
          borderRadius="16px"
          boxShadow="rgba(111, 17, 242, 0.25) 0px 12px 16px 0px"
          opacity={user?.spins > 0 ? 0.6 : 1} // Disable paid spins if free spins left
          _hover={user?.spins > 0 ? "none" : undefined}
          _active={user?.spins > 0 ? "none" : undefined}
          fontSize="1.2rem"
          size={{ base: "md", md: "md", lg: "lg" }}
          disabled={user?.spins > 0} // Disable if free spins are available
        >
          Bonus Spins = 0
        </Button>

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
          <span>
            <IoInformationCircleOutline />
          </span>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default SpinComponent;
