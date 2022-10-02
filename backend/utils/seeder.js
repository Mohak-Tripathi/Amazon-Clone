const Product = require('../models/productModel');
const dotenv = require('dotenv'); // because we need database. DB rely on dotenv. 
const connectDatabase = require('../config/database');

const products = require('../data/products');

// Setting dotenv file
dotenv.config({ path: 'backend/config/config.env' })

connectDatabase(); // called database


const seedProducts = async () => {
    try {

        await Product.deleteMany();
        console.log('Products are deleted');

        await Product.insertMany(products) // imported the same
        console.log('All Products are added.')

        process.exit(); //exit from process

    } catch (error) {
        console.log(error.message);
        process.exit(); //exit from process
    }
}

seedProducts()