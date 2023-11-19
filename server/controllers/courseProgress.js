const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/Subsection");


exports.updateCourseProgress = async(req,res) => {
    const {courseId,subSectionId} = req.body;
    const userId = req.user.id;

    try{
        // check if the subSection is valid
        const subsection = await SubSection.findById(subSectionId)

        if(!subsection) return res.status(404).json({error:"invalid subsection"});

        //find the course program document for user
        let StudentProgress = await CourseProgress.findOne({courseId:courseId,userId:userId});

        if(!StudentProgress){
            //if course progress doesn't exit
            return res.status(404).json({
                success:false,
                message:"course progress missing"
            })
        }else{
            // if exixts, check if subSection is marked ? completed?

            if(StudentProgress.completedVideos.includes(subSectionId)){
                return res.status(400).json({error:"Subsection already completed"})
            }

            //push the subSection into completed array
            StudentProgress.completedVideos.push(subSectionId)

        }
        //save the updated course progress
        await StudentProgress.save();

        return res.status(200).json({ message: "Course progress updated" })

    }catch(error){
        return res.status(500).json({ error: "Internal server error" })
    }
}