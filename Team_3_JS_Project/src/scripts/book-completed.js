'use strict';

const appt = JSON.parse(window.localStorage.getItem("apptObj")) ;
var appointmentId = window.localStorage.getItem("appointmentId");


window.addEventListener("load",()=>{
  document.getElementById("serviceName").innerHTML = appt.serviceName;
  document.getElementById("appointmentId").innerText = "#"+ appointmentId;
  document.getElementById("apptDate").innerText = appt.apptDate;
  document.getElementById("apptTime").innerText = appt.apptTime;
  localStorage.removeItem("apptObj");
});


