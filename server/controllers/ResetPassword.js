const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const clientURL = 'http://localhost:3000';
const {passwordUpdated} = require("../mail/templates/passwordUpdate");
require("dotenv").config();


exports.resetPasswordToken = async (req, res) => {
    try {
		const email = req.body.email;
		
		const user = await User.findOne({ email: email });
		if (!user) {
			return res.json({
				success: false,
				message: `${email} is not registered !`,
			});
		}
		const token = crypto.randomBytes(32).toString("hex");

		const updatedDetails = await User.findOneAndUpdate(
			{ email: email },
			{
				token: token,
				resetPasswordExpires: Date.now() + 3600000,
			},
			{ new: true }
		);
		console.log("DETAILS", updatedDetails);
	    const id = user._id;
        // Create the reset password link
		const link = `${clientURL}/update-password/${id}/${token}`;
		// http://localhost:3000/update-password/${token}
        // Send email with the reset password link
        await mailSender(
            email,
            "Reset Password Link",
            `<body style="background: radial-gradient(circle at top left, #004E92, #00224D);">
              <div style="position: relative; width: 400px; margin: 0 auto; padding: 20px; border-radius: 10px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); backdrop-filter: blur(10px); background-color: rgba(255, 255, 255, 0.1); overflow: hidden; font-family: Arial, sans-serif;">
                <h2 style="color: #fff; font-size: 24px; margin-top: 0; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);">Password Reset</h2>
                <p style="color: #fff; font-size: 16px; margin-bottom: 20px; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);">Click the link below to reset your password:</p>
                <a href="${link}" style="display: inline-block; background-color: rgba(255, 255, 255, 0.4); color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 18px; box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3); transition: background-color 0.3s ease;">Reset Password</a>
              </div>`
        );


		res.json({
			success: true,
			message:
				"Email Sent Successfully, Please Check Your Email to Continue Further!",
		});
	} catch (error) {
		return res.json({
			error: `Try again later`,
			success: false,
		});
	}
};

//reset password
exports.resetPassword = async (req, res) => {
	try {
		const { password, confirmPassword, token ,userId} = req.body;

		if (confirmPassword !== password) {
			return res.json({
				success: false,
				message: "Password and Confirm Password Does not Match",
			});
		}
		const userDetails = await User.findOne({ token: token });
		if (!userDetails) {
			return res.json({
				success: false,
				message: "Token is Invalid",
			});
		}
		if (!(userDetails.resetPasswordExpires > Date.now())) {
			return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
		}
		const encryptedPassword = await bcrypt.hash(password, 10);
		await User.findOneAndUpdate(
            { token: token },
            { password: encryptedPassword, $unset: { token: 1 } }, // Use $unset to remove the 'token' field
            { new: true }
          );
		// notify user by mail password reset
		const user =await User.findById({_id:userId})
		const name = user.firstname;
		const emailbody = passwordUpdated(user.email,name)
		await mailSender(user.email,"StudyHub - password updated !",emailbody);
		
		res.json({
			success: true,
			message: `Password Reset Successful`,
            token:token
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
	}
};