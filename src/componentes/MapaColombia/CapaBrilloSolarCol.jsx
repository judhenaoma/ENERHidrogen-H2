import React from 'react'
import { GeoJSON } from 'react-leaflet'
import brilloSolar from '../../capas/Colombia/Brillo_Col.json'
import { CajaLeyenda } from '../Ui/CajaLeyenda'
import { LeyendaMapa } from '../Ui/LeyendaMapa'
import { generarGradiente } from '../../jsUtils/opc'



function mapearEstilos(feature) {
    switch (feature.properties.gridcode) {
      case 1:
            return { fillColor: '#006100', color : 'transparent', weight : 0, opacity : 1, fillOpacity:0.8 };
        case 2:
            return { fillColor: '#3c8000', color : 'transparent', weight : 0, opacity : 1, fillOpacity:0.8};
        case 3:
            return { fillColor: '#6ba100', color : 'transparent', weight : 0, opacity : 1, fillOpacity:0.8};
        case 4:
            return { fillColor: '#a4c400', color : 'transparent', weight : 0, opacity : 1, fillOpacity:0.8};
        case 5:
            return { fillColor: '#dfeb00', color : 'transparent', weight : 0, opacity : 1, fillOpacity:0.8};
        case 6:
          return { fillColor: '#ffea00', color : 'transparent', weight : 0, opacity : 1, fillOpacity:0.8};

        case 7:
        return { fillColor: '#ffbb00', color : 'transparent', weight : 0, opacity : 1, fillOpacity:0.8};

        case 8:
        return { fillColor: '#ff9100', color : 'transparent', weight : 0, opacity : 1, fillOpacity:0.8};

        case 9:
        return { fillColor: '#ff6200', color : 'transparent', weight : 0, opacity : 1, fillOpacity:0.8};

        case 10:
        return { fillColor: '#ff2200', color : 'transparent', weight : 0, opacity : 1, fillOpacity:0.8};
        
      default:
            return { fillColor: '#ff2200', color : 'transparent', weight : 0, opacity : 1, fillOpacity:0.8};
    }
  }


const labels = {
  1	 : [ 1.055491 ,	3.920525],
  2	 : [ 3.920525 ,	4.444617],
  3	 : [ 4.444617 ,	4.828951],
  4	 : [ 4.828951 ,	5.178345],
  5	 : [ 5.178345 ,	5.737376],
  6	 : [ 5.737376 ,	6.471104],
  7	 : [ 6.471104 ,	7.134954],
  8	 : [ 7.134954 ,	7.9735  ],
  9	 : [ 7.9735 ,	  8.812047],
  10 : [	8.812047,	9.999988]
}

const minValue = labels[1][0];
const maximaClase = Math.max(...Object.keys(labels))
const maxValue = labels[maximaClase][1];

const construirEtiqueta = (lista) => {
  const etiqueta = `${lista[0].toFixed(2)} - ${lista[1].toFixed(2)} horas `
  return etiqueta
}


function CapaBrilloSolarCol () {
  return (
    <>
    <GeoJSON data={brilloSolar} 
    style={mapearEstilos}
    onEachFeature={(feature, layer) => {
        if (feature.properties) {
        const popupContent = `
            <small><i>Brillo solar</i></small><br/>
            <i>${construirEtiqueta(labels[feature.properties.gridcode])}</i><br/>
        `;
        layer.bindPopup(popupContent);
        }
    }}
    /> 
    
    <CajaLeyenda>
      <LeyendaMapa 
        colors = {generarGradiente(10)}
        minValue={minValue}
        maxValue={maxValue}
        unidades={'horas por día'}
      />
    </CajaLeyenda>
    </>
  )
}

export { CapaBrilloSolarCol }