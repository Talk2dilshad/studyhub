import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
const Heading = ({children}) => {
  return (
    <div>
        <div className={`flex justify-center items-center font-poppins xs:text-[20px] xs:leading-[27px] text-[16px] leading-[23px] font-poppins font-bold blue-gradient px-6 py-3 gap-2 rounded-full transition-all duration-200 lg:w-[33%]`}>
        {children}
        <FaArrowRight/>
        </div>
    </div>
  )
}

export default Heading