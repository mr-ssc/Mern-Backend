const express = require("express");
const router = express.Router();
const { placeOrder } = require("../controllers/orderController");

// Route to place an order
router.post("/place", placeOrder);

module.exports = router;
