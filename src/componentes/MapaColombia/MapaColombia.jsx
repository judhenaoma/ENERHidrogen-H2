import React from 'react'
import { MapContainer, TileLayer, GeoJSON, WMSTileLayer } from 'react-leaflet'


import capaColombia from './../../capas/Colombia/Capa_Colombia.json'
// import { CapaMunicipiosCol } from './CapaMunicipiosCol' 
import { CapaLineasTrasmisionCol } from './CapaLineasTrasmisionCol'
import { CapaSubestacionDistribucionCol } from './CapaSubestacionDistribucionCol'
import { CapaSubestacionTransmisionCol } from './CapaSubestacionTransmisionCol'
import { CapaCentralesCol } from './CapaCentralesCol'
import { CapaRadiacionSolarCol } from './CapaRadiacionSolarCol'
import { CapaBrilloSolarCol } from './CapaBrilloSolarCol'
import { CapaVelocidadVientosCol } from './CapaVelocidadVientosCol'
// import { CapaRios } from '../Mapa/CapaRios'
// import { CapaPrecipitacion } from '../Mapa/CapaPrecipitacion'
import { CapaParquesNalCol } from './CapaParquesNalCol'
import { CapaParamosCol } from './CapaParamosCol'
import { CapaNegritudesCol } from './CapaNegritudesCol' 
import { CapaIndigenasCol } from './CapaIndigenasCol'
import { CapaCuencasHidroCol } from './CapaCuencasHidroCol'


import { ModalPortalNasa } from '../Ui/ModalPortalNasa'
import { CapaRestriccionTotalCol } from './CapaRestriccionTotalCol'

const centroAntioquia = [6.983327833476973, -75.28958388150659]

function MapaColombia ({capas, manejarCapas }) {

  const cerrarModalVientosNasa = () => {
    manejarCapas('vientosNasa')
  }    

  return (


    <div className='w-10/12'>
    
    <MapContainer center={centroAntioquia} zoom={5}>
     
        <TileLayer
            url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            zoomControl={false}
        />
        <GeoJSON
            data={capaColombia}
            style={{
                color: 'white',
                weight: 2,
                opacity: 0.3,
                fillColor: 'transparent',
            }}
        />

        {
            capas[0].children[0].activo 
            ? <CapaLineasTrasmisionCol />
            : null
        }


        {
            capas[0].children[1].activo
            ? <CapaSubestacionTransmisionCol />
            : null
        }

        {
            capas[0].children[2].activo
            ? <CapaSubestacionDistribucionCol />
            : null
        }

        {
            capas[0].children[3].activo
            ? <CapaCentralesCol />
            : null
        }


        {
            capas[1].children[0].activo
            ? <CapaRadiacionSolarCol />
            : null
        }

        {
            capas[1].children[1].activo
            ? <CapaBrilloSolarCol />
            : null
        }

        {
            capas[1].children[2].activo
            ? <CapaVelocidadVientosCol />
            : null
        }

    
        {/* {
            capas[3].children[0].activo
            ? <CapaRios />
            : null
        }
        {
            capas[3].children[1].activo
            ? <CapaPrecipitacion />
            : null
        } */}

        
        {
            capas[2].children[0].activo
            ? <CapaCuencasHidroCol />
            : null
        }
        
        {
            capas[3].children[0].activo
            ? <CapaParamosCol />
            : null
        }

        {
            capas[3].children[1].activo
            ? <CapaParquesNalCol />
            : null
        }

        {
            capas[3].children[2].activo
            ? <CapaIndigenasCol />
            : null
        }

        {
            capas[3].children[3].activo
            ? <CapaNegritudesCol />
            : null
        }
        {
            capas[3].children[4].activo
            ? <CapaRestriccionTotalCol />
            : null
        }

        {
            capas[4].children[0].activo
            // ? <PortalNasaVientos />
            ? <ModalPortalNasa  cerrarModal = {cerrarModalVientosNasa} />
            : null
        }
        {/* 
        {
            capas[6].children[0].activo
            // ? <PortalNasaVientos />
            ? <CapaVelocidadVientosNasaProm/>
            : null
        } */}

    </MapContainer>
    </div>
  )
}

export { MapaColombia }
