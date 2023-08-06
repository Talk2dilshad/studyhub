const Category = require("../models/Category");

//create category (mean tag)
exports.createCategory = async(req,res) => {
    try{
        const {name,description} = req.body;
        if(!name || !description) throw new Error("all field required");

        const CategoryDetails = await Category.create({
            name:name,
            description:description
        });
        console.log(CategoryDetails);

        return res.status(200).json({
            success:true,
            message:"category created"
        });
    }
    catch(error){
        return res.status(500).json({
            success:true,
            message: error.message
        })
    }
};


//show all categoreis(tag)
exports.showAllCategories = async(req,res) =>{
    try{
        const allCategory = await Category.find({},{ name: true, description: true });
        return res.status(200).json({
            success:true,
            data:allCategory
        })
    }catch(error){
        return res.status(500).json({
            success:true,
            message: error.message
        })
    }
}

//categoryPage Details

// exports.CategoryPage = async(req,res) =>{
//     try{
//         //get category id
//         const {categoryId} = req.body;
//         //get course for specified categoryID
//         const selectedCategoryCourse = await Category.findById(categoryId).populate("course").lean().exec();

//         //validation
//         if(!selectedCategoryCourse) throw new Error("Course not found");

//         //get different categories
//         const differentCategories = await Category.find( {_id:{$ne:categoryId} } ).populate("course").exec();

//         //get top 10 selling course
//         const FindSellingCourse = await Category.find().populate("course");
//         const allCourses = FindSellingCourse.flatMap((category) => category.course );
//         const mostSellingCourses = allCourses.sort((a,b) => b.sold - a.sold).slice(0,10);

//         return res.status(200).json({
//             selectedCategoryCourse: selectedCategoryCourse,
//             differentCategories:differentCategories,
//             mostSellingCourses:mostSellingCourses
//         })
                                                
//     }catch(error){
//         return res.status(500).json({
//             success:true,
//             message: error.message
//         })
//     }
// }
exports.CategoryPage = async (req, res) => {
    try {
        // Get category id
        const { categoryId } = req.body;

        // Get course for specified categoryId
        const selectedCategoryCourse = await Category.findById(categoryId).populate("course").lean().exec();

        // Validation
        if (!selectedCategoryCourse) throw new Error("Course not found");

        // Get different categories
        const differentCategories = await Category.find({ _id: { $ne: categoryId } }).populate("course").lean().exec();

        // Get top 10 selling courses based on enrollment count
        const allCourses = selectedCategoryCourse.course;
        allCourses.sort((a, b) => b.StudentEnrolled.length - a.StudentEnrolled.length);
        const mostSellingCourses = allCourses.slice(0, 10);

        return res.status(200).json({
            selectedCategoryCourse: selectedCategoryCourse,
            differentCategories: differentCategories,
            mostSellingCourses: mostSellingCourses
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
