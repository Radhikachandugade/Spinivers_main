import React from "react";
import { useSelector } from "react-redux";
import { Box, Button } from "@chakra-ui/react";

const ShareRewards = () => {
  const selectedPrize = useSelector((state) => state.prize.selectedPrize); // Access selected prize
  const shareMessage = selectedPrize
    ? `Check out my reward: ${selectedPrize.name}! I won ${selectedPrize.quantity} of them! #MyRewards`
    : "No reward selected.";

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    window.location.href
  )}&quote=${encodeURIComponent(shareMessage)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareMessage
  )}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    window.location.href
  )}&title=${encodeURIComponent(
    selectedPrize ? selectedPrize.name : "My Reward"
  )}&summary=${encodeURIComponent(shareMessage)}`;

  return (
    <Box display="flex" justifyContent="space-around" marginTop="20px">
      <Button
        as="a"
        href={facebookShareUrl}
        target="_blank"
        colorScheme="facebook"
        isDisabled={!selectedPrize}
      >
        Share on Facebook
      </Button>
      <Button
        as="a"
        href={twitterShareUrl}
        target="_blank"
        colorScheme="twitter"
        isDisabled={!selectedPrize}
      >
        Share on Twitter
      </Button>
      <Button
        as="a"
        href={linkedinShareUrl}
        target="_blank"
        colorScheme="linkedin"
        isDisabled={!selectedPrize}
      >
        Share on LinkedIn
      </Button>
    </Box>
  );
};

export default ShareRewards;
