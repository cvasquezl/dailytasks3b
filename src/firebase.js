
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPUwvZRNsIWTOn5yn8S68FPCgyEKkop68",
  authDomain: "dailytasks-5e50f.firebaseapp.com",
  projectId: "dailytasks-5e50f",
  storageBucket: "dailytasks-5e50f.appspot.com",
  messagingSenderId: "788127852058",
  appId: "1:788127852058:web:f1aac2c76f286c1383d3a3",
  measurementId: "G-62D28X2C37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);