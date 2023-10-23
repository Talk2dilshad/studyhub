import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import {formatDate} from "../services/operations/formatDate"
import RatingStars from '../components/common/RatingStars';
import GetAvgRating from "../utils/avgRating"
import ReactMarkdown from 'react-markdown'
//icon import
import {IoLanguage} from "react-icons/io5"
import {TbInfoHexagonFilled} from "react-icons/tb"
import CourseDetailsCard from '../components/Course/CourseDetailsCard';
import Model from '../components/common/Model';
import CourseAccordianBar from '../components/Course/CourseAccordianBar';

// cart

import {addToCart} from "../slices/cartSlice";
import {ACCOUNT_TYPE} from "../utils/constants";
import {toast} from "react-hot-toast";


const CourseDetails = () => {
  const {user} = useSelector( (state) => state.profile);
  const {token} = useSelector( (state) => state.auth);
  const {loading} = useSelector( (state) => state.profile);
  const {paymentLoading} = useSelector( (state) => state.course);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {courseId } =  useParams();
  console.log("coourse id",courseId);

  // declare state to save course details
  const [response,setResponse] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);


  useEffect( () => {
    const fetchCourse = async() =>{
        try {
            const res = await fetchCourseDetails(courseId);
            setResponse(res);
        }catch(error){
            throw new Error(error);
        }
    }
    fetchCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
   },[courseId])


   //calculating Average review
  const [avgReviewCount,setAvgReviewCount] = useState(0);
  useEffect( () => {
    const count = GetAvgRating(response?.data?.courseDetails.ratingAndReview)
    setAvgReviewCount(count)
  },[response]);

  const [isActive, setIsActive] = useState(Array(0))
  const handleActive = (id) => {
    // console.log("called", id)
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e !== id)
    )
  }

   const handleBuyCourse = () => {
    if(token) {
      // buyCourse
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
   }

console.log("response data of Selected course ",response);


//   loading animation
  if(paymentLoading || loading || !response ) {
    return (
        <div className='justify-center items-center mt-2 relative'>
        <div className='flex flex-col justify-center items-center h-[500px] overflow-hidden'>
        <dotlottie-player
        src="https://lottie.host/c46e1cbb-90f5-4bda-91a2-2d13dfa4cf27/SHS1Q5qW4Y.lottie"
        autoplay
        loop
        style={{ height: "fit-content", width: "100%",overflow:"hidden" }}
        className='overflow-y-hidden h-fit '
        />
      </div>
      </div>
    )
  }

  const course =response?.data.courseDetails;

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

  //taking out important data from response
  const {
    // eslint-disable-next-line no-unused-vars
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingandReviews,
    instructor,
    StudentEnrolled,
    createdAt,
  } = response.data?.courseDetails


  

  return (
    <>
        <div className={`relative w-full`}>
            {/* for mobile & tablet only */}
            <div className="bg-richblack-800 fixed bottom-0 left-0 right-0 p-3 flex justify-between rounded-xl items-center lg:hidden z-[100]">
            <p className="text-xl font-semibold text-richblack-5 ml-4 md:ml-20">₹ {price}</p>
            <button
            onClick={handleBuyCourse}
            className="flex justify-center w-[65%] md:w-9/12 items-center font-poppins xs:text-[20px] xs:leading-[27px] text-[16px] leading-[23px] font-poppins font-bold blue-gradient px-4 text-richblack-5 rounded-full py-3 md:py-4">Buy Now</button>
            </div>


        {/* Hero Section */}
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
          <div className="mx-auto grid min-h-[450px] ml-2 lg:mt-40  max-w-maxContentTab py-8 md:mx-0 sm:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div className="relative justify-items-center flex max-h-[30rem] mt-10 lg:hidden">
              <div className="absolute rounded-lg bottom-0 left-0 h-full w-full shadow-[#080a0c_0px_-64px_36px_-28px_inset]"></div>
              <img
                src={thumbnail}
                alt="course thumbnail"
                className="aspect-auto w-full rounded-xl"
              />
            </div>

            <div
              className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}
            >
              <div>
                <p className="text-5xl md:text-8xl lg:text-[6rem] lg:mt-5 font-bold text-richblack-5 sm:text-[42px]">
                  {courseName}
                </p>
              </div>
              <p className={`text-richblack-200 text-xl`}>{courseDescription}</p>
              <div className="text-sm flex flex-wrap items-center gap-2">
                <RatingStars Review_Count={avgReviewCount} Star_Size={20}/>

                <span>{`(${ratingandReviews.length} reviews)`}</span>
                
              </div>
              
              <div className="flex flex-wrap gap-5 text-sm md:text-base">
                <p className="flex items-center gap-2">
                  {" "}
                <TbInfoHexagonFilled/>
                Published {formatDate(createdAt)}
                </p>
              </div>
              <div>
              <p className="flex items-center gap-2">
                  {" "}
                  <IoLanguage/> Taught in Hinglish
                </p>
              </div>
            {/* instructor logo name */}
            <div className='flex gap-2 items-center'>
                <div className='flex items-center gap-4 py-2'>
                  <img
                    src={instructor.profile_pic}
                    alt='author'
                    className='h-12 w-12 rounded-full object-cover'
                  />
                </div>
                <div className='sm:flex sm:gap-0 md:gap-2'>
                  <p className=''>Instructor: </p>
                  <p className="">
                    {`${instructor.firstname} ${instructor.lastname}`}
                  </p>
                </div>
              </div>

            

            </div>
            
            <div className='lg:mb-10 flex flex-row w-full gap-3 py-4 items-center justify-center lg:hidden'>
            <p className="space-x-2 text-xl font-semibold text-richblack-5 ">
            ₹ {price}
              </p>
            {/* button */}
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

            
          </div>
          {/* Courses Card */}
          <div className="right-[1rem] top-[60px] mx-auto lg:mt-10 lg:mr-5 hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
            <CourseDetailsCard
            course={response?.data.courseDetails}
            setConfirmationModal={setConfirmationModal}
            handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>
        
      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px] ">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px] gap-y-4">
          {/* what you will learn */}
          
          <div className='my-8 rounded-xl bg-richblack-800 p-8 shadow-[10px_10px_30px_-10px]  shadow-[#140931] '>
          <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-5">
              <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
            </div>
          </div>

          {/* course content section */}
          <div className='flex flex-col max-w-[51rem] mt-5 gap-y-5'>
            
              <div className="flex flex-wrap justify-between gap-3">  
                <p className="text-[1.5rem] font-semibold">Course Content</p>   
                <button
                  className="text-blue-200"
                  onClick={() => setIsActive([])}
                >
                  Collapse all sections
                </button>   
              </div>

              {/* course details Accordion */}
              <div className='py-4 mb-10 rounded-xl bg-richblack-800 p-8 shadow-[10px_10px_30px_-10px]  shadow-[#140931]'>
                {
                  courseContent?.map((course,i)=>(
                    <CourseAccordianBar
                      course={course}
                      index={i}
                      key={i}
                      isActive={isActive}
                      handleActive={handleActive}
                    />
                  ))
                }
              </div>



            {/* Author Details */}
            <div className="mb-20 lg:mb-12 py-4">
              <p className="text-[28px] font-semibold">Instructor</p>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    instructor.profile_pic
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg">{`${instructor.firstname} ${instructor.lastname}`}</p>
              </div>
              <p className="text-richblack-50">
                {instructor?.profile?.about}
              </p>
            </div>

          </div>

        </div>
      </div>






      {confirmationModal && <Model modalData={confirmationModal} /> }
      

    </>
  )
}

export default CourseDetails