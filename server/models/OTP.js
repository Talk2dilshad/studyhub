const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailVerifyTemplate = require("../mail/templates/emailVerificationTemplate");
const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,

    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60*60*60
    }
}) 
// ye code otp backend store krta h
async function sendVerificationEmail(email,otp){
    try{
        const emailbody = emailVerifyTemplate(otp);
        const mailResponse = await mailSender(email,"Verification Email from StudyHub",emailbody);
        console.log(mailResponse);
    }
    catch(err){
        console.log("error occured while sending mail",err);
    }
} 
OTPSchema.post("save",async function(doc){
    await sendVerificationEmail(doc.email,doc.otp);
});
module.exports= mongoose.model("OTP",OTPSchema);