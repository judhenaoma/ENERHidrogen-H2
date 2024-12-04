import caudales from '../capas/Antioquia/Cuencas_Antioquia_Min.json' assert { type: "json" }
import * as turf from '@turf/turf'


export function obtenerCuenca(lat, long){

    try{
        const punto = turf.point([long, lat])
        const cuenca = caudales.features.find(cuenca => {
            if(cuenca.geometry.type === "Polygon"){
                const poligono = turf.polygon(cuenca.geometry.coordinates)
                return turf.booleanPointInPolygon(punto.geometry.coordinates, poligono)
            }else{
                const poligono = turf.multiPolygon(cuenca.geometry.coordinates)
                return turf.booleanPointInPolygon(punto.geometry.coordinates, poligono)
            } 
    })

    if(cuenca){
        return cuenca.properties//.Dispo_ENSO
    }

    return  "-"

    }catch(e){
        return "-"
    }
}


console.log(obtenerCuenca(6.1641195166117475, -75.6368129652987))

