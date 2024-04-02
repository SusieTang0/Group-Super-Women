// getAppointments from the database filtering by customerId. Example, will get all appointments for customer with customerId, 1.
export function getAppointments(customerId) {
    // eventually customerId will be taken from localStorage. Saved as 1 for now.
    let url = '/getAppointment?customerId=' + customerId;
    fetch(url, {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // a list of all appointments with that customerId. (both completed and uncompleted appointments)
    });
}

// getAppointments(1); // returns 3 appointment objects

/* ************************************************************************************************************************** */
/* getAppointment for a specific day to be used when creating an appointment depending on the date and serviceName.
This gives a list of all appointments for one day for a specific service. Each of these appointments you can get the time
using apptTime. */

export function getAppointmentTimes(apptDate, serviceName) {
    let url = '/getAppointmentTime?apptDate=' + apptDate + '&&serviceName=' + serviceName;
    fetch(url, {
        method: 'GET'
    })
    .then(response => {
    if (!response.ok) {
    throw new Error('Network response was not ok: ' + response.status);
    }
    return response.json();
    })
    .then(data => {
        let timeList = [];
        for (let appt of data) {
            timeList.push(appt.apptTime);
        }
        console.log(timeList);  // a list of all times of appointments with that apptDate and serviceName.
    });
}

// getAppointmentTimes("2024-04-10", "Blood Test");  // returns ['01:00 PM', '05:00 PM'].


/* ************************************************************************************************************************** */
/* get data from the HTML page when creating an appointment */
let createdApptData = {
  apptDate: "2024-04-10", // value to be taken when selected on the html page. 
  apptTime: "05:00 PM", // value to be taken when selected on the html page.
  customerId: 1,   // will be taken from localStorage the customerId after user signs in
  paymentId: 6,   // NEED TO GET LIST OF PAYMENTS AND ADD 1 TO IT.
  serviceName: "Blood Test",  // value to be taken when selected on the html page.
  servicePrice: 30, // value to be taken when selected on the html page.
  status: "Uncompleted"  // will always be this when creating a new appointment
}

export function createAppointment(createdApptData) {
    // creates a new appointment object and saves it into the database.
    fetch('/insertAppointment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(createdApptData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);  // returns appointmentId
    })
    .catch(error => {
        console.error('Error saving data:', error);
    });
}

//createAppointment(createdApptData);

/* ************************************************************************************************************************** */
/* delete an appointment given the appointmentId */

export function deleteAppointment(appointmentId) {
    let url = '/deleteAppointment?appointmentId=' + appointmentId;
    fetch(url, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);  // returns paymentId
    })
    .catch(error => {
        console.error('Error deleting data:', error);
    });
}

//deleteAppointment(6);

/* ************************************************************************************************************************** */
/* update an appointment given the appointmentId */
let updatedData = {
  apptDate: "2024-05-01", // changed value to be taken when changing date on the html page. 
  apptTime: "09:00 AM", // changed time to be taken when changing time on the html page.
  serviceName: "X-Ray",  // changed value to be taken when changing serviceName on the html page. 
  servicePrice: 500 // changed value to be taken when changing servicePrice on the html page. 
}

export function updateAppointment(appointmentId, updatedData) {
    let url = '/updateAppointment/' + appointmentId;
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.status);
    }
        console.log('Appointment updated successfully');
    });
}

// updateAppointment(7, updatedData);

  