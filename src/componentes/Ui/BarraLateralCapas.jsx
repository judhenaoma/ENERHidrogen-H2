import React from 'react'
import { Disclosure } from '@headlessui/react'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CheckBox } from './CheckBox'



function BarraLateralCapas ({capas, manejarCapas}) {


  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
    return (
        <div className="w-48 h-[90vh] max-w-xs flex grow flex-col overflow-x-hidden gap-y-5 border border-gray-400 rounded-xl">
          <nav className="flex flex-1 flex-col">
            <h5 className='mx-auto font-bold' >Capas</h5>
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1 overflow-y-auto">
                  {capas.map((item) => (
                    <li key={item.nombre}>
                      {!item.children ? (
                        <a
                          href={item.href}
                          className={
                            'block rounded-md py-2 pr-2 pl-10 text-sm leading-6 font-semibold text-gray-700'
                          }
                        >
                          {item.nombre}
                        </a>
                      ) : (
                        <Disclosure as="div">
                          {({ open }) => (
                            <>
                              <Disclosure.Button
                                className={  
                                  'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700'
                                }
                              >
                                <FontAwesomeIcon
                                  icon={faChevronRight}
                                  className={classNames(
                                    open ? 'rotate-90 text-gray-500' : 'text-gray-400',
                                    'h-3 w-3 shrink-0 ml-1'
                                  )}
                                  aria-hidden="true"
                                />
                                {item.nombre}
                              </Disclosure.Button>
                              <Disclosure.Panel as="ul" className="mt-1 px-2">
                                {item.children.map((subItem) => (
                                  <li key={subItem.nombre}>
                                    <CheckBox
                                      nombre={subItem.nombre}
                                      identificador={subItem.id}
                                      activo={subItem.activo}
                                      manejarCapas = {manejarCapas}
                                      className={                                        
                                        'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700'
                                      }
                                    />
                                  </li>
                                ))}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      )
    }

export { BarraLateralCapas }
