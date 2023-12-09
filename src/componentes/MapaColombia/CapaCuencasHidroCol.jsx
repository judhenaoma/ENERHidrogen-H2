import React from 'react'
import { GeoJSON } from 'react-leaflet'
import cuencasHidroCol from '../../capas/Colombia/Cuencas_Hidro_Col.json'

function mapearEstilos(feature) {
    switch (feature.properties["AH"]) {
      case 1:
            return { fillColor: '#008080', weight : 1, opacity : 1, fillOpacity:0.8  , color: 'black'};
        case 2:
            return { fillColor: '#4169E1', weight : 1, opacity : 1, fillOpacity:0.8 , color : 'black'};
        case 3:
            return { fillColor: '#DC143C', weight : 1, opacity : 1, fillOpacity:0.8 , color : 'black'};
        case 4:
            return { fillColor: '#708090', weight : 1, opacity : 1, fillOpacity:0.8 , color : 'black'};
        case 5:
            return { fillColor: '#556B2F', weight : 1, opacity : 1, fillOpacity:0.8 , color : 'black'};
      default:
            return { fillColor: '#ff2200', weight : 1, opacity : 1, fillOpacity:0.8 , color : 'black'};
    }
  }


function CapaCuencasHidroCol () {
  return (
    <GeoJSON data={cuencasHidroCol} 
    style={mapearEstilos}
    onEachFeature={(feature, layer) => {
        if (feature.properties) {
        const popupContent = `
            <small><i>Cuencas Hidrográficas</i></small><br/>
            <i>Cuenca ${feature.properties["NOMAH"]}</i><br/>
        `;
        layer.bindPopup(popupContent);
        }
    }}
    /> 
  )
}

export { CapaCuencasHidroCol }