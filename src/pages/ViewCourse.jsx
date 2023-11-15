/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures,setCourseSectionData,setEntireCourseData,setTotalNoOfLectures,updateCompletedLectures,setNavlink } from '../slices/viewCourseSlice';
import CourseReviewModal from '../components/ViewCourse/CourseReviewModal';
import VideoDetailsSideBar from '../components/ViewCourse/VideoDetailsSideBar';

const ViewCourse = () => {
  const [reviewModal,setReviewModal] = useState(false);
  const {courseId} = useParams();
  const {token} = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  useEffect( () => {
    const fetchingCourse = async() =>{
      const courseData = await getFullDetailsOfCourse(courseId,token);
      
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
      dispatch(setEntireCourseData(courseData.courseDetails))
      dispatch(setCompletedLectures(courseData.completedVideos))
      let lectures = 0
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length
      })
      dispatch(setTotalNoOfLectures(lectures))
      

    };

    fetchingCourse();
  },[])

  return (
    <>
      <div className='relative flex flex-col-reverse lg:flex-row min-h-[calc(100vh-3.5rem)]'>
        <VideoDetailsSideBar setReviewModal={setReviewModal}/>
        <div className='h-[calc(100vh-3.5rem) flex-1 overflow-auto'>
          <div className='mx-6 '>
            <Outlet/>
          </div>
        </div>
      </div>

      {
        reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>
      }
    </>
  )
}

export default ViewCourse