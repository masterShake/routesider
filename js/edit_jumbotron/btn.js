//-----------------------------------------------
//				 BTN (button editor)				
//			   -----------------------
//
// - manage button link toolbar
//
//-----------------------------------------------

/* CONSTRUCTOR */

BTN = function(){

	// indexer for hashmap
	this.i = 0;

	// hashmap of button elements
	this.h = {};

	// active button element
	this.a = null;

	// init the components object
	this.c = new BTNC();

	// toggle rrr button
	this.rBtn = tbsToolbar.children[3].children[1];

	// add event listener to the new textbox btn
	this.compBtn = jumboToolbar.children[0].children[1].children[3];
	this.compBtn.addEventListener('click', this.newElem, false);

	// delete textbox prompt modal
	tbsToolbar.children[4].children[0]
		.addEventListener('click', this.confirmDel, false);

}

/* METHODS */

BTN.prototype.close = function(){

	// re-add newElem event
	this.compBtn.addEventListener('click', this.newImg, false);

	// if there is no active link button, return
	if(!this.a) return;

	// remove the active class
	this.a.className = 'link-button';

	// show the .toggle-edit elem
	this.a.children[0].style.display = 'block';

	// make sure the drag buttons are hidden
	this.a.children[1].style.display = 'none';

	// blur
	this.a.children[3].blur();

	// nullify the active link button
	this.a = null;

}

//-----------------------------------------------
// - create a new button element when user clicks
//   jumbo toolbar
BTN.prototype.newElem = function(e){ e.preventDefault();

	// deactive the properties toolbar buttons
	btns.c.dAct();

	// create a new blank link button 
	btns.createElem();

	// remove this event listener
	this.removeEventListener('click', btns.newElem);
}

//-----------------------------------------------
// - helper function for newBtn
// - create the new element
// - create the css rules for the new element
BTN.prototype.createElem = function(){ console.log('new button elem called');

	// increment the indexer
	this.i++;

	// create a new textbox elem, store it in the hashmap
	this.h[this.i] = document.createElement('div');

	// set it to active
	this.a = this.h[this.i];

	// give the element an index key
	this.a.setAttribute('data-key', this.i);

	// apply the textbox class
	this.a.className = 'link-button active';

	// set the transform style
	this.a.style.transform = 'matrix(1, 0, 0, 1, 0, 0)';

	// add the 3 children
	this.a.innerHTML = '<div class="toggle-edit" style="display:none;">'+
					   		'<button type="button" class="btn btn-default">'+
								'<span class="glyphicon glyphicon-pencil"></span>'+
							'</button>'+
					   '</div>'+ 
					   document.getElementById('drag-btns-html').value+
					   '<div class="background"></div>'+
					   '<div class="content-edit btn btn-default">'+
					   		'<span class="glyphicon glyphicon-link" style="color:#5CB85C;"></span>'+
					   '</div>';

	// clone the url popover and append to the content editable
	this.a.appendChild(btnsCpanels.children[6].cloneNode(true));

	// append the new textbox to the drag canvas
	dragCanvas.appendChild(this.a);

	// apply the event listeners
	this.ae();

	// insert new style sheet rules
	rm.newRules(this.a, this.updateVals);
}

//-----------------------------------------------
// - apply event listeners to newly created btn
BTN.prototype.ae = function(){

	// focus on the element
	this.a.children[3].focus();

	// event to determine active exec commands
	this.a.children[3].addEventListener('keyup', ts.qCom, false);
	this.a.children[3].addEventListener('focus', ts.qCom, false);

	// set control panel properties of foreColor & backColor
	this.a.children[3].addEventListener('keyup', tc.qCol, false);

	// toggle editor event
	this.a.children[0].addEventListener('click', cm.tog, false);

	// set visibility checkboxes
	this.c.v[0].checked = 
	this.c.v[1].checked = 
	this.c.v[2].checked = true;
}

//-----------------------------------------------
// - update the nVals new values obejcts
// - zi --> z-index assigned by the rrr object
BTN.prototype.updateVals = function(zi){

	// add the new image overlay to the nVals
	jApp.nVals.imgs[this.i] = {
		html : '',
		href : '',
		color : 'transparent',
		opacity : 1,
		blur: 0,
		z : zi,
		round : 0,
		borderwidth: 0,
		bordercolor: '#FFFFFF',
		shadow : {active : 1, color : '#676767', softness : 4, spread : 4, x : 0, y : 0, inset : 0},
		layout : {
			mobile  : { w : 80, h : 27, x : 48, y : 44, s : 1, a : 0, v : 1 },
			tablet  : { w : 80, h : 27, x : 48, y : 44, s : 1, a : 0, v : 1 },
			desktop : { w : 80, h : 27, x : 48, y : 44, s : 1, a : 0, v : 1 }
		}
	};
}    



//-----------------------------------------------
// - launch modal
// - set modal inner html
// - set modal callback
BTN.prototype.confirmDel = function(){ return false;

}

//-----------------------------------------------
// - helper function to replicate button
BTN.prototype.copy = function(){ return false;

}

//-----------------------------------------------
// - delete the active button
BTN.prototype.del = function(){ return false;

}


































//-----------------------------------------------
//			 BTNC (button component)
//		   ---------------------------
//
// - keep track of important control panel elems
//
//-----------------------------------------------

var BTNC = function(){

	// get the text inputs
	this.texti = btnsCpanels.querySelectorAll('input.colorize[type="text"]');

	// get the HTML5 color picker inputs
	this.picki = btnsCpanels.querySelectorAll('input.colorize[type="color"]');

	// get the icons
	this.icon = btnsCpanels.querySelectorAll('button.colorize[type="button"]');

	// get the trasparency checkboxes
	this.checki = btnsCpanels.querySelectorAll('input.colorize[type="checkbox"]');

	// keep a map of all the execCom buttons
	this.b = btnsProps.querySelectorAll('[data-excom]');

	// keep track of the buttons for textbox
	this.b = {
		bold 		  : this.b[0],
		italic		  : this.b[1],
		underline	  : this.b[2],
		strikeThrough : this.b[3],
		subscript	  : this.b[4],
		superscript	  : this.b[5]
	};

	// track visibility checkboxes
	this.v = tbsCpanels.children[7].getElementsByTagName('input');

	// get all the toolbar buttons
	this.t = btnsToolbar.querySelectorAll('.btn.btn-default');
}

//-----------------------------------------------
// - activate link button property toolbar btns
BTNC.prototype.act = function(){
	
	// loop through the toolbar buttons
	for(var i = 0; i < this.t.length; i++)
		// set the classname
		this.t[i].className = 'btn btn-default';

	// hide the cover elements
}

//-----------------------------------------------
// - deactivate link button property toolbar btns
BTNC.prototype.dAct = function(){
	
	// loop through the toolbar buttons
	for(var i = 0; i < this.t.length; i++)
		// set the classname
		this.t[i].className = 'btn btn-default inactive';

	// display the cover elements
}





















