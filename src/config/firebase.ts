import { initializeApp } from "firebase/app";
import { getAuth, deleteUser } from "firebase/auth";
import { getFirestore, collection, getDocs, query, where, doc, updateDoc, deleteDoc, onSnapshot, limit, startAfter, orderBy } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDFdDA4nYHhOVEza_sw7U0Hcf2R9dQDrc8",
    authDomain: "management-system-ce46e.firebaseapp.com",
    projectId: "management-system-ce46e",
    storageBucket: "management-system-ce46e.firebasestorage.app",
    messagingSenderId: "911559437974",
    appId: "1:911559437974:web:3fc1eac46aa8f098b31cb7",
    measurementId: "G-1LD28EPX6S"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, collection, getDocs, query, where, doc, updateDoc, deleteDoc, onSnapshot, limit, startAfter, orderBy, getAuth, deleteUser };
