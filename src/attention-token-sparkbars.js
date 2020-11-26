import * as d3 from "d3";
import {token_styler, display_token} from "./util.js"
import {InteractiveTokenSparkbar} from './interactive-token-sparkbar'

export class AttentionTokenSparkbar extends InteractiveTokenSparkbar {
    constructor(_config) {
        _config['tokenSparkbarConfig'] = {
            colorInterpolator:d3.interpolateOranges,
            colorScaler: d3.scaleLinear()
                .domain([0, 0.5])
                .range([0.4, 1.0])
        }
        super(_config)
    }

    setupInteraction() {
        const self = this
        // Hover listeners
        console.log('setting up interaction')
        this.innerDiv.selectAll('div.token')
            .filter((d)=>{return d.position !== 0})
            .classed('attn-hoverable-token', true)
            .on("mouseenter", (d, i) => {
                self.hover(d, i)
            })
            .on("touchstart", (d, i) => {
                self.hover(d, i)
            })
    }

    hover(d,i){
        //d is the data of the token being hovered over
        // For attributions, there's one array for each output token.
        // None for input tokens. So output token #4, if the first output token,
        // gets the first attribution.
        const self = this
        let n_input_tokens = self.innerDiv.selectAll('.input-token').size()

        // End highlighting previously highlighted token
        let disableHighlight = self.innerDiv.selectAll(`[highlighted="${true}"]`)
            .classed('attn-hoverable-token', true)
            .classed('attn-highlighted-token', false)
            .attr('highlighted', false)
            // .style('border', '1px dashed purple')
            // .style('background-color', '')

        // Highlight active token
        let s = self.innerDiv.selectAll(`[position="${d.position}"]`)
            .attr('highlighted', true)
            .classed('attn-hoverable-token', false)
            .classed('attn-highlighted-token', true)
            // .style('border', '1px solid #8E24AA')
            // .style('background-color', '#E1BEE7')
        self.updateData(d.position -1)
        self.setupTokenBoxes(self.data['tokens'])
    }
}