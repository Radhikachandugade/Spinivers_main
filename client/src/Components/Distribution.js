import { Flex, Icon, Stack, Text } from "@chakra-ui/react";

import { GiPiggyBank } from "react-icons/gi";
import { RiTeamFill } from "react-icons/ri";
import { GrStakeholder } from "react-icons/gr";
import { IoGiftSharp } from "react-icons/io5";
import { FaCoins, FaFire } from "react-icons/fa";
const Distribution = () => {
  const distribution = [
    {
      icon: FaCoins,
      label: "Presale",
      qty: "40%",
    },
    {
      icon: GiPiggyBank,
      label: "Liquidity Pool",
      qty: "24%",
    },
    {
      icon: RiTeamFill,
      label: "Team Allocation",
      qty: "14%",
    },
    {
      icon: GrStakeholder,
      label: "Staking",
      qty: "14%",
    },
    {
      icon: IoGiftSharp,
      label: "Airdrops",
      qty: "4%",
    },
    {
      icon: FaFire,
      label: "Auto-Burn",
      qty: "4%",
    },
  ];
  return (
    <>
      <Stack alignItems="center" spacing="8">
        {distribution.map((data, index) => (
          <Flex
            w="sm"
            bgColor="#0F0B15"
            p={3}
            borderRadius="full"
            borderX="3px solid cyan"
            boxShadow="0 0 12px #fff3 , 0 4px 50px #64caef38"
            color="cyan"
            position="relative"
          >
            <Flex
              borderRadius="full"
              border="3px solid cyan"
              bgColor="#0F0B15"
              position="absolute"
              left="-8"
              top="0"
              p="2"
            >
              <Icon as={data.icon} boxSize={8} p={0.5} />
            </Flex>
            <Flex w="full" justifyContent="space-between" px="10">
              <Text fontSize="lg"> {data.label}</Text>
              <Text fontSize="lg">{data.qty} </Text>
            </Flex>
          </Flex>
        ))}
      </Stack>
    </>
  );
};

export default Distribution;
