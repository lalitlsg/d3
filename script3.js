// d3 linear scale

const svg = d3.select('svg');

d3.json('orders.json').then(data=>{
    
    // linear scale
    const y = d3.scaleLinear()
        .domain([0,1000])
        .range([0,500]);

    // join data
    const rect = svg.selectAll('rect')
        .data(data);

    // add attr to dom rect
    rect.attr('width', 50)
        .attr('height',d=>y(d.quantity))
        .attr('x',(d,i)=>i*70)
        .attr('fill', 'blue');

    // append enter selection to dom
    rect.enter()
        .append('rect')
        .attr('width', 50)
        .attr('height',d=>y(d.quantity))
        .attr('x',(d,i)=>i*70)
        .attr('fill', 'blue');
})