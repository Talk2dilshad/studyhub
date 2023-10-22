import React from 'react'
import copy from "copy-to-clipboard";
import {toast} from "react-hot-toast";

import { BsCheckAll } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import {addToCart} from "../../slices/cartSlice";
import {ACCOUNT_TYPE} from "../../utils/constants";

const CourseDetailsCard = ({course,setConfirmationModal,handleBuyCourse}) => {
  const {user} = useSelector((state) => state.profile);
  const {token} = useSelector( (state) => state.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    _id: courseId,
  } = course

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link Copied to Clipboard");
  }

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.")
      return
    }
    if (token) {
      dispatch(addToCart(course))
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Sign in to put the course in your shopping cart.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }
  
  return (
    <>
       <div className='flex flex-col gap-4 rounded-xl text-richblack-5
       bg-richblack-800 p-4 shadow-[10px_10px_30px_-10px]  shadow-[#140931]
       '>
        {/* Course Image */}
        <img
          src={ThumbnailImage}
          alt={course?.courseName}
          className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
        />

        <div className="px-4 items-center">
          <div className="space-x-3 pb-4 text-3xl ml-5 font-semibold">
          ₹ {CurrentPrice}
          </div>
          <div className='flex flex-col gap-4'>
            <button
              className='flex justify-center w-full items-center font-poppins  text-base font-poppins font-bold blue-gradient px-3 text-richblack-5 rounded-full py-3'

              onClick={ user && course?.StudentEnrolled.includes(user?._id) ?
                () => navigate("/dashboard/enrolled-courses"): handleBuyCourse
              }
            >
            {user && course?.StudentEnrolled.includes(user?._id)
                ? "Go To Course"
                : "Buy Now"}
            </button>
            {
                (!user || !course?.StudentEnrolled.includes(user?._id))
                &&
                (
                    <button onClick={handleAddToCart} className="flex justify-center w-full items-center font-poppins  text-base font-poppins font-bold blue-gradient px-3 text-richblack-5 rounded-full py-3">
                    Add to Cart
                    </button>
                )
            }
          </div>
          <div>
            <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
              7-Day Money-Back Guarantee
            </p>
          </div>
          <div>
          <p className={`my-2 text-xl font-semibold `}>
          This course includes:</p>
          <div className='flex flex-col gap-3 text-base text-blue-200'>
            {
                course?.instructions?.map( (item,i) =>{
                    return (
                        <p key={i} className='flex gap-2 items-center'>
                            <BsCheckAll/>
                            <span>{item}</span>
                        </p>
                    )
                })
            }
          </div>
          </div>
            
          <div className="text-center">
            <button
              className="mx-auto flex items-center gap-2 py-6 text-blue-50 "
              onClick={handleShare}
            >
              <FaShareSquare size={15} /> Share
            </button>
          </div>
        </div>


       </div>
    </>
  )
}

export default CourseDetailsCard