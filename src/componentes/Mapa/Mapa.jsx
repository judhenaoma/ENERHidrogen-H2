import React, { useEffect } from 'react'
import { MapContainer, TileLayer, GeoJSON, Pane } from 'react-leaflet'
import capaAntioquia from './../../capas/Antioquia_wgs.json'

import { CapaCentrosPoblados } from './CapaCentrosPoblados'
import { CapaMunicipios } from './CapaMunicipios'
import { CapaLineaTrasmisionISA } from './CapaLineaTrasmisionISA'
import { CapaLineasTrasmision } from './CapaLineasTrasmision'
import { CapaSubestacionDistribucion } from './CapaSubestacionDistribucion'
import { CapaSubestacionTransmision } from './CapaSubestacionTransmision'
import { CapaCentrales } from './CapaCentrales'
import { CapaRadiacionSolar } from './CapaRadiacionSolar'
import { CapaBrilloSolar } from './CapaBrilloSolar'
// import { CapaVelocidadVientos } from './CapaVelocidadVientos'
import { CapaRios } from './CapaRios'
import { CapaPrecipitacion } from './CapaPrecipitacion'
import { CapaParquesNal } from './CapaParquesNal'
import { CapaParamos } from './CapaParamos'
import { CapaNegritudes } from './CapaNegritudes'
import { CapaIndigenas } from './CapaIndigenas'
import { CapaPotencialVoltaico } from './CapaPotencialVoltaico'
import { CapaCuerposDeAgua } from './CapaCuerposDeAgua'
import { CapaCuencas } from './CapaCuencas'
import { CapaRestriccionTotal } from './CapaRestriccionTotal'
import { CapaSubregionesAnt } from './CapaSubregionesAnt'
import { CapaPotencialEolico100 } from './CapaPotencialEolico100'
import { CapaPotencialEolico50 } from './CapaPotencialEolico50'
import { CapaDensidadPotencia100 } from './CapaDensidadPotencia100'
import { CapaDensidadPotencia50 } from './CapaDensidadPotencia50'

function Mapa ({capas, potenciales}) {

    const centroAntioquia = [6.983327833476973, -75.28958388150659]



  useEffect(() => {
    document.getElementById("potenciales_energia").onmousedown = L.DomEvent.stopPropagation;

    }, [])


  return (

    
    <MapContainer center={centroAntioquia} zoom={7}>
     
        <TileLayer
            url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
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
    

        {
            capas[0].children[0].activo ? 
            <CapaCentrosPoblados />
            : null
        }
        

        {
            capas[0].children[1].activo 
            ? <CapaMunicipios />
            : null
        }

{
            capas[0].children[2].activo 
            ? <CapaSubregionesAnt />
            : null
        }


        {
            capas[1].children[0].activo 
            ? <CapaLineasTrasmision />
            : null
        }

        {
            capas[1].children[1].activo
            ? <CapaLineaTrasmisionISA />
            : null
        }

        {
            capas[1].children[2].activo
            ? <CapaSubestacionTransmision />
            : null
        }

        {
            capas[1].children[3].activo
            ? <CapaSubestacionDistribucion />
            : null
        }

        {
            capas[1].children[4].activo
            ? <CapaCentrales />
            : null
        }


        {
            capas[2].children[0].activo
            ? <CapaRadiacionSolar />
            : null
        }

        {
            capas[2].children[1].activo
            ? <CapaBrilloSolar />
            : null
        }

        {
            capas[2].children[2].activo
            ? <CapaDensidadPotencia50 />
            : null
        }
        {
            capas[2].children[3].activo
            ? <CapaDensidadPotencia100 />
            : null
        }
 
        {
            capas[3].children[0].activo
            ? <CapaRios />
            : null
        }
        {
            capas[3].children[1].activo
            ? <CapaPrecipitacion />
            : null
        }
        {
            capas[3].children[2].activo
            ? <CapaCuencas />
            : null
        }

        {
            capas[3].children[3].activo
            ? <CapaCuerposDeAgua />
            : null
        }

        {
            capas[4].children[0].activo
            ? <CapaParamos />
            : null
        }

        {
            capas[4].children[1].activo
            ? <CapaParquesNal />
            : null
        }

        {
            capas[4].children[2].activo
            ? <CapaIndigenas />
            : null
        }

        {
            capas[4].children[3].activo
            ? <CapaNegritudes />
            : null
        }
        {
            capas[4].children[4].activo
            ? <CapaRestriccionTotal />
            : null
        }

        {
            potenciales[0].activo
            ? <CapaPotencialVoltaico />
            : null
        }
        {
            potenciales[1].activo
            ? <CapaPotencialEolico50 />
            : null
        }
 
        {
            potenciales[2].activo
            ? <CapaPotencialEolico100 />
            : null
        }
        

    </MapContainer>
  )
}

export { Mapa }
