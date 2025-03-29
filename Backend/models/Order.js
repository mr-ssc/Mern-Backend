const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    username: { type: String, required: true },
    useraddress: { type: String, required: true },
    productName: { type: String, required: true },
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String, default: "Pending" },
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
