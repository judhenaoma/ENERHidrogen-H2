import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx/xlsx.mjs';
import { db } from '../../config/dbConfig.js'
import  { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { ModalWrapper } from '../Ui/ModalWrapper.jsx';
import { MapaDetalleSolar } from '../MapaDetalle/MapaDetalleSolar.jsx';
import { BotonCierre } from '../Ui/BotonCierre.jsx';


const _f =  (dato) => {

  if(typeof dato === 'number'){
    return dato.toFixed(2)
  }
  return dato
}

function TablaSolar({isGuest}) {

    const [ registrosSolar, setRegistrosSolar ] = useState(null)
    const [ cargando, setCargando ] = useState(false)
    const [ datosRegistro , setDatosRegistro ] = useState(null)

    const obtenerRegistros = async () => {
      try{
          setCargando(true)
          const datosSnapshot = await getDocs(collection(db, "registros_solar"))
          const formatoLista = datosSnapshot.docs.map( element => {
              const data = {
                id : element.id,
                ... element.data()
              }
              return data
          })
          setRegistrosSolar(formatoLista)
          console.log("Realizando consulta solar....")
      }
      catch(e){
          alert('Error en el servidor obteniendo los registros')
          console.log('err: ' + e)
      }
      finally{
        setCargando(false)
      }
  }

  const borrarRegistro = async (registro) => {
    try{
      setCargando(true)
      await deleteDoc(doc(db, "registros_solar", registro.id))
      obtenerRegistros()
    }
    catch(e){
      alert('Error en el servidor eliminando el registro')
      console.log('err: ' + e)
    }
    finally{
      setCargando(false)
    }}

    const registrosAExcel = () => {
      const idTabla = document.getElementById('tabla_registros_solar')
      const libroExcel = XLSX.utils.table_to_sheet(idTabla)
      libroExcel['!cols'] = [];
      libroExcel['!cols'][8] = { hidden: true };
      const nuevoLibro = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(nuevoLibro, libroExcel, 'Registros_Solar') 
      XLSX.writeFile(nuevoLibro, 'registros_solar.xlsx')

    }

    const mostrarModalDetalle = (registro) => {
      setDatosRegistro(registro)
    }

    const cerrarModalDetalle = ( ) => {
      setDatosRegistro(null)
    }
 
    useEffect( () => {
        obtenerRegistros()
    }, [setRegistrosSolar])

    return (
      <>
      {
        datosRegistro && (
          <ModalWrapper>
            <MapaDetalleSolar datosPunto={datosRegistro} />
            <BotonCierre  cerrarModal = {cerrarModalDetalle}/>
          </ModalWrapper>
        )
      }
      {
          cargando && (
            <div className='w-full'>
              <div className="mx-auto w-12 h-12 rounded-full animate-spin
              border-2 border-solid border-indigo-500 border-t-transparent mt-8"></div>
            </div>
          )
      }
      {
        registrosSolar && (
          
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center sm:justify-center">
              <div className="px-20 sm:flex-auto sm:flex sm:items-center sm:justify-between">
                <h1 className="text-base font-semibold leading-6 text-gray-900">Registros cálculo energía solar en Antioquia</h1>
                <button className='rounded bg-indigo-600 px-2 h-6 text-xs text-white shadow-sm outline-2 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'  onClick={registrosAExcel} >Descargar</button>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-20">
                  <table id="tabla_registros_solar" className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-0">
                          Nombre Proyecto
                        </th>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900">
                          Fecha
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                          Municipio
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                          Demanda energía (kWh/año)
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                          Radiación (kWh/m2)
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                          Potencia (Mw)
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                          Generación Anual (Mwh/año)
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                          Número páneles solares
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                          Área requerida (m2)
                        </th>

                        {/* Nuevas */}

                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                          Hidrogeno Potencial (Ton/año)
                        </th>

                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                          Hidrogeno Real (Ton/año)
                        </th>

                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                          Electricidad requerida (kWh/año)
                        </th>

                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                          Stacks
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                          Emisiones evitadas (kTon/año)
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                          <span className="sr-only">Ver</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {registrosSolar.map(( registro ) => (
                        <tr key={registro.id}>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{registro.nombreProyecto}</td>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{registro.fechaGuardado}</td>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{registro.municipio}</td>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{registro.demandaEnergia}</td>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{_f(registro.radiacion)}</td>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{_f(registro.potencia)}</td>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{_f(registro.generacionAnual)}</td>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{registro.numeroPanelesPorPotencia}</td>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{_f(registro.areaIngresada)}</td>
                          {/* Nuevas */}
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{_f(registro.hidrogenoPotencial)}</td>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{_f(registro.hidrogenoReal)}</td>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{_f(registro.electricidadRequerida)}</td>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{_f(registro.numeroStacks)}</td>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{_f(registro.emisionesEvitadas)}</td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <a onClick={ () => mostrarModalDetalle(registro) } href="#" className="text-indigo-600 hover:text-indigo-900">
                              Ver
                            </a>
                            {
                              !isGuest && (
                             <a onClick={ () => borrarRegistro(registro) } href="#" className="ml-2 text-red-400 hover:text-indigo-900">
                              Borrar
                            </a>)
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
      </div>
        )
      }
      
      </>
    )
  }
  

  export { TablaSolar }
