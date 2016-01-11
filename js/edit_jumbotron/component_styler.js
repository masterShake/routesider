//-----------------------------------------------
//			   CM (component manager)
// 		 	 --------------------------
//
// - keep track of styler objects:
//    + CS
//    + TS
//    + TC
//
//-----------------------------------------------

var CM = function(){

	// keep track of the active index (0 || 1)
	this.a = -1;

	// init component stylers
	cs = this.cs = new CS();

	// init the text stylers
	// this.ts = [ new TS('tbs'), new TS('btns') ];

	// init text color objects
	tc = this.tc = new TC();

	// keep track of selection and range
	this.sel = null;
	this.range = null;
}

//-----------------------------------------------
// - move the cursor to the end of the active div
CM.prototype.setEnd = function(){
	this.sel = window.getSelection();
	// if there is a selection or box is already in focus
	if(this.sel.toString()) return;
    this.range = document.createRange();//Create a this.range (a this.range is a like the this.sel but invisible)
    this.range.selectNodeContents(jApp[as].a.children[2]);//Select the entire contents of the element with the this.range
    this.range.collapse(false);//collapse the this.range to the end point. false means collapse to end rather than the start
    this.sel.removeAllRanges();//remove any selections already made
    this.sel.addRange(this.range);//make the this.range you have just created the visible this.sel
}

//-----------------------------------------------
//				 TS (text styler)
// 			   --------------------
//
//-----------------------------------------------

var TS = function(c){

	// temp variables, keep track of range and selection
	this.sel = null;
	this.range = null;

	// get all the execCommand buttons (toolbar only)
	this.sel = document.getElementById(c + 'Toolbar')
				.querySelectorAll('[data-excom]');

	// add event listeners to the buttons
	for(var i = 0; i < this.sel.length; i++)
		this.sel[i].addEventListener('click', this.exCom, false);

	// keep a map of all the buttons
	this.b = {
		bold 		  : this.t[0],
		italic		  : this.t[1],
		underline	  : this.t[2],
		strikeThrough : this.t[3],
		subscript	  : this.t[4],
		superscript   : this.t[5]
	};

	// get the font size input group
	this.sel = document.getElementById(c + 'Cpanels').children[0].children[1].children[0];

	// add keyup event listener to the input
	this.sel.children[0]
		.addEventListener('keyup', this.keyFS, false);

	// init the dropdown
	this.sel.children[1].children[0]
		.addEventListener("click", rsApp.toggleDropdown, false);

	// add click event to font sizes
	this.range = this.sel.children[1].children[1].children;
	for(var i = 0; i < this.range.length; i++)
		this.range[i].addEventListener('click', this.clickFS, false);
}

//-----------------------------------------------
// - buttons that employ the execCommand 
//   function:
//    + bold			+ superscript
//    + italic			+ justify left
//    + underline		+ justify center
//    + strikethrough 	+ justify right
//    + subscript 		+ justify full
TS.prototype.exCom = function(){
	// apply the execCommand
	document.execCommand(this.dataset.excom, false, null);
	// toggle the active class
	this.className = (this.className == 'btn btn-default') ?
						'btn btn-default active' : 
						'btn btn-default' ;
}

//-----------------------------------------------
// - keyup/focus on content editable div
// - determine which demands are active
// - set buttons accordingly
TS.prototype.qCom = function(e){
	// activate the proper wysiwig btns
	cm.ts[cm.a].qch();
	// set the html property
	jApp.nVals[as][this.parentElement.dataset.key].html = this.innerHTML;
	// prompt save
	jApp.deltaVals();
}

//-----------------------------------------------
// - query command state keyup helper
// - theoretically should run a tinsy bit faster
TS.prototype.qch = function(){
	// set the class on the wysiwyg btns
	for(var x in this.b)
		this.b[x].className = (document.queryCommandState(x)) ?
													'btn btn-default active' :
													'btn btn-default';
}

//-----------------------------------------------
// - keyup set font size
TS.prototype.keyFS = function(e){

	// if no value, do nothing
	if(!this.value) return;

	// if value is not a number, 0, or greater than 7 
	if(!/^\d+$/.test(this.value) || this.value == '0' || parseInt(this.value) > 7){
		this.value = ''; return;
	}

	// focus on the textbox
	this.blur();
	jApp[as].a.children[2].focus();
	cm.setEnd();

	// set the font size
	document.execCommand('fontSize', false, this.value);
}

//-----------------------------------------------
// - click dropdown menu select font size
TS.prototype.clickFS = function(e){ e.preventDefault();
	// set the value of the input
	this.parentElement.parentElement.parentElement.parentElement.children[0]
		.value = this.dataset.fs;
	// hide the dropdown
	this.parentElement.parentElement.style.display = 'none';
	// focus on the textbox
	this.blur();
	jApp[as].a.children[2].focus();
	cm.setEnd();
	// set the font size
	document.execCommand('fontSize', false, this.dataset.fs);
}


//-----------------------------------------------
//				TC (textbox color)			
//			  ----------------------
//
// - set the various textbox, button color props
//
// - manage colors in control panels when user
//   toggles between dragable elements
//
//-----------------------------------------------
var TC = function(){

	// loop through all the hex inputs
	this.t = document.querySelectorAll('input.colorize[type="text"]');
	for(var i = 0; i < this.t.length; i++)
		// keyup event
		this.t[i].addEventListener('keyup', this.hexText, false);

	// loop through all the color pickers
	this.t = document.querySelectorAll('input.colorize[type="color"]');
	for(var i = 0; i < this.t.length; i++)
		// keyup event
		this.t[i].addEventListener('change', this.colorPick, false);

	// loop through all the color wheel buttons
	this.t = document.querySelectorAll('[data-hex]');
	for(var i = 0; i < this.t.length; i++)
		// click event
		this.t[i].addEventListener('click', this.wheelBtn, false);

	// loop through all the transparency checkboxes
	this.t = document.querySelectorAll('input.colorize[type="checkbox"]');
	for(var i = 0; i < this.t.length; i++)
		// change event
		this.t[i].addEventListener('change', this.trans, false);
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
TC.prototype.hexBright = function( rgbObj ){
	// calculate & return weighted average
	return (( rgbObj.r*0.299 + rgbObj.g*0.587 + rgbObj.b*0.114 ) / 256 > 0.6);
}
//-----------------------------------------------
// - algorithm to convert hex to rgb
// - @hex -> hexidecimal as string
// - returns object with r, g, & b values
TC.prototype.hexToRgb = function(hex) {
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
TC.prototype.rgbToHex = function(rgb) {
    return "#" + this.compToHex(rgb[0]) + this.compToHex(rgb[1]) + this.compToHex(rgb[2]);
}
// - helper
TC.prototype.compToHex = function(c) {
    this.t = parseInt(c).toString(16);
    return this.t.length == 1 ? "0" + this.t : this.t;
}

//-----------------------------------------------
// - keyup event change background color hex text
// - make sure that first character is always a
//   hashtag
// - if legit hex value, display color
TC.prototype.hexText = function(){
	
	// if the first character is not a #
	if(this.value.charAt(0) != "#")
		// put the hashtag in front of the text
		this.value = "#" + this.value;

	// remove any input that is not 0-9, A-F
	this.value = "#" + this.value.substr(1,6).replace(/[^0-9a-f]+/gi, '');

	// if the input is now the proper length & format
	if(this.value.length == 7){

		// set the color elements
		tc.setElems(this.value, this.dataset.i);

		// set the property
		tc[this.dataset.func](this.value);
	}
}

//-----------------------------------------------
// - HTML5 color pick change event
TC.prototype.colorPick = function(){

	// set the color elements
	tc.setElems(this.value, this.dataset.i);

	// set the property
	tc[this.dataset.func](this.value);
}

//-----------------------------------------------
// - user clicks one of the color wheel colors
// - set text
// - set color icon
// - set html5 color picker
// - set background
TC.prototype.wheelBtn = function(){

	tc.setElems(this.dataset.hex, this.parentElement.parentElement.dataset.i);

	// set the property
	tc[this.parentElement.parentElement.dataset.func](this.dataset.hex);
}

//-----------------------------------------------
// - transparent checkbox change event 
// - change the opacity
// - set execCommand or background color
// - keep track of previous color, possibly reset
TC.prototype.trans = function(){
	
	this.parentElement.style.opacity = (this.checked) ? '1' : '0.5';

}

//-----------------------------------------------
// - set color elements of control panel
// - i => index of elements in array
TC.prototype.setElems = function(hex, i){

	// set the text input
	jApp[as].c.texti[i].value = 

	// set the color picker input
	jApp[as].c.picki[i].value = 

	// set the icon background color
	jApp[as].c.icon[i].style.backgroundColor = hex;

	// set the icon color
	jApp[as].c.icon[i].style.color = this.hexBright( this.hexToRgb( hex ) );

}

//-----------------------------------------------
// - keyup set control panel color
TC.prototype.qCol = function(){
	// foreColor
	tbs.c.setColor(
		0,
		0,
		tbs.c.rgbToHex(
			document.queryCommandValue('foreColor')
				.split('(')[1].split(')')[0].split(',')
		)
	);
	// backColor
	tbs.c.setColor(
		1,
		0,
		tbs.c.rgbToHex(
			document.queryCommandValue('backColor')
				.split('(')[1].split(')')[0].split(',')
		)
	);
}

//-----------------------------------------------
// - set foreColor of content editable
TC.prototype.foreColor = function(hex){

	// focus on the active element
	jApp[as].a.children[2].focus(); 

	// set the cursor to the end
	cm.setEnd();
	
	// set the execCommand	
	document.execCommand('foreColor', false, hex);
}

//-----------------------------------------------
// - set backColor of content editable
TC.prototype.backColor = function(hex){

	// focus on the active element
	jApp[as].a.children[2].focus(); 

	// set the cursor to the end
	cm.setEnd();
	
	// set the execCommand	
	document.execCommand('backColor', false, hex);

}

//-----------------------------------------------
// - set border color of active element
TC.prototype.bgColor = function(hex){

	// set the element background color
	jApp[as].a.style.backgroundColor = 

	// update the nVals obejct
	jApp.nVals[as][jApp[as].a.dataset.key].color = hex;

	// prompt save 
	jApp.deltaVals();

}

//-----------------------------------------------
// - set border color of active element
TC.prototype.borderColor = function(hex){ console.log('borderColor called');

}

//-----------------------------------------------
// - set background color of active element
// - only used for the background component
TC.prototype.bg = function(hex){

	// set preview background color
	bgElem.parentElement.style.backgroundColor = 

	// & update the new values object
	jApp.nVals.bg[0].color = hex;

	// notify root node that values have changed
	jApp.deltaVals();
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
// - c => component prefix
//
//-----------------------------------------------

var CS = function(c){


	// loop through all opacity forms
	this.t = document.getElementsByClassName('opacity-form');
	for(var i = 0; i < this.t.length; i++){

		// keyup event
		this.t[i].children[1].addEventListener('keyup', this.oText, false);

		// slider event
		this.t[i].children[2].addEventListener('change', this.oSlide, false);
	}

	// loop through all the blur forms
	this.t = document.getElementsByClassName('blur-form');
	for(var i = 0; i < this.t.length; i++){

		// keyup event
		this.t[i].children[1].addEventListener('keyup', this.bText, false);

		// slider event
		this.t[i].children[2].addEventListener('change', this.bSlide, false);
	}

	// loop through all the properties toolbars
	this.t = document.getElementsByClassName('opts-toolbar');
	for(var i = 0; i < this.t.length; i++){

		// get the buttons
		this.u = this.t[i].children;

		// loop through the buttons
		for(var j = 0; j < this.u.length; j++){ 

			// if this is the toggle button
			if(this.u[j].children[0].className == 'glyphicon glyphicon-move')
				// toggle rrr event
				this.u[j].addEventListener('click', this.rrr, false);
			else
				// hide the rrr element event
				this.u[j].addEventListener('click', this.rOff, false);
		}
	}
		// add togRRR event to rrrBtn

		// add rrrOff event to all other buttons










	// temp variable
	// this.t = null;

	// // textbox checkboxes
	// this.tbsB = tbsCpanels.children[7].getElementsByTagName('input');

	// // visibility events
	// this.tbsB[0].addEventListener('change', this.vis, false);
	// this.tbsB[1].addEventListener('change', this.vis, false);
	// this.tbsB[2].addEventListener('change', this.vis, false);

	// // roundness
	// this.t = tbsCpanels.children[5].children[1].children[1].children[0];
	// this.t.addEventListener('keyup', this.rUp, false);
	// this.t.addEventListener('keydown', this.rDo, false);


	// // roundness
	// this.t = imgsCpanels.children[1].children[1].children[1].children[0];
	// this.t.addEventListener('keyup', this.rUp, false);
	// this.t.addEventListener('keydown', this.rDo, false);

	// // image overlay checkboxes
	// this.imgsB = imgsCpanels.children[2].getElementsByTagName('input');

	// // visibility events
	// this.imgsB[0].addEventListener('change', this.vis, false);
	// this.imgsB[1].addEventListener('change', this.vis, false);
	// this.imgsB[2].addEventListener('change', this.vis, false);

}

//-----------------------------------------------
// - when user slides opacity slider
CS.prototype.oSlide = function(){

	if(this.dataset.elem == 'parent')
		// change the opacity of the active textbox
		jApp[as].a.style.opacity = parseFloat(this.value);

	else
		// change the opacity of the active textbox
		jApp[as].a.children[2].style.opacity = parseFloat(this.value);

	// set the value of the text input
	this.parentElement.children[1].value = 

	// update values
	jApp.nVals[as][jApp[as].a.dataset.key]["opacity"] = parseFloat(this.value);

	// prompt save
	jApp.deltaVals();
}

//-----------------------------------------------
// - when user slides blur slider
CS.prototype.bSlide = function(){

	// set the value of the text input
	this.parentElement.children[1].value = 

	// update values
	jApp.nVals[as][jApp[as].a.dataset.key]["blur"] = parseInt(this.value);

	// change the blur of the background img
	jApp[as].a.children[2].style.filter = 
	jApp[as].a.children[2].style.webkitFilter = "blur("+this.value+"px)"; 

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

	// determine if change affects parent or child 2
	if(this.dataset.elem == 'parent')
		// change the opacity of the background
		jApp[as].a.style.opacity = parseFloat(this.value); 

	else
		// change the opacity of the background
		jApp[as].a.children[2].style.opacity = parseFloat(this.value); 

	// update slider input
	this.parentElement.children[2].value = 

	// update values
	jApp.nVals[as][jApp[as].a.dataset.key]["opacity"] = parseFloat(this.value);

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
	this.value = this.value.replace(/[^\d]/g, '');

	// if the value is greater than 10
	if(parseInt(this.value) > 10)
		// remove the last number
		this.value = this.value.substr(0,1);

	// update the slider input
	this.parentElement.children[2].value = 

	// update the nVals
	jApp.nVals[as][jApp[as].a.dataset.key]["blur"] = parseInt(this.value);

	// set the blur
	jApp[as].a.children[2].style.filter = 
	jApp[as].a.children[2].style.webkitFilter = "blur("+this.value+"px)"; 

	// prompt save
	jApp.deltaVals();
}

//-----------------------------------------------
// - toggle resize, reposition, rotate btns
CS.prototype.rrr = function(){
	// if the btns are not showing
	if(this.className == 'btn btn-default'){
		// show the .drag-btns
		jApp[as].a.children[1].style.display = 'block';
		// add the active class
		this.className = 'btn btn-default active';
		// set the r map active objects
		rm.a = rm.h[jApp[as].a.dataset.r];
		rm.m = rm.a.m;
	}else{
		jApp[as].a.children[1].style.display = 'none';
		this.className = 'btn btn-default';
	}
}

//-----------------------------------------------
// - hide rrr when user clicks something else
CS.prototype.rOff = function(){
	// hide the rrr element
	jApp[as].a.children[1].style.display = 'none';
	// button default
	jApp[as].rBtn.className = 'btn btn-default';
}

//-----------------------------------------------
// - change visibility for element in layout
// - prompt delete if invisible for all 3
CS.prototype.vis = function(){

	// set the nVals
	jApp.nVals[as][jApp[as].a.dataset.key].layout[this.value].v = (this.checked) ? 1 : 0;

	// if all three are unchecked
	if(!jApp.cs[as + 'B'][0].checked
	&& !jApp.cs[as + 'B'][1].checked
	&& !jApp.cs[as + 'B'][2].checked){

		// recheck 
		this.checked = true;

		// prompt delete modal
		jApp[as].confirmDel(); return;
	}

	// temp variable, more efficient
	jApp.t = (this.checked) ? 'block' : 'none';

	// set the style sheet
	if(this.value == 'mobile') 		// mobile
		document.styleSheets[7].cssRules[jApp[as].a.dataset.r]
			.style.display = jApp.t;
	else if(this.value == 'tablet') // tablet
		document.styleSheets[7].cssRules[rm.i + 1].cssRules[jApp[as].a.dataset.r]
			.style.display = jApp.t;
	else 							// desktop
		document.styleSheets[7].cssRules[rm.i + 2].cssRules[jApp[as].a.dataset.r]
			.style.display = jApp.t;

	// checkbox cooresponds to current layout
	if(this.value == layout.a)
		// add an inline style
		jApp[as].a.style.display = jApp.t;
}

//-----------------------------------------------
// - set checkboxes of cPanel when user activates
//   an dragable object
CS.prototype.setVis = function(){
	this[as + 'B'][0].checked = (jApp.nVals[as][jApp[as].a.dataset.key].layout.mobile.v);
	this[as + 'B'][1].checked = (jApp.nVals[as][jApp[as].a.dataset.key].layout.tablet.v);
	this[as + 'B'][2].checked = (jApp.nVals[as][jApp[as].a.dataset.key].layout.desktop.v);
}

//-----------------------------------------------
// - keyup adjust the roundness
// - numbers only
// - set the css of the elements
CS.prototype.rUp = function(){

	// if there is no input, return 
	if(!this.value) return;

	// replace all non-numeric characters
	this.value = this.value.replace(/\D/g, ''); console.log(this.value.replace(/[^\d]/g, ''));

	// if the value is greater than 10
	if(parseInt(this.value) > 100)
		// remove the last number
		this.value = this.value.substr(0,2);

	// set the roundness of the example element
	this.parentElement.parentElement.children[0]
		.style.borderRadius = 

	// set the roundness of the active dragable
	jApp[as].a.children[2].style.borderRadius = (parseInt(this.value)/2) + '%';

	// set the nVals
	jApp.nVals[as][jApp[as].a.dataset.key].round = parseInt(this.value);
	jApp.deltaVals();
}

//-----------------------------------------------
// - keydown adjust the roundness
// - increment or decriment the value of the
//   roundness input
CS.prototype.rDo = function(e){

	// if the value is blank, set it to 0
	if(!this.value) this.value = '0';

	// if our value is not a number
	else if(isNaN(parseInt(this.value))) return;

	// if up arrow, increment value
	if(e.keyCode == '38' && this.value !== '100')
		this.value = parseInt(this.value)+1;

	// else if down arrow, decriment value
	else if(e.keyCode == '40' && this.value !== '0')
		this.value = parseInt(this.value)-1;

	// if neither of these keys, do nothing
	else return;

	// set the roundness of the example element
	this.parentElement.parentElement.children[0]
		.style.borderRadius = 

	// set the roundness of the active dragable
	jApp[as].a.children[2].style.borderRadius = (parseInt(this.value)/2) + '%';
}


