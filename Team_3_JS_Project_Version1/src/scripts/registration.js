/* For validating the registration form 
    Author: Jing Yang
    Date: Mar 14, 2024
*/

'use strict';

let pwdform = document.getElementById('pwd');
let pwdconfirm = document.getElementById('pwdconf');
let emailelem = document.getElementById('email-address');
let fnamelem = document.getElementById('first-name');
let lnamelem = document.getElementById('last-name');

let secueKey = new Map([
  ["john_smith@123.com","123456"],
  ["mary_wood@123.com","456789"],
  ["lucy_allen@123.com","000000"]
]
);

var customs= [['C00001','John','Smith','john_smith@123.com','514-233-2333','123456','../assets/upload/avater-sample.png',,,,,,],['C0002','Mary','Wood','mary_wood@123.com','514-255-2555','456789','../assets/upload/clinic-64.png',,,,,,],['C00003','Lucy','Allen','lucy_allen@123.com','514-299-2999','000000','../assets/upload/instagram-white.png',,,,,,]];


function validateForm(){

    let regemail = emailelem.value;
    
    if(secueKey.has(regemail)){
        alert('User ' + regemail + ' already registered, please use another email.');
        return false;
    } else {
      if(pwdform.value == pwdconfirm.value){
         
          setCustomId();
          localStorage.setItem('emailAddress', emailelem.value);
          localStorage.setItem('password', pwdconfirm.value);
          localStorage.setItem('firstname', fnamelem.value);
          localStorage.setItem('lastname', lnamelem.value);
          localStorage.setItem('register', true);
          return true;
      } else
      {
          alert('Passwords do not match! please try again.')
          return false;
      }
    }
}

function setCustomId(){
    let custID = 'C';
    let counter = 9999-customs.length;
    while(counter>1){
      custID+='0';
      counter/=10;
    }
    custID+=customs.length +1;
    localStorage.setItem('userID',custID);
}
