import React from 'react'
import { GeoJSON } from 'react-leaflet'
import brilloSolar from '../../../capas/Antioquia/Brillo_Solar_Cor.json'


// function mapearEstilos(feature) {
//     switch (feature.properties.HORAS) {
//       case 1800:
//             return { color: '#38a800', weight : 0.5, opacity : 1, fillOpacity:0.8 };
//         case 1400:
//             return { color: '#8bd100', weight : 0.5, opacity : 1, fillOpacity:0.8};
//         case 2200:
//             return { color: '#ffff00', weight : 0.5, opacity : 1, fillOpacity:0.8};
//         case 9999:
//             return { color: '#ffff00', weight : 0.5, opacity : 1, fillOpacity:0.8};
//         case 2600:
//             return { color: '#ff9900', weight : 0.5, opacity : 1, fillOpacity:0.8};
//       default:
//             return { color: '#ff2200', weight : 0.5, opacity : 1, fillOpacity:0.8};
//     }
//   }


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
    1 : "3.24 a 4.7 horas",
    2 : "4.7 a 5.2 horas",
    3 : "5.2 a 5.8 horas",
    4 : "5.8 a 6.5 horas",
    5 : "6.7 a 7.05 horas",
}

function CapaBrilloSolar () {
  return (
    <GeoJSON data={brilloSolar} 
    attribution='ModerGIS <a target="_blank" href="https://modergis.web.app/acerca">Link</a>'
    style={mapearEstilos}
    onEachFeature={(feature, layer) => {
        if (feature.properties) {
        const popupContent = `
            <small><i>Brillo solar</i></small><br/>
            <i>${mapeoEtiquetas[feature.properties.gridcode]}</i><br/>
        `;
        layer.bindPopup(popupContent);
        }
    }}
    /> 
  )
}

export { CapaBrilloSolar }