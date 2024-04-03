'use strict';

var appt = "";
var user = "";

class Payment{
  constructor(cardType,cardNumber,ownerName, cardCVV,cardExpDate, servicePrice, serviceFee,donation, totalAmount){
    this.cardType = cardType,
    this.cardNumber = cardNumber, 
    this.ownerName = ownerName, 
    this.cardCVV = cardCVV, 
    this.cardExpDate = cardExpDate, 
    this.servicePrice = servicePrice, 
    this.serviceFee = serviceFee,
    this.donation = donation, 
    this.totalAmount = totalAmount
    this.needRefund = false;
  }
}

const payment = new Payment();

var inputBlocks = document.querySelectorAll('input[class=""]');





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
        `${appt.serviceName}<br>
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
  document.getElementById("totalAmount").innerHTML = `$${parseFloat(payment.totalAmount).toFixed(2)}`;
  return;
}

function getServiceFee(){
  const price= parseFloat(payment.servicePrice);
  if(price>=100){
    payment.serviceFee= (price* 0.05).toFixed(2);
    document.getElementById("serviceFee").innerHTML ="$" + payment.serviceFee;
    payment.totalAmount =( price + price * 0.05).toFixed(2);
    getTotal();
  }else{
    payment.serviceFee= 0;
    getTotal();
  }
 
  return;
}

function submitPayment(){
  var validationResult = (validateCardType() && validateOwnerName() && validateCardNumber() && validateCardCvv() && validateCardExpDate());
  
  if(validationResult === true){
    console.log(payment);
    var paymentId = postPaymentInfo(payment);// here to call the function postPaymentInfo(payment),and get the paymentId
    // var appointmentId = sendAppointmentToServer(appt);
  }
 
  //localStorage.setItem("appointmentId",appointmentId);

  //createAppointment(appt);
}






function getCardType(){
  var cardTypes= document.getElementsByName('cardType');

  if (cardTypes && cardTypes.length > 0) {
    for (var i = 0; i < cardTypes.length; i++) {
      cardTypes[i].addEventListener("change", function() {
        payment.cardType = this.id;
      });
    }
  } else {
    console.error("No elements found with name 'cardType'");
  }
  return ;
}

function validateCardType() {
  var cardType = payment.cardType;
  if (cardType === "visa" || cardType === "master") {
    
    return true; 
  } else {
    window.alert("Please choose the type of your card.");
    return false; 
  }
}

function validateCardNumber() {
  var input = document.getElementById("cardNumber").value;
  var cardNumberPattern = /^\d{16}$/;
  if (cardNumberPattern.test(input)) {
    payment.cardNumber = input;
    return true; 
  } else {
    window.alert("Please enter a valid 16-digit credit card number");
    return false; 
  }
}

function validateCardCvv() {
  var input = document.getElementById("cvvNumber").value;
  var cardCvvPattern = /^\d{3}$/;
  if (cardCvvPattern.test(input)) {
    payment.cardCVV = input;
    return true; 
  } else {
    window.alert("Please enter a valid 3-digit CVV number");
    return false; 
  }
}

function validateOwnerName() {
  var input = document.getElementById("nameOnCard").value;
  var namePattern = /^[a-zA-Z]+$/;
  if (namePattern.test(input)) {
    payment.ownerName = input;
    return true; 
  } else {
    window.alert("Please enter the correct name on the card");
    return false; 
  }
}

function validateCardExpDate() {
  var input = document.getElementById("experiedDate").value;
  var today = new Date();
  var validDate = new Date(today);
  validDate.setDate(validDate.getDate() + 30);
  alert(afterAMonth);
  alert(input < validDate);
  if (input != "" && input < validDate) {
    payment.cardExpDate = input;
    return true; 
  } else {
    window.alert("Please choose the Exparied Date of your card.");
    return false; 
  }
}


window.addEventListener('load',()=>{
  
  //userDetails();
  apptDetails();
  getCardType();
 
 
});

function postPaymentInfo(data){
  fetch('/insertPayment', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.status);
      }
      return response.json();
  })
  .then(data => {
    appt.paymentId = data;
    console.log("This payment is inserted into database successfully."); // return paymentId
    return data;
  })
  .catch(error => {
      console.error('Error saving data:', error);
  });
}