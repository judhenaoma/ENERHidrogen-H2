import React from 'react'
import { GeoJSON } from 'react-leaflet'
import indigenas from '../../capas/Restriccion_Total_Antioquia_Detalle.json'

function  CapaRestriccionTotal() {



  function mapearEstilos(feature) {
    switch (feature.properties["Tipo_Rest"]) {
        case 'Permitido':
            return { fillColor: '#006100', color: 'transparent', weight : 0, opacity : 1, fillOpacity:0.8 };
        case 'Restrictivo':
            return { fillColor: '#ff2200', color: 'transparent', weight : 0, opacity : 1, fillOpacity:0.8};

        default:
            return { fillColor: '#ff2600', weight : 0, opacity : 1, fillOpacity:0.8};
    }
  }

  return (
    <GeoJSON 
        data={indigenas} 
      style={mapearEstilos}
        
                    
        onEachFeature={(feature, layer) => {
            if (feature.properties) {
            const popupContent = `
                <small><i>Restricción Legal</i></small><br/>
                <strong>${feature.properties["Tipo_Rest"]}</strong><br/>
            `;
            layer.bindPopup(popupContent);
            }
        }}
    /> 
  )
}

export { CapaRestriccionTotal }
