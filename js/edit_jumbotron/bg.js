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
	this.cropper = new CR();
	// init background color editor
	this.bgc = new BGC();

	// title block
	this.tBlock = bgProps.children[1];
	// canvases
	this.canvas = bgCanvas.children;
	// control panels (also use as temp variable)
	this.cPanel = bgCpanels.children; 
	// toolbar btns
	this.tBtn = bgToolbar.children;

	// index of active control panel
	this.prop = -1;

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
	cropCanvas.children[0].children[0].style.display = "none";
	// show the dragable elements canvas
	dragCanvas.style.display = "block";
}

//-----------------------------------------------
// - show modal
// - set inner HTML
// - set modal callback
BG.prototype.confirmDel = function(){

	// if there is no background image
	if(!jApp.iVals["image"])
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
   					 '	<img src="img/business/'+jApp.iVals.image+'" style="height:auto;width:auto;max-height:160px;max-width:100%" />'+
   					 '</div>';

   	// set modal callback
   	jApp.modal.callback = jApp.bg.del;

   	// launch the modal
   	jApp.modal.launch();
}

//-----------------------------------------------
// - remove the background image
// - prompt the user to save
BG.prototype.del = function(){

	// reset all the nVals properties
	jApp.nVals["image"] = 0;
	jApp.nVals["blur"] = 0;
	jApp.nVals["opacity"] = 1;
	jApp.nVals["h"] = 0;
	jApp.nVals["w"] = 0;

	// remove the background image
	cropCanvas.children[0].removeChild(cropCanvas.children[0].children[0]);

	// add the default bg image placeholder
	jApp.temp = document.createElement("div");
	jApp.temp.className = "bg-placeholder";
	jApp.temp.innerHTML = '<span class="icon-image"></span>';
	cropCanvas.children[0].insertBefore(jApp.temp, cropCanvas.children[0].children[0]);

	// values changed
	jApp.deltaVals();
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
	jApp.bg.bgi.fileHover(e);
	
	// display the spinner

	// fetch FileList object
	jApp.bg.bgi.file = e.target.files || e.dataTransfer.files;// process all File objects
	jApp.bg.bgi.file = jApp.bg.bgi.file[0];

	// upload the file
	jApp.bg.bgi.uploadFile();
}

//-----------------------------------------------
// - upload image
BGI.prototype.uploadFile = function(){ console.log(this.file);

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
	  	this.xhr.onreadystatechange = jApp.bg.bgi.uploadCB;

		// ajax
		this.xhr.open("POST", document.URL, true);
		this.xhr.setRequestHeader("X-file-name", this.file.name);
		this.xhr.send(this.file);
	}
}

//-----------------------------------------------
// - img file upload callback 
BGI.prototype.uploadCB = function(){
	if (this.readyState == 4) { console.log(this.responseText);

		// parse the json
		jApp.temp = JSON.parse(this.responseText);

		// set the nVals (new values) properties
		jApp.nVals["image"] = jApp.temp["image"];
		jApp.nVals["ratio"] = jApp.temp["ratio"];

		// if there isn't already a background image
		if(!window.hasOwnProperty("bgImg")){

			// remove the placeholder
			cropCanvas.children[0].removeChild(cropCanvas.children[0].children[1]);

			// insert an image element
			cropCanvas.children[0].appendChild(
				document.createElement("img")
			);

			// set the id
			cropCanvas.children[0].children[1].id = "bgImg";
		}

		// set the background image
		bgImg.src = jApp.nVals["image"];

		// THIS IS BROKEN
		// set the background image width
		// document.styleSheets[document.styleSheets.length - 1].rules[0]
		// 	.style.height = (cropCanvas.offsetWidth * jApp.nVals["ratio"]) + "px";

		// show save prompt
		jApp.deltaVals();
	}
}































//-----------------------------------------------
//				   CR (cropper)				
//			     ----------------
//
// - toggle draggable button circles
//
// - crop jumbotron background image
//
//-----------------------------------------------

/* CONSTRUCTOR */

CR = function(){

	/* properties */

	// keep track of the rr obj (reposition, resize, rotate)
	this.r = new rr(cropCanvas.children[0]);
	rMap.h[0] = this.r;
	rMap.a = this.r;

	/* initializations */

	// toggle the image upload canvas event
	bgToolbar.children[1].children[1].addEventListener("click", this.togCrop, false); // background image button
	bgCpanels.children[1].children[0].children[0]
		.addEventListener("click", this.hideCrop, false); // bgi control panel x
	bgToolbar.children[1].children[0].addEventListener("click", this.hideCrop, false); // crop button
	bgToolbar.children[1].children[2].addEventListener("click", this.hideCrop, false); // bg color button
}

/* METHODS */

// -----------------------------------------------
// - toggle bg image drag buttons
CR.prototype.togCrop = function(){
	// if the bgCanvas is hidden
	if(cropCanvas.children[0].children[0].offsetParent === null){
		// show the bg image drag buttons
		cropCanvas.children[0].children[0].style.display = "block";
		// hide the draggables canvas 
		dragCanvas.style.display = "none";
	}else{
		// hide the bg image drag buttons
		cropCanvas.children[0].children[0].style.display = "none";
		// show the draggables canvas
		dragCanvas.style.display = "block";
	}
}

//-----------------------------------------------
// - hide the bg image drag buttons
CR.prototype.hideCrop = function(){
	// hide the bg image drag buttons
	cropCanvas.children[0].children[0].style.display = "none";
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

/* METHODS */

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
BGC.prototype.hexBright = function( rgbObj ){
	// calculate & return weighted average
	return (( rgbObj.r*0.299 + rgbObj.g*0.587 + rgbObj.b*0.114 ) / 256 > 0.6);
}
//-----------------------------------------------
// - algorithm to convert hex to rgb
// - @hex -> hexidecimal as string
// - returns object with r, g, & b values
BGC.prototype.hexToRgb = function(hex) {
	// convert to array of hex vals
	this.tempHex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
	// return the results as an object
    return this.tempHex ? {
        r: parseInt(this.tempHex[1], 16),
        g: parseInt(this.tempHex[2], 16),
        b: parseInt(this.tempHex[3], 16)
    } : null;
}

//-----------------------------------------------
// - keyup event change background color hex text
// - make sure that first character is always a
//   hashtag
// - if legit hex value, display color
BGC.prototype.hexText = function(){
	
	// if the first character is not a #
	if(this.value.charAt(0) != "#")
		// put the hashtag in front of the text
		this.value = "#" + this.value;

	// remove any input that is not 0-9, A-F
	this.value = "#" + this.value.substr(1,6).replace(/[^0-9a-f]+/gi, '');

	// if the input is now the proper length & format
	if(this.value.length == 7){
		// set the background color
		jApp.bg.bgc.temp = this.value;
		jApp.bg.bgc.setColor();
	}
}

//-----------------------------------------------
// - blur event for hex input
// - set value to previous compliant hex value
BGC.prototype.hexBlur = function(){
	this.value = jApp.bg.bgc.temp;
}

//-----------------------------------------------
// - html5 color picker change event
BGC.prototype.colorPick = function(){
	jApp.bg.bgc.temp = this.value.toUpperCase();
	jApp.bg.bgc.setColor();
}

//-----------------------------------------------
// - user clicks one of the color wheel colors
// - set text
// - set color icon
// - set html5 color picker
// - set background
BGC.prototype.wheelBtn = function(){
	
	jApp.bg.bgc.temp = this.dataset.hex;

	jApp.bg.bgc.setColor();

}

//-----------------------------------------------
// - master bg color setter method
// - hex --> hexidecimal color
// - set text
// - set color icon
// - set html5 color picker
// - set background
BGC.prototype.setColor = function(){

	// set preview background color
	cropCanvas.style.backgroundColor = 

	// set the preview icon background
	this.icon.style.backgroundColor = 

	// set the text
	this.texti.value = 

	// set the color picker
	this.picki.value = 

	// & update the new values object
	jApp.nVals.color = this.temp;

	// set the preview icon color
	this.icon.style.color = 
		this.hexBright(this.hexToRgb(this.temp)) ?
			"#444" : "#FFF";

	// notify root node that values have changed
	jApp.deltaVals();
}

//-----------------------------------------------
// - display the proper elements
BGC.prototype.resetCanvas = function(){
	// hide the upload background image
	bgCanvas.style.display = "none";
	// hide the crop buttons
	cropCanvas.children[0].children[0].style.display = "none";
	// show the draggable elements' canvas
	dragCanvas.style.display = "block";
}

//-----------------------------------------------
// - when user slides opacity slider
BGC.prototype.oSlide = function(){

	// set the value of the text input
	this.parentElement.children[1].value = 

	// change the opacity of the background img
	bgImg.style.opacity = 

	// update values
	jApp.nVals["opacity"] = parseFloat(this.value);

	// prompt save
	jApp.deltaVals();
}

//-----------------------------------------------
// - when user slides blur slider
BGC.prototype.bSlide = function(){

	// set the value of the text input
	this.parentElement.children[1].value = 

	// update values
	jApp.nVals["blur"] = parseInt(this.value);

	// change the blur of the background img
	bgImg.style.filter = 
	bgImg.style.webkitFilter = "blur("+this.value+"px)"; 

	// prompt save
	jApp.deltaVals();

}

//-----------------------------------------------
// - keyup opacity text input
BGC.prototype.oText = function(){ 

	// if there is no input, return 
	if( !this.value) return;

	// if the value is not 1
	if(this.value !== "1"){

		// strip non numeric characters from the last 2 digits
		this.value = this.value.replace(/[^\d.]/g, '');

		// if the value of the first character is not 0
		if( this.value.charAt(0) != "0" )

			// pop a 0 in there
			this.value = "0" + this.value;

		// if the value of the second character is not "."
		if( this.value.length > 1 && this.value.charAt(1) != "." )

			// pop the decimal in there
			this.value = "0." + this.value.substring(1, 3);
	}

	// update slider input
	this.parentElement.children[2].value = 

	// change the opacity of the background
	bgImg.style.opacity = 

	// update values
	jApp.nVals["opacity"] = parseFloat(this.value);

	// prompt save
	jApp.deltaVals();
}

//-----------------------------------------------
// - keyup blur text input
// - must be an integer between 0 and 10
BGC.prototype.bText = function(){

	// if there is no input, return 
	if( !this.value) return;

	// replace all non-numeric characters
	this.value = this.value.replace('/[^\d]/g', '');

	// if the value is greater than 10
	if(parseInt(this.value) > 10)
		// remove the last number
		this.value = this.value.substr(0,1);

	// update the slider input
	this.parentElement.children[2].value = 

	// update the nVals
	jApp.nVals["blur"] = parseInt(this.value);

	// set the blur
	bgImg.style.filter = 
	bgImg.style.webkitFilter = "blur("+this.value+"px)"; 

	// prompt save
	jApp.deltaVals();
}



































