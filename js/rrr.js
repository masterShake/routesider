
//-----------------------------------------------
// - closure hashmap to hold rr objects
var r = function(){

	// hashmap of the rr objects
	this.h = {};
	// temp variable, all dragable elems
	this.u = dragCanvas.children;

	// set index - number of rotating elements + bg
	this.i = 

	// set z index - starting at 1
	this.z = this.u.length;

	// active rr object
	this.a = null;

	// active mau5 object
	this.m = null;

	// client has mouse
	this.hs = false; // should be initially set to false

	// add event listener
	document.addEventListener('mousemove', this.mt, false);
}

//-----------------------------------------------
// - mouse trap, determine if user has mouse
r.prototype.mt = function(e){ e.preventDefault();
  	// remove this event listener
  	document.removeEventListener('mousemove', rm.mt, false);
  	// set has mouse property to true
  	rm.hs = true;
  	// loop through the hashmap
  	for(var x in rm.h)
  		// create the mau5 object
  		rm.h[x].m = new mau5(rm.h[x].el);
}



//-----------------------------------------------
// - create new css style rules
// - insert into 7th stylesheet
// - tablet @media > 768px
// - desktop @media > 1200px
// - el --> the element
// - callback --> callback function
r.prototype.newRules = function(el, callback){

	// create & activate the rr object
	this.i++;
	this.z++;
	this.h[this.i] = new rr(el);
	this.a = this.h[this.i];

	// default: scale 1, rotate 0, element centered
	this.u = '#dragCanvas>div:nth-child('+this.i+')'+
				'{ transform: scale(1,1) rotate3d(0,0,1,0deg); ' +
				'  left: calc(50% - '+(el.offsetWidth/2)+'px);' +
				'  top: calc(50% - '+(el.offsetHeight/2)+'px);' +
				'  z-index: '+this.z+';' +
				'  display: block;}';
	// mobile
	document.styleSheets[7]
		.insertRule(this.u, this.i);
	// tablet
	document.styleSheets[7].cssRules[this.i + 1]
		.insertRule(this.u, this.i);
	// desktop
	document.styleSheets[7].cssRules[this.i + 2]
		.insertRule(this.u, this.i);

	// attribtue referrence to rr index
	el.setAttribute('data-r', this.i);

	callback(this.i);
}

//-----------------------------------------------
// - for testing only
r.prototype.getRules = function(){

	console.log('mobile rules');
	for(var j = 0; j <= this.i; j++)
		console.log(document.styleSheets[7].cssRules[j].style);

	console.log('tablet rules');
	for(var j = 0; j <= this.i; j++)
		console.log(document.styleSheets[7].cssRules[this.i + 1].cssRules[j].style);

	console.log('desktop rules');
	for(var j = 0; j <= this.i; j++)
		console.log(document.styleSheets[7].cssRules[this.i + 2].cssRules[j].style);

}









































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
    this.t = {
        x: this.x, 
        y: this.y,
        s: 1,
        a: 0
	};

    // initial scale
    this.is = 1;

    // initial angle
    this.ia = 0;

    // ticking race condition trigger
    this.tck = false;

    // property to hold mau5 object just in case
    this.m = null;
    // if the user has a mouse
    if(rm.hs){
    	// set the mouse object
    	rm.m = 
    	this.m = new mau5(this.el);
    }

    /* initializations */

    // extract the transform values from the matrix
    this.extractMatrix();

    // init the mc hammer manager object
    this.mc = new Hammer.Manager(this.el.children[1].children[0]);
    // pan
    this.mc.add(new Hammer.Pan({threshold: 0, pointers: 0}));

	// pan event mouse & touch
	this.mc.on("panstart panmove", this.p);
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
	this.mc.on("rotatestart rotatemove", this.r);
	this.mc.on("pinchstart pinchmove", this.q);
}

//-----------------------------------------------
// - extract the transform properties from the
//   matrix
rr.prototype.extractMatrix = function(){

	// get the matrix properties, use ia as temp var
	this.ia = window.getComputedStyle(this.el, null)
				.getPropertyValue('transform') || this.el.style.transform; // console.log(this.ia);

	if(this.ia == 'none')
		this.ia = this.el.style.transform;

	// convert the matrix to a list array
	this.ia = this.ia.split('(')[1];
	this.ia = this.ia.split(')')[0];
	this.ia = this.ia.split(',');

	// get the translate
	this.x = 
	this.t.x = this.el.offsetLeft;
	this.y = 
	this.t.y = this.el.offsetTop;

	// get the scale
	this.is = 
	this.t.s = Math.round(Math.sqrt(this.ia[0]*this.ia[0] + this.ia[1]*this.ia[1]) * 100) / 100;

	// get the angle
	this.ia = 
	this.t.a = Math.round(Math.asin(this.ia[1]/this.is) * (180/Math.PI));
}

//-----------------------------------------------
// - update element css transform properties
rr.prototype.u = function (){ // console.log(this.t.s);
    
	// change the css rule
	// document.styleSheets[7].rules[0].style.transform = 

    // set the element transform styles
    this.el.style.webkitTransform =
    this.el.style.mozTransform =
    this.el.style.transform =

	    // 'translate(' + this.t.x + 'px, ' + this.t.y + 'px) ' +
	    'scale(' + this.t.s + ', ' + this.t.s + ') ' +
 		'rotate3d(0,0,1,'+  this.t.a + 'deg)';

 	this.el.style.left = (this.t.x/this.el.parentElement.offsetWidth)*100+'%';
 	this.el.style.top = (this.t.y/this.el.parentElement.offsetHeight)*100+'%';

 	// reset the ticker
    this.tck = false;
}

//-----------------------------------------------
// - race conditions trigger, request an update
rr.prototype.ru = function(){
	if(!this.tck){
		this.tck = true;
		this.u();
	}
}

//-----------------------------------------------
// - pan touch
rr.prototype.p = function(e){ e.preventDefault();

	// set the translate object props
	rm.a.t.x = rm.a.x + e.deltaX;
    rm.a.t.y = rm.a.y + e.deltaY;
    
    // update the element
    rm.a.ru();
}

//-----------------------------------------------
// - user stops panning, reset the data
rr.prototype.panEnd = function(e){

	// set the new starting position
	rm.a.x = rm.a.x + e.deltaX;
	rm.a.y = rm.a.y + e.deltaY;
 	
 	// set the positioning and layout
 	jApp.nVals[as][rm.a.el.dataset.key].layout[layout.a].x = (rm.a.t.x/rm.a.el.parentElement.offsetWidth)*100;
 	jApp.nVals[as][rm.a.el.dataset.key].layout[layout.a].y = (rm.a.t.y/rm.a.el.parentElement.offsetHeight)*100;
 	jApp.nVals[as][rm.a.el.dataset.key].layout[layout.a].s = rm.a.t.s;
 	jApp.nVals[as][rm.a.el.dataset.key].layout[layout.a].a = rm.a.t.a;

	// set the css stylesheet
	rm.a.setStyleSheet();

	// values changed
	jApp.deltaVals();
}

//-----------------------------------------------
// - rotate touch
// - uses rr.ia (inital angle) property
rr.prototype.r = function(e){

	if(e.type == "rotatestart")
		rm.a.ia = rm.a.t.a;

    rm.a.t.a = rm.a.ia + e.rotation; // curr

    rm.a.ru();
}

//-----------------------------------------------
// - pinch touch
// - uses rr.is (initial scale) property
rr.prototype.q = function(e){

		if(e.type == "pinchstart")
			rm.a.is = rm.a.t.s;

	    rm.a.t.s = rm.a.is * e.scale;

	    rm.a.ru();
}

//-----------------------------------------------
// - set the stylesheet rule based on preview layout
rr.prototype.setStyleSheet = function(){
	
	// if mobile
	if(layout.a == 'mobile'){
		document.styleSheets[7].cssRules[this.el.dataset.r].style.transform = 
			// 'translate(' + this.t.x + 'px, ' + this.t.y + 'px) ' +
		    'scale(' + this.t.s + ', ' + this.t.s + ') ' +
	 		'rotate3d(0,0,1,'+  this.t.a + 'deg)';
	 	document.styleSheets[7].cssRules[this.el.dataset.r].style.left = (this.t.x/this.el.parentElement.offsetWidth)*100+'%';
	 	document.styleSheets[7].cssRules[this.el.dataset.r].style.top = (this.t.y/this.el.parentElement.offsetHeight)*100+'%';
	}

	// if tablet
	else if(layout.a == 'tablet'){
		document.styleSheets[7].cssRules[rm.i + 1].cssRules[this.el.dataset.r].style.transform =
		    'scale(' + this.t.s + ', ' + this.t.s + ') ' +
	 		'rotate3d(0,0,1,'+  this.t.a + 'deg)';
	 	document.styleSheets[7].cssRules[rm.i + 1].cssRules[this.el.dataset.r].style.left = (this.t.x/this.el.parentElement.offsetWidth)*100+'%';
	 	document.styleSheets[7].cssRules[rm.i + 1].cssRules[this.el.dataset.r].style.top = (this.t.y/this.el.parentElement.offsetHeight)*100+'%';
	}

	// if desktop
	else if(layout.a == 'desktop'){
		document.styleSheets[7].cssRules[rm.i + 2].cssRules[this.el.dataset.r].style.transform = 
			// 'translate(' + this.t.x + 'px, ' + this.t.y + 'px) ' +
		    'scale(' + this.t.s + ', ' + this.t.s + ') ' +
	 		'rotate3d(0,0,1,'+  this.t.a + 'deg)';
	 	document.styleSheets[7].cssRules[rm.i + 2].cssRules[this.el.dataset.r].style.left = (this.t.x/this.el.parentElement.offsetWidth)*100+'%';
	 	document.styleSheets[7].cssRules[rm.i + 2].cssRules[this.el.dataset.r].style.top = (this.t.y/this.el.parentElement.offsetHeight)*100+'%';
	}
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
	this.p = el.children[1].children; //console.log(this.p);

	// the centerpoint
	this.c = null;

	// initial mouse angle
	this.ima = null;

	// get the drag-btns
	for(var i = 1; i < this.p.length - 1; i++)
		this.p[i].addEventListener('mousedown', this.s, false);
	// rotation button
	this.p[9].addEventListener('mousedown', this.rmd, false);
}



//-----------------------------------------------
// - resize mouse down
mau5.prototype.s = function(e){ console.log('mousedown resize');

	// get the starting position of the mouse
	rm.m.p = {
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
    rm.a.is = rm.a.t.s;

	// set the correct directional event
	document.addEventListener("mousemove", rm.m[this.dataset.de], false);

	// set resize x,y position event
	document.addEventListener("mousemove", rm.m.xy, false);

	// set resize end event
	document.addEventListener("mouseup", rm.m.re, false);
}

//-----------------------------------------------
// - mousemove, resize diagonally
mau5.prototype.d = function(e){

	// if weighted deltaX > weighted deltaY
	if( (rm.m.p.ix - e.pageX) > rm.a.ratio * (rm.m.p.iy - e.pageY) )

		// scale by width (horizontally)
		rm.a.t.s = rm.a.is * ((rm.m.p.Dx * (rm.m.p.ix - e.pageX) + rm.m.p.iw)/rm.m.p.iw);

	else

		// scale by height (vertically)
		rm.a.t.s = rm.a.is * ((rm.m.p.Dy * (rm.m.p.iy - e.pageY) + rm.m.p.ih)/rm.m.p.ih);
}

//-----------------------------------------------
// - mousemove, resize horizontally
mau5.prototype.h = function(e){ 

	// scale by delta width
	rm.a.t.s = rm.a.is * ((rm.m.p.Dx * (rm.m.p.ix - e.pageX) + rm.m.p.iw)/rm.m.p.iw);

	// update
	rm.a.ru();
}

//-----------------------------------------------
// - mousemove, resize vertically
mau5.prototype.v = function(e){

	// scale by delta width
	rm.a.t.s = rm.a.is * ((rm.m.p.Dy * (rm.m.p.iy - e.pageY) + rm.m.p.ih)/rm.m.p.ih);

	// update
	rm.a.ru();
}

//-----------------------------------------------
// - mousemove, reposition x,y accordingly
mau5.prototype.xy = function(e){

	// calculate the movements
	rm.a.t.x = rm.a.x + (rm.a.el.parentElement.offsetWidth - (rm.a.t.s * rm.a.el.parentElement.offsetWidth)) * rm.m.p.Fx;
	rm.a.t.y = rm.a.y + (rm.a.el.parentElement.offsetHeight - (rm.a.t.s * rm.a.el.parentElement.offsetHeight)) * rm.m.p.Fy;

	// update
	rm.a.ru();

}

//-----------------------------------------------
// - mouseup, cancel resize events
mau5.prototype.re = function(e){

	// remove the mousemove event
	document.removeEventListener('mousemove', rm.m.h, false);
	document.removeEventListener('mousemove', rm.m.v, false);
	document.removeEventListener('mousemove', rm.m.d, false);
	document.removeEventListener('mousemove', rm.m.xy, false);
	// remove the mouseup event
	document.removeEventListener('mouseup', rm.a.re, false);

	// apply the new x,y positioning
	rm.a.x = rm.a.t.x;
	rm.a.y = rm.a.t.y;

	// apply the new values
	if(as == 'bg'){
		jApp.nVals.bg.layout[layout.a].x = (rm.a.t.x/rm.a.el.parentElement.offsetWidth)*100;
	 	jApp.nVals.bg.layout[layout.a].y = (rm.a.t.y/rm.a.el.parentElement.offsetHeight)*100;
		jApp.nVals.bg.layout[layout.a].s = rm.a.t.s;
	}else{
		jApp.nVals[as][rm.a.el.dataset.key].layout[layout.a].x = (rm.a.t.x/rm.a.el.parentElement.offsetWidth)*100;
	 	jApp.nVals[as][rm.a.el.dataset.key].layout[layout.a].y = (rm.a.t.y/rm.a.el.parentElement.offsetHeight)*100;
		jApp.nVals[as][rm.a.el.dataset.key].layout[layout.a].s = rm.a.t.s;
	}

	// update the stylesheet
	rm.a.setStyleSheet();

	// prompt user to save
	jApp.deltaVals();

}

//-----------------------------------------------
// - mousedown rotate
mau5.prototype.rmd = function(e){

	// get the initial angle
	rm.a.ia = rm.a.t.a;

	// get the object m.c relative to the window
	rm.m.c = rm.a.el.children[1].getBoundingClientRect(); 
	rm.m.c = {
		x : (rm.m.c.left + rm.m.c.width/2),
		y : (rm.m.c.top + rm.m.c.height/2)
	};

	// get the initial client angle relative mouse client x,y
	rm.m.ima = Math.atan2(e.clientY - rm.m.c.y, e.clientX - rm.m.c.x); // * 180 / Math.PI;

	// console.log('Here is the initial radian value: ' + rm.m.ia);

	// add the event listeners
	document.addEventListener('mousemove', rm.m.rmm, false);
	document.addEventListener('mouseup', rm.m.rmu, false);
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
mau5.prototype.rmm = function(e){

	// new angle
	rm.a.t.a = rm.a.ia + 
							 (
							 	( 	rm.m.ima - 
							 		Math.atan2(	e.clientY - rm.m.c.y, e.clientX - rm.m.c.x)
							 	) * -180 / Math.PI
							 );
	// ru
	rm.a.ru();
}

//-----------------------------------------------
// - mouseup end rotation
mau5.prototype.rmu = function(e){

	// remove the event listeners
	document.removeEventListener('mousemove', rm.m.rmm, false);
	document.removeEventListener('mouseup', rm.m.rmu, false);

	// set the new angle 
	if(as == 'bg')
		jApp.nVals.bg.layout[layout.a].a = rm.a.t.a;
	else
		jApp.nVals[as][rm.a.el.dataset.key].layout[layout.a].a = rm.a.t.a;
	// update the stylesheet
	rm.a.setStyleSheet();

	// alert that the values have change
	jApp.deltaVals();
}





















// init
var rm = new r();

// set existing

// loop through the dragable children
for(var i = 0; i < rm.i; i++){
	// create new rr elements
	rm.h[i+1] = new rr(rm.u[i]);

}


















