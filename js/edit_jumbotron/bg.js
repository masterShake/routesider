//---------------------------------------------------
//
//			 BG - edit background image
//		   ------------------------------
//
// - keep track of open/active control panels
//
// - toggle background options title and control
//   panels
//
//---------------------------------------------------

/* CONSTRUCTOR */

BG = function(){ 

	/* properties */

	// init background image editor
	this.bgi = new BGI();
	// init cropper
	// this.cropper = new CR();
	// init background color editor
	this.c = new BGC();

	// active element (never changes, for consistency with other components)
	this.a = bgElem;

	// temp variable
	this.t = null;

	// get the toggle resize, reposition, rototate button
	this.rBtn = bgToolbar.children[1].children[1];

	/* initializations */

	// init the rrr object
	rm.h[0] = new rr(bgElem);

	// confirm delete background image event
	bgToolbar.children[0].children[0]
		.addEventListener("click", this.confirmDel, false);

	// hide the dragables canvas on open
	jumboToolbar.children[0].children[1].children[0]
		.addEventListener('click', this.hideDrag, false);
}

//-----------------------------------------------
// - hide the bgCanvas
// - deactivate crop mode
// - show the dragCanvas
BG.prototype.close = function(){
	// hide the upload background image canvas
	bgCanvas.style.display = 'none';
	// hide the bg image drag buttons
	bgElem.children[1].style.display = 'none';
	// show the dragable elements canvas
	dragCanvas.style.display = 'block';
	// hide the dragables canvas on open
	jumboToolbar.children[0].children[1].children[0]
		.addEventListener('click', this.hideDrag, false);
}

//-----------------------------------------------
// - hide the drag canvas when editing background
BG.prototype.hideDrag = function(){
	dragCanvas.style.display = 'none';
	this.removeEventListener('click', bg.hideDrag, false);
}

//-----------------------------------------------
// - show modal
// - set inner HTML
// - set modal callback
BG.prototype.confirmDel = function(){

	// if there is no background image
	if(!jApp.nVals.bg[0].image)
		return;

	// set the modal title
	confModal.getElementsByTagName("h4")[0]
		.innerHTML = '<div class="dash-box" aria-hidden="true" style="font-size:18px;padding: 3px 4px;height:25px;margin-right:10px;">'+
        			 '	<span class="icon-image" aria-hidden="true"></span>'+
    				 '</div> Delete background image';

   	// set modal body
   	confModal.children[0].children[0].children[1]
   		.innerHTML = '<p>Are you sure you want to delete this background image?</p>'+
   					 '<div style="text-align:center">'+
   					 '	<img src="'+
   					 (jApp.nVals.bg[0].image.substr(0,6) == 'upload' ? jApp.nVals.bg[0].image : 'img/business/'+jApp.nVals.bg[0].image)+
   					 '" style="height:auto;width:auto;max-height:160px;max-width:100%" />'+
   					 '</div>';

   	// set modal callback
   	jApp.modal.callback = bg.del;

   	// launch the modal
   	jApp.modal.launch();
}

//-----------------------------------------------
// - remove the background image
// - prompt the user to save
BG.prototype.del = function(){

	// reset all background properties
	bg.resetProps();

	// reset background styles in style sheet
	bg.resetStyles();

	// remove the background image
	bgElem.removeChild(bgElem.children[2]);

	// add the default bg image placeholder
	bgElem.appendChild(document.createElement("div"));
	bgElem.children[2].className = "bg-placeholder";
	bgElem.children[2].innerHTML = '<span class="icon-image"></span>';

	// deactivate the repo/resize/crop button
	bgToolbar.children[1].children[1].className = 'btn btn-default inactive';
	bgToolbar.children[1].children[1].removeEventListener('click', jApp.togCpan, false);
}

//-----------------------------------------------
// - reset background properties
BG.prototype.resetProps = function(){

	// reset all the nVals.bg[0] properties
	jApp.nVals.bg[0].image = 
	jApp.nVals.bg[0].blur = 0;
	jApp.nVals.bg[0].ratio = 
	jApp.nVals.bg[0].opacity = 1;
	jApp.nVals.bg[0].color = '#FFFFFF';

	// reset all the layout properties
	jApp.nVals.bg[0].layout.mobile.x =
	jApp.nVals.bg[0].layout.mobile.y = 
	jApp.nVals.bg[0].layout.mobile.a = 
	jApp.nVals.bg[0].layout.tablet.x = 
	jApp.nVals.bg[0].layout.tablet.y = 
	jApp.nVals.bg[0].layout.tablet.a = 
	jApp.nVals.bg[0].layout.desktop.x = 
	jApp.nVals.bg[0].layout.desktop.y = 
	jApp.nVals.bg[0].layout.desktop.a = 0;
	jApp.nVals.bg[0].layout.mobile.s =
	jApp.nVals.bg[0].layout.tablet.s =
	jApp.nVals.bg[0].layout.desktop.s = 1;  

	// values changed
	jApp.deltaVals();

	// reset all the inputs
	this.t = bgCpanels.getElementsByTagName('input');
	this.t[0].value = 			// hex text bg color
	this.t[1].value = 
	bgCpanels.getElementsByTagName('button')[3]
		.style.backgroundColor = 	// fill button
	bgElem.parentElement.style.backgroundColor = '#FFFFFF'; 
	this.t[2].value = 			// blur
	this.t[3].value = 0;
	this.t[4].value =			// opacity
	this.t[5].value = 1;

	return true;
}

//-----------------------------------------------
// - reset the stylesheet for the bg image
BG.prototype.resetStyles = function(){

	// inline
	bgElem.children[2].style.opacity = '1';
	bgElem.children[2].style.filter = 
	bgElem.children[2].style.webkitFilter = 'blur(0px)';

	// transform 
	document.styleSheets[7].cssRules[0].style.transform = 		// mobile
	document.styleSheets[7].cssRules[rm.i + 1].cssRules[0].style.transform = // tablet
	document.styleSheets[7].cssRules[rm.i + 2].cssRules[0].style.transform = // desktop
	bgElem.style.transform = 					// inline
		'rotate3d(0,0,1,0deg) scale(1,1)';

	// left
	document.styleSheets[7].cssRules[0].style.left = 			 // mobile
	document.styleSheets[7].cssRules[rm.i + 1].cssRules[0].style.left = // tablet
	document.styleSheets[7].cssRules[rm.i + 2].cssRules[0].style.left = // desktop
	bgElem.style.left = 						 // inline
	// top
	document.styleSheets[7].cssRules[0].style.top = 			// mobile
	document.styleSheets[7].cssRules[rm.i + 1].cssRules[0].style.top = // tablet
	document.styleSheets[7].cssRules[rm.i + 2].cssRules[0].style.top = // desktop
	bgElem.style.top = 					// inline
		'0%';
}























//-----------------------------------------------
//	  		   BGI (background image)				
//			 --------------------------
//
// - fileselect upload
//
// - drag and drop upload
//
// - image opacity
//
// - image blur
//
//-----------------------------------------------

/* CONSTRUCTOR */

BGI = function(){

	/* properties */

	// ajax object for file uploads
	this.xhr = null;

	// hold original filename, also used as temp variable
	this.file = bgCanvas;

	/* initialization */

	// apply file dragover event
	this.file.addEventListener("dragover", this.fileHover, false);

	// apply file dragleave event
	this.file.addEventListener("dragleave", this.fileHover, false);

	// apply file drop event
	this.file.addEventListener("drop", this.fileSelect, false);

	// apply traditional upload fileselect event
	this.file.children[0].children[1]
		.addEventListener("change", this.fileSelect, false);
}

/* METHODS */

//-----------------------------------------------
// - file dragover method 
BGI.prototype.fileHover = function(e){
	e.stopPropagation();
	e.preventDefault();
	e.target.className = (e.type == "dragover" ? "j-canvas hover" : "j-canvas");
}

//-----------------------------------------------
// - file selection event listener
BGI.prototype.fileSelect = function(e) {

	// cancel event and hover styling
	bg.bgi.fileHover(e);

	// display gif spinner
	// bgCanvas.children[2].style.display = 'block';

	// fetch FileList object
	bg.bgi.file = e.target.files || e.dataTransfer.files;// process all File objects
	bg.bgi.file = bg.bgi.file[0];

	// upload the file
	bg.bgi.uploadFile();
}

//-----------------------------------------------
// - upload image
BGI.prototype.uploadFile = function(){

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
	  	this.xhr.onreadystatechange = bg.bgi.uploadCB;

		// ajax
		this.xhr.open("POST", document.URL, true);
		this.xhr.setRequestHeader("X-file-name", this.file.name);
		this.xhr.send(this.file);
	}
}

//-----------------------------------------------
// - img file upload callback 
BGI.prototype.uploadCB = function(){
	if (this.readyState == 4) { // console.log(this.responseText);

		// reset the background properties, avoid race conds.
		bg.t = bg.resetProps();
		bg.resetStyles();

		// parse the json
		bg.t = JSON.parse(this.responseText);

		// set the nVals.bg[0] (new values) properties
		jApp.nVals.bg[0]["image"] = bg.t["image"];
		jApp.nVals.bg[0]["ratio"] = bg.t["ratio"];

		// if there isn't already a background image
		if(!document.getElementById('bgImg')){

			// remove the placeholder
			bgElem.removeChild(bgElem.children[2]);

			// insert an image element
			bgElem.appendChild(
				document.createElement("img")
			);

			// set the id
			bgElem.children[2].id = "bgImg";

			// set the data-r property (index in rm object)
			bgElem.setAttribute('data-r', '0');

			// activate the repo/resize button
			bgToolbar.children[1].children[1].className = 'btn btn-default';
			bgToolbar.children[1].children[1].removeEventListener('click', jApp.togCpan, false);
		}

		// set the background image
		bgImg.src = bg.t["image"];

		// hide the spinner
		// bgCanvas.children[2].style.display = 'none';

		// show save prompt
		jApp.deltaVals();
	}
}








































































//-----------------------------------------------
//	  		   BGC (background color)				
//			 --------------------------
//
// - toggle popover
//
// - color wheel btn click event
//
// - hex text event
//
// - html5 color picker event handler
//
//-----------------------------------------------

/* CONSTRUCTOR */

BGC = function(){

	/* properties */

	// get the .colorize elements
	this.picki = bgCpanels.getElementsByClassName('colorize');
	// keep them in arrays for consistency with other components
	this.icon = [this.picki[0]];
	this.texti = [this.picki[1]];
	this.picki = [this.picki[2]];

	/* initializations */

	// toggle the upload background image bgCanvas
	bgToolbar.children[1].children[0]
		.addEventListener('click', this.togCanvas, false);
	bgToolbar.children[1].children[1]
		.addEventListener('click', this.hideCanvas, false);
	bgToolbar.children[1].children[2]
		.addEventListener('click', this.hideCanvas, false);
}
// -----------------------------------------------
// - toggle upload canvas
BGC.prototype.togCanvas = function(){
	// show the canvas
	bgCanvas.style.display = (bgCanvas.offsetParent === null) ? "block" : "none";
}

//-----------------------------------------------
// - hide the canvas
BGC.prototype.hideCanvas = function(){
	// hide the canvas
	bgCanvas.style.display = "none";
}





























