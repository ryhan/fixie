buster.spec.expose(); // Make some functions global

buster.assertions.add("isBetween", {
    assert: function (min, max, actual) {
        return min <= actual && actual <= max;
    },
    assertMessage: "Expected ${2} to belower ${0} and larger ${1}!",
});

describe("should fill ", function () {

    ['b','em','strong','button','th','td','title','tr'].forEach(function(tagName){

        it("&lt;" + tagName + "&gt; with one word", function () {
             createElementAndTestWordCount(tagName, isSame(1));
        }); 
    });

    ['header', 'cite', 'caption', 'mark', 'q', 's', 'u', 'small', 'span', 'code', 'pre', 'li', 'dt', 'h1', 'h2', 'h3', 'h4',  'h5', 'h6'].forEach(function(tagName){

        it("&lt;" + tagName + "&gt; with 3 - 5 words", function () {
             createElementAndTestWordCount(tagName, isBetween(3, 5));
        });
    });

    ['footer', 'aside', 'summary', 'blockquote', 'p'].forEach(function(tagName){

        it("&lt;" + tagName + "&gt; with 3-7 sentences  with 3-5 words", function () {
             createElementAndTestSentecesAndWordCount(tagName, isBetween(3, 7), isBetween(4, 9));
        });
    });

    ['article', 'section'].forEach(function(tagName){

        it("&lt;" + tagName + "&gt; with 3-7 paragraphs with 3-7 sentences  with 3-5 words", function () {
             createElementAndTestParagraphAndSentecesAndWordCount(tagName, isBetween(3, 7), isBetween(3, 7), isBetween(4, 9));
        });
    })

});

function isBetween(min, max) {
    return function(actual) {assert.isBetween(min, max, actual);}
}

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

