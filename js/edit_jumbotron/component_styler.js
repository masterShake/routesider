//-----------------------------------------------
//			   CM (component manager)
// 		 	 --------------------------
//
// - keep track of styler objects:
//    + CS (component style)
//    + SS (shadow style)
//    + TS (text style)
//    + TC (text color)
//	  + SC (set color)
//
// - toggle between elements
//
//-----------------------------------------------

var CM = function(j){ // jApp 

	// keep track of the jApp object
	this.j = j;

	// keep track of the active index (0 || 1)
	this.a = -1;

	// init component stylers
	cs = this.cs = new CS(j);

	// init shadow styler
	ss = this.ss = new SS(j);

	// init the text stylers
	ts =  this.ts = new TS();

	// init text color objects
	tc = this.tc = new TC();
	sc = new SC(j);

	// keep track of selection and range
	this.sel = null;
	this.range = null;

	// loop through existing user defined elements
	this.t = dragCanvas.children;
	for(var i = 0; i < this.t.length; i++)
		// apply the tog event listener
		this.t[i].children[0].addEventListener('click', this.tog, false);

	// move to front buttons
	this.t = document.querySelectorAll('.icon-stack');
	this.t[0].addEventListener('click', this.move2front);
	this.t[1].addEventListener('click', this.move2front);
	this.t[2].addEventListener('click', this.move2front);
}

//-----------------------------------------------
// - move the cursor to the end of the active div
CM.prototype.setEnd = function(){
	this.sel = window.getSelection();
	// if there is a selection or box is already in focus
	if(this.sel.toString()) return;
    this.range = document.createRange();//Create a this.range (a this.range is a like the this.sel but invisible)
    this.range.selectNodeContents(jApp[as].a.children[3]);//Select the entire contents of the element with the this.range
    this.range.collapse(false);//collapse the this.range to the end point. false means collapse to end rather than the start
    this.sel.removeAllRanges();//remove any selections already made
    this.sel.addRange(this.range);//make the this.range you have just created the visible this.sel
}

//-----------------------------------------------
// - toggle editor mode for a dragable element
CM.prototype.tog = function(){	

	// set the active class
	this.parentElement.className = this.parentElement.className + ' active';

	// display the correct properties toolbar
	cm.setTools(this.dataset.as, this.parentElement);

	// set the necessary control panels
	tc.setPanels(this.dataset.as, jApp.nVals[this.dataset.as][this.parentElement.dataset.key]);

	// set the active rrr element
	rm.a = rm.h[this.parentElement.dataset.r];

	// hide the toggler element
	this.style.display = 'none';
}

//-----------------------------------------------
// - display the correct toolbar when toggling 
//   between user defined elements
// - state --> active state of clicked elem (str)
// - elem --> activated elem
CM.prototype.setTools = function(state, elem){

	if(as){
		// remove the active class from the previously active elem
		this.j[as].a.className = this.j[as].a.className
								.substr(0, this.j[as].a.className.length - 7);
		// display the toggle editor elem
		this.j[as].a.children[0].style.display = 'block';
	}

	// if this is not the active state/properties toolbar hidden
	if(state !== as){

		// remove the new element event listener
		this.j[state].compBtn
			.removeEventListener('click', this.j[state].newElem, false);

		// trigger the click event to show the toolbar/initialize
		this.j[state].compBtn.click();
	
	// else if the correct toolbar is already showing
	}else{
		// hide the rrr element
		this.j[as].a.children[1].style.display = 'none';
		// button default
		this.j[as].rBtn.className = 'btn btn-default';
	}

	// set the active element, use dataset for race conditions
	this.j[state].a = elem;
	this.j[state].ai = elem.dataset.key;
}

//-----------------------------------------------
// - move active textbox to the front of all 
//   elements in the dragCanvas
CM.prototype.move2front = function(){

	// incriment the rm z-index property
	rm.z++;

	// set the nVals property
	jApp.nVals[as][jApp[as].ai].z = 

	// set the active textbox z index
	rm.a.el.style.zIndex = 

	// set the z index for the stylesheet
	document.styleSheets[7].cssRules[rm.a.el.dataset.r]
		.style.zIndex = rm.z;
}

//-----------------------------------------------
// - set events on new content editable elements
// - ce --> content editable element
CM.prototype.conEdit = function(ce){

	// remove link icon
	ce.innerHTML = '';

	// set content editable
	ce.contentEditable = true;

	// focus on the element
	ce.focus();

	// event to determine active exec commands
	ce.addEventListener('keyup', this.ts.qCom, false);
	ce.addEventListener('focus', this.ts.qCom, false);

	// set control panel properties of foreColor & backColor
	ce.addEventListener('keyup', this.tc.qCol, false);

}











































//-----------------------------------------------
//				 TS (text styler)
// 			   --------------------
//
// - handle execCommand button events
//
// - temp variables t & u 
//
//-----------------------------------------------

var TS = function(c){

	// get all the execCommand buttons (toolbar only)
	this.t = document.querySelectorAll('[data-excom]'); 

	// add event listeners to the buttons
	for(var i = 0; i < this.t.length; i++)
		this.t[i].addEventListener('click', this.exCom, false);

	// add keyup event to existing content-editable divs
	this.t = dragCanvas.getElementsByClassName('content-edit');
	for(var i = 0; i < this.t.length; i++){
		this.t[i].addEventListener('keyup', this.qCom, false);
		this.t[i].addEventListener('focus', this.qCom, false);
	}

	// init the font size
	this.initFS();
}

//-----------------------------------------------
// - init font size events
TS.prototype.initFS = function(){

	// get the text size input group/dropdown menu
	this.t = document.getElementsByClassName('text-size');

	// add keyup event listener to the input
	this.t[0].children[0]
		.addEventListener('keyup', this.keyFS, false);

	// init the dropdown
	this.t[0].children[1].children[0]
		.addEventListener("click", rsApp.toggleDropdown, false);

	// add click event to font sizes
	this.u = this.t[0].children[1].children[1].children;
	for(var i = 0; i < this.u.length; i++)
		this.u[i].children[0].addEventListener('click', this.clickFS, false);

}

//-----------------------------------------------
// - buttons that employ the execCommand 
//   function:
//    + bold			+ superscript
//    + italic			+ justify left
//    + underline		+ justify center
//    + strikethrough 	+ justify right
//    + subscript 		+ justify full
TS.prototype.exCom = function(e){ e.preventDefault();
	// focus on the element
	jApp[as].a.children[3].focus();
	// set the cursor to the end if necessary
	cm.setEnd();
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
	ts.qch();
	// set the html property
	jApp.nVals[as][this.parentElement.dataset.key].html = this.innerHTML;
	// prompt save
	jApp.deltaVals();
}

//-----------------------------------------------
// - query command state keyup helper
// - theoretically should run a tinsy bit faster
TS.prototype.qch = function(){
	// temp variable get the text style buttons hashmap
	this.t = jApp[as].c.b;
	// set the class on the wysiwyg btns
	for(var x in this.t)
		this.t[x].className = (document.queryCommandState(x)) ?
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
	jApp[as].a.children[3].focus();
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
	jApp[as].a.children[3].focus();
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

	// add keyup event to existing content-editable divs
	this.t = dragCanvas.getElementsByClassName('content-edit');
	for(var i = 0; i < this.t.length; i++)
		this.t[i].addEventListener('keyup', this.qCol, false);

	// temp variable
	this.t = 
	this.u = null;
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
TC.prototype.hexText = function(e){

	// if the user hit the left or right array
	if(e.keyCode == 37 || e.keyCode == 39) return;
	
	// if the first character is not a #
	if(this.value.charAt(0) != "#")
		// put the hashtag in front of the text
		this.value = "#" + this.value;

	// remove any input that is not 0-9, A-F
	this.value = "#" + this.value.substr(1,6).replace(/[^0-9a-f]+/gi, '');

	// if the input is now the proper length & format
	if(this.value.length == 7){

		// set the color elements
		tc.setElems(this.value, this.dataset.i, as);

		// set the property
		sc[this.dataset.func](this.value);
	}
}

//-----------------------------------------------
// - HTML5 color pick change event
TC.prototype.colorPick = function(){

	// set the color elements
	tc.setElems(this.value, this.dataset.i, as);

	// set the property
	sc[this.dataset.func](this.value, as);
}

//-----------------------------------------------
// - user clicks one of the color wheel colors
// - set text
// - set color icon
// - set html5 color picker
// - set background
TC.prototype.wheelBtn = function(){

	tc.setElems(this.dataset.hex, this.parentElement.parentElement.dataset.i, as);

	// set the property
	sc[this.parentElement.parentElement.dataset.func](this.dataset.hex, as);
}

//-----------------------------------------------
// - transparent checkbox change event 
// - change the opacity
// - set execCommand or background color
// - keep track of previous color, possibly reset
TC.prototype.trans = function(){
	
	// if checked --> unchecked
	if(this.checked){

		// unset the colors
		tc.colorUnset(this, this.dataset); 

		return;
	
	// unchecked --> checked
	}

	// set the last color
	tc.setElems(this.dataset.lasthex, this.dataset.i, as);

	// set the active element
	if(this.dataset.func)
		sc[this.dataset.func](this.dataset.lasthex, as);

	// set the opacity of the parent element
	this.parentElement.style.opacity = '0.5';
}
//-----------------------------------------------
// - helper function to set control panel and
//   active element transparent styles & props
// - i --> control panel index
TC.prototype.makeTrans = function(i, state){

		// clear the colors
		jApp[state].c.icon[i].style.color = '#444';
		jApp[state].c.icon[i].style.backgroundColor = '#FFF';

		// clear the text
		jApp[state].c.texti[i].value = '';

		// white out the html5 color picker
		jApp[state].c.picki[i].value = '#FFFFFF';
}
//-----------------------------------------------
// - unset to the contorl panel colors to blank
// - vals --> the dataset object 
TC.prototype.colorUnset = function(elem, vals){

		// update the active drag element
		if(vals.func)
			sc[vals.func]('transparent', as);

		// update the control panel elements
		tc.makeTrans(vals.i, as);

		// set the lasthex attribute
		elem.setAttribute('data-lasthex', vals.lasthex );

		// set the opacity of the parent element
		elem.parentElement.style.opacity = '1';
}

//-----------------------------------------------
// - set color elements of control panel
// - i => index of elements in array
TC.prototype.setElems = function(hex, i, state){

	// set the text input
	jApp[state].c.texti[i].value = 

	// set the color picker input
	jApp[state].c.picki[i].value = 

	// set the icon background color
	jApp[state].c.icon[i].style.backgroundColor = hex;

	// set the icon color
	jApp[state].c.icon[i].style.color = this.hexBright( this.hexToRgb( hex ) ) ? '#444' : '#FFF';

	// uncheck the transparency checkbox
	if(hex != 'transparent'){
		jApp[state].c.checki[i].checked = false;
		jApp[state].c.checki[i].parentElement.style.opacity = '0.5';
		jApp[state].c.checki[i].setAttribute('data-lasthex', hex);
	}
}

//-----------------------------------------------
// - keyup set control panel color
TC.prototype.qCol = function(){

	// set the foreColor control panel
	tc.setElems(
		tc.rgbToHex(
			document.queryCommandValue('foreColor')
				.split('(')[1].split(')')[0].split(',')
		),
		0,
		as
	);

	// set the backColor control panel
	tc.setElems(
		tc.rgbToHex(
			document.queryCommandValue('backColor')
				.split('(')[1].split(')')[0].split(',')
		),
		1,
		as
	);
}

//-----------------------------------------------
// - set the applicable control panels
// - state --> active state of clicked elem
// - props --> corresponding nVals properties obj
TC.prototype.setPanels = function(state, props){

	// get the starting index of the control panel elems
	this.u = (state == 'imgs') ? 0 : 2;

	// if the background color is transparent
	if(props.color == 'transparent')
		// make the color properties transparent
		this.makeTrans(this.u, state);
	else
		// set the color properties elems
		this.setElems(props.color, this.u, state);

	// set the border control panel
	this.setElems(props.bordercolor, this.u + 1, state);  // border

	// set the sliders and text inputs
	cs.setSliders(state, props);

	// set the shadow control panel
	ss.shadowPan(state, this.u+2, props.shadow);

	// set the visibility checkboxes
	cs.setVis(state, props.layout);

	// if btns, set the link panel
}
















//-----------------------------------------------
//				  SC (set colors)
//				-------------------
//
// - set color properties of user defined elems
//
//-----------------------------------------------

var SC = function(j){ // j --> this.j object

	// temp variable
	this.t = null;

	// reference to this.j
	this.j = j;
}

//-----------------------------------------------
// - set foreColor of content editable
SC.prototype.foreColor = function(hex, state){

	// focus on the active element
	this.j[state].a.children[3].focus(); 

	// set the cursor to the end
	cm.setEnd();
	
	// set the execCommand	
	document.execCommand('foreColor', false, hex);
}

//-----------------------------------------------
// - set backColor of content editable
SC.prototype.backColor = function(hex, state){

	// focus on the active element
	this.j[state].a.children[3].focus(); 

	// set the cursor to the end
	cm.setEnd();
	
	// set the execCommand	
	document.execCommand('backColor', false, hex);

}

//-----------------------------------------------
// - set border color of active element
SC.prototype.bgColor = function(hex, state){

	// if this is a button
	if(state == 'btns')
		// set the element background color
		this.j[state].a.style.backgroundColor = hex;
	else
		this.j[state].a.children[2].style.backgroundColor = hex;

	// update the nVals obejct
	this.j.nVals[state][this.j[state].ai].color = hex;

	// prompt save 
	this.j.deltaVals();

}

//-----------------------------------------------
// - set border color of active element
SC.prototype.borderColor = function(hex, state){

	// if there is no border thickness
	if(!this.j.nVals[state][this.j[state].ai].borderwidth)
		// set the border thickness to 1
		this.border1(state);
	
	// if this is a textbox
	if(state == 'tbs')
		// set the element background color
		this.j.tbs.a.children[2].style.borderColor = hex;
	else
		// set the element background color
		this.j[state].a.style.borderColor = hex;

	// update the nVals obejct
	this.j.nVals[state][this.j[state].ai]['bordercolor'] = hex;

	// prompt save 
	this.j.deltaVals();
}

//-----------------------------------------------
// - border color thickness helper
SC.prototype.border1 = function(state){
	this.t = document.getElementById(state + 'Cpanels')
			.getElementsByClassName('thickness-form')[0]
				.children[1];
	this.t.value = 
	this.t.parentElement.children[2].value = 
	this.j.nVals[state][this.j[state].ai].borderwidth = 1;
	cs.setT(1, as);
}

//-----------------------------------------------
// - set background color of active element
// - only used for the background component
SC.prototype.bg = function(hex, state){

	// set preview background color
	bgElem.parentElement.style.backgroundColor = 

	// & update the new values object
	this.j.nVals.bg[0].color = hex;

	// notify root node that values have changed
	this.j.deltaVals();
}

//-----------------------------------------------
// - set the shadow color property
// - only deal with color
SC.prototype.shadowColor = function(hex, state){

	if(hex == 'transparent'){
		// set the nVals
		ss.t.active = 0;
		
		// remove the box shadow css rule
		if(state == 'tbs')
			this.j.tbs.a.children[2].style.boxShadow = 'none';
		else
			this.j[state].a.style.boxShadow = 'none';

		return;
	}
	// // update nVals
	ss.t = this.j.nVals[state][this.j[state].ai].shadow;
	ss.t.color = hex;
	ss.update(state);
}



































//-----------------------------------------------
//				 SS (shadow style)
//			   ---------------------
//
// - set the color of the element shadow
//
// - properties sliders and inputs
// 
// - maintain shadow properties in nVals object:
//	  + color
//    + softness
// 	  + spread
//	  + x
//	  + y
//	  + inset
//
//-----------------------------------------------

var SS = function(j){

	// keep a reference to the jApp obejct
	this.j = j;

	// temp variable, loop through all the sliders
	this.t = document.querySelectorAll('.shadow .range-slider');
	for(var i = 0; i < this.t.length; i++)
		// add slide event listener
		this.t[i].addEventListener('change', this.slide, false);

	// loop through text inputs 0-99
	this.t = document.querySelectorAll('.shadow input[value="4"]');
	for(var i = 0; i < this.t.length; i++){
		// add keyup event
		this.t[i].addEventListener('keyup', this.keyA, false);
		// blur event
		this.t[i].addEventListener('blur', this.sBlur, false);
	}

	// loop through text inputs 0-99
	this.t = document.querySelectorAll('.shadow input[value="0"]');
	for(var i = 0; i < this.t.length; i++){
		this.t[i].addEventListener('keyup', this.keyB, false);
		this.t[i].addEventListener('blur', this.sBlur, false);
	}

	// loop through the inset radio buttons
	this.t = document.querySelectorAll('.shadow input[type="radio"]');
	for(var i = 0; i < this.t.length; i++)
		this.t[i].addEventListener('change', this.inset, false);

	// loop through the checkboxes
	this.t = document.querySelectorAll('.shadow input[type="checkbox"]');
	for(var i = 0; i < this.t.length; i++)
		this.t.checked = false;
	
}

//-----------------------------------------------
// - update the shadow of the active element
SS.prototype.update = function(state, i){
	// make sure we got an i variable, or use last checkbox in array
	i = i || this.j[state].c.checki.length - 1;
	// set the nVal as active
	this.t.active = 1;
	// assemble the shadow css string
	this.t = this.t.x + 'px '+ 
			 this.t.y + 'px '+ 
			 this.t.softness + 'px '+
			 this.t.spread + 'px '+
			 this.t.color + 
			 ((this.t.inset) ? ' inset' : '');
	// get the nVals of the shadow
	if(as == 'tbs')
		this.j.tbs.a.children[2].style.boxShadow = this.t;
	else
		this.j[state].a.style.boxShadow = this.t;
	// prompt save
	this.j.deltaVals();
}

//-----------------------------------------------
// - slider event
// - set the text input
// - update the shadow
SS.prototype.slide = function(){
	// set the nVals object
	ss.t = jApp.nVals[as][jApp[as].ai]['shadow'];
	// set the cooresponding property
	ss.t[this.parentElement.dataset.prop] = 
	// set the text input
	this.parentElement.children[1].value = parseInt(this.value);
	// update
	ss.update(as, this.parentElement.dataset.i);
}

//-----------------------------------------------
// - keyup event for text inputs that range from
//   0 to 99
SS.prototype.keyA = function(){

	// replace all non-numeric characters
	this.value = this.value.replace(/[^\d]/g, '');

	// if there is no input, return 
	if(!this.value) return;

	// set the nVals temp variable
	ss.t = jApp.nVals[as][jApp[as].ai]['shadow'];

	// update the slider input
	this.parentElement.children[2].value = 

	// update the nVals
	ss.t[this.parentElement.dataset.prop] = parseInt(this.value);

	// update
	ss.update(as, this.parentElement.dataset.i);
}

//-----------------------------------------------
// - keyup event for text inputs that range from
//   -99 to 99
SS.prototype.keyB = function(){

	// replace all non numeric characters
	this.value = this.value.replace(/[^\-?\d]/g, '');

	// if there is no input return
	if(!this.value ) return;

	// set the nVals temp variable
	ss.t = jApp.nVals[as][jApp[as].ai]['shadow'];

	// update the slider input
	this.parentElement.children[2].value = 

	// update the nVals
	ss.t[this.parentElement.dataset.prop] = parseInt(this.value);	

	// update
	ss.update(as, this.parentElement.dataset.i);
}

//-----------------------------------------------
// - blur empty text input
SS.prototype.sBlur = function(){
	// reset the value
	this.value = jApp.nVals[as][jApp[as].ai]['shadow'][this.parentElement.dataset.prop];
}

//-----------------------------------------------
// - change event, radio buttons shadow inset
SS.prototype.inset = function(e){ e.preventDefault();
	// set the nVals object
	ss.t = jApp.nVals[as][jApp[as].ai]['shadow'];	
	// set the inset value
	ss.t.inset = parseInt(this.value);
	// update the shadow
	ss.update(as, this.dataset.i);
}

//-----------------------------------------------
// - set the corresponding shadow control panel 
//   values when user toggles between elements
// state --> clicked elem obj type active state
// i --> control panel index
// shadow --> nVals shadow props object literal
SS.prototype.shadowPan = function(state, i, shadow){

	// get all the shadow inputs
	this.t = document.getElementById(state + 'Cpanels')
				.querySelectorAll('.shadow input');

	// set the inputs
	this.setInput(shadow);

	// set the color
	if(props.color == 'transparent'){
		// make the color properties transparent
		tc.makeTrans(i, state);
		// set the transparency checkbox
		this.t[2].checked = true; 
		this.t[2].parentElement.style.opacity = '1';
		this.t[2].setAttribute('data-lasthex', shadow.color);
	}else{
		// set the color properties elems
		tc.setElems(shadow.color, i, state);
		// set the transparency checkbox
		this.t[2].checked = true; 
		this.t[2].parentElement.style.opacity = '1';
	}
}

//-----------------------------------------------
// - helper function for shadowPan
// - set the inputs elements of new or toggled
//   user defined object shadow
// - assume t is already set
SS.prototype.setInput = function(shadow){
	// set the softness
	this.t[3].value = 
	this.t[4].value = shadow.softness;
	// set the spread
	this.t[5].value = 
	this.t[6].value = shadow.spread;
	// set the x positioning
	this.t[7].value = 
	this.t[8].value = shadow.x;
	// set the y positioning
	this.t[9].value = 
	this.t[10].value = shadow.y;
	// set the inset
	if(shadow.inset)
		this.t[12].checked = true;
	else
		this.t[11].checked = true;
}

//-----------------------------------------------
// - toggle box shadow css rule
// - only deals with removing the shadow
// SS.prototype.tog = function(){

// 	// let another function set the color
// 	if(!this.checked) return;

// 	// set the nVals
// 	ss.t.active = 0;
	
// 	// remove the box shadow css rule
// 	if(as == 'imgs')
// 		jApp[as].a.style.boxShadow = 'none';
// 	else
// 		jApp[as].a.children[2].style.boxShadow = 'none';
// }






























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
// - border thickness input and slider
//
// - set the visibility of an element in various
//   layouts
// 
// - toggle the resize, reposition, rotate elem
//
// - temp variables t & u
//
//-----------------------------------------------

var CS = function(j){ // j --> referrence to jApp obj

	// jApp
	this.j = j;

	// opacity

	// loop through all opacity forms
	this.t = document.getElementsByClassName('opacity-form');
	for(var i = 0; i < this.t.length; i++){

		// keyup event
		this.t[i].children[1].addEventListener('keyup', this.oText, false);

		// slider event
		this.t[i].children[2].addEventListener('change', this.oSlide, false);
	}

	// blur

	// loop through all the blur forms
	this.t = document.getElementsByClassName('blur-form');
	for(var i = 0; i < this.t.length; i++){

		// keyup event
		this.t[i].children[1].addEventListener('keyup', this.bText, false);

		// slider event
		this.t[i].children[2].addEventListener('change', this.bSlide, false);
	}

	// border roundness

	// loop through all the border forms
	this.t = document.getElementsByClassName('roundness-form');
	for(var i = 0; i < this.t.length; i++){

		// keyup event
		this.t[i].children[1].addEventListener('keyup', this.rUp, false);

		// keydown event
		this.t[i].children[1].addEventListener('keydown', this.rDo, false);

		// slider event
		this.t[i].children[2].addEventListener('change', this.rSlide, false);
	}

	// toggle resize, reposition, rotate

	// loop through all the properties toolbars
	this.t = document.getElementsByClassName('opts-toolbar');
	for(var i = 0; i < this.t.length; i++){

		// get the buttons
		this.u = this.t[i].getElementsByClassName('btn');

		// loop through the buttons
		for(var k = 0; k < this.u.length; k++){ 

			// if this is the toggle button
			if(this.u[k].children[0].className == 'glyphicon glyphicon-fullscreen')
				// toggle rrr event
				this.u[k].addEventListener('click', this.rrr, false);
			else
				// hide the rrr element event
				this.u[k].addEventListener('click', this.rOff, false);
		}
	}

	// init the border thickness events
	this.initThik();

	// init the visibility checkbox events
	this.initVis();
}

//-----------------------------------------------
// - init border thickness
CS.prototype.initThik = function(){

	// loop through all the border forms
	this.t = document.getElementsByClassName('thickness-form');
	for(var i = 0; i < this.t.length; i++){

		// keyup event
		this.t[i].children[1].addEventListener('keyup', this.tText, false);

		// slider event
		this.t[i].children[2].addEventListener('change', this.tSlide, false);
	}
}

//-----------------------------------------------
// - init visibility checkboxes
CS.prototype.initVis = function(){

	// loop through all the visibility checkboxes
	this.u = document.getElementsByClassName('vis');
	for(var i = 0; i < this.u.length; i++)

		// add the event listener to the checkbox
		this.u[i].children[0].addEventListener('change', this.vis, false);
}

//-----------------------------------------------
// - set the opacity properties
// - o --> opacity value [0 - 1]
// - state --> active state
CS.prototype.setO = function(o, state){

	if(state == 'imgs')
		// change the opacity of the image only
		this.j[state].a.children[3].style.opacity = parseFloat(o);
	else
		// change the opacity of the active textbox
		this.j[state].a.style.opacity = parseFloat(o);

	// update values
	this.j.nVals[state][this.j[state].ai]["opacity"] = parseFloat(o);

	// prompt save
	this.j.deltaVals();
}

//-----------------------------------------------
// - set the blur properties
// - b --> blur value [0 - 1]
// - state --> active state
CS.prototype.setB = function(b, state){

	// update values
	this.j.nVals[state][this.j[state].ai]["blur"] = parseInt(b);

	// change the blur of the background img
	this.j[state].a.style.filter = 
	this.j[state].a.style.webkitFilter = (b == 0) ? 'none' : 'blur('+b+'px)'; 

	// prompt save
	this.j.deltaVals();

}

//-----------------------------------------------
// - set border thickness
// - t --> thickness in px (int or str)
// - state --> active state
CS.prototype.setT = function(t, state){
	
	if(state == 'tbs')
		this.j.tbs.a.children[2].style.borderWidth = t + 'px';
	else
		this.j[state].a.style.borderWidth = t + 'px';
		
	// update the nVals
	this.j.nVals[state][this.j[state].ai]['borderwidth'] = parseInt(t);

	// prompt save
	this.j.deltaVals();
}

//-----------------------------------------------
// - when user slides opacity slider
CS.prototype.oSlide = function(){

	// set the value of the text input
	this.parentElement.children[1].value = this.value;

	// set the opacity properties
	cs.setO(this.value, as);
}

//-----------------------------------------------
// - when user slides blur slider
CS.prototype.bSlide = function(){

	// set the value of the text input
	this.parentElement.children[1].value = this.value;

	// set the blur properties
	cs.setB(this.value, as);
}

//-----------------------------------------------
// - when user slides border thickness slider
CS.prototype.tSlide = function(){

	// set the value of the text input
	this.parentElement.children[1].value = this.value;

	// set the elem thickness
	cs.setT(this.value, as);
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

	// set the opacity properties
	cs.setO(this.value, as);
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
	this.parentElement.children[2].value = this.value;

	// set the object properties
	cs.setB(this.value, as);
}

//-----------------------------------------------
// - keyup set border width text input
CS.prototype.tText = function(){

	// if there is no text, return
	if(!this.value) return;

	// replace all non-numeric characters
	this.value = this.value.replace(/[^\d]/g, '');

	// if the value is greater than 10
	if(parseInt(this.value) > 10)
		// remove the last number
		this.value = this.value.substr(0,1);

	// update the slider input
	this.parentElement.children[2].value = this.value;

	// update the object properties
	cs.setT(this.value, as);
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
	jApp.nVals[as][jApp[as].ai].layout[this.value].v = (this.checked) ? 1 : 0;

	// get the checkbox of the active state object
	cs.u = jApp[as].c.v;

	// if all three are unchecked
	if(!cs.u[0].checked
	&& !cs.u[1].checked
	&& !cs.u[2].checked){

		// recheck 
		this.checked = true;

		// prompt delete modal
		jApp[as].confirmDel(); return;
	}

	// temp variable, more efficient
	cs.t = (this.checked) ? 'block' : 'none';

	// set the style sheet
	if(this.value == 'mobile') 		// mobile
		document.styleSheets[7].cssRules[jApp[as].a.dataset.r]
			.style.display = cs.t;
	else if(this.value == 'tablet') // tablet
		document.styleSheets[7].cssRules[rm.i + 1].cssRules[jApp[as].a.dataset.r]
			.style.display = cs.t;
	else 							// desktop
		document.styleSheets[7].cssRules[rm.i + 2].cssRules[jApp[as].a.dataset.r]
			.style.display = cs.t;

	// checkbox cooresponds to current layout
	if(this.value == layout.a)
		// add an inline style
		jApp[as].a.style.display = cs.t;
}

//-----------------------------------------------
// - set checkboxes of cPanel when user activates
//   an dragable object
// - state --> object type of toggled element
// - layout --> cooresponding layout object
CS.prototype.setVis = function(state, layout){
	
	// get the checkboxes of the active state toolbar
	this.t = jApp[state].c.v;

	// set them in accordance with the user defined values
	this.t[0].checked = (layout.mobile.v);
	this.t[1].checked = (layout.tablet.v);
	this.t[2].checked = (layout.desktop.v);
}

//-----------------------------------------------
// - keyup adjust the roundness
// - numbers only
// - set the css of the elements
CS.prototype.rUp = function(){

	// if there is no input, return 
	if(!this.value) return;

	// replace all non-numeric characters
	this.value = this.value.replace(/\D/g, '');

	// if the value is greater than 10
	if(parseInt(this.value) > 100)
		// remove the last number
		this.value = this.value.substr(0,2);

	// if the leading number is a 0, remove it
	if(this.value.charAt(0) == '0')
		this.value = this.value.substr(1, this.value.length);

	// set the slider input
	this.parentElement.children[2].value = this.value;

	// set the roundness of the active dragable
	cs.elemRound(parseInt(this.value), as);
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

	// set the slider
	this.parentElement.children[2].value = this.value;

	// set the roundness of the active dragable
	cs.elemRound(parseInt(this.value), as);
}

//-----------------------------------------------
// - user slides roundness slider input
CS.prototype.rSlide = function(){

	// set the value of the text input
	this.parentElement.children[1].value = this.value;

	cs.elemRound(parseInt(this.value), as);
}
//-----------------------------------------------
// - set the roundness of the correct active elem
CS.prototype.elemRound = function(val, state){
	// set the inline styles
	if(as == 'tbs')
		this.j.tbs.a.children[2].style.borderRadius = (val/2) + '%';
	else
		this.j[state].a.style.borderRadius = (val/2) + '%';

	// update the nVals
	this.j.nVals[state][this.j[state].ai]['round'] = parseInt(this.value);

	// prompt save
	this.j.deltaVals();
}

//-----------------------------------------------
// - set sliders and inputs when user toggles or
//   defines new element
// - sets:
//	  + opacity
//	  + blur
//	  + border roundness
//	  + border thickness
// - state --> actived state/obj type
// - props --> properties of actived element
CS.prototype.setSliders = function(state, props){

	// get the range/text elements
	this.u = jApp[state].c.s;

	// set the opacity
	this.u.opacity[0] = 
	this.u.opacity[1] = props.opacity;

	// set the blur
	this.u.blur[0] = 
	this.u.blur[1] = props.blur;

	// set the border roundness
	this.u.round[0] = 
	this.u.round[1] = props.round;

	// set border width
	this.u.borderwidth[0] = 
	this.u.borderwidth[1] = props.borderwidth;
}