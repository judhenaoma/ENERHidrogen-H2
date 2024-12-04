import React from 'react'

export const CajaLeyendaMapa = ({ children }) => {



  return (
    <div className='absolute bottom-4 left-[70px] bg-slate-100 z-[998] cursor-pointer pointer-events-auto rounded-lg shadow-lg shadow-black' >
        <h3 className='font-bold text-center'>Leyenda</h3>
        {
            children
        }   
    </div>
  )
}
