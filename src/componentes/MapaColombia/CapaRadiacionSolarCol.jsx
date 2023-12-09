import React from 'react'
import { GeoJSON } from 'react-leaflet'
import radiacionSolar from '../../capas/Colombia/Radiacion_Col.json'
import { generarGradiente } from '../../jsUtils/opc';
import { CajaLeyenda } from '../Ui/CajaLeyenda';
import { LeyendaMapa } from '../Ui/LeyendaMapa';



function mapearEstilos(feature) {
    switch (feature.properties.gridcode) {
        case 1:
            return { fillColor: '#006100', color: 'transparent', weight : 0, opacity : 1, fillOpacity:0.8 };
        case 2:
            return { fillColor: '#559100', color: 'transparent', weight : 0, opacity : 1, fillOpacity:0.8};
        case 3:
            return { fillColor: '#a4c400', color: 'transparent', weight : 0, opacity : 1, fillOpacity:0.8};
        case 4:
            return { fillColor: '#ffff00', color: 'transparent', weight : 0, opacity : 1, fillOpacity:0.8};
        case 5:
            return { fillColor: '#ffbb00', color: 'transparent', weight : 0, opacity : 1, fillOpacity:0.8};
        case 6:
          return { fillColor: '#ff7700', color: 'transparent', weight : 0, opacity : 1, fillOpacity:0.8};
        case 7:
          return { fillColor: '#ff2600', color: 'transparent', weight : 0, opacity : 1, fillOpacity:0.8};
        default:
            return { fillColor: '#ff2600', weight : 0, opacity : 1, fillOpacity:0.8};
    }
  }


const construirEtiqueta = (lista) => {

  const etiqueta = `${lista[0].toFixed(2)} - ${lista[1].toFixed(2)} kwh/m2 `
  return etiqueta

}

const labels = {
  1 :	[1.386701,	4.138422],
  2 :	[4.138422,	4.749916],
  3 :	[4.749916,	5.536122],
  4 :	[5.536122,	6.584396],
  5 :	[6.584396,	7.676349],
  6 :	[7.676349,	8.986692],
  7 :	[8.986692,	12.568297]
}

const minValue = labels[1][0];
const maximaClase = Math.max(...Object.keys(labels))
const maxValue = labels[maximaClase][1];


function CapaRadiacionSolarCol () {
  return (
    <>
    <GeoJSON data={radiacionSolar} 
    style={mapearEstilos}
    onEachFeature={(feature, layer) => {
        if (feature.properties) {
        const popupContent = `
            <small><i>Radiación Solar</i></small><br/>
            <i>${construirEtiqueta(labels[feature.properties.gridcode])}</i><br/>
        `;
        layer.bindPopup(popupContent);
        }
    }}
    />

    <CajaLeyenda>
      <LeyendaMapa 
        colors = {generarGradiente(7)}
        minValue={minValue}
        maxValue={maxValue}
        unidades={'kwh/m2 por día'}
      />
    </CajaLeyenda>
    </> 
  )
}

export { CapaRadiacionSolarCol }