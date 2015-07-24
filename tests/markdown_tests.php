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

		// if there is no text, do nothing
		if( !$text )
			return "";

		// bold
		$text = preg_replace('/\*\*(.+?)\*\*/s', "<strong>$1</strong>", $text);

		// italic
		$text = preg_replace('/\*([^\*\s]+)\*/', "<i>$1</i>", $text);

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
	// - perform more preg_replace for complete
	//   markdown toolbar
	private static function fullHTML( $text ){

		// links
		$text = preg_replace('/\[([^\]]+)\]\(([^)]+)\)/', "<a href='$2'>$1</a>", $text);

		// unordered lists
		$text = preg_replace("/\*+(.*)?/i","<ul><li>$1</li></ul>",$text);
		$text = preg_replace("/(\<\/ul\>\n(.*)\<ul\>*)+/","",$text);

		// ordered lists
		$text = preg_replace("/\d\.+(.*)?/i","<ol><li>$1</li></ol>",$text);
		$text = preg_replace("/(\<\/ol\>\n(.*)\<ol\>*)+/","",$text);

		// quote
		$text = preg_replace("/\n>\s(.*)?[^\n]+/i","<q>$1</q><br>",$text);

		// linebreak
		$text = preg_replace('/----------/', "<hr>", $text);

		return $text;

	}
}


$myText = " [google](https://google.com/) \n1. *bitches* \n2. aint \n4. shit \n> these are the time that try man's will \n >hello ---------------";

echo Markdown::html( $myText, "full" );



