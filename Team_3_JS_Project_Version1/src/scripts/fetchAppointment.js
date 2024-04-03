let url, paymentId, appointmentId, customerId;
// getAppointments from the database filtering by customerId. Example, will get all appointments for customer with customerId, 1.

// eventually customerId will be taken from localStorage. Saved as 1 for now.
// customerId = 1;
// url = '/getAppointment?customerId=' + customerId;
// fetch(url, {
//   method: 'GET'
// })
// .then(response => {
// if (!response.ok) {
//   throw new Error('Network response was not ok: ' + response.status);
// }
//   return response.json();
// })
// .then(data => {
//   console.log(data); // a list of all appointments with that customerId. (both completed and uncompleted appointments)
// });

/* ************************************************************************************************************************** */
/* getAppointment for a specific day to be used when creating an appointment depending on the date and serviceName.
This gives a list of all appointments for one day for a specific service. Each of these appointments you can get the time
using apptTime. */

// let apptDate = "2024-03-01";  // value to be taken when selected on the html page.
// let serviceName = "Family Doctor";  // value to be taken when selected on the html page.
// url = '/getAppointmentTime?apptDate=' + apptDate + '&&serviceName=' + serviceName;
// fetch(url, {
//   method: 'GET'
// })
// .then(response => {
// if (!response.ok) {
//   throw new Error('Network response was not ok: ' + response.status);
// }
//   return response.json();
// })
// .then(data => {
//   console.log(data);  // a list of all appointments with that apptDate and serviceName.
// });

/* ************************************************************************************************************************** */
/* get data from the HTML page when creating an appointment */
// let data = {
//   apptDate: "2024-04-01", // value to be taken when selected on the html page. 
//   apptTime: "05:00 PM", // value to be taken when selected on the html page.
//   customerId: 1,   // will be taken from localStorage the customerId after user signs in
//   paymentId: 6,   // need to get all payments and then add 1 to the length.
//   serviceName: "Family Doctor",  // value to be taken when selected on the html page.
//   servicePrice: 30, // value to be taken when selected on the html page.
//   status: "Uncompleted"  // will always be this when creating a new appointment
// }

// creates a new appointment object and saves it into the database.
// fetch('/insertAppointment', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(data)
// })
// .then(response => {
//   if (!response.ok) {
//     throw new Error('Network response was not ok: ' + response.status);
//   }
//   return response.json();
// })
// .then(data => {
//   console.log('Data saved successfully:', data);
// })
// .catch(error => {
//   console.error('Error saving data:', error);
// });

/* ************************************************************************************************************************** */
/* delete an appointment given the appointmentId */
// appointmentId = 6   // value to be taken from the selected appointment to cancel in html
// url = '/deleteAppointment?appointmentId=' + appointmentId;
// fetch(url, {
//   method: 'DELETE'
// })
// .then(response => {
// if (!response.ok) {
//   throw new Error('Network response was not ok: ' + response.status);
// }
//   return response.json();
// })
// .then(data => {
//   console.log(data); // the status message saying appointment was deleted.
// });

/* ************************************************************************************************************************** */
/* update an appointment given the appointmentId */
// let data = {
//   apptDate: "2024-05-01", // changed value to be taken when changing date on the html page. 
//   apptTime: "09:00 AM", // changed time to be taken when changing time on the html page.
//   serviceName: "X-Ray",  // changed value to be taken when changing serviceName on the html page. 
//   servicePrice: 500 // changed value to be taken when changing servicePrice on the html page. 
// }
// appointmentId = 6   // value to be taken from the selected appointment to cancel in html
// url = '/updateAppointment/' + appointmentId;
// fetch(url, {
//   method: 'PUT',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(data)
// })
// .then(response => {
//   if (!response.ok) {
//     throw new Error('Network response was not ok: ' + response.status);
//   }
//     console.log('Appointment updated successfully');
// });
