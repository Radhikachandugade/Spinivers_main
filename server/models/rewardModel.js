import mongoose from "mongoose";

const rewardSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    prizes: [
      {
        name: { type: String, required: true },
        qty: { type: Number, default: 1 }, // Default to 1 for the first entry
        wonAt: { type: Date }, // New field for when the prize was won
        isClaimed: { type: Boolean, required: true, default: false }, // New field to track if claimed
      },
    ],
    earnings: {
      type: Number,
      default: 0,
    },

    walletAddress: { type: String, required: true },
  },
  { timestamps: true }
);

const Reward = mongoose.model("Reward", rewardSchema);

export default Reward;
