const express = require("express")
const router = express.Router()
const { auth } = require("../middlewares/auth");

const {deleteAccount,updateProfile,getAllUserDetails,getEnrolledCourses,updateDisplayPicture,cancelAccountDeletion} = require("../controllers/Profile");

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

router.delete("/deleteProfile", auth, deleteAccount)
router.post("/cancelDeletion", auth, cancelAccountDeletion)

router.put("/updateProfile", auth, updateProfile)
router.put("/updateDisplayPicture", auth, updateDisplayPicture);


router.get("/getUserDetails", auth, getAllUserDetails)
router.get("/getEnrolledCourses", auth, getEnrolledCourses)

module.exports = router