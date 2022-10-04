// Import the functions you need from the SDKs you need
import { FirebaseApp, getApps, initializeApp } from "@firebase/app"
import { Auth, getAuth, GoogleAuthProvider } from "@firebase/auth"
import { Firestore, getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "reds-fit-v2.firebaseapp.com",
  projectId: "reds-fit-v2",
  storageBucket: "reds-fit-v2.appspot.com",
  messagingSenderId: "144711859310",
  appId: "1:144711859310:web:dd187e6c29fb03ba8ffa7f",
  measurementId: "G-T2PF9GNQHM",
}

interface FirebaseConfig {
  app: FirebaseApp
  provider: GoogleAuthProvider
  auth: Auth
  db: Firestore
}

const app = getFirebaseApp()
const auth = getAuth(app)
const db = getFirestore(app)
const provider = new GoogleAuthProvider()

const firebase: FirebaseConfig = {
  app: app,
  provider: provider,
  auth: auth,
  db: db,
}

function getFirebaseApp() {
  if (!getApps().length) {
    return initializeApp(firebaseConfig)
  } else {
    return getApps()[0]
  }
}

export default firebase
