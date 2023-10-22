import React from 'react'
import {PiVideo} from "react-icons/pi"

const CourseSubSectionAccordion = ({subSec}) => {
  return (
    <>
      <div className="overflow-hidden flex items-center justify-between py-2">
        <div className={`mx-10 flex items-center gap-x-2 `}>
          <span>
            <PiVideo/>
          </span>
          <p>{subSec?.title}</p>
        </div>
      </div>
    </>
  )
}

export default CourseSubSectionAccordion