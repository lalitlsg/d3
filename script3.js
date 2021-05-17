// d3 scales

const svg = d3.select('svg');

d3.json('orders.json').then(data=>{
    
    // linear scale
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d=>d.quantity)])
        .range([0,500]);

    // band scale
    const x = d3.scaleBand()
        .domain(data.map(d=>d.name))
        .range([0,500])
        .paddingInner(0.2)
        .paddingOuter(0.2);

    // min, max, extent
    // const min = d3.min(data, d=>d.quantity);
    // const max = d3.max(data, d=>d.quantity);
    // const extent = d3.extent(data, d=>d.quantity);
    // console.log(min, max, extent);

    // join data
    const rect = svg.selectAll('rect')
        .data(data);

    // add attr to dom rect
    rect.attr('width', x.bandwidth)
        .attr('height',d=>y(d.quantity))
        .attr('x', d=>x(d.name))
        .attr('fill', 'blue');

    // append enter selection to dom
    rect.enter()
        .append('rect')
        .attr('width', x.bandwidth)
        .attr('height',d=>y(d.quantity))
        .attr('x', d=>x(d.name))
        .attr('fill', 'blue');
})