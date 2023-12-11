import { db } from './db/dbConfig';
import { collection, addDoc } from "firebase/firestore";
import { obtenerMunicipio } from './obtenerMunicipio';

async function guardarRegistrosEolica100 ( valorVelocidadViento, lng, lat ){
    // Fecha actual
    const fechaActual    = new Date().toLocaleString()
    // Coordenadas del calculo
    const coordenadas    = [lng, lat]
    // Municipio del calculo
    const municipio      = obtenerMunicipio(lng, lat)
    // Velocidad de viento capturado
    const velocidadViento   = `${valorVelocidadViento.toFixed(2)} m/s`
    // Coeficiente de maquina ingresado
    const coeficienteMaquina = parseFloat(document.getElementById("coef_maquina_100").value)
    // Diametro del rotor
    const diametroRotor = parseFloat(document.getElementById("diametro_rotor_100").value) // DR
    // Factor de planta
    const factorPlanta = parseFloat(document.getElementById("factor_planta_eo_100").value)
    // Potencia eolica calculada
    const potenciaEolica =   document.getElementById("resultado_potencia_eo_100").innerHTML 
    // Generacion anual de energia Eólica
    const generacionAnualEolica =  document.getElementById("resultado_generacion_eo_100").innerHTML
    // Área disponible 
    const areaCapturada = parseFloat(document.getElementById("area_lote_100").value) // AreaLote
    const areaLoteHa =  areaCapturada !== '' ? areaCapturada : 'NA'
 
    // Numero de aerogeneradores
    const numeroAerogeneradores = areaCapturada !== '' ? document.getElementById("resultado_aerogen_100").innerHTML : 'NA'
    // Potencia parque eolico
    const potenciaParqueEolico = areaCapturada !== '' ? document.getElementById("resultado_pot_parque_eolico_100").innerHTML : 'NA'
    // Generación parque eolico
    const generacionParqueEolico = areaCapturada !== '' ? document.getElementById("resultado_gen_parque_eolico_100").innerHTML : 'NA'  

    const datosRegistro = {
        fechaGuardado : fechaActual,
        coordenadas : coordenadas,
        municipio : municipio,
        AlturaVelocidadViento : '100 m' ,  
        velocidadViento :  velocidadViento,
        coeficienteMaquina : coeficienteMaquina,
        diametroRotor : diametroRotor,
        factorPlanta : factorPlanta,
        potenciaEolica : potenciaEolica,
        generacionAnualEolica : generacionAnualEolica,
        areaLoteHa : areaLoteHa,
        numeroAerogeneradores : numeroAerogeneradores,
        potenciaParqueEolico : potenciaParqueEolico,
        generacionParqueEolico :  generacionParqueEolico

    }

    try 
      {
        const docRef = await addDoc(collection(db, "registros_eolica"), datosRegistro);
        alert("Registro guardado con id: " + docRef.id + "");
      } 
    catch (e) 
      {
        alert("Se ha presentado un error al guardar el registro")
      }
}

window.guardarRegistrosEolica100 = guardarRegistrosEolica100;
