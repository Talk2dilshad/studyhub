import React from 'react'
import HighlightText from './HighlightText'
import CTAbutton from './CTAbutton';
//homepage css
import '../../pages/Homepage.css';
//import img
import knowYourProgress from "../../assets/Images/Know_your_progress.svg";
import compareWithOther from "../../assets/Images/Compare_with_others.svg";
import PlanYourLesson from "../../assets/Images/Plan_your_lessons.svg";

const LearningLanguageSection = () => {
  return (
    <>
      <div className='flex flex-col gap-5 mt-5 overflow-y-hidden mb-10'>
        <div className='text-4xl font-semibold text-center mt-5'>Your swiss knife for <HighlightText text={"learning any language"} bgColor={"text-gradient"}/></div>
        <p className='text-center text-richblack-700 font-inter lg:w-[80%] font-bold  mx-auto leading-6 text-base'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>

        <div className='flex lg:flex-row flex-col items-center justify-center mt-8 lg:mt-0'>
          <img src={knowYourProgress} alt='knowyourprogress' className='object-contain lg:-mr-32' />
          <img src={compareWithOther} alt='compare' className='object-contain lg:-mb-10 lg:-mt-0 -mt-12' />
          <img src={PlanYourLesson} alt='plan' className='object-contain  lg:-ml-36 lg:-mt-5 -mt-16' />
        </div>
        <div className="items-center justify-center mx-auto">
        <CTAbutton linkto={"signup"}>
          Learn More
        </CTAbutton>
        </div>
      </div>
    </>
  )
}

export default LearningLanguageSection