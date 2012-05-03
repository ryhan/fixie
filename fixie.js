/* 
 * Fixie.js
 * by Ryhan Hassan
 * ryhanh@me.com
 *
 * Automagically adds filler content
 * whenever an element has class="fixie".
 * Hope you find it useful :)
 */


function fixie(){
	var to_be_fixied = document.getElementsByClassName('fixie');
	for (var fixie_i = 0; fixie_i <to_be_fixied.length; fixie_i++){
		fixie_handler(to_be_fixied[fixie_i]);
	}
	return true;
}



/* 
 * Spec
 * Here are some functions you might find useful
 * 
 * fixie_fetchWord();
 * fixie_fetchPhrase();
 * fixie_fetchSentence();
 * fixie_fetchParagraph();
 * fixie_fetchParagraphs();
 *
 */


/* 
 * fixie_handler(element)
 *
 * Takes in an element and adds filler content.
 * Returns false if tag is unrecognized.
 */
function fixie_handler(element){
 	switch(element.nodeName.toLowerCase()){
 		case 'b':
 		case 'em':
 		case 'strong':
 		case 'button':
 		case 'th':
 		case 'td':
 		case 'title':
 		case 'tr':
 			element.innerHTML = fixie_fetchWord();
 			break;

 		case 'header':
 		case 'cite':
 		case 'caption':
 		case 'mark':
 		case 'q':
 		case 's':
 		case 'u':
 		case 'small':
 		case 'span':
 		case 'code':
 		case 'pre':
 		case 'li':
 		case 'dt':
 		case 'h1':
 		case 'h2':
 		case 'h3':
 		case 'h4':
 		case 'h5':
 		case 'h6':
 			element.innerHTML = fixie_fetchPhrase();
 			break;

 		case 'footer':
 		case 'aside':
 		case 'summary':
 		case 'blockquote':
 		case 'p':
 			element.innerHTML = fixie_fetchParagraph();
 			break;

 		case 'article':
 		case 'section':

 			element.innerHTML = fixie_fetchParagraphs()
 			break;

 		/* Special cases */
 		case 'a':
 			element.href = "http://ryhan.me/";
 			element.innerHTML = "www." + fixie_fetchWord() + fixie_capitalize(fixie_fetchWord()) + ".com";
 			break;
 		
 		case 'img':
 			if (element.width ==0){
 				element.width = element.height; 
 			}
 			if (element.height ==0){
 				element.height= element.width; 
 			}
 			if (element.height ==0){
 				element.height= 100;
 				element.width= 250;
 			}
 			element.src = "http://placehold.it/" + element.width + "x" + element.height;
 			break;

 		default:
 			element.innerHTML = fixie_fetchSentence();
 			return false;
 	}
 	return true;
 }


var fixie_wordlibrary = [
	"I", "8-bit", "ethical", "reprehenderit", 
	"delectus", "non", "latte", "fixie",
	"mollit", "authentic", "1982", "moon",
	"helvetica", "dreamcatcher", "esse", "vinyl",
	"nulla", "Carles", "bushwick", "bronson",
	"clothesline", "fin", "frado", "jug",
	"kale", "organic", "local", "fresh",
	"tassel", "liberal", "art", "the",
	"of", "bennie", "chowder", "daisy",
	"gluten", "hog", "capitalism", "is",
	"vegan", "ut", "farm-to-table", "etsy",
	"incididunt", "sunt", "twee", "yr", "before",
	"gentrify", "whatever", "wes", "Anderson",
	"chillwave", "dubstep", "sriracha", "voluptate",
	"pour-over", "esse", "trust-fund", "Pinterest",
	"Instagram", "DSLR", "vintage", "dumpster",
	"totally", "selvage", "gluten-free", "brooklyn",
	"placeat", "delectus", "sint", "magna",
	"brony", "pony", "party", "beer", "shot",
	"narwhal", "salvia", "letterpress", "art",
	"party", "street-art", "seitan", "anime",
	"wayfarers", "non-ethical", "viral",
	"iphone", "anim", "polaroid", "gastropub",
	"city", 'classy', 'original', 'brew'
]

function fixie_capitalize(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function fixie_fetchWord(){
	return fixie_wordlibrary[Math.round(Math.random()*(fixie_wordlibrary.length -1))];
}
function fixie_fetchPhrase(){
	var fixie_length = Math.round(Math.random()*2 + 3);
	var fixie_str = "";
	for (var fixie_i=0; fixie_i<fixie_length -1; fixie_i++){
		fixie_str += fixie_fetchWord() + " ";
	}
	fixie_str += fixie_fetchWord();
	return fixie_capitalize(fixie_str);
}

function fixie_fetchSentence(){
	var fixie_length = Math.round(Math.random()*5 + 4);
	var fixie_str = "";
	for (var fixie_i=0; fixie_i<fixie_length -1; fixie_i++){
		fixie_str += fixie_fetchWord() + " ";
	}
	fixie_str += fixie_fetchWord() + ".";
	return fixie_capitalize(fixie_str);
}

function fixie_fetchParagraph(){
	var fixie_length = Math.round(Math.random()*4 + 3);
	var fixie_str = "";
	for (var fixie_i=0; fixie_i<fixie_length -1; fixie_i++){
		fixie_str += fixie_fetchSentence() + " ";
	}
	fixie_str += fixie_fetchSentence();
	return fixie_capitalize(fixie_str);
}

function fixie_fetchParagraphs(){
	var fixie_length = Math.round(Math.random()*4 + 3);
	var fixie_str = "";
	for (var fixie_i=0; fixie_i<fixie_length -1; fixie_i++){
		fixie_str += "<p>" + fixie_fetchParagraph() + "</p>";
	}
	return fixie_str;
}

