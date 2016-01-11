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

var TB = function(){

	// indexer for hashmap
	this.i = 0;

	// hashmap of all the textboxes
	this.h = {}

	// active textbox
	this.a = null;

	// toggle rrr button
	this.rBtn = tbsToolbar.children[3].children[1];

	// init the TBC object
	this.c = new TBC();

	// add event listener to the new textbox btn
	jumboToolbar.children[0].children[1].children[1]
		.addEventListener('click', this.newTB, false);

	// delete textbox prompt modal
	tbsToolbar.children[3].children[0]
		.addEventListener('click', this.confirmDel, false);
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
	// rm.newRules();

	// apply the event listeners
	// tbs.ae();

	// set the checkbox visibility
	// cs.setVis();
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

	// set designMode to 'On'
	this.a.children[2].contentEditable = true;

	return this.a;
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
	modal.title.innerHTML = '<div class="dash-box" aria-hidden="true">Aa</div>' + 
    				 'Delete background image';

   	// set modal body
   	modal.body.innerHTML = '<p>Are you sure you want to delete this textbox?</p>';

   	// create a copy of the textbox
   	modal.body.appendChild( tbs.copy() );

   	// set modal callback
   	modal.callback = tbs.del;

   	// launch the modal
   	modal.launch();

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
//			  TBC (textbox component)			
//			---------------------------
//
// - keep track of color control panel elements
//
//-----------------------------------------------

var TBC = function(){

	// get the text inputs
	this.texti = tbsCpanels.querySelectorAll('input.colorize[type="text"]');

	// get the HTML5 color picker inputs
	this.picki = tbsCpanels.querySelectorAll('input.colorize[type="color"]');

	// get the icons
	this.icon = tbsCpanels.querySelectorAll('button.colorize[type="button"]');

	// get the trasparency checkboxes
	this.trani = tbsCpanels.querySelectorAll('input.colorize[type="checkbox"]')
}
