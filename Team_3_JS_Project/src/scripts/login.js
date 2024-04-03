/* Purpose: Handle the log in 

  Updated Date: April 3, 2024
*/
'use strict';

import { login } from "./fetchCustomer.js";

function loginSubmit(){
  let user = document.getElementById('emailaddr').value;
  let pwd = document.getElementById('pwd').value;
  
  login(user, pwd);

  window.alert("Welcome to Smith's Clinic!");
  window.location.href = '../index.html';

}

document.getElementById("sign_in").addEventListener("submit", function(event) {
  event.preventDefault(); 
  loginSubmit();
});
