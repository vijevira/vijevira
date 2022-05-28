const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;
const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};
const admin="vijevira";
const adminpass="Pass@123"
const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    //error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    //error.textContent = '';
}



const checkUsername = (usernameEl) => {

    let valid = false;

    const min = 3,   max = 15;

    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, 'Username cannot be blank.');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Username must be between ${min} and ${max} characters.`);
    } else if(username == admin){
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};
const checkPassword = (passwordEl) => {
    let valid = false;
	const min = 8,   max = 15;

    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
    } else if(!isBetween(password.length, min, max)){
		showError(passwordEl, `Password must be between ${min} and ${max} characters.`);
	}else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
    } else if(password == adminpass){
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
};

const checkEmail = (emailEl) => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};




const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};


const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};


function authentication(){
	const usernameEl=document.getElementById('Uname');
	const passwordEl=document.getElementById('Pass');
	const userFlag=checkUsername(usernameEl);
	const passFlag= checkPassword(passwordEl);
	if (userFlag && passFlag){
		location.href="./index.html";
	}else{
		window.alert("invalid username or password");
	}
};

function showNew(){
	const log=document.getElementById('loginDetails');
	const sig=document.getElementById('signupDetails');
	//log.style.visibility='hidden';
	//sig.style.visibility='visible';
	const temp=log.innerHTML;
	log.innerHTML=sig.innerHTML;
	sig.innerHTML=temp;
	
}
function showLogin(){
	const log=document.getElementById('loginDetails');
	const sig=document.getElementById('signupDetails');
	//log.style.visibility='hidden';
	//sig.style.visibility='visible';
	const temp=log.innerHTML;
	log.innerHTML=sig.innerHTML;
	sig.innerHTML=temp;
};
function signup(){
	const value=0;

}