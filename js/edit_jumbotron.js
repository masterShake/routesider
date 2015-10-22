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

			// hide the properties options
			document.getElementById(this.dataset.propopts).style.display = "none";

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
		// this.bgCol = new BGC();

		// keep track of open properties control panels
		this.prop = null;

		// temp variable, get the toolbar
		this.temp = document.getElementById("bg-props").children[5].children;

		/* initializations */

		// apply toggle control panel event
		this.temp[0].addEventListener("click", this.togConPan, false);
		this.temp[1].addEventListener("click", this.togConPan, false);
		this.temp[2].addEventListener("click", this.togConPan, false);
	}

	//-----------------------------------------------
	// - toggle control panel event
	BG.prototype.togConPan = function(){

		// if this control panel is already open
		if(jApp.bg.prop == this.dataset.propelem){

			// hide this canvas layer
			document.getElementById(this.dataset.propelem + "-canvas").style.display = "none";

			// hide this control panel
			document.getElementById(this.dataset.propelem + "-cpanel").style.display = "none";

			// display the properties options title
			document.getElementById("bg-props").children[1].style.display = "block";

			// reset the cPanel property
			jApp.bg.prop = null;

			// display the preview
			document.getElementById("prev-canvas").style.display = "block";

			return;
		}

		// set the cPanel property
		jApp.bg.prop = this.dataset.propelem;

		// get the background canvases
		jApp.bg.temp = document.getElementById("bg-canvas").children;

		// hide all the canvases
		jApp.bg.temp[0].style.display = "none";
		jApp.bg.temp[1].style.display = "none";
		jApp.bg.temp[2].style.display = "none";

		// hide the title
		document.getElementById("bg-props").children[1]
			.style.display = "none";

		// get all the property options control panels
		jApp.bg.temp = document.getElementById("bg-props").children;

		// hide all the control panels
		jApp.bg.temp[2].style.display = "none";
		jApp.bg.temp[3].style.display = "none";
		jApp.bg.temp[4].style.display = "none";

		// hide the preview canvas
		document.getElementById("prev-canvas").style.display = "none";

		// display the selected layer
		document.getElementById(this.dataset.propelem + "-canvas").style.display = "block";

		// display the selected control panel
		document.getElementById(this.dataset.propelem + "-cpanel").style.display = "block";

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
		this.temp = document.getElementById("bg-opts-toolbar")
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

		// temp variable, background color button
		this.temp = document.getElementById("bg-opts-toolbar")
						.children[1].children[1];

		/* initializations */

		// dropdown click
		this.temp.children[0].addEventListener("click", rsApp.toggleDropdown, false);

		// hexidecimal text keyup event

		// html5 color picker change event

		// get the color wheel btns
		this.temp = this.temp.getElementsByClassName("color-wheel")[0]
						 .getElementsByTagName("button");

		// loop through the color wheel btns
		for(var i = 0; i < this.temp.length; i++){

			this.temp[i].addEventListener("click", this.wheelBtn, false);

		}
	}

	/* METHODS */

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
		return false;
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
