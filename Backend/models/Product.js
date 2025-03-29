const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    cloudinary_id: { type: String, required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    category_name: { type: String, required: true },
    subcategory_id: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory", required: true },
    subcategory_name: { type: String, required: true },
    original_price: { type: Number, required: true },
    discount_price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
