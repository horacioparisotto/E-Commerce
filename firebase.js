import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "fir-3d287.firebaseapp.com",
  projectId: "fir-3d287",
  storageBucket: "fir-3d287.appspot.com",
  messagingSenderId: "700699469907",
  appId: "1:700699469907:web:10874bea87fa66e87b7ea6",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

export default db;
