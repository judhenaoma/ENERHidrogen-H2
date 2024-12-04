import { Menu, Transition } from '@headlessui/react'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Dropdown({ data, setFormularioSustitucion, campo }) {

    const [titulo, setTitulo] = useState("Selecciona municipio")
    
    const guardarValor = (valor, mpio) => {
        setTitulo(mpio)
        setFormularioSustitucion( (prev) => {
            return {...prev, [campo]: valor}
        })
    }


  return (
    <Menu as="div" className="relative inline-block text-left my-auto">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {titulo}
          <FontAwesomeIcon icon={faChevronDown}  className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none h-36 overflow-y-scroll">
          {
            data.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    onClick={() => guardarValor(item.year, item.municipio)}
                    type="button"
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'block w-full px-4 py-2 text-sm text-gray-700'
                    )}
                  >
                    {item.municipio}, {item.year} Tjoules
                  </button>
                )}
              </Menu.Item>
            ))
          }
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
