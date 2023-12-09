import React from 'react'
import { GeoJSON } from 'react-leaflet'
import cuerposDeAgua from './../../capas/Quebradas.json'

function  CapaCuerposDeAgua() {
  return (
    <GeoJSON 
        data={cuerposDeAgua} 
        style={{
            color: '#00ffff',
            weight: 3,
            opacity: 1
        }}
                    
        onEachFeature={(feature, layer) => {
            if (feature.properties) {
            const popupContent = `
                <small><i>Quebradas y cauces</i></small><br/>
                <strong>${feature.properties?.NOMBRE_GEO ? feature.properties.NOMBRE_GEO : ''}</strong><br/>
            `;
            layer.bindPopup(popupContent);
            }
        }}
        
    /> 
  )
}

export { CapaCuerposDeAgua }
