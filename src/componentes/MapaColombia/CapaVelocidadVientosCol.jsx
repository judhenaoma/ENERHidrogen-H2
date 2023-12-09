import React from 'react'
import { GeoJSON } from 'react-leaflet'
import radiacionSolar from '../../capas/Colombia/Velocidad_Viento_Col_V2.json'
import { CajaLeyenda } from '../Ui/CajaLeyenda';
import { LeyendaMapa } from '../Ui/LeyendaMapa';
import { generarGradiente } from '../../jsUtils/opc';



function mapearEstilos(feature) {
    switch (feature.properties.gridcode) {
      case 1:
            return { color: 'transparent', weight : 0, opacity : 1, fillOpacity:1, fillColor: '#ffff80' };
        case 2:
            return { color: 'transparent', weight : 0, opacity : 1, fillOpacity:1, fillColor: '#bef75c'};
        case 3:
            return { color: 'transparent', weight : 0, opacity : 1, fillOpacity:1, fillColor: '#81ed39'};
        case 4:
            return { color: 'transparent', weight : 0, opacity : 1, fillOpacity:1, fillColor: '#38e009'};
        case 5:
            return { color: 'transparent', weight : 0, opacity : 1, fillOpacity:1, fillColor: '#3ec74e'};
        case 6:
          return { color: 'transparent', weight : 0, opacity : 1, fillOpacity:1, fillColor: '#37ab7e'};
        case 7:
          return { color: 'transparent', weight : 0, opacity : 1, fillOpacity:1, fillColor: '#1a93ab'};
        case 8:
          return { color: 'transparent', weight : 0, opacity : 1, fillOpacity:1, fillColor: '#22639c'};
        case 9:
          return { color: 'transparent', weight : 0, opacity : 1, fillOpacity:1, fillColor: '#1d388a'};
        case 10:
          return { color: 'transparent', weight : 0, opacity : 1, fillOpacity:1, fillColor: '#0c1078'};
      default:
            return { color: 'transparent', weight : 0, opacity : 1, fillOpacity:1};
    }
  }

  const mapeoEtiquetas = {
    1 : "1 m/s",
    2 : "2 m/s",
    3 : "3 m/s",
    4 : "4 m/s",
    5 : "5 m/s",
    6 : "6 m/s",
    7 : "7 m/s",
    8 : "8 m/s",
    9 : "9 m/s",
    10 : "10 m/s",
}

const listaColores = ['#ffff80', '#bef75c', '#81ed39', '#38e009', '#3ec74e', '#37ab7e', '#1a93ab', '#22639c', '#1d388a', '#0c1078']

function CapaVelocidadVientosCol () {
  return (
    <>
    <GeoJSON data={radiacionSolar} 
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

<CajaLeyenda>
      <LeyendaMapa 
        colors = {listaColores}
        minValue={1}
        maxValue={10}
        unidades={'m/s'}
      />
    </CajaLeyenda>

    </>
  )
}

export { CapaVelocidadVientosCol }


