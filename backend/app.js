const express = require('express');
const app = express();


app.use(express.json()) // middleware for post request.


//Import all routes
const products = require("./routes/productRoutes")

app.use("/api/v1", products)


module.exports = app;