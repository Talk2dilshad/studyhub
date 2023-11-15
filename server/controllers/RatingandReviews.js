const { default: mongoose } = require("mongoose");
const Courses = require("../models/Courses");
const RatingandReview = require("../models/RatingandReviews");


//create rating
exports.createRating = async(req,res) => {
    try{
        //data fetch
        //user id , rating , review ,courseId
        const userId = req.user.id;

        const {rating,review,courseId} = req.body;
        console.log("rating review data from frontend",rating,review,courseId)
        //validation --enrolled
        const courseEnrolled = await Courses.findOne(
                                    {
                                        _id:courseId,
                                        StudentEnrolled: {$elemMatch: {$eq: userId}},
                                    });
        
        if(courseEnrolled){
            console.log("yes")
        }

        if(!courseEnrolled) throw new Error("you are not enrolled in the course");
        //validation --user already reviews --- check userId exist ? & courseId ?
        const courseReviewed  = await RatingandReview.findOne({
                                user:userId,course:courseId
        })
        console.log("course reviewed ? ",courseReviewed)
        if(courseReviewed) throw new Error("Sorry you already reviewed !!");

        //creating rating review
        const ratingReview = await RatingandReview.create({
                            rating,review,course:courseId,user:userId
        });

        //update course rating review
        const updatedCourseDetails =  await Courses.findByIdAndUpdate(courseId,{
                    $push:{ratingandReviews:ratingReview._id}
        },{new:true});

        console.log(updatedCourseDetails);
        //return response
        return res.status(200).json({
            success:true,
            message:"🎉 Review created 🎉",
            ratingReview
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"cannot review course, Server busy try again later",
            error:error.message
        })
    }
}


//get average rating
/* aggregate ka tarika
// Stage 1: Filter pizza order documents by pizza size
    {
        $match: { size: "medium" }
    },
// Stage 2: Group remaining documents by pizza name and calculate total quantity
    {
        $group: { _id: "$name", totalQuantity: { $sum: "$quantity" } }
    }

*/
exports.AverageRating = async(req,res) => {
    try{
    //get courseID
    const courseId = req.body.courseId;

    //calculate average
    const average = await RatingandReview.aggregate([
    //stage1
    {// why mongoose.ObjectId ? to convert string to object
        $match:{course: new mongoose.Types.ObjectId(courseId)}
    },
    //stage2
    {
        $group: {_id:null,AverageRating:{$avg:"$rating"}}
    }
    ])



    //return response
    if(average.length > 0){
        return res.status(200).json({
            success:true,
            averageRating:average[0].AverageRating
        })
    }

    return res.status(200).json({
        success:true,
        message:"average rating is 0",
        averageRating:0,
    })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"no avg review,Server busy try again later",
            error:error.message
        })
    }
}


//getAll Rating
exports.getAllRating = async(req,res) =>{
    try{

        const allReview = await RatingandReview.find({}).sort({rating:"descending"})
                                                    .populate({path:"user",
                                                                select:"firstname lastname email profile_pic"
                                                            })
                                                    .populate({path:"courses",select:"courseName"}).exec();
        

        return res.status(200).json({
            success:true,
            message:"all review",
            data: allReview
        })
    }catch{
        
    }
}

//get rating based on  course
