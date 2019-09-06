import Firebase from "firebase";

let firebase = null;

export function initFirebase(config) {
  firebase = Firebase.initializeApp(config);

  console.log(firebase);
}
