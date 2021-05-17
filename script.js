const canvas = d3.select(".canvas");

const svg = canvas.append('svg')
    .attr('width', 600)
    .attr('height', 600);

svg.append('rect')
    .attr('height', 70)
    .attr('width', 100)
    .attr('x', 50)
    .attr('y', 50)
    .attr('fill', 'blue');


svg.append('circle')
    .attr('r', 70)
    .attr('cx', 250)
    .attr('cy', 90)
    .attr('fill','pink');

svg.append('line')
    .attr('x1', 400)
    .attr('x2', 500)
    .attr('y1', 50)
    .attr('y2', 150)
    .attr('stroke', 'red');