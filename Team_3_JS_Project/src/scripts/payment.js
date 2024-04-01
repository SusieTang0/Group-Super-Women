'use strict';

var appt = "";
var user = "";
class Payment{
  constructor(paymentId, cardType,cardNumber, ownerName, servicePrice, serviceFee,donation, totalAmount){
    this.paymentId = paymentId, 
    this.cardType = cardType,
    this.cardNumber = cardNumber, 
    this.ownerName = ownerName, 
    this.servicePrice = servicePrice, 
    this.serviceFee = serviceFee,
    this.donation = donation, 
    this.totalAmount = totalAmount
  }
}

const payment = new Payment();

window.addEventListener('load',()=>{
  
  //userDetails();
  apptDetails();

  //document.getElementById('serviceAmount-result').innerHTML=localStorage.getItem('aptPrice') ;
 
});

//document.getElementById('bookingNow').onclick=()=>{
  
  
//}

function userDetails(){
  user = JSON.parse(window.localStorage.getItem('jsonUser'));
  document.getElementById("client-details").innerHTML =
             `Name: ${user.firstname} ${user.lastname}<br>
              Email: ${user.email}<br>
              Phone Number: ${user.phone}<br>`;
}

function apptDetails(){
  appt = JSON.parse(window.localStorage.getItem('apptObj'));
  document.getElementById("appt-details").innerHTML = 
        `#${appt.appointmentId}<br>
        ${appt.serviceName}<br>
        ${appt.apptDate}<br>
        ${appt.apptTime}<br>
        1hr<br>
        $${appt.servicePrice}<br><br>
        ` ;
  
  payment.servicePrice = appt.servicePrice;
  getServiceFee();
  
}


function getTotal(){
  payment.totalAmount += payment.servicePrice ;
  payment.totalAmount += parseFloat(payment.servicePrice).toFixed(2);
  
  if(payment.donation != null){
    payment.totalAmount += parseFloat(payment.donation).toFixed(2);
  }
  document.getElementById("totalAmount").innerHTML = "$" + (parseFloat(payment.totalAmount).toFixed(2));
  return;
}

function getServiceFee(){
  const price= parseFloat(payment.servicePrice);
  if(price>=100){
    payment.serviceFee= (price* 0.05).toFixed(2);
    document.getElementById("serviceFee").innerHTML ="$" + payment.serviceFee;
    getTotal();
  }
  return;
}




function handleSelection() {
  payment.donation = parseFloat(document.getElementById("donation").value).toFixed(2); 
  getTotal();
  return;
}


