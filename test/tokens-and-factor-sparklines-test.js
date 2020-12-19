const test = require('tape')
const ecco = require("../");
const d3 = require('d3'),
    JSDOM = require('jsdom').JSDOM, doc = "<html>" +
    "<body><link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css\" integrity=\"sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2\" crossorigin=\"anonymous\">\n<link id='css' rel=\"stylesheet\" type=\"text/css\" href=\"https://storage.googleapis.com/ml-intro/ecco/html/styles.css\"><div id='basic'></div></body></html>"


const fs = require("fs")
const window = (new JSDOM(doc, {
    runScripts: "outside-only"
})).window;
// This is global because the tests will look for it in the global scope
document = window.document;

test.onFinish(function () {

    console.log(33)
    let dom = newDocument(doc)
    document = dom.window.document
    console.log(2)
    d3.select(document.head).insert('script').attr('src', 'https://requirejs.org/docs/release/2.3.6/minified/require.js')

    d3.select(document.head).insert('link')
        .attr('rel', 'stylesheet')
        .attr('type', 'text/css')
        .attr('href', '../../dev/dev-styles.css')


    d3.select(document.head).append('script').html(`
        requirejs.config({
            nodeRequire: require,
            paths: {
                d3: "https://d3js.org/d3.v5.min",
                "d3-array": "https://d3js.org/d3-array.v2.min",
                jquery: "https://code.jquery.com/jquery-3.5.1.min",
                katex: "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min",
                ecco: '../../dist/ecco-bundle.min',
                xregexp: 'https://cdnjs.cloudflare.com/ajax/libs/xregexp/3.2.0/xregexp-all.min'
            }
        });
    `);


    d3.select(document.body).append('script').html(`
    require(['ecco'], function(ecco){
    let data = ${JSON.stringify(data)}
    let viz = ecco.interactiveTokensAndFactorSparklines(data['parentDiv'], data['data'])
    
    })
    `)

    const dir = './test/tmp';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    fs.writeFile(dir + '/tokens-and-factor-sparlines-preview.html', dom.serialize(), function (err) {
        if (err) return console.log(err);
        // console.log(preview_text, '>> preview.html');
    });


})


const data = {
    parentDiv: 'basic',
    data:
        {
            "tokens":
                [{"token": "1", "token_id": 16, "type": "input", "position": 0}, {
                    "token": ".",
                    "token_id": 13,
                    "type": "input",
                    "position": 1
                }, {"token": " Austria", "token_id": 17322, "type": "input", "position": 2}, {
                    "token": " 2",
                    "token_id": 362,
                    "type": "input",
                    "position": 3
                }, {"token": ".", "token_id": 13, "type": "input", "position": 4}, {
                    "token": " Belgium",
                    "token_id": 15664,
                    "type": "input",
                    "position": 5
                }, {"token": " 3", "token_id": 513, "type": "input", "position": 6}, {
                    "token": ".",
                    "token_id": 13,
                    "type": "input",
                    "position": 7
                }, {"token": " Brazil", "token_id": 7595, "type": "output", "position": 8}, {
                    "token": " 4",
                    "token_id": 604,
                    "type": "output",
                    "position": 9
                }, {"token": ".", "token_id": 13, "type": "output", "position": 10}, {
                    "token": " Hungary",
                    "token_id": 19562,
                    "type": "output",
                    "position": 11
                }, {"token": " 5", "token_id": 642, "type": "output", "position": 12}, {
                    "token": ".",
                    "token_id": 13,
                    "type": "output",
                    "position": 13
                }, {"token": " Romania", "token_id": 23356, "type": "output", "position": 14}, {
                    "token": " 6",
                    "token_id": 718,
                    "type": "output",
                    "position": 15
                }, {"token": ".", "token_id": 13, "type": "output", "position": 16}, {
                    "token": " Luxembourg",
                    "token_id": 31864,
                    "type": "output",
                    "position": 17
                }, {"token": " 7", "token_id": 767, "type": "output", "position": 18}, {
                    "token": ".",
                    "token_id": 13,
                    "type": "output",
                    "position": 19
                }, {"token": " Slovakia", "token_id": 36839, "type": "output", "position": 20}, {
                    "token": " 8",
                    "token_id": 807,
                    "type": "output",
                    "position": 21
                }, {"token": ".", "token_id": 13, "type": "output", "position": 22}], "factors":
                [[[0.71489018201828, 0.006667452398687601, 0.003667355515062809, 0.005043760873377323, 0.0034792565274983644, 0.0030035299714654684, 0.0003433529054746032, 0.0, 0.0, 0.00013966819096822292, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.06660683453083038, 0.3081618845462799, 0.0898173451423645, 0.010414528660476208, 0.31033679842948914, 0.016095926985144615, 0.0, 0.0, 0.33293431997299194, 0.0, 0.0, 0.38164541125297546, 0.0, 0.0001627467863727361, 0.41963979601860046, 0.0, 0.0, 0.3915499150753021, 0.0, 0.0, 0.41347599029541016, 0.0], [0.0, 0.31258144974708557, 0.02254503220319748, 0.11419273912906647, 0.5609351992607117, 0.03109837882220745, 0.05376078188419342, 0.7198453545570374, 0.7198453545570374, 0.03701147064566612, 0.018083224073052406, 0.7082385420799255, 0.014520344324409962, 0.0, 0.7180771231651306, 0.0, 0.0, 0.6955192685127258, 0.0, 0.0, 0.681247889995575, 0.0, 0.0], [0.0, 0.040142398327589035, 0.018367629498243332, 0.18321692943572998, 0.0398915559053421, 0.0400778166949749, 0.4401678144931793, 0.0, 0.0, 0.022631103172898293, 0.5115559697151184, 0.0, 0.006313132122159004, 0.536361813545227, 0.0, 0.0, 0.5395328998565674, 0.002620420418679714, 0.0, 0.5544126033782959, 0.0, 0.0, 0.5549296736717224]]]
        }
}