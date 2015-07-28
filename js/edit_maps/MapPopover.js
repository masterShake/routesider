
//-----------------------------------------------
// 				    map popover
//			  	  ---------------
//
// - display bootstrap popover element above
//   google maps marker element.
//
//-----------------------------------------------

/* CONSTRUCTOR */

var MapPopover = function(){

	/* properties */

	// keep track of visible popover element
	this.activePopover = null;

	// keep track of the centerpoint
	this.activeLat = null;
	this.activeLng = null;

	/* initialize */

}

/* METHODS */

//-----------------------------------------------
// - google maps Marker event listener
// - display popover element above clicked marker
MapPopover.prototype.showPinPopover = function(){ console.log(this);

	// if user too far zoomed out
	if( rsApp.map.getZoom() < 10 )
		// zoom in a bit
		rsApp.map.setZoom(10);

	// keep track of the position of the pin
	mapApp.popover.activeLat = this.position.A
	mapApp.popover.activeLng = this.position.F
	// pan to position
	mapApp.popover.offsetCenter();

	// create a new popover element and insert
	event.target.parentElement.insertBefore(mapApp.popover.generatePopover(this), event.target);

	// add the event listeners
	mapApp.popover.addListeners();
}

//-----------------------------------------------
// - create a new popover DOM element
// - @ marker -> google maps pin or polygon
MapPopover.prototype.generatePopover = function(marker){

	// create the parent div
	this.activePopover = document.createElement("div");
	
	// set the class
	this.activePopover.className = "popover top";

	// set the id
	this.activePopover.setAttribute("data-id", marker.id);
	
	// set the inner HMTL
	this.activePopover.innerHTML = '<div class="arrow"></div>' +
							       '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
							       '<h5 class="popover-title"><span class="glyphicon glyphicon-map-marker"></span> pin</h5>' +
							       '<div class="popover-content">' +
							       '	<h4>' + marker.title + '</h4>' +
			        			   '	<p>"Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics</p>' +
			      				   // '	<p>' + marker.description + '</p>' +
			      				   '</div>'+
			      				   '<div class="popover-footer">' +
			      				   '	<button type="button" class="btn btn-success"><span class="glyphicon glyphicon-pencil"></span> edit</button>' +
			      				   '	<button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-trash"></span> delete</button>' +
			      				   '</div>';
    return this.activePopover;
}

//-----------------------------------------------
// - add event listeners to all the buttons 
//   inside the popover
// - add event listeners to the map
MapPopover.prototype.addListeners = function(){

    // click x close popover
    this.activePopover.getElementsByTagName("button")[0]
    	.addEventListener("click", mapApp.popover.hide, false);

    // hide the popover on drag
    google.maps.event.addListener(rsApp.map, 'dragstart', mapApp.popover.removeListeners);
    // recenter popover on zoom
    google.maps.event.addListener(rsApp.map, 'zoom_changed', mapApp.popover.offsetCenter);
    // hide when user clicks away from popover
    google.maps.event.addListener(rsApp.map, 'click', mapApp.popover.unfocus);

}

//-----------------------------------------------
// - reposition the map to offset center to
//   accomodate popover
MapPopover.prototype.offsetCenter = function(){
	rsApp.map.panTo( 
		new google.maps.LatLng( 
				// calculate the offset
				(mapApp.popover.activeLat + (0.0000410156 * Math.pow(2, (21 - rsApp.map.getZoom() )))), 
				mapApp.popover.activeLng
		) 
	);
}

//-----------------------------------------------
// - check to see if the user clicked outside of
//   the popover
// - hide the popover and remove event listeners
MapPopover.prototype.unfocus = function(){
	// keep track of current element
	mapApp.popover.currElem = event.target;
	// - loop up to the top parent
	// - make sure we clicked outside of activePopover
	while( mapApp.popover.currElem !== document.body ){
		// if we get to our active dropdown
		if(mapApp.popover.currElem === mapApp.popover.activePopover){
			// break out of the loop
			return;
		}
		// set the new currElem
		mapApp.popover.currElem = mapApp.popover.currElem.parentElement;
	}
	// - If we get this far, we need to close the popover
	//   and remove the event listeners.
	mapApp.popover.removeListeners();
}

//-----------------------------------------------
// - remove the event listeners from the google
//   map
MapPopover.prototype.removeListeners = function(){
	// remove the google event listeners
    google.maps.event.clearListeners(rsApp.map, 'dragstart');
    google.maps.event.clearListeners(rsApp.map, 'zoom_changed');
    google.maps.event.clearListeners(rsApp.map, 'click');
    // remove the popover elem
	mapApp.popover.hide();
}

//-----------------------------------------------
// - google map event listener
// - hide the active popover
MapPopover.prototype.hide = function(){
	// remove the popover element
	mapApp.popover.activePopover.parentElement.removeChild(mapApp.popover.activePopover);
}

