
//-----------------------------------------------
//
//		   		 edit jumbotron app
//			   ----------------------
//
// - related: jumbotron.php, jumbotron.css
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
	// - set the canvas height
	//
	// - initialize the various edit mode objects of
	//   components toolbar
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

	Jumbo = function(){ return false;

		/* properties */

		// keep track of initial values
		this.iVals = JSON.parse( document.getElementById("i-vals").value );
		// keep track of new values (identical at first)
		this.nVals = JSON.parse( document.getElementById("i-vals").value );

		// init background editor
		this.bg = new BG();

		// temp variable
		this.temp;

		/* initializations */

		// set height of jumbo-canvas
		document.getElementById("jumbo-canvas")
			.style.height = (window.offsetHeight - 80) + "px";

		// init the layout view dropdown
		document.getElementById("layout-view").children[0]
			.addEventListener("click", rsApp.toggleDropdown, false);

	}

	/* METHODS */

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
	Jumbo.prototype.save = function(){

		// indicate that save request is in progress

		// make save ajax call

	}

	//-----------------------------------------------
	// - save callback
	Jumbo.prototype.saveCB = function(r){ console.log(r);

		// indicate that save was successful
	}






































	//-----------------------------------------------
	//				BG (edit background)				
	//			  ------------------------
	//
	// - manage background options btn classes
	//
	// - toggle display background image
	//
	//-----------------------------------------------

	/* CONSTRUCTOR */

	BG = function(){ 

		/* properties */

		// init cropper
		// this.cropper = new CR();
		// init background color editor
		this.bgCol = new BGC();
		// init background image editor
		this.bgImg = new BGI();

		// temp variable, get the toolbar
		this.temp = document.getElementById("bg-opts-toolbar");

		/* initializations */

		// toggle bg image display
		this.temp.children[0].children[0]
				.addEventListener("change", this.toggleImg, false);

		// get the toolbar btns
		this.temp = this.temp.children[1].children;

		// apply actBtn event listener
		this[0].addEventListener("click", this.actBtn, false);
		this[1].addEventListener("click", this.actBtn, false);
		this[2].addEventListener("click", this.actBtn, false);
	}

	/* METHODS */

	//-----------------------------------------------
	// - apply or remove background image
	// - change eyeball icon
	// - prompt save
	BG.prototype.toggleImg = function(){
		return false;
	}

	//-----------------------------------------------
	// - background options toolbar btn event
	// - add active class to clicked btn
	// - remove active class from any other btn
	BG.prototype.actBtn = function(){

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
						.children[1].children[2];

		/* initialization */

		// apply the dropdown event
		this.temp.children[0].addEventListener("click", rsApp.toggleDropdown, false);



	}

	/* METHODS */

	//-----------------------------------------------
	// - when user slides opacity slider
	BGI.prototype.oSlide = function(){

		// set the value of the text input

		// change the opacity of the background img

		// update values

	}

	//-----------------------------------------------
	// - when user slides blur slider
	BGI.prototype.bSlide = function(){

		// set the value of the text input

		// change the blur of the background img

		// update values

	}

	//-----------------------------------------------
	// - keyup opacity text input
	BGI.prototype.oText = function(){

		// make sure 0 <= value <= 1, step .01

		// update slider input

		// change the opacity of the background

		// update values

	}

	//-----------------------------------------------
	// - keyup blur text input
	BGI.prototype.bText = function(){

		// make sure 0 <= value <= 100, step 1

		// update slider input

		// change the blur of the background

		// update values

	}





























	/* initialize */

	document.addEventListener("DOMContentLoaded", function(){

	    // create new RS object
	    rsApp = new RS();

	    // create new Jumbo (edit jumbotron) object
	    // jumboApp = new Jumbo();
		document.getElementById("jumbo-canvas")
			.style.height = (window.innerHeight - 75) + "px";
		document.getElementById("layout-view").children[0]
			.addEventListener("click", rsApp.toggleDropdown, false);

	}, true);	

})();



