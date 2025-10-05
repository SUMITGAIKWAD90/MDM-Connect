// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9Eg308_O4FTfAZv4ksC36TMvi6DQqGGc",
  authDomain: "mid-day-meal-scheme.firebaseapp.com",
  projectId: "mid-day-meal-scheme",
  storageBucket: "mid-day-meal-scheme.appspot.com",
  messagingSenderId: "331333946183",
  appId: "1:331333946183:web:93521ae67ea5b812e61a62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
