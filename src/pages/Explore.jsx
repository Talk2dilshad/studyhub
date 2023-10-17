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


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch category data
                const res = await apiConnector("GET", categories.CATEGORIES_API);
                const category_id = res?.data?.data?.find(
                    (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
                )?._id;
                setCategoryId(category_id);

                // Fetch catalog page data based on category ID
                if (category_id) {
                    setCatalogPageData(null);
                    const catalogData = await getCatalogPageData(category_id);
                    setCatalogPageData(catalogData);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [catalogName]);

    

  return (
    <>
    {
      loading || !catalogPageData || !categoryId  ? 
      
      (
        <div className='justify-center items-center mt-2 relative'>
        <div className='flex flex-col justify-center items-center h-[500px] overflow-hidden'>
        <dotlottie-player
        src="https://lottie.host/c46e1cbb-90f5-4bda-91a2-2d13dfa4cf27/SHS1Q5qW4Y.lottie"
        autoplay
        loop
        style={{ height: "fit-content", width: "100%",overflow:"hidden" }}
        className='overflow-y-hidden h-fit '
        />
      </div>
      </div>
      ) : 
      (
        <div className='justify-center items-center mt-20 relative text-white'>
        {/* Hero Section */}
        <div className=" box-content bg-richblack-800 px-4">
            <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
              <p className="text-sm text-richblack-300">
                {`Home / Explore / `}
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

        {/* Section 1 */}
        <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">Courses to get you started</div>
            <div className="my-4 flex border-b border-b-richblack-600 text-sm">
              <p
                className={`px-4 py-2 ${
                  active === 1
                    ? "border-b border-b-blue-50 text-blue-50"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Populer
              </p>
              <p
                className={`px-4 py-2 ${
                  active === 2
                    ? "border-b  border-b-blue-50 text-blue-50"
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
                Top Course in {catalogPageData?.data?.differentCategory?.name}
            </div>
            <div className='py-8'>
                {/* course slider */}
                {
                  console.log("section 2 explore ",catalogPageData?.data?.differentCategory?.courses)
                }
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
                    <CourseCard course={course} key={i} Height={"h-[300px]"} />
                  ))}
              </div>
            </div>
          </div>

        <Footer/>
        </div>
      )
    }
    </>
  )
}

export default Explore