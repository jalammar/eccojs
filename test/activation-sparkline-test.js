const test = require('tape')
const ecco = require("../");
const d3 = require('d3'),
    JSDOM = require('jsdom').JSDOM,
    doc = "<html><body><div id='basic'></div></body></html>",
    data_factors = {
        parentDiv: 'basic',
        data: {
            'tokens': [{'token': '1', 'token_id': 16, 'type': 'input', 'position': 0}, {
                'token': '.',
                'token_id': 13,
                'type': 'input',
                'position': 1
            }, {'token': ' Austria', 'token_id': 17322, 'type': 'input', 'position': 2}, {
                'token': ' 2',
                'token_id': 362,
                'type': 'input',
                'position': 3
            }, {'token': '.', 'token_id': 13, 'type': 'input', 'position': 4}, {
                'token': ' Belgium',
                'token_id': 15664,
                'type': 'input',
                'position': 5
            }, {'token': ' 3', 'token_id': 513, 'type': 'input', 'position': 6}, {
                'token': '.',
                'token_id': 13,
                'type': 'input',
                'position': 7
            }, {'token': ' Bulgaria', 'token_id': 27902, 'type': 'output', 'position': 8}, {
                'token': ' 4',
                'token_id': 604,
                'type': 'output',
                'position': 9
            }],
            'factors': [[[0.5675638914108276, 0.0013362022582441568, 0.0, 0.0017229863442480564, 0.0004833868588320911, 0.0, 0.0025416763965040445, 0.0, 0.0, 0.0], [0.0, 0.2347777783870697, 0.2729246914386749, 0.23991520702838898, 0.2690434753894806, 0.27541542053222656, 0.26208916306495667, 0.2624804675579071, 0.2624804675579071, 0.2692509591579437]]]
        }
    }


const window = (new JSDOM(doc, {
    runScripts: "outside-only"
})).window;
// This is global because the tests will look for it in the global scope
document = window.document;


test('ActivationSparklineBase.init() sets up the visualization',
    function (test) {
        const activationSparkline = new ecco.ActivationSparklineBase(data_factors)

        activationSparkline.init()
        // console.log(document.body.innerHTML)
        // console.log(activationSparkline.innerDiv.selectAll('text').size())

        test.equals(activationSparkline.innerDiv.selectAll('svg').size(), 1,
            "init() succeeded in creating 1 svg element")
        test.equals(activationSparkline.innerDiv.selectAll('path').size(), 5,
            "init() succeeded in creating 5 svg paths (2 lines, 2 areas for factors, 1 for bottom axis)")


        test.end()
    }
)