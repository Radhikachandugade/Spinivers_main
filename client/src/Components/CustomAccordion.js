import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

const CustomAccordionItem = ({ children, ...props }) => {
  return (
    <AccordionItem borderRadius="20" mb={5} p={0} {...props}>
      {({ isExpanded }) => (
        <Box
          border={
            isExpanded ? "1px solid #bf96fa" : "1px solid rgb(42, 35, 53)"
          }
          borderRadius="20"
          bgGradient={
            isExpanded
              ? "linear-gradient(rgba(112, 83, 142, 0.5) 0%, rgba(5, 0, 10, 0.5) 100%)"
              : "none"
          }
          p={2}
        >
          {children}
        </Box>
      )}
    </AccordionItem>
  );
};

const questionsAndAnswers = [
  {
    question: "How do I play the Wheel of Fortune game?",
    answer:
      "Playing the Wheel of Fortune is easy! First, connect your Phantom wallet to the Spiniverse platform. By holding Slapuniverse meme tokens or staking our native CG tokens, you’ll qualify for daily free spins. You can also purchase additional bonus spins using Solana (SOL) or CG tokens.",
  },
  {
    question: "Who is eligible for free spins?",
    answer:
      "Everyone gets to join in on the fun! Every user receives 1 free daily spin, even if you aren’t holding or staking tokens. However, if you hold Slapuniverse meme tokens, you’ll receive 4 daily free spins, and if you stake CG tokens, you’ll get 6 daily free spins.",
  },
  {
    question: "What rewards can I win on the Wheel of Fortune?",
    answer:
      "The Wheel of Fortune offers a variety of exciting rewards, including meme token airdrops, Solana, exclusive NFTs, Amazon gift cards, and more. For a full list of rewards, be sure to visit our Rewards section.",
  },
  {
    question: "How does the Auto-Burn Mechanism work?",
    answer:
      "Our innovative Auto-Burn Mechanism helps maintain the value of meme tokens by reducing their supply after specific spin milestones. For example, after 1,000 spins, 0.5% of all meme tokens listed for airdrops will be burned, increasing scarcity and potentially boosting value. Learn more about the Auto-Burn Mechanism in detail on this page.",
  },
  {
    question: "What are Bonus Spins, and how do I purchase them?",
    answer:
      "Bonus Spins are extra spins that can be purchased using Solana or CG tokens. Paying with CG tokens offers you more spins compared to using Solana. For more details, check out our Bonus Spin section.",
  },
  {
    question: "What is the CG token, and how can I use it?",
    answer: `The CG token is the native utility token of Spiniverse, offering several uses within our platform:
<ul style="margin-left:20px"><li>Purchase Bonus Spins: Use CG tokens to buy bonus spins on the Wheel of Fortune. You get 30 extra spins compared to using Solana.</li>
<li>Daily Free Spins: Stake CG tokens to earn 6 daily free spins. For example, staking 50,000 CG tokens for a minimum of 3 months will qualify you for this reward.</li>
<li>List Meme Projects: Use CG tokens to list your meme project on the wheel. The required amount will be disclosed later.</li></ul>
Note: These features will be available once the CG token integration is complete and liquidity is established. Stay tuned for updates.`,
  },
  {
    question: "Is the Wheel of Fortune game fair?",
    answer:
      "Absolutely! Our Wheel of Fortune is provably fair, meaning every spin is random and ensures all users have an equal chance of winning.",
  },
  {
    question: "How can I list my meme project on the Wheel of Fortune?",
    answer: `To list your meme project on Spiniverse's Wheel of Fortune, you need to:
<ul style="margin-left:20px"><li>Pay a Listing Fee: The fee is 2 Solana.</li>
<li>Provide Tokens for Burn Mechanism: Supply 4% of your total token supply for our auto-burn mechanism.</li>
<li>Provide Tokens for Airdrops (optional): You can also provide 4% of your token supply for airdrops to be given as rewards on the wheel.</li></ul>
For detailed information and to get started, please visit the <a href="/listing-form" style="color:#f2f0f5">following page</a> and fill out our form. Our team will review your submission and proceed with the listing if it meets our criteria.`,
  },
];

const CustomAccordion = () => {
  return (
    <Accordion allowToggle w="100%">
      {questionsAndAnswers.map((item, index) => (
        <CustomAccordionItem key={index}>
          <h2>
            <AccordionButton>
              <Box
                as="span"
                flex="1"
                textAlign="left"
                fontSize={{ base: "md", lg: "lg" }}
                color="#f2f0f5"
              >
                {item.question}
              </Box>
              <AccordionIcon boxSize="8" />
            </AccordionButton>
          </h2>
          <AccordionPanel
            pb={4}
            dangerouslySetInnerHTML={{ __html: item.answer }}
          ></AccordionPanel>
        </CustomAccordionItem>
      ))}
    </Accordion>
  );
};

export default CustomAccordion;
