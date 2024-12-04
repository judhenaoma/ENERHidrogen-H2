import React from 'react'

export function MapaBase ({ tile, manejarTiles, tileSeleccionado }) {
  return (
    <div className={`relative w-80 ${tileSeleccionado === tile.url ? 'border-4 border-blue-500 shadow-xsm shadow-blue-500' : ''}`}
      onClick={() => manejarTiles(tile.url)}
    >
        <img className='bg-cover bg-center' src={tile.image} alt={tile.name}/>
        <p className='text-center absolute w-full p-1 font-bold opacity-70 text-white right-0 bottom-0 bg-black'>{tile.name}</p>
    </div>
  )
}
