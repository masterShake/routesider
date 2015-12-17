<!-- textbox options control panels -->
<div id="textProps">
    
    <hr>
    
    <!-- title -->
    <div class="opts-title">
        <div class="dash-box" style="padding:1px 2px;" aria-hidden="true">Aa</div>
        <h5><b>Textbox options:</b></h5>
    </div>

    <!-- control panels -->
    <div id="textCpanels" style="position:relative;z-index:1;">

        <!-- text size -->
        <div class="popover top control-panel" style="margin-bottom:-43px;max-width:250px;">
            <div class="popover-title"> 
                <button type="button" class="close" data-panel="0" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="dash-box" style="padding:1px 2px;font-size:11px;" aria-hidden="true">Aa</div>
                <div><b>Textbox</b></div>
                <div class="glyphicon glyphicon-chevron-right"></div>
                <div class="glyphicon glyphicon-text-size" style="margin-right:5px;margin-top:1px;"></div>
                <div><b>Font Size</b></div>
            </div>
            <div class="popover-content" style="text-align:center;">
                <div class="input-group" style="max-width:70px;position:relative;left:50%;margin-left:-50px;">
                    <input type="text" class="form-control" value="2" maxlength="1" aria-label="font size">
                    <div class="input-group-btn dropup">
                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span></button>
                        <ul class="dropdown-menu">
                            <li><a href="#" data-fs="1">1</a></li>
                            <li><a href="#" data-fs="2">2</a></li>
                            <li><a href="#" data-fs="3">3</a></li>
                            <li><a href="#" data-fs="4">4</a></li>
                            <li><a href="#" data-fs="5">5</a></li>
                            <li><a href="#" data-fs="6">6</a></li>
                            <li><a href="#" data-fs="7">7</a></li>
                        </ul>
                    </div><!-- /btn-group -->
                </div><!-- /input-group -->
            </div>
            <div class="arrow" style="left:20px"></div>
        </div><!-- /text size -->

        <!-- text color -->
        <div class="popover top control-panel" style="margin-bottom:-43px;">
            <div class="popover-title"> 
                <button type="button" class="close" data-panel="1" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="dash-box" style="padding:1px 2px;font-size:11px;" aria-hidden="true">Aa</div>
                <div><b>Textbox</b></div>
                <div class="glyphicon glyphicon-chevron-right"></div>
                <div class="glyphicon glyphicon-text-color" style="font-size:17px;margin-right:5px;margin-top:1px;"></div>
                <div><b>Font Color</b></div>
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
                                        <span class="glyphicon glyphicon-text-color" style="font-size:17px;"></span>
                                    </button>
                                </td>
                                <td>
                                    <input type="text" 
                                           value='#000000' 
                                           class="form-control" 
                                           style="text-transform:uppercase" 
                                           maxlength="7"
                                           data-com="foreColor"
                                           data-i="0"
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
        <div class="popover top control-panel" style="margin-bottom:-43px;">
            <div class="popover-title"> 
                <button type="button" class="close" data-panel="2" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="dash-box" style="padding:1px 2px;font-size:11px;" aria-hidden="true">Aa</div>
                <div><b>Textbox</b></div>
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
            <div class="arrow" style="left:107px"></div>
        </div><!-- /text color -->

        <!-- background color control panel -->
        <div class="popover top control-panel" style="max-width:660px;">
            <div class="popover-title"> 
                
                <button type="button" class="close" data-panel="2" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="dash-box" style="padding:1px 2px;font-size:11px;" aria-hidden="true">Aa</div>
                <div><b>Textbox</b></div>
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
                                                    style='background-color: <?= $jumbo["color"]; ?>; color: #444;'>
                                                <span class="glyphicon glyphicon-tint"></span>
                                            </button>
                                        </td>
                                        <td>
                                            <input type="text" 
                                                   value='<?= $jumbo["color"]; ?>' 
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
                                       value='<?= $jumbo["color"]; ?>'
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
                    </div><!-- /col-md-6 -->

                    <hr class="visible-xs" style="margin-top:13px;margin-bottom:15px;">

                    <div class="col-sm-6">
                        <!-- background image blur -->
                        <div class="half-slider" style="padding-left:10px;float:right;">
                            <label>
                                <span class="glyphicon glyphicon-eye-open"></span>
                                blur
                            </label>
                            <input type="text" class="form-control" maxlength="2" value='<?= ($jumbo["blur"]) ?>'>
                            <input type="range" class="range-slider" min="0" max="10" step="1" value='<?= ($jumbo["blur"]) ?>'>
                        </div>
                        <!-- background image opacity -->
                        <div class="half-slider" style="border-right: 1px solid #ccc; padding-right: 10px;">
                            <label>
                                <span class="glyphicon glyphicon-adjust" aria-hidden="true"></span>
                                opacity
                            </label>
                            <input type="text" class="form-control" maxlength="4" value='<?= ($jumbo["opacity"]) ?>'>
                            <input type="range" class="range-slider" min="0" max="1" step="0.01" value="<?= ($jumbo["opacity"]) ?>">
                        </div>
                    </div><!-- /col-md-6 -->
                </div><!-- /row -->
            </div><!-- /content container -->
            <div class="arrow" style="left:107px"></div>
        </div><!-- /backgroung color control panel -->

        <!-- text alignment -->
        <div class="popover top control-panel" style="margin-bottom:-43px;max-width:264px;">
            <div class="popover-title"> 
                <button type="button" class="close" data-panel="3" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="dash-box" style="padding:1px 2px;font-size:11px;" aria-hidden="true">Aa</div>
                <div><b>Textbox</b></div>
                <div class="glyphicon glyphicon-chevron-right"></div>
                <div class="glyphicon glyphicon-align-left" style="font-size:17px;margin-right:5px;"></div>
                <div><b>Text Align</b></div>
            </div>
            <div class="popover-content" style="text-align:center;padding-top:18px;">
                <button type="button" class="btn btn-default active" style="margin:0 6px;" data-excom="justifyLeft" onmousedown="event.preventDefault()" aria-label="justify align left"><span class="glyphicon glyphicon-align-left"></span></button>
                <button type="button" class="btn btn-default" style="margin:0 6px;" data-excom="justifyCenter" onmousedown="event.preventDefault()" aria-label="justify align center"><span class="glyphicon glyphicon-align-center"></span></button>
                <button type="button" class="btn btn-default" style="margin:0 6px;" data-excom="justifyRight" onmousedown="event.preventDefault()" aria-label="justify align right"><span class="glyphicon glyphicon-align-right"></span></button>
                <button type="button" class="btn btn-default" style="margin:0 6px;" data-excom="justifyFull" onmousedown="event.preventDefault()" aria-label="justify align full"><span class="glyphicon glyphicon-align-justify"></span></button>
            </div>
            <div class="arrow" style="left:196px"></div>
        </div>

    </div>

    <!-- toolbar -->
    <div id="textToolbar">

        <!-- delete button -->
        <div class="btn-group opts-toolbar" style="float:right;margin-bottom:10px;" aria-label="delete textbox">
            <button type="button" class="btn btn-default btn-danger" aria-label="delete textbox">
                <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
            </button>
        </div>

        <!-- toolbar 1 -->
        <div class="btn-group opts-toolbar" style="margin-bottom:10px;" role="group" aria-label="edit textbox toolbar">
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
        <div class="btn-toolbar" role="toolbar">

            <!-- text styling -->
            <div class="btn-group opts-toolbar" role="group" aria-label="edit textbox toolbar">
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
                <!-- edit background color -->
                <div role="button" class="btn btn-default" data-panel aria-label="edit background color">
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
                <!-- text align -->
                <button type="button" class="btn btn-default" data-panel="3" aria-label="text align">
                    <span class="glyphicon glyphicon-align-left" aria-hidden="true"></span>
                </button>
            </div><!-- /text styling -->

            <!-- textbox positioning -->
            <div class="btn-group opts-toolbar" style="float:right;" role="group" aria-label="reposition textbox toolbar">
                <!-- move to front -->
                <button type="button" class="btn btn-default" data-panel aria-label="move to front">
                    <span class="icon-stack" aria-hidden="true"></span>
                </button>
                <!-- reposition, resize, rotate -->
                <button type="button" class="btn btn-default" data-panel aria-label="crop image">
                    <span class="icon-enlarge" aria-hidden="true"></span>
                </button>
            </div> <!-- /text positioning -->

        </div><!-- /toolbar 2 -->

    </div><!-- /toolbar -->

</div>