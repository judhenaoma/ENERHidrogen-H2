import { useState } from 'react';
import { GeoJSON } from 'react-leaflet'
import { generarGradiente } from '../../jsUtils/opc'
import  radiacionGlobal  from '../../capas/Radiacion_Solar_Global.json'
import { CajaLeyenda } from '../Ui/CajaLeyenda';
import { LeyendaMapa } from '../Ui/LeyendaMapa';


const labels = {
    1	: [815.603027	, 1206.05603],
    2	: [1206.05603	, 1291.159058],
    3	: [1291.159058	, 1354.347046],
    4	: [1354.347046	, 1410.96106],
    5	: [1410.96106	, 1463.557007],
    6	: [1463.557007	, 1516.883057],
    7	: [1516.883057	, 1568.384033],
    8	: [1568.384033	, 1614.040039],
    9	: [1614.040039	, 1659.696045],
    10	: [1659.696045	, 1706.083008],
    11	: [1706.083008	, 1746.990967],
    12	: [1746.990967	, 1783.880981],
    13	: [1783.880981	, 1821.501953],
    14	: [1821.501953	, 1861.313965],
    15	: [1861.313965	, 1898.203979],
    16	: [1898.203979	, 1931.807007],
    17	: [1931.807007	, 1966.505981],
    18	: [1966.505981	, 2004.491943],
    19	: [2004.491943	, 2052.705078],
    20	: [2052.705078	, 2160.819092]
}

const minValue = labels[1][0];
const maximaClase = Math.max(...Object.keys(labels)) 
const maxValue = labels[maximaClase][1];

function mapearEstilos(feature) {

    const cantidad = 20;
    const gradiente = generarGradiente(20)

    for( let i = 1; i <= cantidad; i++ ){
        if (feature.properties.gridcode === i){
            return { color: gradiente[i - 1], weight : 1, opacity : 1, fillOpacity: 1 };
        }
    }
}

const construirEtiqueta = (lista) => {
    const etiqueta = `${lista[0].toFixed(2)} - ${lista[1].toFixed(2)} kWh/m2 `
    return etiqueta

}

const calcularValorMedio = (lista) => {    
        const valorMedio = (lista[0] + lista[1]) / 2
        return valorMedio
}


function CapaPotencialVoltaico () {

  return (
    <>
        <GeoJSON data={ radiacionGlobal } 
        style={ mapearEstilos }
        onEachFeature={(feature, layer) => {
            layer.on({
                click: (e) => {
                    const valorMedio = calcularValorMedio(labels[feature.properties.gridcode])
                    const etiqueta = construirEtiqueta(labels[feature.properties.gridcode])
                    const { lat, lng } = e.latlng;

                    const popupContent = `
                    <div class='mx-auto w-80'>
                        <small><i>Radiación solar</i></small><br/>
                        <i>${etiqueta}</i><br/>
                        <hr class='my-3'/>
                        <form  onsubmit="window.ejecutarCalculoGeneracionVoltaica(event, ${valorMedio})" >
                            <div>
                                <label for="eficiencia_sistema" class="block text-sm font-medium text-gray-700">Eficiencia global del sistema (Adim.):</label>
                                <input id="eficiencia_sistema" required name="eficiencia_sistema" type="number" step="any" min="0" max="1" class="p-1 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                            </div>
                            <p class="mt-2 text-gray-500 text-xs" ><i>Ingrese la demanda de energía anual o diaria</i></p>
                            <div class="flex justify-center items-center">                       
                                <div class="mt-1 ml-1">
                                    <label for="demanda_anual_ener" class="block text-sm font-medium text-gray-700">Demanda diaria de energía (kWh/día):</label>
                                    <input id="demanda_diaria_ener" name="demanda_diaria_ener" type="number" onchange="window.manejoEntradaDemanda('day')" class="p-1 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                </div>
                                <div class="mt-1 mr-1">
                                    <label for="demanda_anual_ener" class="block text-sm font-medium text-gray-700">Demanda anual de energía (kWh/año):</label>
                                    <input id="demanda_anual_ener" name="demanda_anual_ener" type="number" onchange="window.manejoEntradaDemanda('year')" class="p-1 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                </div>
                            </div>
                            <div class="mt-2">
                                <label for="factor_planta" class="block text-sm font-medium text-gray-700">Factor de planta (Adim.):</label>
                                <input id="factor_planta" required name="factor_planta" type="number" step="any" min="0" max="1" class="p-1 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                            </div>
                            <div class="mt-2">
                                <label for="potencia_panel" class="block text-sm font-medium text-gray-700">Potencia de panel fotovoltáico(Wp):</label>
                                <input id="potencia_panel" placeholder="Opcional. Se puede ingresar luego" name="potencia_panel" type="number" step="any" min="0"  class="p-1 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                            </div>
                            <button
                                type="submit"
                                class="mt-3 rounded bg-indigo-600 px-2 h-6 text-xs text-white shadow-sm outline-2 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                Calcular
                            </button>
                        </form>
                        <div id="resultado_foto" class="mt-3 border border-green-400 shadow-md hidden">
                            <div class="my-0 border border-gray-200 p-1">
                                <span id="titulo_factor_capacidad" class="text-sm font-bold text-gray-900"></span><br/>
                                <span id="resultado_factor_capacidad" class="text-sm text-gray-900 mx-auto"></span>
                            </div>
                            <div class="my-0 border border-gray-200 p-1">
                                <span id="titulo_potencia" class="text-sm font-bold text-gray-900"></span><br/>
                                <span id="resultado_potencia" class="text-sm text-gray-900 mx-auto"></span> 
                            </div>
        
                            <div class="my-0 border border-gray-200 p-1">
                                <span id="titutlo_generacion" class="text-sm font-bold text-gray-900 whitespace-nowrap"></span> <br/>
                                <span id="resultado_generacion" class="text-sm mx-auto text-gray-900"></span>
                            </div>
        
                            <div class="my-0 border border-gray-200 p-1">
                                <span id="titulo_paneles" class="text-sm font-bold text-gray-900 whitespace-nowrap"></span>
                                <span id="resultado_paneles" class="text-sm mx-auto text-gray-900"></span><br/>
                                
                            </div>
                            <div class="my-0 border border-gray-200 p-1">
                                <span id="titulo_area" class="text-sm font-bold text-gray-900 whitespace-nowrap"></span>
                                <span id="resultado_area" class="text-sm mx-auto text-gray-900"></span>
                            </div>
                            <div class="mt-2 border border-gray-200 p-1">
                                <button
                                    onclick="window.guardarRegistrosSolar(${valorMedio}, ${lat}, ${lng})"
                                    type="button"
                                    class="mx-auto mt-3 rounded bg-indigo-600 px-2 h-6 text-xs text-white shadow-sm outline-2 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                    `;
                    
                    L.popup()
                    .setLatLng([lat, lng])
                    .setContent(popupContent)
                    .openOn(e.target._map);
                    
                }
            });
        }}
        />

    <CajaLeyenda>
        <LeyendaMapa colors={generarGradiente(20)} minValue={minValue} maxValue={maxValue} unidades={"kWh/m2 por año"} />
    </CajaLeyenda>

    </> 
  )
}

export { CapaPotencialVoltaico }