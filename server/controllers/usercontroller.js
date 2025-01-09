import userModel from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { generateTokens } from "../utils/generateTokens.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists. Please login!" });
    }

    // Hashing the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Creating the new user
    user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    generateTokens(user._id, res);

    res.status(200).json({
      message: "User Registered",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email });

    if (!user)
      return res
        .status(400)
        .json({ message: "User not exist. Please register!" });

    const comparedPassword = await bcryptjs.compare(password, user.password);

    if (!comparedPassword)
      return res.status(400).json({ message: "Invalid Credintials" });

    generateTokens(user._id, res);

    res.json({
      user,
      message: "User LoggedIn SuccessFully!",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const myProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const userProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const followAndUnfollow = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    const LoggedInUser = await userModel.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "No user Found" });

    if (user._id.toString() === LoggedInUser._id.toString())
      return res.status(400).json({ message: "You can't follow yourself!" });

    // Ensure arrays are initialized
    if (!user.followers) user.followers = [];
    if (!LoggedInUser.followings) LoggedInUser.followings = [];

    if (user.followers.includes(LoggedInUser._id)) {
      const indexFollowing = LoggedInUser.followings.indexOf(user._id);
      const indexFollowers = user.followers.indexOf(LoggedInUser._id);

      LoggedInUser.followings.splice(indexFollowing, 1);
      user.followers.splice(indexFollowers, 1);

      await LoggedInUser.save();
      await user.save();

      return res.json({ message: "User Unfollowed" });
    } else {
      LoggedInUser.followings.push(user._id);
      user.followers.push(LoggedInUser._id);

      await LoggedInUser.save();
      await user.save();

      return res.json({ message: "User followed" });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const logOut = async (req, res) => {
  try {
      res.cookie("token", "", {
          maxAge: 0,
          httpOnly: true, 
      });
      res.json({ message: "Logged Out Successfully!" });
  } catch (error) {
      res.status(500).json({
          message: "An error occurred while logging out",
          error: error.message,
      });
  }
};
