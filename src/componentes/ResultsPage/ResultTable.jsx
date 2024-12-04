import React, { useState, useEffect } from 'react';
import  { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore'
import { db } from '../../config/dbConfig'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Table = ({ title, data }) => (
  <>
    <h4 className="text-lg font-semibold mt-6 mb-2">{title}</h4>
    <table className="min-w-full table-auto border-collapse border border-gray-400">
      <thead className="bg-gray-200">
        <tr>
          {Object.keys(data[0]).map((header, index) => (
            <th key={index} className="px-4 py-2 border border-gray-400">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className={rowIndex % 2 === 0 ? '' : 'bg-gray-50'}>
            {Object.values(row).map((cell, cellIndex) => (
              <td key={cellIndex} className="px-4 py-2 border border-gray-400">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </>
);

export const ResultTable = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const q = query(collection(db, "registros_solar"), where("calculoCompleto", "==", true));
      const datosSnapshot = await getDocs(q);
      // filter the data base in the field calculoCompleto = true
      const formatoLista = datosSnapshot.docs.map(element => ({
        id: element.id,
        ...element.data()
      }));
      
      setProjects(formatoLista);
    };

    fetchProjects();
  }, []);

  const handleProjectChange = (event) => {
    const projectId = event.target.value;
    const selected = projects.find(project => project.id === projectId);
    setSelectedProject(selected);
  };

  const renderProjectData = () => {
    if (!selectedProject) return null;

    const tables = [
      {
        title: "1. Potencia Solar",
        data: [
          {
            "Potencia Eléctrica (MW)": selectedProject.potenciaFotovoltaica,
            "Generación (GWh/año)": selectedProject.generacionAnual,
          }
        ]
      },
      {
        title: "2. Producción de Hidrógeno",
        data: [
          {
            "Hidrógeno Bruto - Potencial (Ton H2/año)": selectedProject.hidrogenoPotencial,
            "Hidrógeno Real (Ton H2/año)": selectedProject.hidrogenoReal,
            "Electricidad requerida (GWh/año)": selectedProject.electricidadRequerida,
            "Stack (1250kW consumo)": selectedProject.numeroStacks,
          }
        ]
      },
      {
        title: "3. Demanda de agua Sostenible",
        data: [
          {
            "Demanda de agua para H₂ (Mm³)": (selectedProject.hidrogenoReal * 0.0239).toFixed(2),
            "Oferta Bruta de Agua Cuenca, M-C (Mm³)": "121063.7",
            "Oferta Neta de Agua I.A - ENSO (Mm³)": "48425.5",
            "Participación en el Uso Cuenca M - C (%)": ((selectedProject.hidrogenoReal * 0.0239 / 48425.5) * 100).toFixed(4),
          }
        ]
      },
      {
        title: "4. Sustitución de Combustibles",
        data: [
          {
            "Consumo Diesel Oil (Tjoule)": selectedProject.balance["Consumo Diesel Oil"].Valor,
            "Consumo Gasolina Motor (Tjoule)": selectedProject.balance["Consumo Gasolina Motor"].Valor,
            "Consumo Carbón Mineral (Tjoule)": selectedProject.balance["Consumo Carbon Mineral"].Valor,
            "Consumo Gas Natural (Tjoule)": selectedProject.balance["Consumo Gas Natural"].Valor,
            "Otros Consumos (Tjoule)": selectedProject.balance["Otros consumos"].Valor,
          }
        ]
      },
      {
        title: "5. BALANCE DE HIDROGENO VERDE (TON H2)",
        data: [
          {
            "PRODUCCION de hidrógeno Verde": selectedProject.hidrogenoReal,
            "PRODUCCION hidrógeno Verde Solar": selectedProject.hidrogenoReal,
            "Sustitución TRANSPORTE": (parseFloat(selectedProject.balance["Consumo Diesel Oil"].Valor) + parseFloat(selectedProject.balance["Consumo Gasolina Motor"].Valor)).toFixed(2),
            "Sustitución INDUSTRIA": (parseFloat(selectedProject.balance["Consumo Carbon Mineral"].Valor) + parseFloat(selectedProject.balance["Consumo Gas Natural"].Valor)).toFixed(2),
            "MATERIA PRIMA ABONOS": (selectedProject.hidrogenoReal * 0.0374).toFixed(2),
            "BALANCE": "0.0",
          }
        ]
      },
      {
        title: "6. EMISIONES DE CO₂ (Kton)",
        data: [
          {
            "EMISIONES EVITADAS": selectedProject.emisionesEvitadas,
            "Generación SOLAR": selectedProject.emisionesEvitadas,
            "Generación EÓLICA": "0.0",
            "EMISIONES POR CONSUMO": (
              parseFloat(selectedProject.emissions["Emisiones Diesel Oil"].Valor) +
              parseFloat(selectedProject.emissions["Emisiones Gasolina Motor"].Valor) +
              parseFloat(selectedProject.emissions["Emisiones Carbon Mineral"].Valor) +
              parseFloat(selectedProject.emissions["Emisiones Gas Natural"].Valor)
            ).toFixed(2),
            "TOTAL EMISIONES DE CO₂": (
              parseFloat(selectedProject.emisionesEvitadas) +
              parseFloat(selectedProject.emissions["Emisiones Diesel Oil"].Valor) +
              parseFloat(selectedProject.emissions["Emisiones Gasolina Motor"].Valor) +
              parseFloat(selectedProject.emissions["Emisiones Carbon Mineral"].Valor) +
              parseFloat(selectedProject.emissions["Emisiones Gas Natural"].Valor)
            ).toFixed(2),
          }
        ]
      },
    ];

    return tables.map((table, index) => (
      <Table key={index} title={table.title} data={table.data} />
    ));
  };

  const downloadExcel = () => {
    if (!selectedProject) return;

    const workbook = XLSX.utils.book_new();
    const tables = [
      {
        title: "1. Potencia Solar",
        alt_ : "Potencia Solar",
        data: [
          {
            "Potencia Eléctrica (MW)": selectedProject.potenciaFotovoltaica,
            "Generación (GWh/año)": selectedProject.generacionAnual,
          }
        ]
      },
      {
        title: "2. Producción de Hidrógeno",
        alt_ : "Prod H2",
        data: [
          {
            "Hidrógeno Bruto - Potencial (Ton H2/año)": selectedProject.hidrogenoPotencial,
            "Hidrógeno Real (Ton H2/año)": selectedProject.hidrogenoReal,
            "Electricidad requerida (GWh/año)": selectedProject.electricidadRequerida,
            "Stack (1250kW consumo)": selectedProject.numeroStacks,
          }
        ]
      },
      {
        title: "3. Demanda de agua Sostenible",
        alt_ : "Demanda H2O",
        data: [
          {
            "Demanda de agua para H₂ (Mm³)": (selectedProject.hidrogenoReal * 0.0239).toFixed(2),
            "Oferta Bruta de Agua Cuenca, M-C (Mm³)": "121063.7",
            "Oferta Neta de Agua I.A - ENSO (Mm³)": "48425.5",
            "Participación en el Uso Cuenca M - C (%)": ((selectedProject.hidrogenoReal * 0.0239 / 48425.5) * 100).toFixed(4),
          }
        ]
      },
      {
        title: "4. Sustitución de Combustibles",
        alt_ : "Sust Comb",
        data: [
          {
            "Consumo Diesel Oil (Tjoule)": selectedProject.balance["Consumo Diesel Oil"].Valor,
            "Consumo Gasolina Motor (Tjoule)": selectedProject.balance["Consumo Gasolina Motor"].Valor,
            "Consumo Carbón Mineral (Tjoule)": selectedProject.balance["Consumo Carbon Mineral"].Valor,
            "Consumo Gas Natural (Tjoule)": selectedProject.balance["Consumo Gas Natural"].Valor,
            "Otros Consumos (Tjoule)": selectedProject.balance["Otros consumos"].Valor,
          }
        ]
      },
      {
        title: "5. BALANCE DE HIDROGENO VERDE (TON H2)",
        alt_ : "Balance H2",
        data: [
          {
            "PRODUCCION de hidrógeno Verde": selectedProject.hidrogenoReal,
            "PRODUCCION hidrógeno Verde Solar": selectedProject.hidrogenoReal,
            "Sustitución TRANSPORTE": (parseFloat(selectedProject.balance["Consumo Diesel Oil"].Valor) + parseFloat(selectedProject.balance["Consumo Gasolina Motor"].Valor)).toFixed(2),
            "Sustitución INDUSTRIA": (parseFloat(selectedProject.balance["Consumo Carbon Mineral"].Valor) + parseFloat(selectedProject.balance["Consumo Gas Natural"].Valor)).toFixed(2),
            "MATERIA PRIMA ABONOS": (selectedProject.hidrogenoReal * 0.0374).toFixed(2),
            "BALANCE": "0.0",
          }
        ]
      },
      {
        title: "6. EMISIONES DE CO₂ (Kton)",
        alt_ : "Emisiones CO2",
        data: [
          {
            "EMISIONES EVITADAS": selectedProject.emisionesEvitadas,
            "Generación SOLAR": selectedProject.emisionesEvitadas,
            "Generación EÓLICA": "0.0",
            "EMISIONES POR CONSUMO": (
              parseFloat(selectedProject.emissions["Emisiones Diesel Oil"].Valor) +
              parseFloat(selectedProject.emissions["Emisiones Gasolina Motor"].Valor) +
              parseFloat(selectedProject.emissions["Emisiones Carbon Mineral"].Valor) +
              parseFloat(selectedProject.emissions["Emisiones Gas Natural"].Valor)
            ).toFixed(2),
            "TOTAL EMISIONES DE CO₂": (
              parseFloat(selectedProject.emisionesEvitadas) +
              parseFloat(selectedProject.emissions["Emisiones Diesel Oil"].Valor) +
              parseFloat(selectedProject.emissions["Emisiones Gasolina Motor"].Valor) +
              parseFloat(selectedProject.emissions["Emisiones Carbon Mineral"].Valor) +
              parseFloat(selectedProject.emissions["Emisiones Gas Natural"].Valor)
            ).toFixed(2),
          }
        ]
      },
    ];

    for (let i = 0; i < tables.length; i++) {
      const worksheet = XLSX.utils.json_to_sheet(tables[i].data);
      XLSX.utils.book_append_sheet(workbook, worksheet, tables[i].alt_);
    }
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, `data_results.xlsx`);
  };

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">MÓDULO DE RESULTADOS</h2>
      <div className="mb-4">
        <label htmlFor="projectSelect" className="block text-sm font-medium text-gray-700">
          Seleccionar Proyecto:
        </label>
        <select
          id="projectSelect"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          onChange={handleProjectChange}
          value={selectedProject?.id || ''}
        >
          <option value="">Seleccione un proyecto</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.nombreProyecto} - {project.municipio} - {project.fechaGuardado}
            </option>
          ))}
        </select>
      </div>

      {selectedProject && (
        <>
          <p className="text-lg mb-6"><strong>PROYECTO:</strong> {selectedProject.municipio}</p>
          <h3 className="text-xl font-semibold mb-2">RESULTADOS Hidrógeno Verde Solar</h3>
          {renderProjectData()}
          <button
            onClick={downloadExcel}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Descargar Resultados en Excel
          </button>
        </>
      )}
    </div>
  );
};

