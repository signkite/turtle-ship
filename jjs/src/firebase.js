// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCumEeWiQzSoUAG8Fw3EbKZ0_IlOVodKQs",
  authDomain: "turtleship-ba94b.firebaseapp.com",
  projectId: "turtleship-ba94b",
  storageBucket: "turtleship-ba94b.appspot.com",
  messagingSenderId: "891570502717",
  appId: "1:891570502717:web:9ea612e2e598da736b7e54",
  measurementId: "G-E0VF1918WY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
// export const db = getFirestore(app)
export const db = getDatabase(app);
