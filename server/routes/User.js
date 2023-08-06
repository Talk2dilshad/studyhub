//import the required modules
const express = require("express");
const router = express.Router();

//Import the required controller and middleware function
const {login,signUp,sendOTP,changePassword} = require("../controllers/Auth");

const {resetPassword,resetPasswordToken} = require("../controllers/ResetPassword");

const {auth} = require("../middlewares/auth");


// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login",login);

//Route  for user signUp
router.post("/signup",signUp);

router.post("/sendotp",sendOTP);

router.post("/changepassword",auth,changePassword);

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// route for generating a reset password token
router.post("/reset-password-token",resetPasswordToken);

//resetting password user password after verification;
router.post("/reset-password",resetPassword);

module.exports = router;