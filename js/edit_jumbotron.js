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

		// keep track of the preview canvas
		this.preview = document.getElementById("prev-canvas");

		// keep track of the save alerts
		this.save1 = document.getElementById("save1");
		this.save2 = document.getElementById("save2");

		// keep track of open component options
		this.compEditor = null;

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

		// get the jumbo toolbar btns
		this.temp = document.getElementById("jumbo-toolbar").children[1].children;

		// apply the event listeners
		this.temp[0].addEventListener("click", this.togOpts, false);
		// this.temp[1].addEventListener("click", this.togOpts, false);
		// this.temp[2].addEventListener("click", this.togOpts, false);
		// this.temp[3].addEventListener("click", this.togOpts, false);

		// event listener activation switch
		document.getElementById("onoff")
			.addEventListener("change", this.jumboVis, false);

		// add event listener to the save btn
		this.save1.children[1].addEventListener("click", this.save, false);
		this.save2.children[0].addEventListener("click", this.save, false);

		// close the save alert
		this.save1.children[0].addEventListener("click", this.xSA, false);

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
	// - toggle the options toolbar
	Jumbo.prototype.togOpts = function(){

		// if this component option editor is already open
		if(jApp.compEditor == this.dataset.propopts){

			// open the selected properties options toolbar
			document.getElementById(this.dataset.propopts + "-props").style.display = "none";

			// open the cooresponding canvas
			document.getElementById(this.dataset.propopts + "-canvas").style.display = "none";

			// reset the compEditor property
			jApp.compEditor = null;

			return;
		}

		// set the compEditor property
		jApp.compEditor = this.dataset.propopts;

		// get all the properties options toolbars
		jApp.temp = document.getElementById("props").children;

		// close any open toolbars
		jApp.temp[0].style.display = "none";
		jApp.temp[1].style.display = "none";
		jApp.temp[2].style.display = "none";
		jApp.temp[3].style.display = "none";

		// open the selected properties options toolbar
		document.getElementById(this.dataset.propopts + "-props").style.display = "block";

		// open the cooresponding canvas
		document.getElementById(this.dataset.propopts + "-canvas").style.display = "block";
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
			&& this.save2.className != "well" ){

			// hide save alert
			this.save1.style.display = "none";
			this.save1.style.opacity = "0";

			// remove the alert class from the well
			this.save2.className = "well";

			// remove the event listener from bottom save button
			this.save2.children[0].removeEventListener("click", jApp.save, false);

		}else if(this.save2.className != "well info"){

			// display save alert
			this.save1.className = "alert alert-info";
			this.save1.style.display = "block";
			this.save1.children[0].style.display = "none";
			setTimeout(jApp.showSA, 50);

			// set the save class
			this.save2.className = "well info";
		}
		// change the inner HTML of the buttons
		this.save1.children[1].innerHTML = "save";
		this.save2.children[0].innerHTML = "save";
	}

	//-----------------------------------------------
	// - show save alert fade in timeout function
	Jumbo.prototype.showSA = function(){
		jApp.save1.style.opacity = "1";
	}

	//-----------------------------------------------
	// - ajax save changes
	Jumbo.prototype.save = function(){

		// if the save propmt does not have the proper class
		if(this.parentElement.className.substr(-4) != "info")
				return; // do nothing

		// show hourglass inside save button
		jApp.save1.children[1].innerHTML = '<span class="glyphicon glyphicon-hourglass loading" style="color:#fff;"></span>';
		jApp.save2.children[0].innerHTML = '<span class="glyphicon glyphicon-hourglass loading" style="color:#fff;"></span>';

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
		jApp.save2.className = "well";
		jApp.save1.children[1].innerHTML = "save";
		jApp.save2.children[0].innerHTML = "save";
	}

	//-----------------------------------------------
	// - save callback
	Jumbo.prototype.saveCB = function(r){ console.log(r);

		// if the save was successful
		if(r == 1){

			// set the initial values to match the new values
			jApp.iVals = JSON.parse(JSON.stringify(jApp.nVals));

			// change classes
			jApp.save1.className = "alert alert-success";
			jApp.save2.className = "well success";

			// change the button html
			jApp.save1.children[1].innerHTML = 'saved!';
			jApp.save2.children[0].innerHTML = 'saved!';

			// show the closable x
			jApp.save1.children[0].style.display = "block";

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
		// this.cropper = new CR();
		// init background color editor
		this.bgc = new BGC();

		// title block
		this.tBlock = document.getElementById("bg-props").children[1];
		// canvases
		this.canvas = document.getElementById("bg-canvas").children;
		// control panels (also use as temp variable)
		this.cPanel = document.getElementById("bg-cpanels").children;
		// toolbar btns
		this.tBtn = document.getElementById("bg-toolbar").children;

		// index of active control panel
		this.prop = -1;

		/* initializations */

		// apply toggle control panel event
		this.tBtn[0].addEventListener("click", this.togPanel, false);
		this.tBtn[1].addEventListener("click", this.togPanel, false);
		this.tBtn[2].addEventListener("click", this.togPanel, false);

		// temp variable, apply toggle event to the popover x btns
		this.cPanel[0].children[0].children[0].addEventListener("click", this.togPanel, false);
		this.cPanel[1].children[0].children[0].addEventListener("click", this.togPanel, false);
		this.cPanel[2].children[0].children[0].addEventListener("click", this.togPanel, false);
	}

	//-----------------------------------------------
	// - toggle control panel event
	BG.prototype.togPanel = function(){

		// if any control panel is already open
		if(jApp.bg.prop >= 0){

			// hide active canvas layer
			jApp.bg.canvas[jApp.bg.prop].style.display = "none";

			// hide active control panel
			jApp.bg.cPanel[jApp.bg.prop].style.display = "none";

			if(this.className == "close")
				jApp.bg.tBtn[jApp.bg.prop].className = "btn btn-default";
		}

		// if this particular control panel is open
		if(jApp.bg.prop == this.dataset.prop){

			// display the title
			jApp.bg.tBlock.style.display = "block";

			// reset the active prop
			jApp.bg.prop = -1;

			return;
		}

		// show canvas
		jApp.bg.canvas[this.dataset.prop].style.display = "block";

		// show the control panel
		jApp.bg.cPanel[this.dataset.prop].style.display = "block";

		// set the cPanel property
		jApp.bg.prop = this.dataset.prop;

		// hide the title
		jApp.bg.tBlock.style.display = "none";

		// set the prop
		jApp.bg.prop = this.dataset.prop;
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
		this.file = document.getElementById("bg-canvas").children[0];

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

		// get the background image control panel inputs
		this.file = document.getElementById("bg-cpanels").children[0]
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
		if (this.readyState == 4) { console.log(this.responseText); console.log(document.getElementById("prev-canvas"));

			// set the nVals property
			jApp.nVals["bg_img"] = "uploads/" + this.responseText;

			// set the background
			document.getElementById("prev-canvas").style.backgroundImage =  

			"url('uploads/" + this.responseText +"')";

			// show save prompt
			jApp.deltaVals();
		}
	}

	//-----------------------------------------------
	// - when user slides opacity slider
	BGI.prototype.oSlide = function(){

		// set the value of the text input
		this.parentElement.children[1].value = this.value;

		// change the opacity of the background img
		// jApp.preview.style.back

		// update values

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
	BGI.prototype.oText = function(){ return false;

		// make sure 0 <= value <= 1, step .01

		// update slider input

		// change the opacity of the background

		// update values

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
	// - crop jumbotron background image
	//
	//-----------------------------------------------

	/* CONSTRUCTOR */

	CR = function(){}

	/* METHODS */














































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
		this.temp = document.getElementById("bg-cpanels").children[2];

		// color fill btn
		this.icon = this.temp.getElementsByTagName("button")[1];
		// text input
		this.texti = this.temp.getElementsByTagName("input")[0];
		// HTML5 color picker
		this.picki = this.temp.getElementsByTagName("input")[1];

		/* initializations */

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
		jApp.preview.style.backgroundColor = 

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
