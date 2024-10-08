import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    walletAddress: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      default: "",
    },
    freeSpins: {
      type: Number,
      required: true,
      default: 1, // Set default to 0 for cooldown calculation
    },
    paidSpins: {
      type: Number,
      required: true,
      default: 0,
    },
    spins: {
      type: Number,
      default: 0,
    },
    cooldown: {
      type: Number, // The next available spin time (timestamp)
      default: 0,
    },
    playedSpins: {
      type: Number,
      default: 0,
    },
    nextSpinTime: {
      type: Date, // The time when the user can spin next
      default: 0,
    },
  },
  { timestamps: true }
);

// Pre-save middleware to update the spins field
userSchema.pre("save", function (next) {
  this.spins = this.freeSpins + this.paidSpins;

  if (this.freeSpins > 0) {
    this.nextSpinTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour for free spins
  } else {
    // this.nextSpinTime = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours for no spins
    this.nextSpinTime = new Date(Date.now() + 1 * 60 * 1000); // 1 minute
  }

  next();
});

const User = mongoose.model("User", userSchema);

export default User;
