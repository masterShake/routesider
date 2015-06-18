
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

/* initialize */

document.addEventListener("DOMContentLoaded", function(){

    // create new rs object
    rsApp = new rs();

    // add event listener to banner fileselect
	document.getElementById("banner-fileselect").addEventListener("change", rsApp.fileSelectHandler, false);

	// add event listener to banner drag and drop elem
	document.getElementById("banner-filedrag").addEventListener("dragover", rsApp.fileDragHover, false);
	document.getElementById("banner-filedrag").addEventListener("dragleave", rsApp.fileDragHover, false);
	document.getElementById("banner-filedrag").addEventListener("drop", rsApp.fileSelectHandler, false);

}, false);

