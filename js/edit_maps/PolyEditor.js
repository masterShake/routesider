
//-----------------------------------------------
// 				   edit polygon
//			  	 ----------------
//
// - collection of methods that allows a user to
//   edit a polygon, old and new
//
//-----------------------------------------------

/* CONSTRUCTOR */

var PolyEditor = function(){

	/* properties */

	// pointer to the polygon we are working with
	this.activePolygon = null;
	// the property we are editing (stroke or fill)
	this.activeEdit = "stroke";
	// temporary object for keeping track of polygon options
	this.tempPolyOpts = null;

	/* construction */

     // add event listener to the draw new polygon button
    document.getElementById("components-toolbar").children[1]
    	.addEventListener("click", this.toggleEditPolyMode, false);

    // add event listener to the close new polygon toolbar x
    document.getElementById("edit-polygon-toolbar").children[0]
    	.addEventListener("click", this.terminateEditPolyMode, false);

    // add event listener to the pull tab to toggle the draw-new-polygon toolbar
    document.getElementById("toggle-toolbar").children[0].children[0]
    	.addEventListener("click", this.toggleToolbar, false);

	// edit stroke button event listener
    document.getElementById("polygon-edit-stroke-btn")
    	.addEventListener("click", this.activateColorEdit, false);

    // edit fill button event listener
    document.getElementById("polygon-edit-fill-btn")
    	.addEventListener("click", this.activateColorEdit, false);

    // change polygon color properties when clicking on color wheel
    this.colorWheelBtns = document.getElementsByClassName("color-wheel")[0]
    							.getElementsByTagName("button");
   	for(var i = 0; i < this.colorWheelBtns.length; i++)
   		this.colorWheelBtns[i].addEventListener("click", this.colorSelect, false);
   	this.colorWheelBtns = null;
   	delete this.colorWheelBtns;

   	// change polygon opacity with slider event lsitener
   	document.getElementById("polygon-opacity")
   		.addEventListener("change", this.slideOpacity, false);

   	// change polygon opacity with text input event listener
   	document.getElementById("polygon-opacity-stroke-input")
   		.addEventListener("keyup", this.typeOpacity, false);
   	document.getElementById("polygon-opacity-fill-input")
   		.addEventListener("keyup", this.typeOpacity, false);
   	document.getElementById("polygon-opacity-stroke-input")
   		.addEventListener("blur", this.blurOpacity, false);
   	document.getElementById("polygon-opacity-fill-input")
   		.addEventListener("blur", this.blurOpacity, false);
}

/* METHODS */

//-----------------------------------------------
// - Event listener for edit polygon button in the
//   components toolbar
PolyEditor.prototype.toggleEditPolyMode = function(){
	// If the edit-polygon-toolbar is hidden
	if( document.getElementById("edit-polygon-toolbar").offsetParent == null )
		// initialize edit-poly mode
		mapApp.polyEditor.initEditPolyMode();
	else
		// terminate edit-poly mode
		mapApp.polyEditor.terminateEditPolyMode();
}

//-----------------------------------------------	
// - initialize edit polygon mode
// - display elements
// - add necessary event listeners
PolyEditor.prototype.initEditPolyMode = function(){

	// exit the other formatting modes and hide other toolbars
	mapApp.termFormattingModes(2);

	// reset the new polygon mode property to true
	mapApp.editPolyMode = true;
	
	/* css */

	// display the toggle toolbar tab
	document.getElementById("toggle-toolbar").style.display = "block";
	// change the class of the new polygon component button
	document.getElementById("components-toolbar").children[1].className = "btn selected";
	// display the draw-new-polygon-toolbar element
	document.getElementById("edit-polygon-toolbar").style.display = "block";
	// change placeholder text for search maps input
	document.getElementById("search-maps-field").placeholder = "Search locations";

	/* google map */

	this.initGooglePolyEdit();

}



//-----------------------------------------------	
// - set event listeners for google maps edit 
//   polygon
PolyEditor.prototype.initGooglePolyEdit = function(){

	// change the cursor on the map to a crosshair
	rsApp.map.setOptions({ 
							draggableCursor : "crosshair",
						  	draggingCursor  : "crosshair"
					   	});
}

//-----------------------------------------------
// - event listener to activate edit color button
PolyEditor.prototype.activateColorEdit = function(){

	// determine which property of the polygon we are editing
	mapApp.polyEditor.activeEdit = this.dataset.activate;

	if( mapApp.polyEditor.activeEdit == "stroke" ){
		// change the classes
		document.getElementById("polygon-edit-stroke-btn").className = "btn btn-color-selected";
		document.getElementById("polygon-edit-fill-btn").className = "btn";
	}else{
		document.getElementById("polygon-edit-stroke-btn").className = "btn";
		document.getElementById("polygon-edit-fill-btn").className = "btn btn-color-selected";
	}
	// set the opacity slider
	document.getElementById("polygon-opacity").value = 
		document.getElementById("polygon-opacity-"+ mapApp.polyEditor.activeEdit +"-input").dataset.opacity;
}

//------------------------------------------------
// - event listener for color wheel btns
// - on click, set the background color, data-hex, 
//   and value properties for the hex inputs.
PolyEditor.prototype.colorSelect = function(){

	// set the background color
	document.getElementById("polygon-edit-" + mapApp.polyEditor.activeEdit + "-btn").style.backgroundColor = this.dataset.hex;

	// set the icon/text color
	document.getElementById("polygon-edit-" + mapApp.polyEditor.activeEdit + "-btn").style.color =
		( mapApp.polyEditor.hexBrightness( mapApp.polyEditor.hexToRgb( this.dataset.hex ) ) > .6 ) ? "#444" : "#FFF";
	
	// set the value
	document.getElementById("polygon-hex-" + mapApp.polyEditor.activeEdit + "-input").value = this.dataset.hex;
	
	// set the data-hex attribute
	document.getElementById("polygon-hex-" + mapApp.polyEditor.activeEdit + "-input").setAttribute( "data-hex", this.dataset.hex );

	// if we have an active polygon
	if(mapApp.polyEditor.activePolygon){
		// change the options for the active polygon
		mapApp.polyEditor.tempPolyOpts = {};
		mapApp.polyEditor.tempPolyOpts[mapApp.polyEditor.activeEdit + "Color"] = this.dataset.hex;
		mapApp.polyEditor.activePolygon.setOptions( mapApp.polyEditor.tempPolyOpts );
		mapApp.polyEditor.tempPolyOpts = null;
	}
}

//-----------------------------------------------
// - algorithm to determine if a hex value is 
//   light or dark.
// - @rgbObj -> object with r, g, & b values as
//   returned by hext to rgb function
// - returns a value between 0 and 1
// - #000 would return a value of 0
// - #FFF would return a value of 1
// - all other colors would be somewhere
//   inbetween
// - values below .6 should be overlaid with
//   white text
// - values above .6, overlaid with black
PolyEditor.prototype.hexBrightness = function( rgbObj ){
	// calculate & return weighted average
	return ( rgbObj.r*0.299 + rgbObj.g*0.587 + rgbObj.b*0.114 ) / 256;
}
//-----------------------------------------------
// - algorithm to convert hex to rgb
// - @hex -> hexidecimal as string
// - returns object with r, g, & b values
PolyEditor.prototype.hexToRgb = function(hex) {
	// convert to array of hex vals
	this.tempHex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
	// return the results as an object
    return this.tempHex ? {
        r: parseInt(this.tempHex[1], 16),
        g: parseInt(this.tempHex[2], 16),
        b: parseInt(this.tempHex[3], 16)
    } : null;
}

//-----------------------------------------------
// - event listener to change the opacity when
//   the user moves the slider
PolyEditor.prototype.slideOpacity = function(){

	// set the properties of the input
	document.getElementById("polygon-opacity-" + mapApp.polyEditor.activeEdit + "-input").value = this.value;
	document.getElementById("polygon-opacity-" + mapApp.polyEditor.activeEdit + "-input").setAttribute( "data-opacity", this.value );

	// set the options of the active polygon
	if(mapApp.polyEditor.activePolygon){
		// change the options for the active polygon
		mapApp.polyEditor.tempPolyOpts = {};
		mapApp.polyEditor.tempPolyOpts[mapApp.polyEditor.activeEdit + "Opacity"] = this.value;
		mapApp.polyEditor.activePolygon.setOptions( mapApp.polyEditor.tempPolyOpts );
		mapApp.polyEditor.tempPolyOpts = null;
	}
}

//-----------------------------------------------
// - keyup event listener for opacity input
PolyEditor.prototype.typeOpacity = function(){

	// if there is no input, or the value is 1 return 
	if( !this.value || this.value == "1" ) return;

	// strip out non-numeric values from the string
	this.value = this.value.replace(/[^\d.]/g, '');

	// if the value of the first character is not 0
	if( this.value.charAt(0) != "0" )

		// pop a 0 in there
		this.value = "0" + this.value;

	// if the value of the second character is not "."
	if( this.value.length > 1 && this.value.charAt(1) != "." )

		// pop the decimal in there
		this.value = "0." + this.value.substring(1, 3);

	// set the data-opacity attribute

	// set the value of the slider

	// change the polygon property options

}
//-----------------------------------------------
// - if the use leaves the field blank, set the
//   value to 0
PolyEditor.prototype.blurOpacity = function(){
	if(this.value === "")
		this.value = "0";
}

//-----------------------------------------------
// - event listener for <a> tag inside 
//   #toolbar-toggle elem
// - toggle the draw new polygon toolbar to make 
//   more space on the map
PolyEditor.prototype.toggleToolbar = function(e){

	e.preventDefault();

	// hide the semitrans elem
	document.getElementById("semi-trans").style.display = "none";

	// if the toolbar is displayed
	if( document.getElementById("edit-polygon-toolbar").offsetHeight > 140 ){
		// shrink it
		document.getElementById("edit-polygon-toolbar").style.height = "54px";
		// flip the toggler
		this.children[0].style.transform = "rotate(0deg)";
	}else{
		// grow it
		document.getElementById("edit-polygon-toolbar").style.height = "276px";
		// flip the toggler
		this.children[0].style.transform = "rotate(180deg)";
	}
}

//-----------------------------------------------
// - terminate edit pin mode
// - hide elements
// - remove event listeners
PolyEditor.prototype.terminateEditPolyMode = function(){

	// reset the newPolyMode property to false
	mapApp.editPolyMode = false;
	
	/* css */

	// change the class of the new pin button
	document.getElementById("components-toolbar").children[1].className = "btn";
	// display the drop-new-pin-toolbar element
	document.getElementById("edit-polygon-toolbar").style.display = "none";
	// change placeholder text for search maps input
	document.getElementById("search-maps-field").placeholder = "Search " + mapApp.businessName + " maps";

	/* google map */

	mapApp.polyEditor.termGooglePolyEdit();
}

//-----------------------------------------------	
// - remove event listeners to draw polygon
// - restore original functionality
PolyEditor.prototype.termGooglePolyEdit = function(){

	// change the cursor back to grabber
	rsApp.map.setOptions({ 
							draggableCursor : "grab",
						  	draggingCursor  : "grabbing"
					   });

	// active polygon no longer editable
	this.activePolygon.setOptions({editable : false});

	// set the active polygon property to null

}