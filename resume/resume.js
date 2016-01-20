var rApp, 	// resume app
	gm,   	// google map object
	mm,		// map methods object
	mb,		// map builder root node
	as,		// active state
	pm,		// pin mode
	layout;	// sets position of #pageContent 







//-----------------------------------------------
//				rApp (resume app)
//			  ---------------------
//
// - manage resume javascript objects
//
//-----------------------------------------------

var R = function(){

	// set the togNav event listener
	document.querySelectorAll('.navbar .hidden-md-up')[0]
		.addEventListener('click', this.togNav, false);
}

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
//				 MM (map methods)
//			   --------------------
//
// - various methods that affect the google map
//
//-----------------------------------------------

var MM = function(){

	// track the google maps object
	gm = this.gm = null;

	// user location, default silicon valley
	this.userLat = 37.65120864327176;
	this.userLng = -122.091064453125;

	// autocomplete objects
	this.autoComp1 = 
	this.autoComp2 = null;

	// request the user's location
	this.getLocation();

}

//-----------------------------------------------
// - initialize google map
MM.prototype.initMap = function(){

	// init the google map
	gm = this.gm = new google.maps.Map( 
					// map element
					document.getElementById("map-canvas"),
					// map options
					{ center: {lat: this.userLat, lng: this.userLng}, zoom: 9 }
			     );

	// init the autocomplete objects
	this.autoComp1 = new google.maps.places.Autocomplete(navLinks.children[0].children[0]);
	this.autoComp2 = new google.maps.places.Autocomplete(lead.children[2].children[0]);

	// add autocomplete event listeners
	this.autoComp1.addListener('place_changed', this.selPlace);
	this.autoComp2.addListener('place_changed', this.selPlace);

	// init the pin object
	pm = mb.pm = new PM();
}

//-----------------------------------------------
// - request user location
MM.prototype.getLocation = function(){

	// trigger prompt for permission, callback
 	navigator.geolocation.getCurrentPosition(
	 	this.locationSuccess,
	 	this.locationError
    );
}

//-----------------------------------------------
// - user location callback function affirmative
// - 
MM.prototype.locationSuccess = function(position){

	// the the longitude and latitude properties
	mm.userLat = position.coords.latitude;
	mm.userLng = position.coords.longitude;

	// if the google map is not defined, do nothing
	if(!gm) return;

	// set the google map center and zoom
	gm.panTo({ lat: mm.userLat, lng: mm.userLng });
}

//-----------------------------------------------
// - location denied, do nothing
MM.prototype.locationError = function(){ return false; }

//-----------------------------------------------
// - user selects a place via google maps autocomplete
MM.prototype.selPlace = function(){
	layout.buryLead();
	gm.setCenter(this.getPlace().geometry.location);
    gm.setZoom(17);  // Why 17? Because it looks good.
	// drop pin
	new google.maps.Marker({
						    position: this.getPlace().geometry.location,
    						animation: google.maps.Animation.DROP,
						    map: gm
						  });
}





































//-----------------------------------------------
//				 MB (map builder)
//			   --------------------
//
// - root node for map builder objects
//
// - toggle popover
//
//-----------------------------------------------

var MB = function(){ console.log('created new MB object');

	// keep track of the active editor state
	as = this.as = null;

	// keep track of the pin mode object
	this.pm = null;

	// get the toolbar buttons
	this.p = mapTools.children;
	// toggle the cooresponding control panel
	this.p[0].addEventListener('click', this.togPan);
	this.p[1].addEventListener('click', this.togPan);
	this.p[2].addEventListener('click', this.togPan);
	this.p[3].addEventListener('click', this.togPan);

	// get the control panel buttons
	this.p = cPanels.getElementsByClassName('close');
	// set the toggle event listener
	this.p[0].addEventListener('click', this.shrink);
	// this.p[1].addEventListener('click', this.shrink);
	// this.p[2].addEventListener('click', this.shrink);

	// keep track of active control panel
	this.panel = -1;
}

//-----------------------------------------------
// - toggle display of the corresponding control
//   panel
MB.prototype.togPan = function(){ console.log('togPan called');

	// if there is an open/active control panel
	if(mb.panel >= 0)
		// close it
		cPanels.children[mb.panel].style.display = 'none';

	// if this panel was already open
	if(!this.dataset.panel || this.dataset.panel == mb.panel){
		// reset active panel index
		mb.panel = -1;
		// do nothing
		return;
	}

	// display the proper control panel
	cPanels.children[this.dataset.panel].style.display = 'block';
	// set the new panel index
	mb.panel = this.dataset.panel;
}

//-----------------------------------------------
// - shrink or expand popover content
MB.prototype.shrink = function(){
	
	// if the popover content is already shrunk
	if(this.parentElement.parentElement.children[3].offsetHeight == 45){
		// rotate the button
		this.style.transform = 'rotate(270deg)';
		// hide the fade
		this.parentElement.parentElement.children[2].style.display = 'none';
		// shrink the popover content
		this.parentElement.parentElement.children[3].style.height = 'auto';
		// money
		return;
	}
	// rotate the button
	this.style.transform = 'rotate(90deg)';
	// hide the fade
	this.parentElement.parentElement.children[2].style.display = 'block';
	// shrink the popover content
	this.parentElement.parentElement.children[3].style.height = '45px';
}









































//-----------------------------------------------
//				   PM (pin mode)
//				 -----------------
//
// - methods related to dropping and edition pin
//
//-----------------------------------------------

var PM = function(){

	// iterator
	this.i = 0;

	// keep track of the array of pins
	this.pins = {};

	// keep track of the corresponding infowindows
	this.wins = {};

	// temp variables
	this.t,
	this.u,
	this.v = null;

	// initialize the pin editor button
	mapTools.children[0].addEventListener('click', this.init);

}

//-----------------------------------------------
// - initialize pin editor mode
PM.prototype.init = function(){

	// if pin mode is already initialized
	if(as == 'pin'){
		// terminate pin mode
		pm.end(); return;
	}
	// change map cursor to crosshair
	gm.setOptions({draggableCursor:'crosshair'});
	// set the click event
	gm.addListener('click', pm.drop);
}

//-----------------------------------------------
// - terminate pin editor mode
PM.prototype.end = function(){
	// remove the google maps listener
	gm.removeListener('click', this.drop);
	// reset the cursors
	gm.setOptions({draggableCursor:'drag'});
	// close any open wins
	for(var i = 0; i < this.wins.length; i++)
		this.wins[i].close();
}

//-----------------------------------------------
// - click drop pin
PM.prototype.drop = function(e){
	// create & drop new pin
	pm.t = new google.maps.Marker
			({
			    position: {lat:e.latLng.lat(),lng:e.latLng.lng()},
				animation: google.maps.Animation.DROP,
			    map: gm
			});

	// give the pin an id
	pm.i++;
	pm.t.set('i', pm.i);

	// push it onto the hashmap
	pm.pins[pm.i] = pm.t;

	// create the info window
	pm.createIW();
}

//-----------------------------------------------
// - create info window element
PM.prototype.createIW = function(){

	// create a div
	this.u = document.createElement('div');

	// set the .info-window class
	this.u.className = 'info-window';

	// set the inner HTML
	this.u.innerHTML = '<div class="window-text">'+
						   '<div></div>'+
						   '<input type="text" class="form-control" placeholder="Title" aria-describedby="include info window for this pin" />'+
						   '<textarea placeholder="description"></textarea>'+
					   '</div>'+
					   '<div class="window-buttons">'+
						   '<button class="btn btn-danger" data-i="'+this.i+'"><span class="icon-bin"></span></button>'+
					   	   '<label>'+
							   '<input type="checkbox" class="form-control" checked />'+
							   '<span class="icon-eye"></span>'+
						   '</label>'+
						   '<div>display window</div>'+
					   '</div>';

	// init the new info window javascript
	this.initIW();					   
}

//-----------------------------------------------
// - init the new info window javascript
PM.prototype.initIW = function(){
	
	// create the infoWindow object
	this.v = new google.maps.InfoWindow({
			    content: this.u
			 });

	// set the info window id
	this.v.set('i', this.i);

	// push it onto the array
	this.wins[this.i] = this.v;					   

	// apply the info window to the new pin
	this.t.addListener('click', this.openIW);

	// add the display infowindow event
	this.u.children[1].children[1].children[0]
		.addEventListener('change', this.togWin);

	// add the delete event
	this.u.children[1].children[0].addEventListener('click', this.del);
}

//-----------------------------------------------
// - open info window
PM.prototype.openIW = function(){
	pm.wins[this.i].open(gm, this);
}

//-----------------------------------------------
// - toggle info window display
PM.prototype.togWin = function(){

	// get the veil element
	pm.t = this.parentElement.parentElement
				.parentElement.children[0].children[0];

	// hide veil
	if(this.checked){
		pm.t.style.zIndex = '-1';
		pm.t.style.opacity = '0';
	// show the veil
	}else{
		pm.t.style.zIndex = 
		pm.t.style.opacity = '1';
	}
}

//-----------------------------------------------
// - delete a pin 
PM.prototype.del = function(){

	// delete the info window object
	pm.wins[this.dataset.i].setMap(null);
	pm.wins[this.dataset.i] = null;
	delete pm.wins[this.dataset.i];

	// delete pin
	pm.pins[this.dataset.i].setMap(null);
	pm.pins[this.dataset.i] = null;
	delete pm.pins[this.dataset.i];
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

	// temp variable
	this.t = null;

	// set the position of the pageContent & navbar
	this.resize();

	// apply a resize event to the window
	window.addEventListener('resize', this.resize);

	// apply the bury lead event to the little x button
	lead.children[0].addEventListener('click', this.buryLead);

	// set the active class when user presses button
	mapTools.children[0].addEventListener('click', this.actBtn);
	mapTools.children[1].addEventListener('click', this.actBtn);
	mapTools.children[2].addEventListener('click', this.actBtn);
	mapTools.children[3].addEventListener('click', this.actBtn);
}

//-----------------------------------------------
// - handle page resize event
L.prototype.resize = function(){

	// set the position of the page content
	pageContent.style.top = (window.innerHeight - 60) + 'px';

	// set the position of the navbar
	pageContent.children[0].style.top =
	pageContent.children[1].style.top = -(window.innerHeight - 60) + 'px';
}

//-----------------------------------------------
// - destroy the lead element
L.prototype.buryLead = function(){
	// set the logo back into position
	logo.className = 'navbar-brand';
	// if there is a lead
	if(document.getElementById('lead')){
		// kill the opacity
		lead.style.opacity = '0';
		// set timeout to remove lead element
		setTimeout(layout.removeLead, 300);
	}
	// hide the mobile menu
	navLinks.style.transform = 'translate(129px, -93px) scale(0.1,0.1) rotateY(180deg)';
	setTimeout(rApp.hideNav, 300);
}
//-----------------------------------------------
// - helper function, removes lead child element
L.prototype.removeLead = function(){
	lead.parentElement.removeChild(lead);
}

//-----------------------------------------------
// - event to add/remove active btn class
L.prototype.actBtn = function(){

	// if this button is already active
	if( this.className.substr(this.className.length - 6) == "active"){

		// remove active class
		this.className = this.className.substr(0, this.className.length - 7);

		return false;
	}

	// look for another active btn
	rApp.t = this.parentElement.getElementsByClassName("active");

	// if there is another active btn
	if(rApp.t.length) 
		// remove its active class
		rApp.t[0].className = rApp.t[0].className
									.substr(0, rApp.t[0].className.length - 7);

	// activate this btn
	this.className = this.className + " active";
}




























//-----------------------------------------------
//
// 					initialize 
//
//-----------------------------------------------

// init the map methods object
mm = new MM();

// init map builder
mb = new MB();

document.addEventListener("DOMContentLoaded", function(){

	// init the page object
	rApp = new R();

	// set the layout
	layout = new L();

}, false);