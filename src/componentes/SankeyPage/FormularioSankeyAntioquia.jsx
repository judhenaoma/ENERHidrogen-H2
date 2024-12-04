import React, { useState, useEffect } from "react";
// import { sankeyColombia } from "../../../data/sankey-colombia";

export const FormularioSankeyAntioquia = ({datosSankeyColombia, setDatosSanketColombia}) => {

  
  const [datosPartidos, setDatosPartidos] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  useEffect(() => {
    const categorias = partirDatosPorCategoria(datosSankeyColombia.links)
    let datosPartidosPorCategoria = []

    for(let c of categorias){

      const datosCategoria = datosSankeyColombia.links.filter((dato) => dato.categoria === c)
      datosPartidosPorCategoria.push(datosCategoria)      
    }

    console.log(datosPartidosPorCategoria)
    setDatosPartidos(datosPartidosPorCategoria)

  }, [datosSankeyColombia, setDatosSanketColombia])

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Change the value of the link based on the id
    const newLinks = datosSankeyColombia.links.map((link) => {
      if (link.id === name) {
        return { ...link, value: parseInt(value) };
      }
      return link;
    });

    // Update the sum of the target node
    // const newNodes = datosSankeyColombia.nodes.map((node) => {

    //   const targetAltered = newLinks.filter((link) => {
    //     return link.id === name;
    //   });
    //   const targetName = targetAltered[0].target;
    //   const sum = newLinks
    //     .filter((link) => {
    //       return link.target === targetName;  
    //     })
    //     .reduce((acc, link) => acc + link.value, 0);

    //   return { ...node, value: sum };
    // });

    setDatosSanketColombia({...datosSankeyColombia, links: newLinks})
  
  };

  const partirDatosPorCategoria = (datos) => {  
    const categorias = datos.map((dato) => dato.categoria)
    return [...new Set(categorias)]
  }


  console.log(datosSankeyColombia)

  return ( 
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      { datosPartidos &&
        datosPartidos.map((datosCat, ind) => (
          <div key={ind}>
            <h3>{datosCat[0]["categoria"]}</h3>
            {
              datosCat.map((link, i) => (
                <div key={i}>
                  <label className="text-sm" htmlFor={`${link.source}-${link.target}`}>
                    {`${link.source} - ${link.target}`}
                  </label>
                  <input
                    className="mt-1 block w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="number"
                    value={link.value}
                    id={link.id}
                    name={link.id}
                    onChange={handleChange}
                  />
                </div>
              ))
            }
          </div>
        ))

      }
{/* 
      {datosSankeyColombia.links.map((link, i) => (
            <div key={i}>
              <label htmlFor={`${link.source}-${link.target}`}>
                {`${link.source} - ${link.target}`}
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                type="number"
                value={link.value}
                id={link.id}
                name={link.id}
                onChange={handleChange}
              />
            </div>
        ))} */}

    </div>
  );
};
