
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




//----------------------------------------------
// - Event listener toggle slide out menu for
//   pages with no map
rs.prototype.toggleMobileMenu = function(){
	// set the max width of the content cover
	// if the menu is hidden and the window is mobile-sized
	if( document.getElementById("page-content").style.transform != "translate(270px, 0px)"
		&& window.innerWidth < 768 ){
		// open the menu
		document.getElementById("page-content").style.transform = "translate(270px, 0px)";
		document.getElementById("content-cover").style.transform = "translate(270px, 0px)";
		// cover the content
		document.getElementById("content-cover").style.display = "block";
		// set timer to reveal #content-cover
		setTimeout( rsApp.showContentCover , 200 );
	}else{
		// close the menu
		document.getElementById("page-content").style.transform = "translate(0px, 0px)";
		document.getElementById("content-cover").style.transform = "translate(0px, 0px)";
		// reveal the content
		document.getElementById("content-cover").style.opacity = "0";
		// set timer to hide #content-cover
		setTimeout( rsApp.hideContentCover , 300 );
	}
}


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
// - returns 0 if no match
// - returns 1 if username taken
rs.prototype.uniqueUsername= function(response){

	// hide the hourglass icon
	document.getElementById("new-username").parentElement.children[4].style.display = "none";
	
	// if the username is not taken
	if(response === "0"){

		// display the success icon
		document.getElementById("new-username").parentElement.children[2].style.display = "block";
		// remove any username errors
		usernameError = 0;

	}else{

		// this line may not be necessary in production, because race conditions & ajax
		document.getElementById("new-username").parentElement.children[2].style.display = "none";
		// display the error icon
		document.getElementById("new-username").parentElement.children[3].style.display = "block";
		// set the error message
		usernameError = "This username is already taken";
		// display the error message
		document.getElementById("new-username").parentElement.children[6].innerHTML = "This username is already taken";
	}
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
	this.parentElement.children[4].style.display = "none";
	this.parentElement.children[5].innerHTML = "";
	newEmail = 0;

	// do nothing if blank
	if(this.value.length == 0)
		return;

	// if we fit the regex
	if(emre.test(this.value)){

		// perform the ajax call
		this.parentElement.children[4].style.display = "block";
		rsApp.ajax("POST", "register.php", "emailcheck=1&email="+this.value, rsApp.uniqueEmail, false);	

	}

}
//----------------------------------------
// - callback to verify that email is not
//   already in use
rs.prototype.uniqueEmail = function(response){

	// hide the hourglass icon
	document.getElementById("new-email").parentElement.children[4].style.display = "none";
	
	// if the email is not already in the system
	if(response === "0"){

		// display the success icon
		document.getElementById("new-email").parentElement.children[2].style.display = "block";
		// remove any username errors
		newEmail = document.getElementById("new-email").value;

	}else{

		// this line may not be necessary in production, because race conditions & ajax
		document.getElementById("new-email").parentElement.children[2].style.display = "none";
		// display the error icon
		document.getElementById("new-email").parentElement.children[3].style.display = "block";
		// display the error message
		document.getElementById("new-email").parentElement.children[5].innerHTML = "Email address already in use. <a href='#'>Forgot your Password?</a>";
		newEmail = "taken";
	}

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

	// if the email is already taken
	if( newEmail == "taken" ){
		rsApp.tempStr += "<li>Email address already in use. <a href='#'>Forgot your Password?</a></li>";
		newEmail = 0;
	}

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

	if(response == "1"){

		// display success
		console.log("success!");
		// go to next page

	}else{

		response = JSON.parse(response);

		rsApp.tempStr = "<ul>";

		for(var i = 0; i < response.length; i++)

			rsApp.tempStr += "<li>"+response[i]+"</li>";

		rsApp.tempStr += "</ul>";


		// remove previous error alert if present
		if(document.getElementById("submit-new-user").parentElement.children.length > 1)
			document.getElementById("submit-new-user").parentElement.removeChild(document.getElementById("submit-new-user").parentElement.children[0])

		// compile all the errors into a dismissable alert
		rsApp.insertAlert( "danger",
						   rsApp.tempStr,
						   document.getElementById("submit-new-user") );

	}

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

