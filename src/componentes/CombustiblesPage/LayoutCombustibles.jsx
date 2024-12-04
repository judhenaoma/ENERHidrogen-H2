import React, { useState } from 'react'
import { Tabs } from '../Ui/Tabs'
import { TablaCombustibles } from './TablaCombustibles.jsx'
import { TablaGasSector } from './TablaGasSector.jsx'
import { TablaGasMercado } from './TablaGasMercado.jsx'
import { TablaGasMunicipio } from './TablaGasMunicipio.jsx'
import diesel from '../../data/diesel.json'
import extra from '../../data/extra.json'
import corriente from '../../data/corriente.json'
import sector from '../../data/consumo_sector.json'
import mercado from '../../data/consumo_mercado.json'
import comsumoMunicipio from '../../data/consumo_mpio.json'
import { MapaCombustibles } from './MapaCombustibles.jsx'
import { MenulzquierdaCombustibles } from './MenulzquierdaCombustibles.jsx'
import { Link } from 'react-router-dom'


export const LayoutCombustibles = ({tileSeleccionado, manejarTiles}) => {

    const tabsCombustibles = [
        { name: 'Mapa combustibles', current: true, id :'mapa', href : '#'},
        { name: 'Diesel', current: false, id :'diesel', href : '#'},
        { name : 'Gasolina Extra',  current: false, id :'extra' , href : '#'},
        { name: 'Gasolina Corriente', current: false, id :'corriente', href : '#'},
        { name: 'Gas Natural', current: false, id :'gas', href : '#'},
        
    ]

    const [combustibleTabs, setCombustibleTabs] = useState(tabsCombustibles)

    const tabActual = combustibleTabs.filter((tab) => tab.current === true)

  return (

    <> 
         {
            tabActual[0].id === 'mapa' ? 
            <MenulzquierdaCombustibles 
                tileSeleccionado={tileSeleccionado}
                manejarTiles = {manejarTiles} 
            />
             : 
            null
         }
        <div className='w-2/6 mx-auto mt-3'>
            <Tabs 
                tabs={combustibleTabs} 
                setTabs={setCombustibleTabs}
                backButton={'/antioquia'}
            />
        </div>  
        <Link to='/antioquia' className='absolute left-2 top-16 m-5 text-sm p-1 text-white bg-blue-500 rounded-md z[9999]'>Volver</Link>
        <div className={`${tabActual[0].id === 'mapa' ? 'block' : 'hidden'}`}>
            <MapaCombustibles tileSeleccionado={tileSeleccionado}/>
        </div>
        <div className={`${tabActual[0].id === 'diesel' ? 'block' : 'hidden'}`}>
            <TablaCombustibles
                 datos={diesel}
                 titulo={"Demanda de Diesel en galones/año"}
            />
        </div>
        <div className={`${tabActual[0].id === 'extra' ? 'block' : 'hidden'}`}>
            <TablaCombustibles
                 datos={extra}
                 titulo={"Demanda de extra en galones/año"}
            />
        </div>
        <div className={`${tabActual[0].id === 'corriente' ? 'block' : 'hidden'}`}>
            <TablaCombustibles
                 datos={corriente}
                 titulo={"Demanda de gasolina corriente en galones/año"}
            />
        </div>

        <div className={`${tabActual[0].id === 'gas' ? 'block' : 'hidden'}`}>
            <TablaGasSector
                 datos={sector}
                 titulo={"Consumo de Gas Natural por sector en Mpcd"}
            />
            <TablaGasMercado
                 datos={mercado}
                 titulo={"Consumo de Gas Natural por mercado en Mpcd"}
            />
            <TablaGasMunicipio
                 datos={comsumoMunicipio}
                 titulo={"Consumo de Gas Natural Sector residencial en Mpcd"}
            />
        </div>
    </>
    
  )
}
