import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import './App.css';
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);
function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  })
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () =>{
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, photoURL, email} = res.user;
      const signedInUser ={
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signedInUser);
      console.log(displayName, photoURL, email);
    })
    .catch(err =>{
      console.log(err);
      console.log(err.message);
    })
    
  }
  const handleSignOut = () =>{
    firebase.auth().signOut()
    .then( res => {
      const signedOutUser = {
        isSignedIn:false,
        name: '',
        email: '',
        photo: ''
      }
      setUser(signedOutUser);
      // Sign-out successful.
    })
    .catch((error) => {
      console.log(error);
      // An error happened.
    });
  }
  return (
    <div className="App">
      {
        user.isSignedIn?<button onClick={handleSignOut}>Sign Out</button>:<button onClick={handleSignIn}>Sign In</button>
      }
      
      {
        user.isSignedIn &&
          <div>
            <p>Welcome, {user.name}</p>
            <p>Your Email: {user.email}</p>
            <img src={user.photo} alt=""/>
          </div>
      }
    </div>
  );
}

export default App;