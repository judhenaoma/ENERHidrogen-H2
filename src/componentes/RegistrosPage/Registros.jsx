import React, { useState, useEffect } from 'react'
import { Tabs } from '../Ui/Tabs.jsx'
import { TablaSolar } from './TablaSolar.jsx'
import { TablaEolica } from './TablaEolica.jsx'

const tabsInit = [
    { name: 'Energía fotovoltáica', href: '#', current: true, id :'solar' },
    { name: 'Energía Eólica', href: '#', current: false, id :'eolica'}
]


function Registros ({isGuest}) {

    const [ tabs , setTabs ] = useState(tabsInit)
    const tabActual = tabs.find( (item) => item?.current)

  return (
    <>
      <Tabs tabs={tabs} setTabs={setTabs}/>

      <div className='mt-10'>
        {
            <div className={`${tabActual.id === 'solar'?'block':'hidden'}`} >
                <TablaSolar isGuest={isGuest}/>
            </div>
        }
        {
            <div className={`${tabActual.id === 'eolica'?'block':'hidden'}`} >
                <TablaEolica isGuest={isGuest}/>
            </div>
        }
    </div>
    </>
  )
}

export { Registros }
