import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';

const Dashboard = () => {
    const {loading : authLoading} = useSelector( (state) => state.auth );
    const {loading : profileLoading} = useSelector( (state) => state.profile );
    
    if(profileLoading || authLoading){
        return (
        <div className='flex flex-col gap-5 p-6'>
        <dotlottie-player
          src="https://lottie.host/d803982d-1092-4441-a7cf-703480b6527c/ixizH625AD.lottie"
          autoplay
          loop
          style={{ height: "100%", width: "100%" }}
        />
        </div>
        )
    }
    console.log("dashboard called");

    return (
      <div className="relative flex min-h-full mt-5">
      <Sidebar />
      <div className="h-full flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet/>
        </div>
      </div>
    </div>
  )
}









export default Dashboard;