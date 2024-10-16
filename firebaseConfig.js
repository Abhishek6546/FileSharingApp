// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAi-edSG20t7OVyrBQTBj-SNiasHmEZqDE",
  authDomain: "file-sharing-286ab.firebaseapp.com",
  projectId: "file-sharing-286ab",
  storageBucket: "file-sharing-286ab.appspot.com",
  messagingSenderId: "213012764314",
  appId: "1:213012764314:web:8dfb4e96834db482547123",
  measurementId: "G-JDFT4JRJHH"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);