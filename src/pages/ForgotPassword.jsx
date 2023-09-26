import React, { useState } from 'react'
import {useSelector } from 'react-redux/es/hooks/useSelector'
import CTAbutton from '../components/HomePage/CTAbutton';
import { useDispatch } from 'react-redux';
import { getPasswordResetToken } from '../services/operations/authAPI';

const ForgotPassword = () => {
  const {loading} = useSelector( (state) => state.auth);
  const [emailSent,setEmailSent]  =  useState(false);
  const [email,setEmail] = useState("");
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email,setEmailSent))
  }

  return (
    <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
      {
        loading ? (<div>Loading...</div>):
        (<div className='max-w-[500px] p-4 lg:p-8'>
          <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>
            {!emailSent ? "Reset Your Password" : "Check Your Email"}
          </h1>
          <p className='my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100'>
            {!emailSent ? " We'll email you instructions to reset your password" : `We have sent the reset password email to ${email}`}
          </p>

          <form className='w-full' onSubmit={handleOnSubmit}>
            {
              !emailSent && (
                <label>
                  <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Email Address<sup className="text-pink-200">*</sup></p>
                  <input style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.10)",}}
                    className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] pr-12 text-richblack-5"
                    required type='email' name='email' value={email} 
                    onChange={(e) => setEmail(e.target.value) }
                    placeholder='Enter Your Email Address'
                  />
                </label>
              )
            }

            <button className='mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900'  type='submit'>
              {
                !emailSent ? "Reset Password" : "Resend Email"
              }
            </button>

          </form>

          <div className='w-[45%] text-white'>
          <CTAbutton linkto={"/login"}>Back to Login</CTAbutton>
          </div>
        </div>)
      }
    </div>
  )
}

export default ForgotPassword