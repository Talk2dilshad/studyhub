const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
require("dotenv").config();

//send OTP
exports.sendOTP= async(req,res) => {
    try{
    //fetch email from reqbody
    const {email} = req.body;

    //check if user already exit
    const checkUserPresent = await User.findOne({email});

    if(checkUserPresent){
        return res.status(401).json({
            success:false,
            message:'User already exists'
        })
    }
    //generate otp
    async function otpGenerate(){
        let otp;
        let isUnique = false;

        do{
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            });
            const existingOTP = await OTP.findOne({otp});
            isUnique = !existingOTP;
        }while(!isUnique);
        
        return otp;
    };

    const otp = await otpGenerate();
    
    console.log("OTP generated : ",otp);

    // CREATE ENTRY FOR OTP
    const otp_db = await OTP.create({email,otp});
    console.log(otp_db);

    //response
    res.status(200).json({
        success:true,
        message:'OTP generated !!!',
        otp
    })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }

}


//signUp
exports.signUp = async(req,res) => {
    try{
        //data fetch
    const {firstname,lastname,email,password,confirmpassword,accountType,contactNumber,otp} = req.body;
    
    if(!firstname||! lastname|| !email ||!password||!confirmpassword||!accountType||!otp){
        return res.status(403).json({
            success:false,
            message:"All field required"
        })
    }
    //validate kro
    //2password match
    if(password !== confirmpassword)
        return res.status(400).json({
            success:false,
            message:"Password doesn't match"
        })
    //check user already exist or not
    const existingUser = await User.findOne({email});
    if(existingUser)
    {
        return res.status(400).json({
            success:false,
            message:"email is already registered"
        })
    }



    //find most recent OTP stored for the user
    const recentOTP = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    console.log("signUp: ",recentOTP);

    //validate OTP
    if(recentOTP.length === 0){
        //otp not found
        return res.status(400).json({
            success:false,
            message:"OTP NOT FOUND"
        })
    }
    else if(otp !== recentOTP[0].otp){
        //invalid otp
        return res.status(400).json({
            success:false,
            message:"invalid otp"
        })
    }

    //hash password
    const hashed_password = await bcrypt.hash(password,10);


    //entry created in DB
    // user ka phone no. ko profile me add kr do by default
    const profileDetail = await Profile.create({
        contactNumber:contactNumber
    });

    const user = await User.create({
        firstname,
        lastname,
        email,
        contactNumber,
        accountType:accountType,
        password:hashed_password,
        profile:profileDetail._id,
        profile_pic:`https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`
    })
    return res.status(200).json({
        success: true,
        user,
        message: "User registered successfully",
    });
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:"Unable to register user"
        })
    }
}

//signIn controller 
exports.login = async(req,res) =>{
    try{
        // data fetch
        const {email,password} = req.body;
        // validation
        if(!email ||  !password){
            return res.status(403).json({
                success:false,
                message:"Fill the fields !"
            })
        }

        // check user exit in DB 
        const user = await User.findOne({email}).populate("profile");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Unauthorized,Access Denied !"
            })
        }

        
        //generate JWT,after password matching
        if(await bcrypt.compare(password,user.password)){
            const payload = {
                email:user.email,
                id:user._id,
                role:user.accountType
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"24h",
            });
            user.token = token;
            user.password = undefined;


            const options = { 
                expires: new Date(Date.now() + 24*60*60*1000),
                httpOnly:true,
                sameSite: 'strict', // or 'lax' or 'none' based on your requirements
                secure: true, // Remember to set 'secure' if using 'sameSite=none'
            }
            //create cookie and send response
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password incorrect"
            })
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Come back Later, Server Busy"
        })
    }
};

//changePassword
exports.changePassword = async(req,res) =>{
    try{
    //get data from req body 
    //get oldPassword,newPassword,confirmPassword
    const {oldPassword,newPassword,confirmNewPassword} = req.body;    
    
    //validation 
    // check user exit in DB 
    const user = await User.findById(req.user.id);
    if(!user){
        return res.status(401).json({
            success:false,
            message:"No Account Exits !"
        })
    }
    //check newpassword match confirmpassword
    if(newPassword !== confirmNewPassword)
    {
        return res.status(403).json({
            success:false,
            message:"New Password and confirm Password Doesn't match"
        })
    }
    
    // validate the old password
    const isPasswordMatch = await bcrypt.compare(
        oldPassword,user.password
    )
    if(!isPasswordMatch){
        // if old password isn't valid
        return res.status(401).json({success:false,message:"incorrect password"})
    }

    //Encrypt the new password
    //hash password
    const hashed_password = await bcrypt.hash(newPassword,10);

    //update pwd in db
    //find the user by the ID and replace the existing code
    const updatedUser= await User.findByIdAndUpdate(req.user.id,{password:hashed_password},{new:true})


    //send mail -- password updated
    async function send_mail_to_user(){
        try{
            const mailResponse = await mailSender(updatedUser.email,`Password updated successfully for ${updatedUser.firstname} ${updatedUser.lastname}`);
        }
        catch(err){
            console.log("error occured while sending mail",err);
        }
    }
    await send_mail_to_user();
    //return response
    return res.status(200).json({
        success:true
    })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error occurred while updating password"
        })
    }
}


 