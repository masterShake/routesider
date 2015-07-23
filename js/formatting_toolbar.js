
//-----------------------------------------------
// - closure to hold FT objects
var t = function(){

	// hold the toolbars to keep track
	this.toolbars = {};

	// keep track of the active toolbar
	this.activeToolbar = null;

	// keep track of the current elem when user clicks away
	this.currElem = null;

}

var ftApp = new t();









//-----------------------------------------------
//
//			  FT (formatting toolbar)
//			---------------------------
//
// - @ inputElem -> html DOM element either
//   input [type=text] or textarea
//
// - @ index -> key reference for ftApp
//
// - half toolbar is used for input [type=text]
//
// - full toolbar is used for textarea
//
// - NOTE: the formatting toolbars are found in
//   the "components" directory. They must be
//   dynamically included into the file using
//   php. It is assumed that the div.toolbar elem
//   is a sibling of the input in the DOM. 
// 
//-----------------------------------------------

/* CONSTRUCTOR */

var FT = function( inputElem, formattingElem, index ){

	/* properties */

	// keep a ref pointer to the input
	this.inputElem = inputElem;

	// keep a ref pointer to the div.formatting elem
	this.formattingElem = formattingElem;

	// grab all the buttons
	this.buttons = this.formattingElem.getElementsByTagName("button");

	// keep track of the index key
	this.index = index;

	// set the data-index attribute of the input
	this.inputElem.setAttribute("data-index", index);

	// - keep track of the cursor position in the input
	// - starting position 0
	this.cursorPos = 0;

	// keep track of the positions of any highlighted text
	this.highStart, this.highEnd = null;

	// temp array of split string values
	this.splitVals = [];

	/* construction */

	// input focus
	this.inputElem.addEventListener("focus", this.inputFocus, false);

	// input keyup get cursor position
	this.inputElem.addEventListener("keyup", this.getCursorPos, false);

	// mouseup event for highlighted text
	this.inputElem.addEventListener("select", this.getHigh, false);

	// toggle preview
	this.formattingElem.getElementsByClassName("toggle-links")[0].children[1]
		.addEventListener("click", this.togglePreview, false);

	// toggle the formatting table
	this.formattingElem.getElementsByClassName("toggle-links")[0].children[0]
		.addEventListener("click", this.toggleTable, false);

	// event listeners to the buttons
	for(var i = 0; i < this.buttons.length; i++){
		this.buttons[i].addEventListener("click", this.markdown, false);
	}
	this.buttons = null;
	delete this.buttons;

}

/* METHODS */

//-----------------------------------------------
// - event listeners user focuses on text input
// - reveal the toolbar
FT.prototype.inputFocus = function(){

	// if there is an active toolbar
	if(ftApp.activeToolbar){
		ftApp.activeToolbar.formattingElem.style.display = "none";
		document.body.removeEventListener("click", ftApp.activeToolbar.inputBlur, true);
	}

	// (re)set the active toolbar
	ftApp.activeToolbar = ftApp.toolbars[this.dataset.index];

	// show the data-index attribute to reveal the toolbar
	ftApp.activeToolbar.formattingElem.style.display = "block";

	// add blur event listener to the document
	document.body.addEventListener("click", ftApp.activeToolbar.inputBlur, true);
}

//-----------------------------------------------
// - event listeners user blurs from text input
// - only hide the toolbar if the user does not
//   click within the parent.
FT.prototype.inputBlur = function(event){
	// set the current element
	ftApp.currElem = event.target;
	// - loop up to the top parent
	// - make sure we clicked outside of activeDropdown
	while( ftApp.currElem !== document.body ){
		// if we get to our active dropdown
		if(ftApp.currElem === ftApp.activeToolbar.inputElem.parentElement){
			// break out of the loop
			return;
		}
		// set the new currElem
		ftApp.currElem = ftApp.currElem.parentElement;
	}
	// - If we get this far, we know we clicked away from the input

	// reset the highStart and highEnd properties
	ftApp.activeToolbar.highStart, 
	ftApp.activeToolbar.highEnd = null;
	// - hide the toolbar
	ftApp.activeToolbar.formattingElem.style.display = "none";
	// - remove the event listener 
	document.body.removeEventListener("click", ftApp.activeToolbar.inputBlur, true);
}

//-----------------------------------------------
// - event listener
// - toggle the preview
FT.prototype.togglePreview = function(event){

	// prevent the link from linking
	event.preventDefault();

	// if the preview is hidden
	if(this.dataset.toggled === "0"){

		// set the attribute
		this.setAttribute("data-toggled", "1");
		
		// change the icon
		this.children[0].className = "glyphicon glyphicon-triangle-top";

		// reveal the preview elem
		this.parentElement.parentElement.children[2].style.display = "block";

		// make ajax call
		rsApp.ajax({
						method : "POST",
						url : document.URL,
						params : "text="+ftApp.activeToolbar.inputElem.value+
								 "&toolbar="+((ftApp.activeToolbar.inputElem.tagName == "TEXTAREA") ? "full" : "half"),
						callback : ftApp.activeToolbar.setPreview
				  });
	
	// if the preview is displayed
	}else{
		this.setAttribute("data-toggled", "0");
		this.children[0].className = "glyphicon glyphicon-triangle-bottom";
		this.parentElement.parentElement.children[2].style.display = "none";
	}
}
//-----------------------------------------------
// - ajax callback
// - display the preview markdown text
FT.prototype.setPreview = function(response){
	// set the inner html
	ftApp.activeToolbar.formattingElem.children[2].innerHTML = response;
}

//-----------------------------------------------
// - event listener to toggle the formatting
//   instructions table.
FT.prototype.toggleTable = function(event){

	// prevent the link from linking
	event.preventDefault();

	// if the table is hidden
	if(this.dataset.toggled === "0"){

		// set the attribute
		this.setAttribute("data-toggled", "1");
		
		// change the icon
		this.children[0].className = "glyphicon glyphicon-triangle-top";

		// reveal the table
		this.parentElement.parentElement.children[3].style.display = "inline-table";
	}else{
		this.setAttribute("data-toggled", "0");
		this.children[0].className = "glyphicon glyphicon-triangle-bottom";
		this.parentElement.parentElement.children[3].style.display = "none";
	}

}

//-----------------------------------------------
// - keyup event listener to keep track of user
//   cursor position
FT.prototype.getCursorPos = function(event){
	// set the cursorPos property (int)
	ftApp.activeToolbar.cursorPos = this.selectionStart;
	// if the selection start does not match the end
	if(this.selectionStart != this.selectionEnd)
		ftApp.activeToolbar.getHigh(event);
	else
		ftApp.activeToolbar.highStart, 
		ftApp.activeToolbar.highEnd = null;
}

//-----------------------------------------------
// - mouseup event listener to look for
//   highlighted text
FT.prototype.getHigh = function(event){ 
	// set the highlighed start and end properties
	ftApp.activeToolbar.highStart = event.target.selectionStart;
	ftApp.activeToolbar.highEnd = event.target.selectionEnd;
}

//-----------------------------------------------
// - split the text of the input
// - if not highlighted, split at cursor position
// - if highlighted, split at selectionStart &
//   selectionEnd as denoted by the FT.highStart
//   & FT.highEnd properties
// - return an array with split strings
FT.prototype.splitInput = function(){
	// if we have highlighted text
	if(this.highEnd)
		// split the value of the input 3 ways
		return [
				  this.inputElem.value.substring(0, ftApp.activeToolbar.highStart),
				  this.inputElem.value.substring(ftApp.activeToolbar.highStart, ftApp.activeToolbar.highEnd),
				  this.inputElem.value.substring(ftApp.activeToolbar.highEnd)
			   ];
	else
		// split the value 2 ways at the last position of the cursor
		return [
				  ftApp.activeToolbar.inputElem.value.substring(0, ftApp.activeToolbar.cursorPos),
				  ftApp.activeToolbar.inputElem.value.substring(ftApp.activeToolbar.cursorPos)
			   ];
}

//-----------------------------------------------
// - set the focus and change the cursor
// - @ offset -> add some number to cursor pos
FT.prototype.shiftFocus = function(offset){

	// focus & move the cursor to its previous position
	this.inputElem.focus();

	// change the cursorPos property
	this.cursorPos = this.inputElem.selectionStart - offset;

	// move the cursor to the cursorPos + 2
	this.inputElem.setSelectionRange
		( 
			this.cursorPos,
			this.cursorPos
		);

}

//-----------------------------------------------
// - formatting button event listener
// - insert characters on either side of cursor
//   or highlighted text as denoted by given
//   dataset attributes
FT.prototype.markdown = function(){

	// set splitVals properties
	ftApp.activeToolbar.splitVals = ftApp.activeToolbar.splitInput();

	// set the value of the input
	ftApp.activeToolbar.inputElem.value = 
		(ftApp.activeToolbar.splitVals.length > 2) ?
			
			// for highlighted text
			ftApp.activeToolbar.splitVals[0] + 
			this.dataset.front +
			ftApp.activeToolbar.splitVals[1] + 
			this.dataset.rear +
			ftApp.activeToolbar.splitVals[2] 	   :

			// for unhighlighted text
			ftApp.activeToolbar.splitVals[0] + 
			this.dataset.front +
			this.dataset.rear + 
			ftApp.activeToolbar.splitVals[1]	   ;

	// shift focus
	ftApp.activeToolbar.shiftFocus( this.dataset.rear.length );

	// blur away from the button
	this.blur();
}