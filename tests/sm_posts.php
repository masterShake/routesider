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

    $cypher = "MATCH (s)-[:POSTED]->(p:Post)-[:HAS_MEDIA]->(m:Media) RETURN s, p, m";

    $result = $db->q( $cypher );

    print_r($result->getConnectedNodes("HAS_MEDIA"));

    // print_r($result->getNodes(["Post","Media"], false));

    // print_r(get_class_methods($result));

    // print_r(get_class_methods($db->_result));

    // print_r(get_class_methods($db->_result->getResult()));

    // print_r($db->getNodes(["Post","Media"]));

    echo "</pre>";

    // pp( $results->getNodes() );

    // pp( $db->getNodes(["Post","Media"]) );

?>

</body>
</html>








