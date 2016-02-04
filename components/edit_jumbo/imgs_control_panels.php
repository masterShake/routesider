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
                                                   data-i="0"
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
                                       data-func="bgColor"
                                       data-i="0"
                                       aria-label="select from complete color wheel">
                            </div><!-- /full color wheel -->

                            <!-- no color (transparent) textbox -->
                            <div style="margin-top:10px;">
                                <label style="margin-bottom:0px;margin-top:4px;"><span class="glyphicon glyphicon-ban-circle" style="color:#d9534f;"></span> transparent</label>
                                <input type="checkbox" class="form-control colorize" data-func="bgColor" data-i="0" data-lasthex="#FFFFFF" checked>
                            </div>

                        </div>

                        <!-- color wheel -->
                        <div class="color-wheel" data-func="bgColor" data-i="0" style="height:126px;padding-top:13px;">
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
                            <input type="text" class="form-control" data-elem="3" maxlength="4" value='1'>
                            <input type="range" class="range-slider" data-elem="3" min="0" max="1" step="0.01" value="1">
                        </form>
                    </div><!-- /col-md-6 -->
                </div><!-- /row -->
            </div><!-- /content container -->
            <div class="arrow"></div>
        </div>

        <!-- border color -->
        <div class="popover top control-panel" style="width:600px;">
            <div class="popover-title"> 
                <button type="button" class="close" data-panel="1" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="icon-images" style="font-size:18px;margin-right:5px;" aria-hidden="true"></div>
                <div><b>Image Overlay</b></div>
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
                                       value='#444444'
                                       data-func="borderColor"
                                       data-i="1"
                                       aria-label="select from complete color wheel">
                            </div><!-- /full color wheel -->

                            <!-- transparency checkbox -->
                            <div style="display:none;">
                                <input type="checkbox" class="colorize"/>
                            </div>

                        </div>

                        <!-- color wheel -->
                        <div class="color-wheel" data-func="borderColor" data-i="1">
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
                <button type="button" class="close" data-panel="2" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="icon-images" style="font-size:18px;margin-right:5px;" aria-hidden="true"></div>
                <div><b>Image Overlay</b></div>
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
                                                   value='#676767' 
                                                   class="form-control colorize" 
                                                   maxlength="7"
                                                   style="text-transform:uppercase"
                                                   data-func="shadowColor"
                                                   data-i="2" 
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
                                       value='#676767'
                                       data-func="shadowColor"
                                       data-i="2"
                                       aria-label="select from complete color wheel">
                            </div><!-- /full color wheel -->

                            <!-- no shadow -->
                            <div style="margin-top:10px;opacity:0.5">
                                <label style="margin-bottom:0px;margin-top:4px;"><span class="glyphicon glyphicon-ban-circle" style="color:#d9534f;"></span> shadow</label>
                                <input type="checkbox" class="form-control colorize" data-i="2" data-lasthex="#676767" data-func="shadowColor">
                            </div>
                        </div>
                        <!-- color wheel -->
                        <div class="color-wheel" style="height:127px;padding-top:13px;" data-func="shadowColor" data-i="2">
                            <?php include 'components/edit_jumbo/color_wheel_btns.php'; ?>
                        </div><!-- /hexigon color wheel -->
                    </div><!-- /left-panel -->

                    <hr class="visible-xs" style="margin-top:13px;margin-bottom:15px;">

                    <!-- adjust levels -->
                    <div class="col-sm-5 center-panel">
                        <!-- softness -->
                        <form class="form-inline full-slider">
                            <div class="form-group" data-prop="softness" data-i="2">
                                <label>softness <span class="icon-brightness-contrast" aria-hidden="true"></span></label>
                                <input type="text" class="form-control" maxlength="2" value="4" />
                                <input type="range" class="range-slider" min="0" max="99" step="1" value="4">
                            </div>
                        </form>
                        <!-- spread -->
                        <form class="form-inline full-slider">
                            <div class="form-group" data-prop="spread" data-i="2">
                                <label>spread <span class="glyphicon glyphicon-certificate" aria-hidden="true"></span></label>
                                <input type="text" class="form-control" maxlength="2" value="4" />
                                <input type="range" class="range-slider" min="0" max="99" step="1" value="4">
                            </div>
                        </form>
                        <!-- shadow x -->
                        <form class="form-inline full-slider">
                            <div class="form-group" data-prop="x" data-i="2">
                                <label>x <span class="glyphicon glyphicon-resize-horizontal" aria-hidden="true"></span></label>
                                <input type="text" class="form-control" maxlength="3" value="0" />
                                <input type="range" class="range-slider" min="-99" max="99" step="1" value="0">
                            </div>
                        </form>
                        <!-- shadow y -->
                        <form class="form-inline full-slider">
                            <div class="form-group" data-prop="y" data-i="2">
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
                                <input type="radio" class="form-control" data-i="2" style="max-width: 22px;height: 24px;" name="tb-inset" value="0" checked>
                            </div>
                            <div class="col-xs-6 col-sm-12">
                                <label style="float:left;height:23px;width:23px;margin-left:28%;margin-right: 16px;margin-bottom: 0;box-shadow: 1px 1px 2px 2px #888 inset;float: left;"></label>
                                <input type="radio" class="form-control" data-i="2" style="max-width: 22px;height: 24px;margin-top:0;" name="tb-inset" value="1">
                            </div>
                        </form>
                    </div><!-- /inset -->
                </div><!-- /row -->
            </div>
            <div class="arrow"></div>
        </div>

        <!-- visibility -->
        <div class="popover top control-panel" style="max-width:292px;">
            <div class="popover-title"> 
                <button type="button" class="close" data-panel="2" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="icon-images" style="font-size:18px;margin-right:5px;" aria-hidden="true"></div>
                <div><b>Image Overlay</b></div>
                <div class="glyphicon glyphicon-chevron-right"></div>
                <div class="glyphicon glyphicon-eye-open" style="font-size:17px;margin-right:5px;"></div>
                <div><b>Visibility</b></div>
            </div>
            <div class="popover-content" style="padding-top:16px;padding-bottom:3px;">
                <form class="form-inline">
                    <!-- mobile -->
                    <label class="checkbox-inline vis">
                        <input type="checkbox" value="mobile" checked>
                        <span class="icon-mobile"></span><br>
                        <div>mobile</div>
                    </label>
                    <!-- tablet -->
                    <label class="checkbox-inline vis">
                        <input type="checkbox" value="tablet" checked>
                        <span class="icon-mobile2"></span><br>
                        <div>tablet</div>
                    </label>
                    <!-- desktop -->
                    <label class="checkbox-inline vis">
                        <input type="checkbox" value="desktop" checked>
                        <span class="icon-laptop"></span><br>
                        <div>desktop</div>
                    </label>
                </form>
            </div>
            <div class="arrow"></div>
        </div><!-- /visibility -->

    </div><!-- /control panels -->

    <!-- toolbar -->
    <div class="btn-toolbar" id="imgsToolbar" role="toolbar">
        
        <!-- group 1 -->
        <div class="btn-group opts-toolbar" role="group" aria-label="edit image overlay">
            <!-- [0] background color, opacity, blur -->
            <div type="button" class="btn btn-default inactive" data-panel="0" aria-label="background color, blur, opacity">
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
            <button type="button" class="btn btn-default inactive" data-panel="1" aria-label="border style">
                <span class="icon-checkbox-unchecked" aria-hidden="true"></span>
            </button>
            <!-- [2] shadow -->
            <button type="button" class="btn btn-default inactive" data-panel="2" aria-label="shadow">
                <span class="icon-checkbox-unchecked" style="text-shadow: 1px 1px 4px #343434;" aria-hidden="true"></span>
            </button>
            <!-- [3] move to front -->
            <button type="button" class="btn btn-default inactive" data-panel aria-label="move to front">
                <span class="icon-stack" aria-hidden="true"></span>
            </button>
            <!-- [4] resize, reposition, rotate -->
            <button type="button" class="btn btn-default inactive" data-panel aria-label="resize, reposition, rotate">
                <span class="glyphicon glyphicon-move" aria-hidden="true"></span>
            </button>
            <!-- [5] visibility -->
            <button type="button" class="btn btn-default inactive" data-panel="3" style="border-top-right-radius:4px;border-bottom-right-radius:4px;" aria-label="move to front">
                <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
            </button>
            <div style="height:42px;width:100%;position:relative;display:block;"><span></span></div>
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