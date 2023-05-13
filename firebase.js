import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHTD7nsKDCGsb6mQzlTX_BKMCBdSklAJw",
  authDomain: "todolist-2f34f.firebaseapp.com",
  projectId: "todolist-2f34f",
  storageBucket: "todolist-2f34f.appspot.com",
  messagingSenderId: "524613970695",
  appId: "1:524613970695:web:6e752f0e605e39f310b3a2",
  measurementId: "G-M7KSP329C8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
export {
    auth,
    db,
  }