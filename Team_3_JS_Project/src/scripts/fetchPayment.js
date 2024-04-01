

/* ************************************************************************************************************************** */
/* get data from the HTML page when creating an payment */
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
      payment.paymentId = data;  // returns paymentId
  })
  .catch(error => {
      console.error('Error saving data:', error);
  });
}

//createPayment(createdPaymentData);// returns: paymentId
