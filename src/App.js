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
  const handleChange = (event) =>{
    if(event.target.name === "email"){
      const isEmailValid = /\S+@\S+\.\S+/.test(event.target.value);
      console.log(isEmailValid);
    }
    if(event.target.name === 'password'){
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      console.log(isPasswordValid && passwordHasNumber)

    }
    console.log(event.target.name, event.target.value);
  }
  const handleSubmit = () => {

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
      <h1>Our own authentication</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" onBlur={handleChange} placeholder="Enter Your Email" required/>
        <br/>
        <input type="password" name="password" onBlur={handleChange} placeholder="Enter Your Password" required/>
        <br/>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  );
}

export default App;
