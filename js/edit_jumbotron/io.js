
//-----------------------------------------------
//				 IO (image overlay)				
//			   ----------------------
//
// - manage image overlay toolbar
//
//-----------------------------------------------

var IO = function(){

	// indexer for hashmap
	this.i = 0;

	// hashmap of all image overlays
	this.h = {};

	// active image overlay
	this.a = null;

	// toggle rrr button
	this.rBtn = imgsToolbar.children[0].children[2];

	// init the upload image object
	this.ui = new UI(this);

	// init the c object
	this.c = new IOC();

	// add event listener to the new textbox component btn
	this.compBtn = jumboToolbar.children[0].children[1].children[2];
	this.compBtn.addEventListener('click', this.newElem, false);

	// delete textbox prompt modal
	tbsToolbar.children[1].children[0]
		.addEventListener('click', this.confirmDel, false);
}

//-----------------------------------------------
// - destroy image overlay mode and hide toolbar
IO.prototype.close = function(){

	// re-add the newTB event listener
	this.compBtn.addEventListener('click', this.newImg, false);

	// if there is no active image overlay, return
	if(!this.a) return;

	// remove the active class
	this.a.className = 'image-overlay';

	// show the .toggle-edit elem
	this.a.children[0].style.display = 'block';

	// make sure the drag buttons are hidden
	this.a.children[1].style.display = 'none';

	// nullify the active image overlay
	this.a = null;
}

//-----------------------------------------------
// - create new image overlay element when user 
//   clicks the jumbo toolbar button
IO.prototype.newElem = function(e){ e.preventDefault();

	// deactive the properties toolbar buttons
	imgs.c.dAct();

	// create the new image uploader overlay elem
	imgs.createElem();
}

//-----------------------------------------------
// - helper function for newElem
// - create the new element
// - create the css rules for the new element
IO.prototype.createElem = function(){

	// increment the indexer
	this.i++;

	// create a new textbox elem, store it in the hashmap
	this.h[this.i] = document.createElement('div');

	// set it to active
	this.a = this.h[this.i];

	// give the element an index key
	this.a.setAttribute('data-key', this.i);

	// apply the textbox class
	this.a.className = 'image-overlay active empty';

	// set the transform style
	this.a.style.transform = 'matrix(1, 0, 0, 1, 0, 0)';

	// add the 3 children
	this.a.innerHTML =  '<div class="toggle-edit" style="display:none;">'+
					   		'<button type="button" class="btn btn-default">'+
								'<span class="glyphicon glyphicon-pencil"></span>'+
							'</button>'+
					    '</div>'+ 
					    document.getElementById('drag-btns-html').value+
					    '<div class="background"></div>'+
					    '<div>'+
	                        '<div class="upload-oldfash">'+
	                            '<label>Files to upload:</label>'+
	                            '<input type="file" name="fileselect[]" multiple="multiple" />'+
	                        '</div>'+
	                        '<div class="icon-image"></div>'+
	                        '<div class="text"><span>-or-</span><br>Drag &amp; Drop</div>'+
	                    '</div>';

	// append the new textbox to the drag canvas
	dragCanvas.appendChild(imgs.a);

	// apply the event listeners
	this.ae();

	// insert new style sheet rules
	rm.newRules(this.a, this.updateVals);
}

//-----------------------------------------------
// - add event listeners to new image overlay btn
IO.prototype.ae = function(){

	// add event listeners to the uploader
	this.ui.ae();

	// remove newElem event listener
	this.compBtn.removeEventListener('click', this.newElem, false);

	// toggle editor
	this.a.children[0].addEventListener('click', cm.tog, false);

	// set visibility checkboxes
	this.c.v[0].checked = 
	this.c.v[1].checked = 
	this.c.v[2].checked = true;
}

//-----------------------------------------------
// - update the nVals new values obejcts
// - zi --> z-index assigned by the rrr object
IO.prototype.updateVals = function(zi){

	// add the new image overlay to the nVals
	jApp.nVals.imgs[this.i] = {
		src : '',
		color : 'transparent',
		opacity : 1,
		blur: 0,
		z : zi,
		round : 0,
		borderwidth: 0,
		bordercolor: '#FFFFFF',
		shadow : {active : 1, color : '#676767', softness : 4, spread : 4, x : 0, y : 0, inset : 0},
		layout : {
			mobile  : { w : 80, h : 27, x : 48, y : 44, s : 1, a : 0, v : 1 },
			tablet  : { w : 80, h : 27, x : 48, y : 44, s : 1, a : 0, v : 1 },
			desktop : { w : 80, h : 27, x : 48, y : 44, s : 1, a : 0, v : 1 }
		}
	};
}    

//-----------------------------------------------
// - confirm delete active image overlay
IO.prototype.confirmDel = function(){

	// if the user has not uploaded an image
	if(imgs.a.children[2].tagName !== 'IMG'){
		// delete the element, do not prompt modal
		imgs.del(); return;
	}

	// set the modal title
	confModal.getElementsByTagName("h4")[0]
		.innerHTML = '<div class="icon-images"></div> Delete image overlay';

	// set the modal body
	confModal.children[0].children[0].children[1]
   		.innerHTML = '<p>Are you sure you want to delete this image?</p>';

   	// copy the image
   	confModal.children[0].children[0].children[1]
   		.appendChild(imgs.copy());

   	// size it
   	confModal.children[0].children[0].children[1].children[1]
   		.style.maxWidth = '200px';

   	// set the modal callback
   	jApp.modal.callback = imgs.del;

   	// launch the modal
   	jApp.modal.launch();
}

//-----------------------------------------------
// - make a copy of the image
IO.prototype.copy = function(){

	// create an empty div
	this.t = document.createElement('div');

	// give it a class
	this.t.className = 'm-container';

	// insert the image
	this.t.appendChild(this.a.cloneNode());

	return this.t;
}

//-----------------------------------------------
// - delete image overlay
IO.prototype.del = function(){ 

	// gut the innards of the active image overlay
	imgs.a.innerHTML = '';

	// remove it from the nVals
	jApp.nVals.imgs[imgs.a.dataset.key] = null;
	delete jApp.nVals.imgs[imgs.a.dataset.key];

	// hide it, but do not delete to maintain order
	imgs.a.style.display = 'none';

	// prompt save
	jApp.deltaVals();

	// remove the active textbox
	imgs.a = null;

	// hide the textbox properties toolbar
	jumboToolbar.children[0].children[1].children[2].click();

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

var UI = function(io){

	// reference to the io object
	this.io = io;

	// ajax object
	this.xhr = 

	// file for upload
	this.file = 

	// temp variable
	this.t = null;

}

/* METHODS */

//-----------------------------------------------
// - file hover, dragover file to drop 
UI.prototype.fh = function(e){
	e.stopPropagation();
	e.preventDefault();
	e.currentTarget.className = (e.type == "dragover" ? "image-overlay active empty dragover" : "image-overlay active empty");
}

//-----------------------------------------------
// - file selection event listener
UI.prototype.fs = function(e) {

	// cancel event and hover styling
	imgs.ui.fh(e);

	// fetch FileList object
	imgs.ui.file = e.target.files || e.dataTransfer.files;// process all File objects
	imgs.ui.file = imgs.ui.file[0];

	// upload the file
	imgs.ui.uploadFile();
}

//-----------------------------------------------
// - upload image
UI.prototype.uploadFile = function(){

	// append a loading gif spinner
	this.l();

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
	  	this.xhr.onreadystatechange = imgs.ui.uploadCB;

		// ajax
		this.xhr.open("POST", document.URL, true);
		this.xhr.setRequestHeader("X-file-name", this.file.name);
		this.xhr.send(this.file);
	}
}

//-----------------------------------------------
// - append a loading gif spinner to indicate 
//   that the file is being uploaded
UI.prototype.l = function(){
	this.t = document.createElement('div');
	this.t.className = 'uploading';
	this.t.innerHTML = '<span class="glyphicon glyphicon-refresh loading"></span>';
	this.io.a.children[3].appendChild(this.t);
}

//-----------------------------------------------
// - img file upload callback 
UI.prototype.uploadCB = function(){
	
	if (this.readyState != 4) return; console.log(this.responseText);

	// parse the json
	jApp.temp = JSON.parse(this.responseText);

	// remoe the .empty class
	imgs.a.className = 'image-overlay active';

	// remove the last child of the active image overlay
	imgs.a.removeChild(imgs.a.children[3]);

	// append a new img tag
	imgs.a.appendChild(
		document.createElement('img')
	);

	// set the nVals
	jApp.nVals.imgs[imgs.a.dataset.key].src = 

	// set the img src
	imgs.a.children[3].src = jApp.temp["image"];

	// remove the draghover, dragleave events
	imgs.a.removeEventListener('dragover', imgs.ui.fh, false);
	imgs.a.removeEventListener("dragleave", imgs.ui.fh, false);
	imgs.a.removeEventListener("drop", imgs.ui.fs, false);

	// activate the image overlay property toolbars
	imgs.c.act();

	// prompt save
	jApp.deltaVals();
}

//-----------------------------------------------
// - apply image uploader events to newly created
//   image overlay element
UI.prototype.ae = function(){

	// apply file dragover event
	imgs.a.addEventListener("dragover", this.fh, false);

	// apply file dragleave event
	imgs.a.addEventListener("dragleave", this.fh, false);

	// apply file drop event
	imgs.a.addEventListener("drop", this.fs, false);

	// apply traditional upload fileselect event
	imgs.a.children[3].children[0].children[1]
		.addEventListener("change", this.fs, false);
}































//-----------------------------------------------
//			IOC (image overlay component)				
//		  ---------------------------------
//
// - track image overlay components for easy
//   access
//
//-----------------------------------------------

var IOC = function(){

	// get the text inputs
	this.texti = imgsCpanels.querySelectorAll('input.colorize[type="text"]');

	// get the HTML5 color picker inputs
	this.picki = imgsCpanels.querySelectorAll('input.colorize[type="color"]');

	// get the icons
	this.icon = imgsCpanels.querySelectorAll('button.colorize[type="button"]');

	// get the trasparency checkboxes
	this.checki = imgsCpanels.querySelectorAll('input.colorize[type="checkbox"]');

	// opacity, blur, border roundness, border thickness
	this.s = {
		opacity : imgsCpanels.querySelectorAll('opacity-form input'),
		blur : imgsCpanels.querySelectorAll('blur-form input'),
		round : imgsCpanels.querySelectorAll('roundness-form input'),
		borderwidth : imgsCpanels.querySelectorAll('thickness-form input'),
	}

	// visibility checkboxes
	this.v = imgsCpanels.querySelectorAll('.vis input');
}

//-----------------------------------------------
// - activate image overly property toolbar btns
IOC.prototype.act = function(){ 

	// get the toolbar btns
	this.v = imgsToolbar.children[0].children;
	
	// set the inactive class
	this.v[0].className = 'btn btn-default';
	this.v[1].className = 'btn btn-default';
	this.v[2].className = 'btn btn-default';
	this.v[3].className = 'btn btn-default';
	this.v[4].className = 'btn btn-default';
	this.v[5].className = 'btn btn-default';

	imgsToolbar.children[0].children[6].style.display = 'none';

}

//-----------------------------------------------
// - deactivate toolbar btns
IOC.prototype.dAct = function(){

	// get the toolbar btns
	this.v = imgsToolbar.children[0].children;
	
	// set the inactive class
	this.v[0].className = 'btn btn-default inactive';
	this.v[1].className = 'btn btn-default inactive';
	this.v[2].className = 'btn btn-default inactive';
	this.v[3].className = 'btn btn-default inactive';
	this.v[4].className = 'btn btn-default inactive';
	this.v[5].className = 'btn btn-default inactive';

	imgsToolbar.children[0].children[5].style.display = 'block';
}































