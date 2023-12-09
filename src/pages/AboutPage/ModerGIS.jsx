import React from 'react'
import imgModerGIS from '../../assets/content/modergis_schema.png'

function ModerGIS () {
  return (
    <div>
        <p className='mt-3 px-10 py-3'>MODERGIS es una concepción propia que busca la integración de energías renovables, evaluando simultáneamente la potencialidad energética espacial y temporal de la oferta y demanda de energía de una zona geográfica. Además, es coherente y consecuente con en el uso de herramientas integradas y flexibles de modelos para la evaluación de estos recursos. </p>
        <p className='mt-3 px-10 py-3'>Comprende la integración de los sistemas de información geográfica SIG, para identificar y estimar potenciales de energías renovables, un modelo del tipo Bottom up, L.E.A.P, que permite la simulación de la demanda-Oferta de energía, y finalmente el método de Análisis Multicriterio de Decisión VIKOR que evalúa un conjunto de alternativas energéticas bajo los criterios de sostenibilidad. Integran las dimensiones económica, social y ambiental, de gran relevancia en nuestro medio y que son imprescindibles para la evaluación y toma de decisiones en el planeamiento energético. </p>
        <p className='mt-3 px-10 py-3'>El procedimiento metodológico para la aplicación del modelo MODERGIS se basa en la integración y correlación de tres módulos que lo conforman, ENERGIS, ENERDEM y ENERSOS como se observa en la figura, y ha sido aplicado al caso Colombia, pero puede ser aplicado a cualquier región del mundo que cuente con la información requerida.</p>
        <div className='mt-3 p-3'>
            <img src={imgModerGIS} alt="Esquema ModerGIS" className='mx-auto mt-4' />
        </div>
    </div>
  )
}


export { ModerGIS }