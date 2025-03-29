const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    cloudinary_id: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Category", CategorySchema);
