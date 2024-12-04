import React, {useState} from 'react'
import {
    faCaretLeft
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {ContenidoMenuCapas} from './ContenidoMenuCapas.jsx'
import {MosaicoMapasBase} from './MosaicoMapasBase.jsx'
import {Link} from 'react-router-dom'
import combustibles from '../../assets/icons/central.png'
import calculoEnergia from '../../assets/icons/solar_eolica.png'
import emisiones from '../../assets/icons/energias.png'
import flujoEnergetico from '../../assets/icons/flujo_energetico.png'
import layerImg from '../../assets/icons/layer_icon.png'
import mapImg from '../../assets/icons/map_icon.png'
import sustitucion from '../../assets/icons/sustitution_icon.png'
import results from '../../assets/icons/Results.png'

export const BarraLateralIzquierda = ({
                                          capas,
                                          manejarCapas,
                                          manejarTiles,
                                          tileSeleccionado,
                                          potenciales,
                                          manejarPotenciales
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
        {nombre: 'Capas', icono: layerImg, id: 'bntCapa', href: '#'},
        {nombre: 'Cálculo energía sostenible', icono: calculoEnergia, id: 'bntEnergia', href: '#'},
        {nombre: 'Demanda Combustibles', icono: combustibles, id: 'btnDemandaCombustibles', href: '/combustibles'},
        {nombre: 'Flujo energético', icono: flujoEnergetico, id: 'simulacion', href: '/simulacion'},
        {nombre: 'Sustitución', icono: sustitucion, id: 'sustitucion', href: '/sustitucion'},
        {nombre: 'Resultados', icono: results, id: 'resultados', href: '/resultados'},
        {nombre: 'Mapa Base', icono: mapImg, id: 'bntMapaBase', href: '#'},
    ]

    return (

        <div
            className={`absolute p-0 m-0 top-24 w-${btnSeleccionado ? 'fit' : '12'} left-2 h-[75%] bg-blue-100 bg-opacity-[95%] border-gray-400 shadow-lg rounded-lg shadow-gray-900 border z-[999]`}>
            <div id='barra_izquierda' className='flex h-full px-0 m-0 py-5 overflow-hidden'>
                {/* Iconos acciones  */}
                <div className='flex flex-col gap-5 justify-start items-center w-12 h-full my-auto border-r'>
                    {
                        botones.map((boton) => (
                            <Link
                                to={boton.href}
                                key={boton.id}
                                className={`w-8 h-8 text-center align-middle rounded-md shadow-lg  shadow-gray-800 ${btnSeleccionado === boton.id ? 'bg-blue-500' : 'bg-white'}`}
                                onClick={() => manejarSeleccion(boton.id)}
                            >
                                {/* <FontAwesomeIcon icon={boton.icono} color='white' title={boton.nombre}/> */}
                                <img src={boton.icono} title={boton.nombre} className='rounded-md' />
                            </Link>
                        ))
                    }
                </div>
                {/* Capas de informacion geoespacial */}
                <div
                    className={`${btnSeleccionado === 'bntCapa' ? 'block' : 'hidden'}`}
                >
                    <ContenidoMenuCapas
                        capas={capas}
                        manejarCapas={manejarCapas}
                        titulo="Información geoespacial"
                    />
                </div>

                {/* Capas calculo de energía sustentable */}
                <div
                    className={`${btnSeleccionado === 'bntEnergia' ? 'block' : 'hidden'}`}
                >
                    <ContenidoMenuCapas
                        capas={potenciales}
                        manejarCapas={manejarPotenciales}
                        titulo="Cálculo energía sostenible"
                    />
                </div>

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
