// models/SubCategory.js
const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    cloudinary_id: { type: String, required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    category_name: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubCategory", SubCategorySchema);