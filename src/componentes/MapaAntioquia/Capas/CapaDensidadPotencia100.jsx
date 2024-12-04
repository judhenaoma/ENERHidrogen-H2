import React, {useEffect, useState} from 'react'
import { GeoJSON } from 'react-leaflet'
import { generarGradienteV2 } from '../../../utils/utils'
import densidadPotencia100 from '../../../capas/Antioquia/DP100_5_Minified.json'

import { CajaLeyendaMapa } from '../CajaLeyendaMapa';
import { LeyendaMapa } from '../LeyendaMapa';


const labels = {
    1 : [0.026163	, 52.013791],
    2 : [52.013791	, 132.358306],
    3 : [132.358306	, 236.333562],
    4 : [236.333562	, 401.748741],
    5 : [401.748741	, 1209.920044],
}

const minValue = labels[1][0];
const maximaClase = Math.max(...Object.keys(labels)) 
const maxValue = labels[maximaClase][1];

function mapearEstilos(feature) {

    const cantidad = 5;
    const gradiente = generarGradienteV2(5)

    for( let i = 1; i <= cantidad; i++ ){
        if (feature.properties.gridcode === i){
            return { color: gradiente[i - 1], weight : 1, opacity : 1, fillOpacity: 1 };
        }
    }
}

const construirEtiqueta = (lista) => {
    const etiqueta = `${lista[0].toFixed(2)} - ${lista[1].toFixed(2)} W/m2`
    return etiqueta
}



function CapaDensidadPotencia100 () {
  return (
    <>
        <GeoJSON data={ densidadPotencia100 }
        attribution='Global Wind Atlas - <a target="_blank" href="https://globalwindatlas.info/es">Wind Atlas</a>' 
        style={ mapearEstilos }
        onEachFeature={(feature, layer) => {

            const etiqueta = construirEtiqueta(labels[feature.properties.gridcode])

            const popupContent = `
            <div class="w-[180px]">
                <small><i>Densidad de potencia eólica 100 m</i></small><br/>
                <i>${etiqueta}</i><br/>
            </div>   
            `;

            if (feature.properties) {
            layer.bindPopup(popupContent);
            }
        }}
        />

    <CajaLeyendaMapa>
        <LeyendaMapa 
                    colors={generarGradienteV2(5)} 
                    minValue={minValue} 
                    maxValue={maxValue} 
                    unidades={"W/m2"} />
    </CajaLeyendaMapa>

    </> 
  )
}

export { CapaDensidadPotencia100 }