const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let admin = await Admin.findOne({ email });

    if (admin) return res.status(400).json({ msg: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    admin = new Admin({ email, password: hashedPassword });

    await admin.save();
    res.status(201).json({ msg: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, admin: { id: admin._id, email: admin.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
