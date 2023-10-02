import React from 'react'
import { useSelector } from 'react-redux'
import {FaCheck} from "react-icons/fa"
import CourseInformation from './CourseInformation/CourseInformation'
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm'
import PublicCourse from './PublishCourse/PublicCourse'

const RenderSteps = () => {
  const {step} = useSelector( (state) => state.course);

  const steps = [
    {
      id:1,
      title:"Create Course",
    },
    {
      id:2,
      title:"Builder"
    },
    {
      id:3,
      title:"Publish"
    }
  ]

  return (
    <div className='overflow-x-hidden'>
      <div className='relative flex justify-center mb-2 overflow-x-hidden'>
        {
          steps.map( (item) => (
            <>
             <div className='flex flex-col items-center' key={item.id}>
              <button className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border ${
                  step === item.id
                    ? "border-blue-50 bg-blue-900 text-blue-50"
                    : "border-blue-50 bg-blue-50 text-blue-400"
                } ${step > item.id && "bg-blue-50 "}`}>
                  {
                    step > item.id ? (<FaCheck/>):(item.id)
                  }
              </button>
             </div>
             {item.id !== steps.length && (
              <>
                <div
                  className={`h-[calc(34px/2)] w-[20%] md:w-[33%]  border-dashed border-b-2 ${
                  step > item.id  ? "border-blue-50" : "border-richblack-500"
                }`}
                ></div>
              </>
            )}
            </>
          ) )
        }
      </div>
      <div className="relative mb-16 flex  md:w-[99%] select-none justify-between overflow-x-hidden">
        {steps.map((item) => (
          <>
            <div
              className="flex min-w-[100px] flex-col items-center gap-y-5"
              key={item.id}
            >
              
              <p
                className={`text-sm ${
                  step >= item.id ? "text-richblack-5" : "text-richblack-500"
                }`}
              >
                {item.title}
              </p>
            </div>
            
          </>
        ))}
      </div>
      

      { step === 1 && <CourseInformation/>}
      { step === 2 && <CourseBuilderForm/>}
      { step === 3 && <PublicCourse/>}
    </div>
  )
}

export default RenderSteps