
//-----------------------------------------------
//				 IO (image overlay)				
//			   ----------------------
//
// - manage image overlay toolbar
//
//-----------------------------------------------

var IO = function(){

	// indexer for hashmap
	this.i = 0;

	// hashmap of all image overlays
	this.h = {};

	// active image overlay
	this.a = null;

	// toggle rrr button
	this.rBtn = imgsToolbar.children[0].children[2];

	// init the upload image object
	this.ui = new UI();

	// init the c object
	this.c = new IOC();

	// add event listener to the new textbox component btn
	this.compBtn = jumboToolbar.children[0].children[1].children[2];
	this.compBtn.addEventListener('click', this.newElem, false);

	// delete textbox prompt modal
	tbsToolbar.children[1].children[0]
		.addEventListener('click', this.confirmDel, false);
}

//-----------------------------------------------
// - destroy image overlay mode and hide toolbar
IO.prototype.close = function(){

	// re-add the newTB event listener
	this.compBtn.addEventListener('click', this.newImg, false);

	// if there is no active image overlay, return
	this(!this.a) return;

	// remove the active class
	this.a.className = 'image-overlay';

	// show the .toggle-edit elem
	this.a.children[0].style.display = 'block';

	// make sure the drag buttons are hidden
	this.a.children[1].style.display = 'none';

	// nullify the active image overlay
	this.a = null;
}

//-----------------------------------------------
// - create new image overlay element when user 
//   clicks the jumbo toolbar button
IO.prototype.newElem = function(e){ e.preventDefault();

	// deactive the properties toolbar buttons
	imgs.c.dAct();

	// create the new image uploader overlay elem
	imgs.a = imgs.createElem();

	// append the new textbox to the drag canvas
	dragCanvas.appendChild(imgs.a);

	// create & activate the rr object
	rm.i++;
	rm.z++;
	rm.h[rm.i] = new rr(imgs.a);
	rm.a = rm.h[rm.i];

	// add the new textbox to the nVals
	jApp.nVals.imgs[imgs.i] = {
		src : '',
		color : 'transparent',
		opacity : 1,
		blur: 0,
		z : rm.z,
		round : 0,
		borderwidth: 0,
		bordercolor: '#FFFFFF',
		shadow : {active : 0, color : '#444444', softness : 4, spread : 4, x : 0, y : 0, inset : 0},
		layout : {
			mobile  : { w : 80, h : 27, x : 48, y : 44, s : 1, a : 0, v : 1 },
			tablet  : { w : 80, h : 27, x : 48, y : 44, s : 1, a : 0, v : 1 },
			desktop : { w : 80, h : 27, x : 48, y : 44, s : 1, a : 0, v : 1 }
		}
	};

	// attribtue referrence to rr index
	tbs.a.setAttribute('data-r', rm.i);

	// apply the event listeners
	this.ae();
}

//-----------------------------------------------
// - helper function for newElem
// - create the new element
// - create the css rules for the new element
IO.prototype.createElem = function(){

	// increment the indexer
	this.i++;

	// create a new textbox elem, store it in the hashmap
	this.h[this.i] = document.createElement('div');

	// set it to active
	this.a = this.h[this.i];

	// give the element an index key
	this.a.setAttribute('data-key', this.i);

	// apply the textbox class
	this.a.className = 'image-overlay active empty';

	// set the transform style
	this.a.style.transform = 'matrix(1, 0, 0, 1, 0, 0)';

	// add the 3 children
	this.a.innerHTML =  '<div class="toggle-edit" style="display:none;">'+
					   		'<button type="button" class="btn btn-default">'+
								'<span class="glyphicon glyphicon-pencil"></span>'+
							'</button>'+
					    '</div>'+ 
					    document.getElementById('drag-btns-html').value+
					    '<div class="background"></div>'+
					    '<div>'+
	                        '<div class="upload-oldfash">'+
	                            '<label>Files to upload:</label>'+
	                            '<input type="file" name="fileselect[]" multiple="multiple" />'+
	                        '</div>'+
	                        '<div class="icon-image"></div>'+
	                        '<div class="text"><span>-or-</span><br>Drag &amp; Drop</div>'+
	                    '</div>';
	return this.a;
}

//-----------------------------------------------
// - add event listeners to new image overlay btn
TB.prototype.ae = function(){

	// remove newElem event listener
	this.compBtn.removeEventListener('click', this.newElem, false);

	// toggle editor
	this.a.children[0].addEventListener('click', cs.tog, false);

	// insert new style sheet rules
	rm.newRules();

	// set visibility checkboxes
	this.c.v[0].checked = 
	this.c.v[1].checked = 
	this.c.v[2].checked = true;

}

































//-----------------------------------------------
//			IOC (image overlay component)				
//		  ---------------------------------
//
// - track image overlay components for easy
//   access
//
//-----------------------------------------------

var IOC = function(){

	// get the text inputs
	this.texti = imgsCpanels.querySelectorAll('input.colorize[type="text"]');

	// get the HTML5 color picker inputs
	this.picki = imgsCpanels.querySelectorAll('input.colorize[type="color"]');

	// get the icons
	this.icon = imgsCpanels.querySelectorAll('button.colorize[type="button"]');

	// get the trasparency checkboxes
	this.checki = imgsCpanels.querySelectorAll('input.colorize[type="checkbox"]');	
}

//-----------------------------------------------
// - activate image overly property toolbar btns
IOC.prototype.act = function(){ 

	// get the toolbar btns
	this.v = imgsToolbar.children[0].children;
	
	// set the inactive class
	this.v[0].className = 'btn btn-default';
	this.v[1].className = 'btn btn-default';
	this.v[2].className = 'btn btn-default';
	this.v[3].className = 'btn btn-default';
	this.v[4].className = 'btn btn-default';

	imgsToolbar.children[0].children[5].style.display = 'none';

}

//-----------------------------------------------
// - deactivate toolbar btns
IOC.prototype.dAct = function(){

	// get the toolbar btns
	this.v = imgsToolbar.children[0].children;
	
	// set the inactive class
	this.v[0].className = 'btn btn-default inactive';
	this.v[1].className = 'btn btn-default inactive';
	this.v[2].className = 'btn btn-default inactive';
	this.v[3].className = 'btn btn-default inactive';
	this.v[4].className = 'btn btn-default inactive';

	imgsToolbar.children[0].children[5].style.display = 'block';
}































