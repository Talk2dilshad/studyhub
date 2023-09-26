import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, signUp } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import OTPInput from 'react-otp-input'
import CTAbutton from '../components/HomePage/CTAbutton';
import {PiClockClockwise} from "react-icons/pi"

const VerifyEmails = () => {
    const [otp,setOtp] = useState("");
    const dispatch = useDispatch();
    const {signupData} = useSelector( (state) => state.auth);
    const navigate = useNavigate();
  
    useEffect( ()=> {
      if(!signupData) { navigate("/signup")}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  
    const handleOnSubmit = (e) => {
      e.preventDefault();
      const {accountType,
        firstname,
        lastname,
        email,
        password,
        confirmpassword,
      }  = signupData;
      dispatch(signUp(accountType,
        firstname,
        lastname,
        email,
        password,
        confirmpassword,otp,navigate))
    }  



  return (
    <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
        <div className='max-w-[500px] p-4 lg:p-8'>
            <h1 className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'>Verify Email</h1>
            <p className='text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100'>A verification code has been sent to you. Enter the code below</p>
            <form onSubmit={handleOnSubmit}>
              <div className='display: flex; align-items: center; justify-content: space-between; gap: 0px 6px;'>
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                placeholder={['-','-','-','-','-','-']}
                containerStyle={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0px 6px',
                }}
                inputStyle={{
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#1E293B',
                    color: '#F9FAFB',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    border: 'none',
                    outline: 'none',
                }}
                focusStyle={{
                    outline: 'none',
                    boxShadow: '0 0 0 2px rgba(251, 191, 36, 0.5)',
                }}
                renderInput={(props) => <input {...props} />}
              />
              </div>
              <button className='mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900'  type='submit'>Verify Email</button>
            </form>
            <div className='mt-6 flex items-center justify-between'>
            <div className='w-[45%] text-white'>
              <CTAbutton linkto={"/login"}>Back to Login</CTAbutton>
            </div>  
            <button  className='flex items-center justify-center text-blue-100 gap-x-2 mt-11 px-6 py-3 text-xl'
             onClick={ () => dispatch(sendOtp(signupData.email,navigate))}>
              <PiClockClockwise/>
              Resend OTP
            </button>
            </div>
        </div>
    </div>
  )
}

export default VerifyEmails