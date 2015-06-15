<?php
require '../core/init.php';

//handle form input
$fn = (isset($_SERVER['HTTP_X_FILE_NAME']) ? $_SERVER['HTTP_X_FILE_NAME'] : false);

if ($fn) {

	//getfile information
	$ff = explode(".", $fn);

	// AJAX call
	file_put_contents(
		'../uploads/' . $ff[0].'.'.$ff[1],
		file_get_contents('php://input')
	);

	/*****************************************
	/
	/	change the filepath below
	/
	/*****************************************/
	// rename('uploads/' . $ff[0].'.'.$ff[1], '/var/www/weedica/uploads/'.$ff[2].'.'.$ff[1]); //change this
	exit("exit upload");
}
else if ($_SERVER['REQUEST_METHOD'] === 'POST') {

	// form submit
	$files = $_FILES['fileselect'];

	foreach ($files['error'] as $id => $err) {
		if ($err == UPLOAD_ERR_OK) {
			$fn = $files['name'][$id];
			move_uploaded_file(
				$files['tmp_name'][$id],
				'uploads/' . $fn
			);
			echo "<p>File $fn uploaded.</p>";
		}
	}

}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<link href="../css/bootstrap.min.css" rel="stylesheet">
<style type="text/css">
	/*
Styles for HTML5 File Drag & Drop demonstration
Featured on SitePoint.com
Developed by Craig Buckler (@craigbuckler) of OptimalWorks.net
*/
body
{
	margin:0px;
}
h3{
	margin:5px 0px;
}
h6{
	margin:5px 0 30px 0; 
	font-size: 14px;
}
p{
	font-size: 12px;
}
#filedrag
{
	-webkit-transition: .5s;
	-moz-transition: .5s;
	-ms-transition: .5s;
	-o-transition: .5s;
	transition: .5s;
	margin: 0 0 10px 0;
	padding:20px;
	display: none;
	font-weight: bold;
	text-align: center;
	border: 2px dashed #ababab;
	border-radius: 7px;
	cursor: default;
	float:left;
	width: calc(100% - 16px);
}

#filedrag:hover
{
	color: #e64668;
	border-style: solid;
	box-shadow: inset 0 3px 4px #888;
}


pre
{
	width: 95%;
	height: 8em;
	font-family: monospace;
	font-size: 0.9em;
	padding: 1px 2px;
	margin: 0 0 1em auto;
	border: 1px inset #666;
	background-color: #eee;
	overflow: auto;
}

#messages
{
	float:left;
	max-height:64px;
	position: absolute;
}
#messages img{
	max-height: 64px;
	width:auto;
}
#progress
{
	margin-top: 10px;
	display:none;
}
#progress p
{
	display: block;
	width: calc(100% - 12px);
	padding: 2px 5px;
	border: 1px inset #aaa;
	color:#aaa;
	background: #eee;
	margin:0;

}

#progress p.success
{
	background: #99FF66 none 0 0 no-repeat;
}

#progress p.failed
{
	background: #c00 none 0 0 no-repeat;
}
#pics{
	padding-top: 10px;
}
</style>
</head>
<body>

<form id="upload" action="upimg.php?parentVar=dL" method="POST" enctype="multipart/form-data">

<fieldset>
<h3>Skip the Form</h3>
<h6>Upload a picture of your driver's license instead:</h6>

<input type="hidden" id="MAX_FILE_SIZE" name="MAX_FILE_SIZE" value="3000000000" />

<div>
	<input type="file" id="fileselect" name="fileselect[]" multiple="multiple" />
	<div id="progress"></div>
	<div id="pics">
		<div id="messages"></div>
	</div>
</div>
<div id="submitbutton">
	<button type="submit">Upload Files</button>
</div>

<div id="filedrag">or drop image files here</div>

</fieldset>

</form>




<p><br><strong>Note:</strong> a scanned copy of your driver's license or california ID is required for our records. 
Upload a photo now, and avoid the need to have your ID scanned on your first purchase.</p>

<script>
/*
filedrag.js - HTML5 File Drag & Drop demonstration
Featured on SitePoint.com
Developed by Craig Buckler (@craigbuckler) of OptimalWorks.net
*/
(function() {

	// getElementById
	function $id(id) {
		return document.getElementById(id);
	}


	// output information
	function Output(msg) {
		var m = $id("messages");
		m.innerHTML = msg;//changed this
	}


	// file drag hover
	function FileDragHover(e) {
		e.stopPropagation();
		e.preventDefault();
		e.target.className = (e.type == "dragover" ? "hover" : "");
	}


	// file selection
	function FileSelectHandler(e) {

		// cancel event and hover styling
		FileDragHover(e);

		// fetch FileList object
		var files = e.target.files || e.dataTransfer.files;

		// process all File objects
		for (var i = 0, f; f = files[i]; i++) {
			ParseFile(f);
			UploadFile(f);
		}

	}


	// output file information
	function ParseFile(file) {

		Output(
			""
		);

		// display an image
		if (file.type.indexOf("image") == 0) {
			var reader = new FileReader();
			reader.onload = function(e) {
				Output(
					'<img src="' + e.target.result + '" style="height:80px;width:auto;"/></p>'
				);
				// var imgTarget = $id('messages');
				// imgTarget.style.width = '90px';
				// imgTarget.style.backgroundImage = 'url('+e.target.result+')';

				//get the width of #mesages, change the width of #filedrag
				var m = $id('messages');
				var mw = m.offsetWidth + 10;
				var mx = m.offsetWidth + 16;
				$id('filedrag').style.marginLeft = mw+'px';
				$id('filedrag').style.width = 'calc(100% - '+mx+'px)';
			}
			reader.readAsDataURL(file);
		}

		// display text
		if (file.type.indexOf("text") == 0) {
			var reader = new FileReader();
			reader.onload = function(e) {
				Output(
					"<p><strong>" + file.name + ":</strong></p><pre>" +
					e.target.result.replace(/</g, "&lt;").replace(/>/g, "&gt;") +
					"</pre>"
				);
			}
			reader.readAsText(file);
		}

	}


	// upload JPEG files
	function UploadFile(file) {
		// parent.dl = file.name; //i added this to update global var

		var xhr = new XMLHttpRequest();
		var correct_ftype = (file.type == "image/jpeg" || 
							 file.type == "image/jpg"  ||
							 file.type == "image/png"  ||
							 file.type == "image/gif");
		if (xhr.upload && correct_ftype && file.size <= $id("MAX_FILE_SIZE").value) {

			// create progress bar
			var o = $id("progress");
			o.style.display = 'block';
			o.innerHTML = "";
			var progress = o.appendChild(document.createElement("p"));
			progress.appendChild(document.createTextNode("upload " + file.name));


			// progress bar
			xhr.upload.addEventListener("progress", function(e) {
				var pc = parseInt(100 - (e.loaded / e.total * 100));
				progress.style.backgroundPosition = pc + "% 0";
			}, false);

			// file received/failed
			xhr.onreadystatechange = function(e) {
				if (xhr.readyState == 4) {
					progress.className = (xhr.status == 200 ? "success" : "failure");
				}
			};
			//generate random number to store the picture
			var randomnumber = Math.floor(Math.random()*1000000);
			var ext = file.name.split(".");
			//set the parent variable

			// start upload
			xhr.open("POST", $id("upload").action, true);
			xhr.setRequestHeader("X-file-name", file.name+"."+randomnumber);
			xhr.send(file);
		}

	}


	// initialize
	function Init() {

		var fileselect = $id("fileselect"),
			filedrag = $id("filedrag"),
			submitbutton = $id("submitbutton");

		// file select
		fileselect.addEventListener("change", FileSelectHandler, false);

		// is XHR2 available?
		var xhr = new XMLHttpRequest();
		if (xhr.upload) {

			// file drop
			filedrag.addEventListener("dragover", FileDragHover, false);
			filedrag.addEventListener("dragleave", FileDragHover, false);
			filedrag.addEventListener("drop", FileSelectHandler, false);
			filedrag.style.display = "block";

			// remove submit button
			submitbutton.style.display = "none";
		}

	}

	// call initialization file
	if (window.File && window.FileList && window.FileReader) {
		Init();
	}


})();
</script>
</body>
</html>