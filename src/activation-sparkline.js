import * as d3 from "d3";

// Reference: https://observablehq.com/d/9d7507ca9c029767
export class ActivationSparklineBase {
    constructor(_config = {}) {

        // this.config.margin =  _config.margin ||
        //     {top: 50, right: 30, bottom: 30, left: 60}, // Default value
        this.config = {
            margin: _config.margin ||
                {top: 50, right: 30, bottom: 30, left: 60},
        }

        this.config['height'] = _config.height ||
            400 +
            d3.min([600, 15 * _config.data['factors'][0].length]) // Scale according to the number of factors,
            // but only up to 600
            - this.config.margin.top
            - this.config.margin.bottom;

        this.config['width'] = _config.width ||
            350 - this.config.margin.left - this.config.margin.right

        // 350 - this.config.margin.left - this.config.margin.right

        this.parentDivId = _config.parentDiv
        this.data = _config.data
        this.init()
    }

    init() {
        const self = this,
            factors = this.data['factors'][0],
            n_factors = factors.length,
            overlap = 1.5 // The higher the value, the more the lines would overlap

        // var margin = {top: 50, right: 30, bottom: 30, left: 60},
        //     width = 350 - margin.left - margin.right,
        //     height = 400 + 15*n_factors - margin.top - margin.bottom;

        this.div = d3.select('#' + this.parentDivId)
        this.innerDiv = this.div.append('div')
            .attr('id', 'activation-sparklines')
            .style('float', 'left')
            .style('width', '25%')
        this.svg = this.innerDiv.append('svg')
            .attr("viewBox", [0, 0, this.config.width, this.config.height]);


        var lineColors = d3.scaleSequential()
            .domain([0, factors.length])
            // .range([0.1,1])
            .interpolator(d3.interpolateRainbow);
        console.log('interpolate', lineColors(0))

        var x = d3.scaleLinear()
            .domain([0, factors[0].length])
            .range([this.config.margin.left,
                this.config.width - this.config.margin.right]);

        // Scale to place each line chart vertically in the right place
        var y_lines = d3.scalePoint()
            .domain(factors.map((d, i) => i)) // List of chart ids e.g. [0,1,2]
            .range([this.config.margin.top,
                this.config.height - this.config.margin.bottom])

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, 1])
            .range([this.config.height, 0]);

        const z = d3.scaleLinear()
            .domain([
                d3.min(factors, d => d3.min(d)),
                d3.max(factors, d => d3.max(d)) / 2
            ])
            .range([0, -overlap * y_lines.step()])

        console.log(y.domain())
        let line = d3.line()
            .curve(d3.curveCardinal)
            .x(function (d, i) {
                return x(i)
            })
            .y(function (d) {
                return z(d)
            })

        const groups = this.svg.selectAll('g')
            .data(factors)
            .join('g') // Create an svg group for each factor
            .attr('transform', (d, i) => {
                    // console.log('y_lines(i)', i, y_lines(i))
                    return `translate(0, ${y_lines(i)})`
                }
            ) // Move to the appropriate height
        const area = d3.area()
            .defined(d => !isNaN(d))
            .x((d, i) => x(i))
            .y0(0)
            .y1(z)

        console.log(')))))', lineColors(0))
        groups.append("path")
            .attr("fill", (d, i) => lineColors(i))
            .attr("opacity", 0.2)
            .attr("d", area);


        // Draw the line
        groups.append('path')
            .attr("fill", "none")
            .attr("stroke", (d, i) => lineColors(i))
            .attr("d", line)
            .on("mouseenter", function (d, i) {
                console.log('hovering over', i)
                self.hover(i, lineColors(i))
            })

        // Bottom axis, I think
        this.svg.append("g")
            .attr("transform", `translate(0,${ 
                this.config.height- this.config.margin.bottom  })`)
            .call(d3.axisBottom(x).ticks(5));
    }

    hover(id, color) {
        this.hoverAction(id, color)
    }
}