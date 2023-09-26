import React from 'react'
import '@dotlottie/player-component';

const ErrorPage = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-[rgb(8,8,8)] overflow-hidden'>
        <div className='flex-col space-x-2'>
          <p className='text-richblack-25 text-base text-center'>ERR 404</p>
          <p className='text-richblack-25 text-base'>Page Not Found</p>
        </div>
    </div>
  )
}

export default ErrorPage