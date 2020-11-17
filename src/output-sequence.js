import * as d3 from "d3";
// import * as d3array from "d3array";
import {TextHighlighter} from "./text-highlighter.js"
import {TinyChartTextHighlighter} from "./tiny-chart-text-highlighter.js"
import {InteractiveTokenSparkbar} from "./interactive-token-sparkbar"
import {ActivationSparklineBase} from "./activation-sparkline"

export function renderOutputSequence(parent_div, data) {

    const highlighter = new TextHighlighter({
        parentDiv: parent_div,
        data: data
    });
    highlighter.init();

    return highlighter;
}


export function renderSeqHighlightPosition(parent_div, position, data) {

    const div = d3.select('#' + parent_div),
        n_tokens = data['tokens'].length,
        highlighter = new TinyChartTextHighlighter();
    // highlighter = new TinyChartTextHighlighter();
    // highlighter.textHighlighter([1])

    let selection = div.selectAll('div')
        .data([data['tokens']])
        .join('div')
        .call(highlighter.textHighlighter.bind(highlighter)) // Binding, otherwise 'this' is overwritten

    // Highlight the selected token
    let s = d3.selectAll(`[position="${position}"]`)
        .style('border', '1px solid #8E24AA')
    highlighter.init();
    console.log('Selection', selection, s)
}

// Small bar next to each token. Change their value upon hovering on output
// tokens (to visualize attribution
export function interactiveTokens(parent_div, data) {
    const tokenChart = new InteractiveTokenSparkbar({
        parentDiv: parent_div,
        data: data,
    })

    tokenChart.init()
    tokenChart.selectFirstToken()
    // tokenChart.hover({},0)
}

// Shows tokens with highlighted bg colors based on value
export function bgHighlighterSequence(parent_div, data) {
    const highlighter = new TextHighlighter({
        parentDiv: parent_div,
        data: data,
        showPosition: false,
        overrideTokenBorderColor: 'white'
    });

    highlighter.init();
}


export function interactiveTokensAndFactorSparklines(parent_div, data, _config = {}) {

    // console.log('data', data)
    window.d = data

    // Draw the sparkline line-charts for factor activations
    const activationSparkline = new ActivationSparklineBase({
        ..._config['actSparklineCFG'],
        parentDiv: parent_div,
        data: data
    })

    activationSparkline.init()

    // Draw the tokens showing the activations
    const highlighter = new TextHighlighter({
        ..._config['hltrCFG'],
        parentDiv: parent_div,
        data: data,
        showPosition: false,
        overrideTokenBorderColor: 'white',
        valuesKey: 'factors'
    });


    let mostPronounceFactorPerToken = []
    // for each token
    data['tokens'].map((d, i) => {
        // Find the factor that has the highest activation value for the token
        // save the factor id
        mostPronounceFactorPerToken.push(
            d3.maxIndex(
                data['factors'][0], (f) => f[i]))
    })
    // console.log('3', mostPronounceFactorPerToken)

    let factorColorInterpolators = []
    let factorColorScalers = []
    data['factors'][0].map((values, i) => {
        let color = activationSparkline.lineColors(i)
        // console.log('factor:', i, ' color', color)
        factorColorInterpolators.push(d3.interpolateRgb("white", color))
        factorColorScalers.push(d3.scaleLinear()
            .domain([0, d3.max(values)])
            .range([0, 1]))
    })
    // console.log('4', factorColorInterpolators, factorColorScalers)
    // Update token color values
    for (let i = 0; i < data['tokens'].length; i++) {
        let factor_id = mostPronounceFactorPerToken[i]
        // console.log('4.5', i, factor_id,
        //     'value:', data['factors'][0][factor_id][i],
        //     'scaled value: ', factorColorScalers[factor_id](
        //         data['factors'][0][factor_id][i]
        //     ),
        //     'interpolated scaled value:',
        //     factorColorInterpolators[factor_id](
        //         factorColorScalers[factor_id](
        //             data['factors'][0][factor_id][i]
        //         )
        //     )
        // )
        data['tokens'][i]['color'] =
            factorColorInterpolators[factor_id](
                factorColorScalers[factor_id](
                    data['factors'][0][factor_id][i]
                )
            )
    }
    // console.log('6 ', data['tokens'])

    highlighter.init();
    activationSparkline.hoverAction = function (id, color) {
        highlighter.config.overrideColorParam = true
        // When hovering on a line chart, show its values on the tokens
        highlighter.updateData(id, color)
        highlighter.redraw()
    }

    activationSparkline.hoverEndAction = function (id, color) {
        // console.log('HOVER END')
        highlighter.config.overrideColorParam = false
        // When hovering on a line chart, show its values on the tokens
        // highlighter.updateData(id, color)
        highlighter.redraw()
    }
}
