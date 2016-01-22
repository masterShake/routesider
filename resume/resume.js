var rApp, 	// resume app
	gm,   	// google map object
	mm,		// map methods object
	mb,		// map builder root node
	as,		// active state
	pm,		// pin mode
	ui,		// upload image
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
R.prototype.togNav = function(){

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

var MB = function(){ 

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
MB.prototype.togPan = function(){ 

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

	// init the upload image object
	ui = new UI();

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
			    map: gm,
			    icon : ui.src
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
		this.parentElement.children[1].className = 'icon-eye';
	// show the veil
	}else{
		pm.t.style.zIndex = 
		pm.t.style.opacity = '1';
		this.parentElement.children[1].className = 'icon-eye-blocked';
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
//				 UI (image uploader)				
//			   -----------------------
//
// - drag and drop upload events
//
// - traditional upload events
//
// - activate properties toolbar
//
//-----------------------------------------------

/* CONSTRUCTOR */

var UI = function(){

	// .current-icon element
	this.iconElem = cPanels.getElementsByClassName('current-icon')[0]
						.children[0];

	// add the delete icon event
	this.iconElem.children[0].addEventListener('click', this.delIcon);

	// current icon source
	this.src = 

	// ajax object
	this.xhr = 

	// file for upload
	this.file = null;

	// temp variable, the the upload image element
	this.t = cPanels.getElementsByClassName('upload-img')[0];

	// apply file dragover event
	this.t.addEventListener("dragover", this.fh, false);

	// apply file dragleave event
	this.t.addEventListener("dragleave", this.fh, false);

	// apply file drop event
	this.t.addEventListener("drop", this.fs, false);

	// apply traditional upload fileselect event
	this.t.children[0].children[1]
		.addEventListener("change", this.fs, false);

}

/* METHODS */

//-----------------------------------------------
// - file hover, dragover file to drop 
UI.prototype.fh = function(e){
	e.stopPropagation();
	e.preventDefault();
	e.currentTarget.className = (e.type == "dragover" ? "upload-img hover" : "upload-img");
}

//-----------------------------------------------
// - file selection event listener
UI.prototype.fs = function(e) {

	// cancel event and hover styling
	ui.fh(e);

	// fetch FileList object
	ui.file = e.target.files || e.dataTransfer.files;// process all File objects
	ui.file = ui.file[0];

	// upload the file
	ui.uploadFile();
}

//-----------------------------------------------
// - upload image
UI.prototype.uploadFile = function(){

	// keep track of the image source

	// append a loading gif spinner
	// this.l();

	// - delete the previous xhr object
	// - it will be properly garbage collected
	this.xhr = null;

	// create a new one
	this.xhr = new XMLHttpRequest();

	// if file is the correct type and size
	if( (this.file.type == "image/jpeg" || 
		 this.file.type == "image/jpg"  ||
		 this.file.type == "image/png"  ||
		 this.file.type == "image/gif") && 
		 this.file.size < 9999999999999999
	  ){

	  	// add an event listener to the ajax request
	  	this.xhr.onreadystatechange = ui.uploadCB;

		// ajax
		this.xhr.open("POST", document.URL, true);
		this.xhr.setRequestHeader("X-file-name", this.file.name);
		this.xhr.send(this.file);
	}
}

//-----------------------------------------------
// - append a loading gif spinner to indicate 
//   that the file is being uploaded
UI.prototype.l = function(){ return false;
	// this.t = document.createElement('div');
	// this.t.className = 'uploading';
	// this.t.innerHTML = '<span class="glyphicon glyphicon-refresh loading"></span>';
	// this.io.a.children[3].appendChild(this.t);
}

//-----------------------------------------------
// - img file upload callback 
UI.prototype.uploadCB = function(){
	
	if (this.readyState != 4) return; console.log(this.responseText);

	// set the pin mode icon property
	ui.src = this.responseText;

	// set the current icon element
	ui.iconElem.removeChild(ui.iconElem.children[1]);

	// append a new image
	ui.iconElem.appendChild(document.createElement('img'));

	// set the image source
	ui.iconElem.children[1].src = this.responseText;
}

//-----------------------------------------------
// - delete current icon
UI.prototype.delIcon = function(){

	// if there is no user uploaded icon
	if(!ui.src) return;

	// reset the src property
	ui.src = null;

	// remove the image element
	this.parentElement.removeChild(
		this.parentElement.children[1]
	);

	// set the default element
	ui.iconElem.appendChild(
		document.createElement('span')
	);

	// set the class
	ui.iconElem.children[1].className = 'icon-location';
}

















































//-----------------------------------------------
//				 NP (new polygon)
//			   --------------------
//
// - add points
//
// - undo and redo functions
//
// - complete polygon
//
// - init edit polygon mode
//
//-----------------------------------------------

var NP = function(){

	// coordinates of a polygon under construction
	this.a = [];

	// - branch of coordinates that have been removed
	//	 from the polyline via the undo button
	this.b = [];

	// - keep track of the google maps polyline obj
	this.p = null;

	// temp variable, get the buttons
	this.t = cPanel.querySelectorAll('.new-poly button');

	// undo button
	this.u = this.p[0];
	this.u.addEventListener('click', this.undo);

	// redo button
	this.r = this.p[1];
	this.r.addEventListener('click', this.redo);

	// complete button
	this.c = this.p[2];
	this.c.addEventListener('click', this.fin);
}

//-----------------------------------------------	
// - set event listeners for google maps draw 
//   polygon
NP.prototype.init = function(){

	// change the cursor on the map to a crosshair
	gm.setOptions({ 
					draggableCursor : "crosshair"
				  });
	
	// reset the polyCoords array
	this.a = [];

	// reset the polyCoordsRedo array to redo undos
	this.b = [];

	// if the polyline property is set to null
	if( this.p === null ){
		// create it
		this.p = new google.maps.Polyline({ editable : true });
		// set the map
		this.p.setMap( gm );
	}

	// apply event listener when location is selected with click
	gm.addListener('click', this.draw);

	// user clicks last node to complete polygon
	this.p.addListener('click', this.pFin);
}

//-----------------------------------------------	
// - click map, add a coordinate to new polygon
NP.prototype.draw = function(e){

	// clear redo branch of coordinates
	np.b = [];

	// change the class of the redo button

	// push to coordinates array e.latLng

	// set the new path
	np.p.setPath( np.a );

	// maybe change the class of the complete button

	// defintely change the class of the undo button
}

//-----------------------------------------------	
// - undo line event listener
NP.prototype.undo = function(){

	// if there are no coords
	if( !np.a.length ) return false;

	// pop off last point and add it to the undo array

	// set class of redo button

	// now if polyCoords is empty, grey out the undo btn
	if( !np.a.length )
		this.className = "btn";

	// maybe change the class of the complete button

	// redraw the polyline
	np.p.setPath( np.a );
}

//-----------------------------------------------	
// - redo line event listener
NP.prototype.redo = function(){

	// if polyCoords is empty, return false
	if( !np.b.length ) return false;

	// - Pop off the last object in the polyCoords array
	// - Push it to the polyCoordsRedo array
	np.a.push( np.b.pop() );

	// If polyCoords is now empty, grey out the redo btn
	if( !np.b.length )
		this.className = "btn";

	// maybe change the class of the complete button

	// polyCoords is definitely full so undo needs the correct class

	// redraw the polyline
	np.p.setPath( np.a );
}

//-----------------------------------------------
// - event listener for polyline
// - if user clicks the last node, call the 
//   complete polygon method
NP.prototype.pFin = function(e){
	// if this is the last node
	if( e.latLng.A === np.a[0].A && 
		e.latLng.F === np.a[0].F )
		// complete the polygon
		np.fin();
}

//-----------------------------------------------
// - click complete button
NP.prototype.cFin = function(){

	// if there are fewer than 3 polyCoords, do nothing
	if( np.a.length < 3 ) return;

	// complete the polygon
	np.fin();

}

//-----------------------------------------------	
// - complete the polygon
NP.prototype.fin = function(){

	// change the class of the complete-polygon btn back to grey

	// remove the polyline overlay from our map
	this.a.setMap(null);

	// delete the polyline object
	this.p = null;

	// remove event listeners np.draw() click event

	// create a new polygon object
	this.t = this.cnp();

	// clear the undo and redo btns

	// terminate new poly mode

	// initialize edit poly mode
}

//-----------------------------------------------
// - create new polygon object
NP.prototype.cnp = function(){

	// create the new google maps polygon object
	this.t = new google.maps.Polygon
					({
					    paths: np.a,
					    strokeColor: '#5CB85C',
					    strokeOpacity: '0.8',
					    strokeWeight: 3,
					    fillColor: '#5CB85C',
					    fillOpacity: '0.3',
					    editable : true
					});

	// push it onto the array of polygons
	ep.gons.push(this.t);

	// put that bad boy on the map
	this.t.setMap(gm);	

	// return the fresh polygon
	return this.t;
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