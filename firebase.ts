// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics"
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNOZ3bC_QVQpwW25MW1VbF_dV4zT9_uTM",
  authDomain: "reds-fit-v2.firebaseapp.com",
  projectId: "reds-fit-v2",
  storageBucket: "reds-fit-v2.appspot.com",
  messagingSenderId: "144711859310",
  appId: "1:144711859310:web:dd187e6c29fb03ba8ffa7f",
  measurementId: "G-T2PF9GNQHM",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export default app
