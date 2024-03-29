
var ts;
//-----------------------------------------------
//				   TB (textbox)			
//			     ----------------
//
// - manage & track textbox objects
//
// - delete textbox objects
//
// - toggle textbox properties toolbar
//
//-----------------------------------------------

/* CONSTRUCTOR */

var TB = function(){

	// indexer for hashmap
	this.i = 0;

	// hashmap of all the textboxes
	this.h = {}

	// active textbox
	this.a = null;

	// init textbox style object
	ts = this.s = new TS();

	// init textbox color object
	this.c = new TC();

	// init textbox editor object
	this.te = new TE();

	// help move the caret to the end, temp vars init
	this.range = null;
	this.sel = null;

	// add event listener to the new textbox btn
	jumboToolbar.children[0].children[1].children[1]
		.addEventListener('click', this.newTB, false);

	// delete textbox prompt modal
	tbsToolbar.children[3].children[0]
		.addEventListener('click', this.confirmDel, false);

	// init existing textboxes

	// temp variable, get all existing textboxes
	this.t = dragCanvas.getElementsByClassName('textbox');

	// temp variable get layout
	if(document.body.offsetWidth < 767)
		this.sel = 'mobile';
	else if(document.body.offsetWidth < 1200)
		this.sel = 'tablet';
	else
		this.sel = 'desktop';

	// get the iValss
	this.range = JSON.parse( document.getElementById("i-vals").value );

	// loop through the textboxes
	for(this.i; this.i < this.t.length; this.i++){

		// push elem onto the hashmap
		this.h[this.i] = this.t[this.i];

		// make that shit content editable
		this.t[this.i].children[2].contentEditable = true;

		// init toggle editor events
		this.te.initLayer(this.t[this.i]);

		// event to determine active exec commands
		this.t[this.i].children[2].addEventListener('keyup', this.s.qCom, false);
		this.t[this.i].children[2].addEventListener('focus', this.s.qCom, false);

		// events to determine fore & back colors
		this.t[this.i].children[2].addEventListener('keyup', this.c.qCol, false);

		// set the height and width
		this.t[this.i].children[2].style.height = this.range.tbs[this.i].layout[this.sel].h+'px';
		this.t[this.i].children[2].style.width = this.range.tbs[this.i].layout[this.sel].w+'px';
	}this.i--;
}

//-----------------------------------------------
// - user closes textbox control panel
TB.prototype.close = function(){

	// re-add the newTB event listener
	jumboToolbar.children[0].children[1].children[1]
		.addEventListener('click', this.newTB, false);

	// if there is no active textbox, return
	if(!this.a) return;

	// remove the active class
	this.a.className = 'textbox';

	// show the .toggle-edit elem
	this.a.children[0].style.display = 'block';

	// make sure the drag buttons are hidden
	this.a.children[1].style.display = 'none';

	// blur
	this.a.children[2].blur();

	// nullify the active textbox
	this.a = null;
}

//-----------------------------------------------
// - create new textbox element when user clicks
//   the jumbo toolbar button
TB.prototype.newTB = function(e){ e.preventDefault();

	// set this to active textbox status
	tbs.a = tbs.createElem();

	// append the new textbox to the drag canvas
	dragCanvas.appendChild(tbs.a);

	// create & activate the rr object
	rm.i++;
	rm.z++;
	rm.h[rm.i] = new rr(tbs.a);
	rm.a = rm.h[rm.i];

	// add the new textbox to the nVals
	jApp.nVals.tbs[tbs.i] = {
		html : '',
		color : 'transparent',
		opacity : 1,
		blur: 0,
		z : rm.z,
		round : 0,
		layout : {
			// w => width
			// h => height
			// x => left
			// y => top
			// s => scale
			// a => angle
			// r => ?
			// v => visible
			mobile  : { w : 80, h : 27, x : 48, y : 44, s : 1, a : 0, v : 1 },
			tablet  : { w : 80, h : 27, x : 48, y : 44, s : 1, a : 0, v : 1 },
			desktop : { w : 80, h : 27, x : 48, y : 44, s : 1, a : 0, v : 1 }
		}
	};

	// attribtue referrence to rr index
	tbs.a.setAttribute('data-r', rm.i);
	
	// insert the new css rules
	rm.newRules();

	// apply the event listeners
	tbs.ae();

	// set the checkbox visibility
	cs.setVis();
}

//-----------------------------------------------
// - helper function for newTB
// - create the new element
// - create the css rules for the new element
TB.prototype.createElem = function(){

	// increment the indexer
	this.i++;

	// create a new textbox elem, store it in the hashmap
	this.h[this.i] = document.createElement('div');

	// set it to active
	this.a = this.h[this.i];

	// give the element an index key
	this.a.setAttribute('data-key', this.i);

	// apply the textbox class
	this.a.className = 'textbox active';

	// set the transform style
	this.a.style.transform = 'matrix(1, 0, 0, 1, 0, 0)';

	// add the 3 children
	this.a.innerHTML = '<div class="toggle-edit" style="display:none;">'+
					   		'<button type="button" class="btn btn-default">'+
								'<span class="glyphicon glyphicon-pencil"></span>'+
							'</button>'+
					   '</div>'+ 
					   document.getElementById('drag-btns-html').value+
					   '<div class="content-edit"></div>';

	// apply toggle editor events
	this.te.initLayer(this.a);

	// set designMode to 'On'
	this.a.children[2].contentEditable = true;

	return this.a;
}

//-----------------------------------------------
// - apply event listeners to newly created
//   textbox element
TB.prototype.ae = function(){

	// focus on the element
	this.a.children[2].focus();

	// event to determine active exec commands
	this.a.children[2].addEventListener('keyup', this.s.qCom, false);
	this.a.children[2].addEventListener('focus', this.s.qCom, false);

	// events to determine fore & back colors
	this.a.children[2].addEventListener('keyup', this.c.qCol, false);

	// remove the newTB event listener
	jumboToolbar.children[0].children[1].children[1]
		.removeEventListener('click', this.newTB, false);
}

//-----------------------------------------------
// - launch modal
// - set modal inner html
// - set modal callback
TB.prototype.confirmDel = function(){

	// if the textbox is empty & has no bg color
	if(!tbs.a.children[2].childNodes.length 
	&& !tbs.a.children[2].style.backgroundColor){
		// delete it & return
		tbs.del(); return;
	}

	// set the modal title
	confModal.getElementsByTagName("h4")[0]
		.innerHTML = '<div class="dash-box" aria-hidden="true">Aa</div>' + 
    				 'Delete background image';

   	// set modal body
   	confModal.children[0].children[0].children[1]
   		.innerHTML = '<p>Are you sure you want to delete this textbox?</p>';

   	// create a copy of the textbox
   	confModal.children[0].children[0].children[1]
   		.appendChild( tbs.copy() );

   	// set modal callback
   	jApp.modal.callback = tbs.del;

   	// launch the modal
   	jApp.modal.launch();

}

//-----------------------------------------------
// - helper function to replicate textbox
TB.prototype.copy = function(){

	// create a copy of the textbox
   	this.t = document.createElement('div');
   	
   	// center styling
   	this.t.style.textAlign = 'center';

   	// clone the textbox
   	this.t.appendChild(this.a.children[2].cloneNode(true));
   	
   	// remove the editable property
   	this.t.children[0].contentEditable = false;

   	// add a border
   	this.t.children[0].style.border = '1px solid #ccc';

   	// center it
   	this.t.children[0].style.display = "inline-block";

   	// dimension it
   	this.t.children[0].style.width = this.a.offsetWidth + 'px';
   	this.t.children[0].style.height = this.a.offsetHeight + 'px';

   	if(this.a.offsetWidth > 200)
	   	// scale it to be no more than 200px
	   	this.t.style.transform = 'scale('+(200/this.a.offsetWidth)+','+(200/this.a.offsetWidth)+')';

	return this.t;
}

//-----------------------------------------------
// - delete active textbox
TB.prototype.del = function(){

	// gut the innards of the active textbox
	tbs.a.innerHTML = '';

	// remove it from the nVals
	jApp.nVals.tbs[tbs.a.dataset.key] = null;
	delete jApp.nVals.tbs[tbs.a.dataset.key];

	// hide it, but do not delete to maintain order
	tbs.a.style.display = 'none';

	// prompt save
	jApp.deltaVals();

	// remove the active textbox
	tbs.a = null;

	// hide the textbox properties toolbar
	jumboToolbar.children[0].children[1].children[1].click();
}



































//-----------------------------------------------
//				TS (textbox style)			
//			  ----------------------
//
// - manage the basic textbox style components:
//    + bold
//    + italic
//    + underline
//    + strikethrough
//    + subscript
//    + superscript
//    + font size
//    + justification
//
// - apply event listeners to buttons & inputs
//
//-----------------------------------------------

/* CONSTRUCTOR */

var TS = function(){

	this.sel = null;
	this.range = null;

	// add event listeners to execCommand buttons, temp var
	this.t = document.querySelectorAll('[data-excom]');
	for(var j = 0; j < this.t.length; j++)
		this.t[j].addEventListener('click', this.exCom, false);

	// keep track of the buttons for textbox
	this.tbsB = {
		bold 		  : this.t[4],
		italic		  : this.t[5],
		underline	  : this.t[6],
		strikeThrough : this.t[7],
		subscript	  : this.t[8],
		superscript	  : this.t[9],
		justifyLeft	  : this.t[0],
		justifyCenter : this.t[1],
		justifyRight  : this.t[2],
		justifyFull	  : this.t[3]
	};

	// keep track of the btn toolbar buttons
	this.btnsB = {
		bold 		  : this.t[10],
		italic		  : this.t[11],
		underline	  : this.t[12],
		strikeThrough : this.t[13],
		subscript	  : this.t[14],
		superscript   : this.t[15]
	};

	// add font size keyup event
	this.t = tbsCpanels.getElementsByTagName('input');
	this.t[0].addEventListener('keyup', this.keyFS, false);

	// init the dropdown
	this.t[0].parentElement.children[1].children[0].addEventListener("click", rsApp.toggleDropdown, false);

	// add click event to font sizes
	this.t = this.t[0].parentElement.children[1].children[1].children;
	for(var i = 0; i < this.t.length; i++)
		this.t[i].children[0].addEventListener('click', this.clickFS, false);

	// add font size keyup event
	this.t = btnsCpanels.getElementsByTagName('input');
	this.t[0].addEventListener('keyup', this.keyFS, false);

	// init the dropdown
	this.t[0].parentElement.children[1].children[0].addEventListener("click", rsApp.toggleDropdown, false);

	// add click event to font sizes
	this.t = this.t[0].parentElement.children[1].children[1].children;
	for(var i = 0; i < this.t.length; i++)
		this.t[i].children[0].addEventListener('click', this.clickFS, false);
}

//-----------------------------------------------
// - move the cursor to the end of the active div
TB.prototype.setEnd = function(){
	this.sel = window.getSelection();
	// if there is a selection or box is already in focus
	if(this.sel.toString()) return;
    this.range = document.createRange();//Create a this.range (a this.range is a like the this.sel but invisible)
    this.range.selectNodeContents(this.a.children[2]);//Select the entire contents of the element with the this.range
    this.range.collapse(false);//collapse the this.range to the end point. false means collapse to end rather than the start
    this.sel.removeAllRanges();//remove any selections already made
    this.sel.addRange(this.range);//make the this.range you have just created the visible this.sel
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
	tbs.s.qch();
	// set the html property
	jApp.nVals[jApp.a][this.parentElement.dataset.key].html = this.innerHTML;
	// prompt save
	jApp.deltaVals();
}

//-----------------------------------------------
// - query command state keyup helper
// - theoretically should run a tinsy bit faster
TS.prototype.qch = function(){
	// get the active button group
	this.t = this[jApp.a + 'B'];
	// set the class on the wysiwyg btns
	for(var x in this.b)
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
	jApp[jApp.a].a.children[2].focus();
	ts.setEnd();

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
	ts.setEnd();
	// set the font size
	document.execCommand('fontSize', false, this.dataset.fs);
}





































//-----------------------------------------------
//				TC (textbox color)			
//			  ----------------------
//
// - set the various textbox color properties
//
// - manage colors in control panels
//
// - set opacity and blur
//
//-----------------------------------------------
var TC = function(){

	// temp variable, get inputs
	this.t = tbsCpanels.getElementsByTagName('input');

	// keep track of the hex inputs
	this.textis = [this.t[1], this.t[3], this.t[6]];

	// keep track of the color pickers
	this.pickis = [this.t[2], this.t[4], this.t[7]];

	// keep track of transparency checkbox
	this.checkis = [null, this.t[5], this.t[8]];

	// add the blur & opacity event listeners
	this.t[9].addEventListener('keyup', this.bText, false);
	this.t[10].addEventListener('change', this.bSlide, false);
	this.t[11].addEventListener('keyup', this.oText, false);
	this.t[12].addEventListener('change', this.oSlide, false);

	// get the paint buttons
	this.t = tbsCpanels.querySelectorAll('.paint-btn');

	// keep track of the current color icon btn
	this.icons = [this.t[0], this.t[1], this.t[2]];

	// add hex tbs event listeners
	this.textis[0].addEventListener('keyup', this.hexText, false);
	this.textis[1].addEventListener('keyup', this.hexText, false);
	this.textis[2].addEventListener('keyup', this.hexText, false);

	// add color picker event listeners
	this.pickis[0].addEventListener('change', this.colorPick, false);
	this.pickis[1].addEventListener('change', this.colorPick, false);
	this.pickis[2].addEventListener('change', this.colorPick, false);

	// transparency checkbox
	this.checkis[1].addEventListener('change', this.trans, false);
	this.checkis[2].addEventListener('change', this.trans, false);

	// // get the colorwheel btns
	this.t = tbsCpanels.querySelectorAll('[data-hex]');

	// add event listeners to the colorwheel buttons
	for(var i = 0; i < this.t.length; i++)
		this.t[i].addEventListener('click', this.wheelBtn, false);
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

		// focus on the div
		tbs.a.children[2].focus();

		// move the caret to the end
		tbs.setEnd();

		// set the button color
		tbs.c.setColor(this.dataset.i, this.dataset.com, this.value);
	}
}

//-----------------------------------------------
// - blur event for hex input
// - set value to previous compliant hex value
TC.prototype.hexBlur = function(){
	this.value = jApp.bg.bgc.temp;
}

//-----------------------------------------------
// - html5 color picker change event
TC.prototype.colorPick = function(){
	
	tbs.c.setColor( this.dataset.i,
						  this.dataset.com,
						  this.value.toUpperCase()
						);
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
// - when user slides opacity slider
TC.prototype.oSlide = function(){

	// set the value of the text input
	this.parentElement.children[1].value = 

	// change the opacity of the active textbox
	tbs.a.children[2].style.opacity = 

	// update values
	jApp.nVals.tbs[tbs.a.dataset.key]["opacity"] = parseFloat(this.value);

	// prompt save
	jApp.deltaVals();
}

//-----------------------------------------------
// - when user slides blur slider
TC.prototype.bSlide = function(){

	// set the value of the text input
	this.parentElement.children[1].value = 

	// update values
	jApp.nVals.tbs[tbs.a.dataset.key]["blur"] = parseInt(this.value);

	// change the blur of the background img
	tbs.a.children[2].style.filter = 
	tbs.a.children[2].style.webkitFilter = "blur("+this.value+"px)"; 

	// prompt save
	jApp.deltaVals();
}

//-----------------------------------------------
// - keyup opacity text input
TC.prototype.oText = function(){ 

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
	tbs.a.children[2].style.opacity = 

	// update values
	jApp.nVals.tbs[tbs.a.dataset.key]["opacity"] = parseFloat(this.value);

	// prompt save
	jApp.deltaVals();
}

//-----------------------------------------------
// - keyup blur text input
// - must be an integer between 0 and 10
TC.prototype.bText = function(){

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
	jApp.nVals.tbs[tbs.a.dataset.key]["blur"] = parseInt(this.value);

	// set the blur
	tbs.a.children[2].style.filter = 
	tbs.a.children[2].style.webkitFilter = "blur("+this.value+"px)"; 

	// prompt save
	jApp.deltaVals();
}


































//-----------------------------------------------
//				TE (toggle editor)			
//			  -----------------------
//
// - create element to toggle editor mode, apply
//   event listeners
//
// - resize textbox event
//
// - toggle resize, reposition, rotate mode
//
// - move to front
//
//-----------------------------------------------

/* CONSTRUCTOR */

//-----------------------------------------------
// - el => container parent element of textbox
var TE = function(){

	/* properties */

	// temp variable
	this.t = tbsToolbar.getElementsByTagName('button');

	// set toFront button
	this.toFront = this.t[11];

	// toFront event listener
	this.toFront.addEventListener('click', rm.move2front, false);

	// clicking any toolbar button hides toggles off rrr
	for(var i = 0; i < this.t.length; i++)
		this.t[i].addEventListener('click', this.rrrOff, false);

	// exceptthe rrr button
	this.t[12].removeEventListener('click', this.rrrOff, false);

	// set toggle rrr button
	this.rrrBtn = this.t[12];

	// toggle rrr event listener
	this.rrrBtn.addEventListener('click', this.togRRR, false);
}

/* METHODS */

TE.prototype.initLayer = function(tElem){									

	// add event listeners
	// tElem.children[0].addEventListener('mouseover', this.show, false);
	// tElem.children[0].addEventListener('mouseout', this.hide, false);
	tElem.children[0].addEventListener('mousedown', this.tog, false);

	// re-dimension div event
	tElem.addEventListener('mouseup', this.reDim, false);
	tElem.addEventListener('touchend', this.reDim, false);
}

//-----------------------------------------------
// - click btn event, toggle editor mode
TE.prototype.tog = function(){

	// if there is no other active textbox
	if(!tbs.a){

		// display the control panel, first remove newTB event
		jumboToolbar.children[0].children[1].children[1]
			.removeEventListener('click', tbs.newTB, false);
		jumboToolbar.children[0].children[1].children[1].click();

	// if there is another textbox open
	}else if(tbs.a !== this.parentElement){

		// remove the active class
		tbs.a.className = 'textbox';

		// show the .toggle-edit elem
		tbs.a.children[0].style.display = 'block';

		// make sure the drag buttons are hidden
		tbs.a.children[1].style.display = 'none';
	}

	// set the active textbox
	tbs.a = this.parentElement;
	tbs.a.className = 'textbox active';

	// set active rrr
	rm.a = rm.h[this.parentElement.dataset.r];

	// hide the .toggle-edit element
	this.style.display = 'none';

	// focus on the textbox
	tbs.a.children[2].focus();

	// set the visibility checkboxes
	cs.setVis();

	// set the background color control panel
	tbs.te.setBg();

	// determine if this is the foremost element 
}

//-----------------------------------------------
// - proto.tog helper
// - set background color elements when user
//   activates existing textbox
TE.prototype.setBg = function(){

	// get all the inputs
	this.t = tbsCpanels.children[4].getElementsByTagName('input');

	// get the current textbox values
	jApp.temp = jApp.nVals.tbs[tbs.a.dataset.key];

	// set the background color
	tbs.c.setColor(2, false, jApp.temp.color);

	// set the blur
	this.t[3].value = 
	this.t[4].value = jApp.temp.blur;

	// set the opacity
	this.t[5].value = 
	this.t[6].value = jApp.temp.opacity;
}

//-----------------------------------------------
// - toggle resize, reposition, rotate btns
TE.prototype.togRRR = function(){
	// if the btns are not showing
	if(this.className == 'btn btn-default'){
		// show the .drag-btns
		tbs.a.children[1].style.display = 'block';
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
TE.prototype.rrrOff = function(){
	// hide the rrr element
	tbs.a.children[1].style.display = 'none';
	// button default
	tbs.te.rrrBtn.className = 'btn btn-default';
}

//-----------------------------------------------
// - user resizes content editable div
TE.prototype.reDim = function(){

	// make sure that we have an active textbox
	if(tbs.a === null) return;

	// if dimensions have not changed
	if(jApp.nVals.tbs[tbs.a.dataset.key].layout[jApp.layout].h == tbs.a.offsetHeight
	&& jApp.nVals.tbs[tbs.a.dataset.key].layout[jApp.layout].w == tbs.a.offsetWidth)
		// do nothing
		return;

	// set the nVals
	jApp.nVals.tbs[tbs.a.dataset.key]
		.layout[jApp.layout].h = tbs.a.offsetHeight;
	jApp.nVals.tbs[tbs.a.dataset.key]
		.layout[jApp.layout].w = tbs.a.offsetWidth; 

	jApp.deltaVals();
}

//-----------------------------------------------
// - user changes layout
// - set the height and width of the content 
//   editable div inside the textbox element
TE.prototype.setDims = function(){
	for(var x in tbs.h){
		if(tbs.h[x].children.length){
			tbs.h[x].children[2].style.width = jApp.nVals.tbs[x].layout[jApp.layout].w + 'px';
			tbs.h[x].children[2].style.height = jApp.nVals.tbs[x].layout[jApp.layout].h + 'px';
		}
	}
}











