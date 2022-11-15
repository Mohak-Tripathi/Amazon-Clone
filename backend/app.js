const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser"); //for cloudiary
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv")


const errorMiddleware = require("./middlewares/errors");


//Setting up Config files
dotenv.config({path: "backend/config/config.env"})

app.use(express.json()); // middleware for post request.
app.use(bodyParser.urlencoded({ extended: true })); // for cloudinary
//Invokie Cookie parser Middleware.
app.use(cookieParser());
app.use(fileUpload())



//Import all routes
const products = require("./routes/productRoutes");
const auth = require("./routes/authRoutes");
const orders = require("./routes/orderRoutes");
const payment = require("./routes/payment")

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", orders);
app.use("/api/v1", payment);


// Middleware to handle errors.

app.use(errorMiddleware);

module.exports = app;
