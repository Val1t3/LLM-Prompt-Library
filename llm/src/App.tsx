import React, { useEffect, useState } from 'react'
import LoginRegisterForm from './components/LoginRegisterForm'
import { initializeApp } from "firebase/app";
import type { FirebaseApp } from "firebase/app";


function App() {
  const [app, setApp] = useState<FirebaseApp | undefined>(undefined);
  const [user, setUser] = useState(false)

  console.log("env", import.meta.env.VITE_APIKEY)

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_PROJECTID,
    storageBucket: import.meta.env.VITE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGINGSENDER,
    appId: import.meta.env.VITE_APPID
  };

  useEffect(() => {
    const app = initializeApp(firebaseConfig);

    if (app)
      setApp(app)
    console.log(app)

    if (localStorage.getItem("user")) {
      setUser(true)
    }
  }, [])

  return (
    <div className='h-screen'>
      {!user ? (
        <LoginRegisterForm />
      ) : (
          <p>Hello World!</p>
        )}
    </div>
  )
}

export default App
