// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


/*
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZTJ6sUqbOB_Nj5weWzg5IftTo5Lf3D3Q",
  authDomain: "myproject-efef9.firebaseapp.com",
  projectId: "myproject-efef9",
  storageBucket: "myproject-efef9.appspot.com",
  messagingSenderId: "1046738624582",
  appId: "1:1046738624582:web:2b89d2ed50bf80b029aa47",
  measurementId: "G-G8ZPFXC2HD"
};
 */

const firebaseConfig = {
    apiKey: "AIzaSyDyrH52qE7bko3dME9L7sC1CU7IxFJLCAk",
    authDomain: "semester-project-5615d.firebaseapp.com",
    projectId: "semester-project-5615d",
    storageBucket: "semester-project-5615d.appspot.com",
    messagingSenderId: "427901623423",
    appId: "1:427901623423:web:1a6dacdbccbc663ad2b34a",
    measurementId: "G-LWVL0XS33L"
  };







import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

//const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
  
  export {app,auth,db};