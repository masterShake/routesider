//-----------------------------------------------
//				 IO (image overlay)				
//			   ----------------------
//
// - manage image overlay toolbar
//
//-----------------------------------------------

/* CONSTRUCTOR */

IO = function(){

	// indexer
	this.i = 0;

	// hashmap
	this.h = {};

	// active image overlay element
	this.a = null;

	// temp variable
	this.v = null;

	// temp variable
	this.t = null;

	// image uploader
	this.iu = new IU(this);

	// image styler
	this.is = new IS(this);

	// apply event listener to new io button
	jumboToolbar.children[0].children[1].children[2]
		.addEventListener('click', this.newImg, false);

	// move to front button
	imgsToolbar.children[0].children[3]
		.addEventListener('click', rm.move2front, false);

	// prompt delete
	imgsToolbar.children[1].children[0]
		.addEventListener('click', this.confirmDel, false);	

	// get all the image overlay objects
	this.t = dragCanvas.getElementsByClassName('image-overlay');

	// loop though the image overlay elements
	for(var i = 0; i < this.t.length; i++){

		// push elem onto the hashmap
		this.h[this.i] = this.t[this.i];

		// add toggle event
		this.t[i].children[0].addEventListener('click', this.is.tog, false);
	}
}

/* METHODS */

IO.prototype.close = function(){

	// re-add the newTB event listener
	jumboToolbar.children[0].children[1].children[2]
		.addEventListener('click', this.newImg, false);

	// if there is no active textbox, return
	if(!this.a) return;

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
IO.prototype.newImg = function(e){ e.preventDefault(); 

	// deactive the properties toolbar buttons
	imgs.dAct();

	// create the new image overlay uploader elem
	imgs.a = imgs.createElem();

	// append the new textbox to the drag canvas
	dragCanvas.appendChild(imgs.a);

	// create & activate the rr object
	rm.i++;
	rm.z++;
	rm.h[rm.i] = new rr(imgs.a);
	rm.a = rm.h[rm.i];

	// add the new image overlay to the nVals
	jApp.nVals.imgs[imgs.i] = {
		src : '',
		color : 'transparent',
		opacity : 1,
		blur: 0,
		z : rm.z,
		round : 0,
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
	imgs.a.setAttribute('data-r', rm.i);
	
	// insert the new css rules
	rm.newRules();

	// apply any event listeners
	imgs.iu.ae();

    // reset the style control panel
    imgs.is.setBg();

	// set the visibility checkboxes
	cs.imgsB[0].checked = 
	cs.imgsB[1].checked = 
	cs.imgsB[2].checked = true;
}

//-----------------------------------------------
// - generate the new image overlay DOM object
IO.prototype.createElem = function(){ 

	// increment the indexer
	this.i++;

	// create the element
	this.h[this.i] = document.createElement('div');

	// make it active
	this.a = this.h[this.i];

	// set the class
	this.a.className = 'image-overlay active empty';

	// set the key
	this.a.setAttribute('data-key', this.i);

	// set the transformation style
	this.a.style.transform = 'matrix(1, 0, 0, 1, 0, 0)';

	// add the 3 children
	this.a.innerHTML =  '<div class="toggle-edit" style="display:none;">'+
					   		'<button type="button" class="btn btn-default">'+
								'<span class="glyphicon glyphicon-pencil"></span>'+
							'</button>'+
					    '</div>'+ 
					    document.getElementById('drag-btns-html').value+
					    '<div>'+
	                        '<div class="upload-oldfash">'+
	                            '<label>Files to upload:</label>'+
	                            '<input type="file" name="fileselect[]" multiple="multiple" />'+
	                        '</div>'+
	                        '<div class="icon-image"></div>'+
	                        '<div class="text"><span>-or-</span><br>Drag &amp; Drop</div>'+
	                    '</div>';

    // apply the toggle editor events
    this.a.children[0].addEventListener('click', this.is.tog, false);

    // return new element
    return this.a;
}

//-----------------------------------------------
// - activate image overly property toolbar btns
IO.prototype.act = function(){ 

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
IO.prototype.dAct = function(){

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

//-----------------------------------------------
// - confirm delete active image overlay
IO.prototype.confirmDel = function(){

	// if the user has not uploaded an image
	if(imgs.a.children[2].tagName !== 'IMG'){
		// delete the element, do not prompt modal
		imgs.del(); return;
	}

	// set the modal title
	confModal.getElementsByTagName("h4")[0]
		.innerHTML = '<div class="icon-images"></div> Delete image overlay';

	// set the modal body
	confModal.children[0].children[0].children[1]
   		.innerHTML = '<p>Are you sure you want to delete this image?</p>';

   	// copy the image
   	confModal.children[0].children[0].children[1]
   		.appendChild(imgs.copy());

   	// size it
   	confModal.children[0].children[0].children[1].children[1]
   		.style.maxWidth = '200px';

   	// set the modal callback
   	jApp.modal.callback = imgs.del;

   	// launch the modal
   	jApp.modal.launch();
}

//-----------------------------------------------
// - make a copy of the image
IO.prototype.copy = function(){

	// create an empty div
	this.t = document.createElement('div');

	// give it a class
	this.t.className = 'm-container';

	// insert the image
	this.t.appendChild(this.a.cloneNode());

	return this.t;
}

//-----------------------------------------------
// - delete image overlay
IO.prototype.del = function(){ 

	// gut the innards of the active image overlay
	imgs.a.innerHTML = '';

	// remove it from the nVals
	jApp.nVals.imgs[imgs.a.dataset.key] = null;
	delete jApp.nVals.imgs[imgs.a.dataset.key];

	// hide it, but do not delete to maintain order
	imgs.a.style.display = 'none';

	// prompt save
	jApp.deltaVals();

	// remove the active textbox
	imgs.a = null;

	// hide the textbox properties toolbar
	jumboToolbar.children[0].children[1].children[2].click();

}




































//-----------------------------------------------
//				 IU (image uploader)				
//			   -----------------------
//
// - drag and drop upload events
//
// - traditional upload events
//
// - activate properties toolbar
//
//-----------------------------------------------

/* CONSTRUCTOR */

var IU = function(io){

	// reference to the io object
	this.io = io;

	// ajax object
	this.xhr = 

	// file for upload
	this.file = 

	// temp variable
	this.t = null;

}

/* METHODS */

//-----------------------------------------------
// - file hover, dragover file to drop 
IU.prototype.fh = function(e){
	e.stopPropagation();
	e.preventDefault();
	e.currentTarget.className = (e.type == "dragover" ? "image-overlay active empty dragover" : "image-overlay active empty");
}

//-----------------------------------------------
// - file selection event listener
IU.prototype.fs = function(e) {

	// cancel event and hover styling
	imgs.iu.fh(e);

	// fetch FileList object
	imgs.iu.file = e.target.files || e.dataTransfer.files;// process all File objects
	imgs.iu.file = imgs.iu.file[0];

	// upload the file
	imgs.iu.uploadFile();
}

//-----------------------------------------------
// - upload image
IU.prototype.uploadFile = function(){

	// append a loading gif spinner
	this.l();

	// - delete the previous xhr object
	// - it will be properly garbage collected
	this.xhr = null;

	// create a new one
	this.xhr = new XMLHttpRequest();

	// if file is the correct type and size
	if( (this.file.type == "image/jpeg" || 
		 this.file.type == "image/jpg"  ||
		 this.file.type == "image/png"  ||
		 this.file.type == "image/gif") && 
		 this.file.size < 9999999999999999
	  ){

	  	// add an event listener to the ajax request
	  	this.xhr.onreadystatechange = imgs.iu.uploadCB;

		// ajax
		this.xhr.open("POST", document.URL, true);
		this.xhr.setRequestHeader("X-file-name", this.file.name);
		this.xhr.send(this.file);
	}
}

//-----------------------------------------------
// - append a loading gif spinner to indicate 
//   that the file is being uploaded
IU.prototype.l = function(){
	this.t = document.createElement('div');
	this.t.className = 'uploading';
	this.t.innerHTML = '<span class="glyphicon glyphicon-refresh loading"></span>';
	this.io.a.children[2].appendChild(this.t);
}

//-----------------------------------------------
// - img file upload callback 
IU.prototype.uploadCB = function(){
	
	if (this.readyState != 4) return; console.log(this.responseText);

	// parse the json
	jApp.temp = JSON.parse(this.responseText);

	// remoe the .empty class
	imgs.a.className = 'image-overlay active';

	// remove the last child of the active image overlay
	imgs.a.removeChild(imgs.a.children[2]);

	// append a new img tag
	imgs.a.appendChild(
		document.createElement('img')
	);

	// set the nVals
	jApp.nVals.imgs[imgs.a.dataset.key].src = 

	// set the img src
	imgs.a.children[2].src = jApp.temp["image"];

	// remove the draghover, dragleave events
	imgs.a.removeEventListener('dragover', imgs.iu.fh, false);
	imgs.a.removeEventListener("dragleave", imgs.iu.fh, false);
	imgs.a.removeEventListener("drop", imgs.iu.fs, false);

	// activate the image overlay property toolbars
	imgs.act();

	// prompt save
	jApp.deltaVals();
}

//-----------------------------------------------
// - apply image uploader events to newly created
//   image overlay element
IU.prototype.ae = function(){

	// apply file dragover event
	this.io.a.addEventListener("dragover", this.fh, false);

	// apply file dragleave event
	this.io.a.addEventListener("dragleave", this.fh, false);

	// apply file drop event
	this.io.a.addEventListener("drop", this.fs, false);

	// apply traditional upload fileselect event
	this.io.a.children[2].children[0].children[1]
		.addEventListener("change", this.fs, false);

	// remove the newImg event listener
	jumboToolbar.children[0].children[1].children[2]
		.removeEventListener('click', imgs.newImg, false);
}




































//-----------------------------------------------
//				 IS (image styler)				
//			   ---------------------
//
// - bg color
//
//-----------------------------------------------

/* CONSTRUCTOR */

var IS = function(io){

	// track the io parent node
	this.io = io;

	// store last color, temp variable, get the inputs
	this.t = imgsCpanels.children[0].getElementsByTagName('input');

	// get the text input
	this.texti = this.t[0];

	// get the color input
	this.picki = this.t[1];

	// get the transparency checkbox
	this.checki = this.t[2];

	// hexidecimal text input event
	this.texti.addEventListener('keyup', this.hexText, false);
	this.texti.addEventListener('blur', this.hexBlur, false);

	// color input change event
	this.picki.addEventListener('change', this.colorPick, false);

	// transparency checkbox change event
	this.checki.addEventListener('change', this.trans, false);

	// get color btns
	this.t = imgsCpanels.children[0].getElementsByTagName('button');

	// set the current color btn
	this.icon = this.t[1];

	// loop through the btns and set event listener
	for(var i = 2; i < this.t.length; i++)
		this.t[i].addEventListener('click', this.wheelBtn, false);

	// get the properties toolbar btns
	this.t = imgsToolbar.children[0].children;

	// get the toggle rrr btn, add event listener
	this.rrrBtn = this.t[2];
	this.rrrBtn.addEventListener('click', this.togRRR, false);

	// add rrr off event to remaining toolbar btns
	this.t[0].addEventListener('click', this.rrrOff, false);
	this.t[1].addEventListener('click', this.rrrOff, false);
	this.t[3].addEventListener('click', this.rrrOff, false);
	this.t[4].addEventListener('click', this.rrrOff, false);
}

/* METHODS */

//-----------------------------------------------
// - keyup event change background color hex text
// - make sure that first character is always a
//   hashtag
// - if legit hex value, display color
IS.prototype.hexText = function(){
	
	// if the first character is not a #
	if(this.value.charAt(0) != "#")
		// put the hashtag in front of the text
		this.value = "#" + this.value;

	// remove any input that is not 0-9, A-F
	this.value = "#" + this.value.substr(1,6).replace(/[^0-9a-f]+/gi, '');

	// if the input is now the proper length & format
	if(this.value.length == 7){

		// set the temp color variable
		imgs.is.t = this.value;

		// set the button color
		imgs.is.setColor();
	}
}

//-----------------------------------------------
// - blur event for hex input
// - set value to previous compliant hex value
IS.prototype.hexBlur = function(){
	this.value = imgs.is.t;
}

//-----------------------------------------------
// - html5 color picker change event
IS.prototype.colorPick = function(){
	imgs.is.t = this.value;
	imgs.is.setColor();
}

//-----------------------------------------------
// - transparent checkbox change event 
// - change the opacity
// - keep track of previous color, possibly reset
IS.prototype.trans = function(){
	this.parentElement.style.opacity = (this.checked) ? '1' : '0.5';
	imgs.is.t = (this.checked) ? 'transparent' : '#FFFFFF';
	imgs.is.setColor();
}

//-----------------------------------------------
// - user clicks one of the color wheel colors
IS.prototype.wheelBtn = function(){
	imgs.is.t = this.dataset.hex;
	imgs.is.setColor();
}

//-----------------------------------------------
// - set the colors of:
// 	  + image overlay background
//    + little paint button
//    + text input
//    + color input
//    + transparency checkbox
IS.prototype.setColor = function(){

	// if the value has been set to transparent
	if(this.t == 'transparent')

		return this.makeTrans();

	// set preview background color
	this.io.a.style.backgroundColor = 

	// set the preview icon background
	this.icon.style.backgroundColor = 

	// set the text
	this.texti.value = 

	// set the color picker
	this.picki.value = 

	// & update the new values object
	jApp.nVals.imgs[this.io.a.dataset.key].color = this.t;

	// set the preview icon color
	this.icon.style.color = 
		cs.hexBright(cs.hexToRgb(this.t)) ?
			"#444" : "#FFF";

	// uncheck the transparency
	this.checki.checked = false;
	this.checki.parentElement.style.opacity = '0.5';

	// notify root node that values have changed
	jApp.deltaVals();
}

//-----------------------------------------------
// - make the background color transparent
IS.prototype.makeTrans = function(){

		// set preview background color
		this.io.a.style.backgroundColor = 

		// & update the new values object
		jApp.nVals.imgs[this.io.a.dataset.key].color = this.t;

		// set the text
		this.texti.value = '';

		// set the color picker
		this.picki.value = '#FFFFFF';

		// set the icon
		this.icon.style.backgroundColor = '#FFF';
		this.icon.style.color = '#444';
}

//-----------------------------------------------
// - toggle resize, reposition, rotate btns
IS.prototype.togRRR = function(){ console.log('toggle a bitch');
	// if the btns are not showing
	if(imgs.a.children[1].offsetParent === null){
		// show the .drag-btns
		imgs.a.children[1].style.display = 'block';
		// add the active class
		this.className = 'btn btn-default active';
		// set the r map active objects
		rm.a = rm.h[imgs.a.dataset.r];
		rm.m = rm.a.m;
	}else{
		imgs.a.children[1].style.display = 'none';
		this.className = 'btn btn-default';
	}
}

//-----------------------------------------------
// - hide rrr when user clicks something else
IS.prototype.rrrOff = function(){
	// if rrrBtn is currently inactive, do nothing
	if(imgs.is.rrrBtn.className == 'btn btn-default inactive') return;
	// hide the rrr element
	imgs.a.children[1].style.display = 'none';
	// button default
	imgs.is.rrrBtn.className = 'btn btn-default';
}

//-----------------------------------------------
// - click btn event, toggle editor mode
IS.prototype.tog = function(){

	// hide the .toggle-edit element
	this.style.display = 'none';

	// if there is no other active textbox
	if(!imgs.a){

		// display the control panel, first remove newImg event
		jumboToolbar.children[0].children[1].children[2]
			.removeEventListener('click', imgs.newImg, false);
		jumboToolbar.children[0].children[1].children[2].click();

	// if there is another textbox open
	}else if(imgs.a !== this.parentElement){

		// remove the active class
		imgs.a.className = 'image-overlay';

		// show the .toggle-edit elem
		imgs.a.children[0].style.display = 'block';

		// make sure the drag buttons are hidden
		imgs.a.children[1].style.display = 'none';
	}

	// set the active element
	imgs.a = this.parentElement;
	imgs.a.className = 'image-overlay active';
	rm.a = rm.h[this.parentElement.dataset.r];

	// set the visibility checkboxes
	cs.setVis();

	// set the blur, opacity, and background control panel
	imgs.is.setBg();

	// activate the buttons
	imgs.act();

}

//-----------------------------------------------
// - set blur, opacity, and background color of
//   control panel when user toggles/actives image
IS.prototype.setBg = function(){

	// if the image overlay is transparent
	if(jApp.nVals.imgs[imgs.a.dataset.key].color == 'transparent'){
		// check the checkbox
		this.checki.checked = true;
		this.checki.parentElement.style.opacity = '1';
		this.texti.value = '';
		this.icon.style.backgroundColor = '#FFF';
		this.icon.style.color = '#444';
		this.picki.value = '#FFFFFF';
	}else{
		// set the color picker, let js to the rest
		this.checki.checked = false;
		this.checki.parentElement.style.opacity = '0.5';
		this.picki.value = jApp.nVals.imgs[imgs.a.dataset.key].color;
		this.picki.dispatchEvent(new Event('change'));
	}

	// set the opacity & blur
	this.io.v = imgsCpanels.children[0].getElementsByTagName('input');
	this.io.v[3].value =
	this.io.v[4].value = jApp.nVals.imgs[imgs.a.dataset.key].blur;
	this.io.v[5].value =
	this.io.v[6].value = jApp.nVals.imgs[imgs.a.dataset.key].opacity;

}


































