const express = require('express');
const app = express();

const errorMiddleware = require("./middlewares/errors")

app.use(express.json()) // middleware for post request.





//Import all routes
const products = require("./routes/productRoutes")
const auth = require("./routes/authRoutes")

app.use("/api/v1", products)
app.use("/api/v1", auth)



// Middleware to handle errors.

app.use(errorMiddleware);

module.exports = app;