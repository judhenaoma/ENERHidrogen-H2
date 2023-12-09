import { db } from './db/dbConfig';
import { collection, addDoc } from "firebase/firestore"; 

async function guardarRegistrosSolar ( valorRadiacion, lat, lng ){

    const generacionAnual   = document.getElementById("resultado_generacion").innerText
    const potencia          = document.getElementById("resultado_potencia").innerText
    const radiacion         = valorRadiacion
    const demandaDiaria     = document.getElementById("demanda_diaria_ener").value
    const demandaAnual      = document.getElementById("demanda_anual_ener").value
    const demanda           = demandaDiaria !== '' ? demandaDiaria + 'kWh/día' : demandaAnual + ' kWh/año'
    const resultadoPaneles  = document.getElementById("resultado_paneles").innerText
    const numeroPaneles     = resultadoPaneles !== '' ? resultadoPaneles : "NA"
    const resultadoArea     = document.getElementById("resultado_area").innerText
    const areaRequerida     = resultadoArea ? resultadoArea : "NA"
    const municipio         = "Antioquia"
    const coordenadas       = `[${lat}, ${lng}]`
    const fechaActual       = new Date().toLocaleString()
 

    const datosRegistro = {
        demandaEnergia : demanda,
        potencia : potencia,
        radiacion : radiacion,
        generacionAnual : generacionAnual,
        numeroPaneles : numeroPaneles,
        areaRequerida : areaRequerida,
        municipio : municipio,
        coordenadas : coordenadas,
        fechaGuardado : fechaActual
    }

    try 
      {
        const docRef = await addDoc(collection(db, "registros_solar"), datosRegistro);
        alert("Registro guardado");
      } 
    catch (e) 
      {
        console.error("Error adding document: ", e);
        alert("Se ha presentado un error al guardar el registro")
      }
}

window.guardarRegistrosSolar = guardarRegistrosSolar;
