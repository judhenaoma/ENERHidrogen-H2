import React from 'react'
import { GeoJSON } from 'react-leaflet'
import { generarGradienteV2 } from '../../../utils/utils'
import densidadPotencia50 from '../../../capas/Antioquia/DP50_5_Minified.json'
import { CajaLeyendaMapa } from '../CajaLeyendaMapa';
import { LeyendaMapa } from '../LeyendaMapa';


const labels = {

    1	: [0.001008	,   34.181497],
    2	: [34.181497	, 102.542475],
    3	: [102.542475	, 216.477439],
    4	: [216.477439	, 410.166878],
    5	: [410.166878	, 2916.736084],

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



function CapaDensidadPotencia50 () {

  return (
    <>
        <GeoJSON data={ densidadPotencia50 }
        attribution='Global Wind Atlas - <a target="_blank" href="https://globalwindatlas.info/es">Wind Atlas</a>'
        style={ mapearEstilos }
        onEachFeature={(feature, layer) => {

            const etiqueta = construirEtiqueta(labels[feature.properties.gridcode])

            const popupContent = `
            <div class="w-60">
                <small><i>Densidad de potencia eólica 50 m</i></small><br/>
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

export { CapaDensidadPotencia50 }