import React from 'react'
import RenderSteps from './RenderSteps'
import Heading from '../Heading'

const AddCourse = () => {
  return (
    <div className='flex  ml-12 items-start gap-x-6 mt-10 w-[90%] md:w-full overflow-x-hidden'>
        <div className='flex flex-1 flex-col'>
        <h1 className="mb-14 text-center text-3xl font-medium text-richblack-5">
          <Heading children={"Add Course"}/> 
        </h1>
            <div className='flex-1'>
                <RenderSteps/>
            </div>
        </div>

        {/* Course Upload Tips */}
        <div className="sticky top-10 mt-[25%] hidden max-w-[400px] flex-1 rounded-md bg-richblack-800 p-6 xl:block">
          <p className="mb-8 text-lg text-richblack-5">🤍 Course Upload Tips</p>
          <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>
        </div>
    </div>
  )
}

export default AddCourse