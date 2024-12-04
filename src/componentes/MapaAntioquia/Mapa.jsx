import React, { useState } from 'react'
import { MapContainer, TileLayer, GeoJSON, Pane, Marker } from 'react-leaflet'
import capaAntioquia from '../../capas/Antioquia/Antioquia_wgs.json'
import { CapaCentrosPoblados } from './Capas/CapaCentrosPoblados'
import { CapaMunicipios } from './Capas/CapaMunicipios'
import { CapaLineaTrasmisionISA } from './Capas/CapaLineaTrasmisionISA'
import { CapaLineasTrasmision } from './Capas/CapaLineasTrasmision'
import { CapaSubestacionDistribucion } from './Capas/CapaSubestacionDistribucion'
import { CapaSubestacionTransmision } from './Capas/CapaSubestacionTransmision'
import { CapaCentrales } from './Capas/CapaCentrales'
import { CapaRadiacionSolar } from './Capas/CapaRadiacionSolar'
import { CapaBrilloSolar } from './Capas/CapaBrilloSolar'
import { CapaRios } from './Capas/CapaRios'
import { CapaPrecipitacion } from './Capas/CapaPrecipitacion'
import { CapaParquesNal } from './Capas/CapaParquesNal'
import { CapaParamos } from './Capas/CapaParamos'
import { CapaNegritudes } from './Capas/CapaNegritudes'
import { CapaIndigenas } from './Capas/CapaIndigenas'
import { CapaPotencialVoltaico } from './Capas/CapaPotencialVoltaico'
import { CapaCuerposDeAgua } from './Capas/CapaCuerposDeAgua'
import { CapaCuencas } from './Capas/CapaCuencas'
import { CapaRestriccionTotal } from './Capas/CapaRestriccionTotal'
import { CapaSubregionesAnt } from './Capas/CapaSubregionesAnt'
import { CapaPotencialEolico100 } from './Capas/CapaPotencialEolico100'
import { CapaPotencialEolico50 } from './Capas/CapaPotencialEolico50'
import { CapaDensidadPotencia100 } from './Capas/CapaDensidadPotencia100'
import { CapaDensidadPotencia50 } from './Capas/CapaDensidadPotencia50'
import { CapaEstacionesIDEAM } from './Capas/CapaEstacionesIDEAM'
import { CapaCaudales } from './Capas/CapaCaudales'
import { CapaCoberturasVegetales } from './Capas/CapaCoberturasVegetales'
import { CapaCarbon } from './Capas/CapaCarbon'
import { CapaHidrocarburos } from './Capas/CapaHidrocarburos'
import { iconPin } from '../../utils/icons'


function Mapa ({capas, potenciales, tileSeleccionado, manejarBarraDerecha, mostrarAguaSostenible}) {

    const centroAntioquia = [6.983327833476973, -75.28958388150659]

    const [ puntoSeleccionado, setPuntoSeleccionado ] = useState(null)
  
    const manejarPuntoSeleccionado = (punto) =>{
        setPuntoSeleccionado(punto)
    }

  return (

    <div className='w-full'>
    <MapContainer 
        center={centroAntioquia} 
        zoomControl = {false}
        zoom={7}>
        <TileLayer
            url = {tileSeleccionado}
            zoomControl={false}
        />
            <GeoJSON
                data={capaAntioquia}
                style={{
                    color: 'white',
                    weight: 2,
                    opacity: 0.3,
                    fillColor: 'transparent',

                }}
            />
        {
            capas[0].children[0].activo ? 
            <CapaCentrosPoblados />
            : null
        }
        {
            capas[0].children[1].activo 
            ? <CapaMunicipios />
            : null
        }

{
            capas[0].children[2].activo 
            ? <CapaSubregionesAnt />
            : null
        }


        {
            capas[1].children[0].activo 
            ? <CapaLineasTrasmision />
            : null
        }

        {
            capas[1].children[1].activo
            ? <CapaLineaTrasmisionISA />
            : null
        }

        {
            capas[1].children[2].activo
            ? <CapaSubestacionTransmision />
            : null
        }

        {
            capas[1].children[3].activo
            ? <CapaSubestacionDistribucion />
            : null
        }

        {
            capas[1].children[4].activo
            ? <CapaCentrales />
            : null
        }


        {
            capas[2].children[0].activo
            ? <CapaRadiacionSolar />
            : null
        }

        {
            capas[2].children[1].activo
            ? <CapaBrilloSolar />
            : null
        }

        {
            capas[2].children[2].activo
            ? <CapaDensidadPotencia50 />
            : null
        }
        {
            capas[2].children[3].activo
            ? <CapaDensidadPotencia100 />
            : null
        }

{
            capas[2].children[4].activo
            ? <CapaEstacionesIDEAM />
            : null
        }

{
            capas[2].children[5].activo || mostrarAguaSostenible
            ? <CapaCaudales />
            : null
        }
 
        {
            capas[3].children[0].activo
            ? <CapaRios />
            : null
        }
        {
            capas[3].children[1].activo
            ? <CapaPrecipitacion />
            : null
        }
        {
            capas[3].children[2].activo
            ? <CapaCuencas />
            : null
        }

        {
            capas[3].children[3].activo
            ? <CapaCuerposDeAgua />
            : null
        }
        {
            capas[3].children[4].activo
            ? <CapaCarbon />
            : null
        }

{
            capas[3].children[5].activo
            ? <CapaHidrocarburos />
            : null
        }

{
           capas[3].children[6].activo
            ? <CapaCoberturasVegetales />
            : null
        }

        {
            capas[4].children[0].activo
            ? <CapaParamos />
            : null
        }

        {
            capas[4].children[1].activo
            ? <CapaParquesNal />
            : null
        }

        {
            capas[4].children[2].activo
            ? <CapaIndigenas />
            : null
        }

        {
            capas[4].children[3].activo
            ? <CapaNegritudes />
            : null
        }
        {
            capas[4].children[4].activo
            ? <CapaRestriccionTotal />
            : null
        }

        {
            potenciales[0].children[0].activo
            ? <CapaPotencialVoltaico 
                manejarBarraDerecha={manejarBarraDerecha} 
                manejarPuntoSeleccionado = {manejarPuntoSeleccionado}
            />
            : null
        }

        
        {
            potenciales[0].children[0].activo && 
            puntoSeleccionado && (
                <Marker 
                    position={puntoSeleccionado} 
                    icon={iconPin}

                />
            )
        }

        {
            potenciales[1].children[0].activo && 
            puntoSeleccionado && (
                <Marker position={puntoSeleccionado} 
                    icon={iconPin}
                />
            )
        }

        {
            potenciales[1].children[1].activo && 
            puntoSeleccionado && (
                <Marker 
                    position={puntoSeleccionado} 
                    icon={iconPin}
                />
            )
        }
        {
            potenciales[1].children[0].activo
            ? <CapaPotencialEolico50 
                manejarBarraDerecha = {manejarBarraDerecha} 
                manejarPuntoSeleccionado = {manejarPuntoSeleccionado}
            />
            : null
        }
 
        {
            potenciales[1].children[1].activo
            ? <CapaPotencialEolico100 
                manejarBarraDerecha={manejarBarraDerecha} 
                manejarPuntoSeleccionado = {manejarPuntoSeleccionado}
            />
            : null
        }
      
    </MapContainer>
    </div>
  )
}

export { Mapa }
