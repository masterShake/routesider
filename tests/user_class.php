<?php

/*----------------------------------------

	  		User class tests

-----------------------------------------*/
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
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>


	<?php

		include "../core/init.php";

		$user = new User();

		$business = $user->business()[0];

        $posts = $business->getPosts();

        $posts->getNodes("Post");

        $medias = array();


    foreach ($posts as $post) {
      
        $medias = $post->getConnectedNodes("OUT", "HAS_MEDIA");

        foreach ($medias as $media) {
            
            echo $media->getProperty("url")."\n";
        }

        echo "-------------------------------\n\n";
    }
    
	?>




  	<!-- print_r -->
  	<pre><?php

    

  	?></pre>







  </body>
</html>










