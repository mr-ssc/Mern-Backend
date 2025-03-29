const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "categories",
        allowed_formats: ["jpg", "png", "jpeg"],
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB file size limit
    fileFilter: (req, file, cb) => {
        if (!["image/jpeg", "image/png", "image/jpg"].includes(file.mimetype)) {
            return cb(new Error("Only JPG, JPEG, and PNG files are allowed"), false);
        }
        cb(null, true);
    }
});

module.exports = upload;
