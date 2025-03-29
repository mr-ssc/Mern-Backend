const Order = require("../models/order");

// Place an order
exports.placeOrder = async (req, res) => {
    try {
        const { orders } = req.body; // Get orders array from request

        if (!orders || !Array.isArray(orders) || orders.length === 0) {
            return res.status(400).json({ error: "Invalid order data." });
        }

        // Save all orders in MongoDB
        const savedOrders = await Order.insertMany(orders);

        res.status(201).json({ message: "Order placed successfully!", orders: savedOrders });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ error: "Failed to place order." });
    }
};
