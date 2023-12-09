import React from 'react'
import { GeoJSON } from 'react-leaflet'
import centrosPoblados from './../../capas/Centros_Poblados.json'

function  CapaCentrosPoblados() {
  return (
    <GeoJSON    
        data={centrosPoblados}
        pointToLayer={(feature, latlng) => {
            return L.circleMarker(latlng, {
                radius: 7, 
                fillColor: '#3b41ed',
                fillOpacity: 1, 
                color: 'black',
                weight: 1 
            });
        }}

        onEachFeature={(feature, layer) => {
            if (feature.properties) {
            const popupContent = `
                <small><i>Centro poblado</i></small><br/>
                <strong>${feature.properties.NAME}</strong><br/>
                ${feature.properties.TIPO}
            `;
            layer.bindPopup(popupContent);
            }
        }}

    /> 
  )
}

export { CapaCentrosPoblados }
