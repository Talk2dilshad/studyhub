import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineDown } from "react-icons/ai"
import CourseSubSectionAccordion from './CourseSubSectionAccordion';


const CourseAccordianBar = ({course, isActive, handleActive,index}) => {
  const contentHeight = useRef(null);

  //Accordian State
  const [active,setActive] = useState(false);
  
  useEffect(() => {
    setActive(isActive?.includes(course._id))
  },[course._id, isActive]);

  const [sectionHeight, setSectionHeight] = useState(0);

  useEffect( () =>{
    setSectionHeight(active ? contentHeight.current.scrollHeight : 0)
  },[active]);

  return (
    <div className='overflow-hidden border-b border-richblack-600 text-richblack-5 last:mb-0'>
        <div>
            <div
            className={`flex cursor-pointer items-center justify-between bg-opacity-20 px-3 md:px-5 lg:px-7  py-4 transition-[0.3s]`}
            onClick={() => {
                handleActive(course._id)
            }}
            >
             <div className='flex items-center gap-x-2'>
                <p className='font-bold'>{course?.sectionName}</p>|
                <p className='text-[12px] ring-richblack-200'>Module {`${index+1}`}</p>
             </div>
             <div className=''>
                <i className={isActive.includes(course._id) ? "rotate-180":"rotate-0"}>
                    <AiOutlineDown/>
                </i>
             </div>
            </div>
        </div>
        <div ref={contentHeight} 
         className={`relative h-0 overflow-hidden  transition-[height] duration-[0.35s] ease-[ease]`}
         style={{
            height:sectionHeight
         }}
        >
            <div>
                {
                    course?.subSection?.map((subSec,i) => {
                        return <CourseSubSectionAccordion subSec={subSec} key={i}/>
                    })
                }
            </div>
        </div>

    </div>
  )
}

export default CourseAccordianBar