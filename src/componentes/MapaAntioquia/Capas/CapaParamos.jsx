import React from 'react'
import { GeoJSON } from 'react-leaflet'
import paramos from '../../../capas/Antioquia/Paramos_Antioquia.json'

function  CapaParamos() {
  return (
    <GeoJSON 
        data={paramos}
        attribution='Colombia en mapas - <a target="_blank" href="https://www.colombiaenmapas.gov.co/">Colombia en mapas</a>'
        style={{
          color: 'black',
          weight: 2,
          opacity: 1,
          fillOpacity : 0.8,
          fillColor: 'orange'
      }}
                    
        onEachFeature={(feature, layer) => {
            if (feature.properties) {
            const popupContent = `
                <small><i>Páramos</i></small><br/>
                <strong>${feature.properties.Nombre}</strong><br/>
                <i>${feature.properties.Acto_Admin}</i><br/>
            `;
            layer.bindPopup(popupContent);
            }
        }}
    /> 
  )
}

export { CapaParamos }
