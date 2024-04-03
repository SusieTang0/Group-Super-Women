'use strict';
let donation;
var appt = "";
var user = "";

window.addEventListener('load',()=>{
  
  //userDetails(user,"client-detial");
  apptDetails();




 
  

  //document.getElementById('serviceAmount-result').innerHTML=localStorage.getItem('aptPrice') ;
 
});

function userDetails(){
  user = JSON.parse(window.localStorage.getItem('jsonUser'));
  document.getElementById("client-details").innerHTML =
             `Name: ${user.firstname} ${user.lastname}<br>
              Email: ${user.email}<br>
              Phone Number: ${user.phone}<br>`;
}

function apptDetails(){
  appt = JSON.parse(window.localStorage.getItem('apptObj'));
  alert(appt);
  document.getElementById("appt-details").innerHTML = 
        `#${appt.orderID}<br>
        ${appt.serviceName}<br>
        ${appt.apptDate}<br>
        ${appt.apptTime}<br>
        1hr<br>
        $${appt.servicePrice}<br><br>
        ` ;
  appt.totalAmout = appt.servicePrice;
  
  getServiceFee(appt.servicePrice);
  getTotal();
}
function getTotal(){
  
  document.getElementById("serviceTotalAmount-result").innerHTML = "$" + (appt.totalAmout.toFixed(2));
}

function getServiceFee(price){
  if(price>100){
    appt.serviceFee = (price * 0.05).toFixed(2);
    document.getElementById("serviceFeeAmount-result").innerHTML ="$" + appt.serviceFee ;
  }
  return;
}

function handleSelection() {
  var select = document.getElementById("mySelect"); 
  donation = parseFloat(select.value); 
  let priceString = window.localStorage.getItem('aptPrice');
  let price = parseInt(priceString.substring(1,priceString.length));
  let serviceFee = 0;
  if(price>100){
    serviceFee += price*0.05;
  }

  document.getElementById('servicePriceAmount-result').innerHTML=window.localStorage.getItem('aptPrice');
  
    serviceFee += price*0.05;
    let total = (price +donation + donation).toFixed(2);
  document.getElementById('serviceFeeAmount-result').innerHTML=total;
  console.log("Selected value: " + selectedValue); 
}

document.getElementById('bookingNow').onclick=()=>{
  
  
}
