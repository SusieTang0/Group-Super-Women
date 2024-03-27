'use strict';
let donation;

window.addEventListener('load',()=>{
  document.getElementById('serviceStaff-result').innerHTML=window.localStorage.getItem('serviceID') ;
  document.getElementById('serviceName-result').innerHTML=window.localStorage.getItem('aptService') ;
  document.getElementById('sericeDate-result').innerHTML=window.localStorage.getItem('aptDate') ;
  document.getElementById('serviceTime-result').innerHTML=window.localStorage.getItem('aptTime') ;
  document.getElementById('servicePriceAmount-result').innerHTML=window.localStorage.getItem('aptPrice');
  
  
  
  alert(donation);

  alert(serviceFee);
 
  

  //document.getElementById('serviceAmount-result').innerHTML=localStorage.getItem('aptPrice') ;
 
});

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
