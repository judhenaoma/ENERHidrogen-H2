import React from 'react'
import { GeoJSON } from 'react-leaflet'
import carbon from '../../../capas/Antioquia/Capa_Carbon_V2_.json'


const formatearNumero = (texto) => {
  const numero = Number(texto).toFixed(2)
  if(numero !== 'NaN') return numero
  return texto
}

function  CapaCarbon() {
  return (
    <GeoJSON 
        data={carbon}
        attribution='ModerGIS <a target="_blank" href="https://modergis.web.app/acerca">Link</a>'
        style={{
            color: 'black',
            weight: 2,
            opacity: 1,
            fillOpacity : 0.8,
            fillColor: 'yellow'
        }}
                    
        onEachFeature={(feature, layer) => {
            if (feature.properties) {
            const popupContent = `
                <small><i>Unidades carboníferas</i></small><br/>
                <strong>${feature.properties.NOMBRE1}</strong><br/>
                <strong>Área en km2 : </strong> <i>${formatearNumero(feature.properties.Area)}</i> <br/>
                <strong>Perímetro en km : </strong> <i>${formatearNumero(feature.properties.Perimetro)}</i> <br/>
            `;
            layer.bindPopup(popupContent);
            }
        }}
        
    /> 
  )
}

export { CapaCarbon }
