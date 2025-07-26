// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtJS7wuxN0GiS9ZyIYWO_CEZpmAtsxQRU",
  authDomain: "streetfoodsourcing.firebaseapp.com",
  projectId: "streetfoodsourcing",
  storageBucket: "streetfoodsourcing.firebasestorage.app",
  messagingSenderId: "110779923042",
  appId: "1:110779923042:web:521541a9c3827fd1232f3b",
  measurementId: "G-8844M6C16G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics (only in browser)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, analytics };