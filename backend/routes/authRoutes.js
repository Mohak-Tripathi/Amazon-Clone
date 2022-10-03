const express = require('express');

const router= express.Router(); 

const {registerUser, loginUser, logoutUser} = require('../controllers/authController')
const {isAuthenticatedUser } = require('../middlewares/auth');


router.route("/register").post( registerUser)
router.route("/login").post(isAuthenticatedUser, loginUser)


router.route("/logout").get(isAuthenticatedUser, logoutUser)  //logout is applicable to only those who have logged in first so "isAuthenticatedUser"



module.exports = router
