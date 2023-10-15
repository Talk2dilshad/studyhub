import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { apiConnector } from '../services/microservices';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/exploreApi';
import CourseCard from '../components/explore/Course_Card';
import Footer from '../components/common/Footer';
import CourseSlider from '../components/explore/Course_slider';

const Explore = () => {
    const {loading} = useSelector( (state)=> state.profile);
    const {catalogName} = useParams();
    const [active,setActive] = useState(1);

    const [catalogPageData,setCatalogPageData] = useState(null);
    const [categoryId,setCategoryId] = useState("");


    useEffect( () => {
        const getCategoryDetails = async() => {
            try {
                const res = await apiConnector("GET", categories.CATEGORIES_API)
                const category_id = res?.data?.data?.filter(
                  (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
                )[0]._id
                setCategoryId(category_id)
            } catch (error) {
                console.log("Could not fetch Categories.", error)
            }
        }
        getCategoryDetails();
    },[catalogName]);
// based on category id get category page details
    useEffect( () => {
        const getCategoryPageDetails = async() => {
            try{
                const res = await getCatalogPageData(categoryId);
                setCatalogPageData(res);
            } catch (error) {
                console.log(error)
            }
        }
        getCategoryPageDetails();
    },[categoryId]);

    if(loading || !catalogPageData)
    {
        return(
        <div className='justify-center items-center mt-2 relative'>
        <div className='flex flex-col'>
        <dotlottie-player
        src="https://lottie.host/c46e1cbb-90f5-4bda-91a2-2d13dfa4cf27/SHS1Q5qW4Y.lottie"
        autoplay
        loop
        style={{ height: "100%", width: "100%" }}
        />
      </div>
    </div>
      )
    }


  return (
    <div className='justify-center items-center mt-20 relative text-white'>
    {/* Hero Section */}
    <div className=" box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-blue-100">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-richblack-5">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

    {/* section1 */}
    <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
        <p className='section_heading'>Course to get you started</p>
        <div className='my-4 flex border-b border-b-richblue-600 text-sm'>
            <p className={`px-4 py-2 cursor-pointer ${active ===1 ?"border-b border-b-blue-100 text-blue-100" : "text-richblack-50" }`} 
            onClick={()=> setActive(1)}
            >
                Most Popular
            </p>
            <p
            className={`px-4 py-2 ${
              active === 2
                ? "border-b border-b-blue-100 text-blue-100"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div>
            <CourseSlider
                Courses={catalogPageData?.data?.selectedCategory?.courses}
            />
        </div>
    </div>
    {/* section 2 */}
    <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
        <div className='section_heading'>
            Top Course in {catalogPageData?.data?.differentCategory?.courses}
        </div>
        <div className='py-8'>
            {/* course slider */}
            <CourseSlider
            Courses={catalogPageData?.data?.differentCategory?.courses}
          />
        </div>
    </div>
    {/* section 3 */}
    <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Frequently Bought</div>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {catalogPageData?.data?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, i) => (
                <CourseCard course={course} key={i} Height={"h-[400px]"} />
              ))}
          </div>
        </div>
      </div>

    <Footer/>
    </div>
  )
}

export default Explore