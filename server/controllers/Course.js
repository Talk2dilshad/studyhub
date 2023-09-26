const Courses = require("../models/Courses");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadToCloudinary} = require("../utils/imageUploader");

//create course handler
exports.createCourse = async(req,res) => {
    try{
        //fetch data
        let {courseName,courseDescription,whatYouWillLearn,price,tag:_tag,status,category,instructions: _instructions} = req.body;

        //fetch file - get thumbnail
        const thumbnail = req.files.thumbnailImage;

        //convert the tag and instructions from stringified array to array
        const tag = JSON.parse(_tag);
        const instructions = JSON.parse(_instructions);

        console.log(tag,instructions);

        //validation
        if(!courseName ||
          !courseDescription ||
          !whatYouWillLearn ||
          !price ||
          !tag.length ||
          !thumbnail ||
          !category ||
          !instructions.length){
            return res.status(400).json({
                success:false,
                message:'All field are required'
            })
        }

        if(!status || status === undefined)
        {
          status = "Draft";
        }


        //instructor validation middleware se kr chuke hoenge || fetch from db
        const userId = req.user.id;
        // Check if the user is an instructor
        const instructorDetails = await User.findById(userId, {
          accountType: "Instructor",
        });      
        console.log("Instructor Details:",instructorDetails);

        if(!instructorDetails){
            return res.status(400).json({
                success:false,
                message:'Instructor not Found'
            })
        }

        //Tag validation
        const category_valid = await Category.findById(category);
        if(!category_valid) throw new Error("Tag missing !")
        console.log("category valid");
        //Upload Img to cloud
        const thumbnailImage = uploadToCloudinary(thumbnail,process.env.FOLDER_NAME)

        //create course entry in 
        const CreatedCourse = await Courses.create({
          courseName,
          courseDescription,
          instructor: instructorDetails._id,
          whatYouWillLearn: whatYouWillLearn,
          price,
          tag,
          category: category_valid._id,
          thumbnail: thumbnailImage.secure_url,
          status: status,
          instructions,
        })

        console.log("course created line 78",CreatedCourse)

        //add course in TagSchema,User(instructor),
        await User.findByIdAndUpdate( {_id:instructorDetails._id},
            {$push:{courses:CreatedCourse._id}},{new:true} );
        
        console.log("added  course int user teacher")
        // Add the new course to the Categories
        const Updatedcategory = await Category.findByIdAndUpdate(
        { _id: category },
        {
          $push: {
            courses: CreatedCourse._id,
          },
        },
        { new: true }
      )
       console.log(
        "added course into category"
       )
        //return Response
        return res.status(200).json({
            success:true,
            message:"course karadk chal rha hai 😂😂",
            data:CreatedCourse
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Failed to create course  !"
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

//edit course
exports.editCourse = async(req,res) => {
    try{
        const {courseId} = req.body
        const updates = req.body
        const course = await Courses.findById(courseId);

        if(!course) return res.status(404).json({error: "course not found"})

        //if thumbnail image is found
        if(req.files){
            console.log("thumbnail update")
            const thumbnail = req.files.thumbnailImage
            const thumbnailImage = await uploadToCloudinary(thumbnail,process.env.FOLDER_NAME)
            course.thumbnail = thumbnailImage.secure_url;
        }

        //update only the fields that are present in the request body
        for(const key in updates){
            if(updates.hasOwnProperty(key)){
                if(key === "tag" || key === "instructions"){
                    course[key] = JSON.parse(updates[key])
                }else{
                    course[key] = updates[key]
                }
            }
        }

        await course.save();


        const updatedCourse = await Courses.findOne({_id:courseId}).populate({path:"instructor",populate:{path:"profile"}})
        .populate("category")// .populate("ratingandReviews")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();


        res.json({
            success:true,
            message:"Course updated successfully",
            data:updatedCourse,
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error: error.message
        })
    }
}