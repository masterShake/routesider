
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




















var ESM, esmApp;

(function(){

	//-----------------------------------------------
	//					Jumbo class				
	//				  -------------
	//
	// - edit jumbotron (Jumbo)
	//
	// - stylize jumbotron
	//
	// - drag and drop text over jumbotron
	//
	// - customize for mobile, tablet, & desktop
	//
	//-----------------------------------------------

	/* CONSTRUCTOR */

	Jumbo = function(){ return false;

		/* properties */

		/* initializations */

	}

	/* METHODS */










	/* initialize */

	document.addEventListener("DOMContentLoaded", function(){

	    // create new RS object
	    rsApp = new RS();

	    // create new Jumbo (edit jumbotron) object
	    // jumboApp = new Jumbo();

	}, true);	

})();



