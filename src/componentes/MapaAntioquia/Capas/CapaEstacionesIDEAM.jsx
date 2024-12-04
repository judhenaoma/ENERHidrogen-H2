import React from 'react'
import { GeoJSON } from 'react-leaflet'
import estacionesIdeam from '../../../capas/Antioquia/Estaciones.json'


const formatearNumero = (texto) => {
    const numero = Number(texto).toFixed(2)
    if(numero !== 'NaN') return numero
    return texto
}


function  CapaEstacionesIDEAM() {
  return (
    <GeoJSON    
        data={estacionesIdeam}
        attribution='IDEAM - <a href="http://dhime.ideam.gov.co/atencionciudadano/">IDEAM</a>'
        pointToLayer={(feature, latlng) => {
            return L.circleMarker(latlng, {
                radius: 7, 
                fillColor: '#FFA500',
                fillOpacity: 1, 
                color: 'black',
                weight: 1 
            });
        }}

        onEachFeature={(feature, layer) => {
            if (feature.properties) {
            const popupContent = `
                <small><i>Estaciones IDEAM</i></small><br/>
                <strong>${feature.properties.CodigoEsta} - ${feature.properties.NombreEsta}</strong><br/>
                <strong>Caudal minimo:</strong> <i>${formatearNumero(feature.properties.Valor_Mini)} (m3/s)</i> <br/>
                <strong>Caudal máximo:</strong> <i>${formatearNumero(feature.properties.Valor_Maxi)} (m3/s)</i> <br/>
                <strong>Caudal medio:</strong> <i>${formatearNumero(feature.properties.Valor_Medi)} (m3/s)</i> <br/>    
            `;
            layer.bindPopup(popupContent);
            }
        }}
    /> 
  )
}

export { CapaEstacionesIDEAM }
