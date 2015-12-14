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

	// add event listener to the new textbox btn
	jumboToolbar.children[0].children[1].children[1]
		.addEventListener('click', this.newTB, false);

	// add event listeners to execCommand buttons, temp var
	this.x = textProps.querySelectorAll('[data-excom]');
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
	this.x = textCpanels.getElementsByTagName('input');
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
TB.prototype.newTB = function(){

	// increment the indexer
	jApp.texts.i++;

	// create a new textbox elem, store it in the hashmap
	jApp.texts.h[jApp.texts.i] = document.createElement('textarea');

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
	jApp.texts.a.addEventListener('mousedown', jApp.texts.qCom, false);

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
TB.prototype.qCom = function(){
	for(var x in jApp.texts.b){
		jApp.texts.b[x].className = (document.queryCommandState(x)) ?
													'btn btn-default active' :
													'btn btn-default';
	}
}

//-----------------------------------------------
// - toggle resize, reposition, rotate
TB.prototype.togRRR = function(){ return false;

}

//-----------------------------------------------
// - keyup set font size
TB.prototype.keyFS = function(e){

	// if the text is blank
	// if(e.keyCode == 8) return;
	// if the last 2 characters are not px
	// if(this.value.substr(-2) != 'px')
	// 	// append them to the end of the string
	// 	this.value = this.value.substr(0,2) + 'px';
	// // if the first character is not a number
	// if(this.value.length > 2 && !/^\d+$/.test(this.value.charAt(0)))
	// 	// remove it
	// 	this.value = this.value.substr(1, this.value.length - 1);
	// // if the second character is not a number
	// if(this.value.length > 3 && !/^\d+$/.test(this.value.charAt(1)))
	// 	// remove it
	// 	this.value = this.value.substr(0,1) + this.value.substr(2, this.value.length - 1);
	// // move the caret curson to the position before the 'px'
	// this.setSelectionRange(this.value.length - 2,this.value.length - 2);

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

	this.something = null;

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
		// set the background color
		jApp.bg.bgc.temp = this.value;
		jApp.bg.bgc.setColor();
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
TC.prototype.setColor = function(){

	// set preview background color
	cropCanvas.style.backgroundColor = 

	// set the preview icon background
	this.icon.style.backgroundColor = 

	// set the text
	this.texti.value = 

	// set the color picker
	this.picki.value = 

	// & update the new values object
	jApp.nVals.color = this.temp;

	// set the preview icon color
	this.icon.style.color = 
		this.hexBright(this.hexToRgb(this.temp)) ?
			"#444" : "#FFF";

	// notify root node that values have changed
	jApp.deltaVals();
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























