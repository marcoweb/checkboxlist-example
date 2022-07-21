import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDM6yte4JWw2Zhahf-QG6-H9jKoIc5H1L0",

  authDomain: "exemplorn-8556c.firebaseapp.com",

  databaseURL: "https://exemplorn-8556c-default-rtdb.firebaseio.com",

  projectId: "exemplorn-8556c",

  storageBucket: "exemplorn-8556c.appspot.com",

  messagingSenderId: "72535558741",

  appId: "1:72535558741:web:a78042933dc4040d7e22dc"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore()

export { firestore }

