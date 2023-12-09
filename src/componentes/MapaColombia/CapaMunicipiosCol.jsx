import React from 'react'
import { GeoJSON } from 'react-leaflet'
import municipios from '../../../src/capas/Colombia/Municipios_Col.json'

function  CapaMunicipiosCol() {
  return (
    <GeoJSON 
        data={municipios} 
        style={{
            color: 'orange',
            weight: 2,
            opacity: 0.4,
            fillColor: 'transparent',
        }}
                    
        onEachFeature={(feature, layer) => {
            if (feature.properties) {
            const popupContent = `
                <small><i>Municipio</i></small><br/>
                <strong>${feature.properties.MPIO_CNMBR}</strong><br/>
                <i>${feature.properties.DEPTO}</i><br/>
            `;
            layer.bindPopup(popupContent);
            }
        }}
        
    /> 
  )
}

export { CapaMunicipiosCol }
