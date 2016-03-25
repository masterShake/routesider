<?php

$db = neoDB::getInstance();

$cypher = "MATCH (s)-[r:POSTED]->(p:Post) WHERE p.net_id = '" . $_POST["post_id"] . "' " .
          "SET r.deleted = 1";

$db->query( $cypher );

exit("1");