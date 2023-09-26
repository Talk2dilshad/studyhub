import React from "react";
import HighlightText from "../components/HomePage/HighlightText";
import CTAbutton from "../components/HomePage/CTAbutton";
import "./About.css";
import StatsComponents from "../components/about/StatsComponents";

const About = () => {
  return (
    
    <div className="layerAbout space">
      {/* section 1 can be implement using logic later... */}
      <div className="relative mx-auto flex flex-col w-11/12 items-center justify-between mt-[40rem] lg:mt-80 text-white">
        <div class="grid mx-auto w-[350px] xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12">
          <div class="xl:col-span-2 xl:h-[294px]  bg-transparent false  ">
            <div class="xl:w-[90%] flex flex-col gap-3 pb-10 xl:pb-0">
              <div class="text-4xl font-semibold ">
                World-Class Learning for
                <HighlightText
                  text={"  Anyone, Anywhere"}
                  bgColor={"text-gradient"}
                />
              </div>
              <p class="text-richblack-300 font-medium">
                StudyHub partners with more than 275+ leading universities
                and companies to bring flexible, affordable, job-relevant online
                learning to individuals and organizations worldwide.
              </p>
              <div class="w-fit mt-2">
                <a href="/">
                <CTAbutton linkto={"/contact"}>Contact Us</CTAbutton>
                </a>
              </div>
            </div>
          </div>
          <div class="false  bg-richblack-700 h-[294px] false  ">
            <div class="p-8 flex flex-col gap-8">
              <h1 class="text-richblack-5 text-lg">
                Curriculum Based on Industry Needs
              </h1>
              <p class="text-richblack-300 font-medium">
                Save time and money! The Belajar curriculum is made to be easier
                to understand and in line with industry needs.
              </p>
            </div>
          </div>
          <div class="false  bg-richblack-800 h-[294px] false  ">
            <div class="p-8 flex flex-col gap-8">
              <h1 class="text-richblack-5 text-lg">Our Learning Methods</h1>
              <p class="text-richblack-300 font-medium">
                StudyHub partners with more than 275+ leading universities
                and companies to bring
              </p>
            </div>
          </div>
          <div class="false  bg-richblack-700 h-[294px] xl:col-start-2  ">
            <div class="p-8 flex flex-col gap-8">
              <h1 class="text-richblack-5 text-lg">Flexible Timing</h1>
              <p class="text-richblack-300 font-medium">
                StudyHub provides flexiblity to study!
                learn at your own pace...
              </p>
            </div>
          </div>
          <div class="false  bg-richblack-800 h-[294px] false  ">
            <div class="p-8 flex flex-col gap-8">
              <h1 class="text-richblack-5 text-lg">Rating "Auto-grading"</h1>
              <p class="text-richblack-300 font-medium">
                StudyHub partners with more than 275+ leading universities
                and companies to bring
              </p>
            </div>
          </div>
          <div class="false  bg-richblack-700 h-[294px] false  ">
            <div class="p-8 flex flex-col gap-8">
              <h1 class="text-richblack-5 text-lg">Ready to Work</h1>
              <p class="text-richblack-300 font-medium">
                StudyHub partners with more than 275+ leading universities
                and companies to bring
              </p>
            </div>
          </div>
        </div>
      </div>
      <StatsComponents/>

      
    </div>
    
  );
};

export default About;
