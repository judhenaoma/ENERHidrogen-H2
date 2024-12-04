import React from 'react'
import { GeoJSON } from 'react-leaflet'
import municipios from '../../../capas/Antioquia/Municipios.json'


const hoverPopupOptions = {
  closeButton: false,
  closeOnClick: false,
};

 

function  CapaMunicipios() {
  return (
    <GeoJSON 
        data={municipios}
        attribution='Colombia en mapas - <a target="_blank" href="https://www.colombiaenmapas.gov.co/">Colombia en mapas</a>'
        style={{
            color: '#1c9be3',
            weight: 3,
            opacity: 0.6,
            fillColor: '#1c9be3',
        }}
                    
        onEachFeature={(feature, layer) => {
  
            const popupContent = `
                <small><i>Municipio</i></small><br/>
                <strong>${feature.properties.MPIO_CNMBR}</strong><br/>
            `;
            // layer.bindPopup(popupContent);


          layer.on({

          click: (e) => {
            const { lat, lng } = e.latlng;
            L.popup()
            .setLatLng([lat, lng])
            .setContent(popupContent)
            .openOn(e.target._map);
          },

          mouseover: (e) => {
            const centroid = layer.getCenter(); // Obtiene el centroide del polígono
            const { lat, lng } = centroid; // Coordenadas del centroide
              layer.setStyle({
                  color: 'white',
                  weight: 3,
                  opacity: 1,
                  fillColor: 'white',
                  dashArray: '',
     
              });
              L.popup(hoverPopupOptions)
              .setLatLng([lat, lng])
              .setContent(popupContent)
              .openOn(e.target._map);
          },
          mouseout: (e) => {
              e.target._map.closePopup();
              layer.setStyle({
                  color: '#1c9be3',
                  weight: 3,
                  opacity: 0.6,
                  fillColor: '#1c9be3',
                  dashArray: '',
         
              });
          }
      });


    

        }}
        
    /> 
  )
}

export { CapaMunicipios }
