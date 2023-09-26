import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowRight } from 'react-icons/fa';
import { apiConnector } from '../../services/microservices';
import {contactusEndpoint} from "../../services/apis"
import countrycode from '../../data/countrycode.json';
// Ensure that the JSON data is parsed as UTF-8

const ContactForm = ({ formBg }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  

  const submitContactForm = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      const response = await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data);
      console.log("response of contact form ",response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: '',
        firstname: '',
        lastname: '',
        message: '',
        phoneNo: '',
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <div
      className={`relative mx-auto flex flex-col w-11/12 items-center justify-between text-white rounded-xl p-4 lg:p-6  ${formBg}`}
    >
      {
        loading ? (<div className='flex flex-col gap-5 p-6'>
          <dotlottie-player
          src="https://lottie.host/c46e1cbb-90f5-4bda-91a2-2d13dfa4cf27/SHS1Q5qW4Y.lottie"
          autoplay
          loop
          style={{ height: "100%", width: "100%" }}
        /></div>):
        (<form onSubmit={handleSubmit(submitContactForm)} className="flex flex-col gap-5">
        {/* name */}
        <div className="flex flex-col gap-5 lg:flex-row">
          {/* firstname */}
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="firstname">First Name</label>
            <input
              className="w-full rounded-[0.5rem] bg-richblack-600 p-[12px]"
              type="text"
              name="firstname"
              id="firstname"
              placeholder="firstname"
              {...register('firstname', { required: true })}
            />
            {errors.firstname && <span>Please enter firstname</span>}
          </div>
          {/* lastname */}
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="lastname">Last Name</label>
            <input
              className="w-full rounded-[0.5rem] bg-richblack-600 p-[12px]"
              type="text"
              name="lastname"
              id="lastname"
              placeholder="lastname"
              {...register('lastname', { required: true })}
            />
            {errors.lastname && <span>Please enter lastname</span>}
          </div>
        </div>
        {/* email */}
        <div className="flex flex-col gap-2">
          <label>Email Address</label>
          <input
            className="w-full rounded-[0.5rem] bg-richblack-600 p-[12px]"
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email Address"
            {...register('email', { required: true })}
          />
          {errors.email && <span>Please enter valid EmailId</span>}
        </div>
        {/* phone number */}
        <div className="flex flex-col gap-2">
          <label htmlFor="phoneNo">Phone Number</label>
          <div className="flex flex-row gap-5">
            {/* dropdown */}
            <div className='flex w-[80px] gap-5 text-white'>
               <select className="w-full rounded-[0.5rem] bg-richblack-600 p-[12px]"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                name='dropdown' id='dropdown' 
                {...register("phoneNo",{required:true})}
               >
                {
                  countrycode.map( (element,index) => {
                    return (
                      <option key={index}>
                        {element.code} - {element.country}
                      </option>
                    )
                  })
                }
               </select>
              </div>
            {/* phone number */}
            <div className="flex flex-grow">
              <input
                type="number"
                name="phoneNo"
                style={{
                  MozAppearance: 'textfield', /* Remove Firefox default number input styles */
                  WebkitAppearance: 'none', /* Remove Chrome and Safari default number input styles */
                }}
                id="phoneNO"
                placeholder="12345 6789"
                className="w-full rounded-[0.5rem] bg-richblack-600 p-[12px]"
                {...register('phoneNo', {
                  required: true,
                  maxLength: { value: 10, message: 'Invalid phone number' },
                  minLength: { value: 10, message: 'Invalid phone number' },
                })}
              />
            </div>
          </div>
          {errors.phoneNo && <span>{errors.phoneNo.message}</span>}
        </div>

        {/* message */}
        <div className="flex flex-col gap-2">
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            className="w-full rounded-[0.5rem] bg-richblack-600 p-[12px]"
            id="message"
            cols="30"
            rows="2"
            placeholder="Enter your message here"
            {...register('message', { required: true })}
          />
          {errors.message && <span>Please enter a message</span>}
        </div>
        {/* submit btn */}
        <button>
          <div className="flex justify-center items-center font-poppins xs:text-[20px] xs:leading-[27px] text-[16px] leading-[23px] font-poppins font-bold blue-gradient  px-6 py-3 gap-2 rounded-full hover:scale-95 transition-all duration-200">
            {<p>Send Message</p>}
            <FaArrowRight />
          </div>
        </button>
      </form>)
      }
      
    </div>
  );
};

export default ContactForm;
