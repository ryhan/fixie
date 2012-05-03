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

### Step 2 - Add the `data-fixie` atrribute and set it to true. `data-fixie="true"`

Wherever you need filler content, add `data-fixie="true"`.

For example, if you wanted one filler paragraph, you could use
`<p data-fixie="true"></p>`

## Supported Elements
Fixie inserts the right type of content based on the tag name. Here are some major types you should be aware of:

- `<h1 data-fixie="true"></h1>` - Adds a few words of text. Same goes for `h2 - h6`
- `<p data-fixie="true"></p>` - Adds a paragraph of text.
- `<article data-fixie="true"></article>` - Adds several paragraphs of text.
- `<section data-fixie="true"></section>` - Adds several paragraphs of text.
- `<img data-fixie="true"></img>` - Adds an image which displays the width and height of the image.
- `<a data-fixie="true"></a>` - Adds a randomly named link.

## Tips

### Flagging filler content
When you start adding real copy to your page, try adding the following CSS to your stylesheet:

`.fixie{ border:4px solid red; }`

This CSS will highlight all of your dummy content, making it easier to make sure you didn't miss anything.

### Special functions
you want to dynamically insert content.
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

