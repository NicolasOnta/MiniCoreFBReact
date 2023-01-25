// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBr5PwI7ci7mNExdN3oa3beN2EvV_H3hBg",
  authDomain: "minicore-17e6f.firebaseapp.com",
  projectId: "minicore-17e6f",
  storageBucket: "minicore-17e6f.appspot.com",
  messagingSenderId: "786499803997",
  appId: "1:786499803997:web:57f98db01b266a148766b4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);