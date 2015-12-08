
//-----------------------------------------------
// - closure to hold RRR objects
var r = function(){

	// indexer
	this.i = 0;

	// hashmap of the RRR objects
	this.h = {};

	// active RRR object
	this.a = null;
}
// init
var rMap = new r();


//-----------------------------------------------
//       RRR (resize, reposition, rotate)
//     ------------------------------------
//
// - uses hammer js to detect touch events
//
// - Touch:
//	 + pan to repositon
//   + pinch to resize
//   + twist to rotate
//
// - Mouse:
//   + drag and drop to reposition
//   + drag corner & edge buttons to resize
//   + drag icon handle to rotate
//       
// - @ el => parent of .drag-btns
//
var RRR = function(el){

	/* properties */

	// style element
	this.el = el;

	// element aspect ratios
	this.ratio = el.offsetHeight / el.offsetWidth;

	// keep

    // starting x and y
	this.x = 0; // Math.round((el.parentElement.offsetWidth - el.offsetWidth) / 2);
	this.y = 0; // Math.round((el.parentElement.offsetHeight - el.offsetHeight) / 2);

    // trigger
    this.ticking = false;

    // transform css object
    this.transform = {
        x: this.x, 
        y: this.y,
        scale: 1,
        angle: 0
	};

    // initial scale
    this.is;

    // initial angle
    this.ia;

    // keep track of the centerpoint
    this.centerpoint;

    // mouse move constants, temp variable
    this.mm = el.children[0].children;

    /* initializations */

    // init the mc hammer manager object
    this.mc = new Hammer.Manager(this.mm[0]);

    // pan
    this.mc.add(new Hammer.Pan({threshold: 0, pointers: 0}));
    // rotate 
	this.mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(this.mc.get('pan'));
	// pinch
	this.mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([this.mc.get('pan'), this.mc.get('rotate')]);

	// add the event listeners
	this.mc.on("panstart panmove", this.pan);
	this.mc.on("panend", this.panEnd);
	this.mc.on("rotatestart rotatemove", this.rotate);
	this.mc.on("pinchstart pinchmove", this.pinch);

	// get the drag-btns
	for(var i = 1; i < this.mm.length - 1; i++)
		this.mm[i].addEventListener('mousedown', this.resize, false);

	this.el.addEventListener('mousedown', this.rotateMD, false);
}

//-----------------------------------------------
// - update element css transform properties
RRR.prototype.update = function (){ // console.log(this.transform.scale);
    
    // set the element transform styles
    this.el.style.webkitTransform =
    this.el.style.mozTransform =
    this.el.style.transform =

	    'translate3d(' + this.transform.x + 'px, ' + this.transform.y + 'px, 0) ' +
	    'scale(' + this.transform.scale + ', ' + this.transform.scale + ') ' +
 		'rotate3d(0,0,1,'+  this.transform.angle + 'deg)';

 	// reset the ticker
    this.ticking = false;
}

//-----------------------------------------------
// - race conditions trigger, request an update
RRR.prototype.reqUpdate = function(){
	if(!this.ticking){
		this.ticking = true;
		this.update();
	}
}

//-----------------------------------------------
// - pan touch
RRR.prototype.pan = function(e){ e.preventDefault();

	// set the translate object props
	rMap.a.transform.x = rMap.a.x + e.deltaX;
    rMap.a.transform.y = rMap.a.y + e.deltaY;
    
    // update the element
    rMap.a.reqUpdate();
}

//-----------------------------------------------
// - user stops panning, reset the data
RRR.prototype.panEnd = function(e){

	// set the new starting position
	rMap.a.x = rMap.a.x + e.deltaX;
	rMap.a.y = rMap.a.y + e.deltaY;
}

//-----------------------------------------------
// - rotate touch
// - uses RRR.ia (inital angle) property
RRR.prototype.rotate = function(e){

	if(e.type == "rotatestart")
		rMap.a.ia = rMap.a.transform.angle;

    rMap.a.transform.angle = rMap.a.ia + e.rotation; // curr

    rMap.a.reqUpdate();
}

//-----------------------------------------------
// - pinch touch
// - uses RRR.is (initial scale) property
RRR.prototype.pinch = function(e){

		if(e.type == "pinchstart")
			rMap.a.is = rMap.a.transform.scale;

	    rMap.a.transform.scale = rMap.a.is * e.scale;

	    rMap.a.reqUpdate();
}

//-----------------------------------------------
// - resize mouse down
RRR.prototype.resize = function(e){

	// get the starting position of the mouse
	rMap.a.mm = {
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
	document.addEventListener("mousemove", rMap.a[this.dataset.de], false);

	// set resize x,y position event
	document.addEventListener("mousemove", rMap.a.xy, false);

	// set resize complete event
	document.addEventListener("mouseup", rMap.a.resizeEnd, false);
}

//-----------------------------------------------
// - mousemove, resize diagonally
RRR.prototype.d = function(e){

	// if weighted deltaX > weighted deltaY
	if( (rMap.a.mm.ix - e.pageX) > rMap.a.ratio * (rMap.a.mm.iy - e.pageY) )

		// scale by width (horizontally)
		rMap.a.transform.scale = rMap.a.is * ((rMap.a.mm.Dx * (rMap.a.mm.ix - e.pageX) + rMap.a.mm.iw)/rMap.a.mm.iw);

	else

		// scale by height (vertically)
		rMap.a.transform.scale = rMap.a.is * ((rMap.a.mm.Dy * (rMap.a.mm.iy - e.pageY) + rMap.a.mm.ih)/rMap.a.mm.ih);
}

//-----------------------------------------------
// - mousemove, resize horizontally
RRR.prototype.h = function(e){ 

	// scale by delta width
	rMap.a.transform.scale = rMap.a.is * ((rMap.a.mm.Dx * (rMap.a.mm.ix - e.pageX) + rMap.a.mm.iw)/rMap.a.mm.iw);

	// update
	rMap.a.reqUpdate();
}

//-----------------------------------------------
// - mousemove, resize vertically
RRR.prototype.v = function(e){

	// scale by delta width
	rMap.a.transform.scale = rMap.a.is * ((rMap.a.mm.Dy * (rMap.a.mm.iy - e.pageY) + rMap.a.mm.ih)/rMap.a.mm.ih);

	// update
	rMap.a.reqUpdate();
}

//-----------------------------------------------
// - mousemove, reposition x,y accordingly
RRR.prototype.xy = function(e){

	// calculate the movements
	rMap.a.transform.x = rMap.a.x + (rMap.a.el.parentElement.offsetWidth - (rMap.a.transform.scale * rMap.a.el.parentElement.offsetWidth)) * rMap.a.mm.Fx;
	rMap.a.transform.y = rMap.a.y + (rMap.a.el.parentElement.offsetHeight - (rMap.a.transform.scale * rMap.a.el.parentElement.offsetHeight)) * rMap.a.mm.Fy;

	// update
	rMap.a.reqUpdate();

}

//-----------------------------------------------
// - mouseup, cancel resize events
RRR.prototype.resizeEnd = function(e){

	// remove the mousemove event
	document.removeEventListener('mousemove', rMap.a.h, false);
	document.removeEventListener('mousemove', rMap.a.v, false);
	document.removeEventListener('mousemove', rMap.a.d, false);
	document.removeEventListener('mousemove', rMap.a.xy, false);
	// remove the mouseup event
	document.removeEventListener('mouseup', rMap.a.resizeEnd, false);

	// apply the new x,y positioning
	rMap.a.x = rMap.a.transform.x;
	rMap.a.y = rMap.a.transform.y;
}

//-----------------------------------------------
// - mousedown rotate
RRR.prototype.rotateMD = function(e){
	// get the object center relative to documnet
	rMap.a.centerpoint = rMap.a.el.children[1].getBoundingClientRect(); 

	rMap.a.centerpoint = {
		x : (rMap.a.centerpoint.left + rMap.a.centerpoint.width/2),
		y : (rMap.a.centerpoint.top + rMap.a.centerpoint.height/2)
	};

	// get the initial angle relative mouse client x,y
	rMap.a.ia = Math.atan2(e.clientY - rMap.a.centerpoint.y, e.clientX - rMap.a.centerpoint.x); // * 180 / Math.PI;

	console.log(rMap.a.ia);

	// add the event listeners
	// rMap.a.el.children[0].children[9]
	// 	.addEventListener('mousemove', rMap.rotateMM, false);
	// rMap.a.el.children[0].children[9]
	// 	.addEventListener('mouseup', rMap.rotateMU, false);
}

//-----------------------------------------------
// - mousemove rotate object
RRR.prototype.rotateMM = function(e){

	// get the difference new angle relative to old
	// rMap.a.transform.angle = 

	// update

}

//-----------------------------------------------
// - mouseup end rotation
RRR.prototype.rotateMU = function(e){

	// remove the event listeners

}



















