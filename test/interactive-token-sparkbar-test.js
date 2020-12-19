const test = require('tape')
const ecco = require("../");
const d3 = require('d3'),
    JSDOM = require('jsdom').JSDOM, doc = "<html>" +
    "<body><link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css\" integrity=\"sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2\" crossorigin=\"anonymous\">\n<link id='css' rel=\"stylesheet\" type=\"text/css\" href=\"https://storage.googleapis.com/ml-intro/ecco/html/styles.css\"><div id='basic'></div></body></html>",
    data_2 = {
        parentDiv: 'basic',
        data: {
            tokens: [
                {token: ' hi', type: 'input', position: 0, value: 0.80},
                {token: ' there', type: 'output', position: 1, value: 0.20},
                {token: ' friend', type: 'output', position: 2, value: 0.00}
            ],
            attributions: [
                [1],
                [0.8, 0.2]
            ]
        }
    },
    data_3 = {
        parentDiv: 'basic',
        data: {
            'tokens': [{
                'token': 'The',
                'token_id': 464,
                'type': 'input',
                'value': '0.049845684',
                'position': 0
            }, {
                'token': ' countries',
                'token_id': 2678,
                'type': 'input',
                'value': '0.050903738',
                'position': 1
            }, {
                'token': ' of',
                'token_id': 286,
                'type': 'input',
                'value': '0.013019182',
                'position': 2
            }, {
                'token': ' the',
                'token_id': 262,
                'type': 'input',
                'value': '0.011890957',
                'position': 3
            }, {
                'token': ' European',
                'token_id': 3427,
                'type': 'input',
                'value': '0.048978817',
                'position': 4
            }, {
                'token': ' Union',
                'token_id': 4479,
                'type': 'input',
                'value': '0.027450427',
                'position': 5
            }, {
                'token': ' are',
                'token_id': 389,
                'type': 'input',
                'value': '0.015803536',
                'position': 6
            }, {'token': ':', 'token_id': 25, 'type': 'input', 'value': '0.020174112', 'position': 7}, {
                'token': '\n',
                'token_id': 198,
                'type': 'input',
                'value': '0.02642286',
                'position': 8
            }, {'token': '1', 'token_id': 16, 'type': 'input', 'value': '0.035699554', 'position': 9}, {
                'token': '.',
                'token_id': 13,
                'type': 'input',
                'value': '0.026531102',
                'position': 10
            }, {
                'token': ' Austria',
                'token_id': 17322,
                'type': 'input',
                'value': '0.15094103',
                'position': 11
            }, {'token': '\n', 'token_id': 198, 'type': 'input', 'value': '0.023368372', 'position': 12}, {
                'token': '2',
                'token_id': 17,
                'type': 'input',
                'value': '0.025183896',
                'position': 13
            }, {
                'token': '.',
                'token_id': 13,
                'type': 'input',
                'value': '0.019457698',
                'position': 14
            }, {
                'token': ' Belgium',
                'token_id': 15664,
                'type': 'input',
                'value': '0.12963499',
                'position': 15
            }, {'token': '\n', 'token_id': 198, 'type': 'input', 'value': '0.017461158', 'position': 16}, {
                'token': '3',
                'token_id': 18,
                'type': 'input',
                'value': '0.028114157',
                'position': 17
            }, {
                'token': '.',
                'token_id': 13,
                'type': 'input',
                'value': '0.025315698',
                'position': 18
            }, {
                'token': ' Bulgaria',
                'token_id': 27902,
                'type': 'input',
                'value': '0.16295712',
                'position': 19
            }, {'token': '\n', 'token_id': 198, 'type': 'input', 'value': '0.016801832', 'position': 20}, {
                'token': '4',
                'token_id': 19,
                'type': 'input',
                'value': '0.040485736',
                'position': 21
            }, {
                'token': '.',
                'token_id': 13,
                'type': 'input',
                'value': '0.03355838',
                'position': 22
            }, {'token': ' Croatia', 'token_id': 28975, 'type': 'output', 'value': '0', 'position': 23}, {
                'token': '\n',
                'token_id': 198,
                'type': 'output',
                'value': '0',
                'position': 24
            }, {'token': '5', 'token_id': 20, 'type': 'output', 'value': '0', 'position': 25}, {
                'token': '.',
                'token_id': 13,
                'type': 'output',
                'value': '0',
                'position': 26
            }, {
                'token': ' Czech',
                'token_id': 16639,
                'type': 'output',
                'value': '0',
                'position': 27
            }, {'token': ' Republic', 'token_id': 2066, 'type': 'output', 'value': '0', 'position': 28}, {
                'token': '\n',
                'token_id': 198,
                'type': 'output',
                'value': '0',
                'position': 29
            }, {'token': '6', 'token_id': 21, 'type': 'output', 'value': '0', 'position': 30}],
            'attributions': [[0.04984568431973457, 0.05090373754501343, 0.013019181787967682, 0.01189095713198185, 0.04897881671786308, 0.027450427412986755, 0.015803536400198936, 0.020174112170934677, 0.026422860100865364, 0.03569955378770828, 0.026531102135777473, 0.15094102919101715, 0.02336837165057659, 0.025183895602822304, 0.019457697868347168, 0.12963499128818512, 0.017461158335208893, 0.028114156797528267, 0.025315698236227036, 0.1629571169614792, 0.016801832243800163, 0.04048573598265648, 0.033558379858732224], [0.051597677171230316, 0.06581485271453857, 0.01636352948844433, 0.014876778237521648, 0.040872130542993546, 0.03301151469349861, 0.03035879321396351, 0.03853720799088478, 0.03610892593860626, 0.04684726893901825, 0.030281346291303635, 0.08394523710012436, 0.025624826550483704, 0.031708333641290665, 0.02618204429745674, 0.04757746681571007, 0.0221945159137249, 0.028022944927215576, 0.01604890450835228, 0.045929916203022, 0.02283228002488613, 0.029318897053599358, 0.02213188260793686, 0.193812757730484], [0.044737063348293304, 0.058928970247507095, 0.017215102910995483, 0.01409270241856575, 0.038349300622940063, 0.028837965801358223, 0.02511240728199482, 0.03546452894806862, 0.04560324549674988, 0.06670594215393066, 0.03132288157939911, 0.053467947989702225, 0.03134693205356598, 0.056748319417238235, 0.02103973925113678, 0.03218747675418854, 0.025571126490831375, 0.0584120973944664, 0.025113658979535103, 0.04004048556089401, 0.028595970943570137, 0.07237017899751663, 0.02599440887570381, 0.06815606355667114, 0.0545855276286602], [0.04556414857506752, 0.07599044591188431, 0.014213349670171738, 0.011679480783641338, 0.031248806044459343, 0.027637053281068802, 0.022448383271694183, 0.024262137711048126, 0.027989597991108894, 0.04534641280770302, 0.028740936890244484, 0.0698070377111435, 0.022897806018590927, 0.034670937806367874, 0.031580910086631775, 0.04390630125999451, 0.021732384338974953, 0.03625648841261864, 0.03053598292171955, 0.04676260054111481, 0.027217578142881393, 0.05282251164317131, 0.02818445675075054, 0.07271534204483032, 0.035287126898765564, 0.09050176292657852], [0.04896847903728485, 0.045393940061330795, 0.012427671812474728, 0.011238022707402706, 0.04325588420033455, 0.02478032559156418, 0.015460812486708164, 0.02004183642566204, 0.02486478164792061, 0.029492175206542015, 0.022085845470428467, 0.12125522643327713, 0.01946970261633396, 0.02099895477294922, 0.015341512858867645, 0.08712127804756165, 0.014964817091822624, 0.01904127188026905, 0.021907560527324677, 0.09340780973434448, 0.015740547329187393, 0.02171197161078453, 0.016026407480239868, 0.14368657767772675, 0.018390826880931854, 0.038486141711473465, 0.03443961590528488], [0.027155159041285515, 0.03433734178543091, 0.008202997036278248, 0.008360820822417736, 0.0286919753998518, 0.015005789697170258, 0.012345264665782452, 0.014107382856309414, 0.016173100098967552, 0.01550377532839775, 0.01181276235729456, 0.05702994391322136, 0.013164643198251724, 0.01333625242114067, 0.010902630165219307, 0.03428952768445015, 0.011956813745200634, 0.013819782994687557, 0.011244974099099636, 0.05673407390713692, 0.015493102371692657, 0.020295526832342148, 0.010169696994125843, 0.051110826432704926, 0.031174834817647934, 0.048216626048088074, 0.029568074271082878, 0.37979626655578613], [0.04546354338526726, 0.05227690190076828, 0.013269543647766113, 0.011196685954928398, 0.031983036547899246, 0.02382337488234043, 0.027437349781394005, 0.03987780585885048, 0.0275633092969656, 0.03383272886276245, 0.019841259345412254, 0.06729307770729065, 0.018842943012714386, 0.024202151224017143, 0.018252667039632797, 0.04539196938276291, 0.016599975526332855, 0.018127672374248505, 0.013515415601432323, 0.04143820330500603, 0.014730404131114483, 0.018165787681937218, 0.011906159110367298, 0.03510657325387001, 0.01929137483239174, 0.021556483581662178, 0.020113728940486908, 0.12101361155509949, 0.14788635075092316], [0.037520091980695724, 0.05205395072698593, 0.014586335979402065, 0.010298254899680614, 0.029951822012662888, 0.022815972566604614, 0.02334032766520977, 0.032344091683626175, 0.04025588929653168, 0.05213743820786476, 0.024257291108369827, 0.04106154292821884, 0.0256191473454237, 0.0373750664293766, 0.016788532957434654, 0.028558241203427315, 0.025176996365189552, 0.038414329290390015, 0.019323399290442467, 0.030256951227784157, 0.022450221702456474, 0.05667370185256004, 0.01740228570997715, 0.03827175125479698, 0.02697371132671833, 0.07792969048023224, 0.022550759837031364, 0.054680224508047104, 0.03755661100149155, 0.04337539151310921]]
        }
    }
newDocument = function (doc) {
    return (new JSDOM(doc, {
        runScripts: "outside-only"
    }));
}

const fs = require("fs")
const window = (new JSDOM(doc, {
    runScripts: "outside-only"
})).window;
// This is global because the tests will look for it in the global scope
document = window.document;

test('InteractiveTokenSparkbar.init() sets up the visualization', function (test) {
    const t = new ecco.InteractiveTokenSparkbar(data_2)

    t.init()

    test.equals(t.innerDiv.selectAll('.sequence-indicator').size(),
        1,
        "'output' sequence indicators was created.")
    test.equals(t.innerDiv.selectAll('.token').size(), 3,
        "Three token divs correctly created.") // 3 tokens in the initializer

    test.equals(t.innerDiv.selectAll('svg').size(), 3,
        "three svgs were correctly created")

    // console.log(document.body.innerHTML)
    test.equals(t.innerDiv.selectAll('rect').size(), 3,
        "three rect (token sparkbars) were correctly created")
    t.selectFirstToken()

    // test.equals(t.innerDiv.select('.output-token').attr("highlighted"), 'true',
    //     "The first output token was correctly highlighted by selectFirstToken()")

    test.end()
})


test.onFinish(function () {

    console.log(22)
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
    let data_1 = ${JSON.stringify(data_3)}
    let viz = new ecco.InteractiveTokenSparkbar(data_1)
    viz.init()
    })
    `)

    const dir = './test/tmp';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    fs.writeFile(dir + '/interactive-token-sparkbar-previews.html', dom.serialize(), function (err) {
        if (err) return console.log(err);
        // console.log(preview_text, '>> preview.html');
    });


})
