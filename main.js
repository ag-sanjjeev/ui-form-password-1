/*
 ________________________________________________
(                Password Form 1               ()
\-----------------------------------------------\
|                                               |
|   Copyright 2024 ag-sanjjeev                  |
|                                               |
|-----------------------------------------------|
|   The source code is licensed under           |
|   MIT-style License.                          |
|                                               |
|-----------------------------------------------|
|                                               |
|   The usage, permission and condition         |
|   are applicable to this source code          |
|   as per license.                             |
|                                               |
|-----------------------------------------------|
|                                               |
|   That can be found in LICENSE file           |
|   or at https://opensource.org/licenses/MIT.  |
(_______________________________________________(

*/
const theme = document.getElementById('theme');
const toggleTheme = document.getElementById('toggle-theme');
const passwordField = document.getElementById('passwordField');
const showPassword = document.getElementById('showPassword');
const passwordStrengthMeter = document.getElementById('password-strength-meter');
const strengthMessage = document.getElementById('strength-message');
const length__validation = document.getElementById('length-validation');
const case__validation = document.getElementById('case-validation');
const specialChar__validation = document.getElementById('specialChar-validation');
const passwordLength__limit = 8;

// validation function
function validate() {
	let validationResult = [];
	let meterValue = 0;
	let totalValidations = 3;
	let validationMessage = ['poor', 'poor', 'moderate', 'excellent'];

	// Password Length Validation
	if (passwordField.value.length < passwordLength__limit) {
		length__validation.classList.remove('valid');
		validationResult.push(false);
	} else {
		length__validation.classList.add('valid');
	}

	// Password Uppercase Validation
	if (/[A-Z]/.test(passwordField.value)) {
		case__validation.classList.add('valid');
	} else {		
		case__validation.classList.remove('valid');
		validationResult.push(false);
	}

	// Password Special Characters Validation
	if (/[!@#$%^&*()_+{}\[\]:;<>?,./|]/g.test(passwordField.value)) {
		specialChar__validation.classList.add('valid');
	} else {
		specialChar__validation.classList.remove('valid');
		validationResult.push(false);
	}

	// Meter value calculation
	meterValue = Number( (totalValidations - validationResult.length) * 33.33 );
	passwordStrengthMeter.value = meterValue;

	// Password Strength Message
	strengthMessage.innerText = validationMessage[totalValidations - validationResult.length];

	if (validationResult.indexOf(false) !== -1) {
		return false;
	}

	return true;
}

// Event Listeners
toggleTheme.addEventListener('change', function() {
	if (toggleTheme.checked) {
		theme.href = './dark-theme.css';
	} else {
		theme.href = './light-theme.css';
	}
});

passwordField.addEventListener('input', function() {
	validate();
});

showPassword.addEventListener('click', function() {
	(passwordField.type == 'password') ? showPassword.innerText = 'Hide' : showPassword.innerText = 'Show';
	(passwordField.type == 'password') ? passwordField.type = 'text' : passwordField.type = 'password';
});