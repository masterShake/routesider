<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Test tumblr connect</title>

    <!-- Bootstrap -->
    <link href="../css/bootstrap.min.css" rel="stylesheet">

  </head>
  <body>

    <h1>tumblr test</h1>

    <pre><?php

    include "../core/init.php";

    $results = Curl::post("http://www.tumblr.com/oauth/request_token", "oauth_consumer_key=aWWWsdicEuin5zGcICL7bt5AOI9cBJf5Fq6m303KBEdFEzwQPA");

    print_r($results);

    ?></pre>
  </body>
</html>