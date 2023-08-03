// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1AiSvvyyfJhHMQv1ydPiK8LZb7um_dsg",
  authDomain: "netflix-clone-yt-bb46c.firebaseapp.com",
  projectId: "netflix-clone-yt-bb46c",
  storageBucket: "netflix-clone-yt-bb46c.appspot.com",
  messagingSenderId: "753357081734",
  appId: "1:753357081734:web:55838ef4effecf12685507"
}
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)
const auth = getAuth(app)

export default app
export { auth, db }