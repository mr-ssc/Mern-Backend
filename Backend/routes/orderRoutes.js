const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// API-1
router.post("/place-order", orderController.placeOrder);

// API-2
router.get("/user-orders/:userId", orderController.getUserOrders);

// API-3
router.get("/count", orderController.getOrderCount);

// API-4
router.get("/", orderController.getAllOrders);

// API-5
router.put("/status/:orderId", orderController.updateOrderStatus);

module.exports = router;
