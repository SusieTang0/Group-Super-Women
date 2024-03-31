/* Purpose: Handle the log in 
    Author: Jing Yang
      Date: March 13, 2024
*/
'use strict';
var customs= [['C00001','John','Smith','john_smith@123.com','514-233-2333','123456','../assets/upload/avater-sample.png',,,,,,],['C0002','Mary','Wood','mary_wood@123.com','514-255-2555','456789','../assets/upload/clinic-64.png',,,,,,],['C00003','Lucy','Allen','lucy_allen@123.com','514-299-2999','000000','../assets/upload/instagram-white.png',,,,,,]];

let secueKey; 
let usenme;
let passwd;

function logincheck(){
  let user = document.getElementById('emailaddr').value;
  let pwd = document.getElementById('pwd').value;
  
  if(secueKey.has(user)){
      if(pwd == secueKey.get(user)) {
        localStorage.setItem('currentuser', user);
        setCustom()
          return true;
      } else{
          alert("Password does not match! Please try again.");
          return false;
      }

  } else {
      alert("User does not exist! Please try again or create a new one.");
      return false;
  }

}

function setCustom(){
  let user = localStorage.getItem('currentuser');
  for(let index = 0;index<customs.length; index++){
    if(customs[index][3] == user){
        localStorage.clear;
        let userID = customs[index][0];
        
        localStorage.setItem('userID',userID);
        localStorage.setItem('firstname',customs[index][1]);
        localStorage.setItem('avatar',customs[index][6]);
        
        
        window.alert("Welcome to Smith's Clinic!");
        window.location.href = 'index-en.html';
       
    }
  }
}


function storeCusInfo(){
  let custom = new Array();
    custom[0] = localStorage.getItem('userID');
    custom[1] = localStorage.getItem('firstname');
    custom[2] = localStorage.getItem('lastname');
    custom[3] = localStorage.getItem('emailAddress');
    custom[4] = localStorage.getItem('phoneNumber');
    custom[5] = localStorage.getItem('password');
    custom[6] = localStorage.getItem('../assets/icons/person-grey-40.png');
    customs.push(custom);
}


window.addEventListener('load',()=>{
  secueKey = new Map([
    ["john_smith@123.com","123456"],
    ["mary_wood@123.com","456789"],
    ["lucy_allen@123.com","000000"]
  ]);
  let register = window.localStorage.getItem('register');
  if(register){
    usenme = localStorage.getItem('emailAddress');
    passwd = localStorage.getItem('password');
    secueKey.set(usenme,passwd);
  }
  storeCusInfo();
});
