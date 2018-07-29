buster.spec.expose(); // Make some functions global

buster.assertions.add("isBetween", {
    assert: function (min, max, actual) {
        return min <= actual && actual <= max;
    },
    assertMessage: "Expected ${2} to belower ${0} and larger ${1}!",
});

var random = Math.random;

describe("fixie minimal", function () {
   
    before(function(){
        Math.random = function(){return 0};
    });

    after(function(){
        Math.random = random;
    });

    ['b','em','strong','button','th','td','title','tr'].forEach(function(tagName){

        it("should fill a &lt;" + tagName + "&gt; with 1 word", function () {
             createElementAndTestWordCount(tagName, isSame(1));
        }); 
    });


        
    ['header', 'cite', 'caption', 'mark', 'q', 's', 'u', 'small', 'span', 'code', 'pre', 'li', 'dt', 'h1', 'h2', 'h3', 'h4',  'h5', 'h6'].forEach(function(tagName){

        it("should fill a &lt;" + tagName + "&gt; with  3 words", function () {
             createElementAndTestWordCount(tagName, isSame(3));
        });
    });

    ['footer', 'aside', 'summary', 'blockquote', 'p'].forEach(function(tagName){

        it("should fill a &lt;" + tagName + "&gt; with  3 sentences  with 3 words", function () {
             createElementAndTestSentecesAndWordCount(tagName, isSame(3), isSame(4));
        });
    });

    ['article', 'section'].forEach(function(tagName){

        it("should fill a &lt;" + tagName + "&gt; with  3 paragraphs with 3 sentences  with 3 words" + tagName + "&gt;", function () {
             createElementAndTestParagraphAndSentecesAndWordCount(tagName, isSame(3), isSame(3), isSame(4));
        });
    });

    it("should fill a &lt;dl&gt; with  a pair of 3 dt/dd", function () {
        var el = createElementAndInitFixie('dl');
        assert.same(3, el.getElementsByTagName('dd').length);
        assert.same(3, el.getElementsByTagName('dt').length);
        el.parentNode.removeChild(el);
    });


    it("should not fill a &lt;hr&gt;", function () {
        var el = createElementAndInitFixie('hr');
        assert.same('', el.innerHTML);
        el.parentNode.removeChild(el);
    });

     ['ol', 'ul'].forEach(function(tagName){
        it("should fill a &lt;" + tagName + "&gt; with  4 li", function () {
            var el = createElementAndInitFixie(tagName);
            assert.same(el.getElementsByTagName('li').length, 4);
            el.parentNode.removeChild(el);
        });
    });
});

describe("fixie maximal", function () {

    before(function(){
        Math.random = function(){return 1};
    });

    after(function(){
        Math.random = random;
    });
        
        ['header', 'cite', 'caption', 'mark', 'q', 's', 'u', 'small', 'span', 'code', 'pre', 'li', 'dt', 'h1', 'h2', 'h3', 'h4',  'h5', 'h6'].forEach(function(tagName){

            it("should fill a &lt;" + tagName + "&gt; with  5 words", function () {
                 createElementAndTestWordCount(tagName, isSame(7));
            });
        });

        ['footer', 'aside', 'summary', 'blockquote', 'p'].forEach(function(tagName){

            it("should fill a &lt;" + tagName + "&gt; with  7 sentences  with 9 words", function () {
                 createElementAndTestSentecesAndWordCount(tagName, isSame(7), isSame(9));
            });
        });

        ['article', 'section'].forEach(function(tagName){

            it("should fill a &lt;" + tagName + "&gt; with  7 paragraphs with 7 sentences  with 9 words", function () {
                 createElementAndTestParagraphAndSentecesAndWordCount(tagName, isSame(7), isSame(7), isSame(9));
            });
        });


    it("should fill a &lt;dl&gt; with  a pair of 5 dt/dd", function () {
        var el = createElementAndInitFixie('dl');
                console.log(el.getElementsByTagName('dd'))
        console.log(el.getElementsByTagName('dt'))
        assert.same(el.getElementsByTagName('dd').length, 5);
        assert.same(el.getElementsByTagName('dt').length, 5);
        el.parentNode.removeChild(el);
    });

    ['ol', 'ul'].forEach(function(tagName){
        it("should fill a &lt;" + tagName + "&gt; with  8 li", function () {
            var el = createElementAndInitFixie(tagName);
            assert.same(el.getElementsByTagName('li').length, 8);
            el.parentNode.removeChild(el);
        });
    });
});



function isSame(excpected){
    return function(actual) {assert(excpected, actual)};
}

function createElementAndTestWordCount(tagName, func){
    var el = createElementAndInitFixie(tagName);

    func(el.innerHTML.split(' ').length);
    el.parentNode.removeChild(el);
}

function createElementAndTestSentecesAndWordCount(tagName, testSentences, testSingleSentence){
    var el = createElementAndInitFixie(tagName);

    var sentences = el.innerHTML.split('. ')
    testSentences(sentences.length);
    sentences.forEach(function(sentence) {
        testSingleSentence(sentence.split(' ').length);
    })
    el.parentNode.removeChild(el);
}

function createElementAndTestParagraphAndSentecesAndWordCount(tagName, testParagraphs, testSentences, testSingleSentence){
    var el = createElementAndInitFixie(tagName);
    var paragraphs = el.getElementsByTagName('p');
    var length = paragraphs.length;
    testParagraphs(length);
    for (var i=0; i < length; i++) {
        var paragraph = paragraphs[i];
        var sentences = paragraph.innerHTML.split('. ')
        testSentences(sentences.length);
        sentences.forEach(function(sentence) {
            testSingleSentence(sentence.split(' ').length);
        })
    }
    
    el.parentNode.removeChild(el);
}

function createElementAndInitFixie(tagName){
    var el = document.createElement(tagName);
    document.body.appendChild(el);
    el.className = 'fixie';
    fixie.init()
    return el;
}

