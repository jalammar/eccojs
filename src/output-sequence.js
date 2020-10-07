import * as d3 from "d3";
import {TinyChartTextHighlighter} from "./tiny-chart-text-highlighter.js"

export function renderOutputSequence(viz_id, id, data) {
    console.log("Alright!", viz_id, id, data)

    const div = d3.select('#' + viz_id),
        n_tokens = data['tokens'].length,
        highlighter = new TinyChartTextHighlighter();
    // highlighter.textHighlighter([1])
    console.log('|||', highlighter.scale, highlighter.scale())
    div.selectAll('div')
        .data([data['tokens']])
        .join('div')
        .call(highlighter.textHighlighter.bind(highlighter)) // Binding, otherwise 'this' is overwritten
}