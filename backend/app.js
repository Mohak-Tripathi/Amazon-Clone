const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser"); //fpr cloudiary

const errorMiddleware = require("./middlewares/errors");

app.use(express.json()); // middleware for post request.

app.use(bodyParser.urlencoded({ extended: true })); // for cloudinary

//Invokie Cookie parser Middleware.
app.use(cookieParser());

//Setting up cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Import all routes
const products = require("./routes/productRoutes");
const auth = require("./routes/authRoutes");
const orders = require("./routes/orderRoutes");

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", orders);

// Middleware to handle errors.

app.use(errorMiddleware);

module.exports = app;
