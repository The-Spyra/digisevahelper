import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"

const VITE_FIREBASE_API = process.env.VITE_FIREBASE_API
const VITE_FIREBASE_PROJECT_ID = process.env.VITE_FIREBASE_PROJECT_ID
const VITE_FIREBASE_BUCKET = process.env.VITE_FIREBASE_BUCKET

const firebaseConfig = {
  apiKey: VITE_FIREBASE_API,
  projectId: VITE_FIREBASE_PROJECT_ID,
  storageBucket: VITE_FIREBASE_BUCKET,
}

const firebase = initializeApp(firebaseConfig)
export const storage = getStorage(firebase)
export default firebase
