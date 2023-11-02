import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../components/common/IconBtn';
import { BuyCourse } from '../../../services/operations/studentFeatures';
import { useNavigate } from 'react-router-dom';

const RenderTotalAmount = () => {
    const {token} = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile)
    const {total, cart} = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);
        console.log("Bought these course:", courses);
        //TODO: API integrate -> payment gateway tak leke jaegi
        BuyCourse(token,courses,user,navigate,dispatch);
    }
  return (
    <div className="min-w-[50px] rounded-md bg-richblack-800 p-6 mt-5 flex flex-col md:flex-row justify-between">
      <div>
        <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
        <p className="mb-6 text-3xl font-medium text-blue-200">₹ {total}</p>
      </div>
      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses="w-full 
        flex justify-center w-[65%] md:w-1/2 items-center font-poppins xs:text-[20px] xs:leading-[27px] text-[16px] leading-[23px] font-poppins font-bold blue-gradient px-4 text-richblack-5 rounded-full py-3 md:py-4
        "
      />
    </div>
  )
}

export default RenderTotalAmount
