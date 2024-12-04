import { Disclosure } from "@headlessui/react";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormularioSankeyColombia } from "./FormularioSankeyColombia";

export function Desplegable({tituloDesplegable,  children}) {

  return (
    <div className="bg-gray-100 my-12 py-6 rounded-lg">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
            <Disclosure as="div">
              {({ open }) => (
                <>
                  <dt>
                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                      <span className="text-base font-semibold leading-5">
                        {tituloDesplegable}
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        {open ? (
                          <FontAwesomeIcon
                            icon={faMinus}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faPlus}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="my-10 pr-12 w-full">
                    {children}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
        </div>
      </div>
    </div>
  );
}
