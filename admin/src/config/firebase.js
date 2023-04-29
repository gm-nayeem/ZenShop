import { initializeApp } from "firebase/app";
import { FIREBASE_API_KEY, FIREBASE_APP_ID } from "../private/URL";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "zenshop-a95d9.firebaseapp.com",
  projectId: "zenshop-a95d9",
  storageBucket: "zenshop-a95d9.appspot.com",
  messagingSenderId: "378539980411",
  appId: FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;