import React, {useState} from 'react'
import { obtenerMunicipio } from '../../../scripts/obtenerMunicipio.js'


export function FormularioEolica({datosEolica, guardarResultadosEolica, setTabs, resultadosH2, valorIngresadoEnergiaEolica, nombreProyecto}) {

    const [camposFormEolica, setCamposFormEolica ] = useState({
        diametro_rotor : '',
        area_lote : ''
    })

    const manejarDiligenciamiento = (e) => {
        setCamposFormEolica( (prev) => {
            return {...prev, [e.target.name] : e.target.value}
        })
    }

    const manejarFormEolica = (e) => {
        e.preventDefault()
        const valorMedio = valorIngresadoEnergiaEolica ? valorIngresadoEnergiaEolica : datosEolica.etiqueta
        const {   AlturaVelocidadViento } = datosEolica
        const {  
                diametro_rotor : diametroRotor, 
                area_lote : areaLote,
              } = camposFormEolica

    // Calculo potencia
    const valorVelocidadViento = parseFloat(valorMedio) // Se toma del mapa
    const areaTransversal = (Math.PI * Math.pow(diametroRotor, 2)) / 4 // A
    const COEFICIENTE_MAQUINA = 1
    const FACTOR_PLANTA = 0.45
    const potenciaEolica = parseFloat((0.59 * 0.5 * COEFICIENTE_MAQUINA * 1.23 * areaTransversal * Math.pow(valorVelocidadViento, 3)/1000).toFixed(2))  
    const GeneracionEolica = parseFloat((potenciaEolica * FACTOR_PLANTA * 8760).toFixed(2)) // dividir por  /1000 MWh/año
  
   // Calculo numero aeorogeneradores
    
   let parqueEolico = null
   let potenciaParqueEolico = null
   let generacionParqueEolico = null

    if(areaLote){
      const areaCalculada = 4 * diametroRotor * 6 * diametroRotor 
      parqueEolico = Math.ceil((areaLote * 10000) / areaCalculada)
      // Calculo potencia parque eolico
      potenciaParqueEolico = parseFloat((parqueEolico * potenciaEolica).toFixed(2)) 
      // Calculo generación de energía
      generacionParqueEolico = parseFloat((potenciaParqueEolico * FACTOR_PLANTA * 8760 / 1000).toFixed(2))
    }

        const fechaActual = new Date().toLocaleDateString()
        const municipio = obtenerMunicipio(datosEolica.lat ,datosEolica.lng)
        const nombreProyecto_ = nombreProyecto === '' ?`Solar_${municipio}_${fechaActual}` : nombreProyecto

        const emisionesEvitadas = parseFloat((generacionParqueEolico * 25 * 0.662).toFixed(2))
        const resultados = {
            fechaGuardado : fechaActual,
            coordenadas : [datosEolica.lat, datosEolica.lng],
            municipio : municipio,
            AlturaVelocidadViento : AlturaVelocidadViento,
            velocidadViento : parseFloat(valorMedio),
            diametroRotor : parseFloat(diametroRotor),
            potenciaEolica : parseFloat(potenciaParqueEolico),
            generacionAnualEolica : parseFloat(generacionParqueEolico),
            areaLoteHa : parseFloat(areaLote),
            nombreProyecto : parseFloat(nombreProyecto_),
            emisionesEvitadas : emisionesEvitadas
        }

        const resultadoArray = [
            {
                nombre : 'Potencia Eólica unitaria',
                id : 'potenciaEolica',
                resultado : potenciaEolica,
                unidad : 'kW'
            },
            {
                nombre : 'Generación de energía unitaria',
                id : 'generacionUnitaria',
                resultado : GeneracionEolica,
                unidad : 'MWh/año'
            },
            {
                nombre : 'Número aerogeneradores',
                id: 'parqueEolico',
                resultado : parqueEolico,
                unidad : '-'
            },
            {
                nombre : 'Generación parque eólico',
                id : 'generacionEnergia',
                resultado : generacionParqueEolico,
                unidad : 'MWh/año'
            },
            {
                nombre : 'Potencia parque eólico',
                id : 'potenciaFotovoltaica',
                resultado : potenciaParqueEolico,
                unidad : 'kW'
            },
        ]

        const resultadoFinal = {
            datosDb : resultados,
            datosArray : resultadoArray
        }

        guardarResultadosEolica(resultadoFinal)
        resultadosH2(null)
        setTabs( (prev) => { 

            const tabsActualizados = prev.map( (tab) => {
                if(tab.id !== 'agua'){
                    return {...tab, dissabled : false}
                }else{
                    return {...tab, dissabled : true}
                }
            })

            return tabsActualizados
        })
    }

   

  return (

    <form onSubmit={manejarFormEolica} className='bg-white rounded-md border border-neutral-200 p-2'>
        {/* <hr />
        <label htmlFor="energia_eolica_ingresada">Valor energia eolica</label>
        
        <hr /> */}

        <div className='flex justify-start items-center w-100'>
            <div className="flex justify-start items-center w-10/12">
                    <label htmlFor="diametro_rotor" 
                            className="block text-sm font-normal text-gray-700"
                        >Diámetro del rotor (m):
                    </label>
                    <input 
                            id="diametro_rotor" 
                            name="diametro_rotor" 
                            type="number" 
                            className="ml-5 p-1 mt-1 h-7 w-28 block rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={camposFormEolica.diametro_rotor}
                            onChange = {manejarDiligenciamiento}
                    />
            </div>                                       
        </div>

        <div className="flex justify-start items-center w-100 mt-3 ml-5">

            <div className="flex justify-start items-center w-10/12">

            <label htmlFor="area_lote" className="block text-sm font-normal text-gray-700">
                Área disponible parque eólico (ha):
            </label>
            <input id="area_lote" 
                name="area_lote" 
                type="number" 
                step="any" 
                min="0"  
                className="ml-5 p-1 mt-1 h-7 w-28 block rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={camposFormEolica.area_lote}
                onChange={manejarDiligenciamiento}
            />

            </div>
                       
        </div>

        <button
            type="submit"
            className="mx-auto mt-3 rounded bg-blue-500 px-2 h-6 text-xs text-white shadow-sm outline-2 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
            Calcular
        </button>
    </form>
  )
}
