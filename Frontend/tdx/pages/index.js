import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// import initFirebase from '../utils/firebase';
import { setUserCookie } from '../auth/userCookie';
import { mapUserData } from '../auth/useUser';

import "firebase/compat/firestore";
import "firebase/compat/database";

const config = {
  apiKey: "AIzaSyCcJCe1acm01EIceSP_xlZv5OUZd-BQfRw",
  authDomain: "stack-smashers.firebaseapp.com",
  databaseURL: "https://stack-smashers-default-rtdb.firebaseio.com",
  projectId: "stack-smashers",
  storageBucket: "stack-smashers.appspot.com",
  messagingSenderId: "740939279438",
  appId: "1:740939279438:web:abab3ad7c9b9da1efae71f",
  measurementId: "G-02JCX0S0ME"
};

//If an firebase app hasn't already been created
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const firebaseAuthConfig = ({ signInSuccessUrl }) => ({
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl,
  credentialHelper: 'none',
  callbacks: {
    signInSuccessWithAuthResult: async ({ user }, redirectUrl) => {
      const userData = await mapUserData(user);
      setUserCookie(userData);
    }
  }
});

<<<<<<< HEAD
      <main className={styles.main}>
        <h1 className={styles.title}>
          Stack Smashers
        </h1>


        <div id="LoginScreen" className={styles.grid}>

          <a className={styles.card}>
           <button className={styles.card} onClick = {signInWithGoogle} id="LoginScreen"> <h2> Login with Google</h2></button>
          </a>
    
        </div>
      </main>
=======
const FirebaseAuth = () => {
  const signInSuccessUrl = "/home"
  return (
    <div>
      <StyledFirebaseAuth
        uiConfig={firebaseAuthConfig({ signInSuccessUrl })}
        firebaseAuth={firebase.auth()}
        signInSuccessUrl={signInSuccessUrl}
      />
>>>>>>> 1f368a8c05641439967e392b4bb6092a3d01fada
    </div>
  );
};

export default FirebaseAuth;