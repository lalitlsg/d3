const data = [
    {width: 200, height: 100, fill: 'blue'},
    {width: 100, height: 70, fill: 'pink'},
    {width: 50, height: 50, fill: 'purple'}

]

const svg = d3.select('svg');

const rect = svg.selectAll('rect')
    .data(data)
    .attr('width', d=>d.width)
    .attr('height', d=>d.height)
    .attr('fill', d=>d.fill);