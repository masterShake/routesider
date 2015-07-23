
//-----------------------------------------------
//
//		   		 edit profile app
//			   -----------------
//
// - This file contains all the methods that can
//   be found specifically on edit_products.php
//
//-----------------------------------------------




















//-----------------------------------------------
//
//		   	 additional RS methods
//
//-----------------------------------------------

//----------------------------------------------
// - Event listener toggle slide out menu for
//   pages with no map
RS.prototype.toggleMobileMenu = function(){
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





















var EditProfile, epApp;

(function(){



	//-----------------------------------------------
	//			   	 EditProfile class				
	//			   ---------------------
	//
	// - EditProfile (epApp) the javascript app for
	//	 edit_profile.php
	//
	// - Parent class contains all methods necessary
	//   for the cohesion of all the components that
	//   allow user to edit profile.
	//
	//-----------------------------------------------

	/* CONSTRUCTOR */

	EditProfile = function(){

		/* properties */

		// keep track of the initial & new values
		this.initialVals = JSON.parse( document.getElementById("initial-values").value );
    	this.newVals = JSON.parse( document.getElementById("initial-values").value );

    	// xhr object for ajax file upload
    	this.xhr = null;

		/* construction */

		// init formatting toolbars
		ftApp.toolbars[0] = new FT(
									document.getElementById("business-name"),
									document.getElementById("business-name").parentElement.children[2],
									0
								 );
		ftApp.toolbars[1] = new FT(
									document.getElementById("tagline"),
									document.getElementById("tagline").parentElement.children[2],
									1
								 );
		ftApp.toolbars[2] = new FT(
									document.getElementById("description"),
									document.getElementById("description").parentElement.children[2],
									2
								 );

		// event listener to the active switch
	    document.getElementById("myonoffswitch-profile")
	    	.addEventListener("change", this.activatePage, false);

	    // event listener to banner fileselect & drag and drop
		document.getElementById("banner-fileselect").addEventListener("change", this.fileSelectHandler, false);
		document.getElementById("banner-filedrag").addEventListener("dragover", this.fileDragHover, false);
		document.getElementById("banner-filedrag").addEventListener("dragleave", this.fileDragHover, false);
		document.getElementById("banner-filedrag").addEventListener("drop", this.fileSelectHandler, false);

	    // event listener for avatar fileselect & drag and drop
		document.getElementById("avatar-fileselect").addEventListener("change", this.fileSelectHandler, false);
		document.getElementById("avatar-filedrag").addEventListener("dragover", this.fileDragHover, false);
		document.getElementById("avatar-filedrag").addEventListener("dragleave", this.fileDragHover, false);
		document.getElementById("avatar-filedrag").addEventListener("drop", this.fileSelectHandler, false);

		// event listener change avatar shape
		document.getElementById("circle-avatar").addEventListener("change", this.avatarShape, false);
		document.getElementById("square-avatar").addEventListener("change", this.avatarShape, false);

		// toggle banner event listener 
		document.getElementById("display-banner").addEventListener("change", this.toggleBanner, false);

		// event listener change text input
		document.getElementById("business-name").addEventListener("keyup", this.textChange, false);
		document.getElementById("tagline").addEventListener("keyup", this.textChange, false);
		document.getElementById("description").addEventListener("keyup", this.textChange, false);

		// save button event listeners
		document.getElementById("save-btn1").addEventListener("click", this.saveChanges, false);
		document.getElementById("save-btn2").addEventListener("click", this.saveChanges, false);

	}

	/* METHODS */

	//-------------------------------------------------
	// - event listener for page active button
	EditProfile.prototype.activatePage = function(){

		// set the newVals active property
		epApp.newVals.active = this.checked ? 1 : 0; console.log(epApp.newVals.active);

		// call the valuesChanged function
		epApp.valuesChanged();
	}

	//-------------------------------------------------
	// - event listeners and methods for uploading new
	//   images

	// file drag hover
	EditProfile.prototype.fileDragHover = function(e) {
		e.stopPropagation();
		e.preventDefault();
		e.target.className = (e.type == "dragover" ? "hover" : "");
	}
	// file selection event listener
	EditProfile.prototype.fileSelectHandler = function(e) {

			// cancel event and hover styling
			epApp.fileDragHover(e);
			
			// display the spinner
			e.target.innerHTML = "<span class='glyphicon glyphicon-hourglass loading'></span>";

			// fetch FileList object
			var files = e.target.files || e.dataTransfer.files;// process all File objects

			// upload the file
			epApp.uploadFile(files[0], e.target.dataset.elem);
	}
	// ajax upload file
	EditProfile.prototype.uploadFile = function(file, elemStr){

		// - delete the previous xhr object
		// - it will be properly garbage collected
		this.xhr = null;

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
		  	this.xhr.onreadystatechange = epApp.ajaxCallback;

			// ajax
			this.xhr.open("POST", "http://localhost/routesider/edit_profile.php", true);
			this.xhr.setRequestHeader("X-file-name", file.name + "." + elemStr);
			this.xhr.send(file);
		}
	}

	//-----------------------------------------------
	// - callback function for XHR object
	// - display the images
	EditProfile.prototype.ajaxCallback = function(){

		if (this.readyState == 4) { console.log(this.responseText);

  			// turn the response json into an object
  			this.j = JSON.parse( this.responseText );

  			// change the filename in the newVals object
  			epApp.newVals[this.j["imgType"]] = this.j["filename"];

  			// alert the user of the need to save changes
  			epApp.showSaveAlert();
			
  			// change the background image of the elem
  			document.getElementById( this.j["imgType"] + "-filedrag" )
  				.style.backgroundImage = "url(/routesider/uploads/" + this.j["filename"] + ")";

  			// set the opacity of the traditional upload
  			document.getElementById( this.j["imgType"] + "-filedrag" )
  				.parentElement.children[1].style.opacity = "0.6";
		
  			// remove animated spinner
  			document.getElementById( this.j["imgType"] + "-filedrag" )
  				.innerHTML = "or drop files here";

  			// reset the token
  			document.getElementById("token").value = this.j["token"];
		}
	}

	//-----------------------------------------------
	// - toggle hide the banner
	EditProfile.prototype.toggleBanner = function(){

		// if the checkbox is checked
		if( this.checked ){

			// set the banner filedrag background
			document.getElementById("banner-filedrag").style.opacity = "1";

			// change the eye icon
			this.parentElement.children[1].children[0].className = "glyphicon glyphicon-eye-open";

			// if the user has not save their new banner image
			if( epApp.newVals.banner != epApp.initialVals.banner)
				document.getElementById("banner-filedrag")
					.style.backgroundImage = "url(/routesider/uplaods/" + epApp.newVals.banner + ")";
			// else refer to old one
			else
				document.getElementById("banner-filedrag")
					.style.backgroundImage = "url(/routesider/img/business/" + epApp.initialVals.banner + ")";

			// set the property
			epApp.newVals["display_banner"] = 1;

		}else{

			// set the banner filedrag background
			document.getElementById("banner-filedrag").style.opacity = ".35";
			document.getElementById("banner-filedrag").style.backgroundImage = "none";

			// change the eye icon
			this.parentElement.children[1].children[0].className = "glyphicon glyphicon-eye-close";

			// set the property
			epApp.newVals["display_banner"] = 0;

		}

		epApp.valuesChanged();

	}

	//-----------------------------------------------
	// - change avatar shape event listener
	EditProfile.prototype.avatarShape = function(){

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
			epApp.newVals["avatar_shape"] = this.value;

			// determine if the initial values have been changed
			epApp.valuesChanged();
		}
	}

	//-----------------------------------------------
	// - keyup event listener for text inputs
	EditProfile.prototype.textChange = function(){

		// set the new value for this field
		epApp.newVals[this.name] = this.value;

		// determine if values have changed
		epApp.valuesChanged();
	}

	//-----------------------------------------------
	// - show the save alert message
	// - change the class of the save buttons
	EditProfile.prototype.showSaveAlert = function(){

		// change the style of the save buttons
		document.getElementById("save-btn1").className = "btn btn-info";
		document.getElementById("save-btn2").className = "btn btn-info";
		document.getElementById("save-btn1").innerHTML = "save";
		document.getElementById("save-btn2").innerHTML = "save";

		// display alert messages
		document.getElementById("save-alert1").style.display = "block";
		document.getElementById("save-alert2").style.display = "block";

		// fade in opacity save alerts
		setTimeout(epApp.fadeInSaveAlert, 10);
	}
	//-----------------------------------------------
	// - fade in the save message
	EditProfile.prototype.fadeInSaveAlert = function(){

		// change the opacity
		document.getElementById("save-alert1").style.opacity = "1";
		document.getElementById("save-alert2").style.opacity = "1";
	}
	//-----------------------------------------------
	// - hide the save alert message
	// - change the class of the save buttons
	EditProfile.prototype.hideSaveAlert = function(){

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
	EditProfile.prototype.valuesChanged = function(){

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
	EditProfile.prototype.saveChanges = function(){
		
		//-----------------------------------------------------
		// - if the values have changed, the button will have a
		//   classname "btn btn-info"
		if(this.className == "btn btn-info"){

			// display hourglass inside save buttons
			document.getElementById("save-btn1").innerHTML = "<span class='glyphicon glyphicon-hourglass'></span>";
			document.getElementById("save-btn2").innerHTML = "<span class='glyphicon glyphicon-hourglass'></span>";

			// perform the ajax call
			rsApp.ajax({ 
						method : "POST",
						url : document.URL,
						params : "vals=" + JSON.stringify( epApp.newVals ) + 
						"&token=" + document.getElementById("token").value,
						callback : epApp.saveChangesCallback
					  });
		}
	}
	// save changes ajax callback
	EditProfile.prototype.saveChangesCallback = function(response){ console.log(response);

		response = JSON.parse( response );

		// reset the token
		document.getElementById("token").value = response["token"];

		// reset the initial values
		epApp.initialVals = JSON.parse( JSON.stringify( epApp.newVals ) );	

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

		// create new RS object
		rsApp = new RS();

	    // create new EditProfile object
	    epApp = new EditProfile();

	}, false);


})();








