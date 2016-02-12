//-----------------------------------------------
//				 BTN (button editor)				
//			   -----------------------
//
// - manage button link toolbar
//
//-----------------------------------------------

/* CONSTRUCTOR */

var BTN = function(){

	// indexer for hashmap
	this.i = 0;

	// hashmap of button elements
	this.h = {};

	// active button element
	this.a = null;

	// init the components object
	this.c = new BTNC(this);

	// toggle rrr button
	this.rBtn = tbsToolbar.children[3].children[1];

	// add event listener to the new textbox btn
	this.compBtn = jumboToolbar.children[0].children[1].children[3];
	this.compBtn.addEventListener('click', this.newElem, false);

	// delete textbox prompt modal
	btnsToolbar.children[4].children[0]
		.addEventListener('click', this.confirmDel, false);

}

/* METHODS */

BTN.prototype.close = function(){

	// re-add newElem event
	this.compBtn.addEventListener('click', this.newElem, false);

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
	this.a.className = 'link-button active';

	// set the transform style
	this.a.style.transform = 'matrix(1, 0, 0, 1, 0, 0)';

	// set the elem
	this.setElem();
}

//-----------------------------------------------
// - after new button container has been created,
//   set the inner HTML and add event listeners
BTN.prototype.setElem = function(){

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

	// give the done button a data-n attribute (denotes new button)
	this.a.getElementsByClassName('btn-info')[0].setAttribute('data-n', 'true');

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

	// toggle editor event
	this.a.children[0].addEventListener('click', cm.tog, false);

	// done button event
	this.a.getElementsByClassName('btn-info')[0].addEventListener('click', this.c.done);

	// cancel new button x event
	this.a.getElementsByClassName('close')[0].addEventListener('click', this.del);

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
	jApp.nVals.btns[btns.i] = {
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
BTN.prototype.confirmDel = function(){

	// if there is no link and no text
	if(!jApp.nVals.btns[btns.a.dataset.key].href && !jApp.nVals.btns[btns.a.dataset.key].html){
		// delete the button without asking
		btns.del(); return;
	}

	// set the modal title
	modal.title.innerHTML = '<div class="dash-box" style="outline: 0px;margin-top:-3px;border-radius: 6px;background-color: #eee;border: 1px solid;padding: 2px 4px 0px;"><span class="glyphicon glyphicon-link" aria-hidden="true"></span></div> Delete Button';

   	// set modal body
   	modal.body.innerHTML = '<p>Are you sure you want to delete this button?</p>';

   	// create a copy of the button
   	modal.body.appendChild( btns.copy() );

   	// set modal callback
   	modal.callback = btns.del;

   	// launch the modal
   	modal.launch();

}

//-----------------------------------------------
// - helper function to replicate button
BTN.prototype.copy = function(){ return false;

}

//-----------------------------------------------
// - delete the active button
BTN.prototype.del = function(){ 

	// gut the innards of the active textbox
	btns.a.innerHTML = '';

	// remove it from the nVals
	jApp.nVals.btns[btns.a.dataset.key] = null;
	delete jApp.nVals.btns[btns.a.dataset.key];

	// hide it, but do not delete to maintain order
	btns.a.style.display = 'none';

	// prompt save
	jApp.deltaVals();

	// remove the active textbox
	btns.a = null;

	// hide the textbox properties toolbar
	jumboToolbar.children[0].children[1].children[3].click();
}


































//-----------------------------------------------
//			 BTNC (button component)
//		   ---------------------------
//
// - keep track of important control panel elems
//
//-----------------------------------------------

var BTNC = function(btn){ // btn --> BTN object

	// keep a local reference to the BTN object
	this.btn =  btn;

	// get the text inputs
	this.texti = btnsCpanels.querySelectorAll('input.colorize[type="text"]');

	// get the HTML5 color picker inputs
	this.picki = btnsCpanels.querySelectorAll('input.colorize[type="color"]');

	// get the icons
	this.icon = btnsCpanels.querySelectorAll('button.colorize[type="button"]');

	// get the trasparency checkboxes
	this.checki = btnsCpanels.querySelectorAll('input.colorize[type="checkbox"]');

	// keep a map of all the execCom buttons
	this.t = btnsProps.querySelectorAll('[data-excom]');

	// keep track of the buttons for textbox
	this.b = {
		bold 		  : this.t[0],
		italic		  : this.t[1],
		underline	  : this.t[2],
		strikeThrough : this.t[3],
		subscript	  : this.t[4],
		superscript	  : this.t[5]
	};

	// get all the toolbar buttons
	this.t = btnsToolbar.querySelectorAll('.btn.btn-default');

	// get all the toolbar covers
	this.u = btnsToolbar.getElementsByClassName('toolbar-cover');

	// track visibility checkboxes
	this.v = btnsCpanels.children[7].getElementsByTagName('input');
}

//-----------------------------------------------
// - activate link button property toolbar btns
BTNC.prototype.act = function(){
	
	// loop through the toolbar buttons
	for(var i = 0; i < this.t.length - 1; i++)
		// set the classname
		this.t[i].className = 'btn btn-default';

	// hide the toolbar covers
	this.u[0].style.display = 'none';
	this.u[1].style.display = 'none';
	this.u[2].style.display = 'none';
	this.u[3].style.display = 'none';
}

//-----------------------------------------------
// - deactivate link button property toolbar btns
BTNC.prototype.dAct = function(){
	
	// loop through the toolbar buttons
	for(var i = 0; i < this.t.length - 1; i++)
		// set the classname
		this.t[i].className = 'btn btn-default inactive';

	// display the cover elements
	this.u[0].style.display = 'block';
	this.u[1].style.display = 'block';
	this.u[2].style.display = 'block';
	this.u[3].style.display = 'block';
}

//-----------------------------------------------
// - done button click, user done entering url
BTNC.prototype.done = function(){

	// if this is not a valid URL
	if(!this.parentElement.children[2].value || this.parentElement.children[2].value.match(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/i)){

		// display the error message
		this.parentElement.parentElement.children[1].style.display = 'block';

		return;
	}

	// if this was the new button popover
	if(this.dataset.n)
		// call the done new function
		btns.c.doneNew(this.parentElement);

	else
		// hide the popover
		this.parentElement.parentElement.parentElement.style.display = 'none';
	
}

//-----------------------------------------------
// - done button click, more events needed for 
//   new buttons
// - elem -> .popover-content first child
BTNC.prototype.doneNew = function(elem){

	// activate the buttons
	this.act();

	// set the event listeners on the content editable element
	cm.conEdit(this.btn.a.children[3]);

	// set the inner HTML of the other url popover
	btnsCpanels.children[6].getElementsByTagName('input')[0].value = elem.children[2].value;

	// remove this popover
	elem.parentElement.parentElement.parentElement.removeChild(elem.parentElement.parentElement);

	// set the width of the dragable elem to auto
	this.btn.a.style.width = 'auto';
}
















