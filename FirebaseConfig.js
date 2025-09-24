import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAAOd7v0aWzor01aOEiORcracHxCZFFKd0",
  authDomain: "edunova-app.firebaseapp.com",
  projectId: "edunova-app",
  storageBucket: "edunova-app.firebasestorage.app",
  messagingSenderId: "961730110564",
  appId: "1:961730110564:web:49e87e7d27cf678ac4ab71",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
