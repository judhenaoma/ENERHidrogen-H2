import {useState} from 'react'

export const FormularioH2Solar = ({guardarResultados, datosCalculoSolar, setTabs}) => {

    const { datosArray, datosDb }  = datosCalculoSolar || {datosArray : null, datosDb : null} 
    const [factorPlantaElectrolizador, setFactorPlantaElectrolizador] = useState(0.46);
    const [potenciaElectrolizador, setPotenciaElectrolizador] = useState(1250);
    const valorPotenciaTotal = datosArray?.filter( ( dato ) => dato.id == 'potenciaFotovoltaica')
    const valorGeneracionEnergia = datosArray?.filter( ( dato ) => dato.id == 'generacionEnergia')
    const llenarFactorPlanta = (e) => {
        setFactorPlantaElectrolizador(e.target.value)
    }

    const llenarPotenciaElectrolizador = (e) => {
        setPotenciaElectrolizador(e.target.value)
    }

    const manejarFormularioH2 = (e) => {
        e.preventDefault()
        const potencia = valorPotenciaTotal[0].resultado
        const generacionTotal = valorGeneracionEnergia[0].resultado
        const CONSTANTE_CONVERSION = 52.5 // kwh
        const CONSTANTE_STACK = (potenciaElectrolizador / 1000)
        const hidrogenoBruto = parseFloat(((generacionTotal) / (CONSTANTE_CONVERSION)).toFixed(2))
        const hidrogenoReal = parseFloat((hidrogenoBruto * factorPlantaElectrolizador).toFixed(2))
        const numeroStacks = Math.ceil(potencia / (CONSTANTE_STACK))

        const resultadosArrayH2 = [

            {
                nombre : 'Potencia fotovoltaica',
                id : 'potenciaFotovoltaica',
                resultado : potencia,
                unidad : 'Mw'
            },
            {
                nombre : 'Generación de energía',
                id : 'generacionEnergia',
                resultado : generacionTotal,
                unidad : 'Mwh/año'
            },
            {
                nombre : "Hidrógeno Bruto",
                resultado : hidrogenoBruto,
                id: "hidrogenoBruto",
                unidad : "Ton H2"
            },
            {
                nombre : "Hidrógeno Real",
                resultado : hidrogenoReal,
                id: "hidrogenoReal",
                unidad : "Ton H2"
            },
            {
                nombre : "Número de Stacks",
                resultado : numeroStacks,
                id: "numeroStacks",
                unidad : "Unidades"
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
            const actualizarTabs = prevTabs.map( (tab) => ({ ... tab, dissabled : false}))
            return actualizarTabs
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
                <div className="flex justify-start items-center w-100 mt-3 ml-5">
                    <label htmlFor="potencia_electrolizador" 
                        className="block text-sm font-normal text-gray-700"
                    >Potencia del electrolizador (kw):
                    </label>
                    <input id="potencia_electrolizador" 
                        name="potencia_electrolizador" 
                        type="number"
                        placeholder='Potencia electrolizador en kw'   
                        className="ml-5 p-1 mt-1 h-7 w-28 block rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={potenciaElectrolizador}
                        onChange={llenarPotenciaElectrolizador}
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
