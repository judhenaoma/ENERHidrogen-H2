import React from 'react'
import { MapaBase } from './MapaBase.jsx'
import { mapTiles } from '../../utils/mapTiles.js'

export function MosaicoMapasBase({manejarTiles, tileSeleccionado}) {
  return (

    <div className='flex flex-wrap h-full gap-5 p-5 max-w-[280px] overflow-y-scroll'>
        {
            mapTiles.map( (tile) => (
                <MapaBase 
                    key={tile.name} 
                    tile={tile}
                    manejarTiles = {manejarTiles}
                    tileSeleccionado = {tileSeleccionado}
                />
            ))
        }
    </div>
    
  )
}
