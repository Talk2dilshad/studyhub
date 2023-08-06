const {instance} =require("../config/razorpay");
const Courses = require("../models/Courses");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const{default:mongoose} = require("mongoose");
//template add krna done

//capture the payment and initiate the razorpay order

exports.capturePayment = async (req,res) => {
    //userid course id
    const {course_id} = req.body;
    const userId = req.user.id;
    //validation 
    // user should not bypass courseId // course Detail
    if(!course_id) throw new Error("please provide valid course id");
    if(!userId) throw new Error("user missing !")

    let course;
    try{
        course = await Courses.findById(course_id);
        if(!course) throw new Error("couldn't find course")
        //user already paid 
        // user already pay for the same course
        const uid = new mongoose.Types.ObjectId(userId);//object id me coversion hua string se

        if(course.StudentEnrolled.includes(uid)){
            throw new Error("Course purchased already !")
        }
    }catch(error){
        throw new Error(error.message);
    }

    
    //order create
    const amount = course.price;
    const currency = 'INR';
    const options = {
        amount:amount*100,
        currency,
        receipt:Math.random(Date.now()).toString(),
        notes:{
            courseId:course_id,
            userId,
        }
    }

    try{
        //initiate the payment using razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);
        //return response
        return res.status(200).json({
            success:true,
            courseName:course.courseName,
            courseDescription:course.courseDescription,
            thumbnail:course.thumbnail,
            orderId:paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount,
        });
    }catch(error){
        console.log(error);
        res.json({
            success:false,
            message:"could not initiate order",
        })
    }

};

// verify signature of Razorpay and server

exports.verifySignature = async(req,res) =>{

    //webhook {server ka secret}
    const webhookSecret = process.env.WEBHOOK_SECRET;
    // fetch signature from razorpay
    const signature= req.header["x-razorpay-signature"];
    //hased based message auth code
    //hmac (obj) => hash algo + secret_key
    const shasum = crypto.createHmac("sha256",webhookSecret);
    shasum.update(JSON.stringify(req.body));

    const digest = shasum.digest('hex');

    if(digest === signature){
        console.log("Payment Authorized");

        
        const {courseId,userId} = req.body.payload.payment.entity.notes;
        try{
            //action fullfill krna padega
            //find course and enrolled student
            //course me bacho ko enrolled krwao
            const enrolledCourse = await Courses.findOneAndUpdate({_id:courseId},
                                                                {$push:{StudentEnrolled:userId}},
                                                                {new:true});
            if(!enrolledCourse) {throw new Error("course not found")};

            console.log(enrolledCourse);
            //user k course me course.id store kro
            const enrolledStudent = await User.findOneAndUpdate({_id:userId},
                                                                {$push:{courses:courseId}},{new:true});
            console.log(enrolledStudent);

            //find student name and course name for mail
            const course = await Courses.findById(courseId);
            const user= await User.findById({userId});
            const userName = user.firstname+ " " + user.lastname;
            const courseName = course.courseName;
            const emailBody = courseEnrollmentEmail(courseName, userName);
            // Send the email using the mailSender function
            const emailResponse = await mailSender(enrolledStudent.email, "Course Enrollment Confirmation", emailBody);            
            return res.status(200).json({
                success:true,
                message:"signature verified,student enrolled"
            });
            
        }catch(error){
            throw new Error(error.message);
        }
    }
    else{
        return res.status(400).json({
            success:false,
            message:"invalid request"
        })
    }

}