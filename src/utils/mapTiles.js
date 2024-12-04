import defaultTile from '../assets/tiles/default.png'
import streeMap from '../assets/tiles/streeMaps.png'
import topoMap from '../assets/tiles/topoMap.png'
import esriWorldImagery from '../assets/tiles/ESRI_WordStreepMap.png'

const mapTiles = 
    [
        {
            name : "ESRI Imagery" ,
            url : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            attribution : "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
            image : defaultTile
        },
        {
            name : "Open Street Map",
            url : "https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=X5b3jIXLMhNqludN1m6R",
            attribution : "Map data &copy; <a href='https://openstreetmap.org'>OpenStreetMap</a> contributors",
            image : streeMap
        },
        {
            name : "Open TopoMap",
            url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
            attribution : 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)', 
            image : topoMap
        },
         {
            name : "ESRI World Street Map",
            url : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
            attribution : "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012",
            image : esriWorldImagery
        }
    ]

export { mapTiles }