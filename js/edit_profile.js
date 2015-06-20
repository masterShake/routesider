
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
	rsApp.newVals.active = this.checked ? 1 : 0; console.log(rsApp.newVals.active);

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

	  			// reset the token
	  			document.getElementById("token").value = this.j["token"];
			}
	  	}

		// ajax
		this.xhr.open("POST", "http://localhost/routesider/edit_profile.php", true);
		this.xhr.setRequestHeader("X-file-name", file.name + "." + elemStr);
		this.xhr.send(file);
	}
}








//-----------------------------------------------
// - change avatar shape
rs.prototype.avatarShape = function(){

	// if the element has just been checked
	if(this.checked){

		// circle
		if(this.value == "circle"){

			document.getElementById("avatar-filedrag").style.borderRadius = "50%";
			document.getElementById("semi-circle-traditional-upload").style.borderTopLeftRadius = "100px";
			document.getElementById("semi-circle-traditional-upload").style.borderTopRightRadius = "100px";

		// square
		}else{

			document.getElementById("avatar-filedrag").style.borderRadius = "0%";
			document.getElementById("semi-circle-traditional-upload").style.borderTopLeftRadius = "0px";
			document.getElementById("semi-circle-traditional-upload").style.borderTopRightRadius = "0px";
		}

		// change the newVals object avatar_shape property
		rsApp.newVals["avatar_shape"] = this.value;

		// determine if the initial values have been changed
		rsApp.valuesChanged();
	}
}








//-----------------------------------------------
// - keyup event listener for text inputs
rs.prototype.textChange = function(){

	// set the new value for this field
	rsApp.newVals[this.name] = this.value;

	// determine if values have changed
	rsApp.valuesChanged();
}









//-----------------------------------------------
// - show the save alert message
// - change the class of the save buttons
rs.prototype.showSaveAlert = function(){

	// change the style of the save buttons
	document.getElementById("save-btn1").className = "btn btn-info";
	document.getElementById("save-btn2").className = "btn btn-info";
	document.getElementById("save-btn1").innerHTML = "save";
	document.getElementById("save-btn2").innerHTML = "save";

	// display alert messages
	document.getElementById("save-alert1").style.display = "block";
	document.getElementById("save-alert2").style.display = "block";

	// fade in opacity save alerts
	setTimeout(rsApp.fadeInSaveAlert, 10);
}
//-----------------------------------------------
// - fade in the save message
rs.prototype.fadeInSaveAlert = function(){

	// change the opacity
	document.getElementById("save-alert1").style.opacity = "1";
	document.getElementById("save-alert2").style.opacity = "1";
}
//-----------------------------------------------
// - hide the save alert message
// - change the class of the save buttons
rs.prototype.hideSaveAlert = function(){

	// remove alert messages
	document.getElementById("save-alert1").style.display = "none";
	document.getElementById("save-alert2").style.display = "none";

	// change the style of the save buttons
	document.getElementById("save-btn1").className = "btn";
	document.getElementById("save-btn2").className = "btn";

	// change the opacity
	document.getElementById("save-alert1").style.opacity = "0";
	document.getElementById("save-alert2").style.opacity = "0";
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







//-----------------------------------------------------
// - event listener to save changes made
rs.prototype.saveChanges = function(){
	
	//-----------------------------------------------------
	// - if the values have changed, the button will have a
	//   classname "btn btn-info"
	if(this.className == "btn btn-info"){

		// display hourglass inside save buttons
		document.getElementById("save-btn1").innerHTML = "<span class='glyphicon glyphicon-hourglass'></span>";
		document.getElementById("save-btn2").innerHTML = "<span class='glyphicon glyphicon-hourglass'></span>";

		// perform the ajax call
		rsApp.ajax( 
					"POST",
					document.URL,
					"vals=" + JSON.stringify( rsApp.newVals ) + 
					"&token=" + document.getElementById("token").value,
					rsApp.saveChangesCallback,
					false
				  );
	}
}
// save changes ajax callback
rs.prototype.saveChangesCallback = function(response){ console.log(response);

	response = JSON.parse( response );

	// reset the token
	document.getElementById("token").value = response["token"];

	// reset the initial values
	rsApp.initialVals = JSON.parse( JSON.stringify( rsApp.newVals ) );	

	// remove alert messages
	document.getElementById("save-alert1").style.display = "none";
	document.getElementById("save-alert2").style.display = "none";

	// change the style of the save buttons
	document.getElementById("save-btn1").className = "btn btn-success";
	document.getElementById("save-btn2").className = "btn btn-success";
	document.getElementById("save-btn1").innerHTML = "saved!";
	document.getElementById("save-btn2").innerHTML = "saved!";

	// change the opacity
	document.getElementById("save-alert1").style.opacity = "0";
	document.getElementById("save-alert2").style.opacity = "0";
}





/* initialize */

document.addEventListener("DOMContentLoaded", function(){

    // create new rs object
    rsApp = new rs();

    // set the initial values and the new values objects
    rsApp.initialVals = JSON.parse( document.getElementById("initial-values").value );
    rsApp.newVals = JSON.parse( document.getElementById("initial-values").value );

    // event listener to the active switch
    document.getElementById("myonoffswitch-profile")
    	.addEventListener("change", rsApp.activatePage, false);

    // event listener to banner fileselect
	document.getElementById("banner-fileselect").addEventListener("change", rsApp.fileSelectHandler, false);

	// event listener to banner drag and drop elem
	document.getElementById("banner-filedrag").addEventListener("dragover", rsApp.fileDragHover, false);
	document.getElementById("banner-filedrag").addEventListener("dragleave", rsApp.fileDragHover, false);
	document.getElementById("banner-filedrag").addEventListener("drop", rsApp.fileSelectHandler, false);

	// event listener change avatar shape
	document.getElementById("circle-avatar").addEventListener("change", rsApp.avatarShape, false);
	document.getElementById("square-avatar").addEventListener("change", rsApp.avatarShape, false);

	// event listener change text input
	document.getElementById("business-name").addEventListener("keyup",rsApp.textChange, false);
	document.getElementById("tagline").addEventListener("keyup",rsApp.textChange, false);
	document.getElementById("description").addEventListener("keyup",rsApp.textChange, false);

	// save button event listeners
	document.getElementById("save-btn1").addEventListener("click", rsApp.saveChanges, false);
	document.getElementById("save-btn2").addEventListener("click", rsApp.saveChanges, false);

}, false);

