
//-----------------------------------------------
// 				draw new polygon
//			  --------------------
//
// - collection of methods that allows a user to
//   draw a new polygon.
//
//-----------------------------------------------

/* CONSTRUCTOR */

var PolyDrawer = function(){

	/* properties */

    // - temporary array to hold coordinates of new polygon
	//   under construction
	this.polyCoords = [];
	// - temporary array to hold any coordinates that have
	//   been removed from the polyline 
	this.polyCoordsRedo = [];
	// temporary google maps poly line object
	this.polyline = null;

    /* construction */

     // add event listener to the draw new polygon button
    document.getElementById("components-toolbar").children[4]
    	.addEventListener("click", this.toggleNewPolyMode, false);

    // add event listener to the close new polygon toolbar x
    document.getElementById("draw-new-polygon-toolbar").children[0]
    	.addEventListener("click", this.terminateNewPolyMode, false);

    // undo polyline event listener
    document.getElementById("undo")
    	.addEventListener("click", this.undoDrawPolyline, false);

    // redo polyline event listener
    document.getElementById("redo")
    	.addEventListener("click", this.redoDrawPolyline, false);

    // complete the polygon button event listener
    document.getElementById("complete-polygon")
    	.addEventListener("click", this.completePolygon, false);
}

/* METHODS */

//-----------------------------------------------
// - Event listener for new polygon button in the
//   components toolbar
PolyDrawer.prototype.toggleNewPolyMode = function(){

	// If the draw-new-polygon-toolbar is hidden
	if( !mapApp.newPolyMode )

		// initialize draw-new-poly mode
		mapApp.polyDrawer.initNewPolyMode();

	else

		// terminate draw-new-poly mode
		mapApp.polyDrawer.terminateNewPolyMode();
}

//-----------------------------------------------	
// - initialize new pin mode
// - display elements
// - add event listeners
PolyDrawer.prototype.initNewPolyMode = function(){ 

	// exit the other formatting modes and hide other toolbars
	mapApp.termFormattingModes(4);

	// reset the new polygon mode property to true
	mapApp.newPolyMode = true;
	
	/* css */

	// display the toggle toolbar tab
	// document.getElementById("toggle-toolbar").style.display = "block";
	// change the class of the new polygon component button
	document.getElementById("components-toolbar").children[4].className = "btn selected";
	// display the draw-new-polygon-toolbar element
	document.getElementById("draw-new-polygon-toolbar").style.display = "block";
	// change placeholder text for search maps input
	document.getElementById("search-maps-field").placeholder = "Search locations";

	/* google map */
	this.initGooglePolyDraw();
}

//-----------------------------------------------	
// - set event listeners for google maps draw 
//   polygon
PolyDrawer.prototype.initGooglePolyDraw = function(){

	// change the cursor on the map to a crosshair
	rsApp.map.setOptions({ 
							draggableCursor : "crosshair",
						  	draggingCursor  : "crosshair"
					   });
	// reset the polyCoords array
	this.polyCoords = [];

	// reset the polyCoordsRedo array to redo undos
	this.polyCoordsRedo = [];

	// if the polyline property is set to null
	if( this.polyline === null ){
		// create it
		this.polyline = new google.maps.Polyline({ editable : true });
		// set the map
		this.polyline.setMap( rsApp.map );
	}

	// apply event listener when location is selected with click
	google.maps.event.addListener( rsApp.map, 'click', mapApp.polyDrawer.drawPolyline );

	// add event when user clicks polyline to complete the polygon
	google.maps.event.addListener( this.polyline, "click", mapApp.polyDrawer.polylineComplete );
}

//-----------------------------------------------	
// - event listener polygon complete
PolyDrawer.prototype.drawPolyline = function(e){

	// clear the polyCoordsRedo array because the history has changed
	mapApp.polyDrawer.polyCoordsRedo = [];

	// change the class of the redo button
	document.getElementById("redo").className = "btn";

	// push to the polyCoords array
	mapApp.polyDrawer.polyCoords.push( e.latLng );

	// set the new path
	mapApp.polyDrawer.polyline.setPath( mapApp.polyDrawer.polyCoords );

	// maybe change the class of the complete button
	mapApp.polyDrawer.completeBtnClass();

	// defintely change the class of the undo button
	document.getElementById("undo").className = "btn btn-info";
}

//-----------------------------------------------	
// - undo line event listener
PolyDrawer.prototype.undoDrawPolyline = function(){

	// if polyCoords is empty, return false
	if( !mapApp.polyDrawer.polyCoords.length )
		return false;

	// pop off last point and add it to the undone
	mapApp.polyDrawer.polyCoordsRedo.push( mapApp.polyDrawer.polyCoords.pop() );

	// set class of redo button
	document.getElementById("redo").className = "btn btn-info";

	// now if polyCoords is empty, grey out the undo btn
	if( !mapApp.polyDrawer.polyCoords.length )
		this.className = "btn";

	// maybe change the class of the complete button
	mapApp.polyDrawer.completeBtnClass();

	// redraw the polyline
	mapApp.polyDrawer.polyline.setPath( mapApp.polyDrawer.polyCoords );
}

//-----------------------------------------------	
// - redo line event listener
PolyDrawer.prototype.redoDrawPolyline = function(){

	// if polyCoords is empty, return false
	if( !mapApp.polyDrawer.polyCoordsRedo.length )
		return false;

	// - Pop off the last object in the polyCoords array
	// - Push it to the polyCoordsRedo array
	mapApp.polyDrawer.polyCoords.push( mapApp.polyDrawer.polyCoordsRedo.pop() );

	// If polyCoords is now empty, grey out the redo btn
	if( !mapApp.polyDrawer.polyCoordsRedo.length )
		this.className = "btn";

	// maybe change the class of the complete button
	mapApp.polyDrawer.completeBtnClass();

	// polyCoords is definitely full so undo needs the correct class
	document.getElementById("undo").className = "btn btn-info";

	// redraw the polyline
	mapApp.polyDrawer.polyline.setPath( mapApp.polyDrawer.polyCoords );
}

//-----------------------------------------------	
// - clear the undo and redo btns and related 
//   ms property arrays
PolyDrawer.prototype.clearUndoRedoBtns = function(){

	// reset the polyCoords array
	this.polyCoords = [];

	// reset the polyCoordsRedo array to redo undos
	this.polyCoordsRedo = [];

	// reset the classes for the undo and redo btns
	document.getElementById("undo").className = "btn";
	document.getElementById("redo").className = "btn";
}

//-----------------------------------------------	 
// - function to change the class of the complete-polygon button
// - button will only fire if there are 3+ polyCoords
PolyDrawer.prototype.completeBtnClass = function(){
	// If there are more than 3 polyCoords
	if( this.polyCoords.length > 2 )
		// change the class of the complete-polygon button
		document.getElementById("complete-polygon").className = "btn btn-success";
	else
		// grey the complete-polygon button out
		document.getElementById("complete-polygon").className = "btn";
}

//-----------------------------------------------
// - event listener for polyline
// - if user clicks the last node, call the 
//   complete polygon method
PolyDrawer.prototype.polylineComplete = function(e){
	// if this is the last node
	if( e.latLng.A === mapApp.polyDrawer.polyCoords[0].A && 
		e.latLng.F === mapApp.polyDrawer.polyCoords[0].F )
		// complete the polygon
		mapApp.polyDrawer.completePolygon();
}

//-----------------------------------------------	
// - complete the polygon
PolyDrawer.prototype.completePolygon = function(){

	// if there are fewer than 3 polyCoords, do nothing
	if( mapApp.polyDrawer.polyCoords.length < 3 ) return;

	// change the class of the complete-polygon btn back to grey
	document.getElementById("complete-polygon").className = "btn";

	// remove the polyline overlay from our map
	mapApp.polyDrawer.polyline.setMap(null);

	// delete the polyline object
	mapApp.polyDrawer.polyline = null;

	// remove event listeners
	google.maps.event.clearListeners( rsApp.map, 'click' );

	// create a new polygon object and push it to the array
	mapApp.polygons.push(
		new google.maps.Polygon({
								    paths: mapApp.polyDrawer.polyCoords,
								    strokeColor: document.getElementById("polygon-hex-stroke-input").dataset.hex,
								    strokeOpacity: document.getElementById("polygon-opacity-stroke-input").dataset.opacity,
								    strokeWeight: 3,
								    fillColor: document.getElementById("polygon-hex-fill-input").dataset.hex,
								    fillOpacity: document.getElementById("polygon-opacity-fill-input").dataset.opacity,
								    editable : true
								})
					   );

	// put that bad boy on the map
	mapApp.polygons[mapApp.polygons.length - 1].setMap( rsApp.map );

	// clear the undo and redo btns
	mapApp.polyDrawer.clearUndoRedoBtns();

	// set the activePolygon property for mapApp
	mapApp.polyEditor.activePolygon = mapApp.polygons[mapApp.polygons.length - 1];

	// terminate new poly mode
	mapApp.polyDrawer.terminateNewPolyMode();

	// initialize edit poly mode
	mapApp.polyEditor.initEditPolyMode();

	// display save alert
	document.getElementById("save-alert").style.display = "block";
}

//-----------------------------------------------
// - terminate new pin mode
// - hide elements
// - remove event listeners
PolyDrawer.prototype.terminateNewPolyMode = function(){

	// reset the newPolyMode property to false
	mapApp.newPolyMode = false;
	
	/* css */

	// change the class of the new pin button
	document.getElementById("components-toolbar").children[4].className = "btn";
	// display the drop-new-pin-toolbar element
	document.getElementById("draw-new-polygon-toolbar").style.display = "none";
	// change placeholder text for search maps input
	document.getElementById("search-maps-field").placeholder = "Search " + this.businessName + " maps";

	/* google map */

	mapApp.polyDrawer.termGooglePolyDraw();
}

//-----------------------------------------------	
// - remove event listeners to draw polygon
// - restore original functionality
PolyDrawer.prototype.termGooglePolyDraw = function(){

	// change the cursor back to grabber
	rsApp.map.setOptions({ 
							draggableCursor : "grab",
						  	draggingCursor  : "grabbing"
					   });

}