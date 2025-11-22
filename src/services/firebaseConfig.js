
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsQ6RGl4iD9Z-Estf9OY7-PU1x_quYegw",
  authDomain: "super-fortnight-007.firebaseapp.com",
  projectId: "super-fortnight-007",
  storageBucket: "super-fortnight-007.firebasestorage.app",
  messagingSenderId: "793273571936",
  appId: "1:793273571936:web:31a6c44962233dfb28c105",
  measurementId: "G-5GBM241QVT"
};

// Initializes Firebase
const app = initializeApp(firebaseConfig);

// Exports
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});