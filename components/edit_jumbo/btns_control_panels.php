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
    <div id="btnsCpanels" style="position:relative;z-index:1;">

        <!-- text size -->
        <div class="popover top control-panel" style="display:block;max-width:250px;">
            <div class="popover-title"> 
                <button type="button" class="close" data-prop="1" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="dash-box" style="outline: 0px;margin-top:-3px;border-radius: 6px;background-color: #eee;border: 1px solid;padding: 2px 4px 0px;">
                    <span class="glyphicon glyphicon-link" aria-hidden="true"></span>
                </div>
                <div><b>Button</b></div>
                <div class="glyphicon glyphicon-chevron-right"></div>
                <div class="glyphicon glyphicon-text-size" style="margin-right:5px;margin-top:1px;"></div>
                <div><b>Font Size</b></div>
            </div>
            <div class="popover-content" style="text-align:center;">
                <div class="input-group" style="max-width:100px;position:relative;left:50%;margin-left:-50px;">
                    <input type="text" class="form-control" value="12px" aria-label="font size">
                    <div class="input-group-btn">
                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret" style="-webkit-transform: rotate(180deg);-moz-transform: rotate(180deg);-o-transform: rotate(180deg);-ms-transform: rotate(180deg);transform: rotate(180deg);"></span></button>
                        <ul class="dropdown-menu dropdown-menu-right">
                            <li><a href="#">8px</a></li>
                            <li><a href="#">9px</a></li>
                            <li><a href="#">10px</a></li>
                            <li><a href="#">11px</a></li>
                            <li><a href="#">12px</a></li>
                            <li><a href="#">14px</a></li>
                            <li><a href="#">16px</a></li>
                            <li><a href="#">18px</a></li>
                            <li><a href="#">20px</a></li>
                            <li><a href="#">22px</a></li>
                            <li><a href="#">24px</a></li>
                            <li><a href="#">26px</a></li>
                            <li><a href="#">28px</a></li>
                            <li><a href="#">36px</a></li>
                            <li><a href="#">48px</a></li>
                            <li><a href="#">72px</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="#">custom</a></li>
                        </ul>
                    </div><!-- /btn-group -->
                </div><!-- /input-group -->
            </div>
            <div class="arrow" style="left:20px"></div>
        </div><!-- /text size -->

        <!-- text color -->
        <div class="popover top control-panel">
            <div class="popover-title"> 
                <button type="button" class="close" data-prop="1" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="dash-box" style="outline: 0px;margin-top:-3px;border-radius: 6px;background-color: #eee;border: 1px solid;padding: 2px 4px 0px;">
                    <span class="glyphicon glyphicon-link" aria-hidden="true"></span>
                </div>
                <div><b>Button</b></div>
                <div class="glyphicon glyphicon-chevron-right"></div>
                <div class="glyphicon glyphicon-text-color" style="font-size:17px;margin-right:5px;margin-top:1px;"></div>
                <div><b>Text Color</b></div>
            </div>
            <div class="popover-content">

                <div style="width:135px;float:right;">
            
                    <!-- hex table -->
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>hex</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- fill -->
                            <tr>
                                <td>
                                    <button type="button" 
                                            class="btn" 
                                            style='background-color: #FFF; color: #444; padding: 7px 12px 4px;'
                                            aria-label="edit jumbotron background color, use color wheel to select colors">
                                        <span class="glyphicon glyphicon-text-color" style="font-size:17px;"></span>
                                    </button>
                                </td>
                                <td>
                                    <input type="text" 
                                           value='<?= $jumbo["bg_color"]; ?>' 
                                           class="form-control" 
                                           maxlength="7"
                                           style="text-transform:uppercase" 
                                           aria-label="background color hexidecimal color value">
                                </td>
                            </tr>
                        </tbody>
                    </table><!-- /hex table -->

                    <!-- HTML5 color picker -->
                    <div style="text-align:center;margin-top:14px;">
                        <label for="color-picker">more colors:</label>
                        <input type="color" 
                               value='<?= $jumbo["bg_color"]; ?>'
                               aria-label="select from complete color wheel">
                    </div><!-- /full color wheel -->

                </div>

                <!-- color wheel -->
                <div class="color-wheel">
                    <!-- 3 -->
                    <div>
                        <button type="button" class="btn" data-hex="#FF00FF" aria-label="Red Magenta #FF00FF"></button>
                        <button type="button" class="btn" data-hex="#FF0000" aria-label="Red #FF0000"></button>
                        <button type="button" class="btn" data-hex="#FF7F00" aria-label="Orange #FF7F00"></button>
                    </div>
                    <!-- 4 -->
                    <div>
                        <button type="button" class="btn" data-hex="#FF00FF" aria-label="Magenta #FF00FF"></button>
                        <button type="button" class="btn" data-hex="#FF99CC" aria-label="Lilac #FF99CC"></button>
                        <button type="button" class="btn" data-hex="#FFCC99" aria-label="Apricot #FFCC99"></button>
                        <button type="button" class="btn" data-hex="#FFFF00" aria-label="Yellow #FFFF00"></button>
                    </div>
                    <!-- 5 -->
                    <div>
                        <button type="button" class="btn" data-hex="#7F00FF" aria-label="Blue Magenta #7F00FF"></button>
                        <button type="button" class="btn" data-hex="#CC99FF" aria-label="Lavendar #CC99FF"></button>
                        <button type="button" class="btn" data-hex="#FFFFFF" aria-label="White #FFFFFF"></button>
                        <button type="button" class="btn" data-hex="#CCFF99" aria-label="Celadon #CCFF99"></button>
                        <button type="button" class="btn" data-hex="#7FFF00" aria-label="Green Yellow #7FFF00"></button>
                    </div>
                    <!-- 4 -->
                    <div>
                        <button type="button" class="btn" data-hex="#0000FF" aria-label="Blue #0000FF"></button>
                        <button type="button" class="btn" data-hex="#99CCFF" aria-label="Cornflower Blue #99CCFF"></button>
                        <button type="button" class="btn" data-hex="#99FFCC" aria-label="Sea Foam Green #99FFCC"></button>
                        <button type="button" class="btn" data-hex="#00FF00" aria-label="Green #00FF00"></button>
                    </div>
                    <!-- 3 -->
                    <div>
                        <button type="button" class="btn" data-hex="#007FFF" aria-label="Blue Cyan #007FFF"></button>
                        <button type="button" class="btn" data-hex="#00FFFF" aria-label="Cyan #00FFFF"></button>
                        <button type="button" class="btn" data-hex="#00FF7F" aria-label="Green Cyan #00FF7F"></button>
                    </div>
                </div><!-- /hexigon color wheel -->

                <hr>

                <!-- opacity -->
                <div class="color-o">
                	<div class="glyphicon glyphicon-adjust"></div>
                	<label>opacity</label>
                	<input type="text" class="form-control" value="1">
                	<input type="range" class="range-slider" min="0" max="1" step="0.01" value="1">
                </div>

            </div>
            <div class="arrow" style="left:63px"></div>
        </div><!-- /text color -->

        <!-- background -->
        <div class="popover top control-panel">
            <div class="popover-title"> 
                <button type="button" class="close" data-prop="1" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="dash-box" style="outline: 0px;margin-top:-3px;border-radius: 6px;background-color: #eee;border: 1px solid;padding: 2px 4px 0px;">
                    <span class="glyphicon glyphicon-link" aria-hidden="true"></span>
                </div>
                <div><b>Button</b></div>
                <div class="glyphicon glyphicon-chevron-right"></div>
                <div class="glyphicon glyphicon-text-background" style="font-size:17px;margin-right:5px;margin-top:1px;"></div>
                <div><b>Background</b></div>
            </div>
            <div class="popover-content">

                <div style="width:135px;float:right;">
            
                    <!-- hex table -->
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>hex</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- fill -->
                            <tr>
                                <td>
                                    <button type="button" 
                                            class="btn" 
                                            style='background-color: #FFF; color: #444; padding: 7px 12px 4px;'
                                            aria-label="edit button background color, use color wheel to select colors">
                                        <span class="glyphicon glyphicon-text-background" style="font-size:17px;"></span>
                                    </button>
                                </td>
                                <td>
                                    <input type="text" 
                                           value='<?= $jumbo["bg_color"]; ?>' 
                                           class="form-control" 
                                           maxlength="7"
                                           style="text-transform:uppercase" 
                                           aria-label="background color hexidecimal color value">
                                </td>
                            </tr>
                        </tbody>
                    </table><!-- /hex table -->

                    <!-- HTML5 color picker -->
                    <div style="text-align:center;margin-top:14px;">
                        <label for="color-picker">more colors:</label>
                        <input type="color" 
                               value='<?= $jumbo["bg_color"]; ?>'
                               aria-label="select from complete color wheel">
                    </div><!-- /full color wheel -->

                </div>

                <!-- color wheel -->
                <div class="color-wheel">
                    <!-- 3 -->
                    <div>
                        <button type="button" class="btn" data-hex="#FF00FF" aria-label="Red Magenta #FF00FF"></button>
                        <button type="button" class="btn" data-hex="#FF0000" aria-label="Red #FF0000"></button>
                        <button type="button" class="btn" data-hex="#FF7F00" aria-label="Orange #FF7F00"></button>
                    </div>
                    <!-- 4 -->
                    <div>
                        <button type="button" class="btn" data-hex="#FF00FF" aria-label="Magenta #FF00FF"></button>
                        <button type="button" class="btn" data-hex="#FF99CC" aria-label="Lilac #FF99CC"></button>
                        <button type="button" class="btn" data-hex="#FFCC99" aria-label="Apricot #FFCC99"></button>
                        <button type="button" class="btn" data-hex="#FFFF00" aria-label="Yellow #FFFF00"></button>
                    </div>
                    <!-- 5 -->
                    <div>
                        <button type="button" class="btn" data-hex="#7F00FF" aria-label="Blue Magenta #7F00FF"></button>
                        <button type="button" class="btn" data-hex="#CC99FF" aria-label="Lavendar #CC99FF"></button>
                        <button type="button" class="btn" data-hex="#FFFFFF" aria-label="White #FFFFFF"></button>
                        <button type="button" class="btn" data-hex="#CCFF99" aria-label="Celadon #CCFF99"></button>
                        <button type="button" class="btn" data-hex="#7FFF00" aria-label="Green Yellow #7FFF00"></button>
                    </div>
                    <!-- 4 -->
                    <div>
                        <button type="button" class="btn" data-hex="#0000FF" aria-label="Blue #0000FF"></button>
                        <button type="button" class="btn" data-hex="#99CCFF" aria-label="Cornflower Blue #99CCFF"></button>
                        <button type="button" class="btn" data-hex="#99FFCC" aria-label="Sea Foam Green #99FFCC"></button>
                        <button type="button" class="btn" data-hex="#00FF00" aria-label="Green #00FF00"></button>
                    </div>
                    <!-- 3 -->
                    <div>
                        <button type="button" class="btn" data-hex="#007FFF" aria-label="Blue Cyan #007FFF"></button>
                        <button type="button" class="btn" data-hex="#00FFFF" aria-label="Cyan #00FFFF"></button>
                        <button type="button" class="btn" data-hex="#00FF7F" aria-label="Green Cyan #00FF7F"></button>
                    </div>
                </div><!-- /hexigon color wheel -->

                <hr>

                <!-- opacity -->
                <div class="color-o">
                	<div class="glyphicon glyphicon-adjust"></div>
                	<label>opacity</label>
                	<input type="text" class="form-control" value="1">
                	<input type="range" class="range-slider" min="0" max="1" step="0.01" value="1">
                </div>

            </div>
            <div class="arrow" style="left:107px"></div>
        </div><!-- /background color -->

        <!-- border color -->
        <div class="popover top control-panel" style="margin-bottom:-43px;">
            <div class="popover-title"> 
                <button type="button" class="close" data-prop="1" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="dash-box" style="outline: 0px;margin-top:-3px;border-radius: 6px;background-color: #eee;border: 1px solid;padding: 2px 4px 0px;">
                    <span class="glyphicon glyphicon-link" aria-hidden="true"></span>
                </div>
                <div><b>Button</b></div>
                <div class="glyphicon glyphicon-chevron-right"></div>
                <div class="glyphicon glyphicon-unchecked" style="font-size:20px;margin-right:5px;margin-top:-3px;"></div>
                <div><b>Border</b></div>
            </div>
            <div class="popover-content">

                <div style="width:135px;float:right;">
            
                    <!-- hex table -->
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>hex</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- fill -->
                            <tr>
                                <td>
                                    <button type="button" 
                                            class="btn" 
                                            style='background-color: #FFF; color: #444; padding: 7px 12px 4px;'
                                            aria-label="edit button border color, use color wheel to select colors">
                                        <span class="glyphicon glyphicon-unchecked" style="font-size:17px;"></span>
                                    </button>
                                </td>
                                <td>
                                    <input type="text" 
                                           value='<?= $jumbo["bg_color"]; ?>' 
                                           class="form-control" 
                                           maxlength="7"
                                           style="text-transform:uppercase" 
                                           aria-label="background color hexidecimal color value">
                                </td>
                            </tr>
                        </tbody>
                    </table><!-- /hex table -->

                    <!-- HTML5 color picker -->
                    <div style="text-align:center;margin-top:14px;">
                        <label for="color-picker">more colors:</label>
                        <input type="color" 
                               value='<?= $jumbo["bg_color"]; ?>'
                               aria-label="select from complete color wheel">
                    </div><!-- /full color wheel -->

                </div>

                <!-- color wheel -->
                <div class="color-wheel">
                    <!-- 3 -->
                    <div>
                        <button type="button" class="btn" data-hex="#FF00FF" aria-label="Red Magenta #FF00FF"></button>
                        <button type="button" class="btn" data-hex="#FF0000" aria-label="Red #FF0000"></button>
                        <button type="button" class="btn" data-hex="#FF7F00" aria-label="Orange #FF7F00"></button>
                    </div>
                    <!-- 4 -->
                    <div>
                        <button type="button" class="btn" data-hex="#FF00FF" aria-label="Magenta #FF00FF"></button>
                        <button type="button" class="btn" data-hex="#FF99CC" aria-label="Lilac #FF99CC"></button>
                        <button type="button" class="btn" data-hex="#FFCC99" aria-label="Apricot #FFCC99"></button>
                        <button type="button" class="btn" data-hex="#FFFF00" aria-label="Yellow #FFFF00"></button>
                    </div>
                    <!-- 5 -->
                    <div>
                        <button type="button" class="btn" data-hex="#7F00FF" aria-label="Blue Magenta #7F00FF"></button>
                        <button type="button" class="btn" data-hex="#CC99FF" aria-label="Lavendar #CC99FF"></button>
                        <button type="button" class="btn" data-hex="#FFFFFF" aria-label="White #FFFFFF"></button>
                        <button type="button" class="btn" data-hex="#CCFF99" aria-label="Celadon #CCFF99"></button>
                        <button type="button" class="btn" data-hex="#7FFF00" aria-label="Green Yellow #7FFF00"></button>
                    </div>
                    <!-- 4 -->
                    <div>
                        <button type="button" class="btn" data-hex="#0000FF" aria-label="Blue #0000FF"></button>
                        <button type="button" class="btn" data-hex="#99CCFF" aria-label="Cornflower Blue #99CCFF"></button>
                        <button type="button" class="btn" data-hex="#99FFCC" aria-label="Sea Foam Green #99FFCC"></button>
                        <button type="button" class="btn" data-hex="#00FF00" aria-label="Green #00FF00"></button>
                    </div>
                    <!-- 3 -->
                    <div>
                        <button type="button" class="btn" data-hex="#007FFF" aria-label="Blue Cyan #007FFF"></button>
                        <button type="button" class="btn" data-hex="#00FFFF" aria-label="Cyan #00FFFF"></button>
                        <button type="button" class="btn" data-hex="#00FF7F" aria-label="Green Cyan #00FF7F"></button>
                    </div>
                </div><!-- /hexigon color wheel -->

                <hr>

                <!-- background image blur -->
                <div class="half-slider" style="padding-left:10px;float:right;">
                    <label>
                        <span class="glyphicon glyphicon-minus"></span>
                        thickness
                    </label>
                    <input type="text" class="form-control" value="1">
                    <input type="range" class="range-slider" min="0" max="10" step="1" value="1">
                </div>
                <!-- background image opacity -->
                <div class="half-slider" style="border-right: 1px solid #ccc; padding-right: 10px;">
                    <label for="bg-opacity">
                        <span class="glyphicon glyphicon-adjust" aria-hidden="true"></span>
                        opacity
                    </label>
                    <input type="text" class="form-control" value="1">
                    <input type="range" class="range-slider" min="0" max="1" step="0.01" value="1">
                </div>

            </div>
            <div class="arrow" style="left:20px"></div>
        </div><!-- /border color -->
    	
    	<!-- padding -->
    	<div class="popover top control-panel">
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

        <!-- URL -->
        <div class="popover top control-panel" style="margin-bottom:-43px;">
            <div class="popover-title"> 
                <button type="button" class="close" data-prop="0" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="dash-box" style="outline: 0px;margin-top:-3px;border-radius: 6px;background-color: #eee;border: 1px solid;padding: 2px 4px 0px;">
                    <span class="glyphicon glyphicon-link" aria-hidden="true"></span>
                </div>
                <div><b>Button</b></div>
                <div class="glyphicon glyphicon-chevron-right"></div>
                <div class="glyphicon glyphicon-link" style="font-size:18px;margin-right:5px;"></div>
                <div><b>Link</b></div>
            </div>
            <div class="popover-content">
            	<label style="margin-top:6px;">url</label>
            	<input type="text" class="form-control" style="width:calc(100% - 28px);float:right;" placeholder="http://">
            </div>
            <div class="arrow" style="left:63px"></div>
        </div><!-- /URL -->

    </div>

    <!-- toolbar -->
    <div class="toolbar" id="btnsToolbar">
	    <div class="btn-group opts-toolbar" style="margin-bottom:10px;" role="group" aria-label="edit button toolbar">
            <!-- text-size -->
            <button type="button" class="btn btn-default" aria-label="text-size">
                <span class="glyphicon glyphicon-text-size" aria-hidden="true"></span>
            </button>
	    	<!-- text color -->
	    	<button type="button" class="btn btn-default" aria-label="button text color">
	    		<span class="glyphicon glyphicon-text-color" aria-hidden="true"></span>
	    	</button>
	    	<!-- button background -->
	    	<button type="button" class="btn btn-default" aria-label="button background">
	    		<span class="glyphicon glyphicon-text-background" aria-hidden="true"></span>
	    	</button>
	    	<!-- border -->
	    	<button type="button" class="btn btn-default" aria-label="button border">
	    		<span class="glyphicon glyphicon-unchecked" aria-hidden="true"></span>
	    	</button>
	    </div>
	    <br>
	    <div class="btn-group opts-toolbar" role="group" aria-label="edit button toolbar">
	    	<!-- padding -->
	    	<button type="button" class="btn btn-default" aria-label="button padding">
	    		<span class="icon-enlarge" aria-hidden="true"></span>
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