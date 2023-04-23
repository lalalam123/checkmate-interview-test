import Head from 'next/head'
import GoogleButton from 'react-google-button'
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { useRouter } from "next/router";
import { initializeApp } from 'firebase/app';

// Task 0: Initialize Firebase
// Replace the following with your app's Firebase project configuration
// https://firebase.google.com/docs/web/setup
const firebaseConfig = {
  apiKey: "AIzaSyAdl5e5zAirp0plnxn9Y6qM98RhaQ9q6BY",
  authDomain: "checkmate-interview-test-7d6c1.firebaseapp.com",
  projectId: "checkmate-interview-test-7d6c1",
  storageBucket: "checkmate-interview-test-7d6c1.appspot.com",
  messagingSenderId: "840843882620",
  appId: "1:840843882620:web:3bd87de30442f4a90119f9",
  measurementId: "G-W1Y3P33CEY"
};

export const app = initializeApp(firebaseConfig);

// GoogleAuthProvider instance
const provider = new GoogleAuthProvider();
// Firebase Auth instance
const auth = getAuth(app);

export default function Home() {
  //Next.js router
  const router = useRouter();

  // Task 1: Implement Google Sign in with Firebase
  // https://firebase.google.com/docs/auth/web/google-signin
  const signIn = async () => {
    /*
      1. Use the GoogleAuthProvider to sign in with Firebase
      2. Use signInWithRedirect to redirect the user to the Google sign in page
      3. (Optional) Use getRedirectResult to get the result of the redirect and check out what is inside :)
      4. Redirect the user to the signed-in page using Next.js router
     */
    await signInWithRedirect(auth, provider);
  }

  getRedirectResult(auth)
    .then((result) => {

      const user = result?.user;

      if (user) {
        router.push('/signed-in')
      }

    }).catch((error) => {
      console.log(error)
    });

  return (
    <>
      <Head>
        <title>Sign in to see the public holidays in HK</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container">
        <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <h1 className="title">
            Welcome to <a href="https://checkmatehk.io">CheckMate</a>
          </h1>
          <h3>Sign in to see a random programming joke 😳</h3>

          {/* Button for user to sign in with Google */}
          {/* Task 1: Implement Google Sign in with Firebase */}
          <GoogleButton
            label={'Sign in with Google'}
            type="light"
            style={{ width: '50%', display: "flex", justifyContent: 'center', alignItems: 'center', fontFamily: 'Roboto, sans-serif', color: '#444' }}
            onClick={signIn}
          />
        </main>
      </div>
    </>
  )
}
