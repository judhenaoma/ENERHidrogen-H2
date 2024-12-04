import React from 'react'
import { GeoJSON } from 'react-leaflet'
import radiacionSolar from './../../capas/Velocidad_Vientos.json'



function mapearEstilos(feature) {
    switch (feature.properties.gridcode) {
      case 1:
            return { color: 'white', weight : 0.5, opacity : 1, fillOpacity:0.8 };
        case 2:
            return { color: '#dbedff', weight : 0.5, opacity : 1, fillOpacity:0.8};
        case 3:
            return { color: '#accbff', weight : 0.5, opacity : 1, fillOpacity:0.8};
        case 4:
            return { color: '#93acff', weight : 0.5, opacity : 1, fillOpacity:0.8};
        case 5:
            return { color: '#8993ff', weight : 0.5, opacity : 1, fillOpacity:0.8};
      default:
            return { color: '#ff2200', weight : 0.5, opacity : 1, fillOpacity:0.8};
    }
  }

  const mapeoEtiquetas = {
    1 : "menor a 1.6 m/s",
    2 : "1.6 a 1.8 m/s",
    3 : "1.8 a 2.0 m/s",
    4 : "2 a 2.2 m/s",
    5 : "mayor a 2.2 m/s",
}

function CapaVelocidadVientos () {
  return (
    <GeoJSON data={radiacionSolar}
    attribution='Quijano et al. 2012 - <a target="_blank" href="https://www.sciencedirect.com/science/article/abs/pii/S1364032112003346?via%3Dihub">Link</a>'
    style={mapearEstilos}
    onEachFeature={(feature, layer) => {
        if (feature.properties) {
        const popupContent = `
            <small><i>Velocidad vientos</i></small><br/>
            <i>${mapeoEtiquetas[feature.properties.gridcode]}</i><br/>
        `;
        layer.bindPopup(popupContent);
        }
    }}
    /> 
  )
}

// export { CapaVelocidadVientos }