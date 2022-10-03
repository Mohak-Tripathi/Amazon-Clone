const User = require('../models/userModel');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');

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

// const token= user.getJwtToken()

    // res.status(201).json({   // before sendToken function
    //     success: true,
    //     // user,
    //     token
    // })

    sendToken(user, 201, res)  // SENDING WHOLE "res" object too in jwtToken.js

})


// Login User  =>  /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // Checks if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    // Finding user in database
    const user = await User.findOne({ email }).select('+password') //becz in model it is false. 

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401)); //401=> bad request
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }


    // const token= user.getJwtToken()

    // res.status(201).json({   // before sendToken function
    //     success: true,
    //     token
    // })

    sendToken(user, 200, res) // SENDING WHOLE "res" object too in jwtToken.js
})


// Forgot Password   =>  /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();
   

    await user.save({ validateBeforeSave: false });  //saved it in DB temporary basis, we will remove it sooner.

    // Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`

    try {

        await sendEmail({
            email: user.email,
            subject: 'Amazon-Clone Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;   // if error make it empty
        user.resetPasswordExpire = undefined;   // if error make it empty

        await user.save({validateBeforeSave: false });


        return next(new ErrorHandler(error.message, 500))
    }

})


// Reset Password   =>  /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')  //needed becz if you see in DB we stored hashed "resetPasswordToken" but we are sending normal resettoken to user in email. But now we are comparing from db so -- req.params.token (will get user token) and then comapring in db but in db it is hashed so doing unhashed with this line of code.

    const user = await User.findOne({  //trying to find with resetpasswordtoken
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }  //ensuring not expired now. 
    })

    if (!user) {
        return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400))
    }

    // Setup new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res)

})





// Logout user   =>   /api/v1/logout

exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})



// Get currently logged in user details   =>   /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);  //req.user => get in authentication

    res.status(200).json({
        success: true,
        user
    })
})

