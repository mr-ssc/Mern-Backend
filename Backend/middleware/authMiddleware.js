const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization"); // Get token from header
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET); // Extract token from "Bearer <token>"
    req.user = decoded; // Attach user data to request
    next();
  } catch (error) {
    res.status(400).json({ msg: "Invalid token" });
  }
};
