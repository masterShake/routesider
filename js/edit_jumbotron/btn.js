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

	// add event listener to the new textbox btn
	jumboToolbar.children[0].children[1].children[2]
		.addEventListener('click', this.newBtn, false);

}

/* METHODS */

BTN.prototype.close = function(){

	return false;

}

//-----------------------------------------------
// - create a new button element when user clicks
//   jumbo toolbar
BTN.prototype.newBtn = function(e){ e.preventDefault();

	// set the active element
	btns.a = btns.createElem();

	// append the new textbox to the drag canvas
	dragCanvas.appendChild(btns.a);

	// create & activate the rr object
	rm.i++;
	rm.z++;
	rm.h[rm.i] = new rr(btns.a);
	rm.a = rm.h[rm.i];

	// create the nVals object
	// add the new image overlay to the nVals
	jApp.nVals.btns[btns.i] = {
		html : '',
		color : 'transparent',
		opacity : 1,
		blur: 0,
		z : rm.z,
		border: '0px';
		round : 0,
		padding: '5px 10px',
		url : '',
		layout : {
			// x => left
			// y => top
			// s => scale
			// a => angle
			// v => visible
			mobile  : { x : 48, y : 44, s : 1, a : 0, v : 1 },
			tablet  : { x : 48, y : 44, s : 1, a : 0, v : 1 },
			desktop : { x : 48, y : 44, s : 1, a : 0, v : 1 }
		}
	};

	// attribtue referrence to rr index
	btns.a.setAttribute('data-r', rm.i);
	
	// insert the new css rules
	rm.newRules();

	// apply event listeners
	btns.ae();

	// reset control panels

	// reset visibility checkboxes
	cs.btnsB[0].checked = 
	cs.btnsB[1].checked = 
	cs.btnsB[2].checked = true;
}

//-----------------------------------------------
// - helper function for newBtn
// - create the new element
// - create the css rules for the new element
BTN.prototype.createElem = function(){ 

	// increment the indexer
	this.i++;

	// create a new textbox elem, store it in the hashmap
	this.h[this.i] = document.createElement('div');

	// set it to active
	this.a = this.h[this.i];

	// give the element an index key
	this.a.setAttribute('data-key', this.i);

	// apply the textbox class
	this.a.className = 'btn btn-default btn-dragable active';

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

	// set designMode to 'On'
	this.a.children[2].contentEditable = true;

	return this.a;
}

//-----------------------------------------------
// - apply event listeners to newly created btn
BTN.prototype.ae = function(){

	// toggle editor event
	this.a.children[0].addEventListener('click', cs.tog, false);

	// focus on the element
	this.a.children[2].focus();

	// event to determine active exec commands
	this.a.children[2].addEventListener('keyup', ts.qCom, false);
	this.a.children[2].addEventListener('focus', ts.qCom, false);

	// events to determine fore & back colors
	// this.a.children[2].addEventListener('keyup', this.c.qCol, false);

	// remove the newTB event listener
	jumboToolbar.children[0].children[1].children[1]
		.removeEventListener('click', this.newBtn, false);

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





























