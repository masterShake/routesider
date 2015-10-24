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
	// - determine if the user has made any changes
	// - returns true if changed, false if unchanged
	Jumbo.prototype.deltaVals = function(){
		
		// if the values have not changed
		if( JSON.stringify(this.iVals) === JSON.stringify(this.nVals)){

			// hide save alert
			this.hideSA();

			return false;
		}

		// display save prompt
		this.showSA();

		return true;

	}

	//-----------------------------------------------
	// - show save alert
	Jumbo.prototype.showSA = function(){
		return false;
	}

	//-----------------------------------------------
	// - hide save alert
	Jumbo.prototype.hideSA = function(){
		return false;
	}

	//-----------------------------------------------
	// - ajax save changes
	Jumbo.prototype.save = function(){ return false;

		// indicate that save request is in progress

		// make save ajax call

	}

	//-----------------------------------------------
	// - save callback
	Jumbo.prototype.saveCB = function(r){ console.log(r);

		// indicate that save was successful
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
		// this.bgImg = new BGI();
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

			// display the preview
			// jApp.preview.style.display = "block";

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

		// hide the preview canvas
		// jApp.preview.style.display = "none";

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

		// temp variable, get the edit bg image btn
		this.temp = document.getElementById("bg-toolbar")
						.children[0];

		/* initialization */

		// apply the dropdown event
		// this.temp.children[0]
		// 	.addEventListener("click", rsApp.toggleDropdown, false);

	}

	/* METHODS */

	//-----------------------------------------------
	// - when user slides opacity slider
	BGI.prototype.oSlide = function(){ return false;

		// set the value of the text input

		// change the opacity of the background img

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

		// hexidecimal text keyup event

		// html5 color picker change event

		// get the color wheel btns
		this.temp = this.temp.getElementsByTagName("button");

		// loop through the color wheel btns
		for(var i = 2; i < this.temp.length; i++)
			// add wheelBtn event
			this.temp[i].addEventListener("click", this.wheelBtn, false);
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
		return false;
	}

	//-----------------------------------------------
	// - html5 color picker change event
	// - set text value
	// - set icon color
	// - set background color
	BGC.prototype.colorPick = function(){
		return false;
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
		this.picki.value = this.temp;

		// set the preview icon color
		this.icon.style.color = 
			this.hexBright(this.hexToRgb(this.temp)) ?
				"#444" : "#FFF";
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
