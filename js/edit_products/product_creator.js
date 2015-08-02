
//-----------------------------------------------
//
//				PC - product creator
//			  ------------------------
//
// - Class for creating a new product
//
// - Helps user search for an existing product
//   first
//
// - Handles/saves user input
//
//-----------------------------------------------

/* CONSTRUCTOR */

var PC = function(){

	/* properties */

	// - don't initialize the hero swiper until 
	//   the user clicks the + new product button
	this.heroSwiper = null; // new HS( document.getElementById("new-product-panel").getElementsByClassName("slideshow")[0] );

	// keep track of the elem to be faded in
	this.fadeElem = null;

	/* initialization */

	// new product button event listener
	document.getElementById("new-product-btn")
		.addEventListener("click", this.open, false);

}

/* METHODS */

//-----------------------------------------------
// - Event listener for #new-product-btn
// - Animate open new product panel
PC.prototype.open = function(event){

	// if the panel is already open
	if( !this.className.length )
		return;

	// if the components have not been initialized
	if( epApp.pc.heroSwiper === null )
		// initialize the js components
		epApp.pc.init();


	// clear the class
	this.className = "";

	// display the little x
	this.children[0].children[0].style.display = "block";

	// display the producer btns component
	epApp.pc.fadeElem = document.getElementById("producer-btns");
	epApp.pc.fadeElem.style.display = "block";

	// fade it in
	setTimeout( epApp.pc.fi, 100 );
}

//-----------------------------------------------
// - initialize the swiper and other events
PC.prototype.init = function(){ console.log("init called");

	// init the close button
	// document.getElementsByClassName("")

}

//-----------------------------------------------
// - timeout function fade in new product panel
PC.prototype.fi = function(){
	epApp.pc.fadeElem.style.opacity = 1;
}


















