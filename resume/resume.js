var rApp, 	// resume app
	gm,   	// google map object
	mm,		// map methods object
	mapBuilder,		// map builder root node
	as,		// active state
	iWin,		// info window manager
	dropPin,		// pin mode
	ui,		// upload image
	drawPoly,		// new polygon
	editPoly,
	layout	// sets position of #pageContent 
	= null;






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
	dropPin = mapBuilder.dropPin = new DropPin();

	// init the polygon objects
	drawPoly = mapBuilder.drawPoly = new DrawPoly();
	editPoly = mapBuilder.editPoly = new EditPoly();
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

	// - keep track of the active editor state
	// - values include:
	//	  + dropPin (pin mode)
	//	  + drawPoly (new polygon mode)
	//	  + editPoly (edit polygon mode)

	// keep track of the pin mode object
	this.dropPin = 
	// keep track of the polygon mode objects
	this.drawPoly = 
	this.editPoly = null;

	// loop through the toolbar buttons
	this.p = mapTools.children;
	for(var i = 0; i < this.p.length; i++){

		// toggle the cooresponding control panel
		this.p[i].addEventListener('click', this.togPan);

		// init and/or terminate the active state
		this.p[i].addEventListener('click', this.IorT);
	}

	// get the control panel buttons
	this.p = cPanels.getElementsByClassName('close');
	// set the toggle event listener
	this.p[0].addEventListener('click', this.shrink);
	this.p[1].addEventListener('click', this.shrink);
	this.p[2].addEventListener('click', this.shrink);

	// keep track of active control panel
	this.panel = -1;
}

//-----------------------------------------------
// - toggle display of the corresponding control
//   panel
MapBuilder.prototype.togPan = function(){ 

	// if there is an open/active control panel
	if(mapBuilder.panel >= 0)
		// close it
		cPanels.children[mapBuilder.panel].style.display = 'none';

	// if this panel was already open
	if(!this.dataset.panel || this.dataset.panel == mapBuilder.panel){
		// reset active panel index
		mapBuilder.panel = -1;
		// do nothing
		return;
	}

	// display the proper control panel
	cPanels.children[this.dataset.panel].style.display = 'block';
	// set the new panel index
	mapBuilder.panel = this.dataset.panel;
}

//-----------------------------------------------
// - shrink or expand popover content
MapBuilder.prototype.shrink = function(){
	
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
	this.u.innerHTML = '<div class="window-text">'+
						   '<div></div>'+
						   '<input type="text" class="form-control" placeholder="Title" aria-describedby="include info window for this pin" />'+
						   '<textarea placeholder="description"></textarea>'+
					   '</div>'+
					   '<div class="window-buttons">'+
						   '<button class="btn btn-danger" data-i="'+this.t.i+'" '+ // hashmap key & object type
						   								  'data-obj="'+(this.t.hasOwnProperty('icon') ? 'dropPin' : 'editPolygon')+'" >'+
						   		'<span class="icon-bin"></span>'+
						   '</button>'+
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
IWin.prototype.initIW = function(){
	
	// create the infoWindow object
	this.v = new google.maps.InfoWindow({
			    content: this.u
			 });

	// set the info window id
	this.v.set('i', this.t.i);

	// push it onto the array
	this.h[this.t.i] = this.v;					   

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
IWin.prototype.openIW = function(){
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
	// show the veil
	}else{
		iWin.t.style.zIndex = 
		iWin.t.style.opacity = '1';
		this.parentElement.children[1].className = 'icon-eye-blocked';
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
	gm.addListener('click', this.draw);

	// user clicks last node to complete polygon
	this.polyline.addListener('click', this.lineComplete);
}

//-----------------------------------------------
// - terminate new polygon mode
DrawPoly.prototype.term = function(){

	// if there is a polyline
	if(this.coords.length){

		// cue confirmation modal

		return;
	}

	// remove the draw event
	gm.removeListener('click', this.draw)

	// delete the polyline
	this.polyline.setMap(null);
	this.polyline = null;

}

//-----------------------------------------------	
// - click map, add a coordinate to new polygon
DrawPoly.prototype.draw = function(e){ console.log(e.latLng);

	// push the latLng object onto the coords array
	drawPoly.coords.push(e.latLng);

	// clear redo branch of coordinates
	drawPoly.coordsUndone = [];

	// call the draw function to make shit faster
	drawPoly.updatePolyline();
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

	// terminate draw polygon mode
	drawPoly.term();

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
	this.polyOpacity = new PolyOpacity();
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

	// push it onto the hashmap of polygons
	this.h[mapBuilder.i] = this.a;

	// put that bad boy on the map
	this.a.setMap(gm);	

	// add event listeners and init InfoWindow
	this.setPolyEvents();
}

//-----------------------------------------------
// - set polygon events
EditPoly.prototype.setPolyEvents = function(){ return false;

	// create a new info window

	// push it to the hashmap

	// apply the click event

	// init polygon editor mode
}

//-----------------------------------------------
// - toggle active fill/border 
// - the target of the color buttons, color 
//   input, & opacity slider
EditPoly.prototype.togFill = function(){

	// set the active property

	// give the button an active class

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

var PolyColor = function(editPoly){

	// get the fill/border buttons
	this.btns = poly.querySelectorAll('table button');

	// get the hex text inputs
	this.htxt = poly.getElementsByClassName('hex-text');

	// get the color picker input
	this.pikr = poly.querySelectorAll('input[type="color"]')[0];

	// toggle fill/border
	this.btns[0].addEventListener('click', editPoly.togFill);
	this.btns[1].addEventListener('click', editPoly.togFill);

	// apply hextext events
	this.htxt[0].addEventListener('keyup', this.hexText);
	this.htxt[1].addEventListener('keyup', this.hexText);

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

		// set the embed properties
	}
}

//-----------------------------------------------
// - HTML5 color pick change event
PolyColor.prototype.colorPick = function(){ return false;

	// set the color elements

	// set the embed property
}

//-----------------------------------------------
// - user clicks one of the color wheel colors
// - set text
// - set color icon
// - set html5 color picker
// - set background
PolyColor.prototype.wheelBtn = function(){ return false;

	// tc.setElems(this.ddataset.hex, this.parentElement.parentElement.dataset.i);

	// set the property
}

//-----------------------------------------------
// - set color elements of control panel
// - i => index of elements in array
PolyColor.prototype.setElems = function(hex, i){

	// set the text input
	jApp[as].c.texti[i].value = 

	// set the color picker input
	jApp[as].c.picki[i].value = 

	// set the icon background color
	jApp[as].c.icon[i].style.backgroundColor = hex;

	// set the icon color
	jApp[as].c.icon[i].style.color = this.hexBright( this.hexToRgb( hex ) );

	// uncheck the transparency checkbox
	jApp[as].c.checki[i].checked = false;
	jApp[as].c.checki[i].parentElement.style.opacity = '0.5';
}

































//-----------------------------------------------
//			   PolyOpacity (polygon opacity)
//			 ------------------------
//
// - opacity input
//
// - oapcity slider
//
//-----------------------------------------------

var PolyOpacity = function(){

	// get the opacity slider
	this.sldr = poly.querySelectorAll('input[type="range"]')[0];

	// get the opacity text inputs
	this.otxt = poly.getElementsByClassName('opacity-text');

}

//-----------------------------------------------
// - change opacity slider change event
PolyOpacity.prototype.oSlide = function(){ return false;

}

//-----------------------------------------------
// - keyup opacity text input
PolyOpacity.prototype.oText = function(){ return false;

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
mapBuilder = new MapBuilder();

document.addEventListener("DOMContentLoaded", function(){

	// init the page object
	rApp = new R();

	// init the info window object
	iWin = new IWin();

	// set the layout
	layout = new L();

}, false);