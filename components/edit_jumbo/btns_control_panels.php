<!-- btns options control panels -->
<div id="btnsProps">
    
    <hr>
    
    <!-- title -->
    <div class="opts-title" style="display:none;">
        <div class="dash-box" style="outline: 0px;border-radius: 6px;background-color: #eee;border: 1px solid;padding: 2px 4px 0px;max-height:0px;margin-top:-4px;">
            <span class="glyphicon glyphicon-link" aria-hidden="true"></span>
        </div>
        <h5><b>Button options:</b></h5>
    </div>

    <!-- control panels -->
    <div id="btnsCpanels">
    	
    	<!-- padding -->
    	<div class="popover top control-panel" style="display:block;">
            <div class="popover-title"> 
                <button type="button" class="close" data-prop="0" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="dash-box" style="outline: 0px;margin-top:-3px;border-radius: 6px;background-color: #eee;border: 1px solid;padding: 2px 4px 0px;">
                    <span class="glyphicon glyphicon-link" aria-hidden="true"></span>
                </div>
                <div><b>Button</b></div>
                <div class="glyphicon glyphicon-chevron-right"></div>
                <div class="icon-enlarge" style="font-size:18px;margin-right:5px;"></div>
                <div><b>Padding</b></div>
            </div>
            <div class="popover-content">
                <!-- background image blur -->
                <div class="half-slider" style="padding-left:10px;float:right;">
                	<label for="bg-opacity">
                        <span class="glyphicon glyphicon-resize-horizontal" style="margin-right:6px;" aria-hidden="true"></span>
                        left/right
                    </label>
                    <div>
                    	<span style="float:right;margin-left:3px;">px</span>
                        <input type="text" class="form-control" maxlength="2" value="12">
                    </div>
                    <input type="range" class="range-slider" min="0" max="25" step="1" value="12">
                </div>
                <!-- background image opacity -->
                <div class="half-slider" style="border-right: 1px solid #ccc; padding-right: 10px;">
                    <label>
                        <span class="glyphicon glyphicon-resize-vertical" style="margin-right:1px;"></span>
                        top/bottom
                    </label>
                    <div>
                    	<span style="float:right;margin-left:3px;">px</span>
                    	<input type="text" class="form-control" maxlength="2" value="10">
                    </div>
                    <input type="range" class="range-slider" min="0" max="25" step="1" value="10">
                </div>
            </div>
            <div class="arrow" style="left:20px"></div>
        </div><!-- /padding -->

    </div>

    <!-- toolbar -->
    <div class="toolbar" id="btnsToolbar">
	    <div class="btn-group opts-toolbar" style="margin-bottom:10px;" role="group" aria-label="edit button toolbar">
	    	<!-- padding -->
	    	<button type="button" class="btn btn-default" aria-label="button padding">
	    		<span class="icon-enlarge" aria-hidden="true"></span>
	    	</button>
	    	<!-- text color -->
	    	<button type="button" class="btn btn-default" aria-label="button text color">
	    		<span class="glyphicon glyphicon-text-color" aria-hidden="true"></span>
	    	</button>
	    	<!-- button background -->
	    	<button type="button" class="btn btn-default" aria-label="button background">
	    		<span class="glyphicon glyphicon-text-background" aria-hidden="true"></span>
	    	</button>
	    </div>
	    <br>
	    <div class="btn-group opts-toolbar" role="group" aria-label="edit button toolbar">
	    	<!-- border -->
	    	<button type="button" class="btn btn-default" aria-label="button border">
	    		<span class="glyphicon glyphicon-unchecked" aria-hidden="true"></span>
	    	</button>
	    	<!-- hyperlink -->
	    	<button type="button" class="btn btn-default" aria-label="button link">
	    		<span class="glyphicon glyphicon-link" aria-hidden="true"></span>
	    	</button>
	    	<!-- move to front -->
	    	<button type="button" class="btn btn-default" aria-label="move to front">
	    		<span class="icon-stack" aria-hidden="true"></span>
	    	</button>
	    </div>
	    <!-- delete button -->
	    <div class="btn-group opts-toolbar" style="float:right;" aria-label="delete button">
	    	<button type="button" class="btn btn-default btn-danger" aria-label="delete button">
	    		<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
	    	</button>
	    </div>
	</div><!-- /toolbar -->

</div>