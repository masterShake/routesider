
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

    // all the latLng points to set the map boundaries
    this.bounds = new google.maps.LatLngBounds();

    // init MapPopover object
    this.popover = new MapPopover();

	// init PinDropper object
	this.pinDropper = new PinDropper();

	// init PinEditor object
	this.pinEditor = new PinEditor();

	// init PolyDrawer object
	this.polyDrawer = new PolyDrawer();

	// init PolyEditor object
	this.polyEditor = new PolyEditor();

	// original json
	this.OJ = JSON.parse(
				document.getElementById("maps-json").value
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

	// set the pins and polygons google maps objects
	this.setPolys() // also sets pins
}

/* METHODS */

//---------------------------------------------------
// - helper function for setMaps
// - places polgons on the map and pushes them to the
//   polygons array
MA.prototype.setPolys = function(){
	// loop through the polys
	for(var i = 0; i < this.OJ.polys.length; i++){
		// put them on the map
		new google.maps.Polygon({
							    paths: this.OJ.polys[i].coords,
							    strokeColor: this.OJ.polys[i]["stroke_color"],
							    strokeOpacity: this.OJ.polys[i]["stroke_opacity"],
							    strokeWeight: 3,
							    fillColor: this.OJ.polys[i]["fill_color"],
							    fillOpacity: this.OJ.polys[i]["fill_opacity"],
							    map : rsApp.map
							})
		for(var j = 0, len = this.OJ.polys[i].coords.length; j < len; j++){
			this.bounds.extend( new google.maps.LatLng( this.OJ.polys[i].coords[j].lat, this.OJ.polys[i].coords[j].lng ) );
		}
	}
	// set the pins
	this.setPins();
}
//---------------------------------------------------
// - helper function for setMaps
// - places pins on the map and pushes them to the
//   pins array
MA.prototype.setPins = function(){
	// loop through the pins
	for(var i = 0; i < this.OJ.pins.length; i++){
		// put them on the map
		this.pins.push(new google.maps.Marker({ 
			// set the options
			position: this.OJ.pins[i].coords, 
			map : rsApp.map, 
			animation: google.maps.Animation.DROP 
		}));
		// set the title, description, & id attributes
		this.pins[i].title = "show me your titties!";
		this.pins[i].description = "please?";
		this.pins[i].id = this.OJ.pins[i].id;
		// add the latLng object to the bounds
		this.bounds.extend( new google.maps.LatLng( this.OJ.pins[i].coords.lat, this.OJ.pins[i].coords.lng) );
		// add event listeners
		google.maps.event.addListener(this.pins[i], "click", this.popover.showPinPopover);
	}
	// fit map boudns to display all markers
	rsApp.map.fitBounds(this.bounds);
}

//---------------------------------------------------
// - event listener for pins & polygons
// - display popover on google maps element
// MA.prototype.popover = function(e){ 
// 	console.log(event);
// 	console.log(event.target);
// 	console.log(event.target.parentElement);
// 	var x = document.createElement("div");
// 	x.className = "boner";
// 	x.style.top = (event.y - 50) + "px";
// 	x.style.left = (event.x - 50) + "px";
// 	event.target.parentElement.insertBefore(x, event.target);

// }

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


















