const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const { name, category_id, category_name, subcategory_id, subcategory_name, original_price, discount_price } = req.body;
    
    if (!name || !category_id || !category_name || !subcategory_id || !subcategory_name || !original_price || !discount_price || !req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
      folder: "products",
      transformation: [{ width: 500, height: 500, crop: "limit" }],
    });

    const newProduct = new Product({
      name,
      category_id,
      category_name,
      subcategory_id,
      subcategory_name,
      image: uploadedImage.secure_url,
      cloudinary_id: uploadedImage.public_id,
      original_price,
      discount_price,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const { name, category_id, category_name, subcategory_id, subcategory_name, original_price, discount_price } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    let updateData = { name, category_id, category_name, subcategory_id, subcategory_name, original_price, discount_price };

    if (req.file) {
      await cloudinary.uploader.destroy(product.cloudinary_id);
      const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
        transformation: [{ width: 500, height: 500, crop: "limit" }],
      });
      updateData.image = uploadedImage.secure_url;
      updateData.cloudinary_id = uploadedImage.public_id;
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category_id subcategory_id", "name");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    await cloudinary.uploader.destroy(product.cloudinary_id);
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
