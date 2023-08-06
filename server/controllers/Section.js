const Section = require('../models/Section');
const Courses = require("../models/Courses");

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
                message:false,
                message:"Course not found!",
            })
        }

        
        //return response
        return res.status(200).json({
            success: true,
            message: 'Section updated successfully!',
            course: updateCourse,
            // course: Courses.populate('courseContent.subsections'),
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
        const {sectionName,sectionId} = req.body;
        //validation
        if(!sectionName||!sectionId){
            return res.status(400).json({
                success:false,
                message:"missing properties !"
        })}
        //update data
        const section = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});
        //response
        return res.status(200).json({
            success:true,
            message:"Section name Updated"
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"server busy !"
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
        await Section.findByIdAndDelete(sectionId);

        //response
        return res.status(200).json({
            success:true,
            message:"Section Deleted successfully "
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:"server busy !"
        })
    }
}