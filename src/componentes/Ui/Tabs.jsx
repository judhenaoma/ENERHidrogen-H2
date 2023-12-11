
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
function Tabs({ tabs, setTabs }) {
  
  const manejarCambioContenidoSmall = (e) =>{
      const tabsActualizados = tabs.map( tab => {
          if(tab.id === e.target.value){
              return {
                  ...tab,
                  current: true
              }
          }else{
              return {
                  ...tab,
                  current: false
              }
          }
      })

      setTabs(tabsActualizados)
  }

  const manejarCambioContenidoBig = (tipoCont) =>{
      const tabsActualizados = tabs.map( tab => {
          if(tab.id === tipoCont){
              return {
                  ...tab,
                  current: true
              }
          }else{
              return {
                  ...tab,
                  current: false
              }
          }
      })
      setTabs(tabsActualizados)
  }

  return (
    <div className="mx-auto mt-5 w-4/12">
      <div className="sm:hidden">
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          defaultValue={tabs.find((tab) => tab.current).name}
          onChange = {manejarCambioContenidoSmall}
        >
          {tabs.map((tab) => (
            <option value={tab.id} key={tab.id}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <a
                key={tab.id}
                href={tab.href}
                onClick = {() => manejarCambioContenidoBig(tab.id)}
                className={classNames(
                  tab.current
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                )}
                aria-current={tab.current ? 'page' : undefined}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

export  { Tabs }
