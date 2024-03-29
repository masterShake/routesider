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

	// active index
	this.ai = -1;

	// toggle rrr button
	this.rBtn = tbsToolbar.children[3].children[1];

	// init the TBC object
	this.c = new TBC(this);

	// add event listener to the new textbox component btn
	this.compBtn = jumboToolbar.children[0].children[1].children[1];
	this.compBtn.addEventListener('click', this.newElem, false);

	// delete textbox prompt modal
	tbsToolbar.children[4].children[0]
		.addEventListener('click', this.confirmDel, false);
}

//-----------------------------------------------
// - user closes textbox control panel
TB.prototype.close = function(){

	// re-add the newElem event listener
	this.compBtn.addEventListener('click', this.newElem, false);

	// if there is no active textbox, return
	if(this.ai == -1 || !this.a) return;

	// remove active index
	this.ai = -1

	// remove the active class
	this.a.className = 'textbox';

	// show the .toggle-edit elem
	this.a.children[0].style.display = 'block';

	// make sure the drag buttons are hidden
	this.a.children[1].style.display = 'none';

	// blur
	this.a.children[3].blur();

	// nullify the active textbox
	this.a = null;
}

//-----------------------------------------------
// - create new textbox element when user clicks
//   the jumbo toolbar button
TB.prototype.newElem = function(e){ e.preventDefault();

	// set this to active textbox status
	tbs.createElem();

	// remove this event listener
	this.removeEventListener('click', tbs.newElem);

	// add the new textbox to the nVals
	jApp.nVals.tbs[tbs.i] = {
		html : '',
		color : 'transparent',
		opacity : 1,
		blur: 0,
		z : rm.z,
		round : 0,
		borderwidth: 0,
		bordercolor: '#FFFFFF',
		shadow : {active : 0, color : '#444444', softness : 4, spread : 4, x : 0, y : 0, inset : 0},
		layout : {
			// w => width
			// h => height
			// x => left
			// y => top
			// s => scale
			// a => angle
			// v => visible
			mobile  : { w : 80, h : 27, x : 48, y : 44, s : 1, a : 0, v : 1 },
			tablet  : { w : 80, h : 27, x : 48, y : 44, s : 1, a : 0, v : 1 },
			desktop : { w : 80, h : 27, x : 48, y : 44, s : 1, a : 0, v : 1 }
		}
	};
}

//-----------------------------------------------
// - helper function for newElem
// - create the new element
// - create the css rules for the new element
TB.prototype.createElem = function(){

	// increment the indexer
	this.i++;

	// create a new textbox elem, store it in the hashmap
	this.h[this.i] = document.createElement('div');

	// set it to active
	this.a = this.h[this.i];

	// set the active index
	this.ai = i;

	// give the element an index key
	this.a.setAttribute('data-key', this.i);

	// apply the textbox class
	this.a.className = 'textbox active';

	// set the transform style
	this.a.style.transform = 'matrix(1, 0, 0, 1, 0, 0)';

	// add the 3 children
	this.a.innerHTML = '<div class="toggle-edit" data-as="tbs" style="display:none;">'+
					   		'<button type="button" class="btn btn-default">'+
								'<span class="glyphicon glyphicon-pencil"></span>'+
							'</button>'+
					   '</div>'+ 
					   document.getElementById('drag-btns-html').value+
					   '<div class="background"></div>'+
					   '<div class="content-edit" contenteditable="true"></div>';

	// apply the event listeners
	this.ae();
	
	// append the new textbox to the drag canvas
	dragCanvas.appendChild(tbs.a);

	// insert new style sheet rules
	rm.newRules(this.a, this.updateVals);
}

//-----------------------------------------------
// - add event listeners to new textbox element
TB.prototype.ae = function(){

	// set the content editable
	cm.conEdit(this.a.children[3]);

	// remove newElem event listener
	this.compBtn.removeEventListener('click', this.newElem, false);

	// toggle editor
	this.a.children[0].addEventListener('click', cm.tog, false);

	// re-dimension event
	this.a.children[3].addEventListener('touchend', this.c.reDim, false);
	this.a.children[3].addEventListener('mouseup', this.c.reDim, false);
	
	// set visibility checkboxes
	this.c.v[0].checked = 
	this.c.v[1].checked = 
	this.c.v[2].checked = true;
}

//-----------------------------------------------
// - update the nVals new values obejcts
// - zi --> z-index assigned by the rrr object
TB.prototype.updateVals = function(zi){
	
	// add the new textbox to the nVals
	jApp.nVals.tbs[tbs.i] = {
		html : '',
		color : 'transparent',
		opacity : 1,
		blur: 0,
		z : zi,
		round : 0,
		borderwidth: 0,
		bordercolor: '#FFFFFF',
		shadow : {active : 0, color : '#444444', softness : 4, spread : 4, x : 0, y : 0, inset : 0},
		layout : {
			// w => width
			// h => height
			// x => left
			// y => top
			// s => scale
			// a => angle
			// v => visible
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
TB.prototype.confirmDel = function(){

	// if the textbox is empty & has no bg color
	if(!tbs.a.children[3].childNodes.length 
	&& !tbs.a.children[2].style.backgroundColor){
		// delete it & return
		tbs.del(); return;
	}

	// set the modal title
	modal.title.innerHTML = '<div class="dash-box" aria-hidden="true">Aa</div>' + 
    				 'Delete textbox';

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
   	this.t.appendChild(this.a.children[3].cloneNode(true));
   	
   	// remove the editable property
   	this.t.children[0].contentEditable = false;

   	// add a border
   	this.t.children[0].style.border = '1px solid #ccc';

   	// center it
   	this.t.children[0].style.display = "inline-block";

   	// dimension it
   	this.t.children[0].style.width = this.a.offsetWidth + 'px';
   	this.t.children[0].style.height = this.a.offsetHeight + 'px';

   	// set the background color
   	this.t.children[0].style.backgroundColor = this.a.children[2].style.backgroundColor;

   	// set the border radius
   	this.t.children[0].style.borderRadius = this.a.children[2].style.borderRadius;

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
	jApp.nVals.tbs[tbs.ai] = null;
	delete jApp.nVals.tbs[tbs.ai];

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

var TBC = function(tbs){

	// get the text inputs
	this.texti = tbsCpanels.querySelectorAll('input.colorize[type="text"]');

	// get the HTML5 color picker inputs
	this.picki = tbsCpanels.querySelectorAll('input.colorize[type="color"]');

	// get the icons
	this.icon = tbsCpanels.querySelectorAll('button.colorize[type="button"]');

	// get the trasparency checkboxes
	this.checki = tbsCpanels.querySelectorAll('input.colorize[type="checkbox"]');

	// temp variable get layout
	if(document.body.offsetWidth < 767)
		tbs.a = 'mobile';
	else if(document.body.offsetWidth < 1200)
		tbs.a = 'tablet';
	else
		tbs.a = 'desktop';

	// temp get the iVals
	tbs.i = JSON.parse(document.getElementById('i-vals').value);

	// loop through the textboxes
	this.b = dragCanvas.getElementsByClassName('content-edit');
	for(var i = 0; i < this.b.length; i++){
		this.b[i].addEventListener('mouseup', this.reDim, false);
		this.b[i].addEventListener('touchend', this.reDim, false);
		this.b[i].style.height = tbs.i['tbs'][i].layout[tbs.a].h+'px';
		this.b[i].style.width = tbs.i['tbs'][i].layout[tbs.a].w+'px';
		// push it onto the hashmap
		tbs.h[i] = this.b[i].parentElement;
	}
	tbs.i = this.b.length - 1;
	tbs.a = null;

	// keep a map of all the execCom buttons
	this.b = tbsProps.querySelectorAll('[data-excom]');

	// keep track of the buttons for textbox
	this.b = {
		bold 		  : this.b[4],
		italic		  : this.b[5],
		underline	  : this.b[6],
		strikeThrough : this.b[7],
		subscript	  : this.b[8],
		superscript	  : this.b[9],
		justifyLeft	  : this.b[0],
		justifyCenter : this.b[1],
		justifyRight  : this.b[2],
		justifyFull	  : this.b[3]
	};

	// opacity, blur, border roundness, border thickness
	this.s = {
		opacity : tbsCpanels.querySelectorAll('opacity-form input'),
		blur : tbsCpanels.querySelectorAll('blur-form input'),
		round : tbsCpanels.querySelectorAll('roundness-form input'),
		borderwidth : tbsCpanels.querySelectorAll('thickness-form input'),
	}

	// track visibility checkboxes
	this.v = tbsCpanels.children[7].getElementsByTagName('input');

	// hr rule event
	tbsToolbar.children[1].children[3]
		.addEventListener('click', this.hr, false);
}

//-----------------------------------------------
// - horizontal line rule
TBC.prototype.hr = function(e){ e.preventDefault();
	// focus
	tbs.a.children[3].focus();
	cm.setEnd();
	// exec command insert the hr line
	document.execCommand('insertHorizontalRule', false, null);
	// set the html property
	jApp.nVals[as][this.parentElement.dataset.key].html = tbs.a.children[3].innerHTML;
	// prompt save
	jApp.deltaVals();
}

//-----------------------------------------------
// - user resizes content editable div
TBC.prototype.reDim = function(){

	// make sure that we have an active textbox
	if(tbs.a === null) return;

	// if dimensions have not changed
	if(jApp.nVals.tbs[this.parentElement.dataset.key].layout[layout.a].h == this.parentElement.offsetHeight
	&& jApp.nVals.tbs[this.parentElement.dataset.key].layout[layout.a].w == this.parentElement.offsetWidth)
		// do nothing
		return;

	// set the nVals
	jApp.nVals.tbs[this.parentElement.dataset.key]
		.layout[layout.a].h = this.parentElement.offsetHeight;
	jApp.nVals.tbs[this.parentElement.dataset.key]
		.layout[layout.a].w = this.parentElement.offsetWidth; 

	jApp.deltaVals();
}

//-----------------------------------------------
// - user changes layout
// - set the height and width of the content 
//   editable div inside the textbox element
TBC.prototype.setDims = function(){
	for(var x in tbs.h){
		if(tbs.h[x].children.length){
			tbs.h[x].children[3].style.width = jApp.nVals.tbs[x].layout[layout.a].w + 'px';
			tbs.h[x].children[3].style.height = jApp.nVals.tbs[x].layout[layout.a].h + 'px';
		}
	}
}

