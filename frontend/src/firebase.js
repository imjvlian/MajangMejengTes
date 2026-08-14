// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "test-portal-3a333.firebaseapp.com",
  projectId: "test-portal-3a333",
  storageBucket: "test-portal-3a333.firebasestorage.app",
  messagingSenderId: "756488907274",
  appId: "1:756488907274:web:7549f440f4c5743ff9cdf3",
  measurementId: "G-BTJBLF5Q28"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
