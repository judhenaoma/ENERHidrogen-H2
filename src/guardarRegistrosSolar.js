import { db } from './db/dbConfig';
import { collection, addDoc } from "firebase/firestore";
import { obtenerMunicipio } from './obtenerMunicipio';

async function guardarRegistrosSolar ( valorRadiacion, lng, lat ){
    // Fecha actual
    const fechaActual       = new Date().toLocaleString()
    // Coordenadas del calculo
    const coordenadas       = [lng, lat]
    // Municipio del calculo
    const municipio         = obtenerMunicipio(lng, lat)
    // Demanda en kWh/día o kWh/año
    const demandaDiaria     = document.getElementById("demanda_diaria_ener").value
    const demandaAnual      = document.getElementById("demanda_anual_ener").value
    const demanda           = demandaDiaria !== '' ? demandaDiaria + ' kWh/día' : demandaAnual + ' kWh/año'
    // Radiacion en el punto de calculo
    const radiacion         = `${valorRadiacion.toFixed(2)} kWh/m2`
    // Potencia calculada
    const potencia          = document.getElementById("resultado_potencia").innerText
    // Generacion anual
    const generacionAnual   = document.getElementById("resultado_generacion").innerText
    // Numero de paneles
    const resultadoPaneles  = document.getElementById("resultado_paneles").innerText
    const numeroPaneles     = resultadoPaneles !== '' ? resultadoPaneles : "NA"
    // Area requerida
    const resultadoArea     = document.getElementById("resultado_area").innerText
    const areaRequerida     = resultadoArea ? resultadoArea : "NA"
 

    const datosRegistro = {
        fechaGuardado : fechaActual,
        coordenadas : coordenadas,
        municipio : municipio,
        demandaEnergia : demanda,
        radiacion : radiacion,
        potencia : potencia,
        generacionAnual : generacionAnual,
        numeroPaneles : numeroPaneles,
        areaRequerida : areaRequerida,  
    }

    try 
      {
        const docRef = await addDoc(collection(db, "registros_solar"), datosRegistro);
        alert("Registro guardado con id: " + docRef.id + "");
      } 
    catch (e) 
      {
        alert("Se ha presentado un error al guardar el registro")
      }
}

window.guardarRegistrosSolar = guardarRegistrosSolar;
