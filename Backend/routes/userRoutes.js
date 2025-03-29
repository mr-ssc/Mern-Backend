const express = require("express");
const { signup  , signin , getTotalUsers , getAllUsers } = require("../controllers/userController");
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/total-users", getTotalUsers);
router.get("/all-users", getAllUsers);



module.exports = router;



