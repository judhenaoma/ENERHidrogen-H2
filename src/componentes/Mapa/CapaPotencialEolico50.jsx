import React, {useEffect, useState} from 'react'
import { GeoJSON } from 'react-leaflet'
import { onValue, ref } from "firebase/database"; 
import { db } from '../../db/dbConfig';
import { generarGradienteV2 } from '../../jsUtils/opc2';
import velocidadViento50 from '../../capas/WS50_6_Minified.json'

import { CajaLeyenda } from '../Ui/CajaLeyenda';
import { LeyendaMapa } from '../Ui/LeyendaMapa';



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

function CapaPotencialEolico50 () {

  return (
    <>
        <GeoJSON data={ velocidadViento50 } 
        style={ mapearEstilos }
        onEachFeature={(feature, layer) => {

            const etiqueta = construirEtiqueta(labels[feature.properties.gridcode])
            const valorMedio = calcularValorMedio(labels[feature.properties.gridcode])

            const popupContent = `
            <div class='mx-auto w-80'>
                <small><i>Velocidad de viento</i></small><br/>
                <i>${etiqueta}</i><br/>
                <hr class='my-3'/>
                <form  onsubmit="window.ejecutarCalculoGeneracionEolica50(event, ${valorMedio})" >
                    <div>
                        <label for="coef_maquina" class="block text-sm font-medium text-gray-700">Coeficiente de máquina (Adim.):</label>
                        <input id="coef_maquina" required name="coef_maquina" type="number" step="any" min="0" max="1" class="p-1 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                    </div>

                    <div class="mt-2">
                        <label for="diametro_rotor" class="block text-sm font-medium text-gray-700">Diametro rotor (m):</label>
                        <input id="diametro_rotor" required name="diametro_rotor" type="number" class="p-1 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                    </div>
                    
                    <div class="mt-2">
                        <label for="factor_planta_eo" class="block text-sm font-medium text-gray-700">Factor de planta (Adim.):</label>
                        <input id="factor_planta_eo" required name="factor_planta_eo" type="number" step="any" min="0" max="1" class="p-1 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                    </div>
                    <div class="mt-2">
                        <label for="area_lote" class="block text-sm font-medium text-gray-700">Área del parque eólico (ha):</label>
                        <input id="area_lote" name="area_lote" type="number" step="any" min="0"  class="p-1 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                    </div>

                    <button
                        type="submit"
                        class="mt-3 rounded bg-indigo-600 px-2 h-6 text-xs text-white shadow-sm outline-2 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                        Calcular
                    </button>
                </form>

                <div id="resultado_eolica" class="mt-3 border border-green-400 shadow-md hidden">
                    <div class="my-0 border border-gray-200 p-1">
                        <span id="titulo_potencia_eo" class="text-sm font-bold text-gray-900"></span><br/>
                        <span id="resultado_potencia_eo" class="text-sm text-gray-900 mx-auto"></span>
                    </div>
                    <div class="my-0 border border-gray-200 p-1">
                        <span id="titutlo_generacion_eo" class="text-sm font-bold text-gray-900"></span><br/>
                        <span id="resultado_generacion_eo" class="text-sm text-gray-900 mx-auto"></span> 
                    </div>

                    <div class="my-0 border border-gray-200 p-1">
                        <span id="titulo_aerogen" class="text-sm font-bold text-gray-900 whitespace-nowrap"></span> <br/>
                        <span id="resultado_aerogen" class="text-sm mx-auto text-gray-900"></span>
                    </div>

                    <div class="my-0 border border-gray-200 p-1">
                        <span id="pot_parque_eolico" class="text-sm font-bold text-gray-900 whitespace-nowrap"></span>
                        <span id="resultado_pot_parque_eolico" class="text-sm mx-auto text-gray-900"></span><br/>
                        
                    </div>
                    <div class="my-0 border border-gray-200 p-1">
                        <span id="gen_parque_eolico" class="text-sm font-bold text-gray-900 whitespace-nowrap"></span>
                        <span id="resultado_gen_parque_eolico" class="text-sm mx-auto text-gray-900"></span>
                    </div>
                </div>
            </div>
            `;

            if (feature.properties) {
            layer.bindPopup(popupContent);
            }
        }}
        />
 
    <CajaLeyenda>
        <LeyendaMapa 
                    colors={generarGradienteV2(6)} 
                    minValue={minValue} 
                    maxValue={maxValue} 
                    unidades={"m/s"} />
    </CajaLeyenda>

    </> 
  )
}

export { CapaPotencialEolico50 }