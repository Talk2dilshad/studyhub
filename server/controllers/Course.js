const Courses = require("../models/Courses");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadToCloudinary} = require("../utils/imageUploader");
const Section = require("../models/Section");
const Subsection = require("../models/Subsection");
const CourseProgress = require("../models/CourseProgress");
const { convertSecondsToDuration } = require("../utils/secToDuration");

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
        const thumbnailImage = await uploadToCloudinary(thumbnail,process.env.FOLDER_NAME)
        console.log("thumbnail Image create course",thumbnailImage)
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

        const courseDetails = await Courses.findOne({_id:courseId}).populate
                            ({
                                path:"instructor",
                                populate:{
                                    path:"profile"  
                                }
                            })
                        .populate("category")
                        .populate({
                            path:"courseContent",
                            populate:
                            {path:"subSection",select: "-videoUrl",}
                        }).exec();

                        
        console.log("populating ...",courseDetails)
        //validation
        if(!courseDetails) throw new Error(`invalid courseId : ${courseId}`)
        
        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
          content.subSection.forEach((subSection) => {
            const timeDurationInSeconds = parseInt(subSection.timeDuration)
            totalDurationInSeconds += timeDurationInSeconds
          })
        })
    
        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        //return response
        return res.status(200).json({
            success:true,
            message:"course detail fetched successfully",
            data:{courseDetails,totalDuration}
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


//Get a list of course for a given Instructor
exports.getInstructorCourses = async(req,res) =>{
    try{
        const instructorId = req.user.id;
        //find the courses belonging to the instructor
        const instructorCourses = await Courses.find({
            instructor:instructorId,
        }).sort({createdAt: -1})

        //return the instructor's courses
        res.status(200).json({
            success:true,
            data:instructorCourses
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:"failed to retrive",
            error:error.message
        })
    }
}

exports.deleteCourse = async (req,res) => {
    try{
        const {courseId} = req.body;
        //find course
        const course = await Courses.findById(courseId);

        if(!course){
            return res.status(404).json({
                message:"Course not found"
            })
        }
        console.log("console log course backend",course)
        //unenroll students from the course
        
        const studentsEnrolled = Courses.studentsEnrolled;
        if(studentsEnrolled){
            for(const id of studentsEnrolled){
                await User.findByIdAndUpdate(id,{
                    $pull:{courses:courseId}
                })
            }
        }

        // Delete sections and sub-sections
        const courseSections = course.courseContent
        if(courseSections){
            for (const sectionId of courseSections) {
            // Delete sub-sections of the section
            const section = await Section.findById(sectionId)
            if (section) {
                const subSections = section.subSection
                for (const subSectionId of subSections) {
                await Subsection.findByIdAndDelete(subSectionId)
                }
            }
            
            // Delete the section
            await Section.findByIdAndDelete(sectionId)
        }
            
        //Delete the course now
        await Courses.findByIdAndDelete(courseId);

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
          })
    }

    }catch (error) {
        console.error(error)
        return res.status(500).json({
          success: false,
          message: "Server error",
          error: error.message,
        })
    }
}

exports.getFullCourseDetails = async(req,res)=>{
    try{
        const {courseId} = req.body;
        const userId = req.user.id;
        const courseDetails = await Courses.findOne({_id:courseId})
        .populate({path:"instructor",populate:{path:"profile"}})
        .populate("category")
        .populate({
            path: "courseContent",
            populate: {
              path: "subSection",
            },
        })
        .exec()
        // Check if the field exists before populating
        if (courseDetails && courseDetails.ratingAndReviews) {
            await courseDetails.populate("ratingAndReviews").execPopulate();
        }
        
        
    
    let courseProgressCount = await CourseProgress.findOne({
        courseId:courseId,
        userId:userId
    })

    console.log("courseProgressCount",courseProgressCount);

    if(!courseDetails){
        return res.status(400).json({
            success:false,
            message:`couldn't find ${courseId}`
        })
    }

    let totalDurationInSeconds = 0;
    courseDetails.courseContent.forEach( (content)=>{
        content.subSection.forEach( (subSection) => {
            const timeDurationInSeconds = parseInt(subSection.timeDuration)
            totalDurationInSeconds += timeDurationInSeconds;
        })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    return res.status(200).json({
        success:true,
        data:{
            courseDetails,
            totalDuration,
            completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
        }
    })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
          })
    }
}