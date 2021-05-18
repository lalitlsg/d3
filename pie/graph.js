const dim = { width: 300, height: 300, radius: 150 };
const cen = { x: dim.width / 2 + 5, y: dim.height / 2 + 5 };

const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", dim.width + 150)
  .attr("height", dim.height + 150);

const graph = svg
  .append("g")
  .attr("transform", `translate(${cen.x}, ${cen.y})`);

const pie = d3
  .pie()
  .sort(null)
  .value((d) => d.cost);

const angles = pie([]);

const arcPath = d3
  .arc()
  .outerRadius(dim.radius)
  .innerRadius(dim.radius / 2);

// ordinal scale for colors
const colors = d3.scaleOrdinal(d3["schemeSet3"]);

const update = (data) => {
  colors.domain(data.map((d) => d.name));
  const paths = graph.selectAll("path").data(pie(data));
  paths
    .exit()
    .transition()
    .duration(1000)
    .attrTween("d", arcTweenExit)
    .remove();
  paths.attr("d", arcPath);
  paths
    .enter()
    .append("path")
    .attr("class", "arc")
    .attr("stroke", "#fff")
    .attr("stroke-width", 3)
    .attr("fill", (d) => colors(d.data.name))
    .transition()
    .duration(1000)
    .attrTween("d", arcTweenEnter);
};

let data = [];

db.collection("expences").onSnapshot((res) => {
  //   console.log(res.docChanges());
  res.docChanges().forEach((change) => {
    const doc = { ...change.doc.data(), id: change.doc.id };
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

// tween for transition
const arcTweenEnter = (d) => {
  const i = d3.interpolate(d.endAngle, d.startAngle);
  return (t) => {
    d.startAngle = i(t);
    return arcPath(d);
  };
};

const arcTweenExit = (d) => {
  const i = d3.interpolate(d.startAngle, d.endAngle);
  return (t) => {
    d.startAngle = i(t);
    return arcPath(d);
  };
};
