//-----------------------------------------------
//			 cModal (confirmation modal)				
//		   -------------------------------
//
// - dynamically set the modal content
//
// - display the modal
//
// - hide the modal
//
// - perform callback
//
//-----------------------------------------------

/* CONSTRUCTOR */

cModal = function(){

	/* properties */

	// keep track of the callback function, temp variable
	this.callback = null;

	/* initializations */

	// add the modal confirmation event listern out here
	confModal.children[0].children[0].children[2].children[1]
		.addEventListener("click", this.callback, false); 

	// add close event listeners
	confModal.addEventListener("click", this.fadeOut, false);
}

/* METHODS */

//-----------------------------------------------
// - launch modal
cModal.prototype.launch = function(){

	// show the modal
	confModal.style.display = "block";

	// show the backdrop
	confBD.style.display = "block";
	
	// fade in
	setTimeout(jApp.modal.fadeIn, 10);
	
	// drop modal on em
	setTimeout(jApp.modal.dropIn, 130);
}

//-----------------------------------------------
// - modal in from top
cModal.prototype.fadeIn = function(){

	// prevent scrolling on the body
	document.body.className = "modal-open";

	// set the backdrop class
	confBD.className = "modal-backdrop fade in";

}

//-----------------------------------------------
// - modal in from top
cModal.prototype.dropIn = function(){

	// set the modal class
	confModal.className = "modal fade in";
}

//-----------------------------------------------
// - animate out
cModal.prototype.fadeOut = function(e){

	// if the user confirmed the deletion button
	if(e.target.className == "btn btn-default btn-danger"
	|| e.target.className == "glyphicon glyphicon-trash")
		jApp.modal.callback();

	// if we clicked one of the buttons or backdrop
	if(	e.target.tagName == "BUTTON" 
	|| e.target.parentElement.tagName == "BUTTON"
	|| e.target.id == "confModal" ){

		// set the modal class
		confModal.className = "modal fade";

		// set the backdrop class
		confBD.className = "modal-backdrop fade";

		// hide the elements
		setTimeout(jApp.modal.hide, 300);
	}
}

//-----------------------------------------------
// - hide modal elements
cModal.prototype.hide = function(){
	// hide the modal
	confModal.style.display = "none";
	// hide the backdrop
	confBD.style.display = "none";
	// remove the modal class from the body
	document.body.className = "";
}