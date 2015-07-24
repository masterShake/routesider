
//-----------------------------------------------
// 					drop new pin
//				  ----------------
//
// - Contains properties and methods that allow a
//   user to drop and edit their pins
//
//-----------------------------------------------

/* CONSTRUCTOR */

var PinDropper = function(){

	/* properties */

    // temporary storage for google.maps.LatLng objects
    this.tempLatLng = null;
    // temporary storage for google.maps.Autocomplete
    this.autocomp;

    // business avatar to create pin
    this.markerImg = {
    					url  : "img/business/" + document.getElementById("business-avatar").value,
    					size : new google.maps.Size(30,30)
    				 }; 

    // create the google maps pin markers
    // this.markerCircle = '<div>' +
				// 		'	<svg width="71" height="120">' +
				// 		'		<circle cx="35" cy="35" r="28" fill="#5cb85c"/>'+
				// 		'		<polygon points="8 30, 36 105, 63 30" fill="#5cb85c" />' +
				// 		'	</svg>' +
				// 		'	<img src="http://i.imgur.com/Rnj7kZj.jpg" style="border-radius:50%;height:48px;width:48px;z-index:1;margin-left:-64px;margin-bottom:61px;"/>' +
				// 		'</div>';

	// this.markerSquare = '<div>' +
	// 					'	<svg width="71" height="120">' +
	// 					'		<rect rx="4" ry="4" x="7" y="7" fill="#5cb85c" width="56" height="56"/>' +
	// 					'		<polygon points="8 30, 36 105, 63 30" fill="#5cb85c" />' +
	// 					'	</svg>' +
	// 					'	<img src="http://i.imgur.com/Rnj7kZj.jpg" style="border-radius:4px;height:48px;width:48px;z-index:1;margin-left:-64px;margin-bottom:61px;"/>' +
	// 					'</div>';

    /* construction */

    // add event listener to the add new pin button
    document.getElementById("components-toolbar").children[3]
    	.addEventListener("click", this.toggleNewPinMode, false);

    // add event listener to the close new pin toolbar x
    document.getElementById("drop-new-pin-toolbar").children[0]
    	.addEventListener("click", this.terminateNewPinMode, false);
}

//---------------------------------------------------
// - Event listener for new pin button in components
//   toolbar
PinDropper.prototype.toggleNewPinMode = function(){

	// If the drop-new-pin component is hidden
	if( document.getElementById("drop-new-pin-toolbar").style.display != "block" )

		// initialize drop-new-pin mode
		mapApp.pinDropper.initNewPinMode();

	else

		// terminate drop-new-pin mode
		mapApp.pinDropper.terminateNewPinMode();
}

//-----------------------------------------------
// - initialize new pin mode
// - display elements
// - add event listeners
PinDropper.prototype.initNewPinMode = function(){

	// exit the other formatting modes and hide other toolbars
	mapApp.termFormattingModes(3);

	// set drop-new-pin mode property to true
	mapApp.newPinMode = true;

	/* css */

	// change the class of the new pin button
	document.getElementById("components-toolbar").children[3].className = "btn selected";
	// display the drop-new-pin-toolbar element
	document.getElementById("drop-new-pin-toolbar").style.display = "block";
	// change placeholder text for search maps input
	document.getElementById("search-maps-field").placeholder = "Enter location to drop pin";
	// change the icon in the search button to indicate drop pin function
	document.getElementById("search-maps-button").innerHTML = "<span class='glyphicon glyphicon-map-marker'></span>";

	/* google map */

	this.initGooglePinDrop();
}

//-----------------------------------------------
// - initialize the google maps drop new pin 
//   functionality
PinDropper.prototype.initGooglePinDrop = function(){

	// change the cursor on the map to a crosshair
	rsApp.map.setOptions({ 
							draggableCursor : "crosshair",
						  	draggingCursor  : "crosshair"
					   });

	// create the google maps Autocomplete object
	this.autocomp = new google.maps.places.Autocomplete( document.getElementById("search-maps-field") );

	// apply event listener when location is selected with click
	google.maps.event.addListener( rsApp.map, 'click', mapApp.pinDropper.dropPinClick );

	// apply event listener when location is selected via autocomplete field
	google.maps.event.addListener(this.autocomp, 'place_changed', mapApp.pinDropper.pinDropAutocomp);
}

//-----------------------------------------------
// - map click event listener
// - create the latlng object when the user clicks on the map
// - call the drop pin method
PinDropper.prototype.dropPinClick = function(e){

	// delete the previous temp LatLng object
	mapApp.pinDropper.tempLatLng = null;

	// get the LatLng object from the event
	mapApp.pinDropper.tempLatLng = e.latLng;

	// call the dropPin method
	mapApp.pinDropper.dropPin();
}

//-----------------------------------------------	
// - autocomplete event listener
// - Create the latlng object when the user selects 
//   a place from the autocomplete suggestions.
// - call the drop pin method
PinDropper.prototype.pinDropAutocomp = function(){

	// hide the extra space under the search-maps-field
	setTimeout( mapApp.pinDropper.timeoutShrink, 100 );

	// create the LatLng object
	mapApp.pinDropper.tempLatLng = new google.maps.LatLng(
		      									mapApp.pinDropper.autocomp.getPlace().geometry.location.A,
		      									mapApp.pinDropper.autocomp.getPlace().geometry.location.F
		      								);

	// pan to this location
	rsApp.map.panTo( mapApp.tempLatLng );

	// zoom to the correct resolution
	rsApp.map.setZoom( 15 );

	// drop the pin after panning to the latlng
	setTimeout( mapApp.pinDropper.dropPin, 950 );
}

//-----------------------------------------------	
// - function to drop a pin
// - may only be called after mapApp.tempLatLng 
//   property has been set
PinDropper.prototype.dropPin = function(){ 

	// create a new pin and push it to the pins array
	mapApp.pins.push( 
		new google.maps.Marker({
			position: mapApp.pinDropper.tempLatLng,
			map: rsApp.map,
			title: 'Hello World!',
			animation: google.maps.Animation.DROP
  		}) 
  	);

	// set the activePin property for mapApp
	mapApp.pinEditor.activePin = mapApp.pins[mapApp.pins.length - 1];

	// terminate new pin mode
	mapApp.pinDropper.terminateNewPinMode();

	// initialize edit pin mode
	mapApp.pinEditor.initEditPinMode();

	// display save alert
	document.getElementById("save-alert").style.display = "block";

}

//-----------------------------------------------
// - timeout function to hide the extra space
//   under the #search-maps-field
PinDropper.prototype.timeoutShrink = function(){
	// remove the margin
	document.getElementById("search-maps-field").parentElement.style.marginBottom = "0px";
};

//---------------------------------------------------
// - terminate new pin mode
// - hide elements
// - remove event listeners
PinDropper.prototype.terminateNewPinMode = function(){

	// set drop-new-pin mode property to true
	mapApp.newPinMode = false;

	/* css */

	// restore the class of the new pin button
	document.getElementById("components-toolbar").children[3].className = "btn";
	// display the drop-new-pin-toolbar element
	document.getElementById("drop-new-pin-toolbar").style.display = "none";
	// change placeholder text for search maps input
	document.getElementById("search-maps-field")
		.placeholder = "Search " + this.businessName + " maps";
	// change the icon in the search button to indicate drop pin function
	document.getElementById("search-maps-button").innerHTML = "<span class='glyphicon glyphicon-search'></span>";

	/* google map */

	mapApp.pinDropper.termGooglePinDrop();
}

//-----------------------------------------------
// - terminate the google maps drop new pin 
//   functionality
PinDropper.prototype.termGooglePinDrop = function(){ 

	// remove the dropPin event listener
	google.maps.event.clearListeners( rsApp.map, 'click' );

	// change the cursor back to grabber
	rsApp.map.setOptions({ 
							draggableCursor : "grab",
						  	draggingCursor  : "grabbing"
					   });

	// remove autocomplete event listener	
	this.autocomp = null;
}