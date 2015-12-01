<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
        <title>hammer time</title>
        <!-- Bootstrap -->
        <link href="../css/bootstrap.min.css" rel="stylesheet">
        <style>

            h1{
                margin-top: 80px;
            }

            .well{
                height: 400px;
                background-color: #dedede;
            }

            #hammerTime{
                height: 120px;
                width: 120px;
                background-color: #fff;
                box-shadow: 1px 1px 6px #AAA;
                transform: translate3d(235px, 100px, 0px) scale(1, 1) rotate3d(0, 0, 0, 0deg);
                /*transition: all 0.3s;*/
            }

        </style>
    </head>
    <body>

        <div class="container">
        
            <h1>hammer.js test</h1>
            
            <div class="well">
                
                <div id="hammerTime"></div>

            </div>
        
        </div><!-- /container -->

        <!-- javascript -->
        <script src="../js/hammer.min.js"></script>
        <script src="../js/rrr.js"></script>

        <script>

            rMap.h["0"] = new RRR(hammerTime);
            rMap.a = rMap.h["0"];

        </script>
    
    </body>
</html>