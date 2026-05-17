import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB3OZSQxIGv4rk6iUvMjQrwJft9WVkYNJg",
  authDomain: "passeasydrivingschool.firebaseapp.com",
  projectId: "passeasydrivingschool",
  storageBucket: "passeasydrivingschool.firebasestorage.app",
  messagingSenderId: "849446256667",
  appId: "1:849446256667:web:6d6a15d4b11db8f71ab8be"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
