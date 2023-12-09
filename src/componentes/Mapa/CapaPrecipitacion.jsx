import React from 'react'
import { GeoJSON } from 'react-leaflet'
import precipitacion from '../../capas/Precipitacion.json'


function mapearEstilos(feature) {
  switch (feature.properties.gridcode) {
    case 1:
          return { color: '#b3cde0', weight : 0.5, opacity : 1, fillOpacity:0.8 };
      case 2:
          return { color: '#6497b1', weight : 0.5, opacity : 1, fillOpacity:0.8};
      case 3:
          return { color: '#005b96', weight : 0.5, opacity : 1, fillOpacity:0.8};
      case 4:
          return { color: '#03396c', weight : 0.5, opacity : 1, fillOpacity:0.8};
      case 5:
          return { color: '#011f4b', weight : 0.5, opacity : 1, fillOpacity:0.8};
      case 6:
          return { color: '#070047', weight : 0.5, opacity : 1, fillOpacity:0.8 };
    default:
          return { color: '#ff2200', weight : 0.5, opacity : 1, fillOpacity:0.8};
  }
}

const mapeoEtiquetas = {
  1 : "menor a 1700 mm/año",
  2 : "1700 a 2500 mm/año",
  3 : "2500 a 3500 mm/año",
  4 : "3500 a 5000 mm/año",
  5 : "5000 a 6500 mm/año",
  6 : "mayor a 6500 mm/año",

}

function  CapaPrecipitacion() {
  return (
    <GeoJSON 
        data={precipitacion} 
        style={mapearEstilos}
                    
        onEachFeature={(feature, layer) => {
            if (feature.properties) {
            const popupContent = `
                <small><i>Régimen precipitación</i></small><br/>
                <i>${mapeoEtiquetas[feature.properties.gridcode]}</i><br/>
            `;
            layer.bindPopup(popupContent);
            }
        }}
        
    /> 
  )
}

export { CapaPrecipitacion }
