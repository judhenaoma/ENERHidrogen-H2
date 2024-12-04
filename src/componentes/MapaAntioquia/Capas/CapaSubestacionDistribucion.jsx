import React from 'react'
import { GeoJSON } from 'react-leaflet'
import subestacionDistribucion from '../../../capas/Antioquia/Subestaciones_Distribucion.json'

function  CapaSubestacionDistribucion() {
  return (
    <GeoJSON 
        data={subestacionDistribucion}
        attribution='ModerGIS <a target="_blank" href="https://modergis.web.app/acerca">Link</a>'
        pointToLayer={(feature, latlng) => {
            return L.circleMarker(latlng, {
                radius: 7, 
                fillColor: 'yellow',
                fillOpacity: 1, 
                color: 'black',
                weight: 1 
            });
        }}
                    
        onEachFeature={(feature, layer) => {
            if (feature.properties) {
            const popupContent = `
                <small><i>Sub-estación de distribución</i></small><br/>
                <strong>${feature.properties.NOMBRE}</strong><br/>
                <i>${feature.properties.TENSION}</i><br/>
            `;
            layer.bindPopup(popupContent);
            }
        }}
        
    /> 
  )
}

export { CapaSubestacionDistribucion }
