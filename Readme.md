# Fixie.js

Fixie is an open source tool that that automatically adds filler content to HTML documents.

To learn more, check out  [fixiejs.com](http://www.fixiejs.com "fixiejs") 

## Instructions

**Step 1 - Add fixie.js** 

Add `<script type="text/javascript" src="fixie.js"></script>` to the bottom of your html document, right before your closing `</body>` tag.

**Step 2 - Add the `fixie` class.** 

Wherever you need filler content, set `class="fixie"`.

For example, if you wanted one filler paragraph, you could use
`<p class="fixie"></p>`

### Supported Elements
Fixie inserts the right type of content based on the tag name. Here are some major types you should be aware of:

- `<h1 class="fixie"></h1>` - Adds a few words of text. Same goes for `h2 - h6`
- `<p class="fixie"></p>` - Adds a paragraph of text.
- `<article class="fixie"></article>` - Adds several paragraphs of text.
- `<section class="fixie"></section>` - Adds several paragraphs of text.
- `<img class="fixie"></img>` - Adds an image which displays the width and height of the image.
- `<a class="fixie"></a>` - Adds a randomly named link.

