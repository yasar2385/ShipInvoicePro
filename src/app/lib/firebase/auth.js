// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbt2x6yvOlb-UneCsnWXOta_vQQuGFfs8",
  authDomain: "ship-invoice-pro.firebaseapp.com",
  projectId: "ship-invoice-pro",
  storageBucket: "ship-invoice-pro.firebasestorage.app",
  messagingSenderId: "1001176565330",
  appId: "1:1001176565330:web:80ad29e7b63f82639d818b",
  measurementId: "G-ELKMZEPXLY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);