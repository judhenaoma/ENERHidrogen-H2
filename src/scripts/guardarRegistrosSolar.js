import { db } from '../config/dbConfig';
import { collection, addDoc } from "firebase/firestore";

async function guardarRegistrosSolar ( datos ){

  console.log(JSON.stringify(datos))

    try 
      {
        const docRef = await addDoc(collection(db, "registros_solar"), datos);
        alert("Registro guardado con id: " + docRef.id + "");
      } 
    catch (e) 
      {
        console.log(e);
        alert("Se ha presentado un error al guardar el registro")
      }
}

export { guardarRegistrosSolar };
