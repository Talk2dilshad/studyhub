const mongoose = require("mongoose");
const CourseSchema  = new mongoose.Schema({
    courseName:{
        type:String,
        require:true,
        trim:true
    },
    courseDescription:{
        type:String,
        require:true,
        trim:true
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    whatYouWillLearn:
    {
        type:String,
        require:true,
        trim:true
    },
    courseContent:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section",
        },
    ],
    ratingandReviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingandReview"
    }],
    price:{
        type:Number,
        required:true
    },
    thumbnail:{
        type:String
    },
    tag:{
        type:[String],
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Category"
    },
    StudentEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }],
    instructions:{
        type:[String]
    },
    status: {
		type: String,
		enum: ["Draft", "Published"],
	},
    createdAt:{type:Date,default:Date.now},
});


module.exports = mongoose.model("Courses",CourseSchema);