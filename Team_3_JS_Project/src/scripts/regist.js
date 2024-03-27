/* For validating the registration form 
    Author: Jing Yang
    Date: Mar 14, 2024
*/

'use strict';
alert();
let pwdform = document.getElementById('pwd');
let pwdconfirm = document.getElementById('pwdconf');
let emailelem = document.getElementById('email-address');
let fnamelem = document.getElementById('first-name');
let lnamelem = document.getElementById('last-name');

let secueKey = new Map([
  ["john_smith@123.com","123456"],
  ["mary_wood@123.com","456789"],
  ["lucy_allen@123.com","000000"]
]
);
