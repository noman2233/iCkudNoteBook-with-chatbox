import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCpgEB7NrPKeAhl5dRGvv0aR-pU3CGQ6xM",
  authDomain: "hanzlaswarwar.firebaseapp.com",
  projectId: "hanzlaswarwar",
  storageBucket: "hanzlaswarwar.appspot.com",
  messagingSenderId: "622260312362",
  appId: "1:622260312362:web:19019965d199d7153aa653",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
