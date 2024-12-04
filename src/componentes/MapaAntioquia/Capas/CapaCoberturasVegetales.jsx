import React from 'react'
import { GeoJSON } from 'react-leaflet'
import coberturas from '../../../capas/Antioquia/Coberturas_Total_Areas_.json'


function mapearEstilos(feature) {
    switch (feature.properties.OBJECTID) {
  
        case 1:
            return { color:'transparent', fillColor: '#343434', weight : 1, opacity : 1, fillOpacity:0.5};
        case 2:
            return { color:'transparent', fillColor: '#b2b2b2', weight : 1, opacity : 1, fillOpacity:0.5};
        case 3:
            return { color:'transparent', fillColor: '#939c6e', weight : 1, opacity : 1, fillOpacity:0.5};
        case 4:
          return { color:'transparent', fillColor: '#96e3b9', weight : 1, opacity : 1, fillOpacity:0.5};
        case 5:
            return { color:'transparent', fillColor: '#cdf57a', weight : 1, opacity : 1, fillOpacity:0.5};
        case 6:
            return { color:'transparent', fillColor: '#74a888', weight : 1, opacity : 1, fillOpacity:0.5};
        case 7:
            return { color:'transparent', fillColor: '#00a884', weight : 1, opacity : 1, fillOpacity:0.5};
        case 9:
            return { color:'transparent', fillColor: '#38a800', weight : 1, opacity : 1, fillOpacity:0.5};
        case 11:
            return { color:'transparent', fillColor: '#ffffbe', weight : 1, opacity : 1, fillOpacity:0.5};
        case 13:
            return { color:'transparent', fillColor: '#cd6699', weight : 1, opacity : 1, fillOpacity:0.5};
        case 15:
            return { color:'transparent', fillColor: '#73dfff', weight : 1, opacity : 1, fillOpacity:0.5};
        case 16:
            return { color:'transparent', fillColor: '#00a9e6', weight : 1, opacity : 1, fillOpacity:0.5};
        case 17:
          return { color:'transparent', fillColor: '#00a9e6', weight : 1, opacity : 1, fillOpacity:0.5};
      default:
            return { color:'black', fillColor: '#ff2200', weight : 0.5, opacity : 1, fillOpacity:0.5};
    }
  }


const formatearNombreCobertura = (nombre) => {
  const completo = nombre.split(" ")
  const nombreCobertura = completo.slice(1, completo.length).join(" ")
  return nombreCobertura
}

const formatearNumero = (texto) => {
  const numero = Number(texto).toFixed(2)
  if(numero !== 'NaN') return numero
  return texto
}
 
function CapaCoberturasVegetales () {
  return (
    <GeoJSON data={coberturas}
    attribution='Colombia en mapas - <a target="_blank" href="https://www.colombiaenmapas.gov.co/">Colombia en mapas</a>'
    style={mapearEstilos}
    onEachFeature={(feature, layer) => {
        const popupContent = `
            <small><i>Coberturas vegetales</i></small><br/>
            <i><b>${formatearNombreCobertura(feature.properties["nivel_2"])}</b></i><br/>
            <strong>Área en km2 : </strong> <i>${formatearNumero(feature.properties.Area)}</i> <br/>
            <strong>Perímetro en km : </strong> <i>${formatearNumero(feature.properties.Perimetro)}</i> <br/>
        `;
        if (feature.properties) {
          layer.bindPopup(popupContent);
        }
          
    }}
    /> 
  )
}

export { CapaCoberturasVegetales }