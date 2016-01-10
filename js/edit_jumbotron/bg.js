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
	// this.bgc = new BGC();

	// active element (never changes, for consistency with other components)
	this.a = cropCanvas.children[0];

	// temp variable
	this.t = null;

	/* initializations */

	// confirm delete background image event
	bgToolbar.children[0].children[0]
		.addEventListener("click", this.confirmDel, false);
}

//-----------------------------------------------
// - hide the bgCanvas
// - deactivate crop mode
// - show the dragCanvas
BG.prototype.close = function(){
	// hide the upload background image canvas
	bgCanvas.style.display = "none";
	// hide the bg image drag buttons
	cropCanvas.children[0].children[1].style.display = "none";
	// show the dragable elements canvas
	dragCanvas.style.display = "block";
}

//-----------------------------------------------
// - show modal
// - set inner HTML
// - set modal callback
BG.prototype.confirmDel = function(){

	// if there is no background image
	if(!jApp.nVals.bg.image)
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
   					 (jApp.nVals.bg.image.substr(0,6) == 'upload' ? jApp.nVals.bg.image : 'img/business/'+jApp.nVals.bg.image)+
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
	cropCanvas.children[0].removeChild(cropCanvas.children[0].children[2]);

	// add the default bg image placeholder
	cropCanvas.children[0].appendChild(document.createElement("div"));
	cropCanvas.children[0].children[2].className = "bg-placeholder";
	cropCanvas.children[0].children[2].innerHTML = '<span class="icon-image"></span>';

	// deactivate the repo/resize/crop button
	bgToolbar.children[1].children[1].className = 'btn btn-default inactive';
	bgToolbar.children[1].children[1].removeEventListener('click', jApp.togCpan, false);
}

//-----------------------------------------------
// - reset background properties
BG.prototype.resetProps = function(){

	// reset all the nVals.bg properties
	jApp.nVals.bg.image = 
	jApp.nVals.bg.blur = 0;
	jApp.nVals.bg.ratio = 
	jApp.nVals.bg.opacity = 1;
	jApp.nVals.bg.color = '#FFFFFF';

	// reset all the layout properties
	jApp.nVals.bg.layout.mobile.x =
	jApp.nVals.bg.layout.mobile.y = 
	jApp.nVals.bg.layout.mobile.a = 
	jApp.nVals.bg.layout.tablet.x = 
	jApp.nVals.bg.layout.tablet.y = 
	jApp.nVals.bg.layout.tablet.a = 
	jApp.nVals.bg.layout.desktop.x = 
	jApp.nVals.bg.layout.desktop.y = 
	jApp.nVals.bg.layout.desktop.a = 0;
	jApp.nVals.bg.layout.mobile.s =
	jApp.nVals.bg.layout.tablet.s =
	jApp.nVals.bg.layout.desktop.s = 1;  

	// values changed
	jApp.deltaVals();

	// reset all the inputs
	this.t = bgCpanels.getElementsByTagName('input');
	this.t[0].value = 			// hex text bg color
	this.t[1].value = 
	bgCpanels.getElementsByTagName('button')[3]
		.style.backgroundColor = 	// fill button
	cropCanvas.style.backgroundColor = '#FFFFFF'; 
	this.t[2].value = 			// blur
	this.t[3].value = 0;
	this.t[4].value =			// opacity
	this.t[5].value = 1;

	return true;
}

//-----------------------------------------------
// - reset the stylesheet for the bg image
BG.prototype.resetStyles = function(){

	// transform 
	document.styleSheets[7].cssRules[0].style.transform = 		// mobile
	document.styleSheets[7].cssRules[rm.i + 1].cssRules[0].style.transform = // tablet
	document.styleSheets[7].cssRules[rm.i + 2].cssRules[0].style.transform = // desktop
	cropCanvas.children[0].style.transform = 					// inline
		'rotate3d(0,0,1,0deg) scale(1,1)';

	// left
	document.styleSheets[7].cssRules[0].style.left = 			 // mobile
	document.styleSheets[7].cssRules[rm.i + 1].cssRules[0].style.left = // tablet
	document.styleSheets[7].cssRules[rm.i + 2].cssRules[0].style.left = // desktop
	cropCanvas.children[0].style.left = 						 // inline
	// top
	document.styleSheets[7].cssRules[0].style.top = 			// mobile
	document.styleSheets[7].cssRules[rm.i + 1].cssRules[0].style.top = // tablet
	document.styleSheets[7].cssRules[rm.i + 2].cssRules[0].style.top = // desktop
	cropCanvas.children[0].style.top = 					// inline
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

	// toggle the image upload canvas element
	bgToolbar.children[1].children[0].addEventListener("click", this.togCanvas, false); // background image button
	bgCpanels.children[0].children[0].children[0]
		.addEventListener("click", this.hideCanvas, false); // bgi control panel x
	bgToolbar.children[1].children[1].addEventListener("click", this.hideCanvas, false); // crop button
	bgToolbar.children[1].children[2].addEventListener("click", this.hideCanvas, false); // bg color button

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

// -----------------------------------------------
// - toggle upload canvas
BGI.prototype.togCanvas = function(){
	// if the bgCanvas is hidden
	if(bgCanvas.offsetParent === null){
		// show the canvas
		bgCanvas.style.display = "block";
		// hide the draggables 
		dragCanvas.style.display = "none";
	}else{
		// hide the canvas
		bgCanvas.style.display = "none";
		// show the draggables 
		dragCanvas.style.display = "block";
	}
}

//-----------------------------------------------
// - hide the canvas
BGI.prototype.hideCanvas = function(){
	// hide the canvas
	bgCanvas.style.display = "none";
}

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

		// set the nVals.bg (new values) properties
		jApp.nVals.bg["image"] = bg.t["image"];
		jApp.nVals.bg["ratio"] = bg.t["ratio"];

		// if there isn't already a background image
		if(!document.getElementById('bgImg')){

			// remove the placeholder
			cropCanvas.children[0].removeChild(cropCanvas.children[0].children[2]);

			// insert an image element
			cropCanvas.children[0].appendChild(
				document.createElement("img")
			);

			// set the id
			cropCanvas.children[0].children[2].id = "bgImg";

			// set the data-r property (index in rm object)
			cropCanvas.children[0].setAttribute('data-r', '0');

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

	// temp variable, get the control panel
	this.temp = bgCpanels.children[2];

	// color fill btn
	this.icon = this.temp.getElementsByTagName("button")[1];
	// text input
	this.texti = this.temp.getElementsByTagName("input")[0];
	// HTML5 color picker
	this.picki = this.temp.getElementsByTagName("input")[1];

	/* initializations */

	// canvas display event
	bgToolbar.children[1].children[2]
		.addEventListener("click", this.resetCanvas, false);

	// hexidecimal text keyup & blur events
	this.texti.addEventListener("keyup", this.hexText, false);
	this.texti.addEventListener("blur", this.hexBlur, false);

	// html5 color picker change event
	this.picki.addEventListener("change", this.colorPick, false);

	// get the color wheel btns
	this.temp = this.temp.getElementsByTagName("button");

	// loop through the color wheel btns
	for(var i = 2; i < this.temp.length; i++)
		// add wheelBtn event
		this.temp[i].addEventListener("click", this.wheelBtn, false);

	// get the background image control panel inputs
	this.temp = bgCpanels.children[2]
					.getElementsByTagName("input");

	// apply blur text input keyup event
	this.temp[2].addEventListener("keyup", this.bText, false);

	// apply blur slider event
	this.temp[3].addEventListener("change", this.bSlide, false);

	// apply opacity text input keyup event
	this.temp[4].addEventListener("keyup", this.oText, false);

	// apply opacity slider event
	this.temp[5].addEventListener("change", this.oSlide, false);

	// set the temp color
	this.temp = "#FFFFFF";
}

//-----------------------------------------------
// - display the proper elements
BGC.prototype.resetCanvas = function(){
	// hide the upload background image
	bgCanvas.style.display = "none";
	// hide the crop buttons
	cropCanvas.children[0].children[1].style.display = "none";
	// show the draggable elements' canvas
	dragCanvas.style.display = "block";
}





























