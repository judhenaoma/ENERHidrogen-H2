import { db } from '../config/dbConfig';
import { collection, addDoc } from "firebase/firestore";

async function guardarRegistrosEolica ( datos ){

    try 
      {
        const docRef = await addDoc(collection(db, "registros_eolica"), datos);
        alert("Registro guardado con id: " + docRef.id + "");
      } 
    catch (e) 
      {
        alert("Se ha presentado un error al guardar el registro")
      }
}

export { guardarRegistrosEolica };
