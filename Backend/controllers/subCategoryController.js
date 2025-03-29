
// controllers/subCategoryController.js
const SubCategory = require("../models/SubCategory");
const cloudinary = require("../config/cloudinary");

// Create SubCategory
exports.createSubCategory = async (req, res) => {
  try {
    const { name, category_id, category_name } = req.body;
    if (!name || !category_id || !category_name || !req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
      folder: "subcategories",
      transformation: [{ width: 500, height: 500, crop: "limit" }],
    });

    const newSubCategory = new SubCategory({
      name,
      category_id,
      category_name,
      image: uploadedImage.secure_url,
      cloudinary_id: uploadedImage.public_id,
    });

    await newSubCategory.save();
    res.status(201).json({ message: "SubCategory created successfully", subCategory: newSubCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All SubCategories
exports.getSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate("category_id", "name");
    res.json(subCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update SubCategory
exports.updateSubCategory = async (req, res) => {
  try {
    const { name, category_id, category_name } = req.body;
    const subCategory = await SubCategory.findById(req.params.id);

    if (!subCategory) return res.status(404).json({ message: "SubCategory not found" });

    let updateData = { name, category_id, category_name };

    if (req.file) {
      await cloudinary.uploader.destroy(subCategory.cloudinary_id);
      const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "subcategories",
        transformation: [{ width: 500, height: 500, crop: "limit" }],
      });
      updateData.image = uploadedImage.secure_url;
      updateData.cloudinary_id = uploadedImage.public_id;
    }

    const updatedSubCategory = await SubCategory.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ message: "SubCategory updated successfully", subCategory: updatedSubCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete SubCategory
exports.deleteSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id);

    if (!subCategory) return res.status(404).json({ message: "SubCategory not found" });

    await cloudinary.uploader.destroy(subCategory.cloudinary_id);
    await SubCategory.findByIdAndDelete(req.params.id);
    res.json({ message: "SubCategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
