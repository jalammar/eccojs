import * as d3 from "d3";
import {TextHighlighter} from "./text-highlighter.js"
import {TinyChartTextHighlighter} from "./tiny-chart-text-highlighter.js"
import {InteractiveTokenSparkline} from "./interactive-token-sparkline"

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

    // Highlight the selected token
    let s = d3.selectAll(`[position="${position}"]`)
        .style('border', '1px solid #8E24AA')

    console.log('Selection', selection, s)
}


export function interactiveTokens(parent_div, position, data) {
    const token_data = data//, t = svg.transition().duration(750);

    const tokenChart = new InteractiveTokenSparkline({
        parentDiv: parent_div,
        data: data,
    })
    console.log(11)
    // tokenChart.draw()
    console.log(55)

    // function viz(data) {
    //     const div = d3.select('#' + parent_div),
    //         n_tokens = data.length,
    //         highlighter = new TinyChartTextHighlighter();
    //
    //     function updateData(old, newData) {
    //         console.log('update', old, newData)
    //         for (let i = 0; i < old.length; i++) {
    //             old[i].value = newData[i]
    //         }
    //         return old
    //     }
    //
    //     function assignOnmouseover(sel) {
    //         console.log('sss', sel)
    //         sel.each(function (d, i) {
    //             console.log('each', d, this)
    //             d3.select(this)
    //                 .selectAll('div.output-token')
    //                 .on("mouseenter", function (d, i) {
    //                     console.log(d, i, this)
    //                     d3.event.stopPropagation();
    //                     let newData = updateData(data, token_data['attributions'][i])
    //                     viz(newData)
    //                 })
    //         })
    //     }
    //
    //     const innerDiv = div.append('div')
    //     // let selection = div
    //     //     .selectAll('div')
    //     //     .data([data])
    //     //     .join(enter => enter.append('div').style("background-color", "green"),
    //     //         update => update.style("background-color", "red"))
    //
    //
    //     let token_boxes = innerDiv
    //         .selectAll('div')
    //         .data(data)
    //         .join(enter => enter.append('div').style("background-color", "green"),
    //             update => update.style("background-color", "red"))
    //
    //
    //     selection.call(highlighter.textHighlighter.bind(highlighter)) // Binding, otherwise 'this' is overwritten
    //
    //     selection.call(assignOnmouseover)
    //
    //     // Highlight the selected token
    //     let s = d3.selectAll(`[position="${position}"]`)
    //         .style('border', '1px solid #8E24AA')

    // console.log('Selection', selection, s)
}
