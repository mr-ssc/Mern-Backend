const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

dotenv.config();
connectDB();
app.use(bodyParser.json());



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/category", require("./routes/categoryRoutes"));
app.use("/api/subcategory", require("./routes/subCategoryRoutes"));
app.use("/api/product", require("./routes/productRoutes"));
app.use("/api/users", require("./routes/userRoutes") );
app.use("/api/orders", require("./routes/orderRoutes") );








// devlopment 

// const PORT = process.env.PORT || 9999;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// Deployment


module.exports = app;