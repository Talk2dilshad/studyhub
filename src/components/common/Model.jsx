import React from 'react'

const Model = ({open,onClose,children}) => {
  return (
    // backdrop
    <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/20 " : "invisible"}`}>
        
    </div>
  )
}

export default Model
