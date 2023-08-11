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
    }, 4000);
  }, 5000);
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

let form = document.getElementById('loginForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();


let email = document.getElementById('email').value;
let password = document.getElementById('password').value

let whole = {
  email,
  password
}

axios.post('/Auth-api-folder/login',whole )

.then( ()=>{

showAlert('Login successful');

setTimeout(() => {
  window.location.href = '/post';
}, 1000); // Wait for 1 seconds before redirecting


})

.catch( ()=>{

showAlert('Login failed , Please try again');

} )


})
