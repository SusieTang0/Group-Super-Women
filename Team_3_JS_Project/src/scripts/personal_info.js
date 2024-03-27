// personal_info.js 

// Script Date: March 11, 2024

'use strict';
let newAvatar;
window.addEventListener('load',startUp);
let customs;


function startUp(){
  let userID = window.localStorage.getItem('userID');
  customs = [['C00001','John','Smith','john_smith@123.com','514-233-2333','123456','../../assets/upload/avater-sample.png',,,,,,],['C0002','Mary','Wood','mary_wood@123.com','514-255-2555','456789','../../assets/upload/clinic-64.png',,,,,,],['C00003','Lucy','Allen','lucy_allen@123.com','514-299-2999','000000','../../assets/upload/instagram-white.png',,,,,,]];
  var ids = ['userID','firstname','lastname','emailAddress','phoneNumber','password','avatar','address','city','province','country','postcode','contactName','contactPhone','paymentID'];

  let custom = findCustom(userID,customs);

  // set the content of leftside-bar
  setLeftSideBar();
  
  if(window.localStorage.getItem('edited') != undefined){
    userID = window.localStorage.getItem('userID');
    let index;
    for(let i=0;i < customs.length;i++){
      if(customs[i][0] == userID){
        index=i;
        for(let j=1;j < ids.length;j++){
          let key = ids[j];
          customs[i][j] = window.localStorage.getItem(key);
        }
      }
    }

    displayInfo(customs[index]);

  }

  displayInfo(custom);

  // display the information in each page
  if(document.getElementById('infoDisplay')!=undefined){
    showInfoInForm(custom);
  }
  
}

function setLeftSideBar(){
  let first_name = window.localStorage.getItem('firstname');
  let last_name = window.localStorage.getItem('lastname');
  // set name in leftsidebar
  document.getElementById('personalInfoName').innerHTML = first_name+"&nbsp;"+last_name;

  // set the src of each avatar on this page
  let avatars = document.getElementsByName('avatar');
  for(let i=0;i<avatars.length;i++){
    avatars[i].src = window.localStorage.getItem('avatar');
  }
}


function changeAvatar(){
  
  var file = event.target.files[0]; 
  
  if (file) {
    var reader = new FileReader(); 

    reader.onload = function(event) {
      newAvatar = event.target.result; 
      document.getElementById('avatar').src=newAvatar;
    };

    reader.readAsDataURL(file);
  } else {
    console.error('No file selected.');
  }

};


function displayInfo(custom){
  // getDate("../data/customs.txt");
  
 
  var ids = ['userID','firstname','lastname','emailAddress','phoneNumber','password','avatar','address','city','province','country','postcode','contactName','contactPhone','paymentID'];

  let infos = document.getElementById('infoDisplay').getElementsByTagName('span');
  

  for(let i = 0; i < custom.length; i++){
    
    var key = (infos[i].id).substring(7);

    var index = ids.indexOf(key);

    var value = custom[index];
    
    if(value != undefined){
      if(window.localStorage.getItem(key) == null){
        localStorage.setItem(key,value);
      }
      infos[i].innerHTML = window.localStorage.getItem(key);
    }
    
  }
  
  if(window.localStorage.getItem('avatar') == null){
    localStorage.setItem('avatar',custom[6]);
  }
  
  return;
};

function findCustom(ID,list){
  for(let index = 0; index < list.length; index++){
    if(list[index][0] == ID){
      return list[index];
    }
  }
}

function showInfoInForm(custom){
  let userID = window.localStorage.getItem('userID');
 
  var ids = ['userID','firstname','lastname','emailAddress','phoneNumber','password','avatar','address','city','province','country','postcode','contactName','contactPhone','paymentID'];

  let infos = document.getElementById('infoForm').getElementsByTagName('input');

  for(let i = 0; i < infos.length; i++){
    
    var key = infos[i].id;
    var index = ids.indexOf(key);
    var value = custom[index];
    if(value != undefined){
      
      localStorage.setItem(key,value);
      infos[i].value = window.localStorage.getItem(key);
    }
  }
 
  let avatars = document.getElementsByName('avatar');
  for(let i=0;i<avatars.length;i++){
    avatars[i].src = window.localStorage.getItem('avatar');
  }
}



function infoCancel(){
  window.location.href = 'personal-info-en.html';
  return;
};

function infoSubmit(){
  let infos = document.getElementById('infoForm').getElementsByTagName('input');
  let newInfo = new Array();
  for(let i = 1; i < infos.length; i++){
    if(i==0){
      document.getElementById("userID").value.innerHTML = window.localStorage.getItem('userID');
      alert();
    }else{
      var key = infos[i].id;
      var value = document.getElementById(key).value;
      localStorage.setItem(key,value);
    }
  }
    const first_name = document.getElementById("firstname").value;
    const last_name = document.getElementById("lastname").value;
    const email_address = document.getElementById('emailAddress').value;
    const phone_number = document.getElementById('phoneNumber').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const province = document.getElementById('province').value;
    const country = document.getElementById('country').value;
    const postcode = document.getElementById('postcode').value;
    const contact_name = document.getElementById('contactName').value;
    const contact_phone = document.getElementById('contactPhone').value;
    const avatar_url = document.getElementById('avatar').src;

    // set the first and last names into the local storage
    localStorage.setItem('firstname', first_name);
    localStorage.setItem('lastname', last_name);
    localStorage.setItem('emailAddress', email_address);
    localStorage.setItem('phoneNumber', phone_number);
    localStorage.setItem('address', address);
    localStorage.setItem('city', city);
    localStorage.setItem('province', province);
    localStorage.setItem('country', country);
    localStorage.setItem('postcode', postcode);
    localStorage.setItem('contactName', contact_name);
    localStorage.setItem('contactPhone', contact_phone);
    localStorage.setItem('avatar', avatar_url);

    
    localStorage.setItem('edited', true);
    window.location,href = "personal-info-en.html";
    return;
}
