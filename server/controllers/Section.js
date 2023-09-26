const Section = require('../models/Section');
const Courses = require("../models/Courses");
const SubSection = require('../models/Subsection');

exports.createSection = async(req,res)=>{
    try{
        //data fetch
        const {sectionName,courseId} = req.body;
        //validation
        if(!sectionName || !courseId) 
            return res.status(400).json({
                success:false,
                message:"missing properties !"
        })
    
        //create section
        const newSection = await Section.create({sectionName});
        //update the course
        const updateCourse = await Courses.findByIdAndUpdate(courseId,{$push:{courseContent:newSection._id}},{new:true}).populate({
            path:'courseContent',
            populate:{path:'subSection'}
        }).exec();
        
        if(!updateCourse)
        {
            return res.status(404).json({
                success:false,
                message:"Course not found!",
            })
        }

        
        //return response
        return res.status(200).json({
            success: true,
            message: 'Section updated successfully!',
            updateCourse,
        });

        
    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:"server busy !"
        })
    }
}

exports.updateSection = async(req,res) => {
    try{
        //data fetch
        const {sectionName,sectionId,courseId} = req.body;
        //validation
        if(!sectionName||!sectionId || !courseId){
            return res.status(400).json({
                success:false,
                message:"missing properties !"
        })}

        //update section
        const section = await Section.findByIdAndUpdate(
            sectionId,
            {sectionName},
            {new:true}
        )
        

        //update course
        const course = await Courses.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            },
        }).exec();

        console.log("course updated by section",course);

        
        //response
        return res.status(200).json({
            success:true,
            message:section,
            data:course
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"server busy !",
            error:error.message
        })
    }
}

exports.deleteSection = async(req,res) =>{
    try{
        //get id
        const {sectionId,courseId} = req.body;
        // do we need to entry from the course schema ? 
        //remove section from course
        await Courses.findByIdAndUpdate(courseId, { $pull: { courseContent: sectionId } });

        //findbyidanddelete
        const section = await Section.findByIdAndDelete(sectionId);
        
        if (!section) {
            return res.status(404).json({
              success: false,
              message: "Section not found",
            })
        }
        // delete the associated subsection
        await SubSection.deleteMany({_id:{$in: section.subSection}})

        await Section.findByIdAndDelete(sectionId)

        const course = await Courses.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();

        //response update the course
        return res.status(200).json({
            success:true,
            message:"Section Deleted successfully ",
            data: course
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:"server busy !",
            error: error.message
        })
    }
}