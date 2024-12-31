import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

/**
 * @desc    Authenticate user by connecting Phantom wallet
 * @route   POST /api/users/login
 * @access  Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { walletAddress } = req.body;

  const user = await User.findOne({ walletAddress });

  if (user) {
    res.json({
      _id: user._id,
      walletAddress: user.walletAddress,
      freeSpins: user.freeSpins,
      paidSpins: user.paidSpins,
      spins: user.spins,
      playedSpins: user.playedSpins,
      nextSpinTime: user.nextSpinTime,
    });
  } else {
    res.status(401);
    throw new Error("User not registered");
  }
});

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { walletAddress, freeSpins } = req.body; // Get freeSpins from the request

  const userExists = await User.findOne({ walletAddress });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create the user with the specified freeSpins
  const user = new User({
    walletAddress,
    freeSpins: freeSpins,
    paidSpins: 0,
  });

  const createdUser = await user.save();

  if (createdUser) {
    res.status(201).json({
      _id: createdUser._id,
      walletAddress: createdUser.walletAddress,
      freeSpins: createdUser.freeSpins,
      paidSpins: createdUser.paidSpins,
      spins: createdUser.spins,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * @desc    Get user data
 * @route   GET /api/users/:walletAddress
 * @access  Public
 */
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ walletAddress: req.params.walletAddress });

  if (user) {
    res.json({
      _id: user._id,
      walletAddress: user.walletAddress,
      name: user.name,
      freeSpins: user.freeSpins,
      paidSpins: user.paidSpins,
      spins: user.spins,
      playedSpins: user.playedSpins,
      nextSpinTime: user.nextSpinTime,
      createdAt: user.createdAt,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private/Admin
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-__v");
  res.json(users);
});

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const { walletAddress, name } = req.body;

  const user = await User.findOne({ walletAddress });

  if (user) {
    // Update the user's name if provided
    if (name) {
      user.name = name;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      walletAddress: updatedUser.walletAddress,
      name: updatedUser.name,
      freeSpins: updatedUser.freeSpins,
      paidSpins: updatedUser.paidSpins,
      spins: updatedUser.spins,
      playedSpins: updatedUser.playedSpins,
      nextSpinTime: updatedUser.nextSpinTime,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

/**
 * @desc    Update user's spins
 * @route   PUT /api/users/spins
 * @access  Private
 */
const updateSpins = asyncHandler(async (req, res) => {
  const { walletAddress, freeSpins } = req.body;

  const user = await User.findOne({ walletAddress });

  if (user) {
    if (user.spins > 0) {
      if (user.freeSpins > 0) {
        user.freeSpins -= 1;
      } else if (user.paidSpins > 0) {
        user.paidSpins -= 1;
      }
      user.playedSpins += 1;
      await user.save();

      // Respond after the user data is saved
      res.json({
        freeSpins: user.freeSpins,
        spins: user.spins,
        playedSpins: user.playedSpins,
        nextSpinTime: user.nextSpinTime,
      });
    } else {
      res.status(400);
      throw new Error("No spins left");
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @desc    Reset user's free spins based on frontend input if timer has expired or is null
 * @route   PUT /api/users/reset-free-spins
 * @access  Private
 */
const resetFreeSpins = asyncHandler(async (req, res) => {
  const { walletAddress, freeSpins } = req.body;

  // Find user by wallet address
  const user = await User.findOne({ walletAddress });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const currentTime = new Date();

  // Check if nextSpinTime is null or expired
  if (!user.nextSpinTime || new Date(user.nextSpinTime) <= currentTime) {
    // Reset free spins to the value passed from the frontend
    user.freeSpins = freeSpins;

    // Set a new nextSpinTime (e.g., 24 hours from now)
    user.nextSpinTime = new Date(currentTime.getTime() + 24 * 60 * 60 * 1000); // 24 hours later

    // Save updated user data
    await user.save();

    // Respond with the updated user data
    res.json({
      message: "Free spins reset successfully",
      freeSpins: user.freeSpins,
      nextSpinTime: user.nextSpinTime,
    });
  } else {
    res.json({
      message: "Free spins do not need resetting",
      freeSpins: user.freeSpins,
      nextSpinTime: user.nextSpinTime,
    });
  }
});

export {
  authUser,
  registerUser,
  getUser,
  getAllUsers,
  updateUserProfile,
  updateSpins,
  resetFreeSpins,
};
