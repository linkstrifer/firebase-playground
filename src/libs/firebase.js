import Firebase from "firebase";

let firebase = null;

export function initFirebase(config) {
  console.info("initializing firebase app with this configuration");
  console.table({
    config
  });

  firebase = Firebase.initializeApp(config, `app-${new Date().getTime()}`);
}
