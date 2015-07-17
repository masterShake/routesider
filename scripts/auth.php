<?php

/*----------------------------------------

	  	      Oauth redirect

-----------------------------------------*/


// ajax post request for access token
if(isset($_POST["code"])){

    include "../core/init.php";

    // perform curl call for insta info
    if($_POST["network"] == "instagram"){

        $url = "https://api.instagram.com/oauth/access_token";

        $params  =  "client_id=6f469fae7d024a83ae77a5d463181af0&" .
                    "client_secret=574afd2e26674eea82002103bd0d425c&" .
                    "grant_type=authorization_code&" .
                    "redirect_uri=http%3A%2F%2Flocalhost%2Froutesider%2Fscripts%2Fauth.php%3Fnetwork%3Dinstagram&" .
                    "code=" . $_POST["code"];

        $results = Curl::post( $url, $params );

        // convert the json into a standard object
        $results = json_decode($results);

        // echo $results->access_token;

        // request the user's recent media
        $url = "https://api.instagram.com/v1/users/self/media/recent/?access_token=" . $results->access_token;

        echo "here is the url object:\n\n";

        echo $url . "\n\n";

        echo "here are the results:\n\n";

        // $ch = curl_init();
        // $timeout = 5;
        // curl_setopt($ch, CURLOPT_URL, $url);
        // curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        // curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
        // $data = curl_exec($ch);
        // curl_close($ch);

        $data = file_get_contents($url);
        
        print_r($data);

    }

    exit();
}

?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Bootstrap 101 Template</title>
    <!-- Bootstrap -->
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/main.css" rel="stylesheet">
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>

	<!-- hour glass spinner -->
    <div style="width:100%;text-align:center;font-size:40px;color:#5cb85c;margin-top:150px;">
        <span class="glyphicon glyphicon-hourglass loading"></span>
    </div>

    <pre id="response"></pre>


  	<!-- print_r -->
  	<!-- <pre></pre> -->


    <!-- javascript -->
    <script>

        (function(){
            document.addEventListener("DOMContentLoaded", function(){

                var ajax = new XMLHttpRequest();
                ajax.open("POST", "", true);
                ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                ajax.onreadystatechange = function() {
                    if(this.readyState == 4 && this.status == 200) {
                        document.getElementById("response").innerHTML = this.responseText;
                    }
                }
                ajax.send('network=<?= $_GET["network"]; ?>&code=<?= $_GET["code"]; ?>');

            }, true);   
        })();

    </script>

  </body>
</html>










