import React from 'react'
import { GeoJSON } from 'react-leaflet'
import subregionesAnt from '../../../capas/Antioquia/Subregiones_Antioquia_Stats.json'



function mapearEstilos(feature) {
    switch (feature.properties.ZONE_CODE) {
      case 1:
            return { color:'transparent', fillColor: '#FF5733', weight : 0.5, opacity : 1, fillOpacity:0.6 };
        case 2:
            return { color:'transparent', fillColor: '#8C4FFF', weight : 0.5, opacity : 1, fillOpacity:0.6};
        case 3:
            return { color:'transparent', fillColor: '#33FFB8', weight : 0.5, opacity : 1, fillOpacity:0.6};
        case 4:
            return { color:'transparent', fillColor: '#FFD700', weight : 0.5, opacity : 1, fillOpacity:0.6};
        case 5:
            return { color:'transparent', fillColor: '#4FB8FF', weight : 0.5, opacity : 1, fillOpacity:0.6};
        case 6:
          return { color:'transparent', fillColor: '#199793', weight : 0.5, opacity : 1, fillOpacity:0.6};
        case 7:
          return { color:'transparent', fillColor: '#80FF33', weight : 0.5, opacity : 1, fillOpacity:0.6};
        case 8:
          return { color:'transparent', fillColor: '#475bfa', weight : 0.5, opacity : 1, fillOpacity:0.6};
        case 9:
          return { color:'transparent', fillColor: '#FFAA33', weight : 0.5, opacity : 1, fillOpacity:0.6};
      default:
            return { color:'black', fillColor: '#ff2200', weight : 0.5, opacity : 1, fillOpacity:0.8};
    }

    // return { color:'#1c9be3', fillColor: 'transparent', weight : 3, opacity : 1, fillOpacity:0.6};
    // return { color:'white', fillColor: 'transparent', weight : 3, opacity : 0.5, fillOpacity:0.6};

  }

  const redondearCifras = (valor) => {

    if(valor){
      return valor.toFixed(2)
    }

    return "-"


  }

 

function CapaSubregionesAnt () {
  return (
    <GeoJSON data={subregionesAnt}
    attribution='AMVA' 
    style={mapearEstilos}
    onEachFeature={(feature, layer) => {
        const popupContent = `
            <small><i>Subregiones Antioquia</i></small><br/>
            <i>Subregión: <b>${feature.properties["SUBREGION"]}</b></i><br/>
            <div class="mt-4">
            <table class="border border-gray-300 divide-y divide-gray-300 mx-auto">
              <caption class="text-xs mb-2">Radiación Horizontal Global anual (kwh/m2)</caption>
              <thead>
                <tr class="bg-gray-100">
                  <th class="border border-gray-300 px-4 py-2">Min</th>
                  <th class="border border-gray-300 px-4 py-2">Max</th>
                  <th class="border border-gray-300 px-4 py-2">Rango</th>
                  <th class="border border-gray-300 px-4 py-2">Media</th>
                  <th class="border border-gray-300 px-4 py-2">Desv. std.</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border border-gray-300 px-4 py-2">${redondearCifras(feature.properties["MIN"])}</td>
                  <td class="border border-gray-300 px-4 py-2">${redondearCifras(feature.properties["MAX"])}</td>
                  <td class="border border-gray-300 px-4 py-2">${redondearCifras(feature.properties["RANGE"])}</td>
                  <td class="border border-gray-300 px-4 py-2">${redondearCifras(feature.properties["MEAN"])}</td>
                  <td class="border border-gray-300 px-4 py-2">${redondearCifras(feature.properties["STD"])}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="mt-4">
            <table class="border border-gray-300 divide-y divide-gray-300 mx-auto">
              <caption class="text-xs mb-2">Velocidad de viento a 100m (m/s)</caption>
              <thead>
                <tr class="bg-gray-100">
                  <th class="border border-gray-300 px-4 py-2">Min</th>
                  <th class="border border-gray-300 px-4 py-2">Max</th>
                  <th class="border border-gray-300 px-4 py-2">Rango</th>
                  <th class="border border-gray-300 px-4 py-2">Media</th>
                  <th class="border border-gray-300 px-4 py-2">Desv. std.</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border border-gray-300 px-4 py-2">${redondearCifras(feature.properties["MIN_1"])}</td>
                  <td class="border border-gray-300 px-4 py-2">${redondearCifras(feature.properties["MAX_1"])}</td>
                  <td class="border border-gray-300 px-4 py-2">${redondearCifras(feature.properties["RANGE_1"])}</td>
                  <td class="border border-gray-300 px-4 py-2">${redondearCifras(feature.properties["MEAN_1"])}</td>
                  <td class="border border-gray-300 px-4 py-2">${redondearCifras(feature.properties["STD_1"])}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        `;

        if (feature.properties) {
          layer.bindPopup(popupContent);
        }
          
    }}
    /> 
  )
}

export { CapaSubregionesAnt }