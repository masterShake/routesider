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
		// this.bg = new BG();

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
//
// - toggle background options title
//
//---------------------------------------------------

/* CONSTRUCTOR */

	BG = function(){ 

		/* properties */

		// init background image editor
		this.bgImg = new BGI();
		// init cropper
		// this.cropper = new CR();
		// init background color editor
		// this.bgCol = new BGC();

		// temp variable, get the toolbar
		this.temp = document.getElementById("bg-opts-toolbar");

		/* initializations */

		// apply toggle control panel event
	}

	//-----------------------------------------------
	// - toggle control panel event
	BG.prototype.togConPan = function(){

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
