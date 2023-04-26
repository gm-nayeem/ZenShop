import { initializeApp } from "firebase/app";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrr09oKGgKZZOwf2eeR8foep-cmwhS_mk",
  authDomain: "react-e-commerce-app-56a5a.firebaseapp.com",
  projectId: "react-e-commerce-app-56a5a",
  storageBucket: "react-e-commerce-app-56a5a.appspot.com",
  messagingSenderId: "912557712643",
  appId: "1:912557712643:web:c0f0bd57351d12a62cb536"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;