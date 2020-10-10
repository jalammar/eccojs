import * as d3 from "d3";
import {TextHighlighter} from "./text-highlighter.js"
import {TinyChartTextHighlighter} from "./tiny-chart-text-highlighter.js"

export function renderOutputSequence(viz_id, id, data) {

    const div = d3.select('#' + viz_id),
        n_tokens = data['tokens'].length,
        highlighter = new TextHighlighter();
        // highlighter = new TinyChartTextHighlighter();
    // highlighter.textHighlighter([1])

    div.selectAll('div')
        .data([data['tokens']])
        .join('div')
        .call(highlighter.textHighlighter.bind(highlighter)) // Binding, otherwise 'this' is overwritten
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

    // Highlight the token
    let s = d3.selectAll(`[position="${position}"]`)
        .style('border', '1px solid #8E24AA')

    console.log('Selection', selection, s)
}