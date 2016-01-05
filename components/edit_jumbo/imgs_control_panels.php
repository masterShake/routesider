<!-- img options control panels -->
<div id="imgsProps">
    
    <hr>
    
    <!-- title -->
    <div class="opts-title">
        <div class="icon-images" style="float:left;font-size: 19px;margin-top: -6px;margin-right: 3px;"></div>
        <h5><b>Image overlay options:</b></h5>
    </div>

    <!-- control panels -->
    <div id="imgsCpanels">
        
        <!-- bg color, blur, opacity -->
        <div class="popover top control-panel" style="max-width:660px;">
            <div class="popover-title"> 
                <button type="button" class="close" data-panel="0" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="icon-images" style="font-size:18px;margin-right:5px;" aria-hidden="true"></div>
                <div><b>Image Overlay</b></div>
                <div class="glyphicon glyphicon-chevron-right"></div>
                <div class="colorwheel-icon" style="margin-top:1.5px;margin-right:5px;transform:scale(1.25,1.25);">
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                    </div>
                </div><!-- /colorwheel-icon -->
                <div><b>Style</b></div>
            </div>

            <div class="popover-content container" style="max-width:100%;">
                <div class="row">

                    <div class="col-sm-6 left-panel">
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
                                                    class="btn paint-btn" 
                                                    style='background-color: #FFFFFF;'>
                                                <span class="glyphicon glyphicon-tint"></span>
                                            </button>
                                        </td>
                                        <td>
                                            <input type="text" 
                                                   value='' 
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
                                <label>more colors:</label>
                                <input type="color" 
                                       value='#FFFFFF'
                                       aria-label="select from complete color wheel">
                            </div><!-- /full color wheel -->

                            <!-- no color (transparent) textbox -->
                            <div style="margin-top:10px;">
                                <label style="margin-bottom:0px;margin-top:4px;"><span class="glyphicon glyphicon-ban-circle" style="color:#d9534f;"></span> transparent</label>
                                <input type="checkbox" class="form-control" checked>
                            </div>

                        </div>

                        <!-- color wheel -->
                        <div class="color-wheel" style="height:126px;padding-top:13px;">
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
                    </div><!-- /col-md-6 -->

                    <hr class="visible-xs" style="margin-top:13px;margin-bottom:15px;">

                    <div class="col-sm-6">
                        <!-- textbox blur -->
                        <div class="half-slider" style="padding-left:10px;float:right;">
                            <label>
                                <span class="glyphicon glyphicon-eye-open"></span>
                                blur
                            </label>
                            <input type="text" class="form-control" maxlength="2" value='0'>
                            <input type="range" class="range-slider" min="0" max="10" step="1" value='0'>
                        </div>
                        <!-- background image opacity -->
                        <div class="half-slider" style="border-right: 1px solid #ccc; padding-right: 10px;">
                            <label>
                                <span class="glyphicon glyphicon-adjust" aria-hidden="true"></span>
                                opacity
                            </label>
                            <input type="text" class="form-control" maxlength="4" value='1'>
                            <input type="range" class="range-slider" min="0" max="1" step="0.01" value="1">
                        </div>
                    </div><!-- /col-md-6 -->
                </div><!-- /row -->
            </div><!-- /content container -->
            <div class="arrow" style="left:20px"></div>
        </div>

        <!-- visibility -->
        <div class="popover top control-panel" style="max-width:292px;">
            <div class="popover-title"> 
                <button type="button" class="close" data-panel="1" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="icon-images" style="font-size:18px;margin-right:5px;" aria-hidden="true"></div>
                <div><b>Image Overlay</b></div>
                <div class="glyphicon glyphicon-chevron-right"></div>
                <div class="glyphicon glyphicon-eye-open" style="font-size:17px;margin-right:5px;"></div>
                <div><b>Visibility</b></div>
            </div>
            <div class="popover-content" style="padding-top:16px;padding-bottom:3px;">
                <form class="form-inline">
                    <!-- mobile -->
                    <label class="checkbox-inline">
                        <input type="checkbox" value="mobile" checked>
                        <span class="icon-mobile"></span><br>
                        <div>mobile</div>
                    </label>
                    <!-- tablet -->
                    <label class="checkbox-inline">
                        <input type="checkbox" value="tablet" checked>
                        <span class="icon-mobile2"></span><br>
                        <div>tablet</div>
                    </label>
                    <!-- desktop -->
                    <label class="checkbox-inline">
                        <input type="checkbox" value="desktop" checked>
                        <span class="icon-laptop"></span><br>
                        <div>desktop</div>
                    </label>
                </form>
            </div>
            <div class="arrow" style="left:152px"></div>
        </div><!-- /visibility -->

    </div><!-- /control panels -->

    <!-- toolbar -->
    <div class="btn-toolbar" id="imgsToolbar" role="toolbar">
        
        <!-- group 1 -->
        <div class="btn-group opts-toolbar" role="group" aria-label="edit image overlay">
            <!-- background color, opacity, blur -->
            <div type="button" class="btn btn-default" data-panel="0" aria-label="background color, blur, opacity">
                <!-- color wheel icon -->
                <div class="colorwheel-icon">
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                    </div>
                </div><!-- /colorwheel-icon -->
            </div>
            <!-- resize, reposition, rotate -->
            <button type="button" class="btn btn-default inactive" data-panel aria-label="resize, reposition, rotate">
                <span class="icon-enlarge" aria-hidden="true"></span>
            </button>
        	<!-- move to front -->
        	<button type="button" class="btn btn-default inactive" data-panel aria-label="move to front">
        		<span class="icon-stack" aria-hidden="true"></span>
        	</button>
            <!-- visibility -->
            <button type="button" class="btn btn-default inactive" data-panel="1" aria-label="move to front">
                <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
            </button>
        </div>

        <!-- group 2 -->
        <div class="btn-group opts-toolbar" style="float:right">
            <!-- delete -->
            <button type="button" class="btn btn-default btn-danger" aria-label="delete image">
                <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
            </button>
        </div>

    </div><!-- /toolbar -->

</div>