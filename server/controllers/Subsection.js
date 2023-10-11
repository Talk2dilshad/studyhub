const Section = require("../models/Section");
const SubSection = require("../models/Subsection");
const {uploadToCloudinary} = require("../utils/imageUploader")
require("dotenv").config(); 

function isFileTypeSupport(type,supportedTypes){
    return supportedTypes.includes(type);
}


exports.CreateSubSection = async(req,res) =>{
    try{
        //data fetch
        const {sectionId,title,description} = req.body;
        //validation
        if(!sectionId|| !title || !description){
            return res.status(404).json({
                success:false,
                message:"missing properties !"
        })};
        //fetch file
        const video = req.files.video;
        //validate file
        const supportedTypes = ["mp4","mpeg","wmv"];
        console.log("video des",video);
        const fileType = video.name.split('.')[1].toLowerCase();
        //check file type
        if(!isFileTypeSupport(fileType,supportedTypes))
        {
            return res.status(400).json({
                success:false,
                message:"file format unsupported !"
            })
        }
        const uploadFile = await uploadToCloudinary(video,process.env.FOLDER_NAME,null,60);

        //create sub-Section
        const SubSectionDB = await SubSection.create({
            title,
            timeDuration: `${uploadFile.duration}`,
            description,
            videoUrl:uploadFile.secure_url,
        })

        //update data in section
        const updatedSection = await Section.findByIdAndUpdate(sectionId,{$push:{subSection:SubSectionDB._id}},{new:true}).populate("subSection").exec();

        //send send res
        return res.status(200).json({
            success:true,
            message:"SubSection added",
            data:updatedSection
        })


    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Right Now,server busy,Try again later"
        })
    }
}

exports.updateSubSection = async(req,res) =>{
    try{
        //data fetch
        const { sectionId, subSectionId, title, description} = req.body;
        
        //find subSection
        const subSection = await SubSection.findById(subSectionId);
        
        if(!subSection){
            return res.status(404).json({
                success:false,
                message:"missing SubSection"
            })
        }

        //fetch file
        if(req.files && req.files.video !== undefined){
        const VideoFile = req.files.video;
        //validate file
        const supportedTypes = ["mp4","mpeg","wmv"];
        const fileType = VideoFile.name.split('.')[1].toLowerCase();
        //check file type
        if(!isFileTypeSupport(fileType,supportedTypes))
        {
            return res.status(400).json({
                success:false,
                message:"file format unsupported !"
            })
        }
        const uploadFile = await uploadToCloudinary(VideoFile,process.env.FOLDER_NAME);
        subSection.videoUrl = uploadFile.secure_url;
        subSection.timeDuration = `${uploadFile.duration}`;
        }

        //update SubSection
        //if subsection found then do this
        if(title !== undefined){
            subSection.title = title;
        }
        if(description !== undefined){
            subSection.description = description;
        }

        
        await subSection.save();
        
        //find the section and return updated Section
        const updatedSection = await Section.findById(sectionId).populate("subSection")
        
        //response
        return res.status(200).json({
            success:true,
            message:"SubSection updated",
            data:updatedSection
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"An error occurred while updating ..."
        })
    }
}

exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }
  
      // find updated section and return it
      const updatedSection = await Section.findById(sectionId).populate(
        "subSection"
      )
  
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
        data: updatedSection,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }
  