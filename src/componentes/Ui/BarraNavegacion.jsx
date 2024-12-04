import React, {useState, useEffect} from 'react'
import {Fragment} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {faXmark} from '@fortawesome/free-solid-svg-icons'
import {NavLink} from 'react-router-dom'
import escudoUnal from '/escudo_unal.png'
import escudoUdea from '/logo_udea.png'
import escudoMinCiencias from '/escudo_minciencias.png'
import escudoPascualBravo from '/escudo_pascual_bravo.png'
import escudoGuajira from '/logo_universidad_guajira.png'
import {useLocation} from 'react-router-dom'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function BarraNavegacion({usuarioLogeado, cerrarSesion}) {
    return (
        <Disclosure as="nav" className="bg-gray-100 shadow">
            {({open}) => (
                <>
                    <div className="mx-auto  px-4 sm:px-6 lg:px-6">
                        <div className="flex h-16 justify-between">
                            <div className="flex">
                                <div className="hidden md:ml-6 md:flex md:space-x-8">
                                    <NavLink
                                        to={"/acerca"}
                                        className={
                                            (args) => args.isActive ? 'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-bold border-indigo-500 text-indigo-500' : 'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                        }
                                    >
                                        Acerca
                                    </NavLink>
                                    <NavLink
                                        className={
                                            (args) => args.isActive ? 'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-bold border-indigo-500 text-indigo-500' : 'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                        }
                                        to={"/antioquia"}
                                    > Antioquia
                                    </NavLink>

                                    <NavLink className={
                                        (args) => args.isActive ? 'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-bold border-indigo-500 text-indigo-500' : 'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    } to={"/registros"}
                                    > Registros
                                    </NavLink>
                                </div>
                                <div className="hidden ml-10 md:flex md:flex-shrink-0 md:items-center">
                                    <img
                                        className="hidden h-16 w-auto lg:block px-4"
                                        src={escudoUnal}
                                        alt="Escudo UNAL"
                                    />

                                    <img
                                        className="hidden  h-14 w-auto lg:block px-4"
                                        src={escudoUdea}
                                        alt="Escudo UdeA"

                                    />


                                    <img
                                        className="hidden  h-8 w-auto lg:block px-4"
                                        src={escudoMinCiencias}
                                        alt="Escudo Ministerio de Ciencias"
                                    />

                                    <img
                                        className="hidden  h-8 w-auto lg:block px-4"
                                        src={escudoPascualBravo}
                                        alt="Escudo Pascual Bravo"
                                    />


                                    <img
                                        className="hidden  h-8 w-auto lg:block px-4"
                                        src={escudoGuajira}
                                        alt="Escudo Universidad de la Guajira"
                                    />

                                </div>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:items-center">
                                {/* Profile dropdown */}
                                {
                                    usuarioLogeado && (
                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <Menu.Button
                                                    className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                    <span className="sr-only">Menú del usuario</span>
                                                    <FontAwesomeIcon icon={faUser} size='xl'/>
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-200"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items
                                                    className="absolute right-0 z-[1100] mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
                                                    {
                                                        usuarioLogeado && (

                                                            <Menu.Item>
                                                                {({active}) => (
                                                                    <a
                                                                        href="#"
                                                                        onClick={cerrarSesion}
                                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                                    >
                                                                        Salir
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                        )
                                                    }
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    )
                                }
                            </div>
                            <div className="-mr-2 flex items-center sm:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button
                                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    {open ? (
                                        <FontAwesomeIcon icon={faXmark}/>
                                    ) : (
                                        <FontAwesomeIcon icon={faBars}/>
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    {
                        usuarioLogeado && (
                            <Disclosure.Panel className="z-[1100]">
                                <div className="space-y-1 pb-3 pt-2">

                                    <Disclosure.Button
                                        as="a"
                                        href="#"
                                        className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
                                    >
                                        ModerGIS
                                    </Disclosure.Button>
                                    <Disclosure.Button
                                        as={NavLink}
                                        to={"/acerca"}
                                        className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                                    >
                                        Acerca de
                                    </Disclosure.Button>
                                    <Disclosure.Button
                                        as={NavLink}
                                        to={"/antioquia"}
                                        className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                                    >
                                        Antioquia
                                    </Disclosure.Button>
                                    <Disclosure.Button
                                        as={NavLink}
                                        to={"/registros"}
                                        className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                                    >
                                        Registros
                                    </Disclosure.Button>
                                </div>
                                <div className="border-t border-gray-200 pb-3 pt-4">
                                    <div className="mt-3 space-y-1">
                                        <Disclosure.Button
                                            as="a"
                                            href="#"
                                            onClick={cerrarSesion}
                                            className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                        >
                                            Salir
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        )
                    }
                </>
            )}
        </Disclosure>
    )
}

export {BarraNavegacion}
