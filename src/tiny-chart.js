import * as d3 from "d3";

export function tinyChart() {
    let width=20, height = 28,
        margin={top: 0},
        numericLabelheight=8,
        barWidth= 2, barMaxHeight = height-numericLabelheight

    function tinyChart(selection) {
        selection.each(function (d, i) {
            // console.log('tinyChart', this, d, i)
            let svg = d3.select(this).insert('svg', ':first-child')
                .attr("width", width)
                .attr("height", height)
                .append('g')


            let value = 0.50
            // Probability bar
            // console.log('prob', d.prob, 'log ', Math.log10(d.prob))
            const prob_height = value * barMaxHeight
            svg.append("rect")
                .attr("x", width / 2)
                .attr("y", height -numericLabelheight- prob_height)
                .attr("fill", '#ec008cbb')
                .attr("width", barWidth)
                .attr("height", prob_height)
                .attr("stroke-width", 0)
                .attr("stroke", '#333')
                .attr("alignment-baseline", "top")

            // Probability score text
            const format_prob = (value * 100).toFixed(2) + '%'
            svg.append('text')
                .attr("x", 0)
                .attr("y", barMaxHeight+numericLabelheight)
                .text(format_prob)
                .attr("fill", "#EC008Cbb")
                .attr("font-family", "sans-serif")
                .attr("font-size", "6px")
                .attr("text-anchor", "left")
                .attr("alignment-baseline", "top")
                .attr('probability', value)

        })

    }

    return tinyChart
}