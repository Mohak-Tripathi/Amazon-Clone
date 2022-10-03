const Product = require("../models/productModel")

const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const APIFeatures = require("../utils/apiFeatures")

//Create new Product.  => api/v1/product/new
exports.newProduct =   catchAsyncErrors(async(req,res,next)=>{


    req.body.user = req.user.id;   //added in chapter- 39. Added "user" field so that we can identify "who ceated the product". Made needed changes in userModel.js too.


    const product = await Product.create(req.body);

    res.status(200).json({
        success: true,
        response : product
    })
})



//Get all products => api/v1/products?keyword=apple 
exports.getProducts =  catchAsyncErrors(async (req, res, next) => {

    
    const resPerPage = 4;
const productCount = await Product.countDocuments() // this we will use in frontend. //Will Show total


    // console.log(req.query, "recheck") 
    const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage) 


    // console.log(apiFeatures)

    const products = await apiFeatures.query; // why query?

    // console.log(products, "heheh")
    res.status(200).json({
        success: true,
        count: products.length, //will show current products visible in one page
        productCount, //Will showtotal products
        response : products
    })
})


// Get single product details   =>   /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors( async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));

        // return res.status(404).json({   //till the point global error handling is not introduced.
        //     success: false,
        //     message: 'Product not found'
        // })
    }


    res.status(200).json({
        success: true,
        response: product
    })

})


// Update Product   =>   /api/v1/admin/product/:id
exports.updateProduct =    catchAsyncErrors( async(req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
         return next(new ErrorHandler('Product not found', 404));

        
        // return res.status(404).json({   //till the point global error handling is not introduced.
        //     success: false,
        //     message: 'Product not found'
        // })
    }

    // let images = []
    // if (typeof req.body.images === 'string') {
    //     images.push(req.body.images)
    // } else {
    //     images = req.body.images
    // }

    // if (images !== undefined) {

    //     // Deleting images associated with the product
    //     for (let i = 0; i < product.images.length; i++) {
    //         const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    //     }

    //     let imagesLinks = [];

    //     for (let i = 0; i < images.length; i++) {
    //         const result = await cloudinary.v2.uploader.upload(images[i], {
    //             folder: 'products'
    //         });

    //         imagesLinks.push({
    //             public_id: result.public_id,
    //             url: result.secure_url
    //         })
    //     }

    //     req.body.images = imagesLinks

    // }



    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

 
    res.status(200).json({
        success: true,
        response : product
    })

})



// Delete Product   =>   /api/v1/admin/product/:id
exports.deleteProduct =    catchAsyncErrors(async(req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
        // return res.status(404).json({  
        //     success: false,
        //     message: 'Product not found'
        // })
    }

    // Deleting images associated with the product
    // for (let i = 0; i < product.images.length; i++) {
    //     const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    // }

    await product.deleteOne();  // .remove() is deprecated

    res.status(200).json({
        success: true,
        message: 'Product is deleted.'
    })

})
