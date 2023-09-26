import React from "react";
import ContactForm from "../components/common/ContactForm";
import { LuMessagesSquare } from "react-icons/lu";
import { GiEarthAmerica } from "react-icons/gi";
import {PiPhoneCall} from "react-icons/pi";
import Footer from "../components/common/Footer";

const Contact = () => {
  return (
    <div>
    <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
      <div className="lg:w-[40%]">
      <div className="bubble_glow bg-[#6010f5]"></div>
        <div className="flex flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6">
          <div className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200">
            <div class="flex flex-row items-center gap-3">
              <LuMessagesSquare className="text-richblack-300 text-2xl" />
              <h1 class="text-lg font-semibold text-richblack-5">Chat on us</h1>
            </div>
            <p className="font-medium">Our friendly team is here to help.</p>
            <p className="font-semibold ">info@studyhub.com</p>
          </div>
          <div className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200">
            <div className="flex flex-row items-center gap-3">
              <GiEarthAmerica className="text-richblack-300 text-2xl" />
              <h1 className="text-lg font-semibold text-richblack-5">Visit us</h1>
            </div>
            <p className="font-medium">Come and say hello at our office 🤍.</p>
            <p className="font-semibold">
              Nabanna, kolkata,
              West Bengal
            </p>
          </div>
          <div className="bubble_glow bg-[#5b1bd1] ml-60 mt-72 lg:hidden"></div>
          <div className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200">
            <div className="flex flex-row items-center gap-3">
              <PiPhoneCall className="text-richblack-300 text-2xl"/>
              <h1 className="text-lg font-semibold text-richblack-5">Call us</h1>
            </div>
            <p className="font-medium"> Mon - Fri <br/> From 8am to 5pm</p>
            <p className="font-semibold">+123 456 7869</p>
            
          </div>
        </div>
      </div>
      <div className="lg:w-[60%] ">
        <ContactForm formBg={"bg-richblack-800"}/>
      </div>

    </div>
    <div className="mt-10">
      <Footer/>
    </div>

    </div>
  );
};

export default Contact;
