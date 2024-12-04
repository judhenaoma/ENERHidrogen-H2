import React, {useEffect } from "react";
// import { sankeyColombia } from "../../../data/sankey-colombia";

export const FormularioMatrizEnergetica2030 = ({datosTorta, setDatosTorta, totalQuemado}) => {


  console.log(datosTorta)

  const handleSubmit = (e) => {
    e.preventDefault();
  
  };

  useEffect(() => {
    // Verificar que los valores sumen 100, si se sobre pasa debe mostrar un mensaje de error
    const suma = datosTorta.reduce((acc, dato) => acc + dato.x, 0);
    // if (suma > totalQuemado) {
    //   alert("La suma de los valores no puede ser mayor a " + totalQuemado + ", suma actual: " + parseFloat(suma).toFixed(2));
    // }
    // const nuevosPorcentajes = datosTorta.map((dato) => {
    //   return { ...dato, y: parseFloat((dato.x / totalQuemado) * 100).toFixed(2) };
    // });
    // setDatosTorta(nuevosPorcentajes);

  }, [datosTorta])

  const handleChange = (e, id) => {
    const { value } = e.target;
    const newDatos = datosTorta.map((dato) => {
      if(dato.id === id){
        const newX = parseInt(value);
        const nuevoLabel = `${dato.nombre} (${newX} MW)`;
        return { ...dato, x: newX, y: parseFloat((parseInt(value) / totalQuemado) * 100).toFixed(2), label : nuevoLabel };
      }
      return dato;
    });
    setDatosTorta(newDatos)
  };

  const totalCalculado = totalQuemado - datosTorta.reduce((acc, dato) => acc + dato.x, 0)

  const handlingSubmit = (e) => {
    e.preventDefault
  }


  return ( 
    <div className="grid grid-cols-1 md:grid-cols-4 mx-auto">
      <p>Valores en Tj</p>
      { datosTorta &&
              datosTorta.map((entrada, i) => (
                <form onSubmit={handlingSubmit}>
                  <div key={i}>
                    <label className="text-sm" htmlFor={entrada.id}>
                      {entrada.nombre}
                    </label>
                    <input
                      className = "mt-1 block w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      type="number"
                      step={0.1}
                      value={entrada.x}
                      id={entrada.id}
                      name={entrada.id}
                      onChange={ (e) => handleChange(e, entrada.id) }
                    />
                  </div>
                </form>
        ))
      }
      {
        totalCalculado > 0 && <p className="text-red-500">Faltan {totalCalculado} MW por asignar</p>
      }
      {
        totalCalculado < 0 && <p className="text-red-500">Se han asignado {Math.abs(totalCalculado)} MW de más</p>
      }
    </div>
  );
};
