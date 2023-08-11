 
const button = document.getElementById('login');

let form = document.getElementById('form');

   form.addEventListener('submit', (e) => {
  
e.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let whole = {
       name,
       email,
       password
    }
 


       axios.post('/Auth-api-folder/signup', whole );


   });
   

  