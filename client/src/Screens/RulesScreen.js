import React from "react";
import RichText from "../Components/RichText";
import { ListItem, OrderedList, Stack, UnorderedList } from "@chakra-ui/react";

const RulesScreen = () => {
  const rules = [
    {
      title: "Account Use",
      points: [
        "Each user is permitted to have one account only. All rewards and spins are tied to this account.",
        "Users found creating multiple accounts for the purpose of gaming the system will have their rewards forfeited and accounts suspended.",
      ],
    },
    {
      title: "Fair Play",
      points: [
        "The use of bots, scripts, or automation tools to influence or manipulate spins or reward outcomes is strictly prohibited.",
        "Any attempt to exploit the system, including but not limited to artificially inflating spins or participating in fraudulent behavior, will result in account suspension and the forfeiture of rewards.",
      ],
    },
    {
      title: "Withdrawal Conditions",
      points: [
        "Users can only withdraw rewards once they meet the defined withdrawal thresholds.",
        "Withdrawal requests below the threshold are not allowed. Users must wait until they meet the required limits.",
        "Withdrawals are processed within 48 hours after reaching the thresholds.",
      ],
    },
    {
      title: "Community Behavior",
      points: [
        "All users are expected to engage with the platform and community respectfully.",
        "Harassment, abusive language, or any form of inappropriate behavior will result in account suspension.",
      ],
    },
    {
      title: "General Conduct",
      points: [
        "Honesty and integrity are paramount.",
        "Any dishonest actions, such as attempting to claim false rewards or using deceptive methods to obtain rewards, will result in forfeiture of winnings and possible legal action.",
        "Spiniverse reserves the right to suspend accounts and forfeit rewards if any rules are violated.",
      ],
    },
    {
      title: "Verification",
      points: [
        "All rewards are subject to verification and approval by the Spiniverse team.",
        "Rewards may be delayed if verification is required.",
      ],
    },
    {
      title: "Legal Compliance",
      points: [
        "All users must comply with applicable laws and regulations regarding the use of the platform and receipt of rewards.",
      ],
    },
  ];

  return (
    <>
      <RichText
        title="SPINIVERSE PLATFORM"
        heading="Rules and Regulations"
        description="To ensure a fair, transparent, and enjoyable experience for all players, the following rules and regulations must be adhered to when participating in the Wheel of Fortune game or engaging with the platform:"
      />
      {/* Rules */}
      <Stack mx={40} mt={5}>
        <OrderedList spacing={5}>
          {rules.map((rule, index) => (
            <ListItem color="#f2f0f5">
              {rule.title}
              <UnorderedList spacing={2}>
                {rule.points.map((point, index) => (
                  <ListItem color="#a590c1">{point}</ListItem>
                ))}
              </UnorderedList>
            </ListItem>
          ))}
        </OrderedList>
      </Stack>
    </>
  );
};

export default RulesScreen;
