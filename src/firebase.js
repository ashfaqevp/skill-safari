import { initializeApp , getApp} from "firebase/app";
import { getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase} from "firebase/database";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA1aZ2BuV67WkSk-5VzQ7_yLI1XVC2Oj0c",
  authDomain: "skillsafari-b1ba4.firebaseapp.com",
  projectId: "skillsafari-b1ba4",
  storageBucket: "skillsafari-b1ba4.appspot.com",
  messagingSenderId: "699894677685",
  appId: "1:699894677685:web:82627e30c6907f3baf3efc",
  measurementId: "G-C1FQHF6SX8"
};

const app = initializeApp(firebaseConfig);

const firebaseApp = getApp();
export const auth = getAuth();
export const database = getDatabase(app);
export const db = getFirestore(app);
export const storage = getStorage(firebaseApp, "gs://skillsafari-b1ba4.appspot.com/");