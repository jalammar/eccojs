const test=require('tape')
const ecco = require("../");
const d3 = require('d3') ,
    JSDOM = require( 'jsdom' ).JSDOM,
    doc = "<html><body><div id='basic'></div></body></html>",
    data_1 = {
        parentDiv: 'basic',
        data: {tokens:[
                {token:' hi', type: 'input', position:0},
                {token:' there', type:'output', position:1 },
                {token:' friend', type:'output', position:2 }
            ]}
    }
const window = (new JSDOM( doc, {
    runScripts: "outside-only"
} )).window;
// This is global because the tests will look for it in the global scope
document = window.document;

test('TextHighlighter.init() creates the correct number of tokens and input/output indicators', function(test){
    const t = new ecco.TextHighlighter(data_1)
    t.init()
    // console.log(document.body.innerHTML)
    // console.log(44, t.innerDiv.selectAll('.sequence-indicator').size())
    test.equals(t.innerDiv.selectAll('.sequence-indicator').size(),
        2,
        "'input' and 'output' sequence indicators were created.")
    test.equals(t.innerDiv.selectAll('.token').size(), 3,
        "Three token divs correctly created.") // 3 tokens in the initializer
    test.end()

})

test('TextHighlighter.addToken()', function(test){
    const t = new ecco.TextHighlighter(data_1)
    t.init()
    t.addToken({token:' !', type:'output', position:3 })
    t.redraw()

    test.equals(t.innerDiv.selectAll('.token').size(), 4,
        "Adding a token adds a div.")
    test.end()
})