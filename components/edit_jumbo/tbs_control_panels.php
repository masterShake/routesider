<!-- textbox options control panels -->
<div id="tbsProps">
    
    <hr>
    
    <!-- title -->
    <div class="opts-title">
        <div class="dash-box" style="padding:1px 2px;" aria-hidden="true">Aa</div>
        <h5><b>Textbox options:</b></h5>
    </div>

    <!-- control panels -->
    <div id="tbsCpanels" style="position:relative;z-index:3;">

        <!-- text size -->
        <div class="popover top control-panel" style="max-width:250px;">
            <div class="popover-title"> 
                <button type="button" class="close" data-panel="0" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="dash-box" style="padding:1px 2px;font-size:11px;" aria-hidden="true">Aa</div>
                <div><b>Textbox</b></div>
                <div class="glyphicon glyphicon-chevron-right"></div>
                <div class="glyphicon glyphicon-text-size" style="margin-right:5px;margin-top:1px;"></div>
                <div><b>Font Size</b></div>
            </div>
            <div class="popover-content" style="text-align:center;">
                <div class="input-group text-size" style="max-width:70px;position:relative;left:50%;margin-left:-50px;">
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
            <div class="arrow"></div>
        </div><!-- /text size -->

        <!-- text color -->
        <div class="popover top control-panel" style="max-width:310px;">
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
                                            class="btn paint-btn colorize" 
                                            style='background-color: #FFF; color: #444; padding: 7px 12px 4px;'
                                            aria-label="edit jumbotron background color, use color wheel to select colors">
                                        <span class="glyphicon glyphicon-text-color" style="font-size:17px;"></span>
                                    </button>
                                </td>
                                <td>
                                    <input type="text" 
                                           value='#000000' 
                                           class="form-control colorize" 
                                           style="text-transform:uppercase" 
                                           maxlength="7"
                                           data-func="foreColor"
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
                               class="colorize"
                               data-func="foreColor"
                               data-i="0"
                               aria-label="select from complete color wheel">
                    </div><!-- /full color wheel -->

                    <!-- transparency checkbox -->
                    <div style="display:none;">
                        <input type="checkbox" class="colorize"/>
                    </div>

                </div>

                <!-- color wheel -->
                <div class="color-wheel" data-i="0" data-func="foreColor">

                    <?php include 'components/edit_jumbo/color_wheel_btns.php'; ?>

                </div><!-- /hexigon color wheel -->

            </div>
            <div class="arrow"></div>
        </div><!-- /text color -->

        <!-- text background -->
        <div class="popover top control-panel" style="max-width:310px;">
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
                                            class="btn paint-btn colorize" 
                                            style='background-color: #FFF; color: #444; padding: 7px 12px 4px;'
                                            aria-label="edit jumbotron background color, use color wheel to select colors">
                                        <span class="glyphicon glyphicon-text-background" style="font-size:17px;"></span>
                                    </button>
                                </td>
                                <td>
                                    <input type="text" 
                                           value='' 
                                           class="form-control colorize" 
                                           style="text-transform:uppercase" 
                                           maxlength="7"
                                           data-func="backColor"
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
                               class="colorize"
                               value='#FFFFFF'
                               data-func="backColor"
                               data-i="1"  
                               aria-label="select from complete color wheel">
                    </div><!-- /full color wheel -->

                    <!-- no color (transparent) textbox -->
                    <div style="margin-top:10px;">
                        <label style="margin-bottom:0px;margin-top:4px;"><span class="glyphicon glyphicon-ban-circle" style="color:#d9534f;"></span> transparent</label>
                        <input type="checkbox" class="form-control colorize" data-func="backColor" data-i="1" data-lasthex="#FFFFFF" checked>
                    </div>
                </div>

                <!-- color wheel -->
                <div class="color-wheel" style="height:122px;padding-top:12px;" data-i="1" data-func="backColor">
                    <?php include 'components/edit_jumbo/color_wheel_btns.php'; ?>
                </div><!-- /hexigon color wheel -->

            </div>
            <div class="arrow"></div>
        </div><!-- /text color -->

        <!-- text alignment -->
        <div class="popover top control-panel" style="max-width:264px;">
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
            <div class="arrow"></div>
        </div>

        <!-- background color control panel -->
        <div class="popover top control-panel" style="width:600px;">
            <div class="popover-title"> 
                
                <button type="button" class="close" data-panel="4" aria-label="Close"><span aria-hidden="true">&times;</span></button>
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

            <div class="popover-content container">
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
                                                    class="btn paint-btn colorize" 
                                                    style='background-color: #FFFFFF;'>
                                                <span class="glyphicon glyphicon-tint"></span>
                                            </button>
                                        </td>
                                        <td>
                                            <input type="text" 
                                                   value='' 
                                                   class="form-control colorize" 
                                                   maxlength="7"
                                                   data-func="bgColor"
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
                                       class="colorize"
                                       value='#FFFFFF'
                                       data-i="2"
                                       data-func="bgColor"
                                       aria-label="select from complete color wheel">
                            </div><!-- /full color wheel -->

                            <!-- no color (transparent) textbox -->
                            <div style="margin-top:10px;">
                                <label style="margin-bottom:0px;margin-top:4px;"><span class="glyphicon glyphicon-ban-circle" style="color:#d9534f;"></span> transparent</label>
                                <input type="checkbox" class="form-control colorize" data-i="2" data-func="bgColor" checked>
                            </div>

                        </div>

                        <!-- color wheel -->
                        <div class="color-wheel" style="height:126px;padding-top:13px;" data-i="2" data-func="bgColor">
                            <?php include 'components/edit_jumbo/color_wheel_btns.php'; ?>
                        </div><!-- /hexigon color wheel -->
                    </div><!-- /col-md-6 -->

                    <hr class="visible-xs" style="margin-top:13px;margin-bottom:15px;">

                    <div class="col-sm-6 right-panel">
                        <!-- textbox blur -->
                        <form class="half-slider blur-form" style="padding-left:10px;float:right;">
                            <label>
                                <span class="glyphicon glyphicon-eye-open"></span>
                                blur
                            </label>
                            <input type="text" class="form-control" maxlength="2" value='0'>
                            <input type="range" class="range-slider" min="0" max="10" step="1" value='0'>
                        </form>
                        <!-- background image opacity -->
                        <form class="half-slider opacity-form" style="border-right: 1px solid #ccc; padding-right: 10px;">
                            <label>
                                <span class="glyphicon glyphicon-adjust" aria-hidden="true"></span>
                                opacity
                            </label>
                            <input type="text" class="form-control" data-elem="parent" maxlength="4" value='1'>
                            <input type="range" class="range-slider" data-elem="parent" min="0" max="1" step="0.01" value="1">
                        </form>
                    </div><!-- /col-md-6 -->
                </div><!-- /row -->
            </div><!-- /content container -->
            <div class="arrow"></div>
        </div><!-- /backgroung color control panel -->

        <!-- border color -->
        <div class="popover top control-panel" style="width:600px;">
            <div class="popover-title"> 
                <button type="button" class="close" data-panel="5" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="dash-box" style="padding:1px 2px;font-size:11px;" aria-hidden="true">Aa</div>
                <div><b>Textbox</b></div>
                <div class="glyphicon glyphicon-chevron-right"></div>
                <div class="icon-checkbox-unchecked" style="font-size:18px;margin-right:5px;"></div>
                <div><b>Border</b></div>
            </div>
            <div class="popover-content container">
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
                                                    class="btn colorize" 
                                                    style='background-color: #FFF; color: #444; padding: 7px 12px 4px;'
                                                    aria-label="edit button border color, use color wheel to select colors">
                                                <span class="icon-checkbox-unchecked" style="font-size:17px;"></span>
                                            </button>
                                        </td>
                                        <td>
                                            <input type="text" 
                                                   value='#000000' 
                                                   class="form-control colorize" 
                                                   maxlength="7"
                                                   style="text-transform:uppercase"
                                                   data-func="borderColor"
                                                   data-i="3" 
                                                   aria-label="background color hexidecimal color value">
                                        </td>
                                    </tr>
                                </tbody>
                            </table><!-- /hex table -->

                            <!-- HTML5 color picker -->
                            <div style="text-align:center;margin-top:14px;">
                                <label>more colors:</label>
                                <input type="color" 
                                       class="colorize"
                                       value='#444444'
                                       data-func="borderColor"
                                       data-i="3"
                                       aria-label="select from complete color wheel">
                            </div><!-- /full color wheel -->

                            <!-- transparency checkbox -->
                            <div style="display:none;">
                                <input type="checkbox" class="colorize"/>
                            </div>

                        </div>

                        <!-- color wheel -->
                        <div class="color-wheel" data-func="borderColor" data-i="3">
                            <?php include 'components/edit_jumbo/color_wheel_btns.php'; ?>
                        </div><!-- /hexigon color wheel -->
                    </div><!-- /left-panel -->

                    <hr class="visible-xs" style="margin-top:13px;margin-bottom:15px;">

                    <div class="col-sm-6 right-panel">
                        <!-- thickness -->
                        <form class="half-slider thickness-form" style="padding-left:10px;float:right;">
                            <label><span class="glyphicon glyphicon-minus"></span> thickness</label>
                            <input type="text" class="form-control" maxlength="2" value="0">
                            <input type="range" class="range-slider" min="0" max="10" step="1" value="0">
                        </form>
                        <!-- roundness -->
                        <form class="half-slider roundness-form" style="border-right: 1px solid #ccc; padding-right: 10px;">
                            <label><span class="icon-radio-unchecked"></span> roundness</label>
                            <input type="text" class="form-control" maxlength="3" value="0">
                            <input type="range" class="range-slider" min="0" max="100" step="1" value="0">
                        </form>
                    </div><!-- /right panel -->
                </div><!-- /row -->
            </div><!-- /popover-content container -->
            <div class="arrow"></div>
        </div><!-- /border color -->

        <!-- shadow -->
        <div class="popover top control-panel" style="width:719px;">
            <div class="popover-title"> 
                <button type="button" class="close" data-panel="6" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="dash-box" style="padding:1px 2px;font-size:11px;" aria-hidden="true">Aa</div>
                <div><b>Textbox</b></div>
                <div class="glyphicon glyphicon-chevron-right"></div>
                <div class="icon-checkbox-unchecked" style="font-size:18px;margin-right:5px;text-shadow: 1px 1px 4px #343434;"></div>
                <div><b>Shadow</b></div>
            </div>
            <div class="popover-content container shadow">
                <div class="row">

                    <div class="col-sm-5 left-panel">
                        <!-- shadow color -->
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
                                                    class="btn colorize" 
                                                    style='background-color: #FFF; color: #444; padding: 7px 12px 4px;'
                                                    aria-label="edit button border color, use color wheel to select colors">
                                                <span class="icon-checkbox-unchecked" style="font-size:17px;"></span>
                                            </button>
                                        </td>
                                        <td>
                                            <input type="text" 
                                                   value='#000000' 
                                                   class="form-control colorize" 
                                                   maxlength="7"
                                                   style="text-transform:uppercase"
                                                   data-func="shadowColor"
                                                   data-i="4" 
                                                   aria-label="background color hexidecimal color value">
                                        </td>
                                    </tr>
                                </tbody>
                            </table><!-- /hex table -->

                            <!-- HTML5 color picker -->
                            <div style="text-align:center;margin-top:14px;">
                                <label>more colors:</label>
                                <input type="color" 
                                       class="colorize"
                                       value='#444444'
                                       data-func="shadowColor"
                                       data-i="4"
                                       aria-label="select from complete color wheel">
                            </div><!-- /full color wheel -->

                            <!-- no shadow (transparent) textbox -->
                            <div style="margin-top:10px;">
                                <label style="margin-bottom:0px;margin-top:4px;"><span class="glyphicon glyphicon-ban-circle" style="color:#d9534f;"></span> no shadow</label>
                                <input type="checkbox" class="form-control colorize" data-i="4" data-lasthex="#000000" data-func checked>
                            </div>
                        </div>
                        <!-- color wheel -->
                        <div class="color-wheel" style="height:127px;padding-top:13px;" data-func="shadowColor" data-i="4">
                            <?php include 'components/edit_jumbo/color_wheel_btns.php'; ?>
                        </div><!-- /hexigon color wheel -->
                    </div><!-- /left-panel -->

                    <hr class="visible-xs" style="margin-top:13px;margin-bottom:15px;">

                    <!-- adjust levels -->
                    <div class="col-sm-5 center-panel">
                        <!-- softness -->
                        <form class="form-inline full-slider">
                            <div class="form-group" data-prop="softness" data-i="4">
                                <label>softness <span class="icon-brightness-contrast" aria-hidden="true"></span></label>
                                <input type="text" class="form-control" maxlength="2" value="4" />
                                <input type="range" class="range-slider" min="0" max="99" step="1" value="4">
                            </div>
                        </form>
                        <!-- spread -->
                        <form class="form-inline full-slider">
                            <div class="form-group" data-prop="spread" data-i="4">
                                <label>spread <span class="glyphicon glyphicon-certificate" aria-hidden="true"></span></label>
                                <input type="text" class="form-control" maxlength="2" value="4" />
                                <input type="range" class="range-slider" min="0" max="99" step="1" value="4">
                            </div>
                        </form>
                        <!-- shadow x -->
                        <form class="form-inline full-slider">
                            <div class="form-group" data-prop="x" data-i="4">
                                <label>x <span class="glyphicon glyphicon-resize-horizontal" aria-hidden="true"></span></label>
                                <input type="text" class="form-control" maxlength="3" value="0" />
                                <input type="range" class="range-slider" min="-99" max="99" step="1" value="0">
                            </div>
                        </form>
                        <!-- shadow y -->
                        <form class="form-inline full-slider">
                            <div class="form-group" data-prop="y" data-i="4">
                                <label>y <span class="glyphicon glyphicon-resize-vertical" aria-hidden="true"></span></label>
                                <input type="text" class="form-control" maxlength="3" value="0" />
                                <input type="range" class="range-slider" min="-99" max="99" step="1" value="0">
                            </div>
                        </form>
                    </div>
                    <hr class="visible-xs" style="margin-top:13px;margin-bottom:15px;">
                    <!-- inset -->
                    <div class="col-sm-2">
                        <form class="row inset-form">
                            <div class="col-xs-6 col-sm-12">
                                <label style="float:left;height:22px;width:22px;margin-left:28%;margin-right: 16px;margin-bottom: 0;box-shadow: 1px 1px 2px 2px #888;float: left;"></label>
                                <input type="radio" class="form-control" data-i="4" style="max-width: 22px;height: 24px;" name="tb-inset" value="0" checked>
                            </div>
                            <div class="col-xs-6 col-sm-12">
                                <label style="float:left;height:23px;width:23px;margin-left:28%;margin-right: 16px;margin-bottom: 0;box-shadow: 1px 1px 2px 2px #888 inset;float: left;"></label>
                                <input type="radio" class="form-control" data-i="4" style="max-width: 22px;height: 24px;margin-top:0;" name="tb-inset" value="1">
                            </div>
                        </form>
                    </div><!-- /inset -->
                </div><!-- /row -->
            </div>
            <div class="arrow"></div>
        </div>

        <!-- element visibility -->
        <div class="popover top control-panel" style="max-width:264px;">
            <div class="popover-title"> 
                <button type="button" class="close" data-panel="7" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="dash-box" style="padding:1px 2px;font-size:11px;" aria-hidden="true">Aa</div>
                <div><b>Textbox</b></div>
                <div class="glyphicon glyphicon-chevron-right"></div>
                <div class="glyphicon glyphicon-eye-open" style="font-size:17px;margin-right:5px;"></div>
                <div><b>Visibility</b></div>
            </div>
            <div class="popover-content" style="padding-top:16px;padding-bottom:3px;">
                <form class="form-inline">
                    <!-- mobile -->
                    <label class="checkbox-inline vis">
                        <input type="checkbox" value="mobile" checked>
                        <span class="icon-mobile"></span>
                        <div>mobile</div>
                    </label>
                    <!-- tablet -->
                    <label class="checkbox-inline vis">
                        <input type="checkbox" value="tablet" checked>
                        <span class="icon-mobile2"></span>
                        <div>tablet</div>
                    </label>
                    <!-- desktop -->
                    <label class="checkbox-inline vis">
                        <input type="checkbox" value="desktop" checked>
                        <span class="icon-laptop"></span>
                        <div>desktop</div>
                    </label>
                </form>
            </div>
            <div class="arrow"></div>
        </div><!-- /element visibility control panel -->

    </div>

    <!-- toolbar -->
    <div class="btn-toolbar" id="tbsToolbar" role="toolbar">

        <!-- [0] - font -->
        <div class="btn-group opts-toolbar" style="margin-bottom:10px;" role="group" aria-label="edit textbox toolbar">
            <!-- [0] bold -->
            <button type="button" class="btn btn-default" data-panel data-excom="bold" onmousedown="event.preventDefault()" aria-label="bold">
                <span class="glyphicon glyphicon-bold" aria-hidden="true"></span>
            </button>
            <!-- [1] italic -->
            <button type="button" class="btn btn-default" data-panel data-excom="italic" onmousedown="event.preventDefault()" aria-label="italic">
                <span class="glyphicon glyphicon-italic" aria-hidden="true"></span>
            </button>
            <!-- [2] underline -->
            <button type="button" class="btn btn-default" data-panel data-excom="underline" onmousedown="event.preventDefault()" aria-label="underline">
                <span class="icon-underline" aria-hidden="true"></span>
            </button>
            <!-- [3] strikethrough -->
            <button type="button" class="btn btn-default" data-panel data-excom="strikeThrough" onmousedown="event.preventDefault()" aria-label="strike through">
                <span class="icon-strikethrough" aria-hidden="true"></span>
            </button>
            <!-- [4] subscript -->
            <button type="button" class="btn btn-default" data-panel data-excom="subscript" onmousedown="event.preventDefault()" aria-label="subscript">
                <span class="glyphicon glyphicon-subscript" aria-hidden="true"></span>
            </button>
            <!-- [5] superscript -->
            <button type="button" class="btn btn-default" data-panel data-excom="superscript" onmousedown="event.preventDefault()" aria-label="superscript">
                <span class="glyphicon glyphicon-superscript" aria-hidden="true"></span>
            </button>
        </div><!-- /font toolbar 1 -->

        <!-- [1] - text styling -->
        <div class="btn-group opts-toolbar" style="margin-bottom:10px;" role="group" aria-label="text styling">
            <!-- [0] - text-size -->
            <button type="button" class="btn btn-default" data-panel="0" aria-label="text-size">
                <span class="glyphicon glyphicon-text-size" aria-hidden="true"></span>
            </button>
            <!-- [1]- text color -->
            <button type="button" class="btn btn-default" data-panel="1" aria-label="text-color">
                <span class="glyphicon glyphicon-text-color" aria-hidden="true"></span>
            </button>
            <!-- [2] - text background-->
            <button type="button" class="btn btn-default" data-panel="2" aria-label="text-background">
                <span class="glyphicon glyphicon-text-background" aria-hidden="true"></span>
            </button>
            <!-- [3] - horizontal rule -->
            <button type="button" class="btn btn-default" data-panel aria-label="insert horizontal rule line">
                <span class="icon-page-break" aria-hidden="true"></span>
            </button>
            <!-- [4] - text align -->
            <button type="button" class="btn btn-default" data-panel="3" aria-label="text align">
                <span class="glyphicon glyphicon-align-left" aria-hidden="true"></span>
            </button>
        </div><!-- /text styling -->

        <!-- [2] element styling -->
        <div class="btn-group opts-toolbar" style="margin-bottom:10px;" role="group" aria-label="element styling">
            <!-- [0] edit background color -->
            <div role="button" class="btn btn-default" data-panel="4" aria-label="edit background color">
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
            <!-- [1] border style -->
            <button type="button" class="btn btn-default" data-panel="5" aria-label="border style">
                <span class="icon-checkbox-unchecked" aria-hidden="true"></span>
            </button>
            <!-- [2] shadow -->
            <button type="button" class="btn btn-default" data-panel="6" aria-label="shadow">
                <span class="icon-checkbox-unchecked" style="text-shadow: 1px 1px 4px #343434;" aria-hidden="true"></span>
            </button>
        </div><!-- /text styling -->

        <!-- [3] positioning -->
        <div class="btn-group opts-toolbar" role="group" aria-label="reposition textbox toolbar">
            <!-- move to front -->
            <button type="button" class="btn btn-default" data-panel aria-label="move to front">
                <span class="icon-stack" aria-hidden="true"></span>
            </button>
            <!-- reposition, resize, rotate -->
            <button type="button" class="btn btn-default" data-panel aria-label="crop image">
                <span class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
            </button>
            <!-- layout visibility -->
            <button type="button" class="btn btn-default" data-panel="7" aria-label="layout visibility">
                <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
            </button>
        </div> <!-- /positioning -->

        <!-- [4] delete button -->
        <div class="btn-group opts-toolbar" style="float:right;margin-bottom:10px;" aria-label="delete textbox">
            <button type="button" class="btn btn-default btn-danger" aria-label="delete textbox">
                <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
            </button>
        </div>

    </div><!-- /toolbar -->

</div>