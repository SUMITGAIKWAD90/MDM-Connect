// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database'; // Add this
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Add this

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || 'AIzaSyCJNeqkioEArempCfA85xALhgPbgUk6zPk',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'register01-1ddf6.firebaseapp.com',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'register01-1ddf6',
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL || 'https://register01-1ddf6-default-rtdb.firebaseio.com',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || 'register01-1ddf6.firebasestorage.app',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '421482049095',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || '1:421482049095:web:dee08e9eaa8597c89d0b62',
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-XE9JVLLLN2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

// Initialize Firebase Storage and get a reference to the service
export const storage = getStorage(app);

export default app;
