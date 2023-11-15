import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import IconBtn from '../common/IconBtn'
import { setNavlink } from '../../slices/viewCourseSlice'

const VideoDetailsSideBar = ({setReviewModal}) => {
  const [activeStatus,setActiveStatus] = useState("")
  const [videoBarActive,setVideoBarActive] = useState("")
  const navigate = useNavigate();
  const location = useLocation();
  const {sectionId,subSectionId} = useParams();

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  const dispatch = useDispatch();

  
  useEffect(() => {
    ;( ()=>{
      if(!courseSectionData.length) return;

      const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId)

      const currentSubSectionIndx = courseSectionData?.[currentSectionIndx]?.subSection.findIndex((data) => data._id === subSectionId)

      const activeSubSectionId = courseSectionData[currentSectionIndx]?.subSection?.[currentSubSectionIndx]?._id;

      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
      setVideoBarActive(activeSubSectionId);


    })();
  },[courseSectionData,courseEntireData,location.pathname,sectionId,subSectionId])

  
  return (
    <>
       <div className='flex lg:h-[calc(100vh-3.5rem)] w-[99%] lg:w-[320px] flex-col bg-richblack-900 lg:mt-12 rounded-md'>
          <div className='mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 py-5 text-richblack-25'>
              <div className='flex w-full items-center justify-between'>
                <div
                  onClick={() => {navigate(`/dashboard/enrolled-courses`)
                  dispatch(setNavlink(true))
                }}
                  className='flex h-[35px] w-[35px] items-center  rounded-full
                  font-poppins text-[20px] xs:leading-[27px]  leading-[23px] font-poppins font-bold blue-gradient mt-2 px-2 py-1 gap-2  cursor-pointer
                  '
                  title='back'
                  
                >
                  <IoIosArrowBack  size={30}/>
                </div>
                <IconBtn text={"Add Review"} customClasses= {`ml-auto flex h-[40px] items-center justify-center rounded-full
                  font-poppins xs:text-[20px] xs:leading-[27px] text-[16px] leading-[23px] font-poppins font-bold blue-gradient mt-2 px-6 py-5 gap-2 w-[60%]`} 
                  onclick={() =>setReviewModal(true) }
                
                />
              </div>
              <div className="flex flex-col">
                <p>{courseEntireData?.courseName}</p>
                <p className="text-sm font-semibold text-richblack-500">
              {completedLectures?.length} / {totalNoOfLectures}
                </p>
          </div>
          </div>

          <div className='h-[calc(100vh -5rem)] overflow-y-auto'>
            {
              courseSectionData.map( (course,index) => (
                <div className='mt-2 cursor-pointer  text-richblack-5 duration-200 ease-in' onClick={() => setActiveStatus(course?._id)} key={index}>
                  {/* section */}
                  <div className='flex flex-row justify-between bg-richblack-800 px-5 py-4'>
                     <div className='w-[70%] font-semibold'>
                      {course?.sectionName}
                     </div>
                     <div className='flex items-center gap-3'>
                      <span className={`${activeStatus === course?.sectionName ? "rotate-180" : "rotate-0"} transition-all duration-500`}>
                        <BsChevronDown/>
                      </span>
                     </div>
                  </div>

      {/* sub section */}
      {activeStatus === course?._id && (
        <div className='transition-[height] duration-500 ease-in'>
            {course?.subSection.map((topic,i) => (
              <div className={`flex gap-3 px-5 py-3 w-full h-full ${videoBarActive === topic._id ? "bg-richblack-700 font-medium" : ""}`}
              key={i} 
              onClick={ () => {
                navigate(`/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`)
                setVideoBarActive(topic._id)
              }}
              >
                  <input type="checkbox" 
                  checked={completedLectures.includes(topic?._id)}
                  onChange={() => {}}
                  />
                  {topic.title}
              </div>
            ))}
        </div>
      )}
                </div>
              ))
            }

          </div>





       </div>
    </>
  )
}

export default VideoDetailsSideBar