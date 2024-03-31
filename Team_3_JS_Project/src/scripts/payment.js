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
  
  //userDetails(user,"client-detial");
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
  alert(appt);
  document.getElementById("appt-details").innerHTML = 
        `#${appt.appointmentId}<br>
        ${appt.serviceName}<br>
        ${appt.apptDate}<br>
        ${appt.apptTime}<br>
        1hr<br>
        $${appt.servicePrice}<br><br>
        ` ;
 
  
  getServiceFee(appt.servicePrice);
  getTotal();
}


function getTotal(){
  if(payment.serviceFee===null){
    payment.totalAmount =  parseFloat(payment.servicePrice).toFixed(2);
  }else{

  }
  payment.totalAmount = parseFloat(payment.servicePrice)+parseFloat(payment.serviceFee)+parseFloat(payment.serviceFee)
  document.getElementById("totalAmount").innerHTML = "$" + (parseFloat(payment.totalAmount).toFixed(2));
  return;
}

function getServiceFee(price){
  if(price>100){
    payment.serviceFee = (price * 0.05).toFixed(2);
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


