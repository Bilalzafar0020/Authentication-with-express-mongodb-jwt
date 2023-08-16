
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
    }, 2000);
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



//////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
///////////////  client side request for logout 

      
      let button = document.getElementById('logout');

button.addEventListener('click', ()=>{


   axios.post('/Auth-api-folder/logout')

   .then(  (response)=>{

      showAlert(response.data);


      setTimeout( ()=>{
    window.location.href = '/signup';
      },2000 )


   } )

   .catch(()=>{

  showAlert('Logout failed, PLease try again');
   })



});
