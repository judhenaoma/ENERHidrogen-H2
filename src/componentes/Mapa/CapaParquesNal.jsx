import React from 'react'
import { GeoJSON } from 'react-leaflet'
import parques from '../../capas/Parques_Nal_Antioquia.json'

function  CapaParquesNal() {
  return (
    <GeoJSON 
        data={parques} 
        style={{
          color: 'black',
          weight: 2,
          opacity: 1,
          fillOpacity : 0.8,
          fillColor: 'purple'
      }}
                    
        onEachFeature={(feature, layer) => {
            if (feature.properties) {
            const popupContent = `
                <small><i>Parques Nacionales</i></small><br/>
                <strong>${feature.properties.Nombre}</strong><br/>
                <i>${feature.properties["Categoría"]}</i><br/>
                <i>${feature.properties["No_Res_Vi"]}</i>
            `;
            layer.bindPopup(popupContent);
            }
        }}
        
    /> 
  )
}

export { CapaParquesNal }
