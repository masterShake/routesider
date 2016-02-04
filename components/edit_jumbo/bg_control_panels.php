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
        <div class="popover top control-panel" style="max-width:612px;">
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

                            <!-- transparency checkbox -->
                            <div style="display:none;">
                                <input type="checkbox" class="colorize"/>
                            </div>

                        </div>

                        <!-- color wheel -->
                        <div class="color-wheel" data-i="0" data-func="bg">
                            
                            <?php include 'components/edit_jumbo/color_wheel_btns.php'; ?>

                        </div><!-- /hexigon color wheel -->
                    </div><!-- /col-md-6 -->

                    <hr class="visible-xs" style="margin-top:13px;margin-bottom:15px;">

                    <div class="col-sm-6 right-panel">
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
                            <input type="text" class="form-control" data-elem maxlength="4" value='<?= ($jumbo["bg"][0]["opacity"]) ?>'>
                            <input type="range" class="range-slider" data-elem min="0" max="1" step="0.01" value="<?= ($jumbo["bg"][0]["opacity"]) ?>">
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
                <span class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
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