
//-----------------------------------------------
// - closure hashmap to hold rr objects
var r = function(){
	
	// indexer
	this.i = 0;

	// hashmap of the rr objects
	this.h = {};

	// active rr object
	this.a = null;

	// client has mouse
	this.hs = true; // should be initially set to false

	// add event listener
	document.addEventListener('mousemove', this.mt, false);
}

//-----------------------------------------------
// - mouse trap, determine if user has mouse
r.prototype.mt = function(e){
  document.removeEventListener('mousemove', rMap.mt, false);
  rMap.a.hs = true;
}

// init
var rMap = new r();


//-----------------------------------------------
//       rr (resize, reposition, rotate)
//     ------------------------------------
//
// - uses hammer js to detect touch events
//
// - Touch:
//	 + pan to repositon
//   + pinch to resize
//   + twist to rotate
//
// - set mouse object
//
// - @ el => parent of .drag-btns
//
var rr = function(el){

	/* properties */

	// style element
	this.el = el;

	// element aspect ratios
	this.ratio = el.offsetHeight / el.offsetWidth;

    // starting x and y
	this.x = 0; // Math.round((el.parentElement.offsetWidth - el.offsetWidth) / 2);
	this.y = 0; // Math.round((el.parentElement.offsetHeight - el.offsetHeight) / 2);

    // transform css object
    this.transform = {
        x: this.x, 
        y: this.y,
        scale: 1,
        angle: 0
	};

    // initial scale
    this.is = 1;

    // initial angle
    this.ia = 0;

    // if the user has a mouse
    if(rMap.hs)
    	// set the mouse object
    	rMap.m = 
    	this.m = new mau5(this.el);

    /* initializations */

    // init the mc hammer manager object
    this.mc = new Hammer.Manager(this.el.children[0].children[0]);
    // pan
    this.mc.add(new Hammer.Pan({threshold: 0, pointers: 0}));

	// pan event mouse & touch
	this.mc.on("panstart panmove", this.pan);
	this.mc.on("panend", this.panEnd);

    // if user client has mouse
    // this.hs = false; 

    // if the user does not have touch
    if(! 'ontouchstart' in window) return;

    // rotate 
	this.mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(this.mc.get('pan'));
	// pinch
	this.mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([this.mc.get('pan'), this.mc.get('rotate')]);
	// set events
	this.mc.on("rotatestart rotatemove", this.rotate);
	this.mc.on("pinchstart pinchmove", this.pinch);
}

//-----------------------------------------------
// - update element css transform properties
rr.prototype.update = function (){ // console.log(this.transform.scale);
    
    // set the element transform styles
    this.el.style.webkitTransform =
    this.el.style.mozTransform =
    this.el.style.transform =

	    'translate3d(' + this.transform.x + 'px, ' + this.transform.y + 'px, 0) ' +
	    'scale(' + this.transform.scale + ', ' + this.transform.scale + ') ' +
 		'rotate3d(0,0,1,'+  this.transform.angle + 'deg)';

 	// reset the ticker
    this.ticking = false;

    // set the new vals
    jApp.nVals.layouts[jApp.layout] = this.transform;

    // prompt user to save
    jApp.deltaVals();
}

//-----------------------------------------------
// - race conditions trigger, request an update
rr.prototype.reqUpdate = function(){
	if(!this.ticking){
		this.ticking = true;
		this.update();
	}
}

//-----------------------------------------------
// - pan touch
rr.prototype.pan = function(e){ e.preventDefault();

	// set the translate object props
	rMap.a.transform.x = rMap.a.x + e.deltaX;
    rMap.a.transform.y = rMap.a.y + e.deltaY;
    
    // update the element
    rMap.a.reqUpdate();
}

//-----------------------------------------------
// - user stops panning, reset the data
rr.prototype.panEnd = function(e){

	// set the new starting position
	rMap.a.x = rMap.a.x + e.deltaX;
	rMap.a.y = rMap.a.y + e.deltaY;
}

//-----------------------------------------------
// - rotate touch
// - uses rr.ia (inital angle) property
rr.prototype.rotate = function(e){

	if(e.type == "rotatestart")
		rMap.a.ia = rMap.a.transform.angle;

    rMap.a.transform.angle = rMap.a.ia + e.rotation; // curr

    rMap.a.reqUpdate();
}

//-----------------------------------------------
// - pinch touch
// - uses rr.is (initial scale) property
rr.prototype.pinch = function(e){

		if(e.type == "pinchstart")
			rMap.a.is = rMap.a.transform.scale;

	    rMap.a.transform.scale = rMap.a.is * e.scale;

	    rMap.a.reqUpdate();
}

































//-----------------------------------------------
// 			mau5 (mouse move events)
//
// - Mouse:
//   + drag and drop to reposition
//   + drag corner & edge buttons to resize
//   + drag icon handle to rotate
//       
var mau5 = function(el){

	// the position variables & init temp variable
	this.p = el.children[0].children; //console.log(this.p);

	// the centerpoint
	this.c = null;

	// initial mouse angle
	this.ima = null;

	// get the drag-btns
	for(var i = 1; i < this.p.length - 1; i++)
		this.p[i].addEventListener('mousedown', this.resize, false);
	// rotation button
	this.p[9].addEventListener('mousedown', this.rotateMD, false);
}



//-----------------------------------------------
// - resize mouse down
mau5.prototype.resize = function(e){

	// get the starting position of the mouse
	rMap.m.p = {
    	ix : e.pageX, 		  // initial mouse position
    	iy : e.pageY,
    	iw : this.parentElement.offsetWidth, // initial dimensions
    	ih : this.parentElement.offsetHeight,
    	Fx : parseFloat(this.dataset.fx), // functional
    	Fy : parseFloat(this.dataset.fy),
    	Dx : parseInt(this.dataset.dx), // directional
    	Dy : parseInt(this.dataset.dy)
    };

    // set the initial scale
    rMap.a.is = rMap.a.transform.scale;

	// set the correct directional event
	document.addEventListener("mousemove", rMap.m[this.dataset.de], false);

	// set resize x,y position event
	document.addEventListener("mousemove", rMap.m.xy, false);

	// set resize complete event
	document.addEventListener("mouseup", rMap.m.resizeEnd, false);
}

//-----------------------------------------------
// - mousemove, resize diagonally
mau5.prototype.d = function(e){

	// if weighted deltaX > weighted deltaY
	if( (rMap.m.p.ix - e.pageX) > rMap.a.ratio * (rMap.m.p.iy - e.pageY) )

		// scale by width (horizontally)
		rMap.a.transform.scale = rMap.a.is * ((rMap.m.p.Dx * (rMap.m.p.ix - e.pageX) + rMap.m.p.iw)/rMap.m.p.iw);

	else

		// scale by height (vertically)
		rMap.a.transform.scale = rMap.a.is * ((rMap.m.p.Dy * (rMap.m.p.iy - e.pageY) + rMap.m.p.ih)/rMap.m.p.ih);
}

//-----------------------------------------------
// - mousemove, resize horizontally
mau5.prototype.h = function(e){ 

	// scale by delta width
	rMap.a.transform.scale = rMap.a.is * ((rMap.m.p.Dx * (rMap.m.p.ix - e.pageX) + rMap.m.p.iw)/rMap.m.p.iw);

	// update
	rMap.a.reqUpdate();
}

//-----------------------------------------------
// - mousemove, resize vertically
mau5.prototype.v = function(e){

	// scale by delta width
	rMap.a.transform.scale = rMap.a.is * ((rMap.m.p.Dy * (rMap.m.p.iy - e.pageY) + rMap.m.p.ih)/rMap.m.p.ih);

	// update
	rMap.a.reqUpdate();
}

//-----------------------------------------------
// - mousemove, reposition x,y accordingly
mau5.prototype.xy = function(e){

	// calculate the movements
	rMap.a.transform.x = rMap.a.x + (rMap.a.el.parentElement.offsetWidth - (rMap.a.transform.scale * rMap.a.el.parentElement.offsetWidth)) * rMap.m.p.Fx;
	rMap.a.transform.y = rMap.a.y + (rMap.a.el.parentElement.offsetHeight - (rMap.a.transform.scale * rMap.a.el.parentElement.offsetHeight)) * rMap.m.p.Fy;

	// update
	rMap.a.reqUpdate();

}

//-----------------------------------------------
// - mouseup, cancel resize events
mau5.prototype.resizeEnd = function(e){

	// remove the mousemove event
	document.removeEventListener('mousemove', rMap.m.h, false);
	document.removeEventListener('mousemove', rMap.m.v, false);
	document.removeEventListener('mousemove', rMap.m.d, false);
	document.removeEventListener('mousemove', rMap.m.xy, false);
	// remove the mouseup event
	document.removeEventListener('mouseup', rMap.a.resizeEnd, false);

	// apply the new x,y positioning
	rMap.a.x = rMap.a.transform.x;
	rMap.a.y = rMap.a.transform.y;
}

//-----------------------------------------------
// - mousedown rotate
mau5.prototype.rotateMD = function(e){

	// get the initial angle
	rMap.a.ia = rMap.a.transform.angle;

	// get the object m.c relative to the window
	rMap.m.c = rMap.a.el.children[1].getBoundingClientRect(); 
	rMap.m.c = {
		x : (rMap.m.c.left + rMap.m.c.width/2),
		y : (rMap.m.c.top + rMap.m.c.height/2)
	};

	// get the initial client angle relative mouse client x,y
	rMap.m.ima = Math.atan2(e.clientY - rMap.m.c.y, e.clientX - rMap.m.c.x); // * 180 / Math.PI;

	// console.log('Here is the initial radian value: ' + rMap.m.ia);

	// add the event listeners
	document.addEventListener('mousemove', rMap.m.rotateMM, false);
	document.addEventListener('mouseup', rMap.m.rotateMU, false);
}

//-----------------------------------------------
// - mousemove rotate object

// - formula:
//    			initial object angle
//			  + (   initial mouse angle
//				  - delta degree from object 
//					centerpoint
//				)

// - initial angle
mau5.prototype.rotateMM = function(e){

	// new angle
	rMap.a.transform.angle = rMap.a.ia + 
							 (
							 	( 	rMap.m.ima - 
							 		Math.atan2(	e.clientY - rMap.m.c.y, e.clientX - rMap.m.c.x)
							 	) * -180 / Math.PI
							 );
	// reqUpdate
	rMap.a.reqUpdate();
}

//-----------------------------------------------
// - mouseup end rotation
mau5.prototype.rotateMU = function(e){

	console.log(rMap.m.transform);

	// remove the event listeners
	document.removeEventListener('mousemove', rMap.m.rotateMM, false);
	document.removeEventListener('mousemove', rMap.a.mrotateMU, false);
}


















