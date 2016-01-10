<!-- background options control panels -->
<div id="bgProps">
    
    <hr>
    
    <!-- title -->
    <div class="opts-title">
        <div class="dash-box" aria-hidden="true">
            <span class="icon-image" aria-hidden="true"></span>
        </div>
        <h5><b>Background options:</b></h5>
    </div>

    <!-- control panels -->
    <div id="bgCpanels">

        <!-- background color control panel -->
        <div class="popover top control-panel" style="max-width:660px;">
            <div class="popover-title"> 
                <button type="button" class="close" data-panel="0" aria-label="Close"><span aria-hidden="true">&times;</span></button>
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
                                                    class="btn colorize"
                                                    style='background-color: <?= $jumbo["bg"][0]["color"]; ?>; color: #444;'
                                                    aria-label="edit jumbotron background color, use color wheel to select colors">
                                                <span class="glyphicon glyphicon-tint"></span>
                                            </button>
                                        </td>
                                        <td>
                                            <input type="text" 
                                                   value='<?= $jumbo["bg"][0]["color"]; ?>' 
                                                   class="form-control colorize" 
                                                   data-i="0"
                                                   data-func="bg"
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
                                       class="colorize" 
                                       data-i="0"
                                       data-func="bg"
                                       value='<?= $jumbo["bg"][0]["color"]; ?>'
                                       aria-label="select from complete color wheel">
                            </div><!-- /full color wheel -->

                        </div>

                        <!-- color wheel -->
                        <div class="color-wheel" data-i="0" data-func="bg">
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
                        <form class="half-slider blur-form" style="padding-left:10px;float:right;">
                            <label>
                                <span class="glyphicon glyphicon-eye-open"></span>
                                blur
                            </label>
                            <input type="text" class="form-control" maxlength="2" value='<?= ($jumbo["bg"][0]["blur"]) ?>'>
                            <input type="range" class="range-slider" min="0" max="10" step="1" value='<?= ($jumbo["bg"][0]["blur"]) ?>'>
                        </form>
                        <!-- background image opacity -->
                        <form class="half-slider opacity-form" style="border-right: 1px solid #ccc; padding-right: 10px;">
                            <label>
                                <span class="glyphicon glyphicon-adjust" aria-hidden="true"></span>
                                opacity
                            </label>
                            <input type="text" class="form-control" data-elem="child" maxlength="4" value='<?= ($jumbo["bg"][0]["opacity"]) ?>'>
                            <input type="range" class="range-slider" data-elem="child" min="0" max="1" step="0.01" value="<?= ($jumbo["bg"][0]["opacity"]) ?>">
                        </form>
                    </div><!-- /col-md-6 -->
                </div><!-- /row -->
            </div><!-- /content container -->
            <div class="arrow" style="left:107px"></div>
        </div><!-- /backgroung color control panel -->

    </div><!-- /control panels -->

    <!-- toolbar -->
    <div class="btn-toolbar" id="bgToolbar">

        <!-- delete background image -->
        <div class="btn-group opts-toolbar" style="float:right;" role="group" aria-label="delete background image">
            <button type="button" class="btn btn-default btn-danger" aria-label="delete background image">
                <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
            </button>
        </div>

        <div class="btn-group opts-toolbar" role="group" aria-label="edit background toolbar">
            <!-- edit background image -->
            <button type="button" class="btn btn-default" data-panel aria-label="edit background image">
                <span class="icon-upload"></span>
            </button><!-- /edit background image -->
            <!-- crop background image -->
            <button type="button" class='btn btn-default<?= ($jumbo["bg"][0]["image"]) ? "" : " inactive"; ?>' data-panel aria-label="crop image">
                <span class="glyphicon glyphicon-move" aria-hidden="true"></span>
            </button>
            <!-- edit background color -->
            <div role="button" class="btn btn-default" data-panel="0" aria-label="edit background color">
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
        </div>

    </div><!-- /toolbar -->

</div><!-- /background options -->