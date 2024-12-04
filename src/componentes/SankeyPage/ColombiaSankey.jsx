import { sankey, sankeyCenter, sankeyLinkHorizontal } from "d3-sankey";
import * as d3 from "d3";

const MARGIN_Y = 25;
const MARGIN_X = 100;
const width = 1360;
const height = 900;

export const ColombiaSankey = ({datosSankeyColombia}) => {
  console.log(datosSankeyColombia);
  const color = d3.scaleOrdinal(d3.schemeCategory10);
  const copiaDatosSankeyColombia = JSON.parse(JSON.stringify(datosSankeyColombia));
  const sankeyGenerator = sankey()
    .nodeWidth(26)
    .nodePadding(29)
    .extent([
      [MARGIN_X, MARGIN_Y],
      [width - MARGIN_X, height - MARGIN_Y],
    ])
    .nodeId((node) => node.id)
    .nodeAlign(sankeyCenter); // Algorithm used to decide node position

  // Compute nodes and links positions
  const { nodes, links } = sankeyGenerator(copiaDatosSankeyColombia);
  console.log(copiaDatosSankeyColombia);
  console.log(nodes);
  console.log(links);

  // Recalculate the node's value based on sourceLinks object
  const nodosUpdated = nodes.map((node) => {
    const valor = node.sourceLinks.reduce((acc, link) => acc + link.value, 0);
    return { ...node, value: valor };
  });

  console.log(nodosUpdated);

  const allNodes = nodosUpdated.map((node) => {
    return (
      <g key={node.index}>
        <rect
          height={node.y1 - node.y0}
          width={sankeyGenerator.nodeWidth()}
          x={node.x0}
          y={node.y0}
          stroke={"black"}
          fill={color(node.id)}
          fillOpacity={0.8}
          rx={0.9}
        />
        {/* Add text element */}
        <text
          x={(node.x0 + (node.x1 - node.x0))} // Center text horizontally
          y={node.y0 + ((node.y1 - node.y0) / 2) } // Center text vertically
          dominantBaseline="middle" // Align text vertically centered
          textAnchor="middle" // Align text horizontally centered
          fill="black" // Text color set to black
          fontSize={10} // Text font size
          style={{ overflow: "visible" }} // Allow overflow for text
        >
          {
            (node.id==="Consumo útil total") ? "Consumo útil total - " + 5299881 + " - " + "59%" :  (node.id==="Consumo final total") ? "Consumo final total - " + 1303879 + " - " + "100%" : (node.id==="Pérdidas total") ? "Pérdidas total - " + 773890 + " - " + "41%" :  node.id + " " + parseFloat(node.value).toFixed(2) // Display node ID as text
          }
          
        </text>
      </g>
    );
  });

  const allLinks = links.map((link, i) => {
    const linkGenerator = sankeyLinkHorizontal();
    const path = linkGenerator(link);

    return (
      <g key={i}>
        <title>{`${link.source.id} → ${link.target.id}\nValue: ${link.value}`}</title>
        <path
          d={path}
          stroke="#a53253"
          fill="none"
          strokeOpacity={0.1}
          strokeWidth={link.width}
        />
      </g>
    );
  });

  return (
    <div>
      <svg width={width} height={height}>
        {allNodes}
        {allLinks}
      </svg>
    </div>
  );
};
