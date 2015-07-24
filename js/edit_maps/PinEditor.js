//-----------------------------------------------
// 					edit pins
//			  	  -------------
//
// - Drag and drop a pin somewhere else on the 
//   map.
//
// - Edit the description
//
// - Delete pin
//
//-----------------------------------------------

/* CONSTRUCTOR */

var PinEditor = function(){

	/* properties */

	this.activePin = null;

	/* construction */

}

/* METHODS */

//-----------------------------------------------
// - Event listener for edit pin button in the
//   components toolbar
PinEditor.prototype.toggleEditPinMode = function(){
	// If the edit-pin-toolbar is hidden
	if( document.getElementById("edit-pin-toolbar").offsetParent == null )
		// initialize edit pin mode
		mapApp.pinEditor.initEditPinMode();
	else
		// terminate edit mode
		mapApp.pinEditor.terminateEditPinMode();
}

//-----------------------------------------------	
// - initialize edit pin mode
// - display elements
// - add necessary event listeners
PinEditor.prototype.initEditPinMode = function(){

	// exit the other formatting modes and hide other toolbars
	mapApp.termFormattingModes(1);

	// reset the new polygon mode property to true
	mapApp.editPinMode = true;
	
	/* css */

	// change the class of the new polygon component button
	document.getElementById("components-toolbar").children[0].className = "btn selected";
	// display the draw-new-polygon-toolbar element
	document.getElementById("edit-pin-toolbar").style.display = "block";
	// change placeholder text for search maps input
	document.getElementById("search-maps-field").placeholder = "Search locations";

	/* google map */

	this.initGooglePinEdit();

}

//-----------------------------------------------	
// - set event listeners for google maps edit pin
PinEditor.prototype.initGooglePinEdit = function(){

	// change the cursor on the map to a crosshair
	rsApp.map.setOptions({ 
							draggableCursor : "grab",
						  	draggingCursor  : "grabbing"
					   	});

	// allow the user to drop the active pin
	this.activePin.setOptions({ draggable : true });
}

//-----------------------------------------------	
// - remove event listeners to edit pin
// - restore original functionality
PinEditor.prototype.termGooglePolyEdit = function(){

	// active pin no longer editable
	this.activePin.setOptions({ draggable : false });

	// set the active polygon property to null
	this.activePin = null;
}