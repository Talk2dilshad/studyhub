import React from 'react'

const HighlightText = ({text,bgColor}) => {
  return (
    <span className={`${bgColor} font-bold  text-transparent bg-clip-text `} >
        {text}
    </span>
  )
}

export default HighlightText