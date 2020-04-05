import firebase from 'firebase';

console.log("process.env.NODE_ENV", process.env.NODE_ENV);

// Firestore
var config = (process.env.NODE_ENV === 'development') ? {
  apiKey: "AIzaSyD3nuoNJHlZHVdYDhM607iPDGgv24Y7wxw",
  authDomain: "fstore1-dev.firebaseapp.com",
  databaseURL: "https://fstore1-dev.firebaseio.com",
  projectId: "fstore1-dev",
  storageBucket: "fstore1-dev.appspot.com",
  messagingSenderId: "1031943081436"
} : {
  apiKey: "AIzaSyD3nuoNJHlZHVdYDhM607iPDGgv24Y7wxw",
  authDomain: "fstore1-dev.firebaseapp.com",
  databaseURL: "https://fstore1-dev.firebaseio.com",
  projectId: "fstore1-dev",
  storageBucket: "fstore1-dev.appspot.com",
  messagingSenderId: "1031943081436"
}

try {

  console.log("Firestore config:", config);
  firebase.initializeApp(config);

} catch (e) {

}

// const settings = {/* your settings... */ timestampsInSnapshots: true}
let firestoreDB = firebase.firestore()
// firestoreDB.settings(settings)
export { firestoreDB }

export var githubProvider = new firebase.auth.GithubAuthProvider();
export var facebookProvider = new firebase.auth.FacebookAuthProvider();
export var firebaseRef = firebase.database().ref();
export var firebaseStorageRef = firebase.storage().ref();
export var firebaseStorage = firebase.storage();
export default firebase;
