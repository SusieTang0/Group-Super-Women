// JavaScript source code
// appointments_display.js 

// Script Date: March 11, 2024

'use strict';
import { getAppointments, getAppointmentTimes, createAppointment, deleteAppointment, updateAppointment } from "./fetchAppointment.js";
let list = await getAppointments(1);
let response = await getAppointmentTimes("2024-04-10", "Blood Test");

// appointment = [orderNumber,service,appointmentDate,bookingDate,status,paymentID];
let createdApptData = {
  apptDate: "2024-04-10", // value to be taken when selected on the html page. 
  apptTime: "05:00 PM", // value to be taken when selected on the html page.
  customerId: 1,   // will be taken from localStorage the customerId after user signs in
  paymentId: 6,   // NEED TO GET LIST OF PAYMENTS AND ADD 1 TO IT.
  serviceName: "Blood Test",  // value to be taken when selected on the html page.
  servicePrice: 30, // value to be taken when selected on the html page.
  status: "Uncompleted"  // will always be this when creating a new appointment
}
let updatedData = {
  apptDate: "2024-05-01", // changed value to be taken when changing date on the html page. 
  apptTime: "09:00 AM", // changed time to be taken when changing time on the html page.
  serviceName: "X-Ray",  // changed value to be taken when changing serviceName on the html page. 
  servicePrice: 500 // changed value to be taken when changing servicePrice on the html page. 
}

var appointmentList;
var feedbackList = new Array();

window.addEventListener('load',startUp);
window.addEventListener('load',setLeftSideBar);

function startUp(){
  appointmentList = [['AEX123','Blood Test', '2024-03-24 11:00 am', '2024-02-19 07:53 pm','uncompleted',],['CE6RS4','Family Doctor', '2024-03-21 05:00 pm', '2024-03-09 07:53 am','uncompleted'],['0E3RV4','Urgent Care', '2024-01-24 11:00 am', '2024-01-19 07:53 pm','completed',],['0G3UT5','Family Doctor', '2024-02-21 05:00 pm', '2024-02-09 07:53 am','completed',]];

  //const params = (new URL(document.location)).searchParams;

  let status = window.localStorage.getItem('status');
  let serviceID = window.localStorage.getItem('serviceID');
  if(serviceID != undefined){
    rescheduleChange();
  }
  

  

  displayAppointments(status,appointmentList);

  if(localStorage.getItem('feedbackIndex') != undefined){
    let id = 'btn-feedback' + localStorage.getItem('feedbackIndex')
    $(`#${id}`).css({
      'background-color': 'lightgray'
    });

    document.getElementById(id).onclick= ()=>{
      let theId = "details"+localStorage.getItem('feedbackIndex');
      
      document.getElementById(theId).innerHTML='You already completed the feedack form.Thank you~!';
    };
    
  }
}

document.getElementById('status-option').onchange=()=>{
  let status= document.getElementById('status-option').value;
  localStorage.setItem('status',status);
  startUp();
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

/**
 * 
 * @param {string} theStatus 
 * @param {Array} theList 
 */

function displayAppointments(theStatus,theList){
  let appointments = ""; 
  let titleName = "";
  let optionTitle = "<td>Options</td>";
  if(theStatus == "uncompleted"){
    titleName = "Uncompleted&nbsp;Appointments"
  }else if(theStatus == "completed"){
    titleName = "Completed&nbsp;Appointments"
  }else if(theStatus == "total"){
    titleName = "Appointments";
  }else{
    titleName = "Appointment&nbsp;"+ theStatus;
    optionTitle = "";
  }

  document.getElementById('appointTitle').innerHTML= titleName;

  appointments += 
  `<table >
    <tr class="listDisplay-tr"><td>Order#</td><td>Service</td><td>Appointment<br>Date&nbsp;&&nbsp;Time</td><td>Booking<br>Date&nbsp;&&nbsp;Time</td><td>Status</td>${optionTitle}</tr>`;


  for(let counter = 0;counter<theList.length;counter++){
    

    if(theList[counter][4] == theStatus || theStatus == 'total' || theStatus == 'Feedback'){
      appointments += `<tr class="listDisplay-tr"><td>${theList[counter][0]}</td><td>${theList[counter][1]}</td><td>${appointmentList[counter][2]}</td><td>${theList[counter][3]}</td><td>${theList[counter][4]}</td>`
      if(theList[counter][4] == 'uncompleted'){
        appointments += `<td><button class="btn-reschedule" name="reschedule-button" onclick="reschedule('${counter}');">reschedule</button>
        <button class="btn-cancel" name="cancel-button" onclick="cancel('${counter}');">cancel</button></td></tr>`;
      }else if(theList[counter][4] == 'completed'){
        if(theStatus != 'Feedback'){
        appointments += `<td><button id="btn-feedback${counter}" class="btn-feedback" name="feedback-button" onclick="feedback('${counter}');">feedback</button></td></tr>`;}
      }
      if(theStatus == 'Feedback'){
        appointments += `<tr><td colspan="6">`;
        return displayFeedback(appointments);
        
      }
      appointments += `<tr><td colspan="6"><div id="details${counter}"></div></td></tr>`
    }
    
  }
  
    /*array = completedList;
    document.getElementById('title').innerHTML = `<h4 id="title" class="ps-2 pt-4">Uncompleted Appointments</h4>`;
    extra_info = `<a id="link-reschedule" src="appoint">feedback</a><a id="btn-feedback" >feedback</a>`*/
  appointments += `</table><hr>`; 
  document.getElementById('listDisplay').innerHTML= appointments;
  
}


function feedback(index){
  let orderID = appointmentList[index][0];
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
  
  let message = theMsg +`<form id="form-feedback" class="my-3" method="get" action="#" autocomplete="on" autocapitalize="words"><table><tr><td colspan="5">Thank you for your patient to finish this form~!Please choose the option below.</td></tr>`;

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
  <td colspan="5"><button class="w-50 btn-feedback" type="submit" name="feedback-submit" onclick="feedbackSub();" >Submit</button></td></tr></table></form></td></tr></table>`;

 



  document.getElementById('listDisplay').innerHTML = message;
  
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
  let checkboxAns = document.getElementsByTagName('checkbox');
  let radioAns = document.getElementsByTagName('radio');
  localStorage.setItem('feedback',false);
  localStorage.removeItem('orderID');
}

/**
 * 
 * @param {string} elementID 
 */

function reschedule(elementID){
  let orderID = appointmentList[elementID][0];
  let servicesList = ['Family Doctor','Urgent Care','X-ray','Blood Test']
  let value = appointmentList[elementID][1];
  let serviceID = servicesList.indexOf(value);

  localStorage.setItem('serviceID',serviceID);
  localStorage.setItem('orderID',orderID);
  localStorage.setItem('orderIndex',elementID);

  window.location.href = 'reschedule-en.html';
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

