import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMH48GKUyf1u3iqVDckFGK3nxh7Z26Wlg",
  authDomain: "modergis.firebaseapp.com",
  projectId: "modergis",
  storageBucket: "modergis.appspot.com",
  messagingSenderId: "757900474701",
  appId: "1:757900474701:web:e12513de37013a9bee5f04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);