import React, { useState, useRef } from 'react'
import { obtenerMunicipio } from '../../../scripts/obtenerMunicipio.js'


export const FormularioSolar = ({datosSolar, guardarResultados, setSolarTabs, setResultadosH2, nombreProyecto}) => {
    
    const [camposFormSolar, setCamposFormSolar ] = useState({
        tipo_demanda : 'diaria',
        demanda_energia : '',
        area_parque_solar : '',
        unidad_area_parque_solar : 'm2',
        potencia_panel_en_w : ''
    })


    const manejarDiligenciamiento = (e) => {
        setCamposFormSolar( (prev) => {
            return {...prev, [e.target.name] : e.target.value}
        })
    }

    const manejarFormSolar = (e) => {
        e.preventDefault()
        const { valorMedio } = datosSolar
        const { 
                demanda_energia : demandaEnergia, 
                tipo_demanda : tipoDemanda, 
                area_parque_solar : areaParqueSolar,
                unidad_area_parque_solar : unidadAreaParqueSolar, 
              } = camposFormSolar

        const valorMedioRadiacion = parseFloat(valorMedio) // Rk
        const FCpv = parseFloat((0.6 * valorMedioRadiacion ) / 8760)
        const factorCapacidad = FCpv.toFixed(2)

        // Demanda de energía de energia
        let demandaCalcEnergia;  
        if(tipoDemanda === 'diaria')
        {
            demandaCalcEnergia = parseFloat(demandaEnergia) * 365
        }
        else if(tipoDemanda === 'anual')
        {
            demandaCalcEnergia = parseFloat(demandaEnergia)
        }
        
        const demandaAnualEnergia = demandaCalcEnergia
        const Ppv = demandaAnualEnergia / (parseFloat(FCpv) * 8760)
        const PpvKw = parseFloat((Ppv/1000).toFixed(2)) // Potencia en MW
        const Gkwh = PpvKw * parseFloat(0.3) * 8760
        const generacionEnergia = parseFloat(Gkwh.toFixed(2)) 
        // Número de paneles y área requerida
        const AREA_PANEL = 3
        const POTENCIA_PANEL = camposFormSolar.potencia_panel_en_w
        const numeroPaneles = Math.ceil((PpvKw * 1000) / POTENCIA_PANEL)
        // const areaRequerida = parseFloat(numeroPaneles * 2 * 1.7).toFixed(2)
        let numeroDePanelesPorArea;
        if(unidadAreaParqueSolar === 'ha'){
            numeroDePanelesPorArea = Math.ceil(areaParqueSolar * 10000 / AREA_PANEL)
        }else if (unidadAreaParqueSolar === 'm2'){
            numeroDePanelesPorArea = Math.ceil(areaParqueSolar / AREA_PANEL)
        }
        const potenciaFotovoltaica = parseFloat(((parseFloat(POTENCIA_PANEL * numeroDePanelesPorArea / 1000))/1000).toFixed(2))
        const emisionesEvitadas = parseFloat((generacionEnergia * 25 * 0.662).toFixed(2))
        const fechaActual = new Date().toLocaleString()
        const municipio = obtenerMunicipio(datosSolar.lat ,datosSolar.lng)
        const nombreProyecto_ = nombreProyecto === '' ?`Solar_${municipio}_${fechaActual}` : nombreProyecto
        const resultados = {
            nombreProyecto : nombreProyecto_,
            fechaGuardado : fechaActual,
            coordenadas : [datosSolar.lat , datosSolar.lng],
            municipio : municipio,
            demandaEnergia : parseFloat(demandaCalcEnergia),
            radiacion : parseFloat(valorMedioRadiacion),
            potencia : parseFloat(PpvKw),
            generacionAnual :  parseFloat(generacionEnergia),
            areaIngresada : parseFloat(areaParqueSolar),
            numeroPanelesPorPotencia : parseFloat(numeroPaneles),
            numeroPanelesPorArea : parseFloat(numeroDePanelesPorArea),
            potenciaFotovoltaica : parseFloat(potenciaFotovoltaica),
            emisionesEvitadas : parseFloat(emisionesEvitadas)
        }
        

        const resultadoArray = [
            {
                nombre : 'Factor de capacidad',
                resultado : factorCapacidad,
                id : 'factorCapacidad',
                unidad : 'Adim.'
            },
            {
                nombre : 'Potencia fotovoltaica',
                id : 'potenciaFotovoltaica',
                resultado : PpvKw,
                unidad : 'Mw'
            },
            {
                nombre : 'Generación de energía',
                id : 'generacionEnergia',
                resultado : generacionEnergia,
                unidad : 'Mwh/año'
            },
            {
                nombre : 'Número de paneles por potencia',
                id : 'numeroPanelesPotencia',
                resultado : numeroPaneles,
                unidad : 'Páneles'
            },
            {
                nombre : 'Número de paneles por área',
                id : 'numeroPanelesArea',
                resultado : numeroDePanelesPorArea,
                unidad : 'Páneles'
            },
            {
                nombre : 'Potencia por área disponible',
                id : 'potenciaFotovoltaicaTotal',
                resultado : potenciaFotovoltaica,
                unidad : 'MW'
            },
            {
                nombre : 'Emisiones evitadas CO2',
                id : 'emisionesEvitadas',
                resultado : emisionesEvitadas,
                unidad : 'kTon CO2'
            }
        ]

        const resultadoFinal = {
            datosDb : resultados,
            datosArray : resultadoArray
        }

        guardarResultados(resultadoFinal)
        setResultadosH2(null)
        setSolarTabs((prevTabs) => {
            const tabsActualizadas = prevTabs.map( (tab) => {
                if(tab.id !== 'agua'){
                    return {...tab, dissabled : false}
                }
                else {
                    return {...tab, dissabled : true}
                }
            })
            return tabsActualizadas
        })
    }

  return (

    <form onSubmit={manejarFormSolar} className='bg-white rounded-md border border-neutral-200 p-2'>

        {/* Demanda de energía */}
        <div className='flex justify-start items-center w-100'>                       
            <div className="flex justify-start items-center w-7/12">
                <label htmlFor="demanda_energia" 
                       className="block text-sm font-normal text-gray-700"
                >Demanda de energía:
                </label>
                <input 
                    id="demanda_energia" 
                    name="demanda_energia" 
                    type="number" 
                    className="ml-5 p-1 mt-1 h-7 w-28 block rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={camposFormSolar.demanda_energia}
                    onChange = {manejarDiligenciamiento}
                />
            </div>
                <select className='h-10 w-28 text-xs border-none outline-none rounded-md' 
                        name="tipo_demanda" 
                        id="tipo_demanda"
                        onChange={manejarDiligenciamiento}
                        value={camposFormSolar.tipo_demanda}
                >
                    <option value="diaria">(KWh/día)</option>
                    <option value="anual">(KWh/año)</option>
                </select>
        </div>

        {/* Area parque solar */}
        <div className='flex justify-start items-center w-100'>                       
            <div className="flex justify-start items-center w-7/12">
                <label htmlFor="area_parque_solar" 
                       className="block text-sm font-normal text-gray-700"
                >Área del parque solar:
                </label>
                <input 
                    id="area_parque_solar" 
                    name="area_parque_solar" 
                    type="number" 
                    className="ml-5 p-1 mt-1 h-7 w-28 block rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={camposFormSolar.area_parque_solar}
                    onChange = {manejarDiligenciamiento}
                />
            </div>
                <select className='h-10 w-28 text-xs border-none outline-none rounded-md' 
                        name="unidad_area_parque_solar" 
                        id="unidad_area_parque_solar"
                        onChange={manejarDiligenciamiento}
                        value={camposFormSolar.unidad_area_parque_solar}
                >
                    <option value="m2">m2</option>
                    <option value="ha">ha</option>
                </select>
        </div>
        <div className="flex justify-start items-center w-7/12">
            <label htmlFor="area_parque_solar" 
                    className="block text-sm font-normal text-gray-700"
            >Potencia del panel solar (W):
            </label>
            <input 
                id="potencia_panel_en_w" 
                name="potencia_panel_en_w" 
                type="number" 
                className="ml-5 p-1 mt-1 h-7 w-28 block rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={camposFormSolar.potencia_panel_en_w}
                onChange = {manejarDiligenciamiento}
            />
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
