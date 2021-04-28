import firebase from "firebase";

var config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_BASEURL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const db = firebase.database();
export const auth = firebase.auth();
//export const firestore = firebase.firestore();

/*const provider = {
  signinOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ]
};
*/
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const createUserProfileDatabase = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }

  const userRef = db.ref(`users/${userAuth.uid}`);

  //const snapShot = await userRef.child();

  if (!userRef.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("There was an error creating the user", error.message);
    }
  }
  // console.log("This is userRef", userRef);
  return userRef;
};
/*
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  // console.log("This is the snapShot", snapShot);
  // console.log("This is the snapShot Data function", snapShot.data());
  // console.log("This is userAuth", userAuth);

  if (!snapShot.exists) {
    const { displayName, email, rol } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        rol,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("There was an error creating the user", error.message);
    }
  }
  // console.log("This is userRef", userRef);
  return userRef;
};
*/
export default firebase;
