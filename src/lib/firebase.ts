import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

// Firebase configuration with default values for quick development
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAwkvj9hpSA5Qfr4iKR2v2ln1hZ7OoA23E",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "social-poll-app-dev.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "social-poll-app-dev",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "social-poll-app-dev.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "451677109650",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:451677109650:web:64a46b34f934e65f65ba84",
};

// Log configuration to help debug
console.log("Firebase Config:", {
  apiKey: firebaseConfig.apiKey?.substring(0, 5) + '...',
  projectId: firebaseConfig.projectId,
});

// Initialize Firebase
let app;
let db;
let auth;

try {
  // Check if Firebase has been initialized
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  
  // Initialize Firestore and Auth
  db = getFirestore(app);
  auth = getAuth(app);
  
  // Log successful initialization
  console.log("Firebase initialized successfully with project ID:", firebaseConfig.projectId);
} catch (error) {
  console.error("Error initializing Firebase:", error);
  
  // Create fallback for testing
  app = null;
  db = null;
  auth = null;
}

export { app, db, auth };
