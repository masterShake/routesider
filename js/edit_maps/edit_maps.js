
//-----------------------------------------------
//
//		   		 edit_maps app
//			   -----------------
//
// - This file contains all the methods that can
//   be found specifically on edit_maps.php
//
// - Because this page requires so much
//   javascript, I created a few new classes:
//
//		+ MA (mapApp) parent class for edit_maps
//		  page. Holds all the other classes as
// 		  properties.
//
//		+ PinDropper (mapApp.pinDropper) 
//		  contains all the properties and methods
//		  relevant to the drop & edit pin 
//		  functionalities.
//
//		+ PolyDrawer (mapApp.polyDrawer) class
// 		  to allow user to create a new polygon.
// 
//		+ PolyEditor (mapApp.polyEditor) contains
//		  all properties and methods to allow
//		  user to edit a polygon.
//
// - Most functions are NOT added as prototypes
//   of the RS object, but there are a few to
//   deal with the toggle menu and initializing
//   the map.
//
//-----------------------------------------------

// map app object
var mapApp;




//-----------------------------------------------
//
//		   	 additional RS methods
//
//-----------------------------------------------

//----------------------------------------------
// - Event listener toggle slide out menu for
//   pages with static map (not fixed)
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

//--------------------------------------
// - request permission for user geoloc.
// - display map based on user location 
//   & db query.
//
RS.prototype.setUserLocation = function(){

	// trigger prompt for permission and/or callback
 	navigator.geolocation.getCurrentPosition(

	 	rsApp.locationSuccess,
	 	rsApp.locationError
    );
}

//--------------------------------------
// - callback function after user grants
//   or rejects access to location data
// - use geocode to ajax query for local
//   promos.
RS.prototype.locationSuccess = function(position){

	// the the longitude and latitude properties
	rsApp.userLatitude = position.coords.latitude;
	rsApp.userLongitude = position.coords.longitude;

	// generate the google map
	rsApp.initGoogleMap();

	// initialize the map app
	mapApp = new MA();
}

//-------------------------------------
// - If user does not grant access to
//   current location, display default
//   map.
RS.prototype.locationError = function(){

}

//-----------------------------------------------
// 				 initialize app
//			   ------------------
//
//-----------------------------------------------

// initialize the RS object
var rsApp = new RS();
	

















//-----------------------------------------------
//
//		   			MA class
//				  ------------
//
// - Parent object for the page
//
// - Holds all of the other classes and universal
//   variables that they use
//
//-----------------------------------------------

/* CONSTRUCTOR */

var MA = function(){

	/* properties */

	// array to hold all the google maps markers
	this.pins = [];
	// array to hold all the relevant pin data for ajax save
	this.jsonPins = [];

	// array to hold all the polygons
	this.polygons = [];
	// temp array to hold all relevant polygon data for ajax
	this.jsonPolygons = [];

    // - Set int to determine/manage which editting/
    //   formatting mode is currently active
    // - 0 -> no mode
    // - 1 -> edit pin mode
    // - 2 -> edit poly mode
    // - 3 -> new pin mode
    // - 4 -> new poly mode
    this.mode = 0;

	// init PinDropper object
	this.pinDropper = new PinDropper();

	// init PinEditor object
	this.pinEditor = new PinEditor();

	// init PolyDrawer object
	this.polyDrawer = new PolyDrawer();

	// init PolyEditor object
	this.polyEditor = new PolyEditor();

	// set the pin and polygon objects
	this.setMap(
		JSON.parse(
			document.getElementById("maps-json").value
		)
	);

    // set the business name for easy access
    this.businessName = document.getElementById("business-name").value;

    /* construction */

     // add event listener to expand the formatting toolbar
    document.getElementById("search-maps-field")
    	.addEventListener("keyup", this.autoExpand, false);
    document.getElementById("search-maps-field")
    	.addEventListener("blur", this.blurContract, false);

    // save button event listener
    document.getElementById("save-btn")
    	.addEventListener("click", this.saveMaps, false);
}

/* METHODS */

//--------------------------------------------------
// - set the polygons and pins on the map
// - @ pps -> pins and polys json object
MA.prototype.setMap = function(pps){ console.log(pps);

	// set the pins
	// if( pps.pins[0] ){
	// 	// loop through the pins
	// 	for(var i = 0; i < pps.pins.length; i++){
	// 		// put them on the map
	// 		new google.maps.Marker({ map : rsApp.map })
	// 	}	  
	// }

	// set the polys
	// if( pps.polys[0] ){
	// 	// loop through the polys
	// 	for(var i = 0; i < pps.polys.length; i++){
	// 		// put them on the map
	// 		new google.maps.Polygon({
	// 							    paths: pps.polys[i].coords,
	// 							    strokeColor: ,
	// 							    strokeOpacity: ,
	// 							    strokeWeight: ,
	// 							    fillColor: ,
	// 							    fillOpacity: ,
	// 							    editable : true
	// 							})
	// 	}
	// }

	// fit map boudns to display all markers
}

//---------------------------------------------------
// - event listener for search bar
// - expand the height to accomodate the autocomplete
//   results.
MA.prototype.autoExpand = function(){
	// if the field is not blank
	if( this.value )
		// expand the margin
		this.parentElement.style.marginBottom = "180px";
	// if blank
	else
		// contract the margin
		this.parentElement.style.marginBottom = "0px";
}
// - blur even contract
MA.prototype.blurContract = function(){
	this.parentElement.style.marginBottom = "0px";
}


//---------------------------------------------------
// - Terminate any open formatting modes
// - Do not terminate the exception
MA.prototype.termFormattingModes = function(exception){
	
	// drop new pin
	if( this.mode == 1 && exception == 1 )

		this.pinEditor.terminateEditPinMode();

	// drop new pin
	if( this.mode == 2 && exception == 2 )

		this.polyEditor.terminateEditPolyMode();

	// draw new polygon
	if( this.mode == 3 && exception == 3 )

		this.pinDropper.terminateNewPinMode();

	// edit polygon
	if( this.mode == 4 && exception == 4 )

		this.polyDrawer.terminateNewPolyMode();
}

//-----------------------------------------------
// - event listener in save button
// - json stringify all of the pins and polygons
// - ajax
MA.prototype.saveMaps = function(){

	// inner HTML of save button rotating hour glass 
	this.innerHTML = '<span class="glyphicon glyphicon-hourglass loading" style="color:#FFF"></span>';

	//-----------------------------------------------
	// - this big chunk of code must remain inside
	//   this function because of race conditions.

	// reset the arrays
	mapApp.jsonPins = [];
	mapApp.jsonPolygons = [];

	// assemble the relevant pin data
	for(var i = 0; i < mapApp.pins.length; i++)

		// push an object onto the array
		mapApp.jsonPins.push({
								lat : mapApp.pins[i].position.A,
								lng : mapApp.pins[i].position.F,
								description : ""
							});

	// loop through all the polygons
	for(var i = 0; i < mapApp.polygons.length; i++)

		mapApp.jsonPolygons.push({
									coords : mapApp.polygons[i].getPath()["j"].toString(),
									stroke_color : mapApp.polygons[i].strokeColor,
									stroke_opacity : mapApp.polygons[i].strokeOpacity,
									fill_color : mapApp.polygons[i].fillColor,
									fill_opacity : mapApp.polygons[i].fillOpacity,
									description : document.getElementById("polygon-description").value
								});

	// ajax call
	rsApp.ajax({
				method : "POST",
				url : document.URL,
				params : "pins=" + JSON.stringify( mapApp.jsonPins ) +
				"&polygons=" + JSON.stringify( mapApp.jsonPolygons ),
				callback : mapApp.ajaxCallback
			  });
}

//-----------------------------------------------
// - ajax callback
MA.prototype.ajaxCallback = function(response){ console.log(response);

	// change alert classes
	document.getElementById("save-alert").className = "alert alert-success";
	document.getElementById("save-btn").className = "btn btn-success";

	// change the message
	document.getElementById("save-btn").innerHTML = "saved!";
	document.getElementById("save-alert").children[1].innerHTML = "maps updated.";

	// change opacity
	// document.getElementById("save-alert").style.opacity = 0;

	// set timeout function
	setTimeout(mapApp.hideSaveAlert, 1000);
}

//-----------------------------------------------
// - timeout function to hide & reset save alert
MA.prototype.hideSaveAlert = function(){
	// hide the alert
	document.getElementById("save-alert").style.display = "none";
	// reset the class
	document.getElementById("save-alert").className = "alert alert-info";
	document.getElementById("save-btn").className = "btn btn-info";
	// reset the save button inner html
	document.getElementById("save-btn").innerHTML = "save";
	document.getElementById("save-alert").children[1].innerHTML = "Click <strong>save</strong> to keep your changes.";
}


















