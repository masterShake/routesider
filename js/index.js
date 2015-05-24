
//--------------------------------------
//
//		   index/homepage app
//
//--------------------------------------

//
// - This file contains all the rs
//   methods that can be found 
//   specifically on the index page.
//
// - functions are added as prototypes
//   of the rs object.
//



/* index methods */


//--------------------------------------
// - callback function after user grants
//   or rejects access to location data
// - use geocode to ajax query for local
//   promos.
rs.prototype.locationSuccess = function(position){

	// position.coords.longitude
	// position.coords.latitude

	console.log(position.coords);

}
//-------------------------------------
// rs.prototype.locationError = function(error){}


/* initialize */

document.addEventListener("DOMContentLoaded", function(){

    // create new rs object
    window.routesiderApp = new rs();

}, false);
        


