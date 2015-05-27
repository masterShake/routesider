
//--------------------------------------
//
//			routesider app
//
//--------------------------------------

//
// - This file contains all the 
//   javascript functions that can be 
//   found on every page.
// - The global variable representing a 
//   new rs object must be named rsApp.
//


/* routesider app */

var rs = function(){
	
	// google map variables
	this.userLatitude = 0;
	this.userLongitude = 0;
	this.map = null;
	// ajax variables
	this.ajaxObjs = {};
	this.indexer = 1;

	this.initMobileMenu();
	// this.setUserLocation();
};

/* methods */

//--------------------------------------
// - ajax function designed to avoid
//   memory leaks
rs.prototype.ajax = function(meth, url, params, callback, callbackParams){
    var i = this.indexer++;
    this.ajaxObjs[i] = new XMLHttpRequest();
    this.ajaxObjs[i].open(meth, url, true);
    this.ajaxObjs[i].setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    this.ajaxObjs[i].onreadystatechange = function() {
        if(rsApp.ajaxObjs[i].readyState == 4 && rsApp.ajaxObjs[i].status == 200) {
            if(callback)
                callback(rsApp.ajaxObjs[i].responseText, callbackParams);
            delete rsApp.ajaxObjs[i];
        }
    }
    this.ajaxObjs[i].send(params);
};


//----------------------------------------
// - Initialize a google map.
// - The map element must always have the
//   id #map-canvas.
rs.prototype.initGoogleMap = function(){

	this.map = new google.maps.Map(
				// map element
				document.getElementById("map-canvas"),
				// map options
				{ zoom : 9, 
				  center : new google.maps.LatLng( this.userLatitude, this.userLongitude )
				}
	);
};

// initialize the slide-out mobile menu
rs.prototype.initMobileMenu = function(){

	// add event listener to menu button
	console.log("pretend mobile menu initialized");

};


// var rsApp;

// document.addEventListener("DOMContentLoaded", function(){

//     // create new rs object
//     window.rsApp = new rs();
//     console.log(rsApp);

// }, false);



