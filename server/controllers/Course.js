const Courses = require("../models/Courses");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadToCloudinary} = require("../utils/imageUploader");

//create course handler
exports.createCourse = async(req,res) => {
    try{
        //fetch data
        const {courseName,courseDescription,whatYouWillLearn,price,tag,status} = req.body;

        //fetch file - get thumbnail
        const thumbnail = req.files.thumbnailImage;

        //validation
        if(!courseName,!courseDescription,!whatYouWillLearn,!price,!tag || !thumbnail){
            return res.status(400).json({
                success:false,
                message:'All field are required'
            })
        }
        //instructor validation middleware se kr chuke hoenge || fetch from db
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details:",instructorDetails);

        if(!instructorDetails){
            return res.status(400).json({
                success:false,
                message:'Instructor not Found'
            })
        }

        //Tag validation
        const tags = await Category.findById(tag);
        if(!tags) throw new Error("Tag missing !")
        
        //Upload Img to cloud
        const thumbnailImage = uploadToCloudinary(thumbnail,process.env.FOLDER_NAME)

        //create course entry in 
        const CreatedCourse = await Courses.create({
            courseName,courseDescription,instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,price,category:tags._id,thumbnail:thumbnailImage.secure_url,
            status:status
        })

        //add course in TagSchema,User(instructor),
        await User.findByIdAndUpdate( {_id:instructorDetails._id},
            {$push:{courses:CreatedCourse._id}},{new:true} );
        
        await new Category({
            name:courseName,description:courseDescription,course:CreatedCourse._id
        }).save();

        //return Response
        return res.status(200).json({
            success:true,
            message:"course karadk chal rha hai 😂😂",
            data:CreatedCourse
        })

    }catch(error){
        return res.status(400).json({
            success:false,
            message:"Bad Request No course right now !"
        })
    }
}

//fetch all courses
exports.getAllCourses = async (req,res) =>{
    try{
        const allCourses = await Courses.find({},{courseName:true,price:true,thumbnail:true,instructor:true,
                                                ratingandReviews:true,StudentEnrolled:true}).populate("instructor").lean().exec();
        return res.json({
        success: true,
        data: allCourses
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"cannot fetch course, Server busy try again later",
            error:error.message
        })
    }
}

//getCourseDetail
exports.getCourseDetails = async(req,res) => {
    try {
        //get Id
        const {courseId} = req.body;

        //find course Details

        const courseDetails = await Courses.find({_id:courseId}).populate
                            ({
                                path:"instructor",
                                populate:{
                                    path:"profile"  
                                }
                            })
                        .populate("category")
                        // .populate("ratingandReviews")
                        .populate({
                            path:"courseContent",
                            populate:
                            {path:"subSection"}
                        }).lean().exec();
        //validation
        if(!courseDetails) throw new Error(`invalid courseId : ${courseId}`)

        //return response
        return res.status(200).json({
            success:true,
            message:"course detail fetched successfully",
            data:courseDetails
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"cannot fetch course, Server busy try again later",
            error:error.message
        })
    }
}