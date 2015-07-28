
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

	/* initialize */

}

/* METHODS */

//-----------------------------------------------
// - google maps Marker event listener
// - display popover element above clicked marker
MapPopover.prototype.showPinPopover = function(){ console.log(this);

	// pan map view into position
	rsApp.map.panTo( new google.maps.LatLng( (this.position.A + 0.01), this.position.F ) );
	rsApp.map.setZoom(12);

	// create a new popover element and insert
	event.target.parentElement.insertBefore(mapApp.popover.generatePopover(this), event.target);
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

    // add event listeners
    this.activePopover.getElementsByTagName("button")[0]
    	.addEventListener("click", mapApp.popover.hide, false);

    return this.activePopover;
}

//-----------------------------------------------
// - google map event listener
// - hide the active popover
MapPopover.prototype.hide = function(){

	mapApp.popover.activePopover.parentElement.removeChild(mapApp.popover.activePopover);
}

