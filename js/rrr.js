
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
// - @ elem => DOM element to apply effects
//
var RRR = function(el){

	/* properties */

	// keep a reference to the elements
	this.el = el;

    // starting x and y
	this.x = Math.round((el.parentElement.offsetWidth - el.offsetWidth) / 2) - 50;
	this.y = Math.round((el.parentElement.offsetHeight - el.offsetHeight) / 2) - 50;

    // trigger
    this.ticking = false;

    // transform css object
    this.transform = {
        translate: { x: this.x, y: this.y },
        scale: 1,
        angle: 0,
        rx: 0,
        ry: 0
	};

    // initial scale
    this.is;

    // initial angle
    this.ia;

    /* initializations */

    // init the mc hammer manager object
    this.mc = new Hammer.Manager(el);

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
}

//-----------------------------------------------
// - update element css transform properties
RRR.prototype.update = function (){ console.log(this.transform.translate);
    
    // set the element transform styles
    this.el.style.webkitTransform =
    this.el.style.mozTransform =
    this.el.style.transform =

	    'translate3d(' + this.transform.translate.x + 'px, ' + this.transform.translate.y + 'px, 0) ' +
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
	rMap.a.transform.translate = {
        x: rMap.a.x + e.deltaX,
        y: rMap.a.y + e.deltaY
    };

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


































