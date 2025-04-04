const Order = require("../models/Order");

// API-1: Save orders
exports.placeOrder = async (req, res) => {
  try {
    const orders = req.body; // array of order objects
    const savedOrders = await Order.insertMany(orders);
    res.status(201).json(savedOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// API-2: Get orders by user ID
exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// API-3: Get total number of orders
exports.getOrderCount = async (req, res) => {
  try {
    const count = await Order.countDocuments();
    res.json({ totalOrders: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// API-4: Get all orders (admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// API-5: Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const updated = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
