import React, { useState } from 'react'

function CheckBox ({nombre, className, activo, manejarCapas, identificador}) {

  return (
    <div className={`flex flex-col gap-y-2 ${className}`}>
      <label className='inline-flex items-center'>
        <input type='checkbox' className='form-checkbox' checked={activo} onChange={ () => manejarCapas(identificador)} />
        <span className='ml-2'>{nombre}</span>
      </label>
    </div>
  )
}

export { CheckBox }