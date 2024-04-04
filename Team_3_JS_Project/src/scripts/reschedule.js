/* Purpose: Choose date and time for the appointment
   Author: Jing Yang
   Date:   March 4, 2024
*/

'use strict';
import { updateAppointment } from "./fetchAppointment.js";

let newAppointmentId = localStorage.getItem("orderID");
let dateMsg = "";
let timeMsg = "";
let servChecked = -1;
let dateChecked = 0;
let timeChecked = 0;
let calenderDays = null;
let calDays = null;
let currMonth = "";
let currYear = "";
let curYearN = 0;
let curMonthN = 0;
let dayofMonth = 0;
let selectedDay = null;
let serItems = document.querySelectorAll("#appointmenthead input");
let servDetail = document.querySelectorAll("#serdet p");
let servDetailList = new Array();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const weeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let calul = document.getElementById("calDays");
let monthLable = document.getElementById("calMonth");
let yearLable = document.getElementById("calYear");
let decMonth = document.getElementsByClassName("prev");
let incMonth = document.getElementsByClassName("next");

let today = new Date();
let thisDate = today.getDate();
let thisMonth = today.getMonth();
let thisYear = today.getFullYear();
let thisDay = today.getDay();

let orderWeek;
let orderDate;
let orderTime;

makeCalender(thisMonth, thisYear);
makeTimeTable(today);

let serviceID = window.localStorage.getItem('serviceID');
servDetail[0].innerHTML = "Order Number: #" + bookingNumber();
servDetail[1].innerHTML = serItems[serviceID].alt;
servDetail[5].innerHTML = "$" + serItems[serviceID].value;
servDetailList[1] = serItems[serviceID].alt;
servDetailList[0] = bookingNumber();
servDetailList[5] = serItems[serviceID].value;
servChecked = serviceID;




incMonth[0].addEventListener('click', function() {
    findCurrentDate();

    if (curMonthN != 11) {
        curMonthN++;
    } else {
        curMonthN = 0;
        curYearN++;
    }

    calul.innerHTML = "";

    makeCalender(curMonthN, curYearN);
});

decMonth[0].addEventListener('click', function() {
    findCurrentDate();

    if ((curYearN > thisYear) || ((curYearN == thisYear) && (curMonthN > thisMonth))) {
        if (curMonthN != 0) {
            curMonthN--;
        } else {
            curMonthN = 11;
            curYearN--;
        }

        calul.innerHTML = "";

        makeCalender(curMonthN, curYearN);
    }
});

function hookuptime() {
    let timelist = document.querySelectorAll(".timetable li:not(.inactive)");
    
    function handleClick() {
        let actTime = document.querySelectorAll(".timetable li.active");

        if (dateChecked == 0) {
            alert("Please choose a date first!");
        } else {
            if (actTime.length < 1) {
                this.classList.toggle("active");
            } else {
                actTime[0].classList.toggle("active");
                this.classList.toggle("active");
            }

            timeChecked = 1;
            timeMsg = this.innerHTML;
            servDetail[3].innerHTML = timeMsg;
            servDetailList[3] = timeMsg;
        }
    }

    timelist.forEach(item => {
        item.addEventListener('click', handleClick);
    });
}

function findDays(txtString) {
    const regExp = /\d+/;
    return parseInt(txtString.match(regExp));
}

function findCurrentDate() {
    currMonth = monthLable.innerHTML;
    currYear = yearLable.innerHTML;

    curYearN = parseInt(currYear);
    curMonthN = months.indexOf(currMonth);
}

function makeCalender(theMonth, theYear) {
    let curday = new Date(theYear, theMonth, 1);
    let day1stMonth = curday.getDay();

    for (let di = 1; di <= day1stMonth; di++) {
        calul.innerHTML += "<li><span class=\"inactive\">&nbsp;</span></li>";
    }

    if ((theMonth == 1) && ((theYear & 3) == 0 && ((theYear % 25) != 0 || (theYear & 15) == 0))) {
        dayofMonth = daysInMonth[theMonth] + 1;
    } else {
        dayofMonth = daysInMonth[theMonth];
    }

    for (let dj = 1; dj <= dayofMonth; dj++) {
        if ((theMonth == thisMonth) && (dj < thisDate + 1) && (theYear == thisYear)) {
            calul.innerHTML += "<li><span class=\"inactive\">" + dj + "</span></li>";
        } else {

            if ((dateChecked == 1) && (selectedDay.getDate() == dj) && (selectedDay.getMonth() == theMonth) && (selectedDay.getFullYear() == theYear)) {
                calul.innerHTML += "<li><span class=\"active\">" + dj + "</span></li>";
            } else {
                calul.innerHTML += "<li><span>" + dj + "</span></li>";
            }
        }
    }

    for (let dk = 1; dk <= 42 - (daysInMonth[thisMonth] + day1stMonth); dk++) {
        calul.innerHTML += "<li><span class=\"inactive\">&nbsp;</span></li>";
    }

    monthLable.innerHTML = months[theMonth];
    yearLable.innerHTML = theYear;

    hookupDays();

}

function hookupDays() {
    calenderDays = document.querySelectorAll(".days li span");
    calDays = document.querySelectorAll(".days li");

    findCurrentDate();

    function handleMouseOver() {
        if (this.className !== "inactive") {
            this.style.backgroundColor = 'lightyellow';
        }
    }

    function handleMouseOut() {
        if (this.className !== "inactive") {
            this.style.backgroundColor = '#eee';
        }
    }

    function handleClick() {
        let actDay = document.querySelectorAll(".days li span.active");

        if (this.className !== "inactive") {
            if (servChecked >= 0) {
                if (actDay.length < 1) {
                    this.classList.toggle("active");
                } else {
                    actDay[0].classList.toggle("active");
                    this.classList.toggle("active");
                }

                let dateTxt = this.innerHTML;

                let selday = new Date(curYearN, curMonthN, findDays(dateTxt));

                dateMsg = weeks[selday.getDay()] + ", " + months[curMonthN] + " " + findDays(dateTxt) + ", " + curYearN;

                servDetail[2].innerHTML = dateMsg;
                orderDate = months[curMonthN] + " " + findDays(dateTxt) + ", " + curYearN;
                orderWeek = weeks[selday.getDay()];
                document.getElementById("date-content").innerHTML = dateMsg;
                dateChecked = 1;
                selectedDay = selday;
                makeTimeTable(selectedDay);
            } else {
                alert("Please choose a service first!");
            }
        }
    }

    calDays.forEach((day, index) => {
        if (calenderDays[index].className !== "inactive") {
            day.addEventListener('mouseover', handleMouseOver);
            day.addEventListener('mouseout', handleMouseOut);
            calenderDays[index].addEventListener('click', handleClick);
        }
    });
}

function resetDateTime() {
    dateChecked = 0;
    servDetail[2].innerHTML = "Choose Date.";
    servDetail[3].innerHTML = "Choose time.";
    document.getElementById("date-content").innerHTML = "Please choose a date first.";

    calul.innerHTML = "";
    makeCalender(curMonthN, curYearN);

    let actTime = document.querySelectorAll(".timetable li.active");
    if (actTime.length >= 1) {
        actTime[0].classList.toggle("active");
    }
    timeChecked = 0;
}

function makeTimeTable(datetime) {

    let timetblele = document.querySelector('.timetable');

    timetblele.innerHTML = "";

    if ((datetime.getDay() == 0) || (datetime.getDay() == 6)) {
        for (let j = 9; j <= 14; j++) {
            timetblele.innerHTML += "<li>" + (j <= 12 ? j : j - 12) + ":00 " + ((j < 12 ? "am" : "pm")) + "</li>";
        }
    } else {
        for (let i = 8; i <= 17; i++) {
            timetblele.innerHTML += "<li>" + (i <= 12 ? i : i - 12) + ":00 " + ((i < 12 ? "am" : "pm")) + "</li>";
        }
    }
    hookuptime();
}


function startUp() {
    let serviceID = window.localStorage.getItem('serviceID');
    if (serviceID != null) {
        lockService(serviceID);
    }
}

function lockService(id) {
    let services = document.getElementById('appointmenthead').getElementsByTagName('input');
    for (let index = 0; index < services.length; index++) {
        if (index != id) {
            services[index].disabled = true;
        } else {
            services[index].checked = true;
        }
    }

}

function bookingNumber() {
    let newString = (parseInt(newAppointmentId, 16) + 1).toString(16).toUpperCase();
    let result = "";
    if (newString.length < 6) {
        for (let i = 0; i < (6 - newString.length); i++) {
            result += "0";
        }
    }
    result += newString;

    return result;
}

function rescheduleInfo() {
    if ((servChecked != -1) && (dateChecked != 0) && (timeChecked != 0)) {
        alert(servDetailList[3]);
        localStorage.setItem('newDate', orderDate);
        localStorage.setItem('newTime', servDetailList[3]);
        localStorage.setItem('newWeek', orderWeek);

        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let bodateMsg = months[now.getMonth() + 1] + " " + now.getDay() + ", " + curYearN;
        let botimeMsg = (hours <= 12 ? hours : hours - 12) + ":" + minutes + " " + ((hours < 12 ? "am" : "pm"));

        localStorage.setItem('boweekMsg', weeks[now.getDay()]);
        localStorage.setItem('bodateMsg', bodateMsg);
        localStorage.setItem('botimeMsg', botimeMsg);
        let updateData = {
            apptDate: orderDate,
            apptTime: servDetailList[3]
        }
        updateAppointment(newAppointmentId, updateData);




        window.location.href = 'appointment-display.html';
        return true;
    } else {
        alert("Please finish making the appointment!")
        return false;
    }

}

document.getElementById("make-appointment").addEventListener("click", rescheduleInfo);




window.addEventListener('load', startUp);