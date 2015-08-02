
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

	// initialize the hero swiper
	this.heroSwiper = new HS( document.getElementById("new-product-panel").getElementsByClassName("slideshow")[0] );

	// initialize the toolbars

	/* event listeners */

	// new product button
	document.getElementById("new-product-btn")
		.addEventListener("click", this.open, false);

	// close new product panel
	document.getElementById("close-new-product-panel")
		.addEventListener("click", this.close, false);

	// info buttons
	document.getElementById("producer-info")
		.addEventListener("click", this.infoAlert, false);
	document.getElementById("already-listed-info")
		.addEventListener("click", this.infoAlert, false);

}

/* METHODS */

//-----------------------------------------------
// - Event listener for add-new-product button
// - Animate open new product panel
PC.prototype.open = function(event){

	// if the product panel is already open
	if( event.target === document.getElementById("close-new-product-panel") )
		return;

	this.className = "";

	// display the little x
	document.getElementById("close-new-product-panel")
		.style.display = "block";

	// display the new product panel
	document.getElementById("new-product-panel")
		.style.display = "block";

	// reinit the hero swiper
	epApp.pc.heroSwiper.swiper.update();

	setTimeout( epApp.pc.fi, 100 );
}
//-----------------------------------------------
// - timeout function fade in new product panel
PC.prototype.fi = function(){
	document.getElementById("new-product-panel")
		.style.opacity = 1;
}

//-----------------------------------------------
// - event listener to close new product panel
PC.prototype.close = function(){

	// #new-product-btn background to green
	document.getElementById("new-product-btn").className = "btn btn-lg btn-success"

	// hide the little x
	this.style.display = "none";

	// hide the new product panel
	document.getElementById("new-product-panel")
		.style.opacity = 0;
	document.getElementById("new-product-panel")
		.style.display = "none";
}

//-----------------------------------------------
// - event listener to reveal info alerts
PC.prototype.infoAlert = function(){
	// call the insertAlert method 
	rsApp.insertAlert(
						this.dataset.alert,
						this.dataset.text,
						this.parentElement.parentElement.children[1]
					 );
}


