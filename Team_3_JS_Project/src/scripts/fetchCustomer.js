
// Login function
export async function login(email, password) {
  try {
    // Send login reques
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    const data = await response.json();

    // If login successful, store JWT in local storage
    if (response.ok) {
      localStorage.setItem('jwt', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('firstname', data.firstname);
      console.log('Login successful');
    } else {
      console.error('Login failed:', data.message);
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
}

// Send request for customer information
export async function getCustomerInfo() {
  try {
    // Get JWT from local storage
    const token = localStorage.getItem('jwt');
    if (!token) {
      console.error('Not logged in');
      return;
    }
    
    // Send request with JWT
    const response = await fetch('/getCustomerByJwt', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}` // Set the Authorization request header with the acquired JWT
      }
    })
    if (response.ok) {
      const data = await response.json();
      console.log(data); 
    } else {
      throw new Error('Failed to fetch customer data');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Send request to create new customer
async function insertCustomer(userData){
  fetch('/insertCustomer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to create customer');
    }
  })
  .then(data => {
    console.log(data); 
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

// Check whether the email exists in database
async function checkCustomerEmail(email){
  fetch('/insertCustomer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(email)
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to check customer email');
    }
  })
  .then(data => {
    console.log(data); 
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

async function updateCustomer(customerId, updatedData) {
  let url = '/updateCustomer/' + customerId;
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
      console.log('Customer updated successfully');
  });
}