import React, {useEffect, useState} from 'react'
import { GeoJSON } from 'react-leaflet'
import { generarGradienteV2 } from '../../../utils/utils';
import velocidadViento50 from '../../../capas/Antioquia/WS50_6_Minified.json'

import { CajaLeyendaMapa } from '../CajaLeyendaMapa';
import { LeyendaMapa } from '../LeyendaMapa';



const labels = {

1 :	[0.052652,	1.606115],
2 :	[1.606115,	2.500533],
3 :	[2.500533,	3.442026],
4 :	[3.442026,	4.524742],
5 :	[4.524742,	5.795757],
6 :	[5.795757	,12.103758]

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

function CapaPotencialEolico50 ({manejarBarraDerecha, manejarPuntoSeleccionado}) {

  return (
    <>
        <GeoJSON data={ velocidadViento50 }
        attribution='Global Wind Atlas - <a target="_blank" href="https://globalwindatlas.info/es">Wind Atlas</a>'
        style={ mapearEstilos }
        onEachFeature={(feature, layer) => {
            layer.on({
                click: (e) => {
                    const valorMedio = calcularValorMedio(labels[feature.properties.gridcode])
                    const etiqueta = construirEtiqueta(labels[feature.properties.gridcode])
                    const { lat, lng } = e.latlng;

                    const datosCapa = {
                        titulo : 'Cálculo energía eólica - Velocidad de viento a 50 m',
                        tipo : 'eolica',
                        valorMedio : valorMedio,
                        AlturaVelocidadViento : '50 m',
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

export { CapaPotencialEolico50 }