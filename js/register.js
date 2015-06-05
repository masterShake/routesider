
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

rs.prototype.validateUsername = function(){

	// hide the errors
	this.parentElement.children[2].style.display = "none";
	this.parentElement.children[3].style.display = "none";
	this.parentElement.children[4].style.display = "none";
	this.parentElement.children[6].innerHTML = "";

	// do nothing if blank
	if(this.value.length == 0)
		return;

	// if we fit the regex
	if(re.test(this.value)){

		// perform the ajax call
		this.parentElement.children[4].style.display = "block";
		rsApp.ajax("POST", "register.php", "namecheck=1&username="+this.value, rsApp.uniqueUsername, false);	

	}else{
		// if the username is the incorrect length
		if(this.value.length < 3 || this.value.length > 32){
			this.parentElement.children[6]
				.innerHTML = "username must be between 3 and 32 characters.";
		// else there are special characters
		}else{
			this.parentElement.children[6]
				.innerHTML = "alphanumeric characters, hyphen, &amp; underscores only.";
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
	// document.getElementById("create-username")
}

//--------------------------------------------
// - ensure password is the correct length
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
	if(this.value.length == 0)
		return;

	// if the password is the incorrect length 
	if(this.value.length < 6 || this.value.length > 64){
		// display the red x
		this.parentElement.children[3].style.display = "block";

		this.parentElement.children[5]
			.innerHTML = "password must be between 6 and 64 characters.";
	}else{
		this.parentElement.children[2].style.display = "block";
	}
}

//--------------------------------------------
// - double check the password
rs.prototype.checkPassword = function(){

	// hide the errors
	this.parentElement.children[1].style.display = "none";
	this.parentElement.children[2].style.display = "none";
	this.parentElement.children[3].innerHTML = "";

	// do nothing if blank
	if(this.value.length == 0)
		return;

	// if the password is the incorrect length 
	if(this.value != document.getElementById("create-password").value){
		// display the red x
		this.parentElement.children[2].style.display = "block";

		this.parentElement.children[3]
			.innerHTML = "passwords do not match";
	}else{
		this.parentElement.children[1].style.display = "block";
	}

}

//--------------------------------------------
//


/* initialize */

document.addEventListener("DOMContentLoaded", function(){

    // create new rs object
    rsApp = new rs();

	// add event listeners to the username field
	document.getElementById("create-username")
		.addEventListener("keyup", rsApp.validateUsername, false);

	// add event listener to the password
	document.getElementById("create-password")
		.addEventListener("keyup", rsApp.validatePassword, false);

	// check password
	document.getElementById("repeat-password")
		.addEventListener("keyup", rsApp.checkPassword, false);
	
	// valid email
	document.getElementById("new-email")
		.addEventListener("keyup", rsApp.validateEmail, false);

}, false);

