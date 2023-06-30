// import app from "./script.js"
import { getAuth, createUserWithEmailAndPassword,updateProfile   } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
// console.log(app)
const firebaseConfig = {
  apiKey: "AIzaSyDSPXMjU-bhz3pJhvZbGZ_O9hRYH0wkjBU",
  authDomain: "wealth-wizards5000.firebaseapp.com",
  databaseURL: "https://wealth-wizards5000-default-rtdb.firebaseio.com",
  projectId: "wealth-wizards5000",
  storageBucket: "wealth-wizards5000.appspot.com",
  messagingSenderId: "782499607192",
  appId: "1:782499607192:web:1102017a58ea71700496ed"
};
  
  // Initialize Firebase
   const app = initializeApp(firebaseConfig);
  console.log(app)

const auth = getAuth(app);


function checkLogin() {
  const userLoggedIn = localStorage.getItem("IsLoggedIn");
  const username = localStorage.getItem("Username");

  if (userLoggedIn && username) {
    // User is logged in, so redirect to the home page
    window.location.href = '/home.html';
  } else {
    // User is not logged in, so do nothing (stay on the sign-in page)
    console.log("User is not logged in.");
  }
}

checkLogin();


document.getElementById("signUpBtn").addEventListener("click", function() {
  var email =  document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var firstName =  document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  //For new registration
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up
    const user = userCredential.user;
    console.log(user);
    
    alert("Registration successfully!!");
    updateProfile(auth.currentUser,{
      displayName: `${firstName}`,
    });
    window.location.href = '/signIn.html';
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    console.log(errorMessage);
    alert(error);
  });		  		  
});