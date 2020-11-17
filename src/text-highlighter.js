import * as d3 from "d3";
import {token_styler, display_token} from "./util.js"

export class TextHighlighter {

    constructor(_config = {}) {
        this.config = {
            // Controls for color of background
            bgColorScaler: _config.bgColorScaler ||
                d3.scaleLinear().domain([0.2, 1]).range([0, 0.5]),
            bgColorInterpolator: _config.bgColorInterpolator ||
                d3.interpolateRgb("white", "blue"),

            // Controls for color of token text
            textColorScaler: _config.textColorScaler ||
                d3.scaleLinear()
                    .domain([0,1])
                    .range([0, 1]),
            textColorInterpolator: _config.textColorInterpolator,



            // display the number of the position in sequence. Default true
            showPosition:(typeof _config.showPosition !== "undefined")?
                _config.showPosition : true, // Value could be 'false', this is to accommodate

            overrideTokenBorderColor: _config.overrideTokenBorderColor, // Okay to be undefined

            // The data object will a 'tokens' list and another member e.g. 'attributions'
            // or 'factors'. We declare its name here so we can retrieve the values.
            valuesKey: _config.valuesKey || 'values',

            // Flag used to control highlight animation in bgColor()
            overrideColorParam: false
        }

        this.parentDivId = _config.parentDiv
        this.data = _config.data

    }


    init() {
        const self = this
        this.div = d3.select('#' + this.parentDivId)
        this.innerDiv = this.div.append('div')


        this.innerDiv.style('float', 'left')
            .style('float', 'left')
            .style('width', '70%')
        // Construct token boxes, most of the work is done here
        const token_boxes = this.setupTokenBoxes(this.data['tokens'])


        // Show where inputs start
        this.innerDiv
            .insert('div', ':first-child')//Insert at the beginning
            .attr('class', 'sequence-indicator inputs-indicator')
            .html('input:')

        // Show where the output sequence starts
        this.innerDiv
            .insert('div', '.output-token') //Insert before the first output token
            .attr('class', 'sequence-indicator outputs-indicator')
            .html('output:')

    }


    setupTokenBoxes(tokenData) {
        const self = this
        let token_boxes = this.innerDiv.selectAll('div.token')
            .data(tokenData, (d, i) => {
                return d['position'] //The position of the token is its key
            })
            .join(enter =>
                    enter.append('div')
                        .attr('token', (d, i) => {
                            return d.token
                        })
                        .attr('id', (d, i) => 't' + i)
                        .attr('position', (d, i) => i)
                        .attr('value', (d, i) => d.value || 0)
                        .style('opacity', 0)
                        .style('background-color', (d, i) => {
                            // console.log("bg", d, d.value)
                            return self.bgColor(d)
                        })
                        .style('border-color', () => {
                            if (self.config.overrideTokenBorderColor)
                                return self.config.overrideTokenBorderColor
                            // If not set, don't return anything, let it fallback to CSS definition
                        })
                        .call(token_styler)
                        // Set up the children of the box
                        .each(function (d, i) {

                            // Position in the sequence
                            if( self.config.showPosition ){
                                d3.select(this).append('div')
                                    .attr('class', 'position_in_seq')
                                    .text(() => i)
                            }
                            // Token Text
                            d3.select(this).append('span')
                                .text(() => display_token(d.token))
                                .style('color', (d, i) => self.textColor(d.value))
                                .style('padding-left', '4px')

                        })
                        .call(enter => enter.transition().duration(500)
                            .style('opacity', 1))

                        ,
                update => update
                    .style('background-color', (d) => {
                            return self.bgColor(d)
                        })
                    // .each(function (d) {
                    // })
            )// End Join
    }

    // Get the background
    bgColor(token) {
        // If token explicitly has a color, use that
        // Case: using different colors for different factors in one view
        // console.log('bgColor',(!this.config.overrideColorParam) ,  (token.color !== undefined))
        if ((!this.config.overrideColorParam) && (token.color !== undefined)){
            return token.color
        }
        // If no explicit color, interpolate using value
        else if (token.value !== undefined)
            return this.config.bgColorInterpolator(
                this.config.bgColorScaler(token.value))
        // If no Value, white background
        else
            return "white"
    };

    textColor(value) {
        const scaledValue = this.config.textColorScaler(value)
        if (this.config.textColorInterpolator) {
            return this.config.textColorInterpolator(scaledValue)
        }
        // else if (scaledValue > 0.4)
        //     return '#ffffff'
        else
            return '#000000'
    };


    updateData(id, color = null) {
        const newValues = this.data[this.config.valuesKey][0][id]

        // let max = this.data['tokens'][0].value
        // Update the 'value' parameter of each token
        // So when self.setupTokenBoxes() is called, it updates
        // whatever depends on 'value' (namely, bar sparkline, and its numeric value)
        for (let i = 0; i < this.data['tokens'].length; i++) {
            this.data['tokens'][i].value = newValues[i] ? newValues[i] : 0
            // if (this.data['tokens'][i].value > max)
            //     max = this.data['tokens'][i].value
        }

        // Update the color scale used to highlight the tokens
        if(color){
            // console.log('color', color)
            this.config.bgColorInterpolator = d3.interpolateRgb("white", color)
            this.config.bgColorScaler =
                d3.scaleLinear()
                    .domain([0,d3.max(newValues)])
                    .range([0, 1])
        }
    }

    addToken(token){
        this.data['tokens'].push(token)
        // console.log(this.data['tokens'])
    }

    redraw(){
        this.setupTokenBoxes(this.data['tokens'])
    }

}
