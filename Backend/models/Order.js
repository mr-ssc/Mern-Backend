const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  username: String,
  useraddress: String,
  productName: String,
  productId: String,
  quantity: Number,
  price: Number,
  image: String,
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  userId: String, // Firebase UID
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
