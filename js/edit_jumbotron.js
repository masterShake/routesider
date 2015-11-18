//-----------------------------------------------
//
//				Edit Jumbotron App
//
//	- Toggle display of jumbotron component
//
//
//
//-----------------------------------------------



//-----------------------------------------------
//
//		   	 additional RS methods
//
//----------------------------------------------- 

//----------------------------------------------
// - Event listener toggle slide out menu for
//   pages with no map
RS.prototype.toggleMobileMenu = function(){
	// set the max width of the content cover
	// if the menu is hidden and the window is mobile-sized
	if( document.getElementById("page-content").style.transform != "translate(270px, 0px)"
		&& window.innerWidth < 768 ){
		// open the menu
		document.getElementById("page-content").style.transform = "translate(270px, 0px)";
		document.getElementById("content-cover").style.transform = "translate(270px, 0px)";
		// cover the content
		document.getElementById("content-cover").style.display = "block";
		// set timer to reveal #content-cover
		setTimeout( rsApp.showContentCover , 200 );
	}else{
		// close the menu
		document.getElementById("page-content").style.transform = "translate(0px, 0px)";
		document.getElementById("content-cover").style.transform = "translate(0px, 0px)";
		// reveal the content
		document.getElementById("content-cover").style.opacity = "0";
		// set timer to hide #content-cover
		setTimeout( rsApp.hideContentCover , 300 );
	}
}


































var Jumbo, jApp;

(function(){

	//-----------------------------------------------
	//				Jumbo (root node)			
	//			  ---------------------
	//
	// - manage background options btn classes
	//
	// - control active btn classes in toolbars
	//
	// - keep track of/detect changes made
	//
	// - prompt save, save css
	//
	// - ajax call
	//
	// - save success message
	//
	//-----------------------------------------------

	/* CONSTRUCTOR */

	Jumbo = function(){

		/* properties */

		// keep track of initial values
		this.iVals = JSON.parse( document.getElementById("i-vals").value );

		// keep track of new values (identical at first)
		this.nVals = JSON.parse( document.getElementById("i-vals").value );

		// init background editor
		this.bg = new BG();
		// init textbox editor
		this.text = new TB();
		// init image overlay editor
		this.img = new IO();
		// init button editor
		this.btns = new BTN();

		// instantiate confirmation modal object
		this.modal = new cModal();

		// add the modal confirmation event listern out here
		confModal.children[0].children[0].children[2].children[1]
			.addEventListener("click", this.modal.callback, false); 

		// keep track active toolbar
		this.comp = null;

		// keep track of active control panel
		this.panel = -1;

		// temp variable
		this.temp;

		/* initializations */

		// init the layout view dropdown
		document.getElementById("layout-view").children[0]
			.addEventListener("click", rsApp.toggleDropdown, false);

		// get all the toolbars, add actBtn event
		this.temp = document.getElementsByClassName("tb"); // console.log(this.temp);

		// loop through the opts-toolbars
		for(var i = 0; i < this.temp.length; i++){

			// loop through all the btns in the toolbar
			for(var j = 0; j < this.temp[i].children.length; j++){

				// add event listener to each of the btns
				this.temp[i].children[j].addEventListener("click", this.actBtn, false);
			}
		}

		// event listener activation switch
		document.getElementById("onoff")
			.addEventListener("change", this.jumboVis, false);

		// get the jumbo toolbar btns
		this.temp = document.getElementById("jumbo-toolbar").children[1].children;
		// apply the event listeners to jumbo toolbar
		this.temp[0].addEventListener("click", this.togOpts, false);
		this.temp[1].addEventListener("click", this.togOpts, false);
		this.temp[2].addEventListener("click", this.togOpts, false);
		this.temp[3].addEventListener("click", this.togOpts, false);

		// get all buttons that toggle control panels
		this.temp = document.querySelectorAll('[data-panel]');
		// loop through the buttons
		for(var i = 0; i < this.temp.length; i++)
			// apply the even listener
			this.temp[i].addEventListener("click", this.togCpan, false);

		// add event listener to the save btn
		save1.children[1].addEventListener("click", this.save, false);
		save2.children[0].addEventListener("click", this.save, false);

		// close the save alert
		save1.children[0].addEventListener("click", this.xSA, false);

	}

	/* METHODS */

	//-----------------------------------------------
	// - event to add/remove active btn class
	Jumbo.prototype.actBtn = function(){

		// if this button is already active
		if( this.className.substr(this.className.length - 6) == "active"){

			// remove active class
			this.className = this.className.substr(0, this.className.length - 7);

			return false;
		}

		// look for another active btn
		jApp.temp = this.parentElement.getElementsByClassName("active");

		// if there is another active btn
		if(jApp.temp.length) 
			// remove its active class
			jApp.temp[0].className = jApp.temp[0].className
										.substr(0, jApp.temp[0].className.length - 7);

		// activate this btn
		this.className = this.className + " active";
	}

	//-----------------------------------------------
	// - toggle an options toolbar
	Jumbo.prototype.togOpts = function(){

		// if there is an open/active options toolbar
		if(jApp.comp){

			// close it
			jApp[jApp.comp].close();

			// if a control panel is open
			if(jApp.panel >= 0){

				// close it
				document.getElementById(jApp.comp+"Cpanels").children[jApp.panel]
					.style.display = "none";

				// show the opts title
				document.getElementById(jApp.comp + "Props").children[1]
					.style.display = "block";

				// reset the panel property
				jApp.panel = -1;

			}

			// hide the open options toolbar
			document.getElementById(jApp.comp + "Props").style.display = "none";

		}

		// if this options toolbar was already open
		if(this.dataset.comp == jApp.comp){

			// reset the comp property to null
			jApp.comp = null;

			return;
		}

		// set the comp property
		jApp.comp = this.dataset.comp;

		// open the selected properties options toolbar
		document.getElementById(this.dataset.comp + "Props").style.display = "block";
	}

	//-----------------------------------------------
	// - toggle an options control panel
	Jumbo.prototype.togCpan = function(){

		// if there is an open/active control panel
		if(jApp.panel >= 0)

			// close it
			document.getElementById(jApp.comp+"Cpanels").children[jApp.panel]
				.style.display = "none";
		
		//-----------------------------------------------
		// - if this button has no associated control 
		//   panel, or this panel was already open
		if(!this.dataset.panel || this.dataset.panel == jApp.panel){

			// show the opts title
			document.getElementById(jApp.comp + "Props").children[1]
				.style.display = "block";

			// reset the active panel
			jApp.panel = -1;

			return;
		}

		// set the new active panel
		jApp.panel = this.dataset.panel;

		// hide the opts title
		document.getElementById(jApp.comp + "Props").children[1]
			.style.display = "none";

		// display the control panel
		document.getElementById(jApp.comp + "Cpanels").children[this.dataset.panel]
			.style.display = "block";
	}

	//-----------------------------------------------
	// - on/off switch jumbo visible change event
	Jumbo.prototype.jumboVis = function(){
		jApp.nVals.active = (this.checked) ? 1 : 0;
		jApp.deltaVals();
	}

	//-----------------------------------------------
	// - determine if the user has made any changes
	// - returns true if changed, false if unchanged
	Jumbo.prototype.deltaVals = function(){
		
		// if the values have not changed
		if( JSON.stringify(this.iVals) === JSON.stringify(this.nVals)
			&& save2.className != "well" ){

			// hide save alert
			save1.style.display = "none";
			save1.style.opacity = "0";

			// remove the alert class from the well
			save2.className = "well";

			// remove the event listener from bottom save button
			save2.children[0].removeEventListener("click", jApp.save, false);

		}else if(save2.className != "well info"){

			// display save alert
			save1.className = "alert alert-info";
			save1.style.display = "block";
			save1.children[0].style.display = "none";
			setTimeout(jApp.showSA, 50);

			// set the save class
			save2.className = "well info";
		}
		// change the inner HTML of the buttons
		save1.children[1].innerHTML = "save";
		save2.children[0].innerHTML = "save";
	}

	//-----------------------------------------------
	// - show save alert fade in timeout function
	Jumbo.prototype.showSA = function(){
		save1.style.opacity = "1";
	}

	//-----------------------------------------------
	// - ajax save changes
	Jumbo.prototype.save = function(){

		// if the save propmt does not have the proper class
		if(this.parentElement.className.substr(-4) != "info")
				return; // do nothing

		// show hourglass inside save button
		save1.children[1].innerHTML = '<span class="glyphicon glyphicon-hourglass loading" style="color:#fff;"></span>';
		save2.children[0].innerHTML = '<span class="glyphicon glyphicon-hourglass loading" style="color:#fff;"></span>';

		// make save ajax call
		rsApp.ajax({ 
			method   : "POST",
			url      : document.URL,
			params   : "json=" + JSON.stringify(jApp.nVals),
			callback : jApp.saveCB
		});
	}

	//-----------------------------------------------
	// close save alert
	Jumbo.prototype.xSA = function(){
		this.parentElement.style.opacity = "0";
		this.parentElement.style.display = "none";
		save2.className = "well";
		save1.children[1].innerHTML = "save";
		save2.children[0].innerHTML = "save";
	}

	//-----------------------------------------------
	// - save callback
	Jumbo.prototype.saveCB = function(r){ console.log(r);

		// if the save was successful
		if(r == 1){

			// set the initial values to match the new values
			jApp.iVals = JSON.parse(JSON.stringify(jApp.nVals));

			// change classes
			save1.className = "alert alert-success";
			save2.className = "well success";

			// change the button html
			save1.children[1].innerHTML = 'saved!';
			save2.children[0].innerHTML = 'saved!';

			// show the closable x
			save1.children[0].style.display = "block";

		}
	}


































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
		if(!jApp.iVals["bg_img"])
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
       					 '	<img src="img/business/'+jApp.iVals.bg_img+'" style="height:auto;width:auto;max-height:160px;max-width:100%" />'+
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
		jApp.nVals["bg_img"] = 0;
		jApp.nVals["bg_dims"] = 0;
		jApp.nVals["blur"] = 0;
		jApp.nVals["opacity"] = 1;

		// reset all the css
		cropCanvas.children[0].style.backgroundImage = "none";

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

		// toggle the image upload canvas event
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

		// get the background image control panel inputs
		this.file = bgCpanels.children[0]
						.getElementsByTagName("input");

		// apply blur text input keyup event
		this.file[0].addEventListener("keyup", this.bText, false);

		// apply blur slider event
		this.file[1].addEventListener("change", this.bSlide, false);

		// apply opacity text input keyup event
		this.file[2].addEventListener("keyup", this.oText, false);

		// apply opacity slider event
		this.file[3].addEventListener("change", this.oSlide, false);
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
			jApp.nVals["bg_img"] = jApp.temp["name"];
			jApp.nVals["bg_dims"] = jApp.temp["dims"];

			// set the background image
			cropCanvas.children[0].style.backgroundImage = 
				"url('"+jApp.nVals["bg_img"]+"')";

			// set the background image width
			document.styleSheets[document.styleSheets.length - 1].rules[0]
				.style.width = (400 * jApp.nVals["bg_dims"]) + "px";

			// show save prompt
			jApp.deltaVals();
		}
	}

	//-----------------------------------------------
	// - when user slides opacity slider
	BGI.prototype.oSlide = function(){

		// set the value of the text input
		this.parentElement.children[0].value = 

		// change the opacity of the background img
		cropCanvas.children[0].style.opacity = //this.value;

		// update values
		jApp.nVals["opacity"] = parseFloat(this.value);

		// prompt save
		jApp.deltaVals();
	}

	//-----------------------------------------------
	// - when user slides blur slider
	BGI.prototype.bSlide = function(){ return false;

		// set the value of the text input

		// change the blur of the background img

		// update values

	}

	//-----------------------------------------------
	// - keyup opacity text input
	BGI.prototype.oText = function(){ 

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
		this.parentElement.children[1].value = 

		// change the opacity of the background
		cropCanvas.children[0].style.opacity = 

		// update values
		jApp.nVals["opacity"] = parseFloat(this.value);

		// prompt save
		jApp.deltaVals();
	}

	//-----------------------------------------------
	// - keyup blur text input
	BGI.prototype.bText = function(){ return false;

		// make sure 0 <= value <= 100, step 1

		// update slider input

		// change the blur of the background

		// update values

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

		/* initializations */

		// toggle the bg image drag buttons event
		bgToolbar.children[1].children[0].addEventListener("click", this.hideCrop, false); // background image button
		bgCpanels.children[1].children[0].children[0]
			.addEventListener("click", this.hideCrop, false); // bgi control panel x
		bgToolbar.children[1].children[1].addEventListener("click", this.togCrop, false); // crop button
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
		prevCanvas.style.backgroundColor = 

		// set the preview icon background
		this.icon.style.backgroundColor = 

		// set the text
		this.texti.value = 

		// set the color picker
		this.picki.value = 

		// & update the new values object
		jApp.nVals.bg_color = this.temp;

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
	//				   TB (textbox)				
	//			     ----------------
	//
	// - manage text box functionality
	//
	//-----------------------------------------------

	/* CONSTRUCTOR */

	TB = function(){

		this.something = null;

	}

	/* METHODS */

	TB.prototype.close = function(){

		return false;

	}


































	//-----------------------------------------------
	//				 IO (image overlay)				
	//			   ----------------------
	//
	// - manage image overlay toolbar
	//
	//-----------------------------------------------

	/* CONSTRUCTOR */

	IO = function(){

		this.something = null;

	}

	/* METHODS */

	IO.prototype.close = function(){

		return false;

	}

































	//-----------------------------------------------
	//				 BTN (button editor)				
	//			   -----------------------
	//
	// - manage button link toolbar
	//
	//-----------------------------------------------

	/* CONSTRUCTOR */

	BTN = function(){

		this.something = null;

	}

	/* METHODS */

	BTN.prototype.close = function(){

		return false;

	}


































	//-----------------------------------------------
	//			 cModal (confirmation modal)				
	//		   -------------------------------
	//
	// - dynamically set the modal content
	//
	// - display the modal
	//
	// - hide the modal
	//
	// - perform callback
	//
	//-----------------------------------------------

	/* CONSTRUCTOR */

	cModal = function(){

		/* properties */

		// keep track of the callback function, temp variable
		this.callback = null;

		/* initializations */

		// add close event listeners
		confModal.addEventListener("click", this.fadeOut, false);
	}

	/* METHODS */

	//-----------------------------------------------
	// - launch modal
	cModal.prototype.launch = function(){

		// show the modal
		confModal.style.display = "block";

		// show the backdrop
		confBD.style.display = "block";
		
		// fade in
		setTimeout(jApp.modal.fadeIn, 10);
	}

	//-----------------------------------------------
	// - animate in
	cModal.prototype.fadeIn = function(){

		// prevent scrolling on the body
		document.body.className = "modal-open";

		// set the modal class
		confModal.className = "modal fade in";

		// set the backdrop class
		confBD.className = "modal-backdrop fade in";

	}

	//-----------------------------------------------
	// - animate out
	cModal.prototype.fadeOut = function(e){

		// if the user confirmed the deletion button
		if(e.target.className == "btn btn-default btn-danger"
		|| e.target.className == "glyphicon glyphicon-trash")
			jApp.modal.callback();

		// if we clicked one of the buttons or backdrop
		if(	e.target.tagName == "BUTTON" 
		|| e.target.parentElement.tagName == "BUTTON"
		|| e.target.id == "confModal" ){

			// set the modal class
			confModal.className = "modal fade";

			// set the backdrop class
			confBD.className = "modal-backdrop fade";

			// hide the elements
			setTimeout(jApp.modal.hide, 300);
		}
	}

	//-----------------------------------------------
	// - hide modal elements
	cModal.prototype.hide = function(){
		// hide the modal
		confModal.style.display = "none";
		// hide the backdrop
		confBD.style.display = "none";
		// remove the modal class from the body
		document.body.className = "";
	}

	//-----------------------------------------------
	// - dynamic delete callback method
	// cModal.prototype.callback = null;




























	//-----------------------------------------------
	//
	// 					initialize 
	//
	//-----------------------------------------------


	document.addEventListener("DOMContentLoaded", function(){

	    // create new RS object
	    rsApp = new RS();

	    // create new Jumbo (edit jumbotron) object
	    jApp = new Jumbo();

	}, true);	

})();
