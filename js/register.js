
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
	this.parentElement.children[1].style.display = "none";
	this.parentElement.children[2].style.display = "none";

	if(re.test(this.value)){

		// perform the ajax call
		this.parentElement.children[3].style.display = "block";
		rsApp.ajax("POST", "register.php", "namecheck=1&username="+this.value, rsApp.uniqueUsername, false);	

	}else{

		// display the error
		this.parentElement.children[2].style.display = "block";		
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

