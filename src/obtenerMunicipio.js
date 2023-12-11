import municipios from './capas/Municipios.json' assert { type: "json" };
import * as turf from '@turf/turf'

// Función que ayuda a encontrar el municipio en el que se encuentra el punto dado por unas coordenadas

const obtenerMunicipio = (lat, lng) => {

    try
    {
        const punto = turf.point([lng, lat])
        const municipio = municipios.features.find(municipio => {
            const poligono = turf.polygon(municipio.geometry.coordinates)
            return turf.booleanPointInPolygon(punto, poligono)
        })

        if (!municipio)
        {
            return "-"
        }

        return municipio.properties.MPIO_CNMBR  
    }
    catch(e){
        return "-"
    }
}


export { obtenerMunicipio }