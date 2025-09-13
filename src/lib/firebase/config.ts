import { initializeApp, getApps, getApp, FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig: FirebaseOptions = {
  "projectId": "studio-5010099105-88d5f",
  "appId": "1:7414441357:web:9227f0a59aba91134e09c4",
  "storageBucket": "studio-5010099105-88d5f.firebasestorage.app",
  "apiKey": "AIzaSyAhMjINnIcW1MD8nE5MSvFCbm4t7yCL-Lc",
  "authDomain": "studio-5010099105-88d5f.firebaseapp.com",
  "messagingSenderId": "7414441357"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
