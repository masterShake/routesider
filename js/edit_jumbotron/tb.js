//-----------------------------------------------
//				   TB (textbox)			
//			     ----------------
//
// - manage and track textbox objects
//
// - apply event listeners to style buttons
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

	// color changing objects
	this.c = new TC();

	// help move the caret to the end
	this.range = null;
	this.sel = null;

	// add event listener to the new textbox btn
	jumboToolbar.children[0].children[1].children[1]
		.addEventListener('click', this.newTB, false);

	// add event listeners to execCommand buttons, temp var
	this.x = tbsProps.querySelectorAll('[data-excom]');
	for(var j = 0; j < this.x.length; j++)
		this.x[j].addEventListener('click', this.exCom, false);

	// keep track of the buttons
	this.b = {
		bold 		  : this.x[4],
		italic		  : this.x[5],
		underline	  : this.x[6],
		strikeThrough : this.x[7],
		subscript	  : this.x[8],
		justifyLeft	  : this.x[0],
		justifyCenter : this.x[1],
		justifyRight  : this.x[2],
		justifyFull	  : this.x[3]
	};

	// add font size keyup event
	this.x = tbsCpanels.getElementsByTagName('input');
	this.x[0].addEventListener('keyup', this.keyFS, false);

	// init the dropdown
	this.x[0].parentElement.children[1].children[0].addEventListener("click", rsApp.toggleDropdown, false);

	// add click event to font sizes
	this.x = this.x[0].parentElement.children[1].children[1].children;
	for(var i = 0; i < this.x.length; i++)
		this.x[i].children[0].addEventListener('click', this.clickFS, false);

	// toggle resize reposition rotate
	tbsToolbar.children[2].children[1].children[1]
		.addEventListener('click', this.togRRR, false);

	// delete textbox prompt modal
	tbsToolbar.children[0].children[0]
		.addEventListener('click', this.confirmDel, false);
}

/* METHODS */

//-----------------------------------------------
// - user closes textbox control panel
TB.prototype.close = function(){

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

	// re-add the newTB event listener
	jumboToolbar.children[0].children[1].children[1]
		.addEventListener('click', jApp.tbs.newTB, false);

}

//-----------------------------------------------
// - create new textbox element when user clicks
//   the jumbo toolbar button
TB.prototype.newTB = function(e){ e.preventDefault();

	// set this to active textbox status
	jApp.tbs.a = jApp.tbs.createElem();

	// append the new textbox to the drag canvas
	dragCanvas.appendChild(jApp.tbs.a);

	// add the new textbox to the nVals
	jApp.nVals.tbs[jApp.tbs.i] = {
		html : '',
		mobile  : { w : 80, h : 27, x : 48, y : 44, scale : 1, rotate : 0 },
		tablet  : { w : 80, h : 27, x : 48, y : 44, scale : 1, rotate : 0 },
		desktop : { w : 80, h : 27, x : 48, y : 44, scale : 1, rotate : 0 }
	};

	// create & activate the rr object
	rm.i++;
	rm.h[rm.i] = new rr(jApp.tbs.a);
	rm.a = rm.h[rm.i];
	rm.newRules();

	// attribtue referrence to rr index
	jApp.tbs.a.setAttribute('data-r', rm.i);

	// hide the toggle editor element
	jApp.tbs.a.children[0].style.display = 'none';

	// set designMode to 'On'
	jApp.tbs.a.children[2].contentEditable = true;

	// focus on the element
	jApp.tbs.a.children[2].focus();

	// event to determine active exec commands
	jApp.tbs.a.children[2].addEventListener('keyup', jApp.tbs.qCom, false);
	jApp.tbs.a.children[2].addEventListener('focus', jApp.tbs.qCom, false);

	// events to determine fore & back colors
	jApp.tbs.a.children[2].addEventListener('keyup', jApp.tbs.c.qCol, false);

	// remove the newTB event listener
	jumboToolbar.children[0].children[1].children[1]
		.removeEventListener('click', jApp.tbs.newTB, false);
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
	this.a.setAttribute('data-key', jApp.tbs.i);

	// apply the textbox class
	this.a.className = 'textbox active';

	// add the drag buttons
	this.a.innerHTML = document.getElementById('drag-btns-html').value;

	// put an editable div inside the .textbox div
	this.a.appendChild(document.createElement('div'));

	// give it a class
	this.a.children[1].className = 'content-edit';

	// prepend a toggle editor
	new TE(this.a);

	return this.a;
}

//-----------------------------------------------
// - buttons that employ the execCommand function
//    + bold
//    + italic
//    + underline
//    + strike
//    + subscript
//    + superscript
//    + justify left
//    + justify center
//    + justify right
//    + justify full
TB.prototype.exCom = function(){
	// apply the execCommand
	document.execCommand(this.dataset.excom, false, null);
	// toggle the active class
	this.className = (this.className == 'btn btn-default') ?
						'btn btn-default active' : 
						'btn btn-default' ;
}

//-----------------------------------------------
// - determine which demands are active
// - set buttons accordingly
TB.prototype.qCom = function(e){
	// set the class on the wysiwyg btns
	for(var x in jApp.tbs.b)
		jApp.tbs.b[x].className = (document.queryCommandState(x)) ?
													'btn btn-default active' :
													'btn btn-default';
}

//-----------------------------------------------
// - move the cursor to the end of the active div
TB.prototype.setEnd = function(){
    this.range = document.createRange();//Create a this.range (a this.range is a like the this.sel but invisible)
    this.range.selectNodeContents(this.a.children[2]);//Select the entire contents of the element with the this.range
    this.range.collapse(false);//collapse the this.range to the end point. false means collapse to end rather than the start
    this.sel = window.getSelection();//get the this.sel object (allows you to change this.sel)
    this.sel.removeAllRanges();//remove any selections already made
    this.sel.addRange(this.range);//make the this.range you have just created the visible this.sel
}

//-----------------------------------------------
// - toggle resize, reposition, rotate btns
TB.prototype.togRRR = function(){
	// if the btns are not showing
	if(this.className == 'btn btn-default'){
		// show the .drag-btns
		jApp.tbs.a.children[1].style.display = 'block';
		// add the active class
		this.className = 'btn btn-default active';
	}else{
		jApp.tbs.a.children[1].style.display = 'none';
		this.className = 'btn btn-default';
	}
}

//-----------------------------------------------
// - keyup set font size
TB.prototype.keyFS = function(e){

	// if no value, do nothing
	if(!this.value) return;

	// if value is not a number, 0, or greater than 7, remove it
	if(!/^\d+$/.test(this.value) || this.value == '0' || parseInt(this.value) > 7) this.value = '';

	// set the font size
	document.execCommand('fontSize', false, this.value);
}

//-----------------------------------------------
// - click dropdown menu select font size
TB.prototype.clickFS = function(e){ e.preventDefault();
	// set the value of the input
	this.parentElement.parentElement.parentElement.parentElement.children[0]
		.value = this.dataset.fs;
	// set the font size
	document.execCommand('fontSize', false, this.dataset.fs);
}

//-----------------------------------------------
// - move active textbox to the front of all 
//   elements in the dragCanvas
TB.prototype.move2front = function(){ return false;

}

//-----------------------------------------------
// - launch modal
// - set modal inner html
// - set modal callback
TB.prototype.confirmDel = function(){

	// set the modal title
	confModal.getElementsByTagName("h4")[0]
		.innerHTML = '<div class="dash-box" aria-hidden="true">Aa</div>' + 
    				 'Delete background image';

   	// set modal body
   	confModal.children[0].children[0].children[1]
   		.innerHTML = '<p>Are you sure you want to delete this textbox?</p>';

   	// create a copy of the textbox
   	jApp.tbs.x = document.createElement('div');
   	jApp.tbs.x.style.textAlign = 'center';
   	jApp.tbs.x.appendChild(jApp.tbs.a.children[2].cloneNode(true));
   	confModal.children[0].children[0].children[2]
   		.appendChild( jApp.tbs.x );
   	
   	// remove the editable property
   	jApp.tbs.x.children[0].contentEditable = false;

   	// add a border
   	jApp.tbs.x.children[0].style.border = '1px solid #ccc';

   	// center it
   	jApp.tbs.x.children[0].style.display = "inline-block";

   	// dimension it
   	jApp.tbs.x.children[0].style.width = jApp.tbs.a.offsetWidth + 'px';
   	jApp.tbs.x.children[0].style.height = jApp.tbs.a.offsetHeight + 'px';

   	if(jApp.tbs.a.offsetWidth > 200)
	   	// scale it to be no more than 200px
	   	jApp.tbs.x.style.transform = 'scale('+(200/jApp.tbs.a.offsetWidth)+','+(200/jApp.tbs.a.offsetWidth)+')';

   	// set modal callback
   	jApp.modal.callback = jApp.tbs.del;

   	// launch the modal
   	jApp.modal.launch();

}

//-----------------------------------------------
// - delete active textbox
TB.prototype.del = function(){ return false;

}

































//-----------------------------------------------
//				TC (textbox color)			
//			  ----------------------
//
// - control the various color properties of a 
//   textbox
//
// - apply event listeners to buttons & inputs
//
//-----------------------------------------------
var TC = function(){

	// init the hexidecimal text input listener
	this.tempHex = tbsCpanels.getElementsByTagName('input');

	// keep track of the hex inputs
	this.textis = [this.tempHex[1], this.tempHex[3], this.tempHex[6]];

	// keep track of the color pickers
	this.pickis = [this.tempHex[2], this.tempHex[4], this.tempHex[7]];

	// add hex tbs event listeners
	this.tempHex[1].addEventListener('keyup', this.hexText, false);
	this.tempHex[3].addEventListener('keyup', this.hexText, false);
	this.tempHex[6].addEventListener('keyup', this.hexText, false);

	// add color picker event listeners
	this.pickis[0].addEventListener('change', this.colorPick, false);
	this.pickis[1].addEventListener('change', this.colorPick, false);
	this.pickis[2].addEventListener('change', this.colorPick, false);

	// transparency checkbox
	this.tempHex[5].addEventListener('change', this.trans, false);
	this.tempHex[8].addEventListener('change', this.trans, false);

	// get the paint buttons
	this.tempHex = tbsCpanels.querySelectorAll('.paint-btn');

	// keep track of the current color icon btn
	this.icons = [this.tempHex[0], this.tempHex[1], this.tempHex[2]];

	// // get the colorwheel btns
	this.tempHex = tbsCpanels.querySelectorAll('[data-hex]');

	// add event listeners to the colorwheel buttons
	for(var i = 0; i < this.tempHex.length; i++)
		this.tempHex[i].addEventListener('click', this.wheelBtn, false);

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
	this.tempHex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
	// return the results as an object
    return this.tempHex ? {
        r: parseInt(this.tempHex[1], 16),
        g: parseInt(this.tempHex[2], 16),
        b: parseInt(this.tempHex[3], 16)
    } : null;
}

//-----------------------------------------------
// - convert to hex
TC.prototype.rgbToHex = function(rgb) {
    return "#" + this.compToHex(rgb[0]) + this.compToHex(rgb[1]) + this.compToHex(rgb[2]);
}
// - helper
TC.prototype.compToHex = function(c) {
    this.tempHex = parseInt(c).toString(16);
    return this.tempHex.length == 1 ? "0" + this.tempHex : this.tempHex;
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
		jApp.tbs.a.children[2].focus();

		// move the caret to the end
		jApp.tbs.setEnd();

		// set the button color
		jApp.tbs.c.setColor(this.dataset.i, this.dataset.com, this.value);
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
	
	jApp.tbs.c.setColor( this.dataset.i,
						  this.dataset.com,
						  this.value.toUpperCase()
						);
}

//-----------------------------------------------
// - keyup set control panel color
TC.prototype.qCol = function(){
	// foreColor
	jApp.tbs.c.setColor(
		0,
		0,
		jApp.tbs.c.rgbToHex(
			document.queryCommandValue('foreColor')
				.split('(')[1].split(')')[0].split(',')
		)
	);
	// backColor
	jApp.tbs.c.setColor(
		1,
		0,
		jApp.tbs.c.rgbToHex(
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

	// change the transparency of the parent element
	this.parentElement.style.opacity = (this.checked) ? '1' : '0.5';

	// focus on the div
	jApp.tbs.a.children[2].focus();

	// move the caret to the end
	jApp.tbs.setEnd();

	// set exec command or elem bg
	if(this.dataset.com == '1')
		document.execCommand('backColor', false, ((this.checked) ? 'transparent' : '#FFFFFF'))

	else
		jApp.tbs.a.children[2].style.backgroundColor = (this.checked) ? 'transparent' : '#FFFFFF';
}

//-----------------------------------------------
// - user clicks one of the color wheel colors
// - set text
// - set color icon
// - set html5 color picker
// - set background
TC.prototype.wheelBtn = function(){

	jApp.tbs.c.setColor( this.parentElement.parentElement.dataset.i,
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
	
	if(i == 2) // background only
		jApp.tbs.a.children[2].style.backgroundColor = val;
	
	// set the execCommand
	if(excom){

		// focus on the active element
		jApp.tbs.a.children[2].focus(); 

		// move the caret to the end
		jApp.tbs.setEnd();

		if(i == 1) // backColor only
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
}

//-----------------------------------------------
// - when user slides opacity slider
TC.prototype.oSlide = function(){

	// set the value of the text input
	this.parentElement.children[1].value = 

	// change the opacity of the background img
	bgImg.style.opacity = 

	// update values
	jApp.nVals["opacity"] = parseFloat(this.value);

	// prompt save
	jApp.deltaVals();
}

//-----------------------------------------------
// - when user slides blur slider
TC.prototype.bSlide = function(){

	// set the value of the text input
	this.parentElement.children[1].value = 

	// update values
	jApp.nVals["blur"] = parseInt(this.value);

	// change the blur of the background img
	bgImg.style.filter = 
	bgImg.style.webkitFilter = "blur("+this.value+"px)"; 

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
	bgImg.style.opacity = 

	// update values
	jApp.nVals["opacity"] = parseFloat(this.value);

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
	jApp.nVals["blur"] = parseInt(this.value);

	// set the blur
	bgImg.style.filter = 
	bgImg.style.webkitFilter = "blur("+this.value+"px)"; 

	// prompt save
	jApp.deltaVals();
}


































//-----------------------------------------------
//				TE (toggle editor)			
//			  -----------------------
//
// - toggle editor mode
//
// - make sure button is within clickable area
//
//-----------------------------------------------

/* CONSTRUCTOR */

//-----------------------------------------------
// - el => container parent element of textbox
var TE = function(el){

	/* properties */

	this.el = el;

	/* initializations */

	// prepend a div
	this.el.insertBefore(
		document.createElement('div'),
		this.el.children[0]
	);

	// set the class
	this.el.children[0].className = 'toggle-edit';

	// add a pencil button
	this.el.children[0].innerHTML = '<button type="button" class="btn btn-default">'+
										'<span class="glyphicon glyphicon-pencil"></span>'+
									'</button>';

	// add event listeners
	this.el.children[0].addEventListener('mouseover', this.show, false);
	this.el.children[0].addEventListener('mouseout', this.hide, false);
	this.el.children[0].addEventListener('click', this.tog, false);
}

/* METHODS */

//-----------------------------------------------
// - focus, mouseover
// - position editor button closest to canvas
//   centerpoint
// - fade in editor btn
TE.prototype.show = function(){
	this.style.opacity = 1;
}

//-----------------------------------------------
// - click btn event, toggle editor mode
TE.prototype.tog = function(){

	// if there is no other active textbox
	if(!jApp.tbs.a){

		// display the control panel, first remove newTB event
		jumboToolbar.children[0].children[1].children[1]
			.removeEventListener('click', jApp.tbs.newTB, false);
		jumboToolbar.children[0].children[1].children[1].click();

	// if there is another textbox open
	}else if(jApp.tbs.a !== this.parentElement){

		// remove the active class
		jApp.tbs.a.className = 'textbox';

		// show the .toggle-edit elem
		jApp.tbs.a.children[0].style.display = 'block';

		// make sure the drag buttons are hidden
		jApp.tbs.a.children[1].style.display = 'none';
	}

	// set the active textbox
	jApp.tbs.a = this.parentElement;
	jApp.tbs.a.className = 'textbox active';

	// hide the .toggle-edit element
	this.style.display = 'none';

	// focus on the textbox
	jApp.tbs.a.children[2].focus();
}

//-----------------------------------------------
// - blur, mouseout
// - move the button back within the perimeter of
//   the textbox
// - fade the button out
TE.prototype.hide = function(){
	this.style.opacity = 0;
}














