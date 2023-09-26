// Import the required modules
const express = require("express");
const router = express.Router();

//import controller - course
// const {createCourse,getAllCourses,getCourseDetails,} = require("../controllers/Course");
const {createCourse,getAllCourses,getCourseDetails,editCourse} = require("../controllers/Course");

// - Section
const {createSection,updateSection,deleteSection} = require("../controllers/Section");

// - subSection 
const {CreateSubSection,updateSubSection,deleteSubSection} = require("../controllers/Subsection");

//- Categories /tag
const {CategoryPage,createCategory,showAllCategories} = require("../controllers/Category")

// - rating
const {AverageRating,getAllRating,createRating} = require("../controllers/RatingandReviews");

//middleware
const {auth,isStudent,isAdmin, isInstructor} = require("../middlewares/auth");
/// ********************************************************************************************************
//                                      Course routes
// *********************************************************************************************************

router.post("/createCourse",auth,isInstructor,createCourse)
//edit course routes
router.post("/editCourse",auth,isInstructor,editCourse)
//Section Route
router.post("/addSection",auth,isInstructor,createSection)
router.post("/updateSection",auth,isInstructor,updateSection)
router.post("/deleteSection",auth,isInstructor,deleteSection)
//subSection Route
router.post("/addSubSection",auth,isInstructor,CreateSubSection)
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
//Get courses
router.post("/getAllCourses",getAllCourses)
router.post("/getCourseDetails",getCourseDetails)

// Category can Only be Created by Admin
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", CategoryPage)

//rating review
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", AverageRating)
router.get("/getReviews", getAllRating)

module.exports = router