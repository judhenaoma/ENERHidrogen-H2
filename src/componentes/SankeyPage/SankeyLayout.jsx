import React, { useState } from 'react'
import { Tabs } from '../Ui/Tabs.jsx'
import { Desplegable } from './Desplegable.jsx'
import { datosSankey } from '../../../data/sankey-colombia.js'
import { datosSankeyAntioquia2 } from '../../../data/sankey-antioquia.js'
import { GraficoTorta } from './GraficoTorta.jsx'
import { FormularioSankeyColombia } from './FormularioSankeyColombia.jsx'
import { FormularioMatrizEnergetica2030 } from './FormularioMatrizEnergetica2030.jsx'
import { FormularioMatrizEnergetica2022 } from './FormularioMatrizEnergetica2022.jsx'
import { AntioquiaSankey } from './AntioquiaSankey.jsx'
import { Link } from 'react-router-dom'

export const SankeyLayout = () => {

    const tabsCombustibles = [
        { name: 'Antioquia', current: true, id :'antioquiaSimul', href : '#'},
        { name: 'Matriz Energética Antioquia', current: false, id :'matrizEnergeticaAnt', href : '#'},
        { name : 'Matriz de Consumo', current: false, id : 'consumo', href : '#'}
    ]

    const datosCapacidad2022Antioquia = [
        {x : 5067 , y: 92.3, label: "Hidroeléctrica (5067 MW)", nombre : "Hidroeléctrica", id : "hidroelectrica"},
        {x : 411 , y: 7.5, label: "Térmica (411)", nombre : "Térmica", id : "termica"},
        {x : 0 , y: 0, label: "Eólica (0 MW)", nombre : "Eólica", id : "Eólica"},
        {x : 10 , y: 0.2, label: "Solar Fotovoltáica (10 MW)", nombre : "Solar Fotovoltáica", id : "foto"},
        {x : 9, y: 0.2, label: "Cogeneración (9 MW)", nombre : "Cogeneración", id : "cogen"},
    ]


    const datosCapacidad2030Antioquia = [
        {x : 5667,  y: 84.7, label: `Hidroeléctrica (5667 MW)`, nombre : "Hidroeléctrica", id : "hidroelectrica"},
        {x : 411,  y: 6.1, label: "Térmica (411 MW)", nombre : "Térmica", id : "termica"},
        {x : 0,  y: 0, label: "Eólica (0 MW)", nombre : "Eólica", id : "Eólica"},
        {x : 100,  y: 1.5, label: "Solar Fotovoltáica (100 MW)", nombre : "Solar Fotovoltáica", id : "foto"},
        {x : 9,  y: 0.1, label: "Cogeneración (9 MW)", nombre : "Cogeneración", id : "cogen"},
        {x : 500,  y: 7.5, label: "Solar Hidrógeno verde (500 MW)", nombre : "Solar Hidrógeno Verde", id : "verde"},

    ]

    const datosConsumoFosiles = [
        { x: 134609.57, y: 29.1, label: "Petróleo (134,609.57 TJ)", nombre: "Petróleo", id: "petroleo" },
        { x: 246625.85, y: 53.4, label: "Gas Natural (246,625.85 TJ)", nombre: "Gas Natural", id: "gas_natural" },
        { x: 20031.137, y: 4.3, label: "Carbón Mineral (20,031.14 TJ)", nombre: "Carbón Mineral", id: "carbon_mineral" },
        { x: 199720, y: 4.3, label: "Hidroelectricidad (199720 TJ)", nombre: "Hidroelectricidad", id: "hidroelectricidad" }
    ];

    const totalX = datosConsumoFosiles.reduce((sum, item) => sum + item.x, 0);
    datosConsumoFosiles.forEach(item => {
        item.y = parseFloat((item.x / totalX) * 100).toFixed(1);
    })

    const datosConsumoAntioquia = [
        { x: 305821, y: 47.7, label: "Electricidad (305821 TJ)", nombre: "Hidroelectricidad", id: "hidroelectricidad" },
        { x: 1030628, y: 85.2, label: "Combustibles Fósiles (1030628.2 TJ)", nombre: "Combustibles Fósiles", id: "combustibles_fosiles" },
        { x: 356649.724, y: 73.1, label: "Residuos vegetales (356649.7 TJ)", nombre: "Residuos Vegetales", id: "residuos_vegetales" }
    ];

    const totalXConsumo = datosConsumoAntioquia.reduce((sum, item) => sum + item.x, 0);
    datosConsumoAntioquia.forEach(item => {
        item.y = parseFloat((item.x / totalXConsumo) * 100).toFixed(1);
    })
    

    const [combustibleTabs, setCombustibleTabs] = useState(tabsCombustibles)
    const [datosTortaAnt22, setDatosTortaAnt22] = useState(datosCapacidad2022Antioquia)
    const [datosTortaAnt30, setDatosTortaAnt30] = useState(datosCapacidad2030Antioquia)
    const [datosSankeyAntioquia, setDatosSankeyAntioquia] = useState(datosSankeyAntioquia2)
    const [datosMatrizConsumoFosiles, setDatosMatrizConsumoFosiles] = useState(datosConsumoFosiles)
    const [datosMatrizConsumoAntioquia, setDatosMatrizConsumoAntioquia] = useState(datosConsumoAntioquia)

    const tabActual = combustibleTabs.filter((tab) => tab.current === true)
    console.log(tabActual)
  return (
    <>
        <div className='w-2/6 mx-auto mt-3'>
            <Tabs 
                tabs={combustibleTabs} 
                setTabs={setCombustibleTabs}
                backButton={'/antioquia'}
            />
        </div>    
        <Link to='/antioquia' className='absolute left-2 top-16 m-5 text-sm p-1 text-white bg-blue-500 rounded-md z[9999]'>Volver</Link>
        {/* Antioquia */}
        <div className={`${tabActual[0].id === 'antioquiaSimul' ? 'block' : 'hidden'}`}>
        <Desplegable tituloDesplegable = {"Editar flujo energético Antioquia"}>
                <>
                    <h4>* Nota: Unidades se encuentran en TeraJoules</h4>
                    <h5>Flujo energético para Antioquia del año 2022</h5>
                    <div className='my-10'></div>
                    <FormularioSankeyColombia 
                      datosSankeyColombia={datosSankeyAntioquia} 
                      setDatosSanketColombia = {setDatosSankeyAntioquia}
                      
                    />
                </>
            </Desplegable>
            <AntioquiaSankey datosSankeyColombia = {datosSankeyAntioquia}/>
        </div>

        <div className={`${tabActual[0].id === 'matrizEnergeticaAnt' ? 'flex-col' : 'hidden'} gap-20`}>
            <div className='mb-10'>

                <Desplegable tituloDesplegable={"Editar matriz energética - 2022"}>
                    <>
                        <FormularioMatrizEnergetica2022
                            datosTorta={datosTortaAnt22}
                            setDatosTorta = {setDatosTortaAnt22}
                            totalQuemado={5497}
                        />
                    </>
                </Desplegable>

                <GraficoTorta datos = {datosTortaAnt22} 
                              titulo={"Matriz energética de generación año 2022 (5497 MW)"} 
                              fuente = {"Fuente UPME - ACOLGEN - XM-SER"}
                />
            </div>
            <div className='mt-10'>
                <Desplegable tituloDesplegable={"Editar matriz energética - proyección 2030"}>
                    <>
                        <FormularioMatrizEnergetica2030 
                            datosTorta={datosTortaAnt30}
                            setDatosTorta = {setDatosTortaAnt30}
                            totalQuemado={6687}
                        />
                    </>
                </Desplegable>

                <GraficoTorta datos = {datosTortaAnt30} 
                              titulo = {"Matriz energética de generación año 2030 (6687 MW)" }
                              fuente = {"Fuente UPME - ModerGIS - ModerHidrogen H2"}
                />
            </div>
        </div>

        <div className={`${tabActual[0].id === 'consumo' ? 'flex-col' : 'hidden'} gap-20`}>
            <div className='mb-10'>

            <Desplegable tituloDesplegable={"Editar matriz consumo de energías primarias en Antioquia"}>
                    <>
                        <FormularioMatrizEnergetica2030 
                            datosTorta={datosMatrizConsumoFosiles}
                            setDatosTorta = {setDatosMatrizConsumoFosiles}
                            totalQuemado={totalX}
                        />
                    </>
                </Desplegable>
            <GraficoTorta datos = {datosConsumoFosiles}
                              titulo={`Consumo energías primarias en Antioquia (${totalX.toFixed(1)} TeraJoules)`} 
                              fuente = {"Fuente UPME - ModerGIS - ModerHidrogen H2"}
                />

                <Desplegable tituloDesplegable={"Editar matriz de consumo de energías secundarias en Antioquia"}>
                    <>
                        <FormularioMatrizEnergetica2030 
                            datosTorta={datosMatrizConsumoAntioquia}
                            setDatosTorta = {setDatosMatrizConsumoAntioquia}
                            totalQuemado={totalXConsumo}
                        />
                    </>
                </Desplegable>
            <GraficoTorta datos = {datosConsumoAntioquia}
                                titulo={`Consumo energías secundarias en Antioquia (${totalXConsumo.toFixed(1)} TeraJoules)`}
                                fuente = {"Fuente UPME - ModerGIS - ModerHidrogen H2"}
                    />
            </div>
        </div>
    </>
  )
}
