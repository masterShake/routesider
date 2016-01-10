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
	this.cs = new CS();

	// init the text stylers
	// this.ts = [ new TS('tbs'), new TS('btns') ];

	// init text color objects
	// this.tc = [ new TC('tbs'), new TC('btns') ];

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
    this.range.selectNodeContents(jApp[jApp.a].a.children[2]);//Select the entire contents of the element with the this.range
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
	jApp.nVals[jApp.a][this.parentElement.dataset.key].html = this.innerHTML;
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
	jApp[jApp.a].a.children[2].focus();
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
	jApp[jApp.a].a.children[2].focus();
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

	// temp variable
	this.t = null;

	// loop through all the hex inputs

		// keyup event

	// loop through all the color pickers

		// change event

	// loop through all the color wheel buttons

		// click event

	// loop through all the transparency checkboxes

		// change event

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
// - transparent checkbox change event 
// - change the opacity
// - set execCommand or background color
// - keep track of previous color, possibly reset
TC.prototype.trans = function(){
	// set the color
	tbs.c.setColor(
		this.dataset.i, 
		(this.dataset.i == 1) ? 'backColor' : false,
		(this.checked) ? 'transparent' : '#FFFFFF'
	);
}

//-----------------------------------------------
// - user clicks one of the color wheel colors
// - set text
// - set color icon
// - set html5 color picker
// - set background
TC.prototype.wheelBtn = function(){

	tbs.c.setColor( this.parentElement.parentElement.dataset.i,
						   this.parentElement.parentElement.dataset.com, 
						   this.dataset.hex
						 );
}

//-----------------------------------------------
// - master bg color setter method
// - hex --> hexidecimal color
// - set text
// - set color icon
// - set html5 color picker
// - set background
// 	  + i => element index in array
//    + excom => execCommand name
//    + val => hexidecimal value
TC.prototype.setColor = function(i, excom, val){
	
	if(i == 2){ // background only
		tbs.a.children[2].style.backgroundColor = 
		jApp.nVals.tbs[tbs.a.dataset.key].color = val;
	
	}else{ // set the execCommand

		// focus on the active element
		tbs.a.children[2].focus(); 

		// move the caret to the end
		if(excom)
			ts.setEnd();

		if(val == 'transparent') // backColor only
			document.execCommand('styleWithCSS', false, true);
		
		document.execCommand(excom, false, val);
	}

	this.sch(i, val);
}

//-----------------------------------------------
// - set color helper for html elems
// - i => control panel index
// - v => hexidecimal value
TC.prototype.sch = function(i, v){

	// if this is the checkbox
	if(i > 0){
		// set checkbox
		this.checkis[i].checked = (v == 'transparent') ? true : false;
		this.checkis[i].parentElement.style.opacity = 
			(v == 'transparent') ? '1' : '0.5';
		v = (v == 'transparent') ? '#FFFFFF' : v;
	}

	// set the text
	this.textis[i].value =

	// set the color picker
	this.pickis[i].value = v;

	// if this is the font color control panel
	if(i == 0){
		// set the font color
		this.icons[0].style.color = v;
		// set the background
		this.icons[0].style.backgroundColor = 
			this.hexBright(this.hexToRgb(v)) ?
				"#444" : "#FFF";
	}else{
		// set the background color
		this.icons[i].style.background = v;
		// set the preview icon color
		this.icons[i].style.color = 
			this.hexBright(this.hexToRgb(v)) ?
				"#444" : "#FFF";
	}

	// remove the styleWithCSS command
	document.execCommand('styleWithCSS', false, false);
}

//-----------------------------------------------
// - set background color for bg & btns
// - set text
// - set color icon
// - set html5 color picker
// - set background
TC.prototype.bgColor = function(){

	// set preview background color
	cropCanvas.style.backgroundColor = 

	// set the preview icon background
	this.icon.style.backgroundColor = 

	// set the text
	this.texti.value = 

	// set the color picker
	this.picki.value = 

	// & update the new values object
	jApp.nVals.bg.color = this.temp;

	// set the preview icon color
	this.icon.style.color = 
		this.hexBright(this.hexToRgb(this.temp)) ?
			"#444" : "#FFF";

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

	// loop through all the properties toolbar buttons

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

	// // image overlay style events
	// this.t = imgsCpanels.children[0].getElementsByTagName('input');
	// // blur
	// this.t[3].addEventListener('keyup', this.bText, false);
	// this.t[4].addEventListener('change', this.bSlide, false);
	// // opacity
	// this.t[5].addEventListener('keyup', this.oText, false);
	// this.t[6].addEventListener('change', this.oSlide, false);

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
		jApp[jApp.a].a.style.opacity = parseFloat(this.value);

	else
		// change the opacity of the active textbox
		jApp[jApp.a].a.children[2].style.opacity = parseFloat(this.value);

	// set the value of the text input
	this.parentElement.children[1].value = 

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

	// determine if change affects parent or child 2
	if(this.dataset.elem == 'parent')
		// change the opacity of the background
		jApp[jApp.a].a.style.opacity = parseFloat(this.value); 

	else
		// change the opacity of the background
		jApp[jApp.a].a.children[2].style.opacity = parseFloat(this.value); 

	// update slider input
	this.parentElement.children[2].value = 

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
	this.value = this.value.replace(/[^\d]/g, '');

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
	jApp.t = (this.checked) ? 'block' : 'none';

	// set the style sheet
	if(this.value == 'mobile') 		// mobile
		document.styleSheets[7].cssRules[jApp[jApp.a].a.dataset.r]
			.style.display = jApp.t;
	else if(this.value == 'tablet') // tablet
		document.styleSheets[7].cssRules[rm.i + 1].cssRules[jApp[jApp.a].a.dataset.r]
			.style.display = jApp.t;
	else 							// desktop
		document.styleSheets[7].cssRules[rm.i + 2].cssRules[jApp[jApp.a].a.dataset.r]
			.style.display = jApp.t;

	// checkbox cooresponds to current layout
	if(this.value == layout.a)
		// add an inline style
		jApp[jApp.a].a.style.display = jApp.t;
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
	jApp[jApp.a].a.children[2].style.borderRadius = (parseInt(this.value)/2) + '%';

	// set the nVals
	jApp.nVals[jApp.a][jApp[jApp.a].a.dataset.key].round = parseInt(this.value);
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
	jApp[jApp.a].a.children[2].style.borderRadius = (parseInt(this.value)/2) + '%';
}

//-----------------------------------------------
// - toggle resize, reposition, rotate btns
CS.prototype.togRRR = function(){
	// if the btns are not showing
	if(this.className == 'btn btn-default'){
		// show the .drag-btns
		jApp[jApp.a].a.children[1].style.display = 'block';
		// add the active class
		this.className = 'btn btn-default active';
		// set the r map active objects
		rm.a = rm.h[tbs.a.dataset.r];
		rm.m = rm.a.m;
	}else{
		tbs.a.children[1].style.display = 'none';
		this.className = 'btn btn-default';
	}
}

//-----------------------------------------------
// - hide rrr when user clicks something else
CS.prototype.rrrOff = function(){
	// hide the rrr element
	jApp[jApp.a].a.children[1].style.display = 'none';
	// button default
	tbs.te.rrrBtn.className = 'btn btn-default';
}


