'use strict';

        // Function to validate form on change
        function validateFormOnChange() {
            var firstName = document.getElementById('firstName').value.trim();
            var lastName = document.getElementById('lastName').value.trim();
            var isValid = true;
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(function(errorMsg) {
                errorMsg.style.display = 'none';
            });

            var nameRegex = /^[a-zA-Z\s]+$/;

            if (firstName === '' || !nameRegex.test(firstName)) {
                document.getElementById('firstName').focus();
                document.getElementById('firstNameError').style.display = 'inline-block';
                isValid = false;
            }

            if (lastName === '' || !nameRegex.test(lastName)) {
                document.getElementById('lastNameError').style.display = 'inline-block';
                isValid = false;
            }
            return isValid;
        }

        // Attach onchange event listeners to input fields
        document.getElementById('firstName').addEventListener('input', validateFormOnChange);
        document.getElementById('lastName').addEventListener('input', validateFormOnChange);