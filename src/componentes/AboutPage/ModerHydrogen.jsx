import React from 'react'
import imgHydrogen from '../../../public/moderhydrogen_img_v2.png'

function ModerHydrogen () {
  return (
    <div>
        <p className='mt-3 px-10 py-3'>ENERHidrógen - H2 es un modelo de simulación que busca la integración sostenible ambiental y social de energías renovables incluyendo el vector Hidrógeno. Evalúa simultáneamente la potencialidad energética renovable espacial y temporal de la oferta y demanda de energía una zona geográfica y de la emisión de gases de efecto invernadero. Es coherente y consecuente con en el uso de herramientas integradas y flexibles para la evaluación y prospección de recursos energéticos, incluyendo las cuencas hidrográficas y la distribución cuerpos de agua. Determina la demanda de energía centrando en escenarios de movilidad sostenible, energía térmica en la industria y potenciales de exportación o uso en materia prima, con énfasis en el uso del Hidrógeno verde. Modela tecnologías de electrolisis para la disociación en hidrogeno verde H₂, e integra los resultados de las simulaciones realizadas.</p>
        <p className='mt-3 px-10 py-3'>Se alimenta también de los resultados de ENERDEM módulo de la demanda y oferta de energía, basado en el modelo Long Energy Alternative Planning - L.E.A.P que utiliza la información de los balances energéticos de la Unidad de Planeación Minero -Energética UPME y la Organización Latinoamericana de Energía OLADE, donde se crean los escenarios de sustitución, conservación y prospección de energía. ENERHYDROGEN modela la electrolisis y tecnologías para la producción de hidrógeno verde-, como se muestra en la figura </p>
        <div className='mt-3 p-3'>
            <img src={imgHydrogen} alt="Esquema ModerGIS" className='mx-auto mt-4' />
        </div>
        <hr />
        <div className='mt-3 mb-5 px-10 mx-auto w-6/12'>
          <h5 className='text-center w-4/12 mx-auto font-bold'>Información de contacto:</h5>
          <p className='mt-3 mb-0 text-center'>Ricardo Quijano Hurtado • rquijano@unal.edu.co  </p>
          <p className='italic mx-auto text-center' >Investigador del proyecto</p>
        </div>  
    </div>
  )
}


export { ModerHydrogen }