const User = require('../models/userModel');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
// const sendToken = require('../utils/jwtToken');
// const sendEmail = require('../utils/sendEmail');

const crypto = require('crypto');
// const cloudinary = require('cloudinary');



// Register a user   => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    // const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //     folder: 'avatars',
    //     width: 150,
    //     crop: "scale"
    // })

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "www.google.com",
            url: "www.google.com"
        }
    })

const token= user.getJwtToken()

    res.status(201).json({   // before sendToken function
        success: true,
        // user,
        token
    })

    // sendToken(user, 200, res)

})