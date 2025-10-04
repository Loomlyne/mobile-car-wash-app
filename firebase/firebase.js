// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKSMvfrBCohr3RRNKHS9GGOLYcd2TPJsM",
  authDomain: "royal-service-82b52.firebaseapp.com",
  projectId: "royal-service-82b52",
  storageBucket: "royal-service-82b52.firebasestorage.app",
  messagingSenderId: "513036827085",
  appId: "1:513036827085:web:984586b8e61a8ea4b7ac84",
  measurementId: "G-QDPGML0XN0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize analytics only in supported environments
let analytics = null;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.log('Analytics not supported in this environment');
  }
}
