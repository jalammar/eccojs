import * as d3 from "d3";
import {token_styler, display_token} from "./util.js"
import {TextHighlighter} from "./text-highlighter.js"
import {TokenSparkline} from "./token-sparkline.js";

export class InteractiveTokenSparkline extends TextHighlighter {
    constructor(_config) {
        super(_config)
        this.parentDivId = _config.parentDiv
        this.data = _config.data

        this.textColor = function (value) {
            if (this.scale(value) > 0.7)
                return '#ffffff'
            else
                return '#000000'
        }
        this.init()
    }

    init() {
        this.tokenSparkline = new TokenSparkline()
        this.div = d3.select('#' + this.parentDivId)
        this.innerDiv = this.div.append('div')

        const self = this

        const token_boxes = this.setupTokenBoxes()


        // Hover listeners
        this.innerDiv.selectAll('div.output-token')
            .on("mouseenter", function (d, i) {

                let disableHighlight = self.innerDiv.selectAll(`[highlighted="${true}"]`)
                    .style('border', '')
                    .attr('highlighted', false)
                    .style('background-color', '')
                let s = self.innerDiv.selectAll(`[position="${d.position}"]`)
                    .attr('highlighted', true)
                    .style('border', '1px solid #8E24AA')
                    .style('background-color', '#E1BEE7')
                self.updateData(i)
                self.setupTokenBoxes()
            })

        // Input sequence indicator
        this.innerDiv
            .insert('div', ':first-child')//Insert at the beginning
            .attr('class', 'sequence-indicator inputs-indicator')
            .html('input:')

        // Output sequence indicator
        this.innerDiv
            .insert('div', '.output-token') //Insert before the first output token
            .attr('class', 'sequence-indicator outputs-indicator')
            .html('output:')
    }

    setupTokenBoxes() {
        const self = this
        const token_boxes = this.innerDiv.selectAll('div.token')
            .data(self.data['tokens'], (d, i) => {
                return d['position']
            })
            .join(
                enter =>
                    enter.append('div')
                        .attr('token', (d, i) => {
                            return d.token
                        })
                        .attr('id', (d, i) => 't' + i)
                        .attr('position', (d, i) => i)
                        .attr('value', (d, i) => d.value || 0)
                        .style('color', (d, i) =>
                            self.textColor(d.value))
                        .call(token_styler)
                        .each(function (d) {

                            d3.select(this).append('span')
                                .text(function (d) {
                                    return display_token(d.token)
                                })
                                .style('margin-left', '-13px') // Makes the text closer to the tiny barchart
                                .style("pointer-events", "none")

                            d3.select(this)
                                .call(self.tokenSparkline.draw.bind(self.tokenSparkline))
                        }),
                update => update
                    .each(function (d) {
                            d3.select(this).call(self.tokenSparkline.update.bind(self.tokenSparkline))
                        }
                    ))

        return token_boxes
    }

    updateData(attribution_list_id) {
        const newValues = this.data['attributions'][attribution_list_id]
        let max = this.data['tokens'][0].value
        for (let i = 0; i < this.data['tokens'].length; i++) {
            this.data['tokens'][i].value = newValues[i] ? newValues[i] : 0
            if (this.data['tokens'][i].value > max)
                max = this.data['tokens'][i].value
        }
        console.log('max', max)
        // Set the max value as the new top of the domain for the sparkline
        // -- Both for color and for bar height
        this.tokenSparkline.config.colorScaler = d3.scaleLinear()
            .domain([0,max ])
            .range(this.tokenSparkline.config.colorScaler.range())
        console.log('UPDATING DOMAIN', this.tokenSparkline.config.colorScaler.domain())

        this.tokenSparkline.config.normalizeHeightScale = d3.scaleLinear()
            .domain([0,max ])
            .range(this.tokenSparkline.config.normalizeHeightScale.range())
    }
}