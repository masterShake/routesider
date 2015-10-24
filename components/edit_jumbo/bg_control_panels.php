<!-- background options control panels -->
<div id="bg-props">
    
    <hr>
    
    <!-- title -->
    <div class="opts-title">
        <div class="dash-box" aria-hidden="true">
            <span class="icon-image" aria-hidden="true"></span>
        </div>
        <h5><b>Background options:</b></h5>
    </div>

    <!-- control panels -->
    <div id="bg-cpanels">

        <!-- background image control panel -->
        <div class="popover top control-panel">
            <div class="popover-title"> 
                <button type="button" class="close" data-prop="0" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="dash-box" style="padding: 0px 3px 1px;max-height: 18px;" aria-hidden="true">
                    <span class="icon-image" aria-hidden="true"></span>
                </div>
                <div><b>Background</b></div>
                <div class="glyphicon glyphicon-chevron-right"></div>
                <div class="icon-image" style="font-size:18px;margin-right:5px;"></div>
                <div><b>Image</b></div>
            </div>
            <div class="popover-content">
                <!-- background image blur -->
                <div class="half-slider" style="padding-left:10px;float:right;">
                    <label for="bg-blur">
                        <span class="glyphicon glyphicon-eye-open"></span>
                        blur
                    </label>
                    <input type="text" class="form-control"  id="bg-blur" value="0">
                    <input type="range" class="range-slider" min="0" max="1" step="0.01" value="0">
                </div>
                <!-- background image opacity -->
                <div class="half-slider" style="border-right: 1px solid #ccc; padding-right: 10px;">
                    <label for="bg-opacity">
                        <span class="glyphicon glyphicon-adjust" aria-hidden="true"></span>
                        opacity
                    </label>
                    <div>
                        <input type="text" class="form-control"  id="bg-opacity" value="1">
                        <input type="range" class="range-slider" min="0" max="1" step="0.01" value="1">
                    </div>
                </div>
            </div>
            <div class="arrow" style="left:29px"></div>
        </div><!-- /background image control panel -->

        <!-- crop background image control panel -->
        <div class="popover top control-panel" style="max-width:250px;">
            <div class="popover-title"> 
                <button type="button" class="close" data-prop="1" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="dash-box" style="padding: 0px 3px 1px;max-height: 18px;" aria-hidden="true">
                    <span class="icon-image" aria-hidden="true"></span>
                </div>
                <div><b>Background</b></div>
                <div class="glyphicon glyphicon-chevron-right"></div>
                <div class="glyphicon glyphicon-scissors" style="font-size:18px;margin-right:5px;"></div>
                <div><b>Crop</b></div>
            </div>
            <div class="popover-content" style="text-align:center;">
                <div class="btn btn-default btn-success" id="crop-btn">
                    <div>
                        <span class="glyphicon glyphicon-scissors"></span> Crop Image
                    </div>
                </div>
            </div>
            <div class="arrow" style="left:90px"></div>
        </div><!-- /crop background image control panel -->

        <!-- background color control panel -->
        <div class="popover top control-panel">


            <div class="popover-title"> 
                <button type="button" class="close" data-prop="2" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="dash-box" style="padding: 0px 3px 1px;max-height: 18px;" aria-hidden="true">
                    <span class="icon-image" aria-hidden="true"></span>
                </div>
                <div><b>Background</b></div>
                <div class="glyphicon glyphicon-chevron-right"></div>
                <div class="colorwheel-icon" style="margin-top:-1px;">
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
                <div><b>Color</b></div>
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
                                            style="background-color: #FFF; color: #444;"
                                            aria-label="edit jumbotron background color, use color wheel to select colors">
                                        <span class="glyphicon glyphicon-tint"></span>
                                    </button>
                                </td>
                                <td>
                                    <input type="text" 
                                           value="#FFFFFF"
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
                               value="#5CB85C"
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

            </div>
            <div class="arrow" style="left:152px"></div>
        </div><!-- /backgroung color control panel -->

    </div><!-- /control panels -->

    <!-- toolbar -->
    <div class="btn-group btn-group-lg opts-toolbar tb" id="bg-toolbar" role="group" aria-label="edit background toolbar">
        
        <!-- edit background image -->
        <button type="button" class="btn btn-default" data-prop="0" aria-label="edit background image">
            <span class="icon-image"></span>
        </button><!-- /edit background image -->
        
        <!-- crop background image -->
        <button type="button" class="btn btn-default" data-prop="1" aria-label="crop image">
            <span class="glyphicon glyphicon-scissors" aria-hidden="true"></span>
        </button>
        
        <!-- edit background color -->
        <div type="button" class="btn btn-default" data-prop="2" aria-label="edit background color">
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
    </div><!-- /toolbar -->

</div><!-- /background options -->