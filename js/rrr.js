
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
    this.x = Math.round((el.parentElement.offsetWidth - el.offsetWidth) / 2);
    this.y = Math.round((el.parentElement.offsetWidth - el.offsetHeight) / 2);

    // trigger
    this.ticking = 0;

    // transform css object
    this.transform;

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
	this.mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(mc.get('pan'));
	// pinch
	this.mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([mc.get('pan'), mc.get('rotate')]);

	// add the event listeners
	this.mc.on("panstart panmove", this.pan);
	this.mc.on("rotatestart rotatemove", this.rotate);
	this.mc.on("pinchstart pinchmove", this.pinch);

	// polyfill
	this.reqFrame = (function () {
	    return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function (callback) {
	        window.setTimeout(callback, 1000 / 60);
	    };
	})();
}

//-----------------------------------------------
// - update element css transform properties
RRR.prototype.update = function (){
    
    // set the element transform styles
    this.el.style.webkitTransform =
    this.el.style.mozTransform =
    this.el.style.transform =

	    'translate3d(' + transform.translate.x + 'px, ' + transform.translate.y + 'px, 0) ' +
	    'scale(' + transform.scale + ', ' + transform.scale + ') ' +
 		'rotate3d('+ transform.rx +','+ transform.ry +','+ transform.rz +','+  transform.angle + 'deg)'

 	// reset the ticker
    this.ticking = 0;
}

//-----------------------------------------------
// - request an update of the css
RRR.prototype.reqUpdate = function(){
	if(!ticking){
		this.reqFrame(this.update);
		this.ticking = 1;
	}
}

//-----------------------------------------------
// - pan touch
RRR.prototype.pan = function(e){

	rMap.a.transform.translate = {
        x: rMap.a.x + e.deltaX,
        y: rMap.a.y + e.deltaY
    };

    rMap.a.reqUpdate();
}

//-----------------------------------------------
// - rotate touch
// - uses RRR.ia (inital angle) property
RRR.prototype.rotate = function(e){

	if(e.type == 'rotatestart')
	        rMap.a.ia = transform.angle || 0;

	    rMap.a.transform.rz = 1;
	    rMap.a.transform.angle = rMap.a.ia + e.rotation;

	    rMap.a.reqUpdate();
}

//-----------------------------------------------
// - pinch touch
// - uses RRR.is (initial scale) property
RRR.prototype.pinch = function(e){

	if(e.type == 'pinchstart')
		rMap.a.is = rMap.a.transform.scale || 1;
	
	rMap.a.transform.scale = rMap.a.is * e.scale;
	
	rMap.a.reqUpdate();
}


































