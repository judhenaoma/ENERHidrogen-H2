import React from 'react'
import { GeoJSON } from 'react-leaflet'
import radiacionSolar from '../../../capas/Antioquia/Radiacion_Solar_Cor.json'



function mapearEstilos(feature) {
    switch (feature.properties.gridcode) {
      case 1:
            return { color: '#38a800', weight : 0.5, opacity : 1, fillOpacity:0.8 };
        case 2:
            return { color: '#8bd100', weight : 0.5, opacity : 1, fillOpacity:0.8};
        case 3:
            return { color: '#ffff00', weight : 0.5, opacity : 1, fillOpacity:0.8};
        case 4:
            return { color: '#ffff00', weight : 0.5, opacity : 1, fillOpacity:0.8};
        case 5:
            return { color: '#ff9900', weight : 0.5, opacity : 1, fillOpacity:0.8};
      default:
            return { color: '#ff2200', weight : 0.5, opacity : 1, fillOpacity:0.8};
    }
  }

  const mapeoEtiquetas = {
    1 : "menor a 4.2 KwH/m2",
    2 : "4.2 a 4.7 KwH/m2",
    3 : "4.7 a 5.1 KwH/m2",
    4 : "5.1 a 5.6 KwH/m2",
    5 : "mayor a 5.6 KwH/m2",
}

function CapaRadiacionSolar () {
  return (
    <GeoJSON data={radiacionSolar}
    attribution='ModerGIS <a target="_blank" href="https://modergis.web.app/acerca">Link</a>'
    style={mapearEstilos}
    onEachFeature={(feature, layer) => {
        if (feature.properties) {
        const popupContent = `
            <small><i>Radiación Solar</i></small><br/>
            <i>${mapeoEtiquetas[feature.properties.gridcode]}</i><br/>
        `;
        layer.bindPopup(popupContent);
        }
    }}
    /> 
  )
}

export { CapaRadiacionSolar }