import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDMH48GKUyf1u3iqVDckFGK3nxh7Z26Wlg",
    authDomain: "modergis.firebaseapp.com",
    databaseURL: "https://modergis-default-rtdb.firebaseio.com",
    projectId: "modergis",
    storageBucket: "modergis.appspot.com",
    messagingSenderId: "757900474701",
    appId: "1:757900474701:web:e12513de37013a9bee5f04"
  };

const app = initializeApp(firebaseConfig);
// export const db = getDatabase(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
