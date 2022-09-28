// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBiYT2CoGBrtJ2Uy0Ns71wzCr4tefuID1w',
  authDomain: 'helpq-2e1fc.firebaseapp.com',
  projectId: 'helpq-2e1fc',
  storageBucket: 'helpq-2e1fc.appspot.com',
  messagingSenderId: '862993309920',
  appId: '1:862993309920:web:5ec83a180431bd8be53085',
  measurementId: 'G-4Q62SHCSW1',
}

// Initialize Firebase
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const app = initializeApp(firebaseConfig)
const db = getFirestore()

export default db
