// d3 scales

const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", 600)
  .attr("height", 600);

// create margins and dimensions
const margin = { top: 20, right: 20, bottom: 100, left: 100 };
const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

// create group for whole graph
const graph = svg
  .append("g")
  .attr("width", graphWidth)
  .attr("height", graphHeight)
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// create groups for x and y axis
const xAxisGroup = graph
  .append("g")
  .attr("transform", `translate(0,${graphHeight})`);
const yAxisGroup = graph.append("g");

// linear scale
const y = d3.scaleLinear().range([graphHeight, 0]);

// band scale
const x = d3.scaleBand().range([0, 500]).paddingInner(0.2).paddingOuter(0.2);

// create axes
const xAxis = d3.axisBottom(x);
const yAxis = d3
  .axisLeft(y)
  .ticks(3)
  .tickFormat((d) => d + " orders");

// axes formatting
xAxisGroup
  .selectAll("text")
  .attr("transform", "rotate(-40)")
  .attr("text-anchor", "end")
  .attr("fill", "grey");

xAxisGroup.select("path").attr("stroke", "grey");

yAxisGroup.selectAll("text").attr("fill", "grey");

yAxisGroup.select("path").attr("stroke", "grey");

// d3 update pattern
const update = (data) => {
  // update scales
  y.domain([0, d3.max(data, (d) => d.quantity)]);
  x.domain(data.map((d) => d.name));

  // join data
  const rect = graph.selectAll("rect").data(data);

  // remove exit selection
  rect.exit().remove();

  // add attr to dom rect
  rect
    .attr("width", x.bandwidth)
    .attr("x", (d) => x(d.name))
    .attr("fill", "blue");
  // .transition()
  // .duration(1000)
  // .attr("height", (d) => graphHeight - y(d.quantity))
  // .attr("y", (d) => y(d.quantity));

  // append enter selection to dom
  rect
    .enter()
    .append("rect")
    .attr("height", 0)
    .attr("fill", "blue")
    .attr("x", (d) => x(d.name))
    .attr("y", graphHeight)
    .merge(rect)
    .transition()
    .duration(1000)
    .attrTween("width", widhtTween)
    .attr("y", (d) => y(d.quantity))
    .attr("height", (d) => graphHeight - y(d.quantity));

  // call axes
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);
};

// get data from firestore
// db.collection("dishes")
//   .get()
//   .then((res) => {
// console.log(res.docs);
// const data = [];
// res.docs.forEach((doc) => {
// console.log(doc.data());
//   data.push(doc.data());
// });

// update(data);

//    update data after certain interval
//    d3.interval(()=>{
//        data[4].quantity += 10;
//        update(data);
//    },1000)

// remove rect from dom
// d3.interval(() => {
//   data.pop();
//   update(data);
// }, 3000);
//   });

// get realtime data from firestore
let data = [];

db.collection("dishes").onSnapshot((res) => {
  res.docChanges().forEach((change) => {
    const doc = { ...change.doc.data(), id: change.doc.id };
    // console.log(doc, change.type);

    switch (change.type) {
      case "added":
        data.push(doc);
        break;
      case "modified":
        const index = data.findIndex((item) => item.id === doc.id);
        data[index] = doc;
        break;
      case "removed":
        data = data.filter((item) => item.id !== doc.id);
        break;
      default:
        break;
    }
  });
  update(data);
});

// Tweens

const widhtTween = (d) => {
  const i = d3.interpolate(0, x.bandwidth());
  return (t) => i(t);
};

// d3 min, max, extent methods
// const min = d3.min(data, d=>d.quantity);
// const max = d3.max(data, d=>d.quantity);
// const extent = d3.extent(data, d=>d.quantity);
// console.log(min, max, extent);
