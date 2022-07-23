import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "teamalpha-a6e7e.firebaseapp.com",
  projectId: "teamalpha-a6e7e",
  storageBucket: "teamalpha-a6e7e.appspot.com",
  messagingSenderId: "869397455643",
  appId: "1:869397455643:web:7fc77348e4e966c56869be",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);
