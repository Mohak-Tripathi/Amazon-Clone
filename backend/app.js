const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const errorMiddleware = require("./middlewares/errors")

app.use(express.json()) // middleware for post request.

//Invokie Cookie parser Middleware. 
app.use(cookieParser())




//Import all routes
const products = require("./routes/productRoutes")
const auth = require("./routes/authRoutes")
const orders = require("./routes/orderRoutes")

app.use("/api/v1", products)
app.use("/api/v1", auth)
app.use("/api/v1", orders)



// Middleware to handle errors.

app.use(errorMiddleware);

module.exports = app;