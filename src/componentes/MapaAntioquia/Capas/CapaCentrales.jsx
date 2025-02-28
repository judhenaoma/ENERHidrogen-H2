import React from 'react'
import { GeoJSON } from 'react-leaflet'
import centrales from '../../../capas/Antioquia/Centrales_Antioquia.json'

function  CapaCentrales() {
  return (
    <GeoJSON 
        data={centrales}
        attribution='ModerGIS <a target="_blank" href="https://modergis.web.app/acerca">Link</a>'
        pointToLayer={(feature, latlng) => {
            return L.circleMarker(latlng, {
                radius: 7, 
                fillColor: 'brown',
                fillOpacity: 1, 
                color: 'black',
                weight: 1 
            });
        }}
                    
        onEachFeature={(feature, layer) => {
            if (feature.properties) {
            const popupContent = `
                <small><i>Centrales</i></small><br/>
                <strong>${feature.properties.NOMBRE}</strong><br/>
                <i>${feature.properties.TIPO}</i><br/>
            `;
            layer.bindPopup(popupContent);
            }
        }}
        
    /> 
  )
}

export { CapaCentrales }
