
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
rs.prototype.validateUsername = function(){

	if(this.value != "" && ( 2 < this.value.length < 32 ) && !re.test(this.value))

		// perform the ajax call
		rsApp.ajax("POST", "register.php", "namecheck=1&username="+this.value, rsApp.uniqueUsername, this);	

	else 

		// display the error
		console.log("gay sex error");
}
//-------------------------------------------
// - ajax callback 
rs.prototype.uniqueUsername= function(response, input){
	console.log(response);
	console.log(input);
}






/* initialize */

document.addEventListener("DOMContentLoaded", function(){

    // create new rs object
    rsApp = new rs();

	// add event listener to the email field
	document.getElementById("create-username")
		.addEventListener("blur", rsApp.validateUsername, false);
    
    //-------------------------------------
    // - rsApp.setUserLocation is called by 
    //   google maps after it has been 
    //   loaded and initialized.

}, false);

