//-----------------------------------------------
//
//				Edit Jumbotron App
//
// - Edit all the properties of the business 
//   jumbotron
//
//
//
//-----------------------------------------------



//-----------------------------------------------
//
//		   	 additional RS methods
//
//----------------------------------------------- 

//----------------------------------------------
// - Event listener toggle slide out menu for
//   pages with no map
RS.prototype.toggleMobileMenu = function(){
	// set the max width of the content cover
	// if the menu is hidden and the window is mobile-sized
	if( document.getElementById("page-content").style.transform != "translate(270px, 0px)"
		&& window.innerWidth < 768 ){
		// open the menu
		document.getElementById("page-content").style.transform = "translate(270px, 0px)";
		document.getElementById("content-cover").style.transform = "translate(270px, 0px)";
		// cover the content
		document.getElementById("content-cover").style.display = "block";
		// set timer to reveal #content-cover
		setTimeout( rsApp.showContentCover , 200 );
	}else{
		// close the menu
		document.getElementById("page-content").style.transform = "translate(0px, 0px)";
		document.getElementById("content-cover").style.transform = "translate(0px, 0px)";
		// reveal the content
		document.getElementById("content-cover").style.opacity = "0";
		// set timer to hide #content-cover
		setTimeout( rsApp.hideContentCover , 300 );
	}
}

































// declare the global variables
var jApp, cs, bg, tbs, imgs, btns;

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

	// instantiate confirmation modal object
	this.modal = new cModal();

	// add the modal confirmation event listern out here
	confModal.children[0].children[0].children[2].children[1]
		.addEventListener("click", this.modal.callback, false); 

	// keep track active component editor
	this.a = null;

	// keep track of active control panel
	this.panel = -1;

	// keep track of active layout, default mobile
	this.layout = 'mobile';

	// temp variable
	this.temp = null;

	/* initializations */

	// set the canvas dimensions based on initial window size 
	this.setDims();

	// init the layout view dropdown
	layoutD1.children[0].addEventListener("click", rsApp.toggleDropdown, false);
	layoutD2.children[0].addEventListener("click", rsApp.toggleDropdown, false);

	// init the scaling event listeners
	this.temp = layoutD1.getElementsByTagName("a");
	this.temp[0].addEventListener("click", this.lay, false);
	this.temp[1].addEventListener("click", this.lay, false);
	this.temp[2].addEventListener("click", this.lay, false);
	this.temp = layoutD2.getElementsByTagName("a");
	this.temp[0].addEventListener("click", this.lay, false);
	this.temp[1].addEventListener("click", this.lay, false);
	this.temp[2].addEventListener("click", this.lay, false);


	// get all the toolbars, add actBtn event
	this.temp = document.getElementsByClassName("tb"); // console.log(this.temp);

	// loop through the opts-toolbars
	for(var i = 0; i < this.temp.length; i++){

		// loop through all the btns in the toolbar
		for(var j = 0; j < this.temp[i].children.length; j++){

			// add event listener to each of the btns
			this.temp[i].children[j].addEventListener("click", this.actBtn, false);
		}
	}

	// event listener activation switch
	document.getElementById("onoff")
		.addEventListener("change", this.jumboVis, false);

	// get the jumbo toolbar btns
	this.temp = jumboToolbar.children[0].children[1].children;
	// apply the event listeners to jumbo toolbar
	this.temp[0].addEventListener("click", this.togOpts, false);
	this.temp[1].addEventListener("click", this.togOpts, false);
	this.temp[2].addEventListener("click", this.togOpts, false);
	this.temp[3].addEventListener("click", this.togOpts, false);

	// get all buttons that toggle control panels
	this.temp = document.querySelectorAll('[data-panel]');
	// loop through the buttons
	for(var i = 0; i < this.temp.length; i++)
		// apply the even listener
		this.temp[i].addEventListener("click", this.togCpan, false);

	// remove the event listener from btn #4
	if(this.temp[4].className.substr(-8) == 'inactive')
		this.temp[4].removeEventListener('click', this.togCpan, false);

	// add event listener to the save btn
	save1.children[1].addEventListener("click", this.save, false);
	save2.children[0].addEventListener("click", this.save, false);

	// close the save alert
	save1.children[0].addEventListener("click", this.xSA, false);

	// init other page objects, avoid race conditions

	// init the component styler
	cs = this.cs = new CS();
	// init background editor
	bg = this.bg = new BG();
	// init textbox editor
	tbs = this.tbs = new TB();
	// init image overlay editor
	imgs = this.imgs = new IO();
	// init button editor
	btns = this.btns = new BTN();
}

/* METHODS */

//-----------------------------------------------
// - set the dimensions of preview device view
// - default mobile view
Jumbo.prototype.setDims = function(){
	if(document.body.offsetWidth < 767){
		jumboCanvas.style.height = jumboCanvas.offsetWidth * 1.42 + "px";
	}else if(document.body.offsetWidth < 1200){
		jumboCanvas.className = 
		this.layout = 
		layoutD1.children[0].children[1].children[0].innerHTML = 
		layoutD2.children[0].children[1].children[0].innerHTML = "tablet";
		jumboCanvas.style.height = jumboCanvas.offsetWidth * 1.06 + "px";
		layoutD1.children[0].children[0].className = 
		layoutD2.children[0].children[0].className = "icon-mobile2";
	}else{
		jumboCanvas.className = 
		this.layout = 
		layoutD1.children[0].children[1].children[0].innerHTML = 
		layoutD2.children[0].children[1].children[0].innerHTML = "desktop";
		jumboCanvas.style.height = jumboCanvas.offsetWidth * 0.54 + "px";
		layoutD1.children[0].children[0].className = 
		layoutD2.children[0].children[0].className = "icon-laptop";
	}
};

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
	if(jApp.a){

		// close it
		jApp[jApp.a].close();

		// if a control panel is open
		if(jApp.panel >= 0){

			// close it
			document.getElementById(jApp.a+"Cpanels").children[jApp.panel]
				.style.display = "none";

			// show the opts title
			document.getElementById(jApp.a + "Props").children[1]
				.style.display = "block";

			// reset the panel property
			jApp.panel = -1;

		}

		// hide the open options toolbar
		document.getElementById(jApp.a + "Props").style.display = "none";

	}

	// if this options toolbar was already open
	if(this.dataset.a == jApp.a){

		// reset the a property to null
		jApp.a = null;

		return;
	}

	// set the a property
	jApp.a = this.dataset.a;

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
		document.getElementById(jApp.a+"Cpanels").children[jApp.panel]
			.style.display = "none";
	
	//-----------------------------------------------
	// - if this button has no associated control 
	//   panel, or this panel was already open
	if(!this.dataset.panel || this.dataset.panel == jApp.panel){

		// show the opts title
		document.getElementById(jApp.a + "Props").children[1]
			.style.display = "block";

		// reset the active panel
		jApp.panel = -1;

		return;
	}

	// set the new active panel
	jApp.panel = this.dataset.panel;

	// hide the opts title
	document.getElementById(jApp.a + "Props").children[1]
		.style.display = "none";

	// display the control panel
	document.getElementById(jApp.a + "Cpanels").children[this.dataset.panel]
		.style.display = "block";
}

//-----------------------------------------------
// - on/off switch jumbo visible change event
Jumbo.prototype.jumboVis = function(){
	jApp.nVals.active = (this.checked) ? 1 : 0;
	jApp.deltaVals();
}

//-----------------------------------------------
// - change device layout click event
Jumbo.prototype.lay = function(e){ e.preventDefault();

	// hide the dropdown
	this.parentElement.parentElement.style.display = 'none';
	document.body.removeEventListener("click", rsApp.closeDropdown, true);

	// set the icons
	layoutD1.children[0].children[0].className = 
	layoutD2.children[0].children[0].className = this.children[0].className;

	// change the aspect ratio
	jumboCanvas.style.height = this.dataset.h * jumboCanvas.offsetWidth + "px";

	// set the layout property
	jApp.layout = 

	// change the class/scale
	jumboCanvas.className = 

	// change the dropdown text
	layoutD1.children[0].children[1].children[0].innerHTML =
	layoutD2.children[0].children[1].children[0].innerHTML = this.dataset.layout;

	// set the style of the rr object
	rm.setStyles();

	// set the height & width of all the textboxes
	jApp.tbs.te.setDims();
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
//			   CS (component styler)
// 			 -------------------------	
//
// - convert hexidecimal to RGB
//
// - convert RGB to hexidecimal
// 
// - event listeners for blur and opacity text
//   inputs and sliders
//
// - set the visibility of an element in various
//   layouts
// 
// - toggle the resize, reposition, rotate elem
//
//-----------------------------------------------

var CS = function(){

	// temp variable
	this.t = null;

	// textbox checkboxes
	this.tbsB = tbsCpanels.children[5].getElementsByTagName('input');

	// image overlay checkboxes
	this.imgsB = imgsCpanels.children[1].getElementsByTagName('input');

	// visibility events
	this.imgsB[0].addEventListener('change', this.vis, false);
	this.imgsB[1].addEventListener('change', this.vis, false);
	this.imgsB[2].addEventListener('change', this.vis, false);

	// image overlay style events
	this.t = imgsCpanels.children[0].getElementsByTagName('input');
	// blur
	this.t[3].addEventListener('keyup', this.bText, false);
	this.t[4].addEventListener('change', this.bSlide, false);
	// opacity
	this.t[5].addEventListener('keyup', this.oText, false);
	this.t[6].addEventListener('change', this.oSlide, false);

}

//-----------------------------------------------
// - algorithm to determine if a hex value is 
//   light or dark.
// - @rgbObj -> object with r, g, & b values as
//   returned by hext to rgb function
// - returns a value between 0 and 1
// - #000 would return a value of 0
// - #FFF would return a value of 1
// - all other colors would be somewhere
//   inbetween
// - values below .6 should be overlaid with
//   white text
// - values above .6, overlaid with black
CS.prototype.hexBright = function( rgbObj ){
	// calculate & return weighted average
	return (( rgbObj.r*0.299 + rgbObj.g*0.587 + rgbObj.b*0.114 ) / 256 > 0.6);
}
//-----------------------------------------------
// - algorithm to convert hex to rgb
// - @hex -> hexidecimal as string
// - returns object with r, g, & b values
CS.prototype.hexToRgb = function(hex) {
	// convert to array of hex vals
	this.t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
	// return the results as an object
    return this.t ? {
        r: parseInt(this.t[1], 16),
        g: parseInt(this.t[2], 16),
        b: parseInt(this.t[3], 16)
    } : null;
}

//-----------------------------------------------
// - convert to hex
CS.prototype.rgbToHex = function(rgb) {
    return "#" + this.compToHex(rgb[0]) + this.compToHex(rgb[1]) + this.compToHex(rgb[2]);
}
// - helper
CS.prototype.compToHex = function(c) {
    this.t = parseInt(c).toString(16);
    return this.t.length == 1 ? "0" + this.t : this.t;
}

//-----------------------------------------------
// - when user slides opacity slider
CS.prototype.oSlide = function(){

	// set the value of the text input
	this.parentElement.children[1].value = 

	// change the opacity of the active textbox
	jApp[jApp.a].a.children[2].style.opacity = 

	// update values
	jApp.nVals[jApp.a][jApp[jApp.a].a.dataset.key]["opacity"] = parseFloat(this.value);

	// prompt save
	jApp.deltaVals();
}

//-----------------------------------------------
// - when user slides blur slider
CS.prototype.bSlide = function(){

	// set the value of the text input
	this.parentElement.children[1].value = 

	// update values
	jApp.nVals[jApp.a][jApp[jApp.a].a.dataset.key]["blur"] = parseInt(this.value);

	// change the blur of the background img
	jApp[jApp.a].a.children[2].style.filter = 
	jApp[jApp.a].a.children[2].style.webkitFilter = "blur("+this.value+"px)"; 

	// prompt save
	jApp.deltaVals();
}

//-----------------------------------------------
// - keyup opacity text input
CS.prototype.oText = function(){ 

	// if there is no input, return 
	if( !this.value) return;

	// if the value is not 1
	if(this.value !== "1"){

		// strip non numeric characters from the last 2 digits
		this.value = this.value.replace(/[^\d.]/g, '');

		// if the value of the first character is not 0
		if( this.value.charAt(0) != "0" )

			// pop a 0 in there
			this.value = "0" + this.value;

		// if the value of the second character is not "."
		if( this.value.length > 1 && this.value.charAt(1) != "." )

			// pop the decimal in there
			this.value = "0." + this.value.substring(1, 3);
	}

	// update slider input
	this.parentElement.children[2].value = 

	// change the opacity of the background
	jApp[jApp.a].a.children[2].style.opacity = 

	// update values
	jApp.nVals[jApp.a][jApp[jApp.a].a.dataset.key]["opacity"] = parseFloat(this.value);

	// prompt save
	jApp.deltaVals();
}

//-----------------------------------------------
// - keyup blur text input
// - must be an integer between 0 and 10
CS.prototype.bText = function(){

	// if there is no input, return 
	if( !this.value) return;

	// replace all non-numeric characters
	this.value = this.value.replace('/[^\d]/g', '');

	// if the value is greater than 10
	if(parseInt(this.value) > 10)
		// remove the last number
		this.value = this.value.substr(0,1);

	// update the slider input
	this.parentElement.children[2].value = 

	// update the nVals
	jApp.nVals[jApp.a][jApp[jApp.a].a.dataset.key]["blur"] = parseInt(this.value);

	// set the blur
	jApp[jApp.a].a.children[2].style.filter = 
	jApp[jApp.a].a.children[2].style.webkitFilter = "blur("+this.value+"px)"; 

	// prompt save
	jApp.deltaVals();
}

//-----------------------------------------------
// - change visibility for element in layout
// - prompt delete if invisible for all 3
CS.prototype.vis = function(){

	// set the nVals
	jApp.nVals[jApp.a][jApp[jApp.a].a.dataset.key].layout[this.value].v = (this.checked) ? 1 : 0;

	// if all three are unchecked
	if(!jApp.cs[jApp.a + 'B'][0].checked
	&& !jApp.cs[jApp.a + 'B'][1].checked
	&& !jApp.cs[jApp.a + 'B'][2].checked){

		// recheck 
		this.checked = true;

		// prompt delete modal
		jApp[jApp.a].confirmDel(); return;
	}

	// temp variable, more efficient
	jApp.temp = (this.checked) ? 'block' : 'none';

	// set the style sheet
	if(this.value == 'mobile') 		// mobile
		document.styleSheets[7].cssRules[jApp[jApp.a].a.dataset.r]
			.style.display = jApp.temp;
	else if(this.value == 'tablet') // tablet
		document.styleSheets[7].cssRules[rm.i + 1].cssRules[jApp[jApp.a].a.dataset.r]
			.style.display = jApp.temp;
	else 							// desktop
		document.styleSheets[7].cssRules[rm.i + 2].cssRules[jApp[jApp.a].a.dataset.r]
			.style.display = jApp.temp;

	// checkbox cooresponds to current layout
	if(this.value == jApp.layout)
		// add an inline style
		jApp[jApp.a].a.style.display = jApp.temp;
}

//-----------------------------------------------
// - set checkboxes of cPanel when user activates
//   an dragable object
CS.prototype.setVis = function(){
	this[jApp.a + 'B'][0].checked = (jApp.nVals[jApp.a][jApp[jApp.a].a.dataset.key].layout.mobile.v);
	this[jApp.a + 'B'][1].checked = (jApp.nVals[jApp.a][jApp[jApp.a].a.dataset.key].layout.tablet.v);
	this[jApp.a + 'B'][2].checked = (jApp.nVals[jApp.a][jApp[jApp.a].a.dataset.key].layout.desktop.v);
}































//-----------------------------------------------
//			 cModal (confirmation modal)				
//		   -------------------------------
//
// - dynamically set the modal content
//
// - display the modal
//
// - hide the modal
//
// - perform callback
//
//-----------------------------------------------

/* CONSTRUCTOR */

cModal = function(){

	/* properties */

	// keep track of the callback function, temp variable
	this.callback = null;

	/* initializations */

	// add close event listeners
	confModal.addEventListener("click", this.fadeOut, false);
}

/* METHODS */

//-----------------------------------------------
// - launch modal
cModal.prototype.launch = function(){

	// show the modal
	confModal.style.display = "block";

	// show the backdrop
	confBD.style.display = "block";
	
	// fade in
	setTimeout(jApp.modal.fadeIn, 10);
	
	// drop modal on em
	setTimeout(jApp.modal.dropIn, 130);
}

//-----------------------------------------------
// - modal in from top
cModal.prototype.fadeIn = function(){

	// prevent scrolling on the body
	document.body.className = "modal-open";

	// set the backdrop class
	confBD.className = "modal-backdrop fade in";

}

//-----------------------------------------------
// - modal in from top
cModal.prototype.dropIn = function(){

	// set the modal class
	confModal.className = "modal fade in";
}

//-----------------------------------------------
// - animate out
cModal.prototype.fadeOut = function(e){

	// if the user confirmed the deletion button
	if(e.target.className == "btn btn-default btn-danger"
	|| e.target.className == "glyphicon glyphicon-trash")
		jApp.modal.callback();

	// if we clicked one of the buttons or backdrop
	if(	e.target.tagName == "BUTTON" 
	|| e.target.parentElement.tagName == "BUTTON"
	|| e.target.id == "confModal" ){

		// set the modal class
		confModal.className = "modal fade";

		// set the backdrop class
		confBD.className = "modal-backdrop fade";

		// hide the elements
		setTimeout(jApp.modal.hide, 300);
	}
}

//-----------------------------------------------
// - hide modal elements
cModal.prototype.hide = function(){
	// hide the modal
	confModal.style.display = "none";
	// hide the backdrop
	confBD.style.display = "none";
	// remove the modal class from the body
	document.body.className = "";
}



































//-----------------------------------------------
//
// 					initialize 
//
//-----------------------------------------------


document.addEventListener("DOMContentLoaded", function(){

    // create new RS object
    rsApp = new RS();

    // create new Jumbo (edit jumbotron) object
    jApp = new Jumbo();

}, true);	
