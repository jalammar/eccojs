import * as d3 from "d3";
import {token_styler, display_token} from "./util.js"
import {TextHighlighter} from "./text-highlighter.js"
import {tinyChart} from "./tiny-chart";

export class TinyChartTextHighlighter extends TextHighlighter {
    constructor(_config) {
        super(_config)
    }

    textHighlighter(selection) {
        const self = this, tinyChart1 = tinyChart()
        console.log(2222277, selection, this, self)
        selection.each(function (d, i) {
            // console.log(33, d, this)
            // d is a list of objects, each with properties 'token' and 'value'
            // Bind token data to tokens, set token text
            d3.select(this).selectAll('div')
                .data(d)
                .join('div')
                .attr('token', (d, i) => {
                    return d.token
                })
                .attr('id', (d, i) => 't' + i)
                // .attr('class', 'token')
                .attr('position', (d, i) => i)
                .attr('value', (d, i) => d.value || 0)
                .style('background-color', (d, i) => {
                    // console.log("9", this, self);
                    self.bgColor(d.value)
                })
                .style('color', (d, i) => self.textColor(d.value))
                .call(token_styler, d.token) // Add appropriate CSS classes (new line, partial token)
                .text(function (d) {
                    return display_token(d.token)
                })
                .call(tinyChart1)


            // Show where inputs start
            d3.select(this)
                .insert('div', ':first-child')//Insert at the beginning
                .attr('class', 'sequence-indicator inputs-indicator')
                .html('input:')

            // Show where the output sequence starts
            d3.select(this)
                .insert('div', '.output-token') //Insert before the first output token
                .attr('class', 'sequence-indicator outputs-indicator')
                .html('output:')
        })
    }
}