
//--------------------------------------
//
//		   edit_profile app
//
//--------------------------------------

//
// - This file contains all the rs
//   methods that can be found 
//   specifically on edit_profile.php
//
// - functions are added as prototypes
//   of the rs object.
//



/* edit_profile methods */


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







//-------------------------------------------------
// - event listener for page active button
rs.prototype.activatePage = function(){

	// set the newVals active property
	rsApp.newVals.active = this.checked ? 1 : 0;

	// call the valuesChanged function
	rsApp.valuesChanged();
}









//-------------------------------------------------
// - event listeners and methods for uploading new
//   images

// file drag hover
rs.prototype.fileDragHover = function(e) {
	e.stopPropagation();
	e.preventDefault();
	e.target.className = (e.type == "dragover" ? "hover" : "");
}
// file selection event listener
rs.prototype.fileSelectHandler = function(e) {

		// cancel event and hover styling
		rsApp.fileDragHover(e);
		
		// display the spinner
		e.target.innerHTML = "<span class='glyphicon glyphicon-hourglass loading'></span>";

		// fetch FileList object
		var files = e.target.files || e.dataTransfer.files;// process all File objects

		// upload the file
		rsApp.uploadFile(files[0], e.target.dataset.elem);
}
// ajax upload file
rs.prototype.uploadFile = function(file, elemStr){

	// delete the previous xhr object
	delete this.xhr;

	// create a new one
	this.xhr = new XMLHttpRequest();

	// if file is the correct type and size
	if( (file.type == "image/jpeg" || 
							 file.type == "image/jpg"  ||
							 file.type == "image/png"  ||
							 file.type == "image/gif")
	  	&& file.size < 9999999999999999
	  ){

	  	// add an event listener to the ajax request
	  	this.xhr.onreadystatechange = function(){
	  		if (this.readyState == 4) { console.log(this.responseText);

	  			// turn the response json into an object
	  			this.j = JSON.parse( this.responseText );

	  			// change the filename in the newVals object
	  			rsApp.newVals[this.j["imgType"]] = this.j["filename"];

	  			// alert the user of the need to save changes
	  			rsApp.showSaveAlert();
				
	  			// change the background image of the elem
	  			document.getElementById( this.j["imgType"] + "-filedrag" )
	  				.style.backgroundImage = "url(/routesider/uploads/" + this.j["filename"] + ")";

	  			// set the opacity of the traditional upload
	  			document.getElementById( this.j["imgType"] + "-filedrag" )
	  				.parentElement.children[2].style.opacity = "0.6";
			
	  			// remove animated spinner
	  			document.getElementById( this.j["imgType"] + "-filedrag" )
	  				.innerHTML = "or drop files here";
			}
	  	}

		// ajax
		this.xhr.open("POST", "http://localhost/routesider/edit_profile.php", true);
		this.xhr.setRequestHeader("X-file-name", file.name + "." + elemStr);
		this.xhr.send(file);
	}
}






//-----------------------------------------------
// - show the save alert message
// - change the class of the save buttons
rs.prototype.showSaveAlert = function(){

	// display alert messages
	document.getElementById("save-alert1").style.display = "block";
	document.getElementById("save-alert2").style.display = "block";

	// change the style of the save buttons
	document.getElementById("save-btn1").className = "btn btn-info";
	document.getElementById("save-btn2").className = "btn btn-info";
}
//-----------------------------------------------
// - hide the save alert message
// - change the class of the save buttons
rs.prototype.hideSaveAlert = function(){

	// display alert messages
	document.getElementById("save-alert1").style.display = "none";
	document.getElementById("save-alert2").style.display = "none";

	// change the style of the save buttons
	document.getElementById("save-btn1").className = "btn";
	document.getElementById("save-btn2").className = "btn";
}

//-------------------------------------------------------
// - determine if any of the values have changed.
rs.prototype.valuesChanged = function(){

	// if the json strings match
	if( JSON.stringify( this.initialVals ) != JSON.stringify( this.newVals ) )

		// hide the save alerts
		this.showSaveAlert();

	else

		// display the save alerts
		this.hideSaveAlert();
}








/* initialize */

document.addEventListener("DOMContentLoaded", function(){

    // create new rs object
    rsApp = new rs();

    // set the initial values and the new values objects
    rsApp.initialVals = JSON.parse( document.getElementById("initial-values").value );
    rsApp.newVals = JSON.parse( document.getElementById("initial-values").value );

    // add event listener to the active switch
    document.getElementById("myonoffswitch-profile")
    	.addEventListener("change", rsApp.activatePage, false);

    // add event listener to banner fileselect
	document.getElementById("banner-fileselect").addEventListener("change", rsApp.fileSelectHandler, false);

	// add event listener to banner drag and drop elem
	document.getElementById("banner-filedrag").addEventListener("dragover", rsApp.fileDragHover, false);
	document.getElementById("banner-filedrag").addEventListener("dragleave", rsApp.fileDragHover, false);
	document.getElementById("banner-filedrag").addEventListener("drop", rsApp.fileSelectHandler, false);

}, false);

