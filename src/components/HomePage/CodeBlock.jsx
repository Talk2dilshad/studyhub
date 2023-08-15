import React from 'react'
import { TypeAnimation } from 'react-type-animation'

const CodeBlock = ({code,line}) => {
  return (
    <div className={`h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]`}>
      <div class={`text-center flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold`}>
        {line}
      </div>
      <div className={`w-[90%] flex flex-col gap-2 font-bold text-transparent bg-clip-text code-gradient pr-1`}>
        <TypeAnimation 
          style={{ whiteSpace: 'pre-line',  display: 'block' }}
          sequence={[code,3000,""]}
          repeat={Infinity}
          cursor={true}
          omitDeletionAnimation={true}
        />
      </div>
    </div>
  )
}

export default CodeBlock