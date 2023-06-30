// home.js
function checkLogin() {
    const userLoggedIn = localStorage.getItem("IsLoggedIn");
    const username = localStorage.getItem("Username");
  
    if (!(userLoggedIn && username)) {
      // User is logged in, so redirect to the home page
      window.location.href = '/signIn.html';
    } else {
      // User is  logged in, so do nothing 
      console.log("User is logged in.");

    }
  }
  
  checkLogin();

document.getElementById("logoutBtn").addEventListener("click", function() {

    // remove the user key from local storage
    localStorage.removeItem('IsLoggedIn');
    localStorage.removeItem("Username");

    // redirect to the sign-in page 
    window.location.href = 'signIn.html'; 

})
