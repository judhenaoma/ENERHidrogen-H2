import DataTable from "react-data-table-component";
import {useEffect, useState, useMemo} from "react";
import FiltradoTabla from "../CombustiblesPage/FiltradoTabla";

export const Tabla = ({ 
  datos, 
  columnasTabla, 
  filterField, 
  titulo, 
  boton, 
  setValorSeleccionadoH2,
  onSelectRecord,
  setProjectoSeleccionado,
  setEmisionesEvitadas
}) => {
  const [columnas, setColumnas] = useState(null);
  const [filas, setFilas] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = filas?.filter(item => item[filterField]
    && item[filterField].toLowerCase().includes(filterText.toLowerCase()));

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };
    return <FiltradoTabla onFilter={e => setFilterText(e.target.value)} onClear={handleClear}
                          filterText={filterText}/>;

  }, [filterText, resetPaginationToggle])

  const customStyles = {

    headCells: {
      style: {
        fontWeight: 500,
        fontSize: '14px'
      },
    },
  };


  useEffect(() => {
    // columnas
    const columnas = columnasTabla
    // const columnasOrdenadas = ordenarArray()
    const estruc = columnas.map((col) => {
      return {
        name: col,
        selector: row => row[col]
      }
    })

    if(boton){
      estruc.push({
        name: 'Acciones',
        cell: (row) => 
        <button 
            onClick={() => {
                handleSelectRecord(row)
                setValorSeleccionadoH2(parseFloat(row.hidrogenoReal))
                setProjectoSeleccionado(row.nombreProyecto)
                setEmisionesEvitadas(row.emisionesEvitadas)
              }
            }
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                Seleccionar
        </button>
      })
    }
    // filas
    const columnasConId = datos.map((row, index) => {
      return {
        id: index,
        ...row
      }
    })
    setColumnas(estruc)
    setFilas(columnasConId)

  }, [datos, columnasTabla])

  const handleSelectRecord = (record) => {
    console.log(record)
    if (onSelectRecord) {
      onSelectRecord(record);
    }
    if (setValorSeleccionadoH2) {
      setValorSeleccionadoH2(record.hidrogenoReal);
    }
  };

  const conditionalRowStyles = [
    {
      when: row => row.Unidades === '',
      style: {
        backgroundColor: '#AFAFAF',
        fontWeight: 'bold'
      },
    },
    {
      when: row => row.Unidades === ' ',
      style: {
        backgroundColor: '#676767',
        fontWeight: 'bold'
      },
    }
  ];


  return (
    <>
      {
        !filas || !columnas && <div className="my-auto mx-auto w-52">Cargando tabla...</div>
      }
      {
        filas && columnas ? (
          <DataTable
            title={titulo}
            columns={columnas}
            data={filteredItems}
            selectableRows = {false}
            customStyles={customStyles}
            paginationResetDefaultPage={resetPaginationToggle}
            subHeader
            conditionalRowStyles={conditionalRowStyles}
            subHeaderComponent={subHeaderComponentMemo}
            persistTableHead
            striped   
          />
        ) : null
      }
    </>
  )
};