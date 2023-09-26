import React from 'react';
import logo1 from "../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../assets/Images/TimelineImage.png";

const timeLine = [
    {
        logo: logo1,
        heading: "Leadership",
        description: "Empowering Minds. Shaping Educational Leaders."
    },
    {
        logo: logo2,
        heading: "Responsibility",
        description: "Students will always be our top priority"
    },
    {
        logo: logo3,
        heading: "Flexibility",
        description: "The ability to switch is an important skills"
    },
    {
        logo: logo4,
        heading: "Solve the problem",
        description: "Code your way to a solution"
    }
];

const TimeLineSection = () => {
    return (
        <>
            <div className='lg:w-[45%] flex flex-col gap-14 lg:gap-3'>
                {timeLine.map((element, index) => {
                    const isLastIndex = index === timeLine.length - 1;
                    return (
                        <div className='flex flex-col lg:gap-3' key={index}>
                            <div className="flex gap-6">
                                <div className='w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]'>
                                    <img src={element.logo} alt={element.heading}/>
                                </div>
                                <div>
                                    <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                    <p className='text-base'>{element.description}</p>
                                </div>
                            </div>
                            {!isLastIndex && <div className='hidden lg:block h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]'></div>}
                        </div>
                    );
                })}
            </div>
            <div className='relative shadow-[10px_-5px_50px_-5px] shadow-blue-200 rounded-lg mt-5'>
                <img className='object-cover lg:h-[400px] h-[350px] rounded-md ' src={timelineImage} alt="timelineimage" />
            </div>
        </>
    );
}

export default TimeLineSection;
