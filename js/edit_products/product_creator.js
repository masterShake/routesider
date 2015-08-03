
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
	this.heroSwiper = null;

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
	if( !this.className.length || event.target.className == "close")
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
	epApp.pc.fadeIn( "producer-btns" );
}

//-----------------------------------------------
// - initialize the swiper and other events
PC.prototype.init = function(){ console.log("init called");

	// init the hero swiper
	this.heroSwiper = new HS( document.getElementById("new-product-btn").getElementsByClassName("slideshow")[0] );

	// init formatting toolbars
	ftApp.toolbars[0] = new FT(
								document.getElementById("new-product-name"),
								document.getElementById("new-product-name").parentElement.children[2],
								0
							 );
	ftApp.toolbars[1] = new FT(
								document.getElementById("new-product-sub-name"),
								document.getElementById("new-product-sub-name").parentElement.children[2],
								1
							 );
	ftApp.toolbars[2] = new FT(
								document.getElementById("new-product-description"),
								document.getElementById("new-product-description").parentElement.children[2],
								2
							 );

	// init the close button
	document.getElementById("new-product-btn").children[0].children[0]
		.addEventListener("click", epApp.pc.close, false);

	// info button event listeners
	document.getElementById("new-product-btn")
		.getElementsByClassName("glyphicon-info-sign")[0]
			.addEventListener("click", epApp.pc.infoAlert, false);
	document.getElementById("new-product-btn")
		.getElementsByClassName("glyphicon-info-sign")[1]
			.addEventListener("click", epApp.pc.infoAlert, false);

	// add event listeners to the producer-btns
	document.getElementById("producer-btns")
		.getElementsByTagName("button")[0]
			.addEventListener("click", epApp.pc.dn, false);
	document.getElementById("producer-btns")
		.getElementsByTagName("button")[1]
			.addEventListener("click", epApp.pc.dn, false);

	// product already listed event listeners
	document.getElementById("product-already-listed")
		.getElementsByTagName("button")[0]
			.addEventListener("click", epApp.pc.dn, false);
	document.getElementById("product-already-listed")
		.getElementsByTagName("button")[1]
			.addEventListener("click", epApp.pc.dn, false);
	document.getElementById("product-already-listed")
		.getElementsByTagName("button")[2]
			.addEventListener("click", epApp.pc.dn, false);
}

//-----------------------------------------------
// - function to fade in an element
PC.prototype.fadeIn = function( elem ){

	// set the fade elem
	this.fadeElem = document.getElementById(elem);

	// display the product inputs
	this.fadeElem.style.display = "block";

	// fade in product inputs
	setTimeout( epApp.pc.fi, 10 );
}

//-----------------------------------------------
// - timeout function fade in new product panel
PC.prototype.fi = function(){
	epApp.pc.fadeElem.style.opacity = 1;
}

//-----------------------------------------------
// - close new product panel
PC.prototype.close = function(){

	// #new-product-btn background to green
	document.getElementById("new-product-btn").className = "btn btn-lg btn-success"

	// hide the little x
	this.style.display = "none";

	// hide all the components
	document.getElementById("producer-btns")
		.style.display = "none";
	document.getElementById("producer-btns")
		.style.opacity = "0";
	document.getElementById("product-already-listed")
		.style.display = "none";
	document.getElementById("product-already-listed")
		.style.opacity = "0";
	document.getElementById("product-inputs")
		.style.display = "none";
	document.getElementById("product-inputs")
		.style.opacity = "0";
}

//-----------------------------------------------
// - dn (display next) - reveal next component
// - event listener producer btns "yes"
PC.prototype.dn = function(){

	// if this btn is already active
	if( this.className.substr(this.className.length - 6) == "active" )
		// do nothing
		return;

	// find the previous active button
	epApp.pc.cn = this.parentElement.getElementsByClassName("active")[0];

	if(epApp.pc.cn){

		// remove the active class
		epApp.pc.cn.className = epApp.pc.cn.className.substr(0, epApp.pc.cn.className.length - 7);

		// remove the cooresponding elem
		document.getElementById(epApp.pc.cn.dataset.elem)
			.style.display = "none";
		document.getElementById(epApp.pc.cn.dataset.elem)
			.style.opacity = "0";
	}

	// make this button active
	this.className = this.className + " active"

	// fade in the coresponding elem
	epApp.pc.fadeIn( this.dataset.elem );
}

//-----------------------------------------------
// - event listener for info buttons
// - display an alert message on click
PC.prototype.infoAlert = function(){
	rsApp.insertAlert( this.dataset.alert, 
					   this.dataset.text, 
					   this.parentElement.parentElement.children[1]
					 );
}







