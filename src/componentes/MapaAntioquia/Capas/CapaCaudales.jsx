import React from 'react'
import { GeoJSON } from 'react-leaflet'
import caudales from '../../../capas/Antioquia/Cuencas_Antioquia_Min.json'


const formatearCaudalmedio = (caudal) => {
  if(parseInt(caudal) < 1){
    return "No hay datos"
  }
  return caudal
}


const formatearTitulo = (titulo) => {

  if(titulo.includes("�")){
    return titulo.replace("�", "í")
  }

  return titulo
}


const formatearNumero = (texto) => {
  const numero = Number(texto).toFixed(2)
  if(numero !== 'NaN') return numero
  return texto
}


function  CapaCaudales() {

  return (
    <GeoJSON 
        data={caudales}
        attribution='Datos Abiertos Colomba & IDEAM - <a target="_blank" href="http://dhime.ideam.gov.co/atencionciudadano/">IDEAM</a>'
        style={{
          color: '#00FFFF',
          weight: 3,
          opacity: 0.8,
          fillColor: '#87CEEB',
      }}
             
        onEachFeature={(feature, layer) => {
            if (feature.properties) {
            const popupContent = `
              <small><i>Oferta hídrica subcuencas Antioquia</i></small><br/>
              <strong>Subcuenca ${formatearTitulo(feature.properties.NOMSZH)}</strong><br/>
              <strong>Caudal medio:</strong> <i>${formatearNumero(formatearCaudalmedio(feature.properties.Valor_Medi))} (m3/s)</i> <br/>
              <strong>Oferta disponible:</strong> <i>${formatearNumero(feature.properties.Oferta_Dis)}</i> (Mm³/año)<br/>
              <strong>Demanda total:</strong> <i>${formatearNumero(feature.properties.Demanda)}</i> (Mm³/año)<br/>
              <strong>Balance:</strong> <i>${formatearNumero(feature.properties.Balance)}</i> (Mm³/año)<br/>
              <strong>I. Aridez Deficitario:</strong> <i>${formatearNumero(feature.properties.IA_TRUE)} %</i> <br/>
              <strong>Disponibilidad - I.A:</strong> <i>${formatearNumero(feature.properties.Dispo_IA)} (Mm³/año)</i> <br/>
              <strong>Disponibilidad - ENSO:</strong> <i>${formatearNumero(feature.properties.Dispo_ENSO)} (Mm³/año)</i> <br/>
            `;
            layer.bindPopup(popupContent);
            }
        }}
    /> 
  )
}

export { CapaCaudales }
