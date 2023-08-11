
let form = document.getElementById('loginForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();


let email = document.getElementById('email').value;
let password = document.getElementById('password').value

let whole = {
  email,
  password
}

axios.post('/Auth-api-folder/login',whole );

})
