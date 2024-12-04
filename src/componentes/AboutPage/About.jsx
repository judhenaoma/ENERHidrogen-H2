import React, { useState } from 'react'
import { Tabs } from '../Ui/Tabs.jsx'
import { ModerGIS } from './ModerGIS.jsx'
import { ModerHydrogen } from './ModerHydrogen.jsx'

const tabsInit = [
  { name: 'EnerHidrogen - H₂', href: '#', current: true, id :'moderhidrogen'}
]


function About () {

  const [ tabs , setTabs ] = useState(tabsInit) 
  const actualTab = tabs.find( tab => tab.current === true ).id

  return (
    <>
    <Tabs tabs={tabs} setTabs={setTabs} />
    {
        actualTab === 'moderhidrogen' ? <ModerHydrogen /> : null
    }
    </>
  )
}

export { About }