import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx/xlsx.mjs';
import { db } from '../../config/dbConfig.js'
import  { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { ModalWrapper } from '../Ui/ModalWrapper.jsx';
import { MapaDetalleEolica } from '../MapaDetalle/MapaDetalleEolica.jsx';
// import { BotonCierreModalDetalle } from '../../componentes/MapaDetalle/BotonCierreModalDetalle';
import { BotonCierre } from '../Ui/BotonCierre.jsx';


const _f =  (dato) => {

  if(typeof dato === 'number'){
    return dato.toFixed(2)
  }
  return dato
}

function TablaEolica() {

    const [ registrosEolica, setRegistrosEolica ] = useState(null)
    const [ cargando, setCargando ] = useState(false)
    const [ datosRegistro , setDatosRegistro ] = useState(null)

    const obtenerRegistros = async () => {
      try{
          setCargando(true)
          const datosSnapshot = await getDocs(collection(db, "registros_eolica"))
          const formatoLista = datosSnapshot.docs.map( element => {
              const data = {
                id : element.id,
                ... element.data()
              }
              return data
          })
          setRegistrosEolica(formatoLista)
          console.log("Realizando consulta eolica....")
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
      await deleteDoc(doc(db, "registros_eolica", registro.id))
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
      const idTabla = document.getElementById('tabla_registros_eolica')
      const libroExcel = XLSX.utils.table_to_sheet(idTabla)
      libroExcel['!cols'] = [];
      libroExcel['!cols'][13] = { hidden: true };
      const nuevoLibro = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(nuevoLibro, libroExcel, 'Registros_Eolica') 
      XLSX.writeFile(nuevoLibro, 'registros_Eolica.xlsx')

    }

    const mostrarModalDetalle = (registro) => {
      setDatosRegistro(registro)
    }

    const cerrarModalDetalle = ( ) => {
      setDatosRegistro(null)
    }
 
    useEffect( () => {
        obtenerRegistros()
    }, [setRegistrosEolica])

    return (
      <>
      {
        datosRegistro && (
          <ModalWrapper>
            <MapaDetalleEolica datosPunto={datosRegistro} />
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
        registrosEolica && (
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center sm:justify-center">
              <div className="px-20 sm:flex-auto sm:flex sm:items-center sm:justify-between">
                <h1 className="text-base font-semibold leading-6 text-gray-900">Registros cálculo energía eólica en Antioquia</h1>
                <button className='rounded bg-indigo-600 px-2 h-6 text-xs text-white shadow-sm outline-2 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'  onClick={registrosAExcel} >Descargar</button>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-20">
                  <table id="tabla_registros_eolica" className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-0">
                          Nombre proyecto
                        </th>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900">
                          Fecha
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                          Municipio
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                          Altura (m)
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                          Velocidad de viento (m/s)
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                          Coeficiente máquina
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                          Diámetro rotor (m)
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                          Factor de planta
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                          Área parque eólico (ha)
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                          Potencia eólica (kW)
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                          Generación anual (MWh/año)
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                          Aerogeneradores
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                          Potencia parque eólico (kW)
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                          Generacion parque eólico (MWh/año)
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
                      {registrosEolica.map(( registro ) => (
                        <tr key={registro.id}>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{registro.nombreProyecto}</td>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{registro.fechaGuardado}</td>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{registro.municipio}</td>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{_f(registro.AlturaVelocidadViento)}</td>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{_f(registro.velocidadViento)}</td>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{registro.coeficienteMaquina}</td>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{registro.diametroRotor}</td>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{registro.factorPlanta}</td>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{registro.areaLoteHa}</td>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{_f(registro.potenciaEolica)}</td>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{_f(registro.generacionAnualEolica)}</td>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{registro.numeroAerogeneradores}</td>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{_f(registro.potenciaParqueEolico)}</td>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{_f(registro.generacionParqueEolico)}</td>
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
                            <a onClick={ () => borrarRegistro(registro) } href="#" className="ml-2 text-red-400 hover:text-indigo-900">
                              Borrar
                            </a>
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
  

  export { TablaEolica }
