import React from 'react'
import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom";
import { formatDate } from '../../../services/operations/formatDate'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCourse,fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI'
import { COURSE_STATUS } from '../../../utils/constants'
import Model from '../../common/Model'

const InstructorCourses = ({courses,setCourses}) => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token} = useSelector((state) => state.auth)
  const [loading,setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null)

  const TRUNCATE_LENGTH = 30;
  const handleCourseDelete = async (courseId) => {
    setLoading(true)
    await deleteCourse({ courseId: courseId }, token)
    const result = await fetchInstructorCourses(token)
    if (result) {
      setCourses(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  }
  console.log("-> instructor ",courses);
  
  return (
    <div className='flex flex-row flex-wrap gap-x-8 gap-y-8 items-center justify-center'>
      {/* 2part one img and next detail */}
        {courses?.length === 0 ? 
        (<>
          <p className="py-10 text-center text-2xl font-medium text-richblack-100">
                No courses found
          </p>
        </>)
        :
        (
          courses?.map( (course) => (
            <div className='flex flex-col md:flex-row gap-x-2 '>
          <img
            src={course?.thumbnail}
            alt={course?.courseName}
            className="h-[148px] w-[220px] rounded-lg object-cover"
          />

          <div className='flex flex-col justify-between'>
            <p className='text-lg font-semibold text-richblack-5'>{course.courseName}</p>
            <p className="text-sm font-medium text-richblack-100">
            ₹{course.price}
            </p>
            <p className="text-[12px] text-white">
            Created: {formatDate(course.createdAt)}
            </p>

            <div className='flex flex-row'>
            {course.status === COURSE_STATUS.DRAFT ? 
            (<p className='flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100'>
              <HiClock size={14}/>
              Drafted
            </p>) 
            :
            (
              <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
              <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                <FaCheck size={8} />
              </div>
              Published
            </p>
            )
            }
          <div className="text-sm font-medium text-richblack-100 ">
                  <button
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/edit-course/${course._id}`)
                    }}
                    title="Edit"
                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      })
                    }}
                    title="Delete"
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
              </div> 
            </div>         

          </div>
      </div>
            
          ))
        )}
      
    </div>
  )
}

export default InstructorCourses