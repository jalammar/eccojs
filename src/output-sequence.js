import * as d3 from "d3";
import {TextHighlighter} from "./text-highlighter.js"
import {TinyChartTextHighlighter} from "./tiny-chart-text-highlighter.js"
import {InteractiveTokenSparkline} from "./interactive-token-sparkline"
import {ActivationSparklineBase} from "./activation-sparkline"

export function renderOutputSequence(parent_div, data) {

    const //div = d3.select('#' + parent_div),
        // n_tokens = data['tokens'].length,
        highlighter = new TextHighlighter({
            parentDiv: parent_div,
            data: data
        });
    // highlighter = new TinyChartTextHighlighter();
    // highlighter.textHighlighter([1])

    // div.selectAll('div')
    //     .data([data['tokens']])
    //     .join('div')
    //     .call(highlighter.textHighlighter.bind(highlighter)) // Binding, otherwise 'this' is overwritten
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

    console.log('Selection', selection, s)
}

// Small bar next to each token. Change their value upon hovering on output
// tokens (to visualize attribution
export function interactiveTokens(parent_div, data) {
    const tokenChart = new InteractiveTokenSparkline({
        parentDiv: parent_div,
        data: data,
    })
}

// Shows tokens with highlighted bg colors based on value
export function bgHighlighterSequence(parent_div, data) {
    const highlighter = new TextHighlighter({
        parentDiv: parent_div,
        data: data,
        showPosition: false,
        overrideTokenBorderColor: 'white'
    });
}


export function interactiveTokensAndFactorSparklines(parent_div, data) {

    // Draw the sparkline line-charts for factor activations
    const activationSparkline = new ActivationSparklineBase({
        parentDiv: parent_div,
        data: data
    })

    // Draw the tokens showing the activations
    const highlighter = new TextHighlighter({
        parentDiv: parent_div,
        data: data,
        showPosition: false,
        overrideTokenBorderColor: 'white',
        valuesKey:'factors'
    });

    activationSparkline.hoverAction= function(id, color){
        console.log('hoverAction', id)
        // When hovering on a line chart, show its values on the tokens
        highlighter.updateData(id, color)
        highlighter.redraw()
    }
}
