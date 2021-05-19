const margins = { top: 40, right: 20, bottom: 50, left: 100 };
const graphWidth = 560 - margins.left - margins.right;
const graphHeight = 560 - margins.top - margins.bottom;

const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", graphWidth + margins.left + margins.right)
  .attr("height", graphHeight + margins.top + margins.bottom);

const graph = svg
  .append("g")
  .attr("width", graphWidth)
  .attr("height", graphHeight)
  .attr("transform", `translate(${margins.left}, ${margins.top})`);

// scales
const x = d3.scaleTime().range([0, graphWidth]);
const y = d3.scaleLinear().range([graphHeight, 0]);

// axes groups
const xAxisGroup = graph
  .append("g")
  .attr("class", "x-axis")
  .attr("transform", `translate(0, ${graphHeight})`);

const yAxisGroup = graph.append("g").attr("class", "y-axis");

const update = (data) => {
  // set scale domains
  x.domain(d3.extent(data, (d) => new Date(d.date)));
  y.domain([0, d3.max(data, (d) => d.distance)]);

  // join data
  const circles = graph.selectAll("cirles").data(data);

  // remove
  circles.exit().remove();

  // update
  circles
    .attr("cx", (d) => x(new Date(d.date)))
    .attr("cy", (d) => y(d.distance));

  // add
  circles
    .enter()
    .append("circle")
    .attr("r", 4)
    .attr("cx", (d) => x(new Date(d.date)))
    .attr("cy", (d) => y(d.distance))
    .attr("fill", "blue");

  // create axes
  const xAxis = d3.axisBottom(x).ticks(4).tickFormat(d3.timeFormat("%b %d"));
  const yAxis = d3
    .axisLeft(y)
    .ticks(4)
    .tickFormat((d) => d + " m");

  // call axes
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);

  xAxisGroup
    .selectAll("text")
    .attr("transform", "rotate(-40)")
    .attr("text-anchor", "end");
};

const data = [
  {
    activity: "cycling",
    date: new Date("2021-05-17").toString(),
    distance: 100,
  },
  {
    activity: "walking",
    date: new Date("2021-05-18").toString(),
    distance: 50,
  },
  {
    activity: "swimming",
    date: new Date("2021-05-19").toString(),
    distance: 100,
  },
];

update(data);
