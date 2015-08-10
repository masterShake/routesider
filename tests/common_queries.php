<?php

//-----------------------------------------------
//
//	Common Neo4j Queries
//
//-----------------------------------------------

include "../core/init.php";

$db = neoDB::getInstance();


//-----------------------------------------------
// - delete all posts and likers

$cypher =   "MATCH (b)-[m:LINKED_TO]->(s) " .
			"MATCH (s)-[r:POSTED]->(p) " .
			"MATCH (i)-[q:HAS_POST]->(p) " .
			"MATCH (t)-[v:LIKED]->(p) " .
			"MATCH (i)-[y:HAS_MEMBER]->(t) " .
			"DELETE m, r, q, v, y";

$db->query($cypher);

// then this

$cypher = "MATCH (s)-[r:POSTED]->(p) MATCH (i)-[q:HAS_POST]->(p) MATCH (i)-[y:HAS_MEMBER]->(t) DELETE r, q, y, s, p, t";

$db->query($cypher);

// then this

$cypher = 	"MATCH (p:Post) " .
			"DELETE p";

$db->query($cypher);

$cypher = 	"MATCH (s:Socialite) " .
			"DELETE s";

$db->query($cypher);














