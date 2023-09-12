const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserModel = mongoose.model("UserModel");
const dotenv = require("dotenv");
const { JWT_SECRET } = require('../config');

const {
  verifyTokenAndAdmin,
  verifyToken,
  verifyTokenAndAuth,
} = require("./verifyToken");

dotenv.config();

router.post("/signup", async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      mobileNumber,
      isAdmin,
    } = req.body;

    const userInDB = await UserModel.findOne({ email: email });

    if (userInDB) {
      return res.status(400).json({ error: "User Already Exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10); // Using 10 rounds for bcrypt hash

    const newUser = new UserModel({
      fullName,
      email,
      password: hashedPassword,
      mobileNumber,
      isAdmin,
    });

    await newUser.save();
    
    res.status(201).json({ message: "User Signed up Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email })
    .then((userInDB) => {
      if (!userInDB) {
        return res.status(400).json({ error: "User Not Exist" });
      }
      bcryptjs.compare(password, userInDB.password, (err, isMatch) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        if (isMatch) {
          const accessToken = jwt.sign(
            {
              id: userInDB._id,
              isAdmin: userInDB.isAdmin,
            },
            JWT_SECRET
          );
          console.log("Generated Token:", accessToken)
          // Passwords match, user is authenticated
          // Here, you can generate a token or perform any other login-related operations
          const { password, ...other } = userInDB._doc;
          res
            .status(200)
            .json({ message: "Login Successful", ...other, accessToken });
        } else {
          // Passwords don't match
          res.status(401).json({ error: "Invalid password" });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

router.get("/getAllUser", verifyTokenAndAdmin, async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { email, verificationCode, password } = req.body;
    const user = await UserModel.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({ error: "User Not Found" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    const userId = req.params.id;
    const { fullName, email, mobileNumber, password } = req.body;

    if (req.user.isAdmin || req.user._id === userId) {
      const userToUpdate = await UserModel.findById(userId);
      if (!userToUpdate) {
        return res.status(404).json({ error: "User not found" });
      }
      if (email !== userToUpdate.email) {
        const existingUser = await UserModel.findOne({ email: email });
        if (existingUser) {
          return res.status(400).json({ error: "Email is already in use" });
        }
      }
      if (password) {
        const hashedPassword = await bcryptjs.hash(password, 10);
        userToUpdate.password = hashedPassword;
      }
      userToUpdate.fullName = fullName;
      userToUpdate.email = email;
      userToUpdate.mobileNumber = mobileNumber;
      const updatedUser = await userToUpdate.save();

      res.status(200).json(updatedUser);
    } else {
      res
        .status(403)
        .json({ error: "You are not authorized to update this user" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id/give-admin", verifyTokenAndAdmin, async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const targetUser = await UserModel.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({ error: "User not found" });
    }

    targetUser.isAdmin = !targetUser.isAdmin;
    await targetUser.save();

    res.status(200).json({ message: "Admin privileges granted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User Profile Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
