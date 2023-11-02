//import required modules
const express = require("express");
const router = express.Router();
 
const {capturePayment,verifySignature, sendPaymentRecieptEmail} = require("../controllers/Payment");
const {auth,isStudent} = require("../middlewares/auth");


router.post("/capturePayment",auth,isStudent,capturePayment);
router.post("/verifyPayment",auth,isStudent,verifySignature);
router.post("/sendPaymentSuccessEmail",auth,isStudent,sendPaymentRecieptEmail)
module.exports = router;