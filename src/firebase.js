import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgApy1QmkaXuY534XsAsV5VQaAMD27RKQ",
  authDomain: "neflix-clone-728c8.firebaseapp.com",
  projectId: "neflix-clone-728c8",
  storageBucket: "neflix-clone-728c8.firebasestorage.app",
  messagingSenderId: "535012842459",
  appId: "1:535012842459:web:17c44c25399b1e844625fe"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'user'),{
      uid: user.uid,
      name,
      authProvider: 'local',
      email
    })
  } catch (error) {
    console.log(error);
    alert(error)
  }
}

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.log(error);
    alert(error);
  }
}

const logout = () => {
  signOut(auth);
}

export {auth, db, login, signup, logout};