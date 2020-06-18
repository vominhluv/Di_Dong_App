import * as firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyAHSXQDEqTEKPLQjq-dVxankVmIm0QdUu0",
    authDomain: "foody-2feae.firebaseapp.com",
    databaseURL: "https://foody-2feae.firebaseio.com",
    projectId: "foody-2feae",
    storageBucket: "foody-2feae.appspot.com",
    messagingSenderId: "733053533234",
    appId: "1:733053533234:web:80e0e25bb3a7d0658d502b",
    measurementId: "G-5TN86E26M2"
};
export const firebaseApp = firebase.initializeApp(firebaseConfig);