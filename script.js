const canvas = d3.select(".canvas");

const svg = canvas.append('svg')
    .attr('width', 600)
    .attr('height', 600);

const group = svg.append('g')
    .attr('transform','translate(10, 100)');

group.append('rect')
    .attr('height', 70)
    .attr('width', 100)
    .attr('x', 50)
    .attr('y', 50)
    .attr('fill', 'blue');


group.append('circle')
    .attr('r', 70)
    .attr('cx', 250)
    .attr('cy', 90)
    .attr('fill','pink');

group.append('line')
    .attr('x1', 400)
    .attr('x2', 500)
    .attr('y1', 50)
    .attr('y2', 150)
    .attr('stroke', 'red');

svg.append('text')
    .attr('x', 20)
    .attr('y', 200)
    .attr('fill', 'grey')
    .text('Lalit!');