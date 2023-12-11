import React, { useState } from 'react'
import { Tabs } from '../../componentes/Ui/Tabs'
import { ModerGIS } from './ModerGIS'
import { ModerHydrogen } from './ModerHydrogen'

const tabsInit = [
  { name: 'MODERGIS', href: '#', current: true, id :'modergis' },
  { name: 'MODERHydrogen - H₂', href: '#', current: false, id :'moderhydrogen'}
]


function AboutPage () {

  const [ tabs , setTabs ] = useState(tabsInit) 
    const actualTab = tabs.find( tab => tab.current === true ).id

  return (
    <>
    <Tabs tabs={tabs} setTabs={setTabs} />
    {
        actualTab === 'modergis' ? <ModerGIS /> : <ModerHydrogen />
    }
    </>
  )
}

export { AboutPage }