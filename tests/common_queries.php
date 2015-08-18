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

$cypher =   "MATCH (b)-[l:LINKED_TO]->(s) " .
			"MATCH (s)-[r:POSTED]->(p) " .
			"MATCH (i)-[q:HAS_POST]->(p) " .
			"MATCH (p)-[h:HAS_MEDIA]->(m) ".
			"MATCH (t)-[v:LIKED]->(p) " .
			"MATCH (i)-[y:HAS_MEMBER]->(t) " .
			"DELETE l, r, q, h, v, y";

$db->query($cypher);

// then this

$cypher = "MATCH (s)-[r:POSTED]->(p) MATCH (i)-[q:HAS_POST]->(p)-[h:HAS_MEDIA]->(m) MATCH (i)-[y:HAS_MEMBER]->(t) DELETE r, q, y, s, p, h, m, t";

$db->query($cypher);

// then this

$cypher = 	"MATCH (p:Post) " .
			"DELETE p";

$db->query($cypher);

$cypher = 	"MATCH (s:Socialite) " .
			"DELETE s";

$db->query($cypher);

$cypher = 	"MATCH (m:Media) " .
			"DELETE m";

$db->query($cypher);














