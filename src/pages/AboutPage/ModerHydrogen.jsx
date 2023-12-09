import React from 'react'
import imgHydrogen from '../../assets/content/moderhydrogen_img.png'

function ModerHydrogen () {
  return (
    <div>
        <p className='mt-3 px-10 py-3'>MODERHydrogen - H₂ es una metodología que busca la integración de las energías renovables, incluido el hidrógeno verde. Evalúa simultáneamente el potencial espacial y temporal de las energías renovables, calculando la oferta y la demanda de energía y las emisiones de gases de efecto invernadero. Además, es coherente y consistente en el uso de herramientas integradas y flexibles para la evaluación y prospección de recursos energéticos. MODERHydrogen-H₂ está conectado a la plataforma de energías renovables MODERGIS, como un módulo propio, pero recibe los resultados de ENERGIS que contiene los sistemas de información geográfica, modificado y ampliado para incluir la producción de hidrógeno verde. </p>
        <p className='mt-3 px-10 py-3'>Se alimenta también de los resultados de ENERDEM módulo de la demanda y oferta de energía, basado en el modelo Long Energy Alternative Planning - L.E.A.P que utiliza la información de los balances energéticos de la Unidad de Planeación Minero -Energética UPME y la Organización Latinoamericana de Energía OLADE, donde se crean los escenarios de sustitución, conservación y prospección de energía. ENERHYDROGEN modela la electrolisis y tecnologías para la producción de hidrógeno verde-, como se muestra en la figura </p>
        <div className='mt-3 p-3'>
            <img src={imgHydrogen} alt="Esquema ModerGIS" className='mx-auto mt-4' />
        </div>
    </div>
  )
}


export { ModerHydrogen }