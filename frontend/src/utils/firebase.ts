import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const VITE_FIREBASE_API = import.meta.env.VITE_FIREBASE_API
const VITE_FIREBASE_PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID
const VITE_FIREBASE_BUCKET = import.meta.env.VITE_FIREBASE_BUCKET

export const firebaseConfig = {
  apiKey: "AIzaSyC9t4dGb2aJ7gHR3e2QM8lLFxLYRvVhvdw",
  authDomain: "digiseva-3af8c.firebaseapp.com",
  projectId: "digiseva-3af8c",
  storageBucket: "digiseva-3af8c.appspot.com",
  messagingSenderId: "630237790149",
  appId: "1:630237790149:web:452f21230fd8cc2f7955ac",
  measurementId: "G-MR84T9NVSZ"
}


const firebase = initializeApp(firebaseConfig)
export const auth = getAuth(firebase)
export const storage = getStorage(firebase)
export default firebase
