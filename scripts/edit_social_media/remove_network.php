<?php

$user = new User();

$business = $user->business()[0];

$db = neoDB::getInstance();

$cypher = "MATCH (b:Business) WHERE b.id=".$business->data("id")." ".
          "MATCH (b)-[l:LINKED_TO]->(s)<-[:HAS_MEMBER]-(n) WHERE n.name='".$_POST["delnet"]."' ".
          "SET l.active = 0";

$db->query( $cypher );

echo "network inactive"; exit();