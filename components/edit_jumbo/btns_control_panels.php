<!-- btns options control panels -->
<div id="btnsProps">
    
    <hr>
    
    <!-- title -->
    <div class="opts-title">
        <div class="dash-box" style="outline: 0px;border-radius: 6px;background-color: #eee;border: 1px solid;padding: 2px 4px;min-height:20px;margin-top:-4px;">
            <span class="glyphicon glyphicon-link" aria-hidden="true"></span>
        </div>
        <h5><b>Button options:</b></h5>
    </div>

    <!-- control panels -->
    <div id="btnsCpanels" style="position:relative;z-index:1;">

        <!-- text size -->
        <div class="popover top control-panel tier-2" style="max-width:250px;">
            <div class="popover-title"> 
                <button type="button" class="close" data-panel="0" aria-label="Close"><span aria-hidden="true">&times;</span></button>
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
        <div class="popover top control-panel tier-2">
            <div class="popover-title"> 
                <button type="button" class="close" data-panel="1" aria-label="Close"><span aria-hidden="true">&times;</span></button>
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
                               value='#444444'
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
            <div class="arrow" style="left:63px"></div>
        </div><!-- /text color -->

        <!-- text background -->
        <div class="popover top control-panel tier-2">
           <div class="popover-title"> 
                <button type="button" class="close" data-panel="2" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="dash-box" style="outline: 0px;margin-top:-3px;border-radius: 6px;background-color: #eee;border: 1px solid;padding: 2px 4px 0px;">
                    <span class="glyphicon glyphicon-link" aria-hidden="true"></span>
                </div>
                <div><b>Button</b></div>
                <div class="glyphicon glyphicon-chevron-right"></div>
                <div class="glyphicon glyphicon-text-background" style="font-size:17px;margin-right:5px;margin-top:1px;"></div>
                <div><b>Highlight</b></div>
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
                                            class="btn paint-btn" 
                                            style='background-color: #FFF; color: #444; padding: 7px 12px 4px;'
                                            aria-label="edit jumbotron background color, use color wheel to select colors">
                                        <span class="glyphicon glyphicon-text-background" style="font-size:17px;"></span>
                                    </button>
                                </td>
                                <td>
                                    <input type="text" 
                                           value='' 
                                           class="form-control" 
                                           style="text-transform:uppercase" 
                                           maxlength="7"
                                           data-com="backColor"
                                           data-i="1"
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
                               data-i="1" 
                               data-com="backColor" 
                               aria-label="select from complete color wheel">
                    </div><!-- /full color wheel -->

                    <!-- no color (transparent) textbox -->
                    <div style="margin-top:10px;">
                        <label style="margin-bottom:0px;margin-top:4px;"><span class="glyphicon glyphicon-ban-circle" style="color:#d9534f;"></span> transparent</label>
                        <input type="checkbox" class="form-control" data-i="1" checked>
                    </div>
                </div>

                <!-- color wheel -->
                <div class="color-wheel" style="height:122px;padding-top:12px;" data-i="1" data-com="backColor">
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
            <div class="arrow" style="left:107px"></div>
        </div><!-- /text color -->

        <!-- background color control panel -->
        <div class="popover top control-panel tier-2">
            <div class="popover-title"> 
                <button type="button" class="close" data-panel="3" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="dash-box" style="outline: 0px;margin-top:-3px;border-radius: 6px;background-color: #eee;border: 1px solid;padding: 2px 4px 0px;">
                    <span class="glyphicon glyphicon-link" aria-hidden="true"></span>
                </div>
                <div><b>Button</b></div>
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
                <div><b>Background</b></div>
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
                                                   data-com 
                                                   data-i="2"
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
                                       data-i="2"
                                       data-com 
                                       aria-label="select from complete color wheel">
                            </div><!-- /full color wheel -->

                            <!-- no color (transparent) textbox -->
                            <div style="margin-top:10px;">
                                <label style="margin-bottom:0px;margin-top:4px;"><span class="glyphicon glyphicon-ban-circle" style="color:#d9534f;"></span> transparent</label>
                                <input type="checkbox" class="form-control" data-i="2" checked>
                            </div>

                        </div>

                        <!-- color wheel -->
                        <div class="color-wheel" style="height:126px;padding-top:13px;" data-i="2" data-com>
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
            <div class="arrow" style="left:161px"></div>
        </div><!-- /backgroung color control panel -->

        <!-- border color -->
        <div class="popover top control-panel tier-2">
            <div class="popover-title"> 
                <button type="button" class="close" data-panel="4" aria-label="Close"><span aria-hidden="true">&times;</span></button>
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
                               value='#444444'
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
                    <div class="glyphicon glyphicon-minus"></div>
                    <label>thickness</label>
                    <input type="text" class="form-control" value="1">
                    <input type="range" class="range-slider" min="0" max="10" step="1" value="1">
                </div>

            </div>
            <div class="arrow" style="left:205px"></div>
        </div><!-- /border color -->

        <!-- element roundness -->
        <div class="popover top control-panel tier-2" style="max-width:264px;">
           <div class="popover-title"> 
                <button type="button" class="close" data-panel="5" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="dash-box" style="outline: 0px;margin-top:-3px;border-radius: 6px;background-color: #eee;border: 1px solid;padding: 2px 4px 0px;">
                    <span class="glyphicon glyphicon-link" aria-hidden="true"></span>
                </div>
                <div><b>Button</b></div>
                <div class="glyphicon glyphicon-chevron-right"></div>
                <div class="icon-radio-unchecked" style="font-size:17px;margin-right:5px;"></div>
                <div><b>Roundness</b></div>
            </div>
            <div class="popover-content roundness">
                <div></div>
                <div class="input-group">
                    <input type="text" class="form-control" maxlength="3" value="0">
                    <span class="input-group-addon">%</span>
                </div>
            </div>
            <div class="arrow" style="left:249px"></div>
        </div>

        <!-- URL -->
        <div class="popover top control-panel tier-3">
            <div class="popover-title"> 
                <button type="button" class="close" data-panel="6" aria-label="Close"><span aria-hidden="true">&times;</span></button>
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
    	
    	<!-- padding -->
    	<div class="popover top control-panel tier-3">
            <div class="popover-title"> 
                <button type="button" class="close" data-panel="7" aria-label="Close"><span aria-hidden="true">&times;</span></button>
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
                	<label>
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

        <!-- element visibility -->
        <div class="popover top control-panel" style="margin-bottom:-96px;max-width:264px;">
            <div class="popover-title"> 
                <button type="button" class="close" data-panel="8" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="dash-box" style="outline: 0px;margin-top:-3px;border-radius: 6px;background-color: #eee;border: 1px solid;padding: 2px 4px 0px;">
                    <span class="glyphicon glyphicon-link" aria-hidden="true"></span>
                </div>
                <div><b>Button</b></div>
                <div class="glyphicon glyphicon-chevron-right"></div>
                <div class="glyphicon glyphicon-eye-open" style="font-size:17px;margin-right:5px;"></div>
                <div><b>Visibility</b></div>
            </div>
            <div class="popover-content" style="padding-top:16px;padding-bottom:3px;">
                <form class="form-inline">
                    <!-- mobile -->
                    <label class="checkbox-inline">
                        <input type="checkbox" value="mobile" checked>
                        <span class="icon-mobile"></span>
                        <div>mobile</div>
                    </label>
                    <!-- tablet -->
                    <label class="checkbox-inline">
                        <input type="checkbox" value="tablet" checked>
                        <span class="icon-mobile2"></span>
                        <div>tablet</div>
                    </label>
                    <!-- desktop -->
                    <label class="checkbox-inline">
                        <input type="checkbox" value="desktop" checked>
                        <span class="icon-laptop"></span>
                        <div>desktop</div>
                    </label>
                </form>
            </div>
            <div class="arrow" style="left:107px"></div>
        </div><!-- /element visibility control panel -->

    </div>

    <!-- toolbar -->
    <div class="toolbar" id="btnsToolbar">
	    
        <!-- toolbar 1 -->
        <div class="btn-group opts-toolbar" style="margin-bottom:10px;" role="group" aria-label="font style">
            <!-- bold -->
            <button type="button" class="btn btn-default" data-panel data-excom="bold" onmousedown="event.preventDefault()" aria-label="bold">
                <span class="glyphicon glyphicon-bold" aria-hidden="true"></span>
            </button>
            <!-- italic -->
            <button type="button" class="btn btn-default" data-panel data-excom="italic" onmousedown="event.preventDefault()" aria-label="italic">
                <span class="glyphicon glyphicon-italic" aria-hidden="true"></span>
            </button>
            <!-- underline -->
            <button type="button" class="btn btn-default" data-panel data-excom="underline" onmousedown="event.preventDefault()" aria-label="underline">
                <span class="icon-underline" aria-hidden="true"></span>
            </button>
            <!-- strikethrough -->
            <button type="button" class="btn btn-default" data-panel data-excom="strikeThrough" onmousedown="event.preventDefault()" aria-label="strike through">
                <span class="icon-strikethrough" aria-hidden="true"></span>
            </button>
            <!-- subscript -->
            <button type="button" class="btn btn-default" data-panel data-excom="subscript" onmousedown="event.preventDefault()" aria-label="subscript">
                <span class="glyphicon glyphicon-subscript" aria-hidden="true"></span>
            </button>
            <!-- superscript -->
            <button type="button" class="btn btn-default" data-panel data-excom="superscript" onmousedown="event.preventDefault()" aria-label="superscript">
                <span class="glyphicon glyphicon-superscript" aria-hidden="true"></span>
            </button>
        </div><!-- /toolbar 1 -->

        <!-- toolbar 2 -->
        <div class="btn-group opts-toolbar" style="margin-bottom:10px;" role="group" aria-label="text style">
            <!-- text-size -->
            <button type="button" class="btn btn-default" data-panel="0" aria-label="text-size">
                <span class="glyphicon glyphicon-text-size" aria-hidden="true"></span>
            </button>
            <!-- text color -->
            <button type="button" class="btn btn-default" data-panel="1" aria-label="text-color">
                <span class="glyphicon glyphicon-text-color" aria-hidden="true"></span>
            </button>
            <!-- text background-->
            <button type="button" class="btn btn-default" data-panel="2" aria-label="text-background">
                <span class="glyphicon glyphicon-text-background" aria-hidden="true"></span>
            </button>
        </div>

        <!-- toolbar 3 -->
        <div class="btn-group opts-toolbar" style="margin-bottom:10px;margin-left:10px;" role="group" aria-label="button style">
            <!-- edit background color -->
            <div role="button" class="btn btn-default" data-panel="3" aria-label="edit background color">
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
            <!-- border style -->
            <button type="button" class="btn btn-default" data-panel="4" aria-label="border style">
                <span class="icon-checkbox-unchecked" aria-hidden="true"></span>
            </button>
            <!-- element roundness -->
            <button type="button" class="btn btn-default" data-panel="5" aria-label="element roundess">
                <span class="icon-radio-unchecked" aria-hidden="true"></span>
            </button>
        </div><!-- /toolbar 3 -->

        <!-- toolbar 4 -->
	    <div class="btn-group opts-toolbar" role="group" aria-label="edit button toolbar">
            <!-- hyperlink -->
            <button type="button" class="btn btn-default" data-panel="6" aria-label="button link">
                <span class="glyphicon glyphicon-link" aria-hidden="true"></span>
            </button>
	    	<!-- padding -->
	    	<button type="button" class="btn btn-default" data-panel="7" aria-label="button padding">
	    		<span class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
	    	</button>
	    	<!-- move to front -->
	    	<button type="button" class="btn btn-default" data-panel aria-label="move to front">
	    		<span class="icon-stack" aria-hidden="true"></span>
	    	</button>
            <!-- resize, reposition, rotate -->
            <button type="button" class="btn btn-default" data-panel aria-label="resize, reposition, rotate">
                <span class="glyphicon glyphicon-move" aria-hidden="true"></span>
            </button>
            <!-- visibility -->
            <button type="button" class="btn btn-default" data-panel="8" aria-label="layout visibility">
                <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
            </button>
	    </div><!-- /toolbar 4 -->

	    <!-- delete button -->
	    <div class="btn-group opts-toolbar" style="float:right;" aria-label="delete button">
	    	<button type="button" class="btn btn-default btn-danger" aria-label="delete button">
	    		<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
	    	</button>
	    </div>
	</div><!-- /toolbar -->

</div>