const User = require("../models/User");
const bcrypt = require("bcryptjs");
const admin = require("../config/firebase");

// Signup Controller
exports.signup = async (req, res) => {
  try {
    const { name, phone, email, address, gender, password, uid } = req.body;

    // Check if the user already exists in MongoDB
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Hash the password before storing it in MongoDB
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user data in MongoDB
    const newUser = new User({
      uid, // Firebase UID
      name,
      phone,
      email,
      address,
      gender,
      password: hashedPassword, // Store hashed password in MongoDB
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully!", uid });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Signin Controller
exports.signin = async (req, res) => {
  try {
    const { email, firebaseUid } = req.body;

    if (!email || !firebaseUid) {
      return res.status(400).json({ message: "Email and Firebase UID are required" });
    }

    // Find user in MongoDB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify Firebase UID with stored UID in MongoDB
    if (user.uid !== firebaseUid) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Return user data (excluding password)
    const userData = {
      uid: user.uid,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      gender: user.gender,
    };

    res.status(200).json({
      message: "Login successful",
      user: userData,
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// Get total number of users
exports.getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.status(200).json({ totalUsers });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name phone address");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
