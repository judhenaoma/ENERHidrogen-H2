import { Dropdown } from '../Ui/Dropdown'
import { Tabla } from '../Ui/Tabla'
import React, {useState, useEffect} from 'react'
import  { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../config/dbConfig'
import { Desplegable } from '../SankeyPage/Desplegable'
import diesel from '../../data/diesel.json'
import corriente from '../../data/corriente.json'
import gasMunicipio from '../../data/consumo_mpio.json'
import { Link } from 'react-router-dom'
export const SustitutionLayout = () => {

    const [registrosTablaEolica, setRegistrosTablaEolica] = useState({
        columnas : [],
        filas : []
    })

    const [registrosTablaSolar, setRegistrosTablaSolar] = useState({
        columnas : [],
        filas : []
    })

    const [ porcentaje_sustituir, setPorcentajeSustituir ] = useState(0.5)


    const handleChangePorcentaje = (e) => {
        const { value } = e.target
        setPorcentajeSustituir(value)
    }

    const [dropdownDataDiesel, setDropdownDataDiesel] = useState(diesel)
    const [ dropdownDataGasolina, setDropdownDataGasolina] = useState(corriente)
    const [dropdownGasNatural, setDropdownGasNatural] = useState(gasMunicipio)
    const [valorSeleccionadoH2, setValorSeleccionadoH2] = useState(0)
    const [projectoSeleccionadoSolar, setProjectoSeleccionadoSolar] = useState(null)
    const [projectoSeleccionadoEolica, setProjectoSeleccionadoEolica] = useState(null)
    const [valorSeleccionadoSolar, setValorSeleccionadoSolar] = useState(0)
    const [valorSeleccionadoEolica, setValorSeleccionadoEolica] = useState(0)
    const [emisionesEvitadasSolar, setEmisionesEvitadasSolar] = useState(0)
    const [emisionesEvitadasEolica, setEmisionesEvitadasEolica] = useState(0)


    const [formularioSustitucion, setFormularioSustitucion] = useState({
        diesel_oil : 0,
        porcentaje_diesel_oil : 1,
        gasolina_motor : 0,
        porcentaje_gasolina_motor : 1,
        carbon_mineral : 0,
        porcentaje_carbon_mineral : 1,
        gas_natural : 0,
        porcentaje_gas_natural : 1
    })
    
    const [ resultados, setResultados ] = useState({
        columnas : [],
        filas : []
    })

    const [ resultadosEmisiones, setResultadosEmisiones ] = useState({
        columnas : [],
        filas : []
    })

    const [selectedRecord, setSelectedRecord] = useState(null);

    useEffect(() => {   
        selectData()
        loadDropdownData()
    }, [])

    useEffect(() => {
        loadDropdownData()
    }, [porcentaje_sustituir])

    useEffect(() => {
        setValorSeleccionadoH2(valorSeleccionadoSolar + valorSeleccionadoEolica)
    }, [valorSeleccionadoSolar, valorSeleccionadoEolica])

    const handleSubmit = ( e) => {
        e.preventDefault()
    
        // Diesel oil
        const caloriasDesdeDiesel = formularioSustitucion.diesel_oil  * (formularioSustitucion.porcentaje_diesel_oil / 100)
        const h2DesdeDiesel = (caloriasDesdeDiesel * 1000000) / 120.21
        const toneladasH2Diesel = h2DesdeDiesel / 1000

        // Gasolina motor
        const caloriasDesdeGasolina = formularioSustitucion.gasolina_motor * (formularioSustitucion.porcentaje_gasolina_motor / 100)
        const h2DesdeGasolina = (caloriasDesdeGasolina * 1000000) / 120.21
        const toneladasH2Gasolina = h2DesdeGasolina / 1000

        // Carbon mineral
        const caloriasDesdeCarbon = formularioSustitucion.carbon_mineral * (formularioSustitucion.porcentaje_carbon_mineral / 100)
        const h2DesdeCarbon = (caloriasDesdeCarbon * 1000000) / 22.732
        const toneladasH2Carbon = h2DesdeCarbon / 1000

        // Gas natural
        const caloriasDesdeGas = formularioSustitucion.gas_natural * (formularioSustitucion.porcentaje_gas_natural / 100)
        const h2DesdeGas = (caloriasDesdeGas * 1000000) / 120.21
        const toneladasH2Gas = h2DesdeGas / 1000
        const emisionesEvitadas = emisionesEvitadasSolar + emisionesEvitadasEolica 

        const columnas = ['Categoria', 'Unidades', 'Valor']

        const valoresTabla = [
            { 'Categoria' :  'Consumo' , 'Unidades' : ' ', 'Valor' : ''},
            { 'Categoria' :  'Transporte' , 'Unidades' : '', 'Valor' : ''},
            { 'Categoria' :  'Consumo Diesel Oil' , 'Unidades' : 'Tjoules', 'Valor' : `${parseFloat(caloriasDesdeDiesel).toFixed(2)}`},
            { 'Categoria' :  'Consumo Gasolina Motor' , 'Unidades' : 'Tjoules', 'Valor' : `${parseFloat(caloriasDesdeGasolina).toFixed(2)}`},

            { 'Categoria' :  'Industria' , 'Unidades' : '', 'Valor' : ''},
            { 'Categoria' :  'Consumo Carbon Mineral' , 'Unidades' : 'Tjoules', 'Valor' : `${parseFloat(caloriasDesdeCarbon).toFixed(2)}`},
            { 'Categoria' :  'Consumo Gas Natural' , 'Unidades' : 'Tjoules', 'Valor' : `${parseFloat(caloriasDesdeGas).toFixed(2)}`},
            { 'Categoria' :  'Otros consumos' , 'Unidades' : 'Tjoules', 'Valor' : 0},


            { 'Categoria' :  'Producción H2' , 'Unidades' : ' ', 'Valor' : ''},
            { 'Categoria' :  'Transporte' , 'Unidades' : '', 'Valor' : ''},
            { 'Categoria' :  'Diesel Oil' , 'Unidades' : 'Ton H2', 'Valor' : `${parseFloat(toneladasH2Diesel).toFixed(2)}`},
            { 'Categoria' :  'Gasolina Motor' , 'Unidades' : 'Ton H2', 'Valor' : `${parseFloat(toneladasH2Gasolina).toFixed(2)}`},

            { 'Categoria' :  'Industria' , 'Unidades' : '', 'Valor' : ''},
            { 'Categoria' :  'Carbon Mineral' , 'Unidades' : 'Ton H2', 'Valor' : `${parseFloat(toneladasH2Carbon).toFixed(2)}`},
            { 'Categoria' :  'Gas Natural' , 'Unidades' : 'Ton H2', 'Valor' : `${parseFloat(toneladasH2Gas).toFixed(2)}`},
        ]

        // Emisiones 
        const emisionesDiesel = caloriasDesdeDiesel * 0.0752
        const emisionesGasolina = caloriasDesdeGasolina * 0.0692
        const emisionesCarbon = caloriasDesdeCarbon * 0.0881
        const emisionesGas = caloriasDesdeGas * 0.0555
        const emisionesTotales = emisionesDiesel + emisionesGasolina + emisionesCarbon + emisionesGas

        const emisionesTransporte = emisionesDiesel + emisionesGasolina
        const emisionesIndustria = emisionesCarbon + emisionesGas

        const columnasEmisiones = ['Categoria', 'Unidades', 'Valor']

        const valoresTablaEmisiones = [
            { 'Categoria' :  'Emisiones Transporte' , 'Unidades' : '', 'Valor' : ''},
            { 'Categoria' :  'Emisiones Diesel Oil' , 'Unidades' : 'kTon CO2', 'Valor' : `${parseFloat(emisionesDiesel).toFixed(2)}`},
            { 'Categoria' :  'Emisiones Gasolina Motor' , 'Unidades' : 'kTon CO2', 'Valor' : `${parseFloat(emisionesGasolina).toFixed(2)}`},
            { 'Categoria' :  'Total Emisiones Transporte' , 'Unidades' : 'kTon CO2', 'Valor' : `${parseFloat(emisionesTransporte).toFixed(2)}`},
            { 'Categoria' :  'Emisiones Industria' , 'Unidades' : '', 'Valor' : ''},
            { 'Categoria' :  'Emisiones Carbon Mineral' , 'Unidades' : 'kTon CO2', 'Valor' : `${parseFloat(emisionesCarbon).toFixed(2)}`},
            { 'Categoria' :  'Emisiones Gas Natural' , 'Unidades' : 'kTon CO2', 'Valor' : `${parseFloat(emisionesGas).toFixed(2)}`},
            { 'Categoria' :  'Total Emisiones Industria' , 'Unidades' : 'kTon CO2', 'Valor' : `${parseFloat(emisionesIndustria).toFixed(2)}`},
            { 'Categoria' :  'Total Emisiones Combustión' , 'Unidades' : 'kTon CO2', 'Valor' : `${parseFloat(emisionesTotales).toFixed(2)}`},
            { 'Categoria' :  'Emisiones Evitadas por H2 Verde' , 'Unidades' : '', 'Valor' : ''},
            { 'Categoria' :  'Emisiones Evitadas' , 'Unidades' : 'Kton H2', 'Valor' : `${parseFloat(emisionesEvitadas/1000).toFixed(2)}`},
        ]
        

        setResultados({
            columnas : columnas,
            filas : valoresTabla
        })

        setResultadosEmisiones({
            columnas : columnasEmisiones,
            filas : valoresTablaEmisiones
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormularioSustitucion({
            ...formularioSustitucion,
            [name] : value
        })

    }


    const galonesATerajoulesOil = (galones, porcentaje = 0.005) => {
        return parseFloat((galones * (porcentaje/100) * 5.67) / (42000)).toFixed(2)
    }

    const galonesATerajoulesGasolina = (galones, porcentaje= 0.005) => {
        return parseFloat((galones * (porcentaje/100) * 5.33) / (32000)).toFixed(2)
    }

    const mcpdATerajoules = (mcpd, porcentaje=0.5) => {
        return parseFloat(((mcpd * (porcentaje/100) * 1.037*1055*365)/1e6)).toFixed(2)
    }

    const loadDropdownData = async () => {
        diesel.push({ '2022' : 254408392, 'Municipios y distritos' : 'Antioquia', 'Subregiones ' : 'Antioquia'} )
        const diesel2022 = diesel
        .map( element => ( {
                year : element['2022'],
                municipio : element['Municipios y distritos'],
                subregion : element['Subregiones '],
        }))
        .filter( element => typeof element.year === 'number'
                            && element.municipio    !== null 
                            && element.municipio !== '...'
                            && element.municipio !== '…'
                            && element.subregion !== '…' 
                            && element.subregion !== null 
                            && element.subregion !== '...' 
                            && element.year      !== null 
                            && element.year      !== '…')
        .map( element => (
            {   
                ...element,
                year : galonesATerajoulesOil(parseFloat(element.year), porcentaje_sustituir)
            })
        )
        .sort((a, b) => a.municipio.localeCompare(b.municipio))

        // Gasolina corriente
        corriente.push({ '2022' : 349388575, 'Municipios y distritos' : 'Antioquia', 'Subregiones ' : 'Antioquia'} )
        const gasolina2022 = corriente
        .map( element => ( {
            year : element['2022'],     
            municipio : element['Municipios y distritos'],
            subregion : element['Subregiones '],
        }))
        .filter( element => typeof element.year === 'number'
                            && element.municipio    !== null 
                            && element.municipio !== '...'
                            && element.municipio !== '…'
                            && element.subregion !== '…' 
                            && element.subregion !== null 
                            && element.subregion !== '...' 
                            && element.year      !== null 
                            && element.year      !== '…')
        .map( element => (
            {   
                ...element,
                year : galonesATerajoulesGasolina(parseFloat(element.year), porcentaje_sustituir)
            })
        )
        .sort((a, b) => a.municipio.localeCompare(b.municipio))

        // Gas natural
        console.log(gasMunicipio)
        const gasNatural = gasMunicipio
        .map( element => ( {
            year : element['2019'],
            municipio : element['Municipio']
        }))
        .filter( element => typeof element.year  === 'number'
                            && element.year      !== null
                            && element.municipio !== null
        )
        .map( element => ({
                ...element,
               year : mcpdATerajoules(parseFloat(element.year), porcentaje_sustituir)
            }))
        .sort((a, b) => a.municipio.localeCompare(b.municipio))


        setDropdownDataDiesel(diesel2022)
        setDropdownDataGasolina(gasolina2022)
        setDropdownGasNatural(gasNatural)
    }

    const selectData = async () => {
        try{
            const datosSnapshot = await getDocs(collection(db, "registros_eolica"))
            const formatoLista = datosSnapshot.docs.map( element => {
                const data = {
                  id : element.id,
                  ... element.data()
                }
                return data
            })
            const columnas = [ 'municipio', 'hidrogenoReal', 'fechaGuardado']    
            setRegistrosTablaEolica({
                columnas : columnas,
                filas : formatoLista
            })
            console.log(formatoLista)
            console.log("Realizando consulta Eolica....")
        }
        catch(e){
            alert('Error en el servidor obteniendo los registros de eólica')
            console.log('err: ' + e)
        }

        try {
            const datosSnapshot = await getDocs(collection(db, "registros_solar"))
            const formatoLista = await datosSnapshot.docs.map( element => {
                const data = {
                  id : element.id,
                  ... element.data()
                }
                return data
            })
            const columnas = [ 'nombreProyecto', 'municipio', 'hidrogenoReal', 'fechaGuardado', 'emisionesEvitadas']    
            setRegistrosTablaSolar({
                columnas : columnas,
                filas : formatoLista
            })
            console.log(formatoLista)
            console.log("Realizando consulta solar....")
        }
        catch(e){
            alert('Error en el servidor obteniendo los registros de solar')
            console.log('err: ' + e)
        }
    }

    const handleSaveResults = async () => {
        if (!selectedRecord) {
          alert('Seleccione un registro antes de guardar los resultados');
          return;
        }

        const balanceData = {};
        resultados.filas.forEach(row => {
          balanceData[row.Categoria] = {
            Unidades: row.Unidades,
            Valor: row.Valor
          };
        });

        const emissionData = {};
        resultadosEmisiones.filas.forEach(row => {
          emissionData[row.Categoria] = {
            Unidades: row.Unidades,
            Valor: row.Valor
          };
        });

        try {
          const docRef = doc(db, selectedRecord.collection, selectedRecord.id);
          await updateDoc(docRef, {
            balance: balanceData,
            emissions: emissionData,
            calculoCompleto : true
          });
          alert('Results saved successfully!');
        } catch (error) {
          console.error('Error saving results:', error);
          alert('Error saving results. Please try again.');
        }
      };

      const handleRecordSelection = (record, collection) => {
        setSelectedRecord({ ...record, collection });
      };

  return (
    <>
    <div className='w-5/6 mx-auto p-7'>
        <Link to='/antioquia' className='top-16 m-5 text-sm p-1 text-white bg-blue-500 rounded-md z[9999]'>Volver</Link>
        <h2 className='mt-5 font-bold text-lg'>Producción Hidrógeno Verde</h2>
        <h3 className='font-bold'>A. Seleccione el caso previamente simulado</h3>
        <hr className='mt-5'/>
        <Desplegable tituloDesplegable={"Escenarios de simulación"}>
            <Tabla  datos={registrosTablaSolar.filas} 
                columnasTabla={registrosTablaSolar.columnas} 
                filterField={"municipio"} 
                titulo={"Hidrogeno verde desde energía solar"}
                boton={true}
                setValorSeleccionadoH2 = { setValorSeleccionadoSolar}
                setProjectoSeleccionado = {setProjectoSeleccionadoSolar}
                setEmisionesEvitadas = {setEmisionesEvitadasSolar}
                onSelectRecord={(record) => handleRecordSelection(record, "registros_solar")}
            />

            <Tabla  datos={registrosTablaEolica.filas}
                columnasTabla={registrosTablaEolica.columnas} 
                filterField={"municipio"} 
                titulo={"Hidrogeno verde desde energía eólica"}
                boton={true}
                setValorSeleccionadoH2 = { setValorSeleccionadoEolica}
                setProjectoSeleccionado = {setProjectoSeleccionadoEolica}
                setEmisionesEvitadas = {setEmisionesEvitadasEolica}
                onSelectRecord={(record) => handleRecordSelection(record, "registros_eolica")}
            />
            {
                projectoSeleccionadoSolar && (
                    <p className='mt-5'>Proyecto seleccionado energía solar: {projectoSeleccionadoSolar}</p>
                )
            }
            {
                projectoSeleccionadoEolica && (
                    <p className='mt-5'>Proyecto seleccionado energía eólica: {projectoSeleccionadoEolica}</p>
                )
            }
            <p className='mt-5'>Total H2 generado: {valorSeleccionadoH2} Ton/año</p>
        </Desplegable>
        <div className='w-full my-auto'>
            <h2 className='font-bold text-lg'>Consumo combustibles</h2>
            <hr className='mt-5'/>
            <form onSubmit={handleSubmit}>
                <h3 className='font-bold'>A. Sector transporte (sustitucion D.O y G.M)</h3>
                <div className='flex items-center mt-4'>
                    <div className='flex justify-between mr-5'>
                        <label className="text-sm my-auto mr-4" htmlFor="diesel_oil">
                                <i>Valor del consumo Diesel oil (Tjoules)</i>
                        </label>
                        <input
                            className="block w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            type="number"
                            value={formularioSustitucion.diesel_oil}
                            id={"diesel_oil"}
                            name={"diesel_oil"}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex justify-between'>
                        <label className="text-sm my-auto mx-4" htmlFor="diesel_oil">
                            <i>Porcentaje a sustituir</i>
                        </label>
                        <input
                            className="block w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            type="number"
                            value={formularioSustitucion.porcentaje_diesel_oil}
                            id={"porcentaje_diesel_oil"}
                            name={"porcentaje_diesel_oil"}
                            onChange={handleChange}
                        />
                    </div>
                    <Dropdown 
                        setFormularioSustitucion={setFormularioSustitucion} 
                        data={dropdownDataDiesel}
                        campo={"diesel_oil"} 
                    />
                </div>
                
                <div className='flex items-center mt-4'>
                    <div className='flex justify-between'>
                        <label className="text-sm my-auto mr-4" htmlFor="gasolina_motor">
                                <i>Valor de consumo de Gasolina motor (Tjoules)</i>
                            </label>
                        <input
                            className="block w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            type="number"
                            value={formularioSustitucion.gasolina_motor}
                            id={"gasolina_motor"}
                            name={"gasolina_motor"}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex justify-between'>
                        <label className="text-sm my-auto mx-2" htmlFor="diesel_oil">
                            <i>Porcentaje a sustituir</i>
                        </label>
                        <input
                            className="block w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            type="number"
                            value={formularioSustitucion.porcentaje_gasolina_motor}
                            id={"porcentaje_gasolina_motor"}
                            name={"porcentaje_gasolina_motor"}
                            onChange={handleChange}
                        />
                    </div>
                    <Dropdown 
                        setFormularioSustitucion={setFormularioSustitucion} 
                        campo={"gasolina_motor"}
                        data={dropdownDataGasolina} />
                </div>
                <h3 className='font-bold mt-10'>B. Sector industrial (sustitucion Carbon Mineral y Gas Natural)</h3>
                <div className='flex items-center mt-4'>
                    <label className="text-sm my-auto mr-4" htmlFor="carbon_mineral">
                        <i>Consumo Carbon mineral (Tjoules)</i>
                        </label>
                    <input
                        className="mt-1 block w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        type="number"
                        value={formularioSustitucion.carbon_mineral}
                        id={"carbon_mineral"}
                        name={"carbon_mineral"}
                        onChange={handleChange}
                    />
                    <div className='flex justify-between'>
                        <label className="text-sm my-auto mx-4" htmlFor="diesel_oil">
                            <i>Porcentaje a sustituir</i>
                        </label>
                        <input
                            className="block w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            type="number"
                            value={formularioSustitucion.porcentaje_carbon_mineral}
                            id={"porcentaje_carbon_mineral"}
                            name={"porcentaje_carbon_mineral"}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='flex items-center mt-4'>
                    <div className='flex justify-between mr-5'>
                    <label className="text-sm my-auto mr-4" htmlFor="gas_natural">
                        <i>Consumo Gas natural (Tjoules)</i>
                    </label>
                    
                    <input
                        className="block w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        type="number"
                        value={formularioSustitucion.gas_natural}
                        id={"gas_natural"}
                        name={"gas_natural"}
                        onChange={handleChange}
                    />
                    </div>
                    <div className='flex justify-between'>
                        <label className="text-sm my-auto mx-4" htmlFor="diesel_oil">
                            <i>Porcentaje a sustituir</i>
                        </label>
                        <input
                            className="block w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            type="number"
                            value={formularioSustitucion.porcentaje_gas_natural}
                            id={"porcentaje_gas_natural"}
                            name={"porcentaje_gas_natural"}
                            onChange={handleChange}
                        />
                    </div>
                    <Dropdown 
                        setFormularioSustitucion={setFormularioSustitucion} 
                        data={dropdownGasNatural}
                        campo={"gas_natural"}
                    />
                </div>
                <button type="submit" className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
                    Calcular
                </button>
            </form>
            <hr className='mt-5'/>
        </div>
        <div className='w-4/6 mx-auto'>
            {
                resultados.filas.length > 0 && (
                    <Tabla datos={resultados.filas} 
                           columnasTabla={resultados.columnas} 
                           titulo={"Balance"} 
                           filterField={'Categoria'}
                           boton={false}
                           pagination={false}

                    />
                )
            }
            {
                resultadosEmisiones.filas.length > 0 && (
                    <Tabla datos={resultadosEmisiones.filas} 
                           columnasTabla={resultadosEmisiones.columnas} 
                           titulo={"Emisiones"} 
                           filterField={'Categoria'}
                           boton={false}
                           pagination={false}
                    />
                )
            }
            {resultados.filas.length > 0 && resultadosEmisiones.filas.length > 0 && (
                <button
                  onClick={handleSaveResults}
                  className="mt-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Guardar Resultados
                </button>
              )}
        </div>
    </div>
    </>
  )
}
