<?php

$db = neoDB::getInstance();

$user = new User();

$business = $user->business()[0];

$checked = ($_POST["val"] == "true") ? 1 : 0; echo $checked . " ";

$cypher = "MATCH (b:Business) WHERE b.id=".$business->data("id")." ".
          "MATCH (b)-[l:LINKED_TO]->(s)<-[:HAS_MEMBER]-(n) WHERE n.name='".$_POST["network"]."' ";

if( $_POST["checkchange"] == "login" )

    $cypher .= "SET l.login=".$checked;

else

    $cypher .= "SET s.auto_update=".$checked;

$db->query($cypher);

exit();