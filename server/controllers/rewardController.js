import Reward from "../models/rewardModel.js";
import User from "../models/userModel.js"; // Import your User model
import asyncHandler from "express-async-handler";

// Create or update a reward
export const createOrUpdateReward = async (req, res) => {
  const { prizes, earnings } = req.body; // Destructure required fields from the request body
  const walletAddress = req.params.walletAddress; // Get the wallet address from request params

  if (!walletAddress || !prizes) {
    return res
      .status(400)
      .json({ message: "Wallet address and prize data are required." });
  }

  try {
    // Find the user based on the wallet address from the request params
    let user = await User.findOne({ walletAddress });

    if (!user) {
      // Create a new user if not found
      user = new User({ walletAddress }); // Ensure to pass walletAddress correctly
      await user.save();
    }

    // Check if a reward exists for the given wallet address
    const reward = await Reward.findOneAndUpdate(
      { walletAddress: walletAddress },
      {
        $push: { prizes }, // Push the new prizes into the existing array
        $set: { earnings }, // Update other fields
      },

      { new: true, upsert: true } // Create if it doesn't exist
    );

    await reward.save(); // Save the reward
    res.status(200).json(reward); // Respond with the updated or created reward
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve rewards by wallet address
export const getRewardsByWalletAddress = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    // console.log("Fetching rewards for:", walletAddress); // Log wallet address
    const rewards = await Reward.find({ walletAddress }).populate("user");

    // console.log("Retrieved rewards:", rewards); // Log retrieved rewards
    if (!rewards || rewards.length === 0) {
      return res.status(404).json({ message: "No rewards found" });
    }

    res.status(200).json(rewards);
  } catch (error) {
    console.error("Error fetching rewards:", error); // Log error details
    res.status(500).json({ message: error.message });
  }
};

// @desc Get reward statistics for today
// @route GET /api/rewards/stats/today
// @access Private/Admin
export const getTodayRewardStats = asyncHandler(async (req, res) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const todayRewards = await Reward.aggregate([
    {
      $unwind: "$prizes", // Unwind the prizes array
    },
    {
      $match: {
        "prizes.wonAt": { $gte: startOfDay }, // Match prizes won today
      },
    },
    {
      $group: {
        _id: "$prizes.name", // Group by prize name
        count: { $sum: 1 }, // Count occurrences of each prize
      },
    },
    {
      $sort: { count: -1 }, // Sort by count descending
    },
  ]);

  if (todayRewards.length > 0) {
    res.json(todayRewards); // Return aggregated results
  } else {
    res.status(404).json({ message: "No rewards found for today" }); // No rewards case
  }
});
