import React from 'react'

const LoadingAnimation = () => {
  return (
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
  )
}

export default LoadingAnimation