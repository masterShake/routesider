//-----------------------------------------------
//
//	Thank you for visiting routesider. 
//
//	Some facts about this web app:
//		
//		+ Completed in approximatedly 60 hours
//
//		+ As you can see I prefer to code using
//		  raw JS to improve performance.
//
//		+ Built to be as memory efficient as
//		  possible to accomodate the Google Maps 
//		  API
//
//		+ Not fully optimized to provide a 
//		  benchmark measure of my coding quality
//		  vs. speed.
//
//-----------------------------------------------



var rApp, 		// resume app
	gm,   		// google map object
	mm,			// map methods object
	mapBuilder,	// map builder root node
	as,			// active state
	iWin,		// info window manager
	dropPin,	// pin mode
	ui,			// upload image
	drawPoly,	// new polygon
	editPoly,	// existing polygon
	resMap, 	// Resume Map object
	layout		// sets position of #page-content
	= null;






//-----------------------------------------------
//				rApp (resume app)
//			  ---------------------
//
// - manage resume javascript objects
//
//-----------------------------------------------

var R = function(){

	// keep track of the active nav tab
	this.activeTab = 0;

	// keep track of the resume nav tabs
	this.tabs = document.getElementsByClassName('nav-tabs')[0].children;

	// keep track of the resume content container
	this.resumeContent = document.getElementsByClassName('resume-content')[0].children;

	// set the togNav event listener
	document.querySelectorAll('.navbar .hidden-md-up')[0]
		.addEventListener('click', this.togNav, false);

	// temp variable, determine if mobile layout
	this.t = (window.innerWidth < 767);

	// height of this element must be set with js
	cPanels.children[0].children[3].style.height = (this.t) ? '241px' : '156px';
	cPanels.children[0].children[1].children[2].setAttribute('data-h', (this.t ? 241 : 156));

	// navtab event listeners
	this.tabs[0].children[0].addEventListener('click', this.navTab);
	this.tabs[1].children[0].addEventListener('click', this.navTab);
	this.tabs[2].children[0].addEventListener('click', this.navTab);
}

//-----------------------------------------------
// - toggle mobile navbar
R.prototype.togNav = function(){

	// if the navigation menu is showing
	if(navLinks.offsetParent !== null){

		// shrink the navigation
		navLinks.style.webkitTransform = 
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
	navLinks.style.webkitTransform =
	navLinks.style.transform = 'translate(0px, 55px) scale(1,1) rotateY(0deg)';
}
//-----------------------------------------------
// - hide the navbar
R.prototype.hideNav = function(){
	navLinks.style.display = 'none';
}

//-----------------------------------------------
// - resume nav tabs
R.prototype.navTab = function(e){ e.preventDefault();

	// if this navtab is already active, do nothing
	if(this.className == 'nav-link active') return;

	// deactivate the active navtab
	rApp.deactTab(parseInt(this.dataset.tab));

	// activate this tab
	this.className = 'nav-link active';
	rApp.resumeContent[this.dataset.tab].style.display = 'block';
}
//-----------------------------------------------
// - hide tab 
// - n --> tab index
R.prototype.deactTab = function(n){
	// deactivate the a.nav-link class
	this.tabs[this.activeTab].children[0].className = 'nav-link';
	// hide the resume section
	this.resumeContent[this.activeTab].style.display = 'none';
	// set the new active tab
	this.activeTab = n;
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
					{ center: {lat: this.userLat, lng: this.userLng}, zoom: 13 }
			     );

	// init the autocomplete objects
	this.autoComp1 = new google.maps.places.Autocomplete(navLinks.children[0].children[0]);
	this.autoComp2 = new google.maps.places.Autocomplete(lead.children[2].children[0]);

	// add autocomplete event listeners
	this.autoComp1.addListener('place_changed', this.selPlace);
	this.autoComp2.addListener('place_changed', this.selPlace);

	// init the pin object
	dropPin = mapBuilder.dropPin = new DropPin();

	// init the polygon objects
	drawPoly = mapBuilder.drawPoly = new DrawPoly();
	editPoly = mapBuilder.editPoly = new EditPoly();

	mapBuilder.embedView = new EmbedView();
	mapBuilder.embedCode = new EmbedCode();

	// init the resume map functions
	resMap = new ResumeMap();
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
	gm.panTo({ lat: mm.userLat, lng: mm.userLng })
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
//				 MapBuilder (map builder)
//			   --------------------
//
// - root node for map builder objects
//
// - toggle popover
//
//-----------------------------------------------

var MapBuilder = function(){ 

	// iterator
	this.i = 0;

	// - keep track of the editor mode objects
	this.dropPin = 
	this.drawPoly = 
	this.editPoly = 
	this.embedView = 
	this.embedCode = null;

	// loop through buttons that toggle control panels
	this.p = document.getElementById('page-content').children[3].querySelectorAll('[data-panel]');
	for(var i = 0; i < this.p.length; i++){
		// toggle the cooresponding control panel
		this.p[i].addEventListener('click', this.togPan);
		// init and/or terminate the active state
		this.p[i].addEventListener('click', this.IorT);
	}

	// loop through the control panel shrink buttons
	this.p = cPanels.querySelectorAll('[data-h]');
	for(var i = 0; i < this.p.length; i++)
		this.p[i].addEventListener('click', this.shrink);

	// keep track of active control panel
	this.panel = -1;
}

//-----------------------------------------------
// - toggle display of the corresponding control
//   panel
MapBuilder.prototype.togPan = function(){ 

	// show or hide the panel
	mapBuilder.showPan(this.dataset.panel);

	// get the offset amount
	mapBuilder.p = this.offsetLeft - 
				   this.offsetWidth/2 +
				   this.parentElement.offsetLeft + 
				   this.parentElement.parentElement.offsetLeft+
				   this.parentElement.parentElement.parentElement.offsetLeft;

	// if the window is wider than 992
	if(window.innerWidth > 991){
		cPanels.children[this.dataset.panel].style.left = 
			this.offsetLeft + 
				   this.offsetWidth/2 +
				   this.parentElement.offsetLeft  - cPanels.children[this.dataset.panel].offsetWidth/2 - 5 + 'px';

	// if the window is wider than 500px
	}else if(window.innerWidth > 767){		
		// offset the control panel
		cPanels.children[this.dataset.panel].style.left = 
			mapBuilder.p - cPanels.children[this.dataset.panel].offsetWidth/2 + 'px';
	}else{
		// set the panel arrow caret
		cPanels.children[this.dataset.panel].children[0].style.left = 
			mapBuilder.p + 40 + 'px';
	}
}

//-----------------------------------------------
// - hide or show the control panel
// - i --> panel index
MapBuilder.prototype.showPan = function(i){

	// if there is an open/active control panel
	if(this.panel >= 0)
		// close it
		cPanels.children[this.panel].style.display = 'none';

	// if this panel was already open
	if(!i || i == this.panel){
		// reset active panel index
		this.panel = -1;
		// do nothing
		return;
	}

	// display the proper control panel
	cPanels.children[i].style.display = 'block';
	// set the new panel index
	this.panel = i;
}

//-----------------------------------------------
// - shrink or expand popover content
MapBuilder.prototype.shrink = function(){
	
	// if the popover content is already shrunk
	if(this.parentElement.parentElement.children[3].offsetHeight == 45){
		// rotate the button
		this.style.webkitTransform = 
		this.style.transform = 'rotate(270deg)';
		// hide the fade
		this.parentElement.parentElement.children[2].style.display = 'none';
		// shrink the popover content
		this.parentElement.parentElement.children[3].style.height = this.dataset.h+'px';
		// money
		return;
	}
	// rotate the button
	this.style.webkitTransform = 
	this.style.transform = 'rotate(90deg)';
	// hide the fade
	this.parentElement.parentElement.children[2].style.display = 'block';
	// shrink the popover content
	this.parentElement.parentElement.children[3].style.height = '45px';
}

//-----------------------------------------------
// - toolbar buttons init and/or terminate active
//   state
MapBuilder.prototype.IorT = function(){

	// if any mode is active, terminate it
	if(as) mapBuilder[as].term();
	
	// if this button is the current active state
	if(this.dataset.as == as){
		
		// reset the active state variable
		as = null;

		return;
	}
	
	// set the current active state
	as = this.dataset.as;

	// initialize the editor mode
	mapBuilder[as].init();
}







































//-----------------------------------------------
//				   DropPin (pin mode)
//				 -----------------
//
// - methods related to dropping and edition pin
//
//-----------------------------------------------

var DropPin = function(){

	// keep hashmap of pins
	this.h = {};

	// keep track of the click event handler
	this.eHandle =

	// temp variable
	this.t = null;

	// init the upload image object
	ui = new UI();
}

//-----------------------------------------------
// - initialize pin editor mode
DropPin.prototype.init = function(){
	// change map cursor to crosshair
	gm.setOptions({draggableCursor:'crosshair'});
	// set the click event
	this.eHandle = gm.addListener('click', this.drop);
}

//-----------------------------------------------
// - terminate pin editor mode
DropPin.prototype.term = function(){
	// remove the google maps listener
	this.eHandle.remove();
	// reset the cursors
	gm.setOptions({draggableCursor:'draggable'});
	// close any open wins
	for(var i = 0; i < iWin.h.length; i++)
		iWin.h[i].close();
	// make sure the button is deactivated
	mapTools.children[0].className = 'btn';
}

//-----------------------------------------------
// - click drop pin
DropPin.prototype.drop = function(e){
	// create & drop new pin
	dropPin.t = new google.maps.Marker
			({
			    position: {lat:e.latLng.lat(),lng:e.latLng.lng()},
				animation: google.maps.Animation.DROP,
			    map: gm,
			    icon : ui.src
			});

	// give the pin an id
	mapBuilder.i++;
	dropPin.t.set('i', mapBuilder.i);

	// push it onto the hashmap
	dropPin.h[mapBuilder.i] = dropPin.t;

	// create the info window
	iWin.createWin(dropPin.t);
}







































//-----------------------------------------------
//						IWin
//					  --------
//
// - create new google maps InfoWindow object
//
// - set info window html, apply event listeners
//
// - method to toggle display window display
//
// - method to delete info window and target obj
//
//-----------------------------------------------

var IWin = function(){

	// keep track of all the InfoWindows
	this.h = {};

	// temp variables
	this.t = 		// mapObj || veil element
	this.u = 		// mapObj content element
	this.v = null;  // new info window object
}

//-----------------------------------------------
// - create info window element
// - mapObj --> google maps pin or polygon object
IWin.prototype.createWin = function(mapObj){

	// set the temp map object
	this.t = mapObj;

	// create a div
	this.u = document.createElement('div');

	// set the inner HTML
	this.u.innerHTML = '<div>'+    
						   '<div class="window-text">'+
							   '<div></div>'+
							   '<input type="text" class="form-control" placeholder="Title" aria-describedby="include info window for this pin" />'+
							   '<textarea placeholder="description"></textarea>'+
						   '</div>'+
						   '<div class="window-buttons">'+
							   '<button class="btn btn-danger" data-i="'+this.t.i+'" '+ // hashmap key & object type
							   								  'data-obj="'+(this.t.hasOwnProperty('icon') ? 'dropPin' : 'editPoly')+'" >'+
							   		'<span class="icon-bin"></span>'+
							   '</button>'+
						   	   '<label>'+
								   '<input type="checkbox" data-i="'+this.t.i+'" class="form-control" checked />'+
								   '<span class="icon-eye"></span>'+
							   '</label>'+
							   '<div>display window</div>'+
						   '</div>'+
					   '</div>'+
					   '<div style="display:none;">'+
					       '<h4></h4>'+
					       '<p></p>'+
					   '</div>';

	// init the new info window javascript
	this.initIW();					   
}

//-----------------------------------------------
// - init the new info window javascript
IWin.prototype.initIW = function(){
	
	// create the infoWindow object
	this.v = new google.maps.InfoWindow({
			    content: this.u,
			    position: (this.t.hasOwnProperty('bounds') ? this.t.bounds.getCenter() : this.t.latLng)
			 });

	// set the info window id
	this.v.set('i', this.t.i);

	// set the info window active
	this.v.set('active', 1);

	// push it onto the array
	this.h[this.t.i] = this.v;					   

	// apply the info window to the new pin
	this.t.addListener('click', this.openIW);

	// add the display infowindow event
	this.u.children[0].children[1].children[1].children[0]
		.addEventListener('change', this.togWin);

	// keyup events set the read only elements
	this.u.children[0].children[0].children[1]
		.addEventListener('keyup', this.setTitle);
	this.u.children[0].children[0].children[2]
		.addEventListener('keyup', this.setP);

	// add the delete event
	this.u.children[0].children[1].children[0].addEventListener('click', this.del);
}

//-----------------------------------------------
// - open info window
IWin.prototype.openIW = function(){

	iWin.t = iWin.h[this.i].getContent().children[1];

	// if window not active or empty
	if(as == 'embedView' && (!iWin.h[this.i].active || (!iWin.t.children[0].innerHTML && !iWin.t.children[1].innerHTML))) return;

	// open the window
	iWin.h[this.i].open(gm, this);
}

//-----------------------------------------------
// - toggle info window display
IWin.prototype.togWin = function(){

	// get the veil element
	iWin.t = this.parentElement.parentElement
				.parentElement.children[0].children[0];

	// hide veil
	if(this.checked){
		iWin.t.style.zIndex = '-1';
		iWin.t.style.opacity = '0';
		this.parentElement.children[1].className = 'icon-eye';
		iWin.h[this.dataset.i].active = 1;
	// show the veil
	}else{
		iWin.t.style.zIndex = 
		iWin.t.style.opacity = '1';
		this.parentElement.children[1].className = 'icon-eye-blocked';
		iWin.h[this.dataset.i].active = 0;
	}
}


//-----------------------------------------------
// - delete iWindow and cooresponding map object
IWin.prototype.del = function(){

	// delete the cooresponding map object
	mapBuilder[this.dataset.obj].h[this.dataset.i].setMap(null);
	mapBuilder[this.dataset.obj].h[this.dataset.i] = null;
	delete mapBuilder[this.dataset.obj].h[this.dataset.i];

	// set the i
	iWin.t = this.dataset.i;

	// delete the iWindow
	iWin.delWin();
}
IWin.prototype.delWin = function(){

	this.h[this.t].set({content:''});
	this.h[this.t].setMap(null);
	this.h[this.t] = null;
	delete this.h[this.t];
}

//-----------------------------------------------
// - keyup set title value
IWin.prototype.setTitle = function(){
	this.parentElement.parentElement.parentElement
		.children[1].children[0].innerHTML = this.value;
}

//-----------------------------------------------
// - keyup set paragraph value
IWin.prototype.setP = function(){
	this.parentElement.parentElement.parentElement
		.children[1].children[1].innerHTML = this.value;
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
//				 DrawPoly (new polygon)
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

var DrawPoly = function(){

	// coordinates of a polygon under construction
	this.coords = [];

	// - branch of coordinates that have been removed
	//	 from the polyline via the undo button
	this.coordsUndone = [];

	// - keep track of the google maps polyline obj
	this.polyline = 

	// keep track of event handler for easy removal later
	this.eHandle = null;

	// temp variable, get the buttons
	this.t = cPanels.querySelectorAll('.new-poly button');

	// undo button
	this.undoBtn = this.t[0];
	this.undoBtn.addEventListener('click', this.undo);

	// redo button
	this.redoBtn = this.t[1];
	this.redoBtn.addEventListener('click', this.redo);

	// complete button
	this.compBtn = this.t[2];
	this.compBtn.addEventListener('click', this.completePolygon);
}

//-----------------------------------------------	
// - set event listeners for google maps draw 
//   polygon
DrawPoly.prototype.init = function(){

	// change the cursor on the map to a crosshair
	gm.setOptions({ 
					draggableCursor : "crosshair"
				  });
	
	// reset the polyCoords array
	this.coords = [];

	// reset the polyCoordsRedo array to redo undos
	this.coordsUndone = [];

	// if the polyline property is set to null
	if( this.polyline === null ){
		// create it
		this.polyline = new google.maps.Polyline({ editable : true });
		// set the map
		this.polyline.setMap( gm );
	}

	// apply event listener when location is selected with click
	this.eHandle = gm.addListener('click', this.draw);

	// user clicks last node to complete polygon
	this.polyline.addListener('click', this.lineComplete);
}

//-----------------------------------------------
// - terminate new polygon mode
DrawPoly.prototype.term = function(){

	// remove the draw event
	this.eHandle.remove();

	// make sure the button is deactivated
	mapTools.children[1].className = 'btn';

	// if there is still a polyline
	if(this.polyLine){
		// delete the polyline
		this.polyline.setMap(null);
		this.polyline = null;
	}
}

//-----------------------------------------------	
// - click map, add a coordinate to new polygon
DrawPoly.prototype.draw = function(e){

	// push the latLng object onto the coords array
	drawPoly.coords.push(e.latLng);

	// call the draw function to make shit faster
	drawPoly.updatePolyline();

	// clear redo branch of coordinates
	drawPoly.coordsUndone = [];
}

//-----------------------------------------------	
// - undo line event listener
DrawPoly.prototype.undo = function(){

	// if there are no coords
	if( !drawPoly.coords.length ) return false;

	// pop off last point and add it to the undo array
	drawPoly.coordsUndone.push( drawPoly.coords.pop() );

	// update the polyline
	drawPoly.updatePolyline();
}

//-----------------------------------------------	
// - redo line event listener
DrawPoly.prototype.redo = function(){

	// if polyCoords is empty, return false
	if( !drawPoly.coordsUndone.length ) return false;

	// - Pop off the last object in the polyCoords array
	// - Push it to the polyCoordsRedo array
	drawPoly.coords.push( drawPoly.coordsUndone.pop() );

	// update the polyline
	drawPoly.updatePolyline();
}

//-----------------------------------------------
// - set the coordinates of the polyline object
// - set the css properties of the elements
DrawPoly.prototype.updatePolyline = function(){

	// set the new path
	this.polyline.setPath( this.coords );

	// set complete button class based on coord count
	this.compBtn.className = (this.coords.length > 2) ? 'btn btn-info' : 'btn';

	// redo button class if any coords have been undone
	this.redoBtn.className = (this.coordsUndone.length) ? 'btn btn-success' : 'btn';

	// undo button green if coords array is not empty
	this.undoBtn.className = (this.coords.length) ? 'btn btn-success' : 'btn';
}

//-----------------------------------------------
// - event listener for polyline
// - if user clicks the last node, call the 
//   complete polygon method
DrawPoly.prototype.lineComplete = function(e){
	// if fewer than 3 coords do nothing
	if(drawPoly.coords.length < 3) return;

	// if this is the last node
	if( e.latLng.A === drawPoly.coords[0].A && 
		e.latLng.F === drawPoly.coords[0].F )
		// complete the polygon
		drawPoly.completePolygon();
}

//-----------------------------------------------
// - click complete button
DrawPoly.prototype.btnComplete = function(){

	// if there are fewer than 3 polyCoords, do nothing
	if( drawPoly.coords.length < 3 ) return;

	// complete the polygon
	drawPoly.completePolygon();

}

//-----------------------------------------------	
// - complete the polygon
DrawPoly.prototype.completePolygon = function(){

	// delete the polygon
	drawPoly.polyline.setMap(null);
	drawPoly.polyline = null;

	// terminate draw polygon mode by clicking
	mapTools.children[1].click();

	// hide the control panel
	cPanels.children[1].style.display = 'none';

	// create new polygon
	editPoly.createPolygon();
}



































//-----------------------------------------------
//				EditPoly (edit polygon)
//			  ---------------------
//
// - init edit mode, make active polygon editable
//
// - color hex, button, picker input
//
// - opacity input & slider
//
//-----------------------------------------------

var EditPoly = function(){

	// hashmap of google maps Polygon objects
	this.h = {};

	// keep track of the active polygon
	this.a = null;

	// - keep track of the active property
	// - 0 => border, 1 => fill
	this.bf = 0;

	// init polygon color object
	this.polyColor = new PolyColor(this);

	// init polygon opacity object
	this.polyOpacity = new PolyOpacity(this);

	// get the fill/border buttons
	this.btns = poly.querySelectorAll('table button');

	// temp variable, get all the bf inputs
	this.t = cPanels.children[2].querySelectorAll('[data-bf]');
	// set the focus event
	for(var i = 0; i < this.t.length; i++)
		this.t[i].addEventListener('click', this.tf, false);
}

EditPoly.prototype.init = function(){

	// set the active state
	as = 'editPoly';

	// display the control panel
	cPanels.children[2].style.display = 'block';

	// set the active panel
	mapBuilder.panel = 2;

}

EditPoly.prototype.term = function(){ console.log('editPoly term called');

	// active polygone no longer editable
	this.a.setOptions({editable : false});

	// reset active polygone
	this.a = null;

	// hide the control panel
	cPanels.children[2].style.display = 'none';

	// map dragable cursor
	gm.setOptions({draggableCursor:'draggable'});
}

//-----------------------------------------------
// - click on polygon, toggle active
EditPoly.prototype.togPoly = function(){

	// if this is the active polygon, do nothing
	if(this === editPoly.a) return;

	// if there is already an active polygon
	if(editPoly.a)
		// make the active polygon uneditable
		editPoly.a.setOptions({editable:false});

	// set the new active polygon
	editPoly.a = editPoly.h[this.i];

	// make the newly activated polygon editable
	editPoly.a.setOptions({editable:true});

	// fit polygon within map bounds
	gm.fitBounds(editPoly.a.bounds);
}

//-----------------------------------------------
// - create new polygon object
// - array of latLng object to create a polygon with
EditPoly.prototype.createPolygon = function(){

	// create the new google maps polygon object
	this.a = new google.maps.Polygon
					({
					    paths: drawPoly.coords,
					    strokeColor: '#5CB85C',
					    strokeOpacity: '0.8',
					    strokeWeight: 3,
					    fillColor: '#5CB85C',
					    fillOpacity: '0.3',
					    editable : true
					});

	// increment the indexer
	mapBuilder.i++;

	// set the i property
	this.a.set('i', mapBuilder.i);

	// set the bounds so we don't need to loop for them later
	this.a.set('coords', drawPoly.coords);

	// push it onto the hashmap of polygons
	this.h[mapBuilder.i] = this.a;

	// add event listeners and init InfoWindow
	this.setPolyEvents();
}

//-----------------------------------------------
// - set polygon events
EditPoly.prototype.setPolyEvents = function(){

	// put that bad boy on the map
	this.a.setMap(gm);	

	// set some geometric property of the poly
	this.setGeometry();

	// apply the click event
	this.a.addListener('click', this.togPoly);

	// init polygon editor mode
	this.init();
}

//-----------------------------------------------
// - calculate some geometric properties of the
//   newly created polygon
EditPoly.prototype.setGeometry = function(){

	// create a bounds object
	this.t = new google.maps.LatLngBounds();

	// loop through the coords to create bounds
	for(var i = 0; i < this.a.coords.length; i++)
		this.t.extend(this.a.coords[i]);

	// set the bounds property
	this.a.set('bounds', this.t);

	// create a new info window
	iWin.createWin(this.a);
}

//-----------------------------------------------
// - toggle fill/stroke of polygon
EditPoly.prototype.tf = function(){

	// set the active property
	editPoly.bf = parseInt(this.dataset.bf);

	// give the button an active class
	editPoly.btns[this.dataset.bf].className = 'btn active';

	// remove the active class from the other button
	editPoly.btns[(this.dataset.bf == '0' ? 1 : 0)].className = 'btn';

	// set the color input
	editPoly.polyColor.pikr.value = editPoly.polyColor.htxt[this.dataset.bf].value;

	// set the opacity slider
	editPoly.polyOpacity.sldr.value = editPoly.polyOpacity.otxt[this.dataset.bf].value;
}































//-----------------------------------------------
//				PolyColor (polygon color)
//			  -----------------------
//
// - set border/fill button color
//
// - hex text input
//
// - color wheel buttons
//
// - set the color of the map
//
// - editPoly --> EditPolygon object
//
//-----------------------------------------------

var PolyColor = function(ep){

	// reference to editPoly object
	this.ep = ep;

	// get the hex text inputs
	this.htxt = poly.getElementsByClassName('hex-text');

	// get the color picker input
	this.pikr = poly.querySelectorAll('input[type="color"]')[0];

	// apply hextext events
	this.htxt[0].addEventListener('keyup', this.hexText);
	this.htxt[1].addEventListener('keyup', this.hexText);

	// apply the color picker events
	this.pikr.addEventListener('change', this.colorPick);

	// this.t --> temp variable
	// loop through the color wheel buttons, set listener
	this.t = poly.querySelectorAll('[data-hex]');
	for(var i = 0; i < this.t.length; i++)
		this.t[i].addEventListener('click', this.wheelBtn);
}

//-----------------------------------------------
// - algorithm to determine if a hex value is 
//   light or dark.
// - @rgbObj -> object with r, g, & b values as
//   returned by hext to rgb function
// - returns a value between 0 and 1
// - #000 would return a value of 0
// - #FFF would return a value of 1
// - all other colors would be somewhere
//   inbetween
// - values below .6 should be overlaid with
//   white text
// - values above .6, overlaid with black
PolyColor.prototype.hexBright = function( rgbObj ){
	// calculate & return weighted average
	return (( rgbObj.r*0.299 + rgbObj.g*0.587 + rgbObj.b*0.114 ) / 256 > 0.6);
}
//-----------------------------------------------
// - algorithm to convert hex to rgb
// - @hex -> hexidecimal as string
// - returns object with r, g, & b values
PolyColor.prototype.hexToRgb = function(hex) {
	// convert to array of hex vals
	this.t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
	// return the results as an object
    return this.t ? {
        r: parseInt(this.t[1], 16),
        g: parseInt(this.t[2], 16),
        b: parseInt(this.t[3], 16)
    } : null;
}

//-----------------------------------------------
// - keyup event change background color hex text
// - make sure that first character is always a
//   hashtag
// - if legit hex value, display color
PolyColor.prototype.hexText = function(){
	
	// if the first character is not a #
	if(this.value.charAt(0) != "#")
		// put the hashtag in front of the text
		this.value = "#" + this.value;

	// remove any input that is not 0-9, A-F
	this.value = "#" + this.value.substr(1,6).replace(/[^0-9a-f]+/gi, '');

	// if the input is now the proper length & format
	if(this.value.length == 7){

		// set the color elements
		editPoly.polyColor.setElems(this.value);
	}
}

//-----------------------------------------------
// - HTML5 color pick change event
PolyColor.prototype.colorPick = function(){

	editPoly.polyColor.setElems(this.value);
}

//-----------------------------------------------
// - user clicks one of the color wheel colors
// - set text
// - set color icon
// - set html5 color picker
// - set background
PolyColor.prototype.wheelBtn = function(){

	editPoly.polyColor.setElems(this.dataset.hex);
}

//-----------------------------------------------
// - set color elements of control panel
PolyColor.prototype.setElems = function(hex){

	// set the text input
	this.htxt[this.ep.bf].value = 

	// set the color picker input
	this.pikr.value = 

	// set the icon background color
	this.ep.btns[this.ep.bf].style.backgroundColor = hex;

	// set the icon color
	this.ep.btns[this.ep.bf].style.color = this.hexBright( this.hexToRgb( hex ) ) ? '#444' : '#FFF';

	// set the polygon property
	this.ep.a.setOptions(
		( this.ep.bf == 1	? 
		  {fillColor : hex}  : 
		  {strokeColor : hex}
		)
	);
}

































//-----------------------------------------------
//			   PolyOpacity (polygon opacity)
//			 ------------------------
//
// - opacity input
//
// - oapcity slider
//
// - ep --> EditPoly object
//
//-----------------------------------------------

var PolyOpacity = function(ep){

	// edit polygon object
	this.ep = ep;

	// get the opacity slider
	this.sldr = poly.querySelectorAll('input[type="range"]')[0];

	// get the opacity text inputs
	this.otxt = poly.getElementsByClassName('opacity-text');

	// set the events
	this.sldr.addEventListener('change', this.oSlide);
	this.otxt[0].addEventListener('keyup', this.tSlide);
	this.otxt[1].addEventListener('keyup', this.tSlide);
}

//-----------------------------------------------
// - change opacity slider change event
PolyOpacity.prototype.oSlide = function(){ 

	// set the text input
	editPoly.polyOpacity.setOpactiy(this.value);
}

//-----------------------------------------------
// - keyup opacity text input
PolyOpacity.prototype.oText = function(){ 

	// if there is no input, return 
	if( !this.value) return;

	// remove anything that doesnt conform to [0,1] range
	this.value = this.value.replace(/[^(0(\.\d+)?|1(\.0+)?)$]/, '');

	// set the value
	editPoly.polyOpacity.setOpactiy(this.value);
}

//-----------------------------------------------
// - set the text and slider values
// - set the properties of the polygon
PolyOpacity.prototype.setOpactiy = function(o){

	// set the slider
	this.sldr.value = 

	// set the text input
	this.otxt[this.ep.bf].value = o;

	// set the properties of the polygon
	this.ep.a.setOptions((this.ep.bf == 0 ? {strokeOpacity:o} : {fillOpacity:o} ));
}






































//-----------------------------------------------
//				embed preview mode
//			  ----------------------
//
// - set bounds to fit polygon
//
// - reveal html version of info window
//
//-----------------------------------------------

var EmbedView = function(){

	// google maps Bounds object
	this.bounds = null;
}

EmbedView.prototype.init = function(){

	// if there are no info windows
	if(!Object.keys(iWin.h).length){  

		mapTools.children[2].click(); 

		return;
	}

	// set the bounds of the map
	this.setBounds();

	// loop through the windows
	for(var x in iWin.h){

		// close all open windows
		iWin.h[x].close();

		// hide the editable fields
		iWin.h[x].getContent().children[0].style.display = 'none';

		// show the view-only content
		iWin.h[x].getContent().children[1].style.display = 'block';
	}

	// display the close button element
	prev.style.display = 'block';
	setTimeout(this.fadeIn, 20);
}

//-----------------------------------------------
// - helper function for init
// - set the bounds object
EmbedView.prototype.setBounds = function(){

	// create a new google maps bounds object
	this.bounds = new google.maps.LatLngBounds();

	// loop through the pins
	for(var x in dropPin.h)

		// add them to the bounds
		this.bounds.extend(dropPin.h[x].position);

	// loop through the polygons
	for(var x in editPoly.h)

		// loop though the latlng objects
		for(var i = 0; i < editPoly.h[x].coords; i++)

			// add them to the bounds
			this.bounds.extend(this.editPoly.h[x].coords[i]);

	// set the bounds of the map
	gm.fitBounds(this.bounds);
}

EmbedView.prototype.fadeIn = function(){
	prev.children[0].style.opacity = '1';
}

EmbedView.prototype.term = function(){

	// loop through the windows
	for(var x in iWin.h){

		// hide the preview html
		iWin.h[x].getContent().children[1].style.display = 'none';

		// show the editable inputs & buttons
		iWin.h[x].getContent().children[0].style.display = 'block';
	}

	// hide the close button element
	prev.style.display = 'none';
	prev.children[0].style.opacity = '0';

	// make sure the button is deactivated
	mapTools.children[2].className = 'btn';
}





































//-----------------------------------------------
//				embed code class
//           ---------------------
//
//
//-----------------------------------------------

var EmbedCode = function(){

	// keep track of text area
	this.codeArea = cPanels.children[4].children[3].children[0];

	// temp variables
	this.t = 
	this.u = 
	this.v = 
	this.w = 
	this.x =
	this.y = null;

	// apply copy event to the copy button
	// this.codeArea.parentElement.children[1].children[0]
	// 	.addEventListener('click', this.copy);

}

EmbedCode.prototype.init = function(){

	// start the code
	this.codeArea.innerHTML = "<div id='map-canvas'></div><script>\n"+

	// add the data
	"var pinLits = '" + this.pinCode() + "';\n"+
	"var polyLits = '" + this.polyCode() + "';\n"+
	"var winLits = '" + this.iWinCode() + "';\n"+

	// add the remainder of the code
	document.getElementById('embed-code').innerHTML + 

	// add the script tags
	"<script>\n"+
	'<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&amp;key=YOUR_API_KEY_HERE&amp;libraries=places,drawing&amp;callback=init"></script>';
}

EmbedCode.prototype.term = function(){
	// make sure the button is deactivated
	mapTools.children[3].className = 'btn';
}

//-----------------------------------------------
// - generate codes to create pins
EmbedCode.prototype.pinCode = function(){

	// clear the temp variable
	this.u = [];

	// loop through all the pins
	for(var x in dropPin.h){

		// concat to string
		this.u.push({
			position: {lat: dropPin.h[x].position.lat(), lng: dropPin.h[x].position.lng()},
			icon : dropPin.h[x].icon,
			i : dropPin.h[x].i
		})
	}

	// return the string
	return JSON.stringify(this.u);
}

//-----------------------------------------------
// - generate codes to create pins
EmbedCode.prototype.polyCode = function(){

	// clear the temp variable
	this.v = [];

	// loop through all the polygons
	for(var x in editPoly.h){

		this.v.push({
			coords 			: this.getCoords(editPoly.h[x].coords),
			centroid		: {lat:editPoly.h[x].bounds.getCenter().lat(),lng:editPoly.h[x].bounds.getCenter().lng()},
			i 				: editPoly.h[x].i,
			fillColor 		: editPoly.h[x].fillColor,
			fillOpacity 	: editPoly.h[x].fillOpacity,
			strokeColor 	: editPoly.h[x].strokeColor,
			strokeOpacity	: editPoly.h[x].strokeOpacity
		});

	}

	// return the string
	return JSON.stringify(this.v);
}

//-----------------------------------------------
// - generate the array of polygon coords by
//   converting the google maps LatLng class 
//   objects to object literals
// - c --> array of google maps LatLng objects
EmbedCode.prototype.getCoords = function(c){

	// loop through the coords
	for(var i = 0; i < c.length; i++)

		// push the object literals onto the array
		c[i] = {lat:c[i].lat(),lng:c[i].lng()};

	// return the array of object literals
	return c;
}

//-----------------------------------------------
// - generate codes to attach info windows
EmbedCode.prototype.iWinCode = function(){

	// clear the temp variable
	this.w = {};

	// loop through all the info windows
	for(var x in iWin.h){

		// get the content of the window
		this.y = iWin.h[x].getContent().children[1];

		// if the window is active & has content
		if(iWin.h[x].active && (this.y.children[0].innerHTML || this.y.children[1].innerHTML)){

			// add the object literal to the hash map
			this.w[x] = {
				content : '<div><h4>'+this.y.children[0].innerHTML+'</h4><p>'+this.y.children[1].innerHTML+'</p></div>',
				position: iWin.h[x].position
			};
		}
	}

	// return the string
	return JSON.stringify(this.w);
}

//-----------------------------------------------
// - click button for quick copypasta
EmbedCode.prototype.copy = function(){

}







































//-----------------------------------------------
//					ResumeMap
//				  -------------
//
// - track of user scroll, toggle map background
//
// - keep array of exotic google maps places
//
// - shrink the resume card for full map function
//
//-----------------------------------------------

var ResumeMap = function(){

	// exotic google maps street views
	this.streets = [

		// machu picchu
		{
			position : {lat:-13.16256499761987, lng:-72.54534585073043},
			pov : {heading: -173.63649013599152, pitch: -19.03834385796491, zoom: 1},
			color : 'orange'
		}

	];

	// google maps street view object
	this.panorama = new google.maps.StreetViewPanorama(
						 document.getElementById('map-canvas'), 
						 {visible:false}
						);

	// timer to limit callback function
	this.timer = 

	// temp variable
	this.t = null;

	// - keep track of current view
	// - map = 0, street = 1
	this.view = 0;

	// get the page content element
	this.page = document.getElementById('page-content');

	// get the card element
	this.card = document.getElementById('my-resume');

	// card banner stripes
	this.stripes = this.card.children[1].children[0].children[0].children[0].children;

	// scroll event listener
	window.addEventListener('scroll', this.scrollCheck);
}

//-----------------------------------------------
// - event listener for scroll, toggle map
ResumeMap.prototype.scrollCheck = function(e){ 

	// if the timer is running
	if(resMap.timer)
		// clear the timer
		clearTimeout(resMap.timer);
	
	// reset the timer
	resMap.timer = setTimeout(resMap.togMap, 100);
}

//-----------------------------------------------
// - determine if resume element is visibe
// - call functions accordingly
ResumeMap.prototype.togMap = function(){ 

	// if the resume elem is visible, set street view
	if(resMap.card.offsetTop + resMap.page.offsetTop < window.pageYOffset + window.innerHeight)
		// maybe set street view
		resMap.streetView();
	else
		// maybe set map view
		resMap.mapView();
}

//-----------------------------------------------
// - set street view if not already set
ResumeMap.prototype.streetView = function(){

	// if already at top of page or currently in street view
	if(!window.pageYOffset || this.view) return; // do nothing

	// generate random number
	this.t = 0;

	// set the street view position
	this.panorama.setPosition(this.streets[this.t].position);

	// set the pov
	this.panorama.setPov(this.streets[this.t].pov);

	// set the stripes background color to compliment google map
	for(var i = 0; i < this.stripes.length; i++)
		this.stripes[i].style.backgroundColor = this.streets[this.t].color;

	// display the street view
	this.panorama.setVisible(true);

	// set the view
	this.view = 1;	
}

//-----------------------------------------------
// - set the map view if not already set
ResumeMap.prototype.mapView = function(){

	// if background is already map view, do nothing 
	if(!this.view) return;

	console.log('set map view');

	// hide the panorama
	this.panorama.setVisible(false);

	// set the view property
	this.view = 0;

}

//-----------------------------------------------
// - toggle resume section to reveal google map
ResumeMap.prototype.togResume = function(){ return false;

}

































//-----------------------------------------------
//					  EmailMe
//					-----------
//
// - ensure that the use provided a legit email
//   address
//
// - keep a count of the number of characters
//
// - submit the form asynchronously
//
// - output success message
//
//-----------------------------------------------

var EmailMe = function(){

	// reuse the ajax object
	this.xhr = null;

}

//-----------------------------------------------
// - focus & blur, validate the email address
EmailMe.prototype.validEmail = function(e){

	// if this is a focus event
	if(e.type == 'focus') return false;

		// hide the alert
}

//-----------------------------------------------
// - blur/focus display the character count
EmailMe.prototype.togCount = function(){

}

//-----------------------------------------------
// - keyup, keep a counter of the number of
//   characters in the email
// - limit the email to 500 characters
EmailMe.prototype.limitChars = function(){

}

//-----------------------------------------------
// - click submit button
// - ensure that email is valid before sending
// - ensure that character count within limit
EmailMe.prototype.submit = function(){

}

//-----------------------------------------------
// - ajax callback function, alert success
EmailMe.prototype.callback = function(){

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

	// set the position of the page-content, navbar, and lead
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

	// temp variable, get the tooltips
	this.t = document.querySelectorAll('[data-tooltip]');
	this.t[0].addEventListener('touchstart', this.togTip);
	this.t[1].addEventListener('touchstart', this.togTip);

}

//-----------------------------------------------
// - handle page resize event
L.prototype.resize = function(){

	// set the position of the page content
	document.getElementById('page-content').style.top = window.innerHeight + 'px';

	// set the position of the navbar
	document.getElementById('page-content').children[0].style.top = - window.innerHeight + 'px';

	// if the lead still exist
	if(document.getElementById('lead')){
		// set the position of the lead, based on the height of the window
		lead.style.top =  
		logo.style.top = - (window.innerHeight/2) - 200  + 'px';
	}else{
		// translate the logo
		logo.style.top = -window.innerHeight - 5 + 'px';
	}
}

//-----------------------------------------------
// - destroy the lead element
L.prototype.buryLead = function(){
	// set the logo back into position
	logo.className = 'navbar-brand';
	logo.style.top = -window.innerHeight - 5 + 'px';
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
// - mouseover/mouseout, toggle the tooltip
L.prototype.togTip = function(e){ e.preventDefault();
	this.parentElement.children[0].style.display = (this.parentElement.children[0].offsetParent) ? 'none' : 'block';
}


























//-----------------------------------------------
//
// 					initialize 
//
//-----------------------------------------------

// init the map methods object
mm = new MM();

// init map builder
mapBuilder = new MapBuilder();

document.addEventListener("DOMContentLoaded", function(){

	// init the page object
	rApp = new R();

	// init the info window object
	iWin = new IWin();

	// set the layout
	layout = new L();

}, false);