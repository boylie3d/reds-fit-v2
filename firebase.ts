// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider } from "@firebase/auth"
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "reds-fit-v2.firebaseapp.com",
  projectId: "reds-fit-v2",
  storageBucket: "reds-fit-v2.appspot.com",
  messagingSenderId: "144711859310",
  appId: "1:144711859310:web:dd187e6c29fb03ba8ffa7f",
  measurementId: "G-T2PF9GNQHM",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const provider = new GoogleAuthProvider()
const auth = getAuth()

const firebase = {
  app: app,
  auth: auth,
  provider: provider,
}

export default firebase
