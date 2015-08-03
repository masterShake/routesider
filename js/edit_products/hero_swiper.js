
//-----------------------------------------------
//
//				  HS - Hero Swiper
//				 ---------------
//
// - Class for uploading new pics into the hero
//   swiper for a product.
// - This object initiailizes the swiper
// - Handles the image uploads
//
//-----------------------------------------------

/* CONSTRUCTOR */

var HS = function( slideshowElem ){

	// initialize the swiper
	this.swiper = new Swiper( slideshowElem.getElementsByClassName("swiper-container")[0], 
							  {
						        slidesPerView: 'auto',
    							centeredSlides: true,
						        spaceBetween: 5
							  }
							);

	// variable property to hold ajax object
	this.xhr = null;

	// hero element
	this.hero = slideshowElem.getElementsByClassName("hero")[0];

	// filedrag element
	this.filedrag = slideshowElem.getElementsByClassName("filedrag")[0];

	// array of all the image files in the slide in given order
	this.slideshow = [];

	/* construction */

	// dragover event listeners
	this.filedrag.addEventListener("dragover", this.fileDragHover, false);
	this.filedrag.addEventListener("dragleave", this.fileDragHover, false);
	this.filedrag.addEventListener("drop", this.fileSelectHandler, false);
}

/* METHODS */


// file drag hover
HS.prototype.fileDragHover = function(e) {
	e.stopPropagation();
	e.preventDefault();
	// e.target.className = (e.type == "dragover" ? "hover" : "");
}
// file selection event listener
HS.prototype.fileSelectHandler = function(e) {

		// cancel event and hover styling
		epApp.pc.heroSwiper.fileDragHover(e);
		
		// display the spinner
		e.target.innerHTML = "<span class='glyphicon glyphicon-hourglass loading'></span>";

		// fetch FileList object
		var files = e.target.files || e.dataTransfer.files;// process all File objects

		// upload the file
		epApp.pc.heroSwiper.uploadFile(files[0], e.target.dataset.elem);
}
// ajax upload file
HS.prototype.uploadFile = function(file, elemStr){

	// delete the previous xhr object
	this.xhr = null;

	// create a new one
	this.xhr = new XMLHttpRequest();

	// if file is the correct type and size
	if( (file.type == "image/jpeg" || 
							 file.type == "image/jpg"  ||
							 file.type == "image/png"  ||
							 file.type == "image/gif")
	  	&& file.size < 9999999999999999
	  ){

	  	// add an event listener to the ajax request
	  	this.xhr.onreadystatechange = function(){
	  		if (this.readyState == 4) { console.log(this.responseText);

	  			// turn the response json into an object
	  			this.j = JSON.parse( this.responseText );

	  			// push the image file onto the slideshow
	  			epApp.pc.heroSwiper.slideshow.push(this.j["filename"]);

	  			// remove the spinning hourglass
	  			epApp.pc.heroSwiper.filedrag.innerHTML = '<span><span class="glyphicon glyphicon-camera"></span>&nbsp;drag &amp; drop<br><span style="font-size: 8px;">-or-</span></span>';
			
	  			// set the hero background image
	  			epApp.pc.heroSwiper.hero.innerHTML = "";
	  			epApp.pc.heroSwiper.hero.style.backgroundImage = "url(uploads/" + this.j['filename'] + ")";

	  			// add a slide to the slideshow
	  			epApp.pc.heroSwiper.addSlide( document.createElement('div'), this.j['filename'] );
			}
	  	}

		// ajax
		this.xhr.open("POST", "", true);
		this.xhr.setRequestHeader("X-file-name", file.name + "." + elemStr);
		this.xhr.send(file);
	}
}

//-----------------------------------------------
// - add a slide to the slideshow
HS.prototype.addSlide = function(blankDiv, filename){
	
	// set the data-filename attribute
	blankDiv.setAttribute("data-filename", filename);
	
	// add the elements to remove sldie or move it to the front
	blankDiv.innerHTML = '<div class="glyphicon glyphicon-remove-circle"></div>' +
						 '<br>' +
						 '<input type="checkbox" checked>';
	
	// set the slide class
	blankDiv.className = "swiper-slide image-slide";
	
	// set the image background
	blankDiv.style.backgroundImage = "url(uploads/"+filename+")"; // console.log(this.swiper.slides[this.swiper.slides.length - 1]); console.log(blankDiv)
	
	// add event listner to remove circle
	blankDiv.children[0].addEventListener('click', epApp.pc.heroSwiper.removeSlide, false);
	
	// add event listener to move slide to the front
	blankDiv.children[2].addEventListener('click', epApp.pc.heroSwiper.slideToFront, false);
	
	// if there are other slides
	if(this.swiper.slides.length > 1)
		this.swiper.slides[0].children[2].checked = false;

	// prepend the element
	this.swiper.prependSlide(blankDiv);
	
	// update
	this.swiper.update();
}

//-----------------------------------------------
// - event listener to remove slide from
//   slideshow
HS.prototype.removeSlide = function(){
	
	// remove this filename from the slideshow
	epApp.pc.heroSwiper.slideshow.splice( 
										epApp.pc.heroSwiper.slideshow.indexOf(this.parentElement.dataset.filename),
										1
									 );
	
	// if there are no more slides
	if(!epApp.pc.heroSwiper.slideshow.length){
		
		// reset the inner html of the hero
		epApp.pc.heroSwiper.hero.innerHTML = '<div class="glyphicon glyphicon-camera"></div>' + 
										  '<h4>No images yet</h4>';
	
		// remove the background image
		epApp.pc.heroSwiper.hero.style.backgroundImage = "none";
	
	// if this was the first slide in slideshow
	}else if(epApp.pc.heroSwiper.swiper.clickedIndex == 0){

		// set the checked box of the next slide
		epApp.pc.heroSwiper.swiper.slides[1].children[2].checked = true;
	
		// change the hero
		epApp.pc.heroSwiper.hero.style.backgroundImage = 'url(uploads/' + epApp.pc.heroSwiper.slideshow[0] + ')';
	}
	
	// remove the slide from the swiper
	epApp.pc.heroSwiper.swiper.removeSlide( epApp.pc.heroSwiper.swiper.clickedIndex );
}

//-----------------------------------------------
// - event listener to move slide to the front
//   of the slideshow
HS.prototype.slideToFront = function(){

	// if this slide is alreay in front
	if(this.parentElement === epApp.pc.heroSwiper.swiper.slides[0]){
		// keep it in check
		this.checked = true; return;
	}

	/* do the style stuff first to avoid race conditions */

	// uncheck the front slide
	epApp.pc.heroSwiper.swiper.slides[0].children[2].checked = false;

	// set the hero
	epApp.pc.heroSwiper.hero.style.backgroundImage = 'url(uploads/'+this.parentElement.dataset.filename+')';

	// move this filename to the front of the slideshow array
	epApp.pc.heroSwiper.slideshow.move(
										epApp.pc.heroSwiper.swiper.clickedIndex,
										0
								   );

	// move the slide
	this.parentElement.parentElement.insertBefore( this.parentElement, this.parentElement.parentElement.children[0] );

	// update
	epApp.pc.heroSwiper.swiper.update();
}