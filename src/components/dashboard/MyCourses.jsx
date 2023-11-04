import React from 'react';
import { useEffect,useState } from "react";
import {VscAdd} from "react-icons/vsc";
import { fetchInstructorCourses } from "../../services/operations/courseDetailsAPI";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../common/IconBtn';
import InstructorCourses from './InstructorCourses/InstructorCourses';
import Heading from './Heading';



const MyCourses = () => {
  const {token} = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const [courses,setCourses] = useState([]);

  useEffect( () => {
    const fetchCourses = async() => {
        const result = await fetchInstructorCourses(token)
        if(result){
            setCourses(result)
        }
    }
    fetchCourses()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className='flex-grow ml-[50px] md:ml-[100px]'>
        <div className='mb-14 mt-2 flex items-center justify-between'>
            <h1 className='text-base font-medium text-richblack-25 lg:w-full'><Heading children={"My Courses"}/></h1>
            <IconBtn
                text={"create"}
                onclick={() => navigate("/dashboard/add-course")}
                customClasses={"flex justify-center items-center font-poppins xs:text-[20px] xs:leading-[27px] text-[16px] leading-[23px] font-poppins font-bold blue-gradient md:px-3 md:py-3"}
            >
                <VscAdd/>
           </IconBtn>
        </div>
        {
            courses && <InstructorCourses courses={courses}
            setCourses={setCourses}/> 
        }
    </div>
  )
}

export default MyCourses
