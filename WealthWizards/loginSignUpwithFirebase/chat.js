import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
  setDoc,
  orderBy,
  limit,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSPXMjU-bhz3pJhvZbGZ_O9hRYH0wkjBU",
  authDomain: "wealth-wizards5000.firebaseapp.com",
  databaseURL: "https://wealth-wizards5000-default-rtdb.firebaseio.com",
  projectId: "wealth-wizards5000",
  storageBucket: "wealth-wizards5000.appspot.com",
  messagingSenderId: "782499607192",
  appId: "1:782499607192:web:1102017a58ea71700496ed",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const username = localStorage.getItem("Username");
function checkLogin() {
  const userLoggedIn = localStorage.getItem("IsLoggedIn");

  if (!(userLoggedIn && username)) {
    // User is logged in, so redirect to the home page
    window.location.href = "/signIn.html";
  } else {
    // User is  logged in, so do nothing
    console.log("User is logged in.");
  }
}

checkLogin();

document.getElementById("logoutBtn").addEventListener("click", function () {
  // remove the user key from local storage
  localStorage.removeItem("IsLoggedIn");
  localStorage.removeItem("Username");

  // redirect to the sign-in page
  window.location.href = "signIn.html";
});

document.getElementById("txt").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault(); // prevent default form submission behavior
      var message= document.getElementById("txt").value ;
    if(message.trim() === ''){

    }else{
      document.getElementsByClassName("send")[0].click(); // simulate a click on the send button
    }
}
  })

document
  .getElementsByClassName("send")[0]
  .addEventListener("click", async function () {
    var time = new Date().getTime();
    var message= document.getElementById("txt").value ;

    if(message.trim() === ''){

    }else{
      
    
    const docRef = await addDoc(collection(db, "group+messages"), {
      value: document.getElementById("txt").value,
      sentby: username,
      time: time,
    });
    document.getElementById("txt").value = "";
}
  });

const q = query(collection(db, "group+messages"), orderBy("time", "asc"));
const unsubscribe = onSnapshot(q, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      //console.log("New city: ", change.doc.data());

      if (change.doc.data().sentby == username) {
        var msgdiv = document.createElement("div");

        msgdiv.className = "chat2";
        msgdiv.innerHTML = change.doc.data().value;
        document.getElementsByClassName("uploaded")[0].appendChild(msgdiv);
      } else {
        var msgdiv = document.createElement("div");
        var msgdivname = document.createElement("div");
        var msg = document.createElement("div");
        msgdiv.className = "chat";
        msg.innerHTML = change.doc.data().value;
        msgdivname.innerHTML = `~ ${change.doc.data().sentby}`;
        document.getElementsByClassName("uploaded")[0].appendChild(msgdiv);
        msgdiv.appendChild(msg);
        msgdiv.appendChild(msgdivname);
      }
    }
    if (change.type === "modified") {
      console.log("Modified city: ", change.doc.data());
    }
    if (change.type === "removed") {
      console.log("Removed city: ", change.doc.data());
    }
  });
});
