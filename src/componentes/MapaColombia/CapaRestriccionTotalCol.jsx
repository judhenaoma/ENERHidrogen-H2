import React from 'react'
import { GeoJSON } from 'react-leaflet'
import restriccion from '../../capas/Colombia/Restriccion_Total.json'

function  CapaRestriccionTotalCol() {



  function mapearEstilos(feature) {
    switch (feature.properties.gridcode) {
        case 0:
            return { fillColor: '#006100', color: 'transparent', weight : 0, opacity : 1, fillOpacity:0.8 };
        case 1:
            return { fillColor: '#ff2200', color: 'transparent', weight : 0, opacity : 1, fillOpacity:0.8};

        default:
            return { fillColor: '#ff2600', weight : 0, opacity : 1, fillOpacity:0.8};
    }
  }

  const etiquetas = {
    0 : 'Permitido',
    1 : 'Restrictivo'
  }

  return (
    <GeoJSON 
        data={restriccion} 
        style={mapearEstilos}
        
                    
        onEachFeature={(feature, layer) => {
            if (feature.properties) {
            const popupContent = `
                <small><i>Restricción Legal</i></small><br/>
                <strong>${etiquetas[feature.properties.gridcode]}</strong><br/>
            `;
            layer.bindPopup(popupContent);
            }
        }}
    /> 
  )
}

export { CapaRestriccionTotalCol }
