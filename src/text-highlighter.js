import * as d3 from "d3";
import {token_styler, display_token} from "./util.js"

export class TextHighlighter {

    constructor(_config) {
        console.log(11, this)
        this.x = 1
        this.scale = d3.scaleLinear()
            .domain([-1, 1])
            .range([0, 1])
        this.bgColorScheme = d3.interpolatePiYG
        this.bgColor = function (value) {
            if (value !== undefined)
                return this.bgColorScheme(this.scale(value))
            else
                return "white"
        }
        this.textColor = function (value) {
            if ((this.scale(value) < 0.3) ||
                (this.scale(value) > 0.7))
                return '#ffffff'
            else
                return '#000000'
        }

        // this.config = {
        //     parentElement: _config.parentElement,
        //     height: _config.height || 300,
        //     margin: { top: 10, bottom: 30, right: 10, left: 30 }
        // }
    }

    textHighlighter(selection) {
        const self=this
        console.log(222, selection, this, self)
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
                .style('background-color', (d, i) => {console.log("9",this,self) ;self.bgColor(d.value)})
                .style('color', (d, i) => self.textColor(d.value))
                .call(token_styler, d.token) // Add appropriate CSS classes (new line, partial token)
                .text(function (d) {
                    return display_token(d.token)
                })


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


    scale(value) {
        if (!arguments.length) return this.scale;
        this.scale = value;
        return this;
    };

    bgColorScheme(value) {
        if (!arguments.length) return this.bgColorScheme;
        this.bgColorScheme = value;
        return this;
    };

    bgColor(value) {
        if (!arguments.length) return this.bgColor;
        this.bgColor = value;
        return this;
    };

    textColor(value) {
        if (!arguments.length) return this.textColor;
        this.textColor = value;
        return this;
    };
}
