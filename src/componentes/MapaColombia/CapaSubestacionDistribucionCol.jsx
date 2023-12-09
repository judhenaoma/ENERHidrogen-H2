import React from 'react'
import { GeoJSON } from 'react-leaflet'
import subestacionDistribucion from '../../capas/Colombia/Sub_Dist_Col.json'

function  CapaSubestacionDistribucionCol() {
  return (
    <GeoJSON 
        data={subestacionDistribucion} 
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

export { CapaSubestacionDistribucionCol }
