import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";


console.log( process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)

const firebaseConfig = {
  apiKey:  process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId:  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:  process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId:process.env.NEXT_PUBLIC_FIREBASE_MEASURMENT_ID,
};

console.log(firebaseConfig);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const storage = getStorage(app);

const postsCollection = collection(db, "posts");
const commentsCollection = collection(db, "comments");
const usersCollection = collection(db, "users");
export { db, app,  storage,
  postsCollection,
  commentsCollection,
  usersCollection };


// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

// import { getFirestore } from "firebase/firestore";


// const firebaseConfig = {
//   apiKey: "AIzaSyAjm8awPun7KwSrDiY2OEqUjexmutGbLWI",
//   authDomain: "saltifi-development.firebaseapp.com",
//   projectId: "saltifi-development",
//   storageBucket: "saltifi-development.firebasestorage.app",
//   messagingSenderId: "876540171994",
//   appId: "1:876540171994:web:3b031fbffc0bb9984277e3",
//   measurementId: "G-GPVK94T154"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const db = getFirestore(app);


// export { db, app };