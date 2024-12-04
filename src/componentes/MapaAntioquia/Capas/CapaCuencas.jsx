import React from 'react'
import { GeoJSON } from 'react-leaflet'
import cuencas from '../../../capas/Antioquia/Cuencas_Antioquia_Unificadas.json'

function  CapaCuencas() {

  function mapearEstilos(feature) {
    switch (feature.properties.FID) {
        case 0:
            return { fillColor: '#50A8EB', color: 'transparent', weight : 0, opacity : 1, fillOpacity:0.8 };
        case 1:
            return { fillColor: '#96D1EE', color: 'transparent', weight : 0, opacity : 1, fillOpacity:0.8};
        case 2:
            return { fillColor: 'blue', color: 'transparent', weight : 0, opacity : 1, fillOpacity:0.8};
            
        default:
            return { fillColor: '#ff2600', weight : 0, opacity : 1, fillOpacity:0.8};
    }
  }

  
  return (
    <GeoJSON 
        data={cuencas}
        attribution='Colombia en mapas - <a target="_blank" href="https://www.colombiaenmapas.gov.co/">Colombia en mapas</a>'
        style={mapearEstilos}
                    
        onEachFeature={(feature, layer) => {
            if (feature.properties) {
            const popupContent = `
                <small><i>Cuenca hidrográfica</i></small><br/>
                <strong>${feature.properties.NOMAH}</strong><br/>
            `;
            layer.bindPopup(popupContent);
            }
        }}
        
    /> 
  )
}

export { CapaCuencas }
