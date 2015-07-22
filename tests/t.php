<?php

/*----------------------------------------

	  general all porpose test file

-----------------------------------------*/


/*-----------------------------------------------

					Markdown
				  ------------

 - replace the markdown expressions with HTML
   tags.

-----------------------------------------------*/

class Markdown{	
	
	//-----------------------------------------------
	// - convert markdown to HTML
	// - @ text -> text to be converted
	// - @ toolbar -> "half" or "full"
	// - returns html formatted string
	public static function html( $text = "", $toolbar = "half" ){

		// bold
		$text = preg_replace('/\*\*(.+?)\*\*/s', "<strong>$1</strong>", $text);

		// italic
		$text = preg_replace('/\*([^\*]+)\*/', "<i>$1</i>", $text);

		// strikethrough
		$text = preg_replace('/~~(.+?)~~/s', "<span style='text-decoration:line-through'>$1</span>", $text);

		// subscript
		$text = preg_replace('/\-\^\(([^\)]+)\)/', "<sub>$1</sub>", $text);

		// superscript
		$text = preg_replace('/\^\(([^\)]+)\)/', "<sup>$1</sup>", $text);

		// if user is marking up textarea
		if($toolbar == "full")

			return self::fullHTML( $text );

		return $text;

	}

	//-------------------------------------------
}


$myText = "***bitch* you *ain't* ~~shit~~**poop-^(2)!";

echo Markdown::html( $myText );



