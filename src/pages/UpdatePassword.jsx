import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { resetPassword } from '../services/operations/authAPI';
import { toast } from 'react-hot-toast';
import { AiOutlineEye,AiOutlineEyeInvisible } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token,userId} = useParams();
  const [formData,setFormData] = useState({
    password: "",
    confirmPassword: "",
  })  
  const [showPassword,setShowPassword] = useState(false);
  const [showConfirmPassword,setShowConfirmPassword] = useState(false);

  const handleOnChange = (e) => {
    setFormData( (prevData) =>(
      {
        ...prevData,
        [e.target.name] : e.target.value,
      }
    ))
  }
  const {password,confirmPassword} = formData;
  const handleOnSubmit = (e) => {
    e.preventDefault();
    // const token = location.pathname.split('/').at(-1);
    console.log("token of update password " , token," id : ",userId);
    dispatch(resetPassword(password,confirmPassword,token,userId,navigate));
     // Reset
     if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }
    setFormData({
      password: "",
      confirmPassword: "",
    })
  }

  return (
    <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
      <div className='max-w-[500px] p-4 lg:p-8'>
        <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>Choose New Password</h1>
        <p className='my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100'>
        Almost done. 
        Enter your new password and you're all set.
        </p>
        <form onSubmit={handleOnSubmit}>
        <div className="flex flex-col">
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.10)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.10)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Update Password
        </button>
        </form>
    </div>
    </div>
  )
}

export default UpdatePassword