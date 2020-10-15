import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDogY4So14dhPD4aVYA6V3tulIKesEpw0A",
  authDomain: "crown-db-8ab38.firebaseapp.com",
  databaseURL: "https://crown-db-8ab38.firebaseio.com",
  projectId: "crown-db-8ab38",
  storageBucket: "crown-db-8ab38.appspot.com",
  messagingSenderId: "122858874336",
  appId: "1:122858874336:web:82f029d5972cdba6c0f785",
  measurementId: "G-8TN2D0CHQK",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
    return;
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
