import React, {useEffect} from 'react'
import { obtenerCuenca } from '../../../scripts/obtenerCuenca.js'

export const FormularioAguaSostenible = ({datosProduccionH2, guardarResultados, datos, setMostrarAguaSostenible, mostrarAguaSostenible}) => {
    
    const { datosArray, datosDb }  = datosProduccionH2 || {datosArray : null, datosDb : null} 
    const hidrogenoBruto = datosArray?.filter(( dato) => dato.id == 'hidrogenoBruto')

    useEffect(() => {

        if(hidrogenoBruto){        
        const toneladasH2 = parseFloat(hidrogenoBruto[0].resultado) 
        const kilosH2                     =  parseFloat(toneladasH2 * 1000)                                                  
        const aguaRequeridaM3             =  parseFloat((kilosH2 * 0.011).toFixed(2))                                          
        const aguaRequeridaMm3            =  parseFloat((aguaRequeridaM3 / 1000000).toFixed(5))                             
        const disponibilidad              =  obtenerCuenca(datos.lat, datos.lng)
        const disponibilidadAgua          =  parseFloat(disponibilidad.Dispo_ENSO.toFixed(2))
        const afectacionHidrica           =  parseFloat((aguaRequeridaMm3 / disponibilidadAgua).toFixed(5))             
        const porcentajeAfectacionHidrica =  parseFloat((afectacionHidrica * 100).toFixed(5))                           
        const cuenca                      = obtenerCuenca(datos.lat, datos.lng).NOMSZH
        
        const resultadosAgua = [
            {
                nombre : 'Cuenca',
                resultado : cuenca,
                unidad : '-'
            },
            {
                nombre : 'Consumo de agua',
                resultado : aguaRequeridaMm3,
                unidad : 'Mm3'
            },
            {
                nombre : 'Oferta hídrica crítica',
                resultado : disponibilidadAgua,
                unidad : 'Mm3'
            },
            {
                nombre : 'Porcentaje uso hídrico',
                resultado : porcentajeAfectacionHidrica,
                unidad : '%'
            }
        ]

        const resultadosBDH2 = {
            ...datosDb          
        }

        const resultadosH2 = {
            datosArray : resultadosAgua,
            datosDb : resultadosBDH2
        }

        guardarResultados(resultadosH2)
    }
    }, [datosProduccionH2, datos])


  return <div className='flex items-center gap-3 mt-5 ml-3'>
            <input type="checkbox"  checked={mostrarAguaSostenible} onChange={() => setMostrarAguaSostenible(!mostrarAguaSostenible)} />
            <label htmlFor="agua_sostenible" 
           className="block text-sm font-normal text-gray-700"
    > Mapa de agua sostenible
    </label>
  </div>
}
