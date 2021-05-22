const data = [
  { name: "Lalit", parent: "", dept: "director" },

  { name: "Pratik", parent: "Lalit", dept: "IT" },
  { name: "Rahul", parent: "Lalit", dept: "HR" },

  { name: "Yash", parent: "Pratik", dept: "IT" },
  { name: "Nisha", parent: "Pratik", dept: "IT" },

  { name: "Mayur", parent: "Rahul", dept: "HR" },
  { name: "Vaibhav", parent: "Rahul", dept: "HR" },
];

const dims = { height: 500, width: 700 };

const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", dims.width + 200)
  .attr("height", dims.height + 100);

const graph = svg.append("g").attr("transform", "translate(50,50)");

const stratify = d3
  .stratify()
  .id((d) => d.name)
  .parentId((d) => d.parent);

const tree = d3.tree().size([dims.width, dims.height]);

const color = d3.scaleOrdinal(["#b7fdb5", "#dfc2ef", "#eac8d0", "#e5f8b9"]);

const update = (data) => {
  graph.selectAll(".node").remove();
  graph.selectAll(".link").remove();

  color.domain(data.map((d) => d.dept));

  const rootNode = stratify(data);
  //   console.log(rootNode);
  const treeData = tree(rootNode);
  const nodes = graph.selectAll(".node").data(treeData.descendants());
  const links = graph.selectAll(".link").data(treeData.links());
  links
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("fill", "none")
    .attr("stroke", "#aaa")
    .attr("stroke-width", 2)
    .attr(
      "d",
      d3
        .linkVertical()
        .x((d) => d.x)
        .y((d) => d.y)
    );

  const enterNodes = nodes
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", (d) => `translate(${d.x},${d.y})`);

  enterNodes
    .append("rect")
    .attr("fill", (d) => color(d.data.dept))
    .attr("height", 50)
    .attr("rx", 5)
    .attr("width", (d) => d.data.name.length * 15)
    .attr("transform", (d) => {
      const x = d.data.name.length * 7;
      return `translate(${-x},-25)`;
    });

  enterNodes
    .append("text")
    .attr("text-anchor", "middle")
    .attr("fill", "black")
    .text((d) => d.data.name);
};

update(data);
