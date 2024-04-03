// JavaScript source code
// appointments_display.js 

// Script Date: March 11, 2024

'use strict';
import { getAppointments, getAppointmentTimes, createAppointment, deleteAppointment, updateAppointment } from "./fetchAppointment.js";

let response = await getAppointmentTimes("2024-04-10", "Blood Test");

// appointment = [orderNumber,service,appointmentDate,bookingDate,status,paymentID, feedbackCompleted];
let createdApptData = {
  apptDate: "2024-04-10", // value to be taken when selected on the html page. 
  apptTime: "05:00 PM", // value to be taken when selected on the html page.
  customerId: 1,   // will be taken from localStorage the customerId after user signs in
  paymentId: 6,   // NEED TO GET LIST OF PAYMENTS AND ADD 1 TO IT.
  serviceName: "Blood Test",  // value to be taken when selected on the html page.
  servicePrice: 30, // value to be taken when selected on the html page.
}
let updatedData = {
  apptDate: "2024-05-01", // changed value to be taken when changing date on the html page. 
  apptTime: "09:00 AM", // changed time to be taken when changing time on the html page.
  serviceName: "X-Ray",  // changed value to be taken when changing serviceName on the html page. 
  servicePrice: 500 // changed value to be taken when changing servicePrice on the html page. 
}

let appointmentList;

window.addEventListener('load',startUp);
window.addEventListener('load',setLeftSideBar);

async function startUp(){
  try {
    appointmentList = await getAppointments(1);

    let status = window.localStorage.getItem('status');
    if(status === null || status === undefined) {
      status = 'total'; 
      window.localStorage.setItem('status', status); 
    }
    let serviceID = window.localStorage.getItem('serviceID');
    if(serviceID != undefined){
      rescheduleChange();
    }

    displayAppointments(status,appointmentList);

  } catch (error) {
    console.error('Error starting up:', error);
  }
}

document.getElementById('status-option').onchange=()=>{
  let status = document.getElementById('status-option').value;
  localStorage.setItem('status',status);
  startUp();
}

function setLeftSideBar(){
  let first_name = window.localStorage.getItem('firstname');
  let last_name = window.localStorage.getItem('lastname');
  // set name in leftsidebar
  document.getElementById('personalInfoName').innerHTML = first_name+" "+last_name;

  // set the src of each avatar on this page
  let avatars = document.getElementsByName('avatar');
  for(let i=0;i<avatars.length;i++){
    avatars[i].src = window.localStorage.getItem('avatar');
  }
}

/**
 * 
 * @param {string} theStatus 
 * @param {Array} appointmentList 
 */

function displayAppointments(theStatus, appointmentList) {
  let appointments = ""; 
  let titleName = "";
  let optionTitle = "<td>Options</td>";
  if (theStatus == "uncompleted") {
    titleName = "Uncompleted Appointments";
  } else if (theStatus == "completed") {
    titleName = "Completed Appointments";
  } else if (theStatus == "total") {
    titleName = "Appointments";
  } else {
    titleName = "Appointment" + theStatus;
    optionTitle = "";
  }

  document.getElementById('appointTitle').innerHTML = titleName;

  appointments += 
    `<table >
      <tr class="listDisplay-tr">
        <td>Appt #</td>
        <td>Service</td>
        <td>Appointment<br>Date&nbsp;&&nbsp;Time</td>
        <td>Booking<br>Date&nbsp;&&nbsp;Time</td>
        <td>Status</td>${optionTitle}
      </tr>`;

  for (let i = 0; i < appointmentList.length; i++) {
    if (appointmentList[i].status == theStatus || theStatus == 'total' || theStatus == 'Feedback') {
      appointments += 
        `<tr class="listDisplay-tr">
          <td>${appointmentList[i].appointmentId}</td>
          <td>${appointmentList[i].serviceName}</td>
          <td>${appointmentList[i].apptDate} ${ appointmentList[i].apptTime }</td>
          <td>${appointmentList[i].createdTimeStamp}</td>
          <td>${appointmentList[i].status}</td>`;

      if (appointmentList[i].status == 'uncompleted') {
        appointments += 
          `<td>
            <button class="btn-reschedule" name="reschedule-button" data-index="${i}">reschedule</button>
            <button class="btn-cancel" name="cancel-button" data-index="${i}">cancel</button>
          </td></tr>`;
      } else if (appointmentList[i].status == 'completed' && theStatus != 'Feedback') {
        if (appointmentList[i].feedbackCompleted === false) {
          appointments += `<td><button id="btn-feedback${i}" class="btn-feedback" name="feedback-button" data-index="${i}">feedback</button></td></tr>`;
        } else {
          appointments += `<td><button id="btn-feedback${i}" class="btn-feedback" name="feedback-button" data-index="${i}" disabled style="background-color: lightgrey;">feedback</button></td></tr>`;
        }
      }

      if (theStatus == 'Feedback') {
        appointments += `<tr><td colspan="6">`;
        return displayFeedback(appointments);
      }

      appointments += `<tr><td colspan="6"><div id="details${i}"></div></td></tr>`;
    }
  }

  appointments += `</table><hr>`; 
  document.getElementById('listDisplay').innerHTML = appointments;

  appointments += `</table><hr>`; 
  document.getElementById('listDisplay').innerHTML = appointments;

  const rescheduleButtons = document.querySelectorAll('.btn-reschedule');
  rescheduleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const index = button.dataset.index;
      reschedule(index);
    });
  });

  const cancelButtons = document.querySelectorAll('.btn-cancel');
  cancelButtons.forEach(button => {
    button.addEventListener('click', () => {
      const index = button.dataset.index;
      cancel(index);
    });
  });

  const feedbackButtons = document.querySelectorAll('.btn-feedback');
  feedbackButtons.forEach(button => {
    button.addEventListener('click', () => {
      const index = button.dataset.index;
      feedback(index);
    });
  });
}

function feedback(index){
  let orderID = appointmentList[index].appointmentId;
  localStorage.setItem('orderID',orderID);
  let theId = "details"+index;
  document.getElementById(theId).innerHTML=index;
  let feedback = true;
  localStorage.setItem('feedback',feedback);
  let newList = [appointmentList[index]];

  displayAppointments('Feedback',newList);
  
  localStorage.setItem('feedbackIndex',index);
}

function displayFeedback(theMsg){

  let questions = [
    ["Where did you hear about us?(select all that apply)",
    "Internet","Magazine","Newspaper","Word of Mouth","Other"],
    ["How far in advance did you make your appointment?",
    "Less than 1 week","Within 2 weeks","Within 1 month","Within 2 months","More than 2 months"],
    ["Were you seen in a timely manner after arriving for your appointment?",
    "Immediately","Promptly","Reasonably","Delayed","Significantly Delayed"],
    ["Were you provided with clear instructions regarding your treatment or follow-up care?",
    "Very Clear","Clear","Fair","Unclear","Not Clear at All"],
    ["How do you feel like our services",
    "Extremely satisfied","Very satisfied","Satisfied","Dissatisfied","Very dissatisfied"]
  ]; 
  
  let message = theMsg +`<form id="form-feedback" class="my-3" method="get" action="#" autocomplete="on" autocapitalize="words"><table><tr><td colspan="5">Thank you for your patience to finish this form~! Please choose the option below.</td></tr>`;

  for(let index=0;index<questions.length;index++){
    let optionType;
    if(index == 0){
      optionType='checkbox';
    }else{
      optionType='radio';
    }

    message += `<tr id="question${index}"><td colspan="5"><label>${(index+1)}. ${questions[index][0]}</label></td></tr><tr>`;
    for(let i=1;i<questions[index].length;i++){

      message += `<td><input type="${optionType}" id="answer${index}${i}" value="${questions[index][i]}" name="answer${index}">
      <label for="answer${index}${i}">${questions[index][i]}</label></td>`
    }
  }
  message+=`<tr>
  <td colspan="5"><button class="w-50 btn-feedback" type="submit" name="feedback-submit">Submit</button></td></tr></table></form></td></tr></table>`;


  document.getElementById('listDisplay').innerHTML = message;
  let submitBtn = document.getElementsByName('feedback-submit');
  submitBtn[0].addEventListener('click', feedbackSub());
  
  $('#form-feedback table tr').css({
    'justify-content': 'center'
  });

  $('#form-feedback table tr:odd').css({
    'background-color': '#ddd',
    'color'           : '#00f'
    
  });

  $('#form-feedback table tr:odd td').css({
    'text-align': 'left',
    'padding-left'    : '3px'
  });

  $('#form-feedback table tr:odd td:last').css({
    'text-align': 'center'
  });

  $('#form-feedback td label').css({
    'font-size':'0.8rem'
  });

}


function feedbackSub(){
  let checkboxAns = document.querySelectorAll('input[type="checkbox"]:checked');
  let radioAns = document.querySelectorAll('input[type="radio"]:checked');
  localStorage.setItem('feedback',false);
  localStorage.removeItem('orderID');
}

/**
 * 
 * @param {string} elementID 
 */

function reschedule(elementID) {
  alert('im here')
  let orderID = appointmentList[elementID].appointmentId;
  let servicesList = ['Family Doctor','Urgent Care','X-ray','Blood Test']
  let value = appointmentList[elementID].serviceName;
  let serviceID = servicesList.indexOf(value);

  localStorage.setItem('serviceID',serviceID);
  localStorage.setItem('orderID',orderID);
  localStorage.setItem('orderIndex',elementID);

  window.location.href = 'reschedule.html';
}

function rescheduleChange(){
  let newDate = window.localStorage.getItem('newDate');
  let newTime = window.localStorage.getItem('newTime');
  let newWeek = window.localStorage.getItem('newWeek');
  let bodateMsg = window.localStorage.getItem('bodateMsg');
  let botimeMsg = window.localStorage.getItem('botimeMsg');
  let boweekMsg = window.localStorage.getItem('boweekMsg');
  let orderIndex = parseInt(window.localStorage.getItem('orderIndex'));
  
  appointmentList[orderIndex][2]=newWeek+"<br>"+newDate +"<br>"+newTime;
  appointmentList[orderIndex][3]=boweekMsg+"<br>"+bodateMsg +"<br>"+botimeMsg;
  
  localStorage.removeItem('serviceID');
  localStorage.removeItem('orderIndex');
  localStorage.removeItem('orderID');
}

/**
 * 
 * @param {string} elementID 
 */

function cancel(elementID){
  let result;
  result = window.confirm('Cancel this appointment?')
  if(result){
    appointmentList.splice(elementID, 1);;
    displayAppointments('total',appointmentList);
  }    
}