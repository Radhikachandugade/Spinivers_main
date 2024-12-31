import { Stack } from "@chakra-ui/react";
import React from "react";
import Content from "../Components/Content";
import RichText from "../Components/RichText";

const AutoBurn = () => {
  return (
    <>
      <Stack px={40} spacing={6}>
        <RichText arrow={false} heading="Auto-burn Mechanism " />
        <Content
          content="One of the standout features of the Spiniverse Wheel of Fortune game is our innovative Auto-Burn Mechanism. This unique feature ensures that the value of meme tokens is maintained and potentially increased over time by systematically reducing the supply of tokens. Here’s how it works:
"
        />
        <Content
          heading="What is the Auto-Burn Mechanism?"
          content="The Auto-Burn Mechanism is designed to automatically burn a specific percentage of all participating meme tokens once the Wheel of Fortune reaches certain spin milestones. This process helps control the supply of tokens, making them more scarce and potentially more valuable. By participating in the Wheel of Fortune game, users contribute to this burn process, adding an extra layer of utility and excitement to their "
        />
        <Content
          heading="How Does It Work?"
          content='The Auto-Burn Mechanism is triggered based on the total number of spins completed on the Wheel of Fortune. Here’s the detailed slab structure for the auto-burn process:<br><br>
            <ol style="padding-left: 20px;">
        <li style="padding-bottom: 10px;">
            <span style="color: white;">First Burn:</span> 1,000 Spins - Burn <span style="color: white;">0.3%</span> of all meme tokens listed for free airdrops.
        </li>
        <li style="padding-bottom: 10px;">
            <span style="color: white;">Second Burn:</span> 5,000 Spins - Burn <span style="color: white;">0.4%</span> of all meme tokens listed for free airdrops.
        </li>
        <li style="padding-bottom: 10px;">
            <span style="color: white;">Third Burn:</span> 10,000 Spins - Burn <span style="color: white;">0.5%</span> of all meme tokens listed for free airdrops.
        </li>
        <li style="padding-bottom: 10px;">
            <span style="color: white;">Fourth Burn:</span> 20,000 Spins - Burn <span style="color: white;">0.6%</span> of all meme tokens listed for free airdrops.
        </li>
        <li style="padding-bottom: 10px;">
            <span style="color: white;">Fifth Burn:</span> 35,000 Spins - Burn <span style="color: white;">0.7%</span> of all meme tokens listed for free airdrops.
        </li>
        <li style="padding-bottom: 10px;">
            <span style="color: white;">Sixth Burn:</span> 50,000 Spins - Burn <span style="color: white;">0.75%</span> of all meme tokens listed for free airdrops.
        </li>
        <li style="padding-bottom: 10px;">
            <span style="color: white;">Seventh Burn:</span> 75,000 Spins - Burn <span style="color: white;">0.8%</span> of all meme tokens listed for free airdrops.
        </li>
    </ol>
'
        />
        <Content
          heading="Why is the Auto-Burn Mechanism Important?"
          content="Token Value Maintenance: By reducing the supply of meme tokens, the Auto-Burn Mechanism helps maintain and potentially increase their value. This is crucial in a market where many tokens can quickly become oversupplied and lose their worth.
          Community Engagement: The burn process adds an exciting element to the game, encouraging users to participate more actively. Knowing that their spins contribute to the token burn can create a sense of involvement and investment in the community.
          Sustainability: The Auto-Burn Mechanism ensures the long-term sustainability of the meme tokens by preventing excessive supply. This helps create a more balanced and healthy ecosystem for all token holders."
        />
        <Content
          heading="How to Participate?"
          content="To take advantage of the Auto-Burn Mechanism, simply participate in the Wheel of Fortune game. Every spin counts towards the total, bringing the community closer to the next burn milestone. Whether you’re using your daily free spins or purchasing additional bonus spins, your activity directly contributes to the token burn process."
        />
      </Stack>
    </>
  );
};

export default AutoBurn;
