import L from 'leaflet'


export function contadorFeatures(geojson) {
    
    const capaGeojson = L.geoJSON(geojson);
    return capaGeojson.getLayers().length;
}
