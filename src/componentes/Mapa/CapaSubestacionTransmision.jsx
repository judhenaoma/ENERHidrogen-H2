import React from 'react'
import { GeoJSON } from 'react-leaflet'
import subestacionTransmision from './../../capas/Subestaciones_Trasmision.json'

function  CapaSubestacionTransmision() {
  return (
    <GeoJSON 
        data={subestacionTransmision} 
        pointToLayer={(feature, latlng) => {
            return L.circleMarker(latlng, {
                radius: 7, 
                fillColor: 'purple',
                fillOpacity: 1, 
                color: 'black',
                weight: 1 
            });
        }}
                    
        onEachFeature={(feature, layer) => {
            if (feature.properties) {
            const popupContent = `
                <small><i>Sub-estación de transmisión</i></small><br/>
                <strong>${feature.properties.NOMBRE}</strong><br/>
                <i>${feature.properties.VOLTAJE}</i><br/>
            `;
            layer.bindPopup(popupContent);
            }
        }}
        
    /> 
  )
}

export { CapaSubestacionTransmision }
