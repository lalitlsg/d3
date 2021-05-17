// d3 taking data from json file

const svg = d3.select('svg');

d3.json('circles.json').then(data=>{
    
    // join with data
    const circle = svg.selectAll('circle')
        .data(data);
    
    // add attr to already present circle in dome
    circle.attr('cy', 100)
        .attr('cx',d=>d.distance)
        .attr('r', d=>d.radius)
        .attr('fill', d=>d.color)

    // append enter selection to dom
    circle.enter()
        .append('circle')
        .attr('cy', 100)
        .attr('cx',d=>d.distance)
        .attr('r', d=>d.radius)
        .attr('fill', d=>d.color)

})