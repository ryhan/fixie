# Fixie.js

Fixie is an open source tool that that automatically adds filler content to HTML documents. It's very simple, and we welcome contributions.

To learn more, check out  [fixiejs.com](http://www.fixiejs.com "fixiejs") 

### Why use Fixie?
When designing and developing websites, it's often useful to add lorem ipsum text to see what your page will look like without worrying about your final content.

Unfortunately, adding lots of filler content involves lots of copy-pasting and manual editing, and also makes your HTML unwieldy.

**Fixie.js** makes filler content succinct, making it faster and easier to test out your designs.

## Instructions

### Step 1 - Add fixie.js 

Add `<script type="text/javascript" src="fixie.js"></script>` to the bottom of your html document, right before your closing `</body>` tag.

### Step 2 - Add the `fixie` class.

Wherever you need filler content, set `class="fixie"`.

For example, if you wanted one filler paragraph, you could use
`<p class="fixie"></p>`

### Step 2 - Alternative

Call 
```
fixie.init([".array", "#of .selectors", ".that", ".should", "#be .populated .with .lorem"]) 
```
or 
```
fixie.init(".string, #of .comma .separated .selectors, .that, .should, #be .populated .with .lorem")
```
in the JavaScript console or within a `<script>` tag.

## Supported Elements
Fixie inserts the right type of content based on the tag name. Here are some major types you should be aware of:

- `<h1 class="fixie"></h1>` - Adds a few words of text. Same goes for `h2 - h6`
- `<p class="fixie"></p>` - Adds a paragraph of text.
- `<article class="fixie"></article>` - Adds several paragraphs of text.
- `<section class="fixie"></section>` - Adds several paragraphs of text.
- `<img class="fixie"></img>` - Adds an image which displays the width and height of the image.
- `<a class="fixie"></a>` - Adds a randomly named link.

## Tips
### Specify a class name other than fixie
Just call `fixie("swappy");`

### Flagging filler content
When you start adding real copy to your page, try adding the following CSS to your stylesheet:

`.fixie{ border:4px solid red; }`

This CSS will highlight all of your dummy content, making it easier to make sure you didn't miss anything.

### Special functions
#### `fixie();`
Calling `fixie();` will make fixie.js update elements with class `fixie`. This is useful when you want to dynamically insert content.
####  `fixie_fetchWord();`
Returns a word.
####  `fixie_fetchPhrase();`
Returns several words.
#### `fixie_fetchSentence();`
Returns several words, followed by a period.
#### `fixie_fetchParagraph();`
Returns several sentences.
#### `fixie_fetchParagraphs();`
Returns several paragraphs.

