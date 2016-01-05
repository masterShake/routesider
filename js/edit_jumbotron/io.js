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

}

/* METHODS */

IO.prototype.close = function(){

	return false;

}

//-----------------------------------------------
// - create new image overlay element when user 
//   clicks the jumbo toolbar button
TB.prototype.newIO = function(e){ e.preventDefault();

	// create the new image overlay uploader elem
	this.a = createElem();

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
	jApp.io.a.setAttribute('data-r', rm.i);
	
	// insert the new css rules
	jApp.io.newRules(rm.i);

	// apply any event listeners

	// set the visibility checkboxes
}

//-----------------------------------------------
// - generate the new image overlay DOM object
TB.prototype.createElem = function(){ 

	// increment the indexer
	this.i++;

	// create the element
	this.h[this.i] = document.createElement('div');

	// make it active
	this.a = this.h[this.i];

	// set the class
	this.a.className = 'image-overlay';

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
                        '<div class="upload-oldfash">'+
                            '<label>Files to upload:</label>'+
                            '<input type="file" name="fileselect[]" multiple="multiple" />'+
                        '</div>'+
                        '<div style="position:relative;font-size:12px;left:calc(50% - 18px);max-width:32px;text-shadow: 0px 0px 4px #FFF;">&#45; or &#45;</div>'+
                        'Drag &amp; Drop';

    // apply the toggle editor events


    // return new element
    return this.a;
}

//-----------------------------------------------
// - create css rules for new image overlay elem
// - r => index in rMap for rrr object
IO.prototype.newRules = function(r){ return false;

}


















