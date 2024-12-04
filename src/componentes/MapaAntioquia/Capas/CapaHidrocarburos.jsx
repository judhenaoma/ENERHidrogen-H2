import React from 'react'
import { GeoJSON } from 'react-leaflet'
import hidrocarburos from '../../../capas/Antioquia/Capa_Hidrocarburos_V3.json'


const formatearNumero = (texto) => {
  const numero = Number(texto).toFixed(2)
  if(numero !== 'NaN') return numero
  return texto
}


function  CapaHidrocarburos() {
  return (
    <GeoJSON 
        data={hidrocarburos}
        attribution='ANH <a target="_blank" href="https://www.anh.gov.co/es/hidrocarburos/mapa-de-tierras/">Link</a>'
        style={{
            color: 'black',
            weight: 2,
            opacity: 1,
            fillOpacity : 0.8,
            fillColor: 'orange'
        }}
                    
        onEachFeature={(feature, layer) => {
            if (feature.properties) {
            const popupContent = `
                <small><i>Consesiones hidrocarburos</i></small><br/>
                <strong>${feature.properties.CONTRATO}</strong><br/>
                <strong>Cuenca: </strong> ${feature.properties.CUENCA}<br/>
                <strong>Operador: </strong> ${feature.properties.COMPANIA}<br/>
                <strong>Área en km2 : </strong> <i>${formatearNumero(feature.properties.AREA)}</i> <br/>
                <strong>Perímetro en km : </strong> <i>${formatearNumero(feature.properties.PERIMETER)}</i> <br/>
            `;
            layer.bindPopup(popupContent);
            }
        }}
    /> 
  )
}

export { CapaHidrocarburos }
