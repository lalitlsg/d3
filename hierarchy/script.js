const data = [
  { name: "news", parent: "" },

  { name: "tech", parent: "news" },
  { name: "sport", parent: "news" },
  { name: "music", parent: "news" },

  { name: "ai", parent: "tech", amount: 5 },
  { name: "coding", parent: "tech", amount: 6 },
  { name: "laptop", parent: "tech", amount: 2 },
  { name: "tablet", parent: "tech", amount: 7 },
  { name: "ml", parent: "tech", amount: 4 },
  { name: "startups", parent: "tech", amount: 3 },

  { name: "cricket", parent: "sport", amount: 2 },
  { name: "football", parent: "sport", amount: 3 },
  { name: "tenis", parent: "sport", amount: 1 },
  { name: "racing", parent: "sport", amount: 5 },
  { name: "hockey", parent: "sport", amount: 7 },

  { name: "house", parent: "music", amount: 10 },
  { name: "jazz", parent: "music", amount: 4 },
  { name: "rock", parent: "music", amount: 2 },
  { name: "punk", parent: "music", amount: 5 },
  { name: "pop", parent: "music", amount: 7 },
  { name: "classical", parent: "music", amount: 2 },
];

// create svg

const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", 1060)
  .attr("height", 800);

// create graph

const graph = svg.append("g").attr("transform", "translate(50,50)");

const color = d3.scaleOrdinal(["#0000b3", "#b3b3ff", "#8080ff"]);

const stratify = d3
  .stratify()
  .id((d) => d.name)
  .parentId((d) => d.parent);

const rootNode = stratify(data).sum((d) => d.amount);

const pack = d3.pack().size([960, 700]).padding(5);

const bubbleData = pack(rootNode).descendants();

const nodes = graph
  .selectAll("g")
  .data(bubbleData)
  .enter()
  .append("g")
  .attr("transform", (d) => `translate(${d.x},${d.y})`);

nodes
  .append("circle")
  .attr("r", (d) => d.r)
  .attr("stroke", "#0000b3")
  .attr("fill", (d) => color(d.depth));

nodes
  .filter((d) => !d.children)
  .append("text")
  .attr("text-anchor", "middle")
  .attr("dy", "0.2em")
  .attr("fill", "#0000b3")
  .style("font-size", (d) => d.value * 5)
  .text((d) => d.data.name);
