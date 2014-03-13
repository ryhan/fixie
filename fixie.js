/* 
 * Fixie.js
 * by Ryhan Hassan
 * ryhanh@me.com
 *
 * Automagically adds filler content
 * whenever an element has class="fixie".
 * Hope you find it useful :)
 */
var fixie = (
function () {

	var selector;
	var imagePlaceHolder = "http://placehold.it/${w}x${h}&text=${text}";

	if (typeof document.getElementsByClassName != 'function') {
		document.getElementsByClassName = function (cl) {
			var retnode = [];
			var myclass = new RegExp('\\b' + cl + '\\b');
			var elem = this.getElementsByTagName('*');
			for (var i = 0; i < elem.length; i++) {
				var classes = elem[i].className;
				if (myclass.test(classes)) retnode.push(elem[i]);
			}
			return retnode;
		};
	}

	/*
	 * Spec
	 * Here are some functions you might find useful
	 *
	 * fixie_handler(element)
	 * fixie_handle_elements(elements)
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
	function fixie_handler(element) {
			if (!/^\s*$/.test(element.innerHTML)){
				var childs = element.children;
				if(childs.length){
					for(var fixie_i = 0; fixie_i < childs.length; fixie_i++){
						fixie_handler(childs[fixie_i]);
					}
				}
				return;
			}
			switch (element.nodeName.toLowerCase()) {
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

			// Special cases
			case 'a':
				element.href = "http://ryhan.me/";
				element.innerHTML = "www." + fixie_fetchWord() + fixie_capitalize(fixie_fetchWord()) + ".com";
				break;

			case 'img':
				var src = element.getAttribute('src') || element.src;
				var temp = element.getAttribute('fixie-temp-img');
				if(src == "" || src == null || temp == true || temp == "true"){
					var width = element.getAttribute('width') || element.width || (element.width = 250);
					var height = element.getAttribute('height') || element.height || (element.height = 100);
					var title = element.getAttribute('title') || '';
					element.src = imagePlaceHolder.replace('${w}', width).replace('${h}', height).replace('${text}', title);
					element.setAttribute('fixie-temp-img', true);
				}
				break;

			case 'ol':
			case 'ul':
				element.innerHTML = fixie_fetchList();
				break;

			case 'dl':
				element.innerHTML = fixie_fetchDefinitionList();
				break;

			case 'hr':
				break;

			default:
				element.innerHTML = fixie_fetchSentence();
			}
	}

	// Handle an array of elements
	function fixie_handle_elements(elements){
		for (var i = 0; i < elements.length; i++) {
			fixie_handler(elements[i]);
		}
	}

	// Begin generator

	// This is a "feature" that doesn't
	// come with the default plugin.
	// Added Veganipsum dictionary as default
	// You can change it back to the fixieipsum changing the 'libraryKey'
	var fixie_wordlibrary = {};
	var libraryKey = 'veganipsum';
	fixie_wordlibrary.fixieipsum = ["I", "8-bit", "ethical", "reprehenderit", "delectus", "non", "latte", "fixie", "mollit", "authentic", "1982", "moon", "helvetica", "dreamcatcher", "esse", "vinyl", "nulla", "Carles", "bushwick", "bronson", "clothesline", "fin", "frado", "jug", "kale", "organic", "local", "fresh", "tassel", "liberal", "art", "the", "of", "bennie", "chowder", "daisy", "gluten", "hog", "capitalism", "is", "vegan", "ut", "farm-to-table", "etsy", "incididunt", "sunt", "twee", "yr", "before", "gentrify", "whatever", "wes", "Anderson", "chillwave", "dubstep", "sriracha", "voluptate", "pour-over", "esse", "trust-fund", "Pinterest", "Instagram", "DSLR", "vintage", "dumpster", "totally", "selvage", "gluten-free", "brooklyn", "placeat", "delectus", "sint", "magna", "brony", "pony", "party", "beer", "shot", "narwhal", "salvia", "letterpress", "art", "party", "street-art", "seitan", "anime", "wayfarers", "non-ethical", "viral", "iphone", "anim", "polaroid", "gastropub", "city", 'classy', 'original', 'brew'];
	fixie_wordlibrary.veganipsum = ["Amaranth", "Arugula", "Beet greens", "Bitterleaf", "Bok choy", "Broccoli Rabe", "Brussels sprout", "Cabbage", "Catsear", "Cauliflower", "Celery", "Celtuce", "Ceylon spinach", "Chard", "Chaya", "Chickweed", "Chicory", "Chinese cabbage", "Chinese Mallow", "Chrysanthemum leaves", "Collard greens", "Corn salad", "Cress", "Dandelion", "Endive", "Epazote", "Fat hen", "Fiddlehead", "Fluted pumpkin", "Garden Rocket", "Golden samphire", "Good King Henry", "Greater Plantain", "Kai-lan", "Kale", "Komatsuna", "Kuka", "Lagos bologi", "Lamb's lettuce", "Land cress", "Lettuce", "Lizard's tail", "Melokhia", "Miner's Lettuce", "Mizuna greens", "Mustard", "Napa cabbage", "New Zealand Spinach", "Orache", "Pak choy", "Paracress", "Pea sprouts", "leaves", "Polk", "Radicchio", "Samphire", "Sea beet", "Sea kale", "Sierra Leone bologi", "Soko", "Sorrel", "Spinach", "Summer purslane", "Swiss chard", "Tatsoi", "Turnip greens", "Watercress", "Water spinach", "Winter purslane", "Yarrow", "Avocado", "Bell pepper", "Bitter melon", "Bitter gourd", "Courgette", "Cucumber", "Eggplant", "Aubergine", "Brinjal", "Pumpkin", "Squash", "Sweet corn aka corn; aka maize", "Sweet pepper", "Tinda", "Tomatillo", "Tomato", "Winter melon", "West Indian gherkin", "Zucchini", "American groundnut", "Azuki bean", "Black-eyed pea", "Chickpea", "Common bean", "Drumstick", "Dolichos bean", "Fava bean", "Garbanzo", "Green bean", "Guar", "Gumbo", "Horse gram", "Indian pea", "Lentil", "Lima Bean", "Moth bean", "Mung bean", "Okra", "Pea", "Peanut", "Pigeon pea", "Ricebean", "Runner bean", "Soybean", "Tarwi", "Tepary bean", "Urad bean", "Velvet bean", "Winged bean", "Yardlong bean", "Ahipa", "Arracacha", "Bamboo shoot", "Beetroot", "Burdock", "Broadleaf arrowhead", "Camas", "Canna", "Carrot", "Cassava", "Chinese artichoke", "Daikon", "Earthnut pea", "Elephant Foot yam", "Ensete", "Ginger", "Gobo", "Hamburg parsley", "Jerusalem artichoke", "Jícama", "Manioc", "Mooli", "Parsnip", "Pignut", "Plectranthus", "Potato", "Prairie turnip", "Radish", "Horseradish", "Rutabaga", "Salsify", "Scorzonera", "Skirret", "Swede", "Sweet Potato or Kumara", "Taro", "Ti", "Tigernut", "Turnip", "Ulluco", "Water chestnut", "Yacón", "Yam", "Asparagus", "Cardoon", "Celeriac", "Celery", "Elephant Garlic", "Florence fennel", "Garlic", "Kohlrabi", "Kurrat", "Leek", "Lotus root", "Nopal", "Onion", "Spring Onion", "Scallion", "Prussian asparagus", "Shallot", "Welsh onion", "Wild leek"];

	function fixie_capitalize(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function fixie_fetchWord() {
		return fixie_wordlibrary[libraryKey][constrain(0, fixie_wordlibrary[libraryKey].length - 1 )];
	}

	function constrain(min, max){
		 return Math.round(Math.random() * (max - min) + min);
	}

	function fixie_fetch(min, max, func, join) {
		join || (join = ' ');
		var fixie_length = constrain(min, max);
		var result = [];
		for (var fixie_i = 0; fixie_i < fixie_length; fixie_i++) {
			result.push(func());
		}
		return fixie_capitalize(result.join(join));
	}

	function fetch_suroundWithTag(min, max, func, tagName) {
		var startTag = '<' + tagName + '>';
		var endTag = '</' + tagName + '>';
		return startTag + fixie_fetch(min, max, func, endTag + startTag) + endTag;
	}

	function fixie_fetchPhrase() {
		return fixie_fetch(3, 5, fixie_fetchWord);
	}

	function fixie_fetchSentence() {
		return fixie_fetch(4, 9, fixie_fetchWord) + '.';
	}

	function fixie_fetchParagraph() {
		return fixie_fetch(3, 7, fixie_fetchSentence);
	}

	function fixie_fetchParagraphs() {
		return fetch_suroundWithTag(3, 7, fixie_fetchParagraph, 'p');
	}

	function fixie_fetchList() {
		return fetch_suroundWithTag(4, 8, fixie_fetchPhrase, 'li');
	}

	function fixie_fetchDefinitionList() {
		var html = ''
		for (var i = 0, l = constrain(3,5); i < l; i++) {
			html += fetch_suroundWithTag(1, 1, fixie_fetchPhrase, 'dt') + fetch_suroundWithTag(1, 1, fixie_fetchPhrase, 'dd');
		}
		console.log(html)
		return html;
	}

	// Handle all elements with class 'fixie'
	fixie_handle_elements(document.getElementsByClassName('fixie'));

	// Handle elements which match give css selectors
	function init_str(selector_str) {
		if (!document.querySelectorAll) {
			return false;
		}
		try {
			fixie_handle_elements(document.querySelectorAll(selector_str));
			return true;
		}
		catch (err) {
			return false;
		}
	}

	return {
		// Returns true if successful, false otherwise.
		'init': function() {
			if (selector) {
				init_str(selector);
			} else {
				fixie_handle_elements(document.getElementsByClassName('fixie'));
			}
		},
		'setImagePlaceholder': function(pl) {
			imagePlaceHolder = pl;
			return this;
		},
		'setSelector': function(sl){
				if (typeof sl === "object") {
						selector = sl.join(",");
				} else if (sl){
						selector = sl;
				}
				return this;
		}
	};

})();
