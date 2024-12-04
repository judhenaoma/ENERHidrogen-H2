import React, { useEffect } from 'react'
import capaAntioquia from '../../capas/Antioquia/Antioquia_wgs.json'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import capaCombustibles from '../../capas/Antioquia/Combustibles_Mpios.json'


const centroAntioquia = [6.983327833476973, -75.28958388150659]

export const MapaCombustibles = ({tileSeleccionado}) => {



    useEffect(()=> {

        const handlePopupTabs = (e) => {
                if (e.target && e.target.classList.contains('tab-button')) {
                    const tabId = e.target.getAttribute('data-tab');
    
                    document.querySelectorAll('.tab-button').forEach(button => {
                        button.classList.remove('bg-blue-500', 'text-white');
                        button.classList.add('bg-gray-200', 'text-gray-700');
                    });
    
                    document.querySelectorAll('.popup-content').forEach(content => {
                        content.classList.remove('active');
                    });
                    e.target.classList.remove('bg-gray-200', 'text-gray-700');
                    e.target.classList.add('bg-blue-500', 'text-white');
                    document.getElementById(`tab-${tabId}`).classList.add('active');
                }
        }
        document.addEventListener('click', handlePopupTabs);
        
        return () => {
            document.removeEventListener('click', handlePopupTabs);
        }

    }, [])

    const manejarNulos = (valor) => {

        if(!valor || typeof valor === undefined){
            return "-"
        }
        return valor
    }


  return (
    
    <MapContainer center={centroAntioquia} zoom={7}>
        <TileLayer
            url={tileSeleccionado}
            zoomControl={false}
        />

        <GeoJSON
            data={capaAntioquia}
            style={{
                color: 'white',
                weight: 2,
                opacity: 0.3,
                fillColor: 'transparent',
            }}
        />

        <GeoJSON
            data={capaCombustibles}
            style={{
                color: '#1c9be3',
            weight: 3,
            opacity: 0.6,
            fillColor: '#1c9be3',

            }}

            onEachFeature={(feature, layer) => {
                if (feature.properties) {
                // const popupContent = `
                //     <strong class="mx-auto text-center">${feature.properties.MGN_ANM__2}</strong><br/>
                //     <strong>Diesel</strong><br/>
                //     <strong>Año 2018 (gal):</strong> ${manejarNulos(feature.properties.Field5)}<br/>
                //     <strong>Año 2019 (gal):</strong> ${manejarNulos(feature.properties.Field6)}<br/>
                //     <strong>Año 2020 (gal):</strong> ${manejarNulos(feature.properties.Field7)}<br/>
                //     <strong>Año 2021 (gal):</strong> ${manejarNulos(feature.properties.Field8)}<br/>
                //     <strong>Año 2022 (gal):</strong> ${manejarNulos(feature.properties.Field9)}<br/>
                //     <hr class="mx-3" />
                //     <strong>Extra</strong><br/>
                //     <strong>Año 2018 (gal):</strong> ${manejarNulos(feature.properties.extra2_c_5)}<br/>
                //     <strong>Año 2019 (gal):</strong> ${manejarNulos(feature.properties.extra2_c_6)}<br/>
                //     <strong>Año 2020 (gal):</strong> ${manejarNulos(feature.properties.extra2_c_7)}<br/>
                //     <strong>Año 2021 (gal):</strong> ${manejarNulos(feature.properties.extra2_c_8)}<br/>
                //     <strong>Año 2022 (gal):</strong> ${manejarNulos(feature.properties.extra2_c_9)}<br/>
                //     <hr class="mx-3" />
                //     <strong>Corriente</strong><br/>
                //     <strong>Año 2018 (gal):</strong> ${manejarNulos(feature.properties.Corrient_5)}<br/>
                //     <strong>Año 2019 (gal):</strong> ${manejarNulos(feature.properties.Corrient_6)}<br/>
                //     <strong>Año 2020 (gal):</strong> ${manejarNulos(feature.properties.Corrient_7)}<br/>
                //     <strong>Año 2021 (gal):</strong> ${manejarNulos(feature.properties.Corrient_8)}<br/>
                //     <strong>Año 2022 (gal):</strong> ${manejarNulos(feature.properties.Corrient_9)}<br/>
                //     <hr />
                // `;

                const popupContent = `
                <strong class="mx-auto text-center">${feature.properties.MGN_ANM__2}</strong><br/>
                <div class="p-4">
                <div class="flex space-x-4 mb-4">
                    <button class="tab-button px-4 py-2 bg-blue-500 text-white rounded" data-tab="1">Diesel</button>
                    <button class="tab-button px-4 py-2 bg-gray-200 text-gray-700 rounded" data-tab="2">Extra</button>
                    <button class="tab-button px-4 py-2 bg-gray-200 text-gray-700 rounded" data-tab="3">Corriente</button>
                </div>
                <div class="popup-content active" id="tab-1">
                    <strong>Año 2018 (gal):</strong> ${manejarNulos(feature.properties.Field5)}<br/>
                    <strong>Año 2019 (gal):</strong> ${manejarNulos(feature.properties.Field6)}<br/>
                    <strong>Año 2020 (gal):</strong> ${manejarNulos(feature.properties.Field7)}<br/>
                    <strong>Año 2021 (gal):</strong> ${manejarNulos(feature.properties.Field8)}<br/>
                    <strong>Año 2022 (gal):</strong> ${manejarNulos(feature.properties.Field9)}<br/>
                </div>
                <div class="popup-content" id="tab-2">
                    <strong>Año 2018 (gal):</strong> ${manejarNulos(feature.properties.extra2_c_5)}<br/>
                    <strong>Año 2019 (gal):</strong> ${manejarNulos(feature.properties.extra2_c_6)}<br/>
                    <strong>Año 2020 (gal):</strong> ${manejarNulos(feature.properties.extra2_c_7)}<br/>
                    <strong>Año 2021 (gal):</strong> ${manejarNulos(feature.properties.extra2_c_8)}<br/>
                    <strong>Año 2022 (gal):</strong> ${manejarNulos(feature.properties.extra2_c_9)}<br/>
                </div>
                <div class="popup-content" id="tab-3">
                    <strong>Año 2018 (gal):</strong> ${manejarNulos(feature.properties.Corrient_5)}<br/>
                    <strong>Año 2019 (gal):</strong> ${manejarNulos(feature.properties.Corrient_6)}<br/>
                    <strong>Año 2020 (gal):</strong> ${manejarNulos(feature.properties.Corrient_7)}<br/>
                    <strong>Año 2021 (gal):</strong> ${manejarNulos(feature.properties.Corrient_8)}<br/>
                    <strong>Año 2022 (gal):</strong> ${manejarNulos(feature.properties.Corrient_9)}<br/>
                </div>
                </div>
            `
                layer.bindPopup(popupContent);
                }
            }}
        />

    </MapContainer>
  )
}
