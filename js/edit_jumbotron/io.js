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
	this.s = null;

	// temp variable
	this.t = null;

	// image uploader
	this.iu = new IU();

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
	this.s = imgsToolbar.children[0].children;

	// remove the inactive class
	this.s[1].className = 'btn btn-default';
	this.s[2].className = 'btn btn-default';
	this.s[3].className = 'btn btn-default';

	// add the event listeners

}

//-----------------------------------------------
// - deactivate toolbar btns
IO.prototype.dAct = function(){

	// get the toolbar btns
	this.s = imgsToolbar.children[0].children;

	// remove the inactive class
	this.s[1].className = 'btn btn-default inactive';
	this.s[2].className = 'btn btn-default inactive';
	this.s[3].className = 'btn btn-default inactive';

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

var IU = function(){

	// ajax object
	this.xhr = null;

	// file for upload
	this.file = null;

}

/* METHODS */

//-----------------------------------------------
// - file dragover method 
IU.prototype.fileHover = function(e){
	e.stopPropagation();
	e.preventDefault();
	this.style.border = (e.type == "dragover" ? "3px solid #5CB85C" : "3px dashed #CCC");
}

//-----------------------------------------------
// - file selection event listener
IU.prototype.fileSelect = function(e) {

	// cancel event and hover styling
	jApp.imgs.iu.fileHover(e);

	// display gif spinner
	// bgCanvas.children[2].style.display = 'block';

	// fetch FileList object
	jApp.imgs.iu.file = e.target.files || e.dataTransfer.files;// process all File objects
	jApp.imgs.iu.file = jApp.imgs.iu.file[0];

	// upload the file
	jApp.imgs.iu.uploadFile();
}

//-----------------------------------------------
// - upload image
IU.prototype.uploadFile = function(){

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
// - img file upload callback 
IU.prototype.uploadCB = function(){
	if (this.readyState == 4) { console.log(this.responseText);

		// parse the json
		jApp.temp = JSON.parse(this.responseText);

		// set the nVals

		// remove the last child of the active image overlay

		// append a new img tag

		// set the img src

		// remove the draghover, dragleave events

		// activate the image overlay property toolbars
	}
}

//-----------------------------------------------
// - apply image uploader events to newly created
//   image overlay element
IU.prototype.ae = function(){ return false;

}
































