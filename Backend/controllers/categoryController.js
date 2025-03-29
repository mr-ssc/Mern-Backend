const Category = require("../models/Category");
const cloudinary = require("../config/cloudinary");

// Create Category
exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || !req.file) {
            return res.status(400).json({ message: "Name and Image are required" });
        }

        // Upload image to Cloudinary
        const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
            folder: "categories",
            transformation: [{ width: 500, height: 500, crop: "limit" }],
        });

        const newCategory = new Category({
            name,
            image: uploadedImage.secure_url, 
            cloudinary_id: uploadedImage.public_id, 
        });

        await newCategory.save();
        res.status(201).json({ message: "Category created successfully", category: newCategory });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Category
exports.updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category.findById(req.params.id);

        if (!category) return res.status(404).json({ message: "Category not found" });

        let updateData = { name };

        if (req.file) {
            if (category.cloudinary_id) {
                await cloudinary.uploader.destroy(category.cloudinary_id);
            }

            const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
                folder: "categories",
                transformation: [{ width: 500, height: 500, crop: "limit" }],
            });

            updateData.image = uploadedImage.secure_url;
            updateData.cloudinary_id = uploadedImage.public_id;
        }

        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });

        res.json({ message: "Category updated successfully", category: updatedCategory });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) return res.status(404).json({ message: "Category not found" });

        if (category.cloudinary_id) {
            await cloudinary.uploader.destroy(category.cloudinary_id);
        }

        await Category.findByIdAndDelete(req.params.id);

        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
