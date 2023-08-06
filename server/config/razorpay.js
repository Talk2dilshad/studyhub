const Razorpay = require("razorpay");
require("dotenv").config();

exports.instance = new Razorpay({
    key_id:process.env.RAZORPAY_KEY,
    key_secret:process.env.RAZORPAY_SECRET
})

/* 
exports.capturePayment >>

step1 create instance
step2 add instance to controller
step3 imports model and utility
>>controller/payment.js
step4 fetch courseId,userId
step5 validation
   > throw err if not valid
step6 if valid then
    > convert userId (objectId)
step7 check if course(collection) . StudentEnrolled(document) includes ? userId(object)
    throw error "course already purchased"
step8 if any other error move to catch block


>> create order
step1 fetch amount from course
step2 currency
step3 create option (object)
    [amount*100 , currency , receipt: Math.random( Date.now( ().toString() ) ),
                Notes:{courseID,userId}]//YAAD SE

step4 initaite payment using razorpay in TRY BLOCK
step5 post/order 
            await instance.orders.create(options)
step6 return response
        data
step7 throw error in CATCH BLOCK
*/

/* 
verify signature function algo

step1 : server ka secret key lao jiska naam webhooksecret hai
step2 : fetch kro signature razorpay se
step3 : jo signature aya hai usko vverify kro 
        kyse ? decrypt toh possible nae hai !
        then webhooksecret ko encrypt kr k compare krte hai simple
step4 : hmac ka object create kro crypto ka use kr k
step5 : 
step6 : digest kro 
step7 compare signature with digest

step8 : req.body se fetch kro courseId and userId
step9 : TRY BLOCK > find course and enrolled student and vice versa
step10: find student name and course name for mail purpose
step11: catch error
step 12 : else invalid req.
*/