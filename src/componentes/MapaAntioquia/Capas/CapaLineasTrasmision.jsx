import React from 'react'
import { GeoJSON } from 'react-leaflet'
import lineaTrasmision from '../../../capas/Antioquia/Lineas_Trasmision.json'

function  CapaLineasTrasmision() {
  return (
    <GeoJSON 
        data={lineaTrasmision}
        attribution='ModerGIS <a target="_blank" href="https://modergis.web.app/acerca">Link</a>'
        style={{
            color: 'orange',
            weight: 3,
            opacity: 1
        }}
                    
        onEachFeature={(feature, layer) => {
            if (feature.properties) {
            const popupContent = `
                <small><i>Linea de transmisión</i></small><br/>
                <strong>${feature.properties.NOM_LLIN}</strong><br/>
                <i>${feature.properties.VOLTAJE}</i><br/>
            `;
            layer.bindPopup(popupContent);
            }
        }}
        
    /> 
  )
}

export { CapaLineasTrasmision }
