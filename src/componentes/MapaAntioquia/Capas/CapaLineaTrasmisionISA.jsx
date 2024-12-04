import React from 'react'
import { GeoJSON } from 'react-leaflet'
import lineaTrasmisionISA from '../../../capas/Antioquia/Lineas_Trasmision_ISA.json'

function  CapaLineaTrasmisionISA() {
  return (
    <GeoJSON 
        data={lineaTrasmisionISA}
        attribution='ModerGIS <a target="_blank" href="https://modergis.web.app/acerca">Link</a>'
        style={{
            color: 'pink',
            weight: 3,
            opacity: 1
        }}
                    
        onEachFeature={(feature, layer) => {
            if (feature.properties) {
            const popupContent = `
                <small><i>Linea de transmisión ISA</i></small><br/>
                <strong>${feature.properties.LINEA}</strong><br/>
                <i>${feature.properties.TENSION}</i><br/>
            `;
            layer.bindPopup(popupContent);
            }
        }}
        
    /> 
  )
}

export { CapaLineaTrasmisionISA }
