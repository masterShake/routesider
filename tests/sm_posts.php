<?php

/*----------------------------------------

	  		   Helium tests

- testing Helium class & social posts

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
</head>
<body>
<?php

    include "../core/init.php";

    $db = neoDB::getInstance();

    //-----------------------------------------------
    // - <pre> tag printing function
    // - $a --> results array
    function pp( $a ){
        echo "<pre>";
        print_r( $a );
        echo "</pre>";
    }

    //-----------------------------------------------
    // - try to return each post with the media obejct

    echo "<pre>";

    $cypher = "MATCH (s:Socialite)-[l:LIKED]->(p:Post) RETURN s, l, p";

    $result = $db->q( $cypher );

    $nodes = $result->getNodes();

    $myPost = $nodes["740"];

    // print_r(get_class_methods($result));

    // print_r($result->getTableFormat());

    // print_r(get_class_methods($nodes["740"]));

    // print_r($nodes["740"]);

    // print_r($result->getNodeById(740)->getConnectedNodes("OUT", ["HAS_MEDIA"]));

    // print_r($nodes["740"]->getConnectedNodes());

    $myPost->getConnectedNodes('IN', 'LIKED');

    // print_r(); //print_r($likers);

    // foreach($likers as $liker){

    //     print_r($liker);

    // }

    // foreach ($nodes as $id => $node) {
        
    //     print_r($id);

    //     print_r($node);

    //     print_r(get_class_methods($node));

    // }

    // print_r($nodes);

    // print_r($result);    

    // foreach($result->getNodes("p") as $post){

    //     print_r($post->getConnectedNodes("HAS_MEDIA"));

    //     echo "\n\n";

    // }

    echo "</pre>";

?>

</body>
</html>








