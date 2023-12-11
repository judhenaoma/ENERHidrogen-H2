import React, { useState, useEffect } from 'react'
import { Tabs } from '../../componentes/Ui/Tabs'
import { TablaSolar } from './TablaSolar'
import { TablaEolica } from './TablaEolica'

const tabsInit = [
    { name: 'Energía fotovoltáica', href: '#', current: true, id :'solar' },
    { name: 'Energía Eólica', href: '#', current: false, id :'eolica'}
]


function Registros () {

    const [ tabs , setTabs ] = useState(tabsInit)
    const tabActual = tabs.find( (item) => item?.current)

  return (
    <>
      <Tabs tabs={tabs} setTabs={setTabs}/>

      <div className='mt-10'>
        {
            <div className={`${tabActual.id === 'solar'?'block':'hidden'}`} >
                <TablaSolar/>
            </div>
        }
        {
            <div className={`${tabActual.id === 'eolica'?'block':'hidden'}`} >
                <TablaEolica/>
            </div>
        }
    </div>
    </>
  )
}

export { Registros }
