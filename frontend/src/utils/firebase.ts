import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const VITE_FIREBASE_API = import.meta.env.VITE_FIREBASE_API
const VITE_FIREBASE_PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID
const VITE_FIREBASE_BUCKET = import.meta.env.VITE_FIREBASE_BUCKET

export const firebaseConfig = {
  apiKey: VITE_FIREBASE_API,
  projectId: VITE_FIREBASE_PROJECT_ID,
  storageBucket: VITE_FIREBASE_BUCKET,
}


const firebase = initializeApp(firebaseConfig)
export const auth = getAuth(firebase)
export const storage = getStorage(firebase)
export default firebase
