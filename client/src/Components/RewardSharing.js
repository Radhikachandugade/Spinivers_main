import React from "react";
import { Button, VStack, Heading, Flex } from "@chakra-ui/react";
import { IoLogoFacebook, IoLogoTwitter, IoLogoLinkedin } from "react-icons/io5";

const RewardSharing = ({ selectedPrize, screenshotUrl }) => {
  const shareMessage = selectedPrize
    ? `🎉 I just won ${selectedPrize.qty} of ${selectedPrize.name} on Spiniverse! 🎁💰\n\n#Spiniverse #Rewards\nCheck it out: ${screenshotUrl}`
    : `I just won an awesome prize on Spiniverse! 🎁💰 #Spiniverse #Rewards`;

  const encodedShareMessage = encodeURIComponent(shareMessage);

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=&quote=${encodedShareMessage}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedShareMessage}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedShareMessage}`;

  return (
    <Flex spacing={4} align="center" gap="3">
      <Heading size="md">Share Your Reward!</Heading>
      <Button
        as="a"
        href={facebookShareUrl}
        target="_blank"
        colorScheme="facebook"
        borderRadius="50"
      >
        <IoLogoFacebook />
      </Button>
      <Button
        as="a"
        href={twitterShareUrl}
        target="_blank"
        colorScheme="twitter"
        borderRadius="50"
      >
        <IoLogoTwitter />
      </Button>
      <Button
        as="a"
        href={linkedinShareUrl}
        target="_blank"
        colorScheme="linkedin"
        borderRadius="50"
      >
        <IoLogoLinkedin />
      </Button>
    </Flex>
  );
};

export default RewardSharing;
