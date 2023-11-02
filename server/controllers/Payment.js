const {instance} =require("../config/razorpay");
const Courses = require("../models/Courses");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const{default:mongoose} = require("mongoose");
const CourseProgress = require("../models/CourseProgress");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
//template add krna done

//capture the payment and initiate the razorpay order

exports.capturePayment = async (req,res) => {
    //userid course id
    const {courses} = req.body;
    const userId = req.user.id;
    //validation 
    // user should not bypass courseId // course Detail
    if(!courses) throw new Error("please provide valid course id");
    if(!userId) throw new Error("user id missing !")



    let total_amount = 0;

    for(const course_id of courses){
        let course
        try{
            course = await Courses.findById(course_id);
            //no course -> generate error
            if(!course){
                return res.status(200).json(
                    {
                        success:false,
                        message:"no course found"
                    }
                )
            }
            
            const uid= new mongoose.Types.ObjectId(userId)
            if(course.StudentEnrolled.includes(uid)){
                return res.status(200).json({
                    success:false,
                    message:"You are already enrolled in course"
                })
            }

            total_amount += course.price;


        }catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }

    
    //order create
    const currency = 'INR';
    const options = {
        amount:total_amount*100,
        currency,
        receipt:Date.now().toString() + userId,
    }

    try{
        //initiate the payment using razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);
        //return response
        return res.status(200).json({
            success:true,
            data:paymentResponse
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

    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses

    const userId = req.user.id;

    if (
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature ||
        !courses ||
        !userId
    ) {
        return res.status(200).json({ success: false, message: "Payment Failed" })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto.createHmac("sha256",process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");

    if(expectedSignature === razorpay_signature){
        await enrollStudent(courses,userId,res)
        return res.status(200).json({
            success:true,
        })
    }

    return res.status(200).json({
        success:false,
        message:`"payment failed  "+${userId} + " c " + ${courses}`
    });

    
}

//function to enroll student in the courses
const enrollStudent = async (courses,userId,res) => {
    if(!courses || !userId) {
        return res.status(400)
        .json({
            success:false,
            message:"user & course not found"
        })
    }

    for(const courseId of courses){
        try{
            //find the course and enroll the student in it
            const enrolledCourse =  await Courses.findOneAndUpdate({_id:courseId},
                             {$push:{StudentEnrolled:userId}},
                             {new:true})

            if(!enrolledCourse){
                return res.status(500)
                .json({success:false,error:"something is wrong with course information"})
            }

            console.log("updated course: ",enrollStudent);

            const courseProgress = await CourseProgress.create({
                courseId:courseId,
                userId:userId,
                completedVideos:[],
            })

            const enrolledStudent = await User.findByIdAndUpdate(userId,
                {
                    $push:{
                        courses:courseId,
                        courseProgress:courseProgress._id,
                    }
                },{new:true});

            console.log("Enrolled Student ",enrolledStudent)

            //send an email notification to the enrolled Student
            const emailResponse = await mailSender(enrolledStudent.email,
            `Successfully Enrolled into ${enrolledCourse.courseName}`,
            courseEnrollmentEmail(enrolledCourse.courseName,
                `${enrolledStudent.firstname} ${enrolledStudent.lastname}`)
            )

            console.log("Email sent successfully: ", emailResponse.response)
            
            
        }catch(error){
            console.log(error)
            return res.status(400).json({ success: false, error: error.message })
        }
    }
}



//Send Payment Success Email
exports.sendPaymentRecieptEmail = async(req,res) => {
    const {orderId,paymentId,amount} = req.body;

    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId){
        return res.status(400).json({
            success:false,
            message:"something went wrong during payment"
        })
    }

    try{
        const enrolledStudent = await User.findById(userId);
        await mailSender(enrolledStudent.email,
        `Payment Received`,
        paymentSuccessEmail(
            `${enrolledStudent.firstname} ${enrolledStudent.lastname}`,
        amount / 100,
        orderId,
        paymentId
        )
        )
    }catch(error){
        return res
      .status(400)
      .json({ success: false, message: "Could not send email" })
    }
}