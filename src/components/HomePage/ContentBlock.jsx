import React from 'react'
import CTAbutton from './CTAbutton'

const ContentBlock = ({heading,subheading,ctabtn1,ctabtn2}) => {
  return (
    <div className='w-[100%] lg:w-[50%] flex flex-col gap-8'>
      {heading}

      {subheading}
      
      {/* button */}
      <div className='flex gap-8 -mt-4'>
      
      <CTAbutton linkto={ctabtn1.linkto}>
        <div>
        {ctabtn1.children}
        </div>
      </CTAbutton>
      <div className="hidden md:visible">
      <CTAbutton linkto={ctabtn2.linkto}>
        {ctabtn2.children}
      </CTAbutton>
      </div>
      </div>
      {/* button end */}
      

    </div>
  )
}

export default ContentBlock