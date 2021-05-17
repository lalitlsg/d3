const data = [
    {width: 200, height: 100, fill: 'blue'},
    {width: 100, height: 70, fill: 'pink'},
    {width: 50, height: 50, fill: 'purple'}

]

const svg = d3.select('svg');

// joining the data
const rect = svg.selectAll('rect')
    .data(data);

// add attr to rect already in dom
rect.attr('width', d=>d.width)
    .attr('height', d=>d.height)
    .attr('fill', d=>d.fill);

// append the enter selection to dom
rect.enter()
    .append('rect')
    .attr('width', d=>d.width)
    .attr('height', d=>d.height)
    .attr('fill', d=>d.fill);

    