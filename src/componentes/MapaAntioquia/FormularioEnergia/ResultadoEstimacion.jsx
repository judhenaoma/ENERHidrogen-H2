import React from 'react'


export const ResultadoEstimacion = ({resultadosEnergia, guardarDatosBD, mostrarGuardar = false }) => {
    const { datosArray, datosDb }  = resultadosEnergia || {datosArray : null, datosDb : null} 
    const filtrarValoresObligatorios = datosArray?.filter( (r) => r.resultado !== '' )

    return (
        <>
        {
            filtrarValoresObligatorios && (
            <div className="px-4 sm:px-6 lg:px-8 bg-white rounded-md border border-neutral-200 p-2">
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                Variable
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Resultado
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Unidades
                            </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filtrarValoresObligatorios.map((item) => (
                            <tr key={item.nombre}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-normal text-gray-600 sm:pl-0">
                                {item.nombre}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.resultado}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.unidad}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                {
                    mostrarGuardar ? (
                    <button
                        type="button"
                        onClick={() => guardarDatosBD(datosDb)}
                        className="mx-auto mt-3 rounded bg-blue-500 px-2 h-6 text-xs text-white shadow-sm outline-2 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                        >
                        Guardar
                    </button>
                ):
                null
                }
                </div>
            )
        }
        </>
      )
}
