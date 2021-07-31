import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAF0LHLbA-by6Fqxp1GNKBlMnlzPKt9kvA",
    authDomain: "mern-messenger-clone-d98af.firebaseapp.com",
    projectId: "mern-messenger-clone-d98af",
    storageBucket: "mern-messenger-clone-d98af.appspot.com",
    messagingSenderId: "841252364061",
    appId: "1:841252364061:web:516da1aa09564533694bf4",
    measurementId: "G-3MV8CMM2YC"
})

const db = firebaseApp.firestore()

export default db