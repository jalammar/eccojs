const test=require('tape')
const ecco = require("../");
const d3 = require('d3') ,
    JSDOM = require( 'jsdom' ).JSDOM,
    doc = "<html><body><div id='basic'></div></body></html>",
    data_2 = {
        parentDiv: 'basic',
        data: {tokens:[
                {token:' hi', type: 'input', position:0, value:0.80},
                {token:' there', type:'output', position:1, value:0.20 },
                {token:' friend', type:'output', position:2, value:0.00 }
            ],
            attributions:[
                [1],
                [0.8, 0.2]
            ]}
    }
const window = (new JSDOM( doc, {
    runScripts: "outside-only"
} )).window;
// This is global because the tests will look for it in the global scope
document = window.document;

test('InteractiveTokenSparkbar.init() creates', function(test){
    const t = new ecco.InteractiveTokenSparkbar(data_2)

    t.init()

    test.equals(t.innerDiv.selectAll('.sequence-indicator').size(),
        2,
        "'input' and 'output' sequence indicators were created.")
    test.equals(t.innerDiv.selectAll('.token').size(), 3,
        "Three token divs correctly created.") // 3 tokens in the initializer

    test.equals(t.innerDiv.selectAll('svg').size(), 3,
        "three svgs were correctly created")

    console.log(document.body.innerHTML)
    test.equals(t.innerDiv.selectAll('rect').size(), 3,
        "three rect (token sparkbars) were correctly created")
    t.selectFirstToken()

    test.equals(t.innerDiv.select('.output-token').attr("highlighted"), 'true',
        "The first output token was correctly highlighted by selectFirstToken()")

    test.end()
})