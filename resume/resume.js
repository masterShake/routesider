var rApp, 	// resume app
	gm,   	// google map object
	layout;	// sets position of #pageContent 







//-----------------------------------------------
//				rApp (resume app)
//			  ---------------------
//
// - manage resume javascript objects
//
//-----------------------------------------------

var R = function(){

	// track the google maps object
	this.gm = null;

	// user location, default silicon valley
	this.userLat = 37.65120864327176;
	this.userLng = -122.091064453125;

	// request the user's location
	this.getLocation();

	// set the togNav event listener
	document.querySelectorAll('.navbar .hidden-md-up')[0]
		.addEventListener('click', this.togNav, false);
}

//-----------------------------------------------
// - initialize google map
R.prototype.initMap = function(){

	// init the google map
	gm = this.gm = new google.maps.Map( 
					// map element
					document.getElementById("map-canvas"),
					// map options
					{ center: {lat: this.userLat, lng: this.userLng}, zoom: 9 }
			     );
}

//-----------------------------------------------
// - request user location
R.prototype.getLocation = function(){

	// trigger prompt for permission, callback
 	navigator.geolocation.getCurrentPosition(
	 	this.locationSuccess,
	 	this.locationError
    );
}

//-----------------------------------------------
// - user location callback function affirmative
// - 
R.prototype.locationSuccess = function(position){

	// the the longitude and latitude properties
	rApp.userLat = position.coords.latitude;
	rApp.userLng = position.coords.longitude;

	// if the google map is not defined, do nothing
	if(!gm) return;

	// set the google map center and zoom
	gm.panTo({ lat: rApp.userLat, lng: rApp.userLng });
}

//-----------------------------------------------
// - location denied, do nothing
R.prototype.locationError = function(){ return false; }

//-----------------------------------------------
// - toggle mobile navbar
R.prototype.togNav = function(){ console.log('togNav called');

	// if the navigation menu is showing
	if(navLinks.offsetParent !== null){

		// shrink the navigation
		navLinks.style.transform = 'translate(129px, -93px) scale(0.1,0.1) rotateY(180deg)';
		// set timeout to hide it
		setTimeout(rApp.hideNav, 300);
	}else{

		// show the navigation
		navLinks.style.display = 'block';

		// set time out to transform in
		setTimeout(rApp.showNav, 20);
	}

}
//-----------------------------------------------
// - animate in the navbar
R.prototype.showNav = function(){
	navLinks.style.transform = 'translate(0px, 55px) scale(1,1) rotateY(0deg)';
}
//-----------------------------------------------
// - hide the navbar
R.prototype.hideNav = function(){
	navLinks.style.display = 'none';
}







































//-----------------------------------------------
//				L (layout object)
//			  ---------------------
//
// - set the position of the page-content and
//   navbar on page load and resize
//
//-----------------------------------------------

var L = function(){

	// set the position of the pageContent & navbar
	this.resize();

	// apply a resize event to the window
	window.addEventListener('resize', this.resize);

}

//-----------------------------------------------
// - handle page resize event
L.prototype.resize = function(){

	// set the position of the page content
	pageContent.style.top = (window.innerHeight - 60) + 'px'; console.log(pageContent.children[0]);

	// set the position of the navbar
	pageContent.children[0].style.top =
	pageContent.children[1].style.top = -(window.innerHeight - 60) + 'px';
}

































//-----------------------------------------------
//
// 					initialize 
//
//-----------------------------------------------

rApp = new R();

document.addEventListener("DOMContentLoaded", function(){

	// set the layout
	layout = new L();

}, false);