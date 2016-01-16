
/* global variables */

var jApp,	// Jumbo app
	as,     // active state
	layout, // layout class
	modal,	// confirmation modal 
	cm,     // component manager
	cs,		// component styler
	ts,		// text styler
	ss,		// shadow styler
	tc,		// text color
	bg,		// background
	tbs,	// textbox
	imgs,	// image overlay
	btns; 	// button

//-----------------------------------------------
//				Jumbo (root node)			
//			  ---------------------
//
// - manage background options btn classes
//
// - control active btn classes in toolbars
//
// - keep track of/detect changes made
//
// - prompt save, save css
//
// - ajax call
//
// - save success message
//
//-----------------------------------------------

/* CONSTRUCTOR */

Jumbo = function(){

	/* properties */

	// keep track of initial values
	this.iVals = JSON.parse( document.getElementById("i-vals").value );

	// keep track of new values (identical at first)
	this.nVals = JSON.parse( document.getElementById("i-vals").value );

	// keep track of active control panel
	this.panel = -1;

	// temp variable
	this.t = null;

	/* initializations */

	// get all the toolbars, add actBtn event
	this.t = document.getElementsByClassName("tb"); // console.log(this.t);

	// loop through the opts-toolbars
	for(var i = 0; i < this.t.length; i++){

		// loop through all the btns in the toolbar
		for(var j = 0; j < this.t[i].children.length; j++){

			// add event listener to each of the btns
			this.t[i].children[j].addEventListener("click", this.actBtn, false);
		}
	}

	// event listener activation switch
	document.getElementById("onoff")
		.addEventListener("change", this.jumboVis, false);

	// get the jumbo toolbar btns
	this.t = jumboToolbar.children[0].children[1].children;
	// apply the event listeners to jumbo toolbar
	this.t[0].addEventListener("click", this.togOpts, false);
	this.t[1].addEventListener("click", this.togOpts, false);
	this.t[2].addEventListener("click", this.togOpts, false);
	this.t[3].addEventListener("click", this.togOpts, false);

	// get all buttons that toggle control panels
	this.t = document.querySelectorAll('[data-panel]');
	// loop through the buttons
	for(var i = 0; i < this.t.length; i++)
		// apply the even listener
		this.t[i].addEventListener("click", this.togCpan, false);

	// remove the event listener from btn #4
	if(this.t[4].className.substr(-8) == 'inactive')
		this.t[4].removeEventListener('click', this.togCpan, false);

	// add event listener to the save btn
	save1.children[1].addEventListener("click", this.save, false);
	save2.children[0].addEventListener("click", this.save, false);

	// close the save alert
	save1.children[0].addEventListener("click", this.xSA, false);

	// init other page objects, avoid race conditions
	// init background editor
	bg = this.bg = new BG();
	// init textbox editor
	tbs = this.tbs = new TB();
	// init image overlay editor
	imgs = this.imgs = new IO();
	// init button editor
	// btns = this.btns = new BTN();
}

/* METHODS */



//-----------------------------------------------
// - event to add/remove active btn class
Jumbo.prototype.actBtn = function(){

	// if this button is already active
	if( this.className.substr(this.className.length - 6) == "active"){

		// remove active class
		this.className = this.className.substr(0, this.className.length - 7);

		return false;
	}

	// look for another active btn
	jApp.temp = this.parentElement.getElementsByClassName("active");

	// if there is another active btn
	if(jApp.temp.length) 
		// remove its active class
		jApp.temp[0].className = jApp.temp[0].className
									.substr(0, jApp.temp[0].className.length - 7);

	// activate this btn
	this.className = this.className + " active";
}

//-----------------------------------------------
// - toggle an options toolbar
Jumbo.prototype.togOpts = function(e){ e.preventDefault();

	// if there is an open/active options toolbar
	if(as){

		// close it
		jApp[as].close();

		// if a control panel is open
		if(jApp.panel >= 0){

			// close it
			document.getElementById(as+"Cpanels").children[jApp.panel]
				.style.display = "none";

			// show the opts title
			document.getElementById(as + "Props").children[1]
				.style.display = "block";

			// reset the panel property
			jApp.panel = -1;

		}

		// hide the open options toolbar
		document.getElementById(as + "Props").style.display = "none";

	}

	// if this options toolbar was already open
	if(this.dataset.a == as){

		// reset the a property to null
		as = null;

		return;
	}

	// set the a property
	as = this.dataset.a;

	// open the selected properties options toolbar
	document.getElementById(this.dataset.a + "Props").style.display = "block";
}

//-----------------------------------------------
// - toggle an options control panel
Jumbo.prototype.togCpan = function(){

	// if this button is inactive, do nothing
	// if(this.className.substr(-8) == 'inactive') return;

	// if there is an open/active control panel
	if(jApp.panel >= 0)

		// close it
		document.getElementById(as+"Cpanels").children[jApp.panel]
			.style.display = "none";
	
	//-----------------------------------------------
	// - if this button has no associated control 
	//   panel, or this panel was already open
	if(!this.dataset.panel || this.dataset.panel == jApp.panel){

		// show the opts title
		document.getElementById(as + "Props").children[1]
			.style.display = "block";

		// reset the active panel
		jApp.panel = -1;

		return;
	}

	// set the new active panel
	jApp.panel = this.dataset.panel;

	// hide the opts title
	document.getElementById(as + "Props").children[1]
		.style.display = "none";

	// display the control panel
	jApp.showPan(this);
}

//-----------------------------------------------
// - set the styles for the selected control
//   panel and display it
// - elem => button element that was clicked
Jumbo.prototype.showPan = function(elem){ // console.log(elem.offsetLeft);console.log(elem.parentElement.offsetLeft);console.log(elem.parentElement.parentElement.offsetLeft);

	// get the control panel
	this.t = document.getElementById(as + "Cpanels").children[elem.dataset.panel];

	// if elem button is in the top row, do nothing
	if(!elem.parentElement.offsetTop) return;

	// set the bottom margin
	this.t.style.marginBottom = '-' + (elem.parentElement.offsetTop - elem.parentElement.parentElement.offsetTop - 9) + 'px';

	// if elem is a mobile device
	if(layout.a == 'mobile'){
		// set the arrow position
		this.t.children[2].style.left = (elem.offsetLeft + elem.parentElement.offsetLeft + 5) + 'px';
		// display the control panel
		this.t.style.display = 'block';
		// end function
		return;	
	}

	// display the control panel
	this.t.style.display = 'block';
	// calculate the margin left of the control panel
	layout.t = (elem.offsetLeft + elem.parentElement.offsetLeft - elem.parentElement.parentElement.offsetLeft + 15);

	// if the control panel is too large
	if(this.t.offsetWidth + (layout.t - this.t.offsetWidth/2) > this.t.parentElement.offsetWidth){ console.log('too big');
		this.t.style.marginLeft = (this.t.parentElement.offsetWidth - this.t.offsetWidth) + 'px'; 
		this.t.children[2].style.left = layout.t - (this.t.parentElement.offsetWidth - this.t.offsetWidth) + 'px'; 
	// if margin left is too low
	}else if((layout.t - this.t.offsetWidth/2) < 0){ console.log('too far left');
		this.t.style.marginLeft = '0';
		this.t.children[2].style.left = layout.t + 'px';

	// if the margin is too high
	}else if((layout.t - this.t.offsetWidth/2) > (this.t.parentElement.offsetWidth - this.t.offsetWidth)){ console.log('too far right');
		this.t.style.marginLeft = (layout.t - this.t.offsetWidth/2) - (this.t.parentElement.offsetWidth - this.t.offsetWidth) + 'px';
		this.t.children[2].style.left = layout.t - (this.t.parentElement.offsetWidth - this.t.offsetWidth) + 'px';
	
	// else if everything fits
	}else{ console.log('fits just fine');
		this.t.style.marginLeft = (layout.t - this.t.offsetWidth/2) + 'px';
		this.t.children[2].style.left = (this.t.offsetWidth/2) + 'px';
	}
}

//-----------------------------------------------
// - on/off switch jumbo visible change event
Jumbo.prototype.jumboVis = function(){
	jApp.nVals.active = (this.checked) ? 1 : 0;
	jApp.deltaVals();
}

//-----------------------------------------------
// - determine if the user has made any changes
// - returns true if changed, false if unchanged
Jumbo.prototype.deltaVals = function(){
	
	// if the values have not changed
	if( JSON.stringify(this.iVals) == JSON.stringify(this.nVals)){
		// && save2.className != "well" ){

		// hide save alert
		save1.style.display = "none";
		save1.style.opacity = "0";

		// remove the alert class from the well
		save2.className = "well";

		// remove the event listener from bottom save button
		save2.children[0].removeEventListener("click", jApp.save, false);

	}else if(save2.className != "well info"){

		// display save alert
		save1.className = "alert alert-info";
		save1.style.display = "block";
		save1.children[0].style.display = "none";
		setTimeout(jApp.showSA, 50);

		// set the save class
		save2.className = "well info";
	}
	// change the inner HTML of the buttons
	save1.children[1].innerHTML = "save";
	save2.children[0].innerHTML = "save";
}

//-----------------------------------------------
// - show save alert fade in timeout function
Jumbo.prototype.showSA = function(){
	save1.style.opacity = "1";
}

//-----------------------------------------------
// - ajax save changes
Jumbo.prototype.save = function(){

	// if the save propmt does not have the proper class
	if(this.parentElement.className.substr(-4) != "info")
			return; // do nothing

	// show hourglass inside save button
	save1.children[1].innerHTML = '<span class="glyphicon glyphicon-hourglass loading" style="color:#fff;"></span>';
	save2.children[0].innerHTML = '<span class="glyphicon glyphicon-hourglass loading" style="color:#fff;"></span>';

	// make save ajax call
	rsApp.ajax({ 
		method   : "POST",
		url      : document.URL,
		params   : "json=" + JSON.stringify(jApp.nVals),
		callback : jApp.saveCB
	});
}

//-----------------------------------------------
// close save alert
Jumbo.prototype.xSA = function(){
	this.parentElement.style.opacity = "0";
	this.parentElement.style.display = "none";
	save2.className = "well";
	save1.children[1].innerHTML = "save";
	save2.children[0].innerHTML = "save";
}

//-----------------------------------------------
// - save callback
Jumbo.prototype.saveCB = function(r){ console.log(r);

	// if the save was successful
	if(r == 1){

		// set the initial values to match the new values
		jApp.iVals = JSON.parse(JSON.stringify(jApp.nVals));

		// change classes
		save1.className = "alert alert-success";
		save2.className = "well success";

		// change the button html
		save1.children[1].innerHTML = 'saved!';
		save2.children[0].innerHTML = 'saved!';

		// show the closable x
		save1.children[0].style.display = "block";

	}
}



































//-----------------------------------------------
//				 L (layout class)			
//			   --------------------
//
// - keep track of active layout state
//
// - set the dimensions of preview canvas
//
// - change layout state
//
//-----------------------------------------------

var L = function(){

	/* properties */

	// active layout state
	this.a = 'mobile';

	/* initialize */

	// set the dimensions of the preview canvas
	this.init();

	// init the layout view dropdown
	layoutD1.children[0].addEventListener("click", rsApp.toggleDropdown, false);
	layoutD2.children[0].addEventListener("click", rsApp.toggleDropdown, false);

	// temp variable, init the change layout event listeners
	this.t = layoutD1.getElementsByTagName("a");
	this.t[0].addEventListener("click", this.lay, false);
	this.t[1].addEventListener("click", this.lay, false);
	this.t[2].addEventListener("click", this.lay, false);
	this.t = layoutD2.getElementsByTagName("a");
	this.t[0].addEventListener("click", this.lay, false);
	this.t[1].addEventListener("click", this.lay, false);
	this.t[2].addEventListener("click", this.lay, false);
}

//-----------------------------------------------
// - set the dimensions of preview device view
// - default mobile view
L.prototype.init = function(){
	if(document.body.offsetWidth < 767){
		jumboCanvas.style.height = jumboCanvas.offsetWidth * 1.42 + "px";
	}else if(document.body.offsetWidth < 1200){
		jumboCanvas.className = 
		this.a = 
		layoutD1.children[0].children[1].children[0].innerHTML = 
		layoutD2.children[0].children[1].children[0].innerHTML = "tablet";
		jumboCanvas.style.height = jumboCanvas.offsetWidth * 1.06 + "px";
		layoutD1.children[0].children[0].className = 
		layoutD2.children[0].children[0].className = "icon-mobile2";
	}else{
		jumboCanvas.className = 
		this.a = 
		layoutD1.children[0].children[1].children[0].innerHTML = 
		layoutD2.children[0].children[1].children[0].innerHTML = "desktop";
		jumboCanvas.style.height = jumboCanvas.offsetWidth * 0.54 + "px";
		layoutD1.children[0].children[0].className = 
		layoutD2.children[0].children[0].className = "icon-laptop";
	}
};

//-----------------------------------------------
// - change device layout click event
L.prototype.lay = function(e){ e.preventDefault();

	// hide the dropdown
	this.parentElement.parentElement.style.display = 'none';
	document.body.removeEventListener("click", rsApp.closeDropdown, true);

	// set the icons
	layoutD1.children[0].children[0].className = 
	layoutD2.children[0].children[0].className = this.children[0].className;

	// change the aspect ratio
	jumboCanvas.style.height = this.dataset.h * jumboCanvas.offsetWidth + "px";

	// set the layout property
	layout.a = 

	// change the class/scale
	jumboCanvas.className = 

	// change the dropdown text
	layoutD1.children[0].children[1].children[0].innerHTML =
	layoutD2.children[0].children[1].children[0].innerHTML = this.dataset.layout;

	// set the style of the rr object
	layout.setStyles();

	// set the height & width of all the textboxes
	tbs.c.setDims();
}

//-----------------------------------------------
// - set inline transform styles from all rr
//   objects based on layout
L.prototype.setStyles = function(){

	// loop through each of the objects in the hashmap
	for(var j = 0; j <= rm.i; j++){

		//get the correct stylesheet
		if(this.a == 'mobile')		 // mobile
			this.t = document.styleSheets[7].cssRules[j].style;
		else if(this.a == 'tablet') // tablet
			this.t = document.styleSheets[7].cssRules[rm.i + 1].cssRules[j].style;
		else 							 // desktop
			this.t = document.styleSheets[7].cssRules[rm.i + 2].cssRules[j].style;

		// loop through the specified styles
		for(var k = 0; k < this.t.length; k++)
			// set them as inline styles on the element
			rm.h[j].el.style[this.t[k]] = this.t[this.t[k]];

		// set the transform object
		rm.h[j].extractMatrix();
	}
}






























//-----------------------------------------------
//
// 					initialize 
//
//-----------------------------------------------


document.addEventListener("DOMContentLoaded", function(){

    // create new RS object
    rsApp = new RS();

	// init layout
	layout = new L();
	// init confirmation modal
	modal = new cModal();
	// init the component styler
	cm = new CM();
    // create new Jumbo (edit jumbotron) object
    jApp = new Jumbo();

}, true);	
