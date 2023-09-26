const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    accountType:{
        type:String,
        enum:["Admin","Student","Instructor"],
        required:true
    },
    active:{
        type:Boolean,
        default:true
    },
    approved: {
        type: Boolean,
        default: true,
    },
    deleteScheduled:{
        type:Boolean,
        default:false
    },
    token:{
        type:String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    profile:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Profile'   
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Courses'
        }
    ],
    courseProgress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'CourseProgress'
    }],
    profile_pic:{
        type:String,
    }

},{timestamps:true});

module.exports = mongoose.model("User",userSchema);