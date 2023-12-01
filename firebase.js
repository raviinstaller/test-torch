import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAhuX9rqLwhBvPNTdQ4b12KqGlvTPGUbLI",
  authDomain: "test-maker-3b884.firebaseapp.com",
  projectId: "test-maker-3b884",
  storageBucket: "test-maker-3b884.appspot.com",
  messagingSenderId: "88811911641",
  appId: "1:88811911641:web:bf19771943dadfdc2001c8",
  measurementId: "G-BRN1E277HS",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
