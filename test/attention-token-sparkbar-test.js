const test = require('tape')
const ecco = require("../");
const d3 = require('d3'),
    JSDOM = require('jsdom').JSDOM,
    doc = "<html>" +
        "<body><link id='css' rel=\"stylesheet\" type=\"text/css\" href=\"https://storage.googleapis.com/ml-intro/ecco/html/styles.css\"><div id='basic'></div></body></html>",
    data_1 = {
        parentDiv: 'basic',
        data:
            {
                'tokens': [{
                    'token': 'The',
                    'token_id': 464,
                    'type': 'input',
                    'value': '0.68242383',
                    'position': 0
                }, {
                    'token': ' keys',
                    'token_id': 8251,
                    'type': 'input',
                    'value': '0.16033325',
                    'position': 1
                }, {
                    'token': ' to',
                    'token_id': 284,
                    'type': 'input',
                    'value': '0.0663973',
                    'position': 2
                }, {
                    'token': ' the',
                    'token_id': 262,
                    'type': 'input',
                    'value': '0.05090522',
                    'position': 3
                }, {
                    'token': ' cabinet',
                    'token_id': 13447,
                    'type': 'input',
                    'value': '0.03994041',
                    'position': 4
                }, {'token': ' are', 'token_id': 389, 'type': 'output', 'value': '0', 'position': 5}],
                'attentions': [[1.0, 0.0, 0.0, 0.0, 0.0],
                    [0.8602287173271179, 0.13977131247520447, 0.0, 0.0, 0.0], [0.7360638380050659, 0.15531973540782928, 0.1086164265871048, 0.0, 0.0], [0.7195126414299011, 0.10458766669034958, 0.12247469276189804, 0.05342503637075424, 0.0], [0.6824238300323486, 0.16033324599266052, 0.0663973018527031, 0.050905220210552216, 0.03994040936231613]]
            }
    },

    newDocument = function (doc) {
        return (new JSDOM(doc, {
            runScripts: "outside-only"
        }));
    }


const fs = require("fs")
let preview_text = ''


let rawdata = fs.readFileSync('./test/data/distilgpt_attentions_1606375870000.json');

let data_2 = Object.assign({},data_1)
data_2.data = JSON.parse(rawdata);

test('AttentionTokenSparkbar.init() creates token boxes', function (test) {

    let dom = newDocument(doc)
    document = dom.window.document
    let attention = new ecco.AttentionTokenSparkbar(data_1)
    attention.init()
    test.equals(attention.innerDiv
        .selectAll('div.token').size(), 6, "Six token boxes correctly created")

    preview_text = preview_text + dom.serialize() + "<div style='clear:both'></div><br />"
    test.end()
})


test('AttentionTokenSparkbar.init() sets up interactions for all except first token',
    function (test) {
        let dom = newDocument(doc)
        document = dom.window.document
        let attention = new ecco.AttentionTokenSparkbar(data_1)
        attention.init()

        attention.innerDiv
            .selectAll('div.token').each(function (d, i) {
            if (i === 0) {
                test.ok(typeof this.__on == "undefined", "first token has no event listener")
            } else {
                test.ok(typeof this.__on != "undefined", "token " + i + " has an event listener")
            }

        })

        preview_text = preview_text + dom.serialize() + "<br />"
        test.end()
    })

test.onFinish(function () {

    // Create preview html file:
    console.log(44)
    let dom = newDocument(doc)
    document = dom.window.document
    // console.log(2)
    d3.select(document.head).insert('script').attr('src', 'https://requirejs.org/docs/release/2.3.6/minified/require.js')

    d3.select(document.head).insert('link')
        .attr('rel','stylesheet' )
        .attr('type','text/css' )
        .attr('href', '../../dev/dev-styles.css')

    // console.log(3)
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
    let data_1 = ${ JSON.stringify(data_2) }
    let attention = new ecco.AttentionTokenSparkbar(data_1)
    attention.init()
    })
    `)

    const dir = './test/tmp';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    fs.writeFile(dir + '/attention-token-sparkbar-previews.html', dom.serialize(), function (err) {
        if (err) return console.log(err);
        // console.log(preview_text, '>> preview.html');
    });
})