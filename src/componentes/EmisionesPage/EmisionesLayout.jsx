import { useState, useEffect } from "react";
export const EmisionesLayout = () => {

    const [datosForm, setDatosForm] = useState({
        generacion_solar: 0,
        generacion_eolica: 0,
        emision_diesel_transporte: 0,
        emision_gasolina_transporte: 0,
        emision_carbon_industria: 0,
        emision_gas_industria: 0

    })

    const [ datosCalculados, setDatosCalculados ] = useState({
        emisiones_evitadas_solar: 0,
        emisiones_evitadas_eolica: 0,
        emisiones_sustituidas_diesel: 0,
        emisiones_sustituidas_gasolina: 0,
        emisiones_sustituidas_carbon: 0,
        emisiones_sustituidas_gas: 0

    })

    const [totalEmisiones, setTotalEmisiones] = useState(0)

    const calcularEmisiones = () => {
        const emisiones_evitadas_solar = parseFloat(datosForm.generacion_solar  * 25 * 0.662).toFixed(2)
        const emisiones_evitadas_eolica = parseFloat(datosForm.generacion_eolica * 25 * 0.662).toFixed(2)
        const emisiones_sustituidas_diesel = parseFloat(datosForm.emision_diesel_transporte * 0.0752).toFixed(2)
        const emisiones_sustituidas_gasolina = parseFloat(datosForm.emision_gasolina_transporte  * 0.0692).toFixed(2)
        const emisiones_sustituidas_carbon = parseFloat(datosForm.emision_carbon_industria * 0.0881).toFixed(2)
        const emisiones_sustituidas_gas = parseFloat(datosForm.emision_gas_industria * 0.0555).toFixed(2)
        const total_emisiones = parseFloat(emisiones_evitadas_solar + emisiones_evitadas_eolica + emisiones_sustituidas_diesel + emisiones_sustituidas_gasolina + emisiones_sustituidas_carbon + emisiones_sustituidas_gas).toFixed(2)

        setDatosCalculados({
            generacion_solar: emisiones_evitadas_solar,
            generacion_eolica: emisiones_evitadas_eolica,
            emision_diesel_transporte: emisiones_sustituidas_diesel,
            emision_gasolina_transporte: emisiones_sustituidas_gasolina,
            emision_carbon_industria: emisiones_sustituidas_carbon,
            emision_gas_industria: emisiones_sustituidas_gas,
            total_emisiones: total_emisiones
        })
    }
    
    const calcularTotalEmisiones = () => {
        console.log(datosCalculados)
        const total = Object.values(datosCalculados)
                      .map(val => parseFloat(val)) 
                      .reduce((acc, val) => acc + val)
                      .toFixed(2)
        setTotalEmisiones(total)

    }


    useEffect(() => {   
        calcularEmisiones()
        // calcularTotalEmisiones()
    }, [datosForm])

    useEffect(() => {  
        calcularTotalEmisiones()
    }, [datosCalculados])
    
    const mapeoDatosForm = {
         generacion_solar: 'Emisiones evitadas CO2 solar (KTon)',
         generacion_eolica: 'Emisiones evitadas CO2 eólica (KTon)',
         emision_diesel_transporte: 'Emisiones sustituidas CO2 Diesel transporte (KTon)',
         emision_gasolina_transporte: 'Emisiones sustituidas CO2 Gasolina transporte (KTon)',
         emision_carbon_industria: 'Emisiones sustituidas CO2 Carbon industria (KTon)',
         emision_gas_industria: 'Emisiones sustituidas CO2 Gas industria (KTon)'
    }

    const handleFormChange = (e) => {
        setDatosForm({
            ...datosForm,
            [e.target.name]: e.target.value
        })
    }

    console.log(datosForm)
    console.log(datosCalculados)

    return (
        <>
        <h1 className="text-3xl text-center mt-10">Simulación de emisiones</h1>
        <div className="flex justify-center gap-3 w-full mx-auto mt-3 mb-20">
            {/* Crear formulario que permita ingresar un valor flotante */}
            <form className="w-2/6">
            <h4 className="text-lg font-bold mt-5">Emisiones evitadas</h4>
            <div>
                <label htmlFor="generacion_solar">
                    Generación energía solar (GWh/año)
                </label>
                <input
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="number"
                    value={datosForm.generacion_solar}
                    id="generacion_solar"
                    name="generacion_solar"
                    onChange={handleFormChange}
                    />
            </div>

            <div>
                <label htmlFor="generacion_eolica">
                    Generación energía eólica (GWh/año)
                </label>
                <input
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="number"
                    value={datosForm.generacion_eolica}
                    id="generacion_eolica"
                    name="generacion_eolica"
                    onChange={handleFormChange}
                    />
            </div>

            <h4 className="text-lg font-bold mt-5">Emisiones por sustitución</h4>

            <div>
                <label htmlFor="emision_diesel_transporte">
                    Emisiones Diesel oil sector transporte (TJoules)
                </label>
                <input
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="number"
                    value={datosForm.emision_diesel_transporte}
                    id="emision_diesel_transporte"
                    name="emision_diesel_transporte"
                    onChange={handleFormChange}
                    />
            </div>

            <div>
                <label htmlFor="emision_gasolina_transporte">
                    Emisiones Gasolina sector transporte (TJoules)
                </label>
                <input
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="number"
                    value={datosForm.emision_gasolina_transporte}
                    id="emision_gasolina_transporte"
                    name="emision_gasolina_transporte"
                    onChange={handleFormChange}
                    />
            </div>

            <div>
                <label htmlFor="emision_carbon_industria">
                    Emisiones carbon sector industria (TJoules)
                </label>
                <input
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="number"
                    value={datosForm.emision_carbon_industria}
                    id="emision_carbon_industria"
                    name="emision_carbon_industria"
                    onChange={handleFormChange}
                    />
            </div>

            <div>
                <label htmlFor="emision_gas_industria">
                    Emisiones gas sector industria (TJoules)
                </label>
                <input
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="number"
                    value={datosForm.emision_gas_industria}
                    id="emision_gas_industria"
                    name="emision_gas_industria"
                    onChange={handleFormChange}
                    />
            </div>
            </form>

            <div className="w-3/6 flex justify-center">
                <table>
                    <thead>
                        <tr>
                            <th>Emisiones</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(datosForm).map((key) => (
                                <tr key={key}>
                                    <td><i>{mapeoDatosForm[key]}</i></td>
                                    <td><b>{datosCalculados[key]}</b></td>
                                </tr>
                            ))
                        }
                        {
                            totalEmisiones &&
                            <tr>
                                <td>Total emisiones</td>
                                <td>{totalEmisiones} Kton</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )

}