const Profile = require("../models/Profile");
const User = require("../models/User");
// const cron = require('node-cron');
const schedule = require('node-schedule');
const {uploadToCloudinary}= require("../utils/imageUploader");

exports.updateProfile = async(req,res) => {
    try{
        //get data
        const {dob="",about="",contactNumber,gender} = req.body;
        //getUserId
        const id=req.user.id;
        //validation
        if(!contactNumber || !gender){
            return res.status(400).json({
                success:false,
                message:"please fill correctly"
            })
        }
        //find Profile
        const userDetail = await User.findById(id);
        const profileId = userDetail.profile;
        const profileDetail = await Profile.findById(profileId);
        //update profile
        profileDetail.dob=dob;
        profileDetail.about=about;
        profileDetail.gender = gender;
        profileDetail.contactNumber = contactNumber;
        await profileDetail.save();
        //return response
        return res.status(200).json({
            success:true,
            message:"profileUpdated",
            data:profileDetail
        })

    }catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Right Now,server busy,Try again later"
    })
    }
}





exports.deleteAccount = async (req, res) => {
  try {
    // get id
    const id = req.user.id;

    // validation
    const userDetail = await User.findById(id);
    if (!userDetail) throw new Error("Account doesn't exist");

    // calculate the date for 60 days in the future
    const deletionDate = new Date();
    deletionDate.setDate(deletionDate.getDate() + 60);

    // schedule deletion after 60 days
    const job = schedule.scheduleJob(deletionDate, async () => {
      try {
        // delete profile
        await Profile.findByIdAndDelete(userDetail.profile); // Assuming 'Profile' is the model for user profiles

        // delete user
        await User.findByIdAndDelete(id);

        // The job is done, so cancel it to prevent it from running again
        job.cancel();

        return res.status(200).json({
          success: true,
          message: "Account has been deleted successfully after 60 days",
        });
      } catch (error) {
        throw new Error("Unable to schedule!");
      }
    });

    // Mark the account for deletion in the database
    await User.findByIdAndUpdate(id, { deleteScheduled: true });

    // return response
    return res.status(200).json({
      success: true,
      message: "User marked for deletion after 60 days",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server busy!",
    });
  }
};

exports.cancelAccountDeletion = async (req, res) => {
try {
    // get id
    const id = req.user.id;

    // validation
    const userDetail = await User.findById(id);
    if (!userDetail) throw new Error("Account doesn't exist");

    // Mark the account to be retained (cancel scheduled deletion)
    await User.findByIdAndUpdate(id, { deleteScheduled: false });

    // return response
    return res.status(200).json({
    success: true,
    message: "Account deletion canceled. Account will not be deleted.",
    });
} catch (error) {
    console.log(error);
    res.status(500).json({
    success: false,
    message: "Server busy!",
    });
}
};



exports.getAllUserDetails = async(req,res) =>{
    try{
        const id= req.user.id;
        //validation
        const userDetail = await User.findById(id);
        if(!userDetail) throw new Error("Account doesn't exit");
        //profile fetch
        const profile = await User.findById(id).populate("profile").exec();
        //return response
        return res.status(200).json({
            success:true,
            message:"user data",
            data:profile
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:"server busy !"
        })
    }
}

exports.updateDisplayPicture = async(req,res) =>{
    try{
        const displayPicture = req.files.displayPicture;
        const userId = req.user.id;
        const quality = 5;
        const image = await uploadToCloudinary(displayPicture,process.env.FOLDER_NAME,1000,1000,quality);
        const updatedProfilePic = await User.findByIdAndUpdate({_id:userId},{profile_pic:image.secure_url},{new:true})

        res.send({
            success:true,
            message:'Profile picture updated',
            data:updatedProfilePic
        })
    }catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
}

exports.getEnrolledCourses = async (req,res) => {
    try{
        //steps find user > populate course if not then throw error else return data or move to catch block

        const userId = req.user.id;
        const userDetail = User.findOne({_id:userId}).populate("courses").lean().exec();

        if(!userDetail) 
            return res.status(404).json({
                success:false,
                message:`not enrolled in any courses !`
            })
        return res.status(200).json({
            success:false,
            data:userDetail.courses,
        })
    }catch(error){
        throw new Error(error.message);
    }
}