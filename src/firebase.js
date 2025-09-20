// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnxxng8WGxgSnpTn6hKM216tEYw5lI01A",
  authDomain: "zain-gs-admin.firebaseapp.com",
  projectId: "zain-gs-admin",
  storageBucket: "zain-gs-admin.firebasestorage.app",
  messagingSenderId: "23766203112",
  appId: "1:23766203112:web:adbb9db715a4ebc13ea75d",
  measurementId: "G-M7MKGTE23R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Optional: Initialize Analytics (only if needed)
const analytics = getAnalytics(app);
export const messaging = getMessaging(app);


export default app;
