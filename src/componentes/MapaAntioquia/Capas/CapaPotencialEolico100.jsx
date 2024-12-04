import React, {useEffect, useState} from 'react'
import { GeoJSON } from 'react-leaflet'
// import { onValue, ref } from "firebase/database"; 
// import { config } from '../../config/dbConfig';
import { generarGradienteV2 } from '../../../utils/utils';
import velocidadViento100 from '../../../capas/Antioquia/WS100_6_Minified.json'

import { CajaLeyendaMapa } from '../CajaLeyendaMapa';
import { LeyendaMapa } from '../LeyendaMapa';


const labels = {

    1 :	[0.213096,	1.796681],
    2 :	[1.796681,	2.588473],
    3 :	[2.588473,	3.380266],
    4 :	[3.380266,	4.172058],
    5 :	[4.172058,	5.130544],
    6 :	[5.130544,	10.881457]

}

const minValue = labels[1][0];
const maximaClase = Math.max(...Object.keys(labels)) 
const maxValue = labels[maximaClase][1];

function mapearEstilos(feature) {

    const cantidad = 6;
    const gradiente = generarGradienteV2(6)

    for( let i = 1; i <= cantidad; i++ ){
        if (feature.properties.gridcode === i){
            return { color: gradiente[i - 1], weight : 1, opacity : 1, fillOpacity: 1 };
        }
    }
}

const construirEtiqueta = (lista) => {
    const etiqueta = `${lista[0].toFixed(2)} - ${lista[1].toFixed(2)} m/s `
    return etiqueta
}

const calcularValorMedio = (lista) => {
    
    const valorMedio = (lista[0] + lista[1]) / 2
    return valorMedio
}



function CapaPotencialEolico100 ({manejarBarraDerecha, manejarPuntoSeleccionado}) {


  return (
    <>
        <GeoJSON data={ velocidadViento100 }
        attribution='Global Wind Atlas - <a target="_blank" href="https://globalwindatlas.info/es">Wind Atlas</a>'
        style={ mapearEstilos }
        onEachFeature={(feature, layer) => {
            layer.on({
                click: (e) => {
                    const valorMedio = calcularValorMedio(labels[feature.properties.gridcode])
                    const etiqueta = construirEtiqueta(labels[feature.properties.gridcode])
                    const { lat, lng } = e.latlng;
                    
                    const datosCapa = {
                        titulo : 'Cálculo energía eólica - Velocidad del viento a 100 m',
                        tipo : 'eolica',
                        valorMedio : valorMedio,
                        AlturaVelocidadViento : '100 m',
                        etiqueta : etiqueta,
                        lat : lat,
                        lng : lng
                    }

                    manejarBarraDerecha(datosCapa)
                    manejarPuntoSeleccionado([lat, lng])
                }
            });
        }}
        />
    <CajaLeyendaMapa>
        <LeyendaMapa 
                    colors={generarGradienteV2(6)} 
                    minValue={minValue} 
                    maxValue={maxValue} 
                    unidades={"m/s"} />
    </CajaLeyendaMapa>

    </> 
  )
}

export { CapaPotencialEolico100 }