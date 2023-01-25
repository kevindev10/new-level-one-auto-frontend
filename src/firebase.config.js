
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDTcJTYUMoNphQudBzHCyIkn-jYlYx-D4",
  authDomain: "new-level-one-auto.firebaseapp.com",
  projectId: "new-level-one-auto",
  storageBucket: "new-level-one-auto.appspot.com",
  messagingSenderId: "633934844077",
  appId: "1:633934844077:web:7f8677944f416ad323f624",
  measurementId: "G-CY0EPJWLQX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const db = getFirestore()