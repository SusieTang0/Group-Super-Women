'use strict';

var appt = "";
var user = "";

class Payment{
  constructor(cardType,cardNumber, ownerName, servicePrice, serviceFee,donation, totalAmount){
    this.cardType = cardType,
    this.cardNumber = cardNumber, 
    this.ownerName = ownerName, 
    this.servicePrice = servicePrice, 
    this.serviceFee = serviceFee,
    this.donation = donation, 
    this.totalAmount = totalAmount
    this.needRefund = false;
  }
}

const payment = new Payment();
var cardTypeItems = document.getElementsByTagName();
var cardType;
cardTypeItems.array.forEach((element) => {
  element.addEventListener("change",()=>{
    cardType = element.value;
  })
});



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
  var total = parseFloat(payment.servicePrice) +parseFloat(payment.serviceFee);
  payment.donation = parseFloat(document.getElementById("donation").value);
  var theDonation  = parseFloat(payment.donation); 

  payment.totalAmount = (total + theDonation).toFixed(2);
  document.getElementById("totalAmount").innerHTML = `$${parseFloat(payment.totalAmount)}`;
  return;
}

function getServiceFee(){
  const price= parseFloat(payment.servicePrice);
  if(price>=100){
    payment.serviceFee= (price* 0.05).toFixed(2);
    document.getElementById("serviceFee").innerHTML ="$" + payment.serviceFee;
    payment.totalAmount =( price + price * 0.05).toFixed(2)
    getTotal();
  }
  return;
}

function submitPayment(){
  
  postPaymentInfo()
  var appointmentId = sendAppointmentToServer(appt);
  
}



function postPaymentInfo(){
  // fetch something here

}


