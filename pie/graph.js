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

// legend setup
const legendGroup = svg
  .append("g")
  .attr("transform", `translate(${dim.width + 40}, 10)`);

const legend = d3.legendColor().shape("circle").shapePadding(10).scale(colors);

// tooltip
const tip = d3
  .tip()
  .attr("class", "d3-tip my")
  .html(
    (e, d) => `<span>${d.data.name}</span>, 
  <span>${d.data.cost}</span>
  <div>click to delete</div>
  `
  );

graph.call(tip);

const update = (data) => {
  colors.domain(data.map((d) => d.name));

  // update and call legend
  legendGroup.call(legend);
  legendGroup.selectAll("text").attr("fill", "grey");

  const paths = graph.selectAll("path").data(pie(data));
  paths
    .exit()
    .transition()
    .duration(1000)
    .attrTween("d", arcTweenExit)
    .remove();
  paths
    .attr("d", arcPath)
    .transition()
    .duration(1000)
    .attrTween("d", arcTweenUpdate);
  paths
    .enter()
    .append("path")
    .attr("class", "arc")
    .attr("stroke", "#fff")
    .attr("stroke-width", 3)
    .attr("fill", (d) => colors(d.data.name))
    .each(function (d) {
      this._current = d;
    })
    .transition()
    .duration(1000)
    .attrTween("d", arcTweenEnter);

  console.log(graph.selectAll("path"));
  graph.selectAll("path").on("mouseover", (e, d) => {
    tip.show(e, d);
    mouseOverHandler(e, d);
  });
  graph.selectAll("path").on("mouseout", (e, d) => {
    tip.hide(e, d);
    mouseOutHandler(e, d);
  });
  graph.selectAll("path").on("click", deleteHandler);
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

function arcTweenUpdate(d) {
  const i = d3.interpolate(this._current, d);
  this._current = i(1);
  return function (t) {
    return arcPath(i(t));
  };
}

const mouseOverHandler = (e, d) => {
  d3.select(e.currentTarget).attr("fill", "grey");
};

const mouseOutHandler = (e, d) => {
  d3.select(e.currentTarget).attr("fill", colors(d.data.name));
};

const deleteHandler = (e, d) => {
  db.collection("expences").doc(d.data.id).delete();
};
