
//-----------------------------------------------
// - closure to hold modal objects
var modApp = function(){

	// keep track of the active modal
	this.active = null;
}

var m = new modApp();



//-----------------------------------------------
//
//		   		 	  modal
//			   		---------
//
// - initialize modal HTML component
//
// - set modal header, body, footer
//
// - set callback
//
// - add a single modal to a page, or as many as
//   you need.
//
//-----------------------------------------------

/* CONSTRUCTOR */

//-----------------------------------------------
// - @ elem -> modal elem
var modal = function( elem ){

	/* properties */

	// save the element
	this.elem = elem;

	/* init */

	// add event listeners to the modal buttons
	this.elem.getElementsByTagName("button")[0]
				.addEventListener("click", this.hide, false);

	this.elem.getElementsByTagName("button")[1]
				.addEventListener("click", this.hide, false);

	this.elem.getElementsByTagName("button")[2]
				.addEventListener("click", this.hide, false);

}


/* METHODS */

//-----------------------------------------------
// - display the modal
modal.prototype.launch = function(){
	// set the active modal
	m.active = this;
	// show the modal
	this.elem.style.display = "block";
	// timeout animate
	setTimeout( m.active.animateIn, 1 );
}
//-----------------------------------------------
// - timeout function
// - animate the modal after displaying
modal.prototype.animateIn = function(){
	m.active.elem.style.opacity = "1";
	m.active.elem.children[0].style.top = "100px";
}

//-----------------------------------------------
// - hide the modal
// - trigger the callback if required
modal.prototype.hide = function(){
	// hide the modal
	m.active.elem.style.opacity = "0";
	m.active.elem.children[0].style.top = "-200px";
	setTimeout( m.active.animateOut, 400);
}
//-----------------------------------------------
// - timeout function
// - hide the modal after animating
modal.prototype.animateOut = function(){
	m.active.elem.style.display = "none";
}








