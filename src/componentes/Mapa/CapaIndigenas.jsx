import React from 'react'
import { GeoJSON } from 'react-leaflet'
import indigenas from '../../capas/Indigenas_Antioquia.json'

function  CapaIndigenas() {
  return (
    <GeoJSON 
        data={indigenas} 
        style={{
            color: 'black',
            weight: 2,
            opacity: 1,
            fillOpacity : 0.8,
            fillColor: 'blue'
        }}

        
                    
        onEachFeature={(feature, layer) => {
            if (feature.properties) {
            const popupContent = `
                <small><i>Resguardos Indígenas</i></small><br/>
                <strong>${feature.properties.NOMBRE}</strong><br/>
                <i>${feature.properties.NUMERO_PLA}</i>
            `;
            layer.bindPopup(popupContent);
            }
        }}
        
    /> 
  )
}

export { CapaIndigenas }
