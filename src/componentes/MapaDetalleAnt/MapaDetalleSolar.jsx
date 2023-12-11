import React from 'react'
import capaAntioquia from '../../capas/Antioquia_wgs.json'
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet'

const centroAntioquia = [6.983327833476973, -75.28958388150659]

export const MapaDetalleSolar = ( {datosPunto} ) => {

    const municipio=  datosPunto?.municipio
    const demandaEnergia=  datosPunto.demandaEnergia
    const radiacion=  datosPunto.radiacion
    const potencia=  datosPunto.potencia
    const generacionAnual=  datosPunto.generacionAnual
    const numeroPaneles=  datosPunto.numeroPaneles
    const areaRequerida=  datosPunto?.areaRequerida
    const coordenadasPunto = datosPunto?.coordenadas ? datosPunto.coordenadas : centroAntioquia

  return (
    
    <MapContainer center={coordenadasPunto} zoom={12}>
        <TileLayer
            url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            zoomControl={false}
        />

        <GeoJSON
            data={capaAntioquia}
            style={{
                color: 'red',
                weight: 2,
                opacity: 0.6,
                fillColor: 'transparent',

            }}
        />
        <Marker position={coordenadasPunto}>
            <Popup>
                <p className='whitespace-nowrap'><b>Demanda energía:</b> {demandaEnergia}</p>
                <p className='whitespace-nowrap'><b>Municipio:</b> {municipio}</p>
                <p className='whitespace-nowrap'><b>Radiación solar</b> {radiacion}</p>
                <p className='whitespace-nowrap'><b>Potencia</b> {potencia}</p>
                <p className='whitespace-nowrap'><b>Generación anual energía: </b> {generacionAnual}</p>
                <p className='whitespace-nowrap'><b>Número paneles: </b> {numeroPaneles}</p>
                <p className='whitespace-nowrap'><b>Área requerida: </b> {areaRequerida}</p>
            </Popup>
        </Marker>    
    </MapContainer>
  )
}
