import {useState} from 'react'

export const FormularioH2Eolica = ({guardarResultados, datosCalculoSolar, setTabs}) => {

    const { datosArray, datosDb }  = datosCalculoSolar || {datosArray : null, datosDb : null}
    const [factorPlantaElectrolizador, setFactorPlantaElectrolizador] = useState(null);

    const valorPotenciaTotal = datosArray?.filter( ( dato ) => dato.id === 'potenciaFotovoltaicaTotal')
    // const valorGeneracion = datosArray?.filter(( dato) => dato.id == 'generacionEnergia')

    console.log(valorPotenciaTotal)


    const llenarFactorPlanta = (e) => {
        setFactorPlantaElectrolizador(e.target.value)
    }

    const manejarFormularioH2 = (e) => {
        e.preventDefault()
        const potencia = parseFloat(valorPotenciaTotal[0].resultado)
        const generacionTotal = parseFloat(8760 * potencia * 0.25/1000).toFixed(2)
        const CONSTANTE_CONVERSION = 52.5 // kwh
        const CONSTANTE_STACK = 1250
        const hidrogenoBruto = parseFloat((generacionTotal) / (CONSTANTE_CONVERSION * 1000)).toFixed(2)
        const hidrogenoReal = parseFloat(hidrogenoBruto * factorPlantaElectrolizador).toFixed(2)
        const numeroStacks = Math.ceil(potencia / (CONSTANTE_STACK * 1000))

        const resultadosArrayH2 = [

            {
                nombre : 'Potencia fotovoltaica',
                id : 'potenciaFotovoltaica',
                resultado : potencia,
                unidad : 'Kw'
            },
            {
                nombre : 'Generación de energía',
                id : 'generacionEnergia',
                resultado : generacionTotal,
                unidad : 'Kwh'
            },
            {
                nombre : "Hidrógeno Bruto",
                resultado : hidrogenoBruto,
                id: "hidrogenoBruto",
                unidadades : "Ton H2"
            },
            {
                nombre : "Hidrógeno Real",
                resultado : hidrogenoReal,
                id: "hidrogenoReal",
                unidadades : "Ton H2"
            },
            {
                nombre : "Electricidad Requerida",
                resultado : generacionTotal,
                id: "generacion",
                unidadades : "kW"
            },
            {
                nombre : "Número de Stacks",
                resultado : numeroStacks,
                id: "numeroStacks",
                unidadades : "Unidades"
            }
        ]

        const resultadosBDH2 = {
            ...datosDb,
            hidrogenoPotencial : hidrogenoBruto,
            hidrogenoReal : hidrogenoReal, 
            electricidadRequerida :  generacionTotal,
            numeroStacks : numeroStacks,
        }

        const resultadosH2 = {
            datosArray : resultadosArrayH2,
            datosDb : resultadosBDH2
        }

        guardarResultados(resultadosH2)
        setTabs( (prevTabs) => {
            return prevTabs.map((tab) => ({...tab, dissabled: false}))
        })

    }
  return (
    <div>
        <form onSubmit={manejarFormularioH2}>
            {/* Dimensionar producción de hidrogeno */}
                <div className="flex justify-start items-center w-100 mt-3 ml-5">
                    <label htmlFor="potencia_panel" 
                        className="block text-sm font-normal text-gray-700"
                    >Factor de planta electrolizador (Adim.):
                    </label>
                    <input id="potencia_panel" 
                        name="factor_planta_electrolizador" 
                        type="number" 
                        step="any" 
                        min="0" 
                        max="1"   
                        className="ml-5 p-1 mt-1 h-7 w-28 block rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={factorPlantaElectrolizador}
                        onChange={llenarFactorPlanta}
                    />
                </div>
                <button
                    type="submit"
                    className="mx-auto mt-3 rounded bg-blue-500 px-2 h-6 text-xs text-white shadow-sm outline-2 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                    >
                    Calcular
                </button>
        </form>

    </div>
  )
}
