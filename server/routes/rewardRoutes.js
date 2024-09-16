import express from "express";
import {
  createOrUpdateReward,
  getRewardsByWalletAddress,
  getTodayRewardStats,
} from "../controllers/rewardController.js";

const router = express.Router();

// Route to create or update a reward
router.post("/:walletAddress", createOrUpdateReward);

// Route to get rewards by wallet address
router.get("/:walletAddress", getRewardsByWalletAddress);

router.route("/stats/today").get(getTodayRewardStats);

export default router;
