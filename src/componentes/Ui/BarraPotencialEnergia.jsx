import React from 'react'
import { CheckBox } from './CheckBox'

export const BarraPotencialEnergia = ({ potenciales, manejarPotenciales }) => {



  return (
    <div id='potenciales_energia' className='hidden sm:block absolute py-2 top-4 right-4 w-3/12 h-auto bg-slate-100 z-[1000] cursor-pointer pointer-events-auto rounded-lg shadow-lg' >
        <h3 className='font-bold text-center'>Calcular generación de energía</h3>
        <ul role="list" className="-mx-2 space-y-1 overflow-y-auto">
            {
                potenciales.map((item) => (
                    <li key={item.nombre} >
                        <CheckBox
                            nombre={item.nombre}
                            identificador={item.id}
                            activo={item.activo}
                            manejarCapas = {manejarPotenciales}
                            className={                                        
                            'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700'
                            }
                        />

                        {/* <button
                            type="button"
                            className="rounded bg-indigo-600 px-2 h-6 text-xs text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                            Calcular
                        </button> */}
                    </li>
                ))
            }
        </ul>
        
    </div>
  )
}
