
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
	// ts = this.s = new TS();

	// init textbox color object
	// this.c = new TC();

	// init textbox editor object
	// this.te = new TE();

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











