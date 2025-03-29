// routes/subCategoryRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { createSubCategory, getSubCategories, updateSubCategory, deleteSubCategory } = require("../controllers/subCategoryController");

router.post("/", upload.single("image"), createSubCategory);
router.get("/", getSubCategories);
router.put("/:id", upload.single("image"), updateSubCategory);
router.delete("/:id", deleteSubCategory);

module.exports = router;
