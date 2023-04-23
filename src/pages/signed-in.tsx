import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "./index";

export default function SignedIn({ joke }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <h1>Signed In</h1>

      {/* Task 3: Your own presentation of the joke here (Free Style 😉 )*/}
      <div >
        <h1 >Fetch random joke by API</h1>
        <p>{joke.data[0].setup + ' ' + joke.data[0].punchline}</p>
      </div>
      <div >
        <h1 >Fetch random joke from Firebase DB</h1>
        <p >{joke.data_db}</p>
      </div>
      {/* End of Task 3 */}

    </div>
  )

}

// Task 2: Fetch random jokes from the API
// https://official-joke-api.appspot.com/jokes/programming/random
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch programming jokes from the Firebase Realtime Database
  const db = getFirestore(app);
  const docRef = doc(db, "jokes", "cWZ6lr6rPWLCdcpiYJTB");
  const docSnap = await getDoc(docRef);

  // Fetch data from external API and pass it to the page via props.joke
  const response = await fetch('https://official-joke-api.appspot.com/jokes/programming/random');
  const data_fetch = await response.json();

  return {
    props: {
      joke: {
        data_db: docSnap.data()?.joke,
        data: data_fetch,
      },
    }, // will be passed to the page component as props
  }
}