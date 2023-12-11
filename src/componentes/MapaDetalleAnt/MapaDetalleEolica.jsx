import React from 'react'
import capaAntioquia from '../../capas/Antioquia_wgs.json'
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet'

const centroAntioquia = [6.983327833476973, -75.28958388150659]

export const MapaDetalleEolica = ( {datosPunto} ) => {

    const fechaGuardado = datosPunto?.fechaGuardado
    const AlturaVelocidadViento = datosPunto?.AlturaVelocidadViento
    const velocidadViento =  datosPunto?.velocidadViento
    const municipio = datosPunto?.municipio
    const coeficienteMaquina = datosPunto?.coeficienteMaquina
    const diametroRotor = datosPunto?.diametroRotor
    const factorPlanta = datosPunto?.factorPlanta
    const potenciaEolica = datosPunto?.potenciaEolica
    const generacionAnualEolica = datosPunto?.generacionAnualEolica
    const areaLoteHa = datosPunto?.areaLoteHa
    const numeroAerogeneradores = datosPunto?.numeroAerogeneradores
    const potenciaParqueEolico = datosPunto?.potenciaParqueEolico
    const generacionParqueEolico =  datosPunto?.generacionParqueEolico
    const coordenadasPunto = datosPunto?.coordenadas ? datosPunto.coordenadas : centroAntioquia

  return (
    
    <MapContainer center={coordenadasPunto} zoom={12}>
        <TileLayer
            url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            zoomControl={false}
        />

        <GeoJSON
            data={capaAntioquia}
            style={{
                color: 'red',
                weight: 2,
                opacity: 0.6,
                fillColor: 'transparent',

            }}
        />
        <Marker position={coordenadasPunto}>
            <Popup>
            <p className='whitespace-nowrap'> <b> Fecha :  </b>{fechaGuardado}   </p>
            <p className='whitespace-nowrap'> <b> Municipio :  </b>{municipio}   </p>
            <p className='whitespace-nowrap'> <b> Altura viento:  </b>{ AlturaVelocidadViento }   </p>
            <p className='whitespace-nowrap'> <b> Velocidad de viento (m/s) : </b> {velocidadViento}   </p>
            <p className='whitespace-nowrap'> <b> Coeficiente máquina :  </b>{coeficienteMaquina}   </p>
            <p className='whitespace-nowrap'> <b> Diámetro rotor (m) :  </b> {diametroRotor}  </p>
            <p className='whitespace-nowrap'> <b> Factor de planta :  </b> {factorPlanta}  </p>
            <p className='whitespace-nowrap'> <b> Área parque eólico (ha) : </b>  {areaLoteHa}  </p>
            <p className='whitespace-nowrap'> <b> Potencia eólica :  </b> {potenciaEolica}   </p>
            <p className='whitespace-nowrap'> <b> Generación anual :  </b> {generacionAnualEolica}  </p>
            <p className='whitespace-nowrap'> <b> Aerogeneradores :  </b> {numeroAerogeneradores}   </p>
            <p className='whitespace-nowrap'> <b> Potencia parque eólico :  </b> {potenciaParqueEolico}  </p>
            <p className='whitespace-nowrap'> <b> Generacion parque eólico : </b> {generacionParqueEolico}   </p>
            </Popup>
        </Marker>    
    </MapContainer>
  )
}
