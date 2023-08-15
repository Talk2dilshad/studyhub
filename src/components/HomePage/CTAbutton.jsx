import React from 'react'
import { Link } from 'react-router-dom'
import {FaArrowRight} from 'react-icons/fa';
const CTAbutton = ({children,linkto}) => {
  return (
    <div>
        <Link to={linkto}>
            <div className={`flex justify-center items-center font-poppins xs:text-[20px] xs:leading-[27px] text-[16px] leading-[23px] font-poppins font-bold blue-gradient mt-11 px-6 py-3 gap-2 rounded-full hover:scale-95 transition-all duration-200`}>
            {children}
            <FaArrowRight/>
            </div>
        </Link>
    </div>
  )
}

export default CTAbutton