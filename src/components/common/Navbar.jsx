import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Small-Light.png"
import {NavbarLinks} from "../../data/navbar-links"
import { useSelector } from 'react-redux'
import {FiShoppingCart} from "react-icons/fi"
import {TbLogin} from "react-icons/tb"
import {PiUserCirclePlus} from "react-icons/pi"
import ProfileDropdown from '../Auth/ProfileDropDown'
import {BiSolidChevronDown} from "react-icons/bi"
import { fetchCourseCategories } from '../../services/operations/courseDetailsAPI'

const Navbar = () => {
  const instructor = "Instructor";
  const {token} = useSelector( (state) => state.auth);
  const {user} = useSelector( (state) => state.profile);
  const {totalItems} = useSelector( (state) => state.cart);

  console.log(token,user,totalItems);
  
  //api call process
  const [subLinks,setSubLinks] = useState([]);
  const fetchSubLinks = async () => {
    const categories = await fetchCourseCategories();
    if(categories.length>0){
      setSubLinks(categories);
    }
  }

  useEffect( () => {
    fetchSubLinks();
  },[])

  return (
    <div className='h-14 fixed top-0 z-99 w-full backdrop-blur items-center justify-center flex lg:z-50 lg:border-b lg:border-[#0f172a1a] bg-[#080a0ce0] z-[100]'>
        <div className='flex w-11/12 max-w-maxContent justify-between items-center text-richblack-5 z-[100]'>
           <Link to="/" className='flex flex-row gap-2 sm:mr-5'>
            <img src={logo} alt="logo" width={22} height={"auto"} className='object-contain hidden md:block' loading='lazy'></img>
            <h2 className='text-xl font-medium'>StudyHub</h2>
           </Link>

           {/* navlink */}
           <nav className='items-center'>
              <ul className='flex gap-x-3 items-center'>
                {
                  NavbarLinks.map( (link,index) =>(
                    <li key={index}>
                      {
                        link.title === "Explore" ? 
                        (<div className='relative flex items-center gap-1 group'>
                          <p className=' hidden md:block'>{link.title}</p>
                          <p className='block md:hidden'>Menu</p>
                          <BiSolidChevronDown/>
                          <div className='invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 backdrop:blur-sm p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]'>
                                {
                                    subLinks.length ? (
                                            subLinks.map( (subLink, index) => (
                                                <Link to={`/catalog/${subLink.name.toLowerCase().replace(/\s+/g, '-')}`} key={index}>
                                                    <p className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50'>{subLink.name}</p>
                                                </Link>
                                            ) )
                                    ) : (<div className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50'>No Course Available</div>)
                                }
                            </div>

                        </div>) :
                        (<p className='hover:text-[#0ea5e9] hidden md:block'>
                          <Link to={link?.path}>
                          {link.title}
                          </Link> 
                        </p>)
                      }
                    </li>
                  ))
                }
              </ul>
           </nav>


           {/* Login/signup/dashboard */}
           <div className='flex gap-x-3 items-center'>
            {/* cart logic */}
            {
              user && user?.accountType !== instructor && (
                <Link to='/dashboard/cart' className='relative'>
                  <FiShoppingCart size={20}/>
                  {
                    totalItems > 0 && (
                      <span className='absolute -top-2 -right-2 bg-blue-200 text-xs w-5  h-5 flex
                      justify-center items-center animate-bounce rounded-full text-white'>
                        {totalItems}
                      </span>
                    )
                  }
                </Link>
              )
            }
            {/* login & signup logic */}
            {
              token === null && 
              (<Link to="/login">
                <button className='glass_effect flex flex-row items-center mx-auto rounded-full px-4 py-1
                text-richblack-200 font-bold group  transition-all duration-200 
                bg-richblack-800 hover:bg-richblack-900 hover:scale-95'>
                  <div className='block md:hidden'><TbLogin size={20}/></div>
                  <span className='hidden md:block'>Log In</span></button>
              </Link>)
            }
            {
              token === null && 
              (<Link to="/signup">
                <button className='glass_effect flex flex-row items-center mx-auto rounded-full px-4 py-1
                text-richblack-200 font-bold group  transition-all duration-200 text-[13px] md:text-base
                bg-richblack-800 hover:bg-richblack-900 hover:scale-95'>
                  
                <div className='block md:hidden'><PiUserCirclePlus size={20}/></div>
                  <span className='hidden md:block'>Sign Up</span></button>
              </Link>)
            }
            {
                token !== null && <ProfileDropdown/>
            }
           </div>
        </div>
    </div>
  )
}

export default Navbar