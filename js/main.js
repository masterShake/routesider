
//--------------------------------------
//
//			routesider app
//
//--------------------------------------

//
// - This file contains all the javascript 
//   functions that can be found on every page.
//


/* routesider app */

var rs = function(){

	//// properties \\\\
	
	// google map variables
	this.userLatitude;
	this.userLongitude;
	this.map;
	// ajax variables
	this.ajaxObjs = {};
	this.indexer = 1;

	//// constructor \\\\

	this.initMobileMenu();
	this.setUserLocation();
}

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
        if(rsApp.ajaxObjs[i].readyState == 4 && this.ajaxObjs[i].status == 200) {
            if(callback)
                callback(rsApp.ajaxObjs[i].responseText, callbackParams);
            delete rsApp.ajaxObjs[i];
        }
    }
    this.ajaxObjs[i].send(params);
}

//--------------------------------------
// - request permission for user geoloc.
// - display map based on user location 
//   & db query.
//
rs.prototype.setUserLocation = function(){

	// trigger prompt for permission and/or callback
    navigator.geolocation.getCurrentPosition(

    	this.locationSuccess,
    	this.locationError
    );
}

// each page may overwrite this function
rs.prototype.locationSuccess = function(position){

	// position.coords.longitude
	// position.coords.latitude

	return false;
}

// each page may overwrite this function
rs.prototype.locationError = function(error){

	// display default map
	console.log(error);

}

// initialize a google map given a DOM element
rs.prototype.initGoogleMap = function(elem){

	this.map = new google.maps.Map(

				// map element
				elem,
				// map options
				{ zoom : 9, 
				  center : new google.maps.LatLng( this.userLatitude, this.userLongitude )
				}
	);

}

// initialize the slide-out mobile menu
rs.prototype.initMobileMenu = function(){

	// add event listener to menu button
	console.log("pretend mobile menu initialized");

}

