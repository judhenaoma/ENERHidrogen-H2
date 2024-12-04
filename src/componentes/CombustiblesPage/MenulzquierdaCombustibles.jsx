import React, {useState} from 'react'
import {
    faEarthAmerica,
    faCaretLeft,
    faArrowRotateLeft
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { MosaicoMapasBase } from '../MapaAntioquia/MosaicoMapasBase'
import {Link} from 'react-router-dom'

export const MenulzquierdaCombustibles = ({                                         
                                          manejarTiles,
                                          tileSeleccionado,
                                      }) => {

    const [btnSeleccionado, setBtnSeleccionado] = useState(null)

    const manejarSeleccion = (id) => {

        if (id === btnSeleccionado) {
            setBtnSeleccionado(null)
            return
        }
        setBtnSeleccionado(id)
    }

    const cerrarBarraLateral = () => {
        setBtnSeleccionado(null)
    }

    const botones = [
        {nombre: 'Volver', icono: faArrowRotateLeft, id: 'volver', href: 'antioquia'},
        {nombre: 'Mapa Base', icono: faEarthAmerica, id: 'bntMapaBase', href: '#'},
    ]

    return (

        <div
            className={`absolute p-0 m-0 top-60 w-${btnSeleccionado ? 'fit' : '12'} left-2 h-[40%] bg-white bg-opacity-[95%] border-gray-400 shadow-lg shadow-gray-900 border z-[999]`}>
            <div id='barra_izquierda' className='flex h-full px-0 m-0 py-5 overflow-hidden'>
                {/* Iconos acciones  */}
                <div className='flex flex-col gap-5 justify-start items-center w-12 h-full my-auto border-r'>
                    {
                        botones.map((boton) => (
                            <Link
                                to={boton.href}
                                key={boton.id}
                                className={`w-8 h-8 text-center align-middle rounded-md shadow-md shadow-gray-600 ${btnSeleccionado === boton.id ? 'bg-blue-500' : 'bg-blue-800'}`}
                                onClick={() => manejarSeleccion(boton.id)}
                            >
                                <FontAwesomeIcon icon={boton.icono} color='white' title={boton.nombre}/>
                            </Link>
                        ))
                    }
                </div>
                {/* Capas de informacion geoespacial */}

                {/* Agregar capas de basemap */}
                <div
                    className={`${btnSeleccionado === 'bntMapaBase' ? 'block' : 'hidden'}`}
                >
                    <MosaicoMapasBase
                        manejarTiles={manejarTiles}
                        tileSeleccionado={tileSeleccionado}
                    />
                </div>
            </div>
            {
                btnSeleccionado ?
                    (
                        <div className='absolute -right-[22px] top-0 bg-white bg-opacity-75 border border-gray-400'>
                            <button
                                onClick={cerrarBarraLateral}
                                className='w-5 h-5'
                            >
                                <FontAwesomeIcon color='#3b82f6' icon={faCaretLeft} size='lg'/>
                            </button>
                        </div>
                    ) : null
            }
        </div>
    )
}
