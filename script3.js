// d3 scales

const svg = d3.select('.canvas')
    .append('svg')
    .attr('width', 600)
    .attr('height', 600);

// create margins and dimensions
const margin = {top: 20, right:20, bottom: 100, left: 100}
const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

// create group for whole graph
const graph = svg.append('g')
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

// create groups for x and y axis
const xAxisGroup = graph.append('g')
    .attr('transform', `translate(0,${graphHeight})`);
const yAxisGroup = graph.append('g');

d3.json('orders.json').then(data=>{
    
    // linear scale
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d=>d.quantity)])
        .range([0,graphHeight]);

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
    const rect = graph.selectAll('rect')
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

    // create and call the axis
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);
})