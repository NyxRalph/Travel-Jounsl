import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBQCZrA9xYF6wNVQyCoxFpaN5IC0MFrs_8",
  authDomain: "travel-journal-319ba.firebaseapp.com",
  projectId: "travel-journal-319ba",
  storageBucket: "travel-journal-319ba.firebasestorage.app",
  messagingSenderId: "1011283130781",
  appId: "1:1011283130781:web:1ebab1220fbb4913881774",
  measurementId: "G-JLTZM8NE6K"
};

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const auth = getAuth(app);
// export const db = getFirestore(app);



const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);