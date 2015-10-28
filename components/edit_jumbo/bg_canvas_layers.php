<!-- edit background canvas layers -->
 <div id="bg-canvas">
                        
    <!-- image upload layer -->
    <div class="j-canvas" style="text-align: center; font-size: 18px; padding-top: 80px;text-shadow: 0px 0px 4px #FFF;">

    	<!-- upload image the old fashioned way -->
        <div class="upload-oldfash" <?= ($jumbo["bg_img"]) ? "style='opacity:0.7'" : ""; ?>>
            <label for="bg-fisel">Files to upload:</label>
            <input type="file" 
                   id="bg-fisel" 
                   name="fileselect[]" 
                   multiple="multiple" />
        </div>

    	<!-- text -->
    	<div style="position:relative;font-size:12px;left:calc(50% - 18px);max-width:32px;text-shadow: 0px 0px 4px #FFF;">&#45; or &#45;</div>
    	Drag &amp; Drop
    </div>

    <!-- crop bg image layer -->
    <div class="j-canvas"></div>

    <!-- background color layer -->
    <div class="j-canvas"></div>

</div>



































