const mongoose = require("mongoose");

const profileSchema  = new mongoose.Schema({
    gender:{
        type:String,
        default:null
    },
    dob:{
        type:String,
        default:null        
    },
    about:{
        type:String,
        default:null                
    },
    contactNumber:{
        type:Number,
        trim:true,
    },
    
},{timestamps:true});


module.exports = mongoose.model("Profile",profileSchema);