const test=require('tape')
const ecco = require("../");
const d3 = require('d3') ,
    JSDOM = require( 'jsdom' ).JSDOM,
    doc = "<html><body><div id='basic'</body>"

const jsdom = new JSDOM( doc, { runScripts: "outside-only" } );
const document = jsdom.window.document;

test('passing test', function(){
    const t = new ecco.TextHighlighter()
    let d = d3.select( document )
    console.log(t)
})