
//--------------------------------------
//
//		   registration app
//
//--------------------------------------

//
// - This file contains all the rs
//   methods that can be found 
//   specifically on register.php
//
// - functions are added as prototypes
//   of the rs object.
//



/* register methods */


//-------------------------------------------
// - event listener for new usernames
// - determine that username is the correct length
// - ensure username uses the correct characters
// - ajax call to make sure that username is not taken 

var re = /^[a-z0-9_-]{3,32}$/;
var usernameError = "Please enter a username";
rs.prototype.validateUsername = function(){

	// hide the errors
	this.parentElement.children[2].style.display = "none";
	this.parentElement.children[3].style.display = "none";
	this.parentElement.children[4].style.display = "none";
	this.parentElement.children[6].innerHTML = "";

	// do nothing if blank
	if(this.value.length == 0){
		usernameError = "Please enter a username";
		return;
	}

	// if we fit the regex
	if(re.test(this.value)){

		// perform the ajax call
		this.parentElement.children[4].style.display = "block";
		rsApp.ajax("POST", "register.php", "namecheck=1&username="+this.value, rsApp.uniqueUsername, false);	

	}else{
		// if the username is the incorrect length
		if(this.value.length < 3 || this.value.length > 32){
			// set the error
			usernameError = "Username must be between 3 and 32 characters."; 
			// display the error message to the user
			this.parentElement.children[6]
				.innerHTML = "Username must be between 3 and 32 characters.";
		// else there are special characters
		}else{
			// set the error
			usernameError = "Username alphanumeric characters, hyphen, &amp; underscores only";
			// display the error message
			this.parentElement.children[6]
				.innerHTML = "Username alphanumeric characters, hyphen, &amp; underscores only";
		}
		// display the error
		this.parentElement.children[4].style.display = "none";
		this.parentElement.children[3].style.display = "block";		
	}
}
//-------------------------------------------
// - ajax callback 
rs.prototype.uniqueUsername= function(response){
	console.log(response);

	// display the success icon
	// document.getElementById("new-username")

	// set the username property to 1
	usernameError = 0;
}




//--------------------------------------------
// - ensure password is the correct length

var passwordError = "Please set a password";
rs.prototype.validatePassword = function(){

	// hide the errors
	this.parentElement.children[2].style.display = "none";
	this.parentElement.children[3].style.display = "none";
	this.parentElement.children[5].innerHTML = "";

	// hide the check password errors
	document.getElementById("repeat-password").parentElement.children[1].style.display = "none";
	document.getElementById("repeat-password").parentElement.children[2].style.display = "none";
	document.getElementById("repeat-password").parentElement.children[3].innerHTML = "";

	// do nothing if blank
	if(this.value.length == 0){
		passwordError = "Please set a password";
		return;
	}

	// if the password is the incorrect length 
	if(this.value.length < 6 || this.value.length > 64){
		// display the red x
		this.parentElement.children[3].style.display = "block";
		// set the error for this elem
		passwordError = "Password must be between 6 and 64 characters"
		// display the error
		this.parentElement.children[5]
			.innerHTML = "Password must be between 6 and 64 characters";
	}else{
		this.parentElement.children[2].style.display = "block";
		passwordError = 0;
	}
}

//--------------------------------------------
// - double check the password
var repassError = "Please re-enter your password";
rs.prototype.checkPassword = function(){

	// hide the errors
	this.parentElement.children[1].style.display = "none";
	this.parentElement.children[2].style.display = "none";
	this.parentElement.children[3].innerHTML = "";

	// do nothing if blank
	if(this.value.length == 0){
		repassError = "Please re-enter your password";
		return;
	}

	// if the password is the incorrect length 
	if(this.value != document.getElementById("new-password").value){
		// display the red x
		this.parentElement.children[2].style.display = "block";
		// set the repass error
		repassError = "Passwords do not match";
		// display the error
		this.parentElement.children[3]
			.innerHTML = "Passwords do not match";
	}else{
		this.parentElement.children[1].style.display = "block";
		repassError = 0;
	}

}

//--------------------------------------------
// - validate the email address
// - if email already in system, alert user.
var emre = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var newEmail = 0;
rs.prototype.validateEmail = function(){

	// hide the errors
	this.parentElement.children[2].style.display = "none";
	this.parentElement.children[3].style.display = "none";
	newEmail = 0;

	// do nothing if blank
	if(this.value.length == 0)
		return;

	// if we fit the regex
	if(emre.test(this.value)){

		// perform the ajax call
		this.parentElement.children[3].style.display = "block";
		rsApp.ajax("POST", "register.php", "emailcheck=1&email="+this.value, rsApp.uniqueEmail, false);	

	}

}
//----------------------------------------
// - callback to verify that email is not
//   already in use
rs.prototype.uniqueEmail = function(response){

	console.log(response);

	newEmail = response;

}


//----------------------------------------
// - ensures that the form data has been 
//   validated.
// - ajax call posts to create new user
rs.prototype.createUser = function(){

	// start a domStr
	rsApp.tempStr = "<ul>";

	// if there is a username error message
	if( usernameError )
		rsApp.tempStr += "<li>"+ usernameError +"</li>";

	// if there is a password error message
	if( passwordError )
		rsApp.tempStr += "<li>"+ passwordError +"</li>";
	// or if the passwords do not match
	else if( repassError )
		rsApp.tempStr += "<li>"+ repassError +"</li>";

	// if the user has not agreed to the terms of use
	if( !document.getElementById("tou").checked )
		rsApp.tempStr += "<li>Please agree to the terms of use</li>";

	// if there were any errors
	if( rsApp.tempStr.length > 4 ){

		rsApp.tempStr += "</ul>";

		// remove previous error alert if present
		if(this.parentElement.children.length > 1)
			this.parentElement.removeChild(this.parentElement.children[0])

		// compile all the errors into a dismissable alert
		rsApp.insertAlert( "danger",
						   rsApp.tempStr,
						   this );
	}else{

		// ajax submit user data
		rsApp.ajax(
						"POST",
						"http://localhost/routesider/register.php",
						"create_user=1" +
						"&username=" + document.getElementById("new-username").value +
						"&password=" + document.getElementById("new-password").value +
						"&email=" + newEmail,
						rsApp.createUserCB,
						false
				  );
	}
}
// new user created callback
rs.prototype.createUserCB = function(response){

	console.log("new user script callback: ");
	console.log(response);
}


/* initialize */

document.addEventListener("DOMContentLoaded", function(){

    // create new rs object
    rsApp = new rs();

	// add event listeners to the username field
	document.getElementById("new-username")
		.addEventListener("keyup", rsApp.validateUsername, false);

	// add event listener to the password
	document.getElementById("new-password")
		.addEventListener("keyup", rsApp.validatePassword, false);

	// check password
	document.getElementById("repeat-password")
		.addEventListener("keyup", rsApp.checkPassword, false);
	
	// valid email
	document.getElementById("new-email")
		.addEventListener("keyup", rsApp.validateEmail, false);

	// submit button
	document.getElementById("submit-new-user")
		.addEventListener("click", rsApp.createUser, false);

}, false);

