import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
  import { getAuth,signInWithEmailAndPassword,onAuthStateChanged  ,GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
  import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

  
const firebaseConfig = {
    apiKey: "AIzaSyDuMLLXueVf4QfiFPLtjOoDAD9pAGZJtsw",
    authDomain: "threads-clone-c0640.firebaseapp.com",
    projectId: "threads-clone-c0640",
    storageBucket: "threads-clone-c0640.appspot.com",
    messagingSenderId: "54023443046",
    appId: "1:54023443046:web:c7ad97ff3e61699e5893a7",
    measurementId: "G-5638RJ5BVG"
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const storage = getStorage(app); // firebase storage 

  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');


  // alert message 
  function showAlert(message, type) {
    const alertContainer = document.getElementById('alertContainer');
  
    const alert = document.createElement('div');
    alert.classList.add('alert');
    alert.textContent = message;
  
    alertContainer.appendChild(alert);
  
    setTimeout(() => {
      alert.classList.add('hide');
      setTimeout(() => {
        alert.remove();
      }, 500);
    }, 2000);
  }
  

// Sticky alert   (help from chatgpt so that alert should be responsive)
window.addEventListener('scroll', function () {
  const alertContainer = document.getElementById('alertContainer');
  const alert = alertContainer.querySelector('.alert');
  if (alert) {
    const alertHeight = alert.offsetHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowBottom = scrollTop + windowHeight;

    if (windowBottom > alertContainer.offsetTop + alertHeight) {
      alert.classList.add('sticky');
    } else {
      alert.classList.remove('sticky');
    }
  }
});




  loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission
  
  
    const email = emailInput
    const password = passwordInput
  
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
  // window.location.href = 'second.html';


      if (userCredential.user.emailVerified) {
        // Redirect to second.html if email is verified
        window.location.href = "/apiv1/threads/Loader.html";
      } else {
        showAlert('Please verify your email before logging in.')
      }

      })
      .catch((error) => {
        const errorCode = error.code;
        // alert(errorCode);
        showAlert(errorCode)

      });
  });
  



///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////        Login with google 



const provider = new GoogleAuthProvider();

 let google = document.getElementById('google');

 google.addEventListener('click', ()=>{
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    window.location.href = '/apiv1/threads/Loader.html';
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

})



//   for direct sigin of users who have logined before
  document.addEventListener('DOMContentLoaded', ()=>{
    auth.onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
         showAlert('You have logined before, dont need for again login')

         setTimeout(()=>{
                  window.location.href = '/apiv1/threads/Loader.html'; // ./third%20Page/third.html
         },2000)
        
       
      }
    });
    
  })