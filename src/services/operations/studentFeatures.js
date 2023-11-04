import {toast} from "react-hot-toast";

import { resetCart } from "../../slices/cartSlice";
import {setPaymentLoading} from "../../slices/courseSlices"
import {studentEndpoints} from "../apis"
import { apiConnector } from "../microservices";

const {COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;

function loadScript(src) {
    return new Promise( (resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export async function BuyCourse(token,courses,user_details,navigate,dispatch){
    const toastPop = toast.loading("Loading...");
    try{
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

        if(!res) {
            toast.error(
                "Razorpay SDK failed to load.Check Your Internet Connection"
            )
            return
        }

        // initiating the order in backend
        const orderResponse = await apiConnector("POST",COURSE_PAYMENT_API,{courses},{Authorization: `Bearer ${token}`})
        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
        }

        const options = {
            key:process.env.REACT_APP_RAZORPAY_KEY,
            currency:orderResponse.data.data.currency,
            order_id: orderResponse.data.data.id,
            name:"Studyhub",
            description:"Thank You",
            prefill:{
                name: `${user_details.firstname} ${user_details.lastname}`,
                email: user_details.email,
            },
            handler:function(response){
                verifyPayment({...response,courses},token,navigate,dispatch)
                sendPaymentSuccessEmail(response,orderResponse.data.data.amount,token)
            }
        }
        const paymentObject = new window.Razorpay(options)
        
        paymentObject.open()
        console.log("window open hua")
        
        paymentObject.on("payment.failed", function (response) {
        toast.error("Oops! Payment Failed.")
        console.log(response.error)
        })

    }catch(error){
        toast.error("Retry again")
    }
    toast.dismiss(toastPop);
}


// verify the payment 
async function verifyPayment(bodyData,token,navigate,dispatch){
    dispatch(setPaymentLoading(true));
    console.log("yaha pauch gya verify wala function")
    try{
        const response = await apiConnector("POST",
        COURSE_VERIFY_API,bodyData,{
            Authorization: `Bearer ${token}`,
        })

        if(!response.data.success) throw new Error(response.data.message);
        toast.success("🎉 Payment Successful 🎉")
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart())

    }catch (error) {
    toast.error("Can't verify payment");
  }
  dispatch(setPaymentLoading(false))
}
// Send the Payment Success Email
async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
  } catch (error) {
    toast.error("unable to sent mail")
  }
}
