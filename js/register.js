
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
	document.getElementById("create-username-error").innerHTML = "";

	if(this.value.length == 0)
		return;

	if(re.test(this.value)){

		// perform the ajax call
		this.parentElement.children[4].style.display = "block";
		rsApp.ajax("POST", "register.php", "namecheck=1&username="+this.value, rsApp.uniqueUsername, false);	

	}else{

		if(this.value.length < 3 || this.value.length > 32){
			document.getElementById("create-username-error")
				.innerHTML = "username must be between 3 and 32 characters.";
		}else{
			document.getElementById("create-username-error")
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






/* initialize */

document.addEventListener("DOMContentLoaded", function(){

    // create new rs object
    rsApp = new rs();

	// add event listeners to the username field
	document.getElementById("create-username")
		.addEventListener("keyup", rsApp.validateUsername, false);

}, false);

