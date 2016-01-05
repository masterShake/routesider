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
}

/* METHODS */

IO.prototype.close = function(){

	return false;

}

//-----------------------------------------------
// - create new image overlay element when user 
//   clicks the jumbo toolbar button
IO.prototype.newImg = function(e){ e.preventDefault(); 

	// deactive the properties toolbar buttons
	jApp.imgs.iu.dAct();

	// create the new image overlay uploader elem
	jApp.imgs.a = jApp.imgs.createElem();

	// append the new textbox to the drag canvas
	dragCanvas.appendChild(jApp.imgs.a);

	// create & activate the rr object
	rm.i++;
	rm.z++;
	rm.h[rm.i] = new rr(jApp.imgs.a);
	rm.a = rm.h[rm.i];

	// add the new image overlay to the nVals
	jApp.nVals.imgs[jApp.imgs.i] = {
		src : '',
		color : 'transparent',
		opacity : 1,
		blur: 0,
		deleted: 0,
		z : rm.z,
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
	jApp.imgs.a.setAttribute('data-r', rm.i);
	
	// insert the new css rules
	jApp.imgs.newRules(rm.i);

	// apply any event listeners
	jApp.imgs.iu.ae();

	// set the visibility checkboxes
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


    // return new element
    return this.a;
}

//-----------------------------------------------
// - create css rules for new image overlay elem
// - r => index in rMap for rrr object
IO.prototype.newRules = function(r){

	// default: scale 1, rotate 0, element centered
	this.t = '#dragCanvas>div:nth-child('+r+')'+
				'{ transform: scale(1,1) rotate3d(0,0,1,0deg); ' +
				'  left: calc(50% - 125px);' +
				'  top: calc(50% - 125px);' +
				'  z-index: '+rm.z+';' +
				'  display: block;}';

	// mobile
	document.styleSheets[7]
		.insertRule(this.t, r);
	// tablet
	document.styleSheets[7].cssRules[r + 1]
		.insertRule(this.t, r);
	// desktop
	document.styleSheets[7].cssRules[r + 2]
		.insertRule(this.t, r);

}

//-----------------------------------------------
// - activate image overly property toolbar btns
IO.prototype.act = function(){ 

	// get the toolbar btns
	this.v = imgsToolbar.children[0].children;

	// remove the inactive class
	this.v[1].className = 'btn btn-default';
	this.v[2].className = 'btn btn-default';
	this.v[3].className = 'btn btn-default';

	// add the event listeners

}

//-----------------------------------------------
// - deactivate toolbar btns
IO.prototype.dAct = function(){

	// get the toolbar btns
	this.v = imgsToolbar.children[0].children;

	// remove the inactive class
	this.v[1].className = 'btn btn-default inactive';
	this.v[2].className = 'btn btn-default inactive';
	this.v[3].className = 'btn btn-default inactive';

	// remove the event listeners

}

//-----------------------------------------------
// - confirm delete active image overlay
IO.prototype.confirmDel = function(){ return false;

}

//-----------------------------------------------
// - delete image overlay
IO.prototype.del = function(){ return false;

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
	this.style.border = (e.type == "dragover" ? "3px solid #5CB85C" : "3px dashed #CCC");
}

//-----------------------------------------------
// - file selection event listener
IU.prototype.fileSelect = function(e) {

	// cancel event and hover styling
	jApp.imgs.iu.fileHover(e);

	// fetch FileList object
	jApp.imgs.iu.file = e.target.files || e.dataTransfer.files;// process all File objects
	jApp.imgs.iu.file = jApp.imgs.iu.file[0];

	// upload the file
	jApp.imgs.iu.uploadFile();
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
	  	this.xhr.onreadystatechange = jApp.imgs.iu.uploadCB;

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

	// remove the last child of the active image overlay
	jApp.imgs.a.removeChild(jApp.imgs.a.children[2]);

	// append a new img tag
	jApp.imgs.a.appendChild(
		document.createElement('img')
	);

	// set the nVals
	jApp.nVals.imgs[jApp.imgs.a.dataset.key].src = 

	// set the img src
	jApp.imgs.a.children[2].src = jApp.temp["image"];

	// remove the draghover, dragleave events
	jApp.imgs.a.removeEventListener('dragover', jApp.imgs.iu.fileHover, false);
	jApp.imgs.a.removeEventListener("dragleave", jApp.imgs.iu.fileHover, false);
	jApp.imgs.a.removeEventListener("drop", jApp.imgs.iu.fileSelect, false);

	// activate the image overlay property toolbars
	jApp.imgs.act();
}

//-----------------------------------------------
// - apply image uploader events to newly created
//   image overlay element
IU.prototype.ae = function(){

	// apply file dragover event
	this.io.a.addEventListener("dragover", this.fileHover, false);

	// apply file dragleave event
	this.io.a.addEventListener("dragleave", this.fileHover, false);

	// apply file drop event
	this.io.a.addEventListener("drop", this.fileSelect, false);

	// apply traditional upload fileselect event
	this.io.a.children[2].children[0].children[1]
		.addEventListener("change", this.fileSelect, false);
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

		// focus on the div
		jApp.tbs.a.children[2].focus();

		// move the caret to the end
		jApp.tbs.setEnd();

		// set the button color
		jApp.tbs.c.setColor(this.dataset.i, this.dataset.com, this.value);
	}
}

//-----------------------------------------------
// - blur event for hex input
// - set value to previous compliant hex value
IS.prototype.hexBlur = function(){
	this.value = jApp.bg.bgc.temp;
}

//-----------------------------------------------
// - html5 color picker change event
IS.prototype.colorPick = function(){
	
	jApp.tbs.c.setColor( this.dataset.i,
						  this.dataset.com,
						  this.value.toUpperCase()
						);
}

//-----------------------------------------------
// - transparent checkbox change event 
// - change the opacity
// - set execCommand or background color
// - keep track of previous color, possibly reset
IS.prototype.trans = function(){
	// set the color
	jApp.tbs.c.setColor(
		this.dataset.i, 
		(this.dataset.i == 1) ? 'backColor' : false,
		(this.checked) ? 'transparent' : '#FFFFFF'
	);
}

//-----------------------------------------------
// - user clicks one of the color wheel colors
// - set text
// - set color icon
// - set html5 color picker
// - set background
IS.prototype.wheelBtn = function(){

	jApp.tbs.c.setColor( this.parentElement.parentElement.dataset.i,
						   this.parentElement.parentElement.dataset.com, 
						   this.dataset.hex
						 );
}

//-----------------------------------------------
// - set the colors of:
// 	  + image overlay background
//    + little paint button
//    + text input
//    + color input
//    + transparency checkbox
IS.prototype.setColor = function(){}





































