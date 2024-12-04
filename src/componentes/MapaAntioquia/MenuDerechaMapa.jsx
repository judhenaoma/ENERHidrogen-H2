import React, {useState} from 'react'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormularioSolar } from './FormularioEnergia/FormularioSolar.jsx'
import { ResultadoEstimacion } from './FormularioEnergia/ResultadoEstimacion.jsx'
import { FormularioEolica } from './FormularioEnergia/FormularioEolica.jsx'
import { FormularioH2Solar } from './FormularioEnergia/FormularioH2Solar.jsx'
import { guardarRegistrosSolar } from '../../scripts/guardarRegistrosSolar.js'
import { guardarRegistrosEolica } from '../../scripts/guardarRegistrosEolica.js'
import { FormularioAguaSostenible } from './FormularioEnergia/FormularioAguaSostenible.jsx'
import { TabsWithDissable } from '../Ui/TabsWithDissable.jsx'


const tabsSolar = [
  { name: 'Energía solar', dissabled : false, href: '#', current: true, id :'solar' },
  { name : 'Producción H2', href: '#', dissabled: true,  current: false, id :'h2' },
  { name: 'Oferta de agua sostenible', dissabled : true, href: '#', current: false, id :'agua' }
]

const tabsEolica = [
  { name: 'Energía eólica', dissabled : false, href: '#', current: true, id :'eolica' },
  { name : 'Producción H2', href: '#', dissabled: true,  current: false, id :'h2' },
  { name: 'Oferta de agua sostenible', dissabled : true, href: '#', current: false, id :'agua' }
]

export const MenuDerechaMapa = ({manejarBarraDerecha, mostrarEnBarraDerecha, setMostrarAguaSostenible, mostrarAguaSostenible}) => {
  // Nombre del proyecto
  const [nombreProyecto, setNombreProyecto] = useState('')
  // Energia solar
  const [ solarTabs, setSolarTabs ] = useState(tabsSolar)
  const [ resultadosSolar, setResultadosSolar ] = useState(null)
  const [ resultadosH2, setResultadosH2 ] = useState(null)
  const [ resultadosAguaSostenible, setResultadosAguaSostenible ] = useState(null)
  // Energia eolica
  const [ eolicaTabs, setEolicaTabs ] = useState(tabsEolica)
  const [ resultadoEolica, setResultadoEolica ] = useState(null)
  const [ resultadosH2Eolica, setResultadosH2Eolica] = useState(null)
  const [ resultadosAguaSostenibleEolica, setResultadosAguaSostenibleEolica ] = useState(null)

  const [valorIngresadoEnergiaEolica, setValorIngresadoEnergiaEolica] = useState(null)
  
  const tabActivaSolar = solarTabs?.filter((tab) => tab.current === true)
  const tabActivaEolica = eolicaTabs?.filter((tab) => tab.current === true)

  // Guardar datos en la base de datos
  // > Solar
  const guardarDatosSolarBD = (datos) => {
    guardarRegistrosSolar(datos)
}
  // > Eolica
  const guardarDatosEolica = (datos) => {
    guardarRegistrosEolica(datos)
  }

  // Guardar resultados cálculo
  // > Generacion de energía solar
  const guardarResultadosSolar = (resultados) => {
    setResultadosSolar(resultados)
  }
  // > Producción de H2 solar
  const guardarResultadosH2 = (resultados) => {
    setResultadosH2(resultados)
  }
  // > Oferta de agua sostenible solar
  const guardarResultadosAguaSostenible = (resultados) => {
    setResultadosAguaSostenible(resultados)
  }
  // > Generacion de energía eolica
  const guardarResultadosEolica = (resultados) => {
    setResultadoEolica(resultados)
  }
  // > Producción de H2 eolica
  const guardarResultadosH2Eolica = (resultados) => {
    setResultadosH2Eolica(resultados)
  }
  // > Oferta de agua sostenible eolica
  const guardarResultadosAguaSostenibleEolica = (resultados) => {
    setResultadosAguaSostenibleEolica(resultados)
  }
  // Funcionalidad para ocultar la barra lateral
  const ocultarBarra = () => {
    manejarBarraDerecha(null)
  }
  // Energía eólica manual
  const manejarEnergiaEolicaIngresada = (e) => {
    setValorIngresadoEnergiaEolica(e.target.value)
}
  // Nombre del proyecto
  const setProjectName = (e) => {
    setNombreProyecto(e.target.value)
  }

  return (
    <>
    {
    mostrarEnBarraDerecha !== null ? (
    <div className='absolute top-24 right-1 bg-white bg-opacity-[95%] border-gray-400 shadow-lg shadow-gray-900 border  w-[500px] h-[76%] z-[999] p-4'>
      {
        mostrarEnBarraDerecha.tipo === 'solar' && (
        <div className='w-full h-full overflow-y-auto overflow-x-hidden'>
            <TabsWithDissable tabs={solarTabs} setTabs={setSolarTabs}/> 
            {
                <div className={`${tabActivaSolar[0].id === 'solar' ? 'block' : 'hidden'}`}>
                  <div>
                    <label htmlFor='nombre_proyecto' className='text-sm italic text-gray-600 mr-3'>Nombre del proyecto</label>
                    <input id='nombre_proyecto' value={nombreProyecto} onChange={setProjectName} placeholder='Nombre del proyecto' className='text-sm italic text-gray-600 mt-4' type='text'/>
                  </div>
                  <p className='text-sm italic text-gray-600 mt-4'>Radición por año: {mostrarEnBarraDerecha.etiqueta}</p>
                  <FormularioSolar  guardarResultados={guardarResultadosSolar} 
                                    datosSolar = { mostrarEnBarraDerecha }
                                    setSolarTabs = { setSolarTabs}
                                    setResultadosH2 = { setResultadosH2}
                                    nombreProyecto = {nombreProyecto}
                  />
                  <hr className='my-2'/>
                  <ResultadoEstimacion 
                      resultadosEnergia = {resultadosSolar} 
                      guardarDatosBD={guardarDatosSolarBD}
          
                  />
                </div>
            }
            {
                <div className={`${tabActivaSolar[0].id === 'h2' ? 'block' : 'hidden'}`}>
                   <p className='text-sm italic text-gray-600 mt-4'>Radición por año: {mostrarEnBarraDerecha.etiqueta}</p>
                  <FormularioH2Solar guardarResultados={ guardarResultadosH2 }
                                     datosCalculoSolar = { resultadosSolar }
                                     setTabs = { setSolarTabs}
                  />
                  <hr className='my-2'/> 
                  <ResultadoEstimacion 
                    resultadosEnergia = {resultadosH2} 
                    guardarDatosBD={guardarDatosSolarBD}
                  />
                </div>
            }
            {
                <div className={`${tabActivaSolar[0].id === 'agua' ? 'block' : 'hidden'}`}>
                  <FormularioAguaSostenible  
                                 guardarResultados={ guardarResultadosAguaSostenible } 
                                 datosProduccionH2 = { resultadosH2 }
                                 datos = { mostrarEnBarraDerecha }
                                 setMostrarAguaSostenible = { setMostrarAguaSostenible }
                                 mostrarAguaSostenible = { mostrarAguaSostenible }
                  />
                  <hr className='my-2'/> 
                  <ResultadoEstimacion 
                    resultadosEnergia = {resultadosAguaSostenible} 
                    guardarDatosBD={guardarDatosSolarBD}
                    mostrarGuardar={true}
                  />
                </div>
            }
        </div>
        )
      }
      {
        mostrarEnBarraDerecha.tipo === 'eolica' && (
          <div className='w-full h-full overflow-y-auto overflow-x-hidden'>
            <TabsWithDissable tabs={eolicaTabs} setTabs={setEolicaTabs}/>

            {
              <div className={`${tabActivaEolica[0].id === 'eolica' ? 'block' : 'hidden'}`}>
                <div>
                    <label htmlFor='nombre_proyecto' className='text-sm italic text-gray-600 mr-3'>Nombre del proyecto</label>
                    <input id='nombre_proyecto' value={nombreProyecto} onChange={setProjectName} placeholder='Nombre del proyecto' className='text-sm italic text-gray-600 mt-4' type='text'/>
                  </div>
                <div className='flex items-center justify-center gap-3 my-2 text-center align-middle'>

                  <p className='text-sm italic text-gray-600 mt-2'>Velocidad seleccionada : {mostrarEnBarraDerecha.etiqueta}</p> o 
                  <input 
                    type="number"
                    id="energia_eolica_ingresada"
                    value={valorIngresadoEnergiaEolica}
                    placeholder='Valor manual'
                    min='0'
                    max='100'
                    className='w-[25%] p-1 border border-gray-300 rounded-md text-sm italic'
                    onChange={manejarEnergiaEolicaIngresada}
                  />
                  <span className='text-sm italic text-gray-600'>m/s</span>
                </div>
                <FormularioEolica  guardarResultadosEolica = {guardarResultadosEolica} 
                                  datosEolica = { mostrarEnBarraDerecha }
                                  setTabs = { setEolicaTabs }
                                  resultadosH2 = { setResultadosH2Eolica }
                                  valorIngresadoEnergiaEolica = {valorIngresadoEnergiaEolica}
                />
                <hr className='my-2'/>
                <ResultadoEstimacion 
                      resultadosEnergia={resultadoEolica} 
                      guardarDatosBD = {guardarDatosEolica}
                />
              </div>
            }
            {
                <div className={`${tabActivaEolica[0].id === 'h2' ? 'block' : 'hidden'}`}>
                   <p className='text-sm italic text-gray-600 mt-4'>Radición por año: {mostrarEnBarraDerecha.etiqueta}</p>
                  <FormularioH2Solar guardarResultados={ guardarResultadosH2Eolica }
                                     datosCalculoSolar = { resultadoEolica }
                                     setTabs = { setEolicaTabs}
                  />
                  <hr className='my-2'/> 
                  <ResultadoEstimacion 
                    resultadosEnergia = {resultadosH2Eolica} 
                    guardarDatosBD={guardarDatosEolica}
                  />
                </div>
            }
            {
                <div className={`${tabActivaEolica[0].id === 'agua' ? 'block' : 'hidden'}`}>
                  <FormularioAguaSostenible  
                                 guardarResultados={ guardarResultadosAguaSostenibleEolica } 
                                 datosProduccionH2 = { resultadosH2Eolica }
                                 datos = { mostrarEnBarraDerecha }
                                 setMostrarAguaSostenible = { setMostrarAguaSostenible }
                                 mostrarAguaSostenible = { mostrarAguaSostenible }
                  />
                  <hr className='my-2'/> 
                  <ResultadoEstimacion 
                    resultadosEnergia = {resultadosAguaSostenibleEolica} 
                    guardarDatosBD={guardarDatosEolica}
                  />
                </div>
            }
          </div>
        )
      }
        <div className='absolute -left-[21px] top-0 bg-white bg-opacity-75 border border-gray-400'>
            <button
              onClick={ocultarBarra}
              className='w-5 h-5'
            >
              <FontAwesomeIcon color='#3b82f6' icon={faCaretRight} size='lg'/>
            </button>
          </div>
    </div>
    ) : null
   }
   </>
  )
}
