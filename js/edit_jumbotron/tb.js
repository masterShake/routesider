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
	this.x = textsProps.querySelectorAll('[data-excom]');
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
	this.x = textsCpanels.getElementsByTagName('input');
	this.x[0].addEventListener('keyup', this.keyFS, false);

	// init the dropdown
	this.x[0].parentElement.children[1].children[0].addEventListener("click", rsApp.toggleDropdown, false);

	// add click event to font sizes
	this.x = this.x[0].parentElement.children[1].children[1].children;
	for(var i = 0; i < this.x.length; i++)
		this.x[i].children[0].addEventListener('click', this.clickFS, false);
}

/* METHODS */

//-----------------------------------------------
// - user closes textbox control panel
TB.prototype.close = function(){

	return false;

}

//-----------------------------------------------
// - create new textbox element when user clicks
//   the jumbo toolbar button
TB.prototype.newTB = function(e){ e.preventDefault();

	// increment the indexer
	jApp.texts.i++;

	// create a new textbox elem, store it in the hashmap
	jApp.texts.h[jApp.texts.i] = document.createElement('div');

	// set this to active textbox status
	jApp.texts.a = jApp.texts.h[jApp.texts.i];

	// give the element an index key
	jApp.texts.a.setAttribute('data-key', jApp.texts.i);

	// apply the textbox class
	jApp.texts.a.className = 'textbox active';

	// append the new textbox to the drag canvas
	dragCanvas.appendChild(jApp.texts.a);

	// set designMode to 'On'
	jApp.texts.a.contentEditable = true;

	// focus on the element
	jApp.texts.a.focus();

	// event to determine active exec commands
	jApp.texts.a.addEventListener('keyup', jApp.texts.qCom, false);
	jApp.texts.a.addEventListener('focus', jApp.texts.qCom, false);

	// remove the newTB event listener
	// jumboToolbar.children[0].children[1].children[1]
	// 	.removeEventListner('click', jApp.tBoxes.newTB, false);
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
	for(var x in jApp.texts.b)
		jApp.texts.b[x].className = (document.queryCommandState(x)) ?
													'btn btn-default active' :
													'btn btn-default';
}

//-----------------------------------------------
// - move the cursor to the end of the active div
TB.prototype.setEnd = function()
{
    if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
        this.range = document.createRange();//Create a this.range (a this.range is a like the this.sel but invisible)
        this.range.selectNodeContents(this.a);//Select the entire contents of the element with the this.range
        this.range.collapse(false);//collapse the this.range to the end point. false means collapse to end rather than the start
        this.sel = window.getSelection();//get the this.sel object (allows you to change this.sel)
        this.sel.removeAllRanges();//remove any selections already made
        this.sel.addRange(this.range);//make the this.range you have just created the visible this.sel
    }
}

//-----------------------------------------------
// - toggle resize, reposition, rotate
TB.prototype.togRRR = function(){ return false;

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
	this.tempHex = textsCpanels.getElementsByTagName('input');

	// keep track of the hex inputs
	this.textis = [this.tempHex[1], this.tempHex[3], this.tempHex[6]];

	// keep track of the color pickers
	this.pickis = [this.tempHex[2], this.tempHex[4], this.tempHex[7]];

	// add hex event listeners
	this.tempHex[1].addEventListener('keyup', this.hexText, false);
	this.tempHex[3].addEventListener('keyup', this.hexText, false);
	this.tempHex[6].addEventListener('keyup', this.hexText, false);

	// add color picker event listeners
	// this.tempHex[2].addEventListener('change', this.colorPick, false);
	// this.tempHex[4].addEventListener('change', this.colorPick, false);
	// this.tempHex[7].addEventListener('change', this.colorPick, false);

	// transparency checkbox
	this.tempHex[5].addEventListener('change', this.trans, false);
	this.tempHex[8].addEventListener('change', this.trans, false);

	// get the paint buttons
	this.tempHex = textsCpanels.querySelectorAll('.paint-btn');

	// keep track of the current color icon btn
	this.icons = [this.tempHex[0], this.tempHex[1], this.tempHex[2]];

	// add event listeners to the current color buttons
	// this.tempHex[0].addEventListener('click', this.paintBtn, false);
	// this.tempHex[1].addEventListener('click', this.paintBtn, false);
	// this.tempHex[2].addEventListener('click', this.paintBtn, false);

	// // get the colorwheel btns
	// this.tempHex = textCpanels.querySelectorAll('[data-hex]');

	// add event listeners to the colorwheel buttons
	// for(var i = 0; i < this.tempHex.length; i++)
	// 	this.tempHex[i].addEventListener('click', this.wheelBtn, false);
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
		jApp.texts.a.focus();

		// move the caret to the end
		jApp.texts.setEnd();
		
		// if this applies an execCommand
		if(this.dataset.com)

			// set the text color
			document.execCommand(this.dataset.com, false, this.value);

		// set the button color
		jApp.texts.c.setColor(this.dataset.i, this.dataset.com, this.value);
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
	jApp.bg.bgc.temp = this.value.toUpperCase();
	jApp.bg.bgc.setColor();
}

//-----------------------------------------------
// - paint button event listener
TC.prototype.paintBtn = function(){ return false;

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
	jApp.texts.a.focus();

	// move the caret to the end
	jApp.texts.setEnd();

	// set exec command or elem bg
	if(this.dataset.com == '1')
		document.execCommand('backColor', false, ((this.checked) ? 'transparent' : '#FFFFFF'))

	else
		jApp.texts.a.style.backgroundColor = (this.checked) ? 'transparent' : '#FFFFFF';
}

//-----------------------------------------------
// - user clicks one of the color wheel colors
// - set text
// - set color icon
// - set html5 color picker
// - set background
TC.prototype.wheelBtn = function(){
	
	jApp.bg.bgc.temp = this.dataset.hex;

	jApp.bg.bgc.setColor();

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

	// focus
	// jApp.texts.a.focus();

	// set the execCommand
	document.execCommand('styleWithCSS', false, true);
	document.execCommand(excom, false, val);

	// set the text
	this.textis[i].value = 

	// set the color picker
	this.pickis[i].value = val;

	// if this is the font color control panel
	if(i == 0){
		// set the font color
		this.icons[0].style.color = val;
		// set the background
		this.icons[0].style.backgroundColor = 
			this.hexBright(this.hexToRgb(val)) ?
				"#444" : "#FFF";
	}else{
		// set the background color
		this.icons[i].style.background = val;
		// set the preview icon color
		this.icons[i].style.color = 
			this.hexBright(this.hexToRgb(val)) ?
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























