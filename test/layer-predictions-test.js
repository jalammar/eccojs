const test = require('tape'),
    ecco = require("../"),
    d3 = require('d3'),
    JSDOM = require('jsdom').JSDOM,
    doc = "<html><body><svg id='basic'></svg></body></html>",
    doc_2 = "<html><body><div id='basic'></div></body></html>",
    data_1 = {
        parentDiv: 'basic',
        data: {
            tokens: [
                {token: ' hi', prob: 0.5, ranking: 1}
            ]
        }
    },
    data_2 = {
        parentDiv: 'basic',
        data: [[
            {token: ' one', prob: 1, ranking: 1},
            {token: 'one partial', prob: 0.5, ranking: 2},
            {token: 'one', prob: 0.3, ranking: 3},
            {token: ' friend', prob: 0.2, ranking: 4},
            {token: 'friend', prob: 0.00001, ranking: 5}
        ]]
    },
    data_3 = {
        parentDiv: 'basic',
        data: [[
            {token: ' one', prob: 0.3, ranking: 1},
            {token: 'one', prob: 0.2, ranking: 2},
            {token: ' friend', prob: 0.1, ranking: 3}
        ],
            [
            {token: ' hi', prob: 0.5, ranking: 1},
            {token: ' there', prob: 0.3, ranking: 2},
            {token: ' friend', prob: 0.2, ranking: 3}
        ]]
    }
    newDocument = function(doc){
    return (new JSDOM(doc, {
            runScripts: "outside-only"
        })).window.document;
    }
let data_4 = Object.assign({},data_3)
let tokens_4=[]
for( layer = 0 ; layer <3; layer ++){
    let group = []
    for (n_token = 0; n_token < 20; n_token ++){
        group.push({
            token: (10**n_token).toString(), prob: 0.1, ranking: n_token + 1,
            layer: layer
        })
    }
    tokens_4.push(group)
}
data_4.data = tokens_4

const fs = require("fs")
let preview_text = ''

test('LogitBox.draw() creates a logit box', function (test) {
    document = newDocument(doc)
    console.log(0)
    const logit = new ecco.LogitBox(),
        g = d3.select(document).select('svg').append("g");
    g.selectAll('g')
        .data(data_1.data.tokens)
        .join('g')
        .call(logit.draw.bind(logit))

    // console.log(document.body.innerHTML)
    test.equals(g.selectAll('rect.logit').size(), 1,
        "Correctly created svg group")

    test.equals(g.selectAll('text.token-text').size(), 1,
        "Correctly created text element for tokens")
    // logit.draw()
    preview_text =preview_text+ document.body.innerHTML + "<br />"

    console.log('-----', preview_text)
    test.end()
})


test('LayerPredictions.draw() ', function (test) {
    document = newDocument(doc_2)

    const layerPred = new ecco.LayerPredictions(data_2);

    layerPred.init()

    // console.log('[[[[[', preview_text)
    preview_text =preview_text+ document.body.innerHTML + "<br />"
    console.log(d3.select(layerPred.innerDiv).size())
    test.end()
})


test('LayerPredictions.draw() two layers', function (test) {
    document = newDocument(doc_2)

    const layerPred = new ecco.LayerPredictions(data_3);

    layerPred.init()

    // console.log('[[[[[', document.body.innerHTML)
    preview_text =preview_text+ document.body.innerHTML + "<br />"

    console.log(d3.select(layerPred.innerDiv).size())
    test.end()
})



test('LayerPredictions.draw() three layers 15 tokens each', function (test) {
    document = newDocument(doc_2)

    const layerPred = new ecco.LayerPredictions(data_4);

    layerPred.init()

    preview_text =preview_text+ document.body.innerHTML + "<br />"

    console.log(d3.select(layerPred.innerDiv).size())
    test.end()
})


test.onFinish(function(){

    const dir = './test/tmp';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    fs.writeFile(dir + '/previews.html', preview_text, function (err) {
        if (err) return console.log(err);
        // console.log(preview_text, '>> preview.html');
    });
})