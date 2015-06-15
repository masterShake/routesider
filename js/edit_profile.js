
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


// file selection
rs.prototype.fileSelectHandler = function(e) {

		// cancel event and hover styling
		rsApp.fileDragHover(e);

		// fetch FileList object
		var files = e.target.files || e.dataTransfer.files;// process all File objects
		
		// 
		for (var i = 0, f; f = files[i]; i++) {
			rsApp.parseFile(f);
			rsApp.uploadFile(f);
		}
}

// parse file html/css
rs.prototype.parseFile = function(file){

	console.log(file);

}

// ajax upload file
rs.prototype.uploadFile = function(file){

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
	  		if (rsApp.xhr.readyState == 4) {
				console.log(rsApp.xhr);
			}
	  	}

		// generate a random number to store the image
		this.randomNumber = Math.floor(Math.random()*10000000);

		// ajax
		this.xhr.open("POST", "http://localhost/routesider/edit_profile.php", true);
		this.xhr.setRequestHeader("X-file-name", file.name+"."+this.randomNumber);
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

