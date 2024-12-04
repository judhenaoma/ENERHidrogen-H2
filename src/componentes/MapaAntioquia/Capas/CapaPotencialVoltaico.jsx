import { useState } from 'react';
import { GeoJSON } from 'react-leaflet'
import { generarGradiente } from '../../../utils/utils'
import  radiacionGlobal  from '../../../capas/Antioquia/Radiacion_Solar_Global.json'
import { CajaLeyendaMapa } from '../CajaLeyendaMapa';
import { LeyendaMapa } from '../LeyendaMapa';


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


function CapaPotencialVoltaico ({manejarBarraDerecha, manejarPuntoSeleccionado}) {

    const [ marker, setMarker ] = useState(null)

  return (
    <>
        <GeoJSON data={ radiacionGlobal } 
        attribution='Global Solar Atlas - <a target="_blank" href="https://globalsolaratlas.info/">Solar Atlas</a>'
        style={ mapearEstilos }
        onEachFeature={(feature, layer) => {
            layer.on({
                click: (e) => {
                    const valorMedio = calcularValorMedio(labels[feature.properties.gridcode])
                    const etiqueta = construirEtiqueta(labels[feature.properties.gridcode])
                    const { lat, lng } = e.latlng;

                    const datosCapa = {
                        titulo : 'Cálculo energía solar',
                        tipo : 'solar',
                        valorMedio : valorMedio,
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
        <LeyendaMapa colors={generarGradiente(20)} minValue={minValue} maxValue={maxValue} unidades={"kWh/m2 por año"} />
    </CajaLeyendaMapa>

    </> 
  )
}

export { CapaPotencialVoltaico }