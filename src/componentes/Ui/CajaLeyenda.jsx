import React from 'react'

export const CajaLeyenda = ({ children }) => {



  return (
    <div className='absolute bottom-4 left-4 bg-slate-100 z-[1000] cursor-pointer pointer-events-auto rounded-lg shadow-lg' >
        <h3 className='font-bold text-center'>Leyenda</h3>
        {
            children
        }
               
    </div>
  )
}
