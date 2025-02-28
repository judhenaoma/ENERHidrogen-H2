import React from 'react'
import { GeoJSON } from 'react-leaflet'
import negros from '../../../capas/Antioquia/Negros_Antioquia.json'

function  CapaNegritudes() {


  
  return (
    <GeoJSON 
        data={negros}
        attribution='Colombia en mapas - <a target="_blank" href="https://www.colombiaenmapas.gov.co/">Colombia en mapas</a>' 
        style={{
            color: 'black',
            weight: 2,
            opacity: 1,
            fillOpacity : 0.8,
            fillColor: 'yellow'
        }}
                    
        onEachFeature={(feature, layer) => {
            if (feature.properties) {
            const popupContent = `
                <small><i>Comunidades negras</i></small><br/>
                <strong>${feature.properties.NOMBRE}</strong><br/>
                <i>${feature.properties.TIPO_ACTO_} - ${feature.properties.NUMERO_ACT}</i>
            `;
            layer.bindPopup(popupContent);
            }
        }}
        
    /> 
  )
}

export { CapaNegritudes }
