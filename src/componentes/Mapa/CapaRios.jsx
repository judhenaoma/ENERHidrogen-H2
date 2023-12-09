import React from 'react'
import { GeoJSON } from 'react-leaflet'
import rios from './../../capas/Rios.json'

function  CapaRios() {
  return (
    <GeoJSON 
        data={rios} 
        style={{
            color: '#008cff',
            weight: 3,
            opacity: 1
        }}
                    
        onEachFeature={(feature, layer) => {
            if (feature.properties) {
            const popupContent = `
                <small><i>Rios principales</i></small><br/>
                <strong>${feature.properties?.NOMBRE_GEO ? feature.properties.NOMBRE_GEO : ''}</strong><br/>
            `;
            layer.bindPopup(popupContent);
            }
        }}
        
    /> 
  )
}

export { CapaRios }
