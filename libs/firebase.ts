// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyp7GZSUqlT67ujCauuUIkzd5Ts121uEU",
  authDomain: "e-commerce-shop-3ff47.firebaseapp.com",
  projectId: "e-commerce-shop-3ff47",
  storageBucket: "e-commerce-shop-3ff47.appspot.com",
  messagingSenderId: "467677461987",
  appId: "1:467677461987:web:6bb9667e06c0a0eacf74d6",
  measurementId: "G-DY5H3C48WD",
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseapp);

export default firebaseapp;
