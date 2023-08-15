import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import HighlightText from "../components/HomePage/HighlightText";
import CTAbutton from "../components/HomePage/CTAbutton";
import CodeBlock from "../components/HomePage/CodeBlock";
import ContentBlock from "../components/HomePage/ContentBlock";
//homepage css
import "./Homepage.css";
import '@dotlottie/player-component';

import TimeLineSection from "../components/HomePage/TimeLineSection";
import LearningLanguageSection from "../components/HomePage/LearningLanguageSection";
import Footer from "../components/common/Footer";

const Home = () => {
  return (
    <div>
      {/* section 1 */}
      <div className="relative mx-auto flex flex-col w-11/12 items-center justify-between text-white">
        <div className="mt-20 ">
          <Link to={"/signup"}>
            <div
              className="flex flex-row items-center mx-auto rounded-full px-4 py-2 gap-2
                text-richblack-200 font-bold group  transition-all duration-200 
                bg-richblack-800 hover:bg-richblack-900  glass_effect hover:scale-95
                "
            >
              <p>Join for Free</p>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.3747 6.34992L8.98398 3.95926C8.79639 3.77175 8.54199 3.66644 8.27675 3.6665C8.01151 3.66657 7.75716 3.77199 7.56965 3.95959C7.38214 4.14718 7.27684 4.40159 7.2769 4.66682C7.27696 4.93206 7.38239 5.18641 7.56998 5.37392L9.19598 6.99992H3.33398C3.06877 6.99992 2.81441 7.10528 2.62688 7.29281C2.43934 7.48035 2.33398 7.7347 2.33398 7.99992C2.33398 8.26514 2.43934 8.51949 2.62688 8.70703C2.81441 8.89456 3.06877 8.99992 3.33398 8.99992H9.19598L7.56998 10.6259C7.38239 10.8134 7.27696 11.0678 7.2769 11.333C7.27684 11.5983 7.38214 11.8527 7.56965 12.0403C7.75716 12.2279 8.01151 12.3333 8.27675 12.3333C8.54199 12.3334 8.79639 12.2281 8.98398 12.0406L11.3747 9.64992C11.8115 9.2119 12.0568 8.61853 12.0568 7.99992C12.0568 7.38131 11.8115 6.78795 11.3747 6.34992Z"
                  fill="#999DAA"
                />
              </svg>
            </div>
          </Link>
        </div>

        <>
          {/* paragraph */}
          <div className="text-center text-4xl font-semibold mt-5">
            Empower Your Future wih{" "}
            <HighlightText text={"Coding Skills"} bgColor={"text-gradient"} />
          </div>
          <div className="mt-4 w-[88%] text-center text-lg font-bold text-richblack-300">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.
          </div>
        </>

        {/* button */}
        <div className="flex flex-col md:flex-row gap-1 md:gap-8 my-4">
          <CTAbutton linkto={"signup"}>Learn More</CTAbutton>
          <CTAbutton linkto={"contactus"}>Book a Demo</CTAbutton>
        </div>
        {/* button end */}

        {/* video
        <div className="mx-3 my-10 w-8/12 rounded-lg text-center">
        
          <dotlottie-player
                src="https://lottie.host/ff1e9617-34fb-43a7-91a1-33968a9e37a5/TSmiMzKTYe.lottie"
                autoplay
                loop
                style={{ height: '50%', width: '50%' }}
              />

        </div> */}

        {/* animation section 1*/}
        <div className="flex lg:flex-row flex-col justify-between items-center gap-10 py-10 md:px-24 md:py-10 ">
          <ContentBlock
            heading={
              <div className="text-4xl font-semibold">
                Unlock your{" "}
                <HighlightText
                  text={"coding potential"}
                  bgColor={"text-gradient"}
                />{" "}
                with our online courses.
              </div>
            }
            subheading={
              <p className="text-richblack-300 text-base font-bold w-[85%] -mt-3 ">
                Our courses are designed and taught by industry experts who have
                years of experience in coding and are passionate about sharing
                their knowledge with you.
              </p>
            }
            ctabtn1={{ children: "Try it Yourself", linkto: "/signup" }}
            ctabtn2={{ children: "Learn More", linkto: "/contactus" }}
          />
          <div className="lg:w-[50%] justify-center">
          <dotlottie-player 
                src="https://lottie.host/ff1e9617-34fb-43a7-91a1-33968a9e37a5/TSmiMzKTYe.lottie"
                autoplay
                loop
                style={{ height: '100%', width: '100%' }}
              />
          </div>
          
        </div>
        {/* animation section 2*/}
        <div className="flex lg:flex-row-reverse flex-col justify-between gap-10 md:px-24 py-28 sm:pb-80 ">
          <ContentBlock
            heading={
              <div className="text-4xl font-semibold">
                Start{" "}
                <HighlightText text={"coding now"} bgColor={"text-gradient"} />{" "}
              </div>
            }
            subheading={
              <p className="text-richblack-300 text-base font-bold w-[85%] -mt-3 ">
                Go ahead, give it a try. Our hands-on learning environment means
                you'll be writing real code from your very first lesson.
              </p>
            }
            ctabtn1={{ children: "Continue Lesson", linkto: "/signin" }}
            ctabtn2={{ children: "Learn More", linkto: "/contactus" }}
          />
          <CodeBlock
            code={`<!DOCTYPE html>\n<html>\n<head>\n<title>Student</title>\n</head>\n<body>\n<section>\n<h2>Hey 👋,</h2>\n<p>Welcome to StudyHub</p>\n</section>\n</body>\n</html>`}
            line={
              <>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
              </>
            }
          />
          
        </div>
        {/* !section 1 end */}
      </div>

      {/* layer transformation */}
      <div className="spacer layer1 "></div>

      {/* section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700 ">
        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7 sm:mt-96 md:-mt-32 ">
          {/* Business solution */}
          <div className="flex flex-col lg:flex-row lg:gap-20 px-5 sm:py-10">
            <div className="text-4xl font-semibold lg:w-[45%] mb-24 md:mb-0">
              <p>
                Build the workforce{" "}
                <HighlightText
                  text={"of tomorrow, today."}
                  bgColor={"text-gradient"}
                />
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:w-[45%] items-start">
              <p className="text-4xl font-semibold ">
                Let's Discuss How{" "}
                <HighlightText
                  text={"StudyHub Can Transform Your Company."}
                  bgColor={"text-gradient"}
                />
              </p>
              <CTAbutton linkto={"contactus"}>Contact Us</CTAbutton>
            </div>
          </div>

          {/* TimeLine section */}
          <div className="flex flex-col lg:flex-row  mt-20 md:mt-5 gap-20 mb-20 items-center ">
            <TimeLineSection />
          </div>
          <div>
            <LearningLanguageSection />
          </div>
        </div>
      </div>

      {/* section 3 */}
      <div className="relative mx-auto flex flex-col w-11/12 items-center justify-between mt-60 text-white  mb-auto  spacer layer2 ">
        <div>
          <div class="flex flex-col lg:flex-row gap-5 items-center mt-28 lg:mt-20">
            <div>
              <dotlottie-player
                src="https://lottie.host/b8fc3b22-2c4f-4946-bee2-f46db325fb3b/lRdURC7aZE.lottie"
                autoplay
                loop
                style={{ height: '100%', width: '100%' }}
              />
            </div>
            <div className="lg:w-[50%] flex gap-5 flex-col justify-center px-10 mb-10">
              <h1 className="text-4xl font-semibold">
                Become an <HighlightText text={"instructor"} bgColor={"text-gradient"}/>
              </h1>
              <p className="font-medium text-[16px] text-justify w-[90%] text-richblack-300">
                Instructors from around the world teach millions of students on
                StudyHub. We provide the tools and skills to teach what you
                love.
              </p>
              <div className="w-fit">
                <CTAbutton linkto={"/signup"}>{"Start Teaching Today"}</CTAbutton>
              </div>
            </div>
          </div>
        </div>
        {/* teacher part complete */}

      </div>

      {/* footer */}
      <Footer/>
    </div>
  );
};

export default Home;
